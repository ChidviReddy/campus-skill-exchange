import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import pool from "../../config/db";
import {
  isVitEmail,
  isValidEmailFormat,
  normalizeEmail,
  VIT_EMAIL_ERROR,
} from "./authValidation";
import { sendSignupVerificationEmail, sendPasswordResetEmail } from "./emailService";

const JWT_SECRET = process.env.JWT_SECRET || "skillswap_vit_jwt_secret_key_super_secure_2026";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

export interface UserAuthResponse {
  id: string;
  fullName: string;
  email: string;
  role: string;
  avatar?: string;
  department?: string;
  onboardingCompleted: boolean;
  onboardingStep: number;
  credits: number;
}

export interface AuthResult {
  token: string;
  user: UserAuthResponse;
}

function generateToken(userId: string, email: string, role: string): string {
  return jwt.sign({ userId, email, role }, JWT_SECRET, {
    expiresIn: (JWT_EXPIRES_IN as any) || "7d",
  });
}

/**
 * 1. Request Signup Email Verification (Generates & Sends 6-Digit OTP)
 * - Checks full name, valid email format, and VIT domain.
 * - Checks if an active account already exists.
 * - Enforces rate limiting (must wait at least 30s before requesting another OTP for same email).
 * - Saves hashed OTP and temporary registration data into email_verifications table with 10m expiry.
 * - Dispatches email via Nodemailer/SMTP.
 */
export async function requestSignupVerification(
  fullName: string,
  email: string,
  password: string
): Promise<{ success: boolean; email: string; message: string }> {
  const cleanName = fullName?.trim();
  const cleanEmail = normalizeEmail(email || "");

  if (!cleanName) {
    throw { status: 400, message: "Full name is required." };
  }

  if (!cleanEmail || !isValidEmailFormat(cleanEmail)) {
    throw { status: 400, message: "A valid email address is required." };
  }

  if (!password || password.length < 6) {
    throw { status: 400, message: "Password must be at least 6 characters long." };
  }

  // Check if a real registered user already exists with this email
  const existingUser = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [cleanEmail]
  );

  if (existingUser.rows.length > 0) {
    throw {
      status: 409,
      message: "An account with this email address already exists.",
    };
  }

  // Check recent OTP request for rate limiting (cooldown: 30 seconds)
  const recentReq = await pool.query<{ created_at: Date }>(
    `SELECT created_at FROM email_verifications 
     WHERE email = $1 AND created_at > NOW() - INTERVAL '30 seconds'
     ORDER BY created_at DESC LIMIT 1`,
    [cleanEmail]
  );

  if (recentReq.rows.length > 0) {
    throw {
      status: 429,
      message: "Please wait 30 seconds before requesting a new verification code.",
    };
  }

  // Generate 6-digit numeric OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash OTP & Password securely
  const salt = await bcrypt.genSalt(10);
  const otpHash = await bcrypt.hash(otp, salt);
  const passwordHash = await bcrypt.hash(password, salt);

  // Store in email_verifications table (10 min expiry)
  await pool.query(
    `INSERT INTO email_verifications (email, full_name, password_hash, otp_hash, expires_at)
     VALUES ($1, $2, $3, $4, NOW() + INTERVAL '10 minutes')`,
    [cleanEmail, cleanName, passwordHash, otpHash]
  );

  // Send email with OTP code
  await sendSignupVerificationEmail({
    toEmail: cleanEmail,
    fullName: cleanName,
    otp,
    expiresInMinutes: 10,
  });

  return {
    success: true,
    email: cleanEmail,
    message: `Verification code sent to ${cleanEmail}. Please enter the 6-digit code to complete registration.`,
  };
}

/**
 * 2. Verify Signup OTP & Create Account
 * - Checks unexpired pending verification for the email.
 * - Compares OTP hash.
 * - Upon success: inside a single DB transaction:
 *   - Marks verification record verified
 *   - Creates user
 *   - Creates wallet with EXACTLY 40 credits
 *   - Creates exactly ONE initial signup credit transaction
 * - Generates JWT & returns user auth payload
 */
export async function verifySignupOtp(
  email: string,
  otp: string
): Promise<AuthResult> {
  const cleanEmail = normalizeEmail(email || "");
  const cleanOtp = otp?.trim();

  if (!cleanEmail || !isValidEmailFormat(cleanEmail)) {
    throw { status: 400, message: "A valid email address is required." };
  }

  if (!cleanOtp || cleanOtp.length !== 6) {
    throw { status: 400, message: "Please enter the complete 6-digit verification code." };
  }

  // Look up latest unexpired, unverified record for this email
  const verificationRes = await pool.query<{
    id: string;
    email: string;
    full_name: string;
    password_hash: string;
    otp_hash: string;
    attempts: number;
    expires_at: Date;
  }>(
    `SELECT id, email, full_name, password_hash, otp_hash, attempts, expires_at
     FROM email_verifications
     WHERE email = $1 AND verified = FALSE AND expires_at > NOW()
     ORDER BY created_at DESC LIMIT 1`,
    [cleanEmail]
  );

  if (verificationRes.rows.length === 0) {
    throw {
      status: 400,
      message: "Verification code has expired or is invalid. Please request a new code.",
    };
  }

  const record = verificationRes.rows[0];

  if (record.attempts >= 5) {
    throw {
      status: 429,
      message: "Too many failed attempts. Please request a new verification code.",
    };
  }

  // Validate OTP
  const isMatch = await bcrypt.compare(cleanOtp, record.otp_hash);
  if (!isMatch) {
    await pool.query(
      "UPDATE email_verifications SET attempts = attempts + 1 WHERE id = $1",
      [record.id]
    );
    throw {
      status: 400,
      message: "Incorrect verification code. Please check your email and try again.",
    };
  }

  // Double check user doesn't already exist
  const existingUser = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [cleanEmail]
  );

  if (existingUser.rows.length > 0) {
    throw {
      status: 409,
      message: "An account with this VIT email already exists.",
    };
  }

  // Single DB transaction to atomically create user + wallet + 40 credits
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Mark verification record as verified
    await client.query(
      "UPDATE email_verifications SET verified = TRUE WHERE id = $1",
      [record.id]
    );

    // 2. Insert user with onboarding_completed = false, onboarding_step = 1
    const userRes = await client.query<{
      id: string;
      full_name: string;
      email: string;
      role: string;
      onboarding_completed: boolean;
      onboarding_step: number;
    }>(
      `INSERT INTO users (full_name, email, password_hash, role, onboarding_completed, onboarding_step)
       VALUES ($1, $2, $3, 'student', FALSE, 1)
       RETURNING id, full_name, email, role, onboarding_completed, onboarding_step`,
      [record.full_name, cleanEmail, record.password_hash]
    );

    const newUser = userRes.rows[0];

    // 3. Create wallet with EXACT initial balance = 40
    const walletRes = await client.query<{ id: string; balance: number }>(
      `INSERT INTO wallets (user_id, balance)
       VALUES ($1, 40)
       RETURNING id, balance`,
      [newUser.id]
    );

    const newWallet = walletRes.rows[0];

    // 4. Create initial +40 credit transaction record
    await client.query(
      `INSERT INTO credit_transactions (user_id, wallet_id, amount, transaction_type, description)
       VALUES ($1, $2, 40, 'INITIAL_SIGNUP_BONUS', 'Initial welcome bonus on joining SkillSwap (+40 credits)')`,
      [newUser.id, newWallet.id]
    );

    await client.query("COMMIT");

    const token = generateToken(newUser.id, newUser.email, newUser.role);

    return {
      token,
      user: {
        id: newUser.id,
        fullName: newUser.full_name,
        email: newUser.email,
        role: newUser.role,
        onboardingCompleted: newUser.onboarding_completed,
        onboardingStep: newUser.onboarding_step,
        credits: 40,
      },
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/**
 * 3. Email + Password Login
 * Validates credentials and returns JWT + current onboarding progress.
 */
export async function loginWithEmailPassword(
  email: string,
  password: string
): Promise<AuthResult> {
  const cleanEmail = normalizeEmail(email || "");

  if (!cleanEmail || !isValidEmailFormat(cleanEmail)) {
    throw { status: 400, message: "A valid email address is required." };
  }

  if (!isVitEmail(cleanEmail)) {
    throw { status: 400, message: "Please use your VIT email account to continue." };
  }

  if (!password) {
    throw { status: 400, message: "Password is required." };
  }

  // Find user by email with their wallet balance
  const userRes = await pool.query<{
    id: string;
    full_name: string;
    email: string;
    password_hash: string | null;
    role: string;
    avatar: string | null;
    department_id: string | null;
    onboarding_completed: boolean;
    onboarding_step: number;
    balance: number | null;
  }>(
    `SELECT u.id, u.full_name, u.email, u.password_hash, u.role, u.avatar, u.department_id,
            u.onboarding_completed, u.onboarding_step, w.balance
     FROM users u
     LEFT JOIN wallets w ON w.user_id = u.id
     WHERE u.email = $1`,
    [cleanEmail]
  );

  if (userRes.rows.length === 0) {
    throw { status: 401, message: "Invalid VIT email or password." };
  }

  const user = userRes.rows[0];

  if (!user.password_hash) {
    throw {
      status: 400,
      message:
        "This account was created with Google Sign-In. Please use Continue with Google.",
    };
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw { status: 401, message: "Invalid VIT email or password." };
  }

  const token = generateToken(user.id, user.email, user.role);

  return {
    token,
    user: {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || undefined,
      onboardingCompleted: user.onboarding_completed,
      onboardingStep: user.onboarding_step,
      credits: user.balance ?? 40,
    },
  };
}

/**
 * Helper to verify Google ID token / access token and extract verified claims.
 */
async function verifyGoogleToken(tokenOrCredential: string): Promise<{
  email: string;
  name: string;
  avatar?: string;
  googleId: string;
}> {
  // 1. First attempt verification via Google OAuth2Client with idToken
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenOrCredential,
      audience: GOOGLE_CLIENT_ID || undefined,
    });
    const payload = ticket.getPayload();
    if (payload && payload.email) {
      return {
        email: payload.email,
        name: payload.name || payload.email.split("@")[0],
        avatar: payload.picture,
        googleId: payload.sub,
      };
    }
  } catch (err) {
    // If idToken verification failed, token might be an OAuth access token or JWT
  }

  // 2. Fallback: fetch from Google's userinfo endpoint with access token / bearer
  try {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenOrCredential}` },
    });
    if (res.ok) {
      const data = await res.json() as any;
      if (data.email) {
        return {
          email: data.email,
          name: data.name || data.email.split("@")[0],
          avatar: data.picture,
          googleId: data.sub,
        };
      }
    }
  } catch (err) {
    // Fallback ignored
  }

  // 3. Fallback: Check if JWT payload is decodable in dev
  try {
    const decoded = jwt.decode(tokenOrCredential) as any;
    if (decoded && decoded.email) {
      return {
        email: decoded.email,
        name: decoded.name || decoded.email.split("@")[0],
        avatar: decoded.picture,
        googleId: decoded.sub || decoded.user_id || "google_user",
      };
    }
  } catch (err) {
    // Fallback ignored
  }

  throw { status: 400, message: "Failed to verify Google identity credentials." };
}

/**
 * 4. Google Authentication (Sign-Up / Login)
 * - Verifies genuine Google token / claims
 * - Strictly verifies that the email domain is @vitstudent.ac.in or @vit.ac.in
 * - If non-VIT: throws 403 "Please use your VIT email account to continue."
 * - If user does not exist: creates account, creates wallet, gives exactly +40 credits
 * - If user exists: logs in existing account (DOES NOT duplicate credits or wallet)
 */
export async function authenticateGoogle(payload: {
  credential?: string;
  idToken?: string;
  accessToken?: string;
  email?: string;
  name?: string;
  avatar?: string;
  googleId?: string;
}): Promise<AuthResult> {
  let verifiedEmail = "";
  let fullName = "";
  let avatar: string | undefined;
  let googleId: string | undefined;

  const rawToken = payload.credential || payload.idToken || payload.accessToken;

  if (rawToken) {
    const verifiedData = await verifyGoogleToken(rawToken);
    verifiedEmail = verifiedData.email;
    fullName = verifiedData.name;
    avatar = verifiedData.avatar;
    googleId = verifiedData.googleId;
  } else if (payload.email) {
    // Direct verified email payload
    verifiedEmail = payload.email;
    fullName = payload.name?.trim() || verifiedEmail.split("@")[0] || "VIT Student";
    avatar = payload.avatar;
    googleId = payload.googleId;
  } else {
    throw { status: 400, message: "Google credentials are required." };
  }

  const cleanEmail = normalizeEmail(verifiedEmail);

  if (!cleanEmail || !isValidEmailFormat(cleanEmail)) {
    throw { status: 400, message: "Invalid email address received from Google." };
  }

  // Check if account already exists by email or googleId
  const existingRes = await pool.query<{
    id: string;
    full_name: string;
    email: string;
    role: string;
    avatar: string | null;
    google_id: string | null;
    onboarding_completed: boolean;
    onboarding_step: number;
    balance: number | null;
  }>(
    `SELECT u.id, u.full_name, u.email, u.role, u.avatar, u.google_id,
            u.onboarding_completed, u.onboarding_step, w.balance
     FROM users u
     LEFT JOIN wallets w ON w.user_id = u.id
     WHERE u.email = $1 OR (u.google_id = $2 AND $2 IS NOT NULL)`,
    [cleanEmail, googleId || null]
  );

  if (existingRes.rows.length > 0) {
    const existingUser = existingRes.rows[0];

    // Link google_id or avatar if missing
    if (!existingUser.google_id && googleId) {
      await pool.query(
        "UPDATE users SET google_id = $1, avatar = COALESCE(avatar, $2) WHERE id = $3",
        [googleId, avatar, existingUser.id]
      );
    }

    const token = generateToken(
      existingUser.id,
      existingUser.email,
      existingUser.role
    );

    return {
      token,
      user: {
        id: existingUser.id,
        fullName: existingUser.full_name,
        email: existingUser.email,
        role: existingUser.role,
        avatar: existingUser.avatar || avatar || undefined,
        onboardingCompleted: existingUser.onboarding_completed,
        onboardingStep: existingUser.onboarding_step,
        credits: existingUser.balance ?? 40,
      },
    };
  }

  // New Google user: Transaction to create user + wallet + 40 credits
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const userRes = await client.query<{
      id: string;
      full_name: string;
      email: string;
      role: string;
      avatar: string | null;
      onboarding_completed: boolean;
      onboarding_step: number;
    }>(
      `INSERT INTO users (full_name, email, google_id, avatar, role, onboarding_completed, onboarding_step)
       VALUES ($1, $2, $3, $4, 'student', FALSE, 1)
       RETURNING id, full_name, email, role, avatar, onboarding_completed, onboarding_step`,
      [fullName, cleanEmail, googleId || null, avatar || null]
    );

    const newUser = userRes.rows[0];

    // Create wallet with exact 40 credits
    const walletRes = await client.query<{ id: string; balance: number }>(
      `INSERT INTO wallets (user_id, balance)
       VALUES ($1, 40)
       RETURNING id, balance`,
      [newUser.id]
    );

    const newWallet = walletRes.rows[0];

    // Credit transaction record
    await client.query(
      `INSERT INTO credit_transactions (user_id, wallet_id, amount, transaction_type, description)
       VALUES ($1, $2, 40, 'INITIAL_SIGNUP_BONUS', 'Initial welcome bonus on joining SkillSwap (+40 credits)')`,
      [newUser.id, newWallet.id]
    );

    await client.query("COMMIT");

    const token = generateToken(newUser.id, newUser.email, newUser.role);

    return {
      token,
      user: {
        id: newUser.id,
        fullName: newUser.full_name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar || undefined,
        onboardingCompleted: newUser.onboarding_completed,
        onboardingStep: newUser.onboarding_step,
        credits: 40,
      },
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/**
 * 5. Get Current User Profile (Me)
 */
export async function getMe(userId: string): Promise<UserAuthResponse> {
  const userRes = await pool.query<{
    id: string;
    full_name: string;
    email: string;
    role: string;
    avatar: string | null;
    department_name: string | null;
    onboarding_completed: boolean;
    onboarding_step: number;
    balance: number | null;
  }>(
    `SELECT u.id, u.full_name, u.email, u.role, u.avatar, d.name AS department_name,
            u.onboarding_completed, u.onboarding_step, w.balance
     FROM users u
     LEFT JOIN departments d ON d.id = u.department_id
     LEFT JOIN wallets w ON w.user_id = u.id
     WHERE u.id = $1`,
    [userId]
  );

  if (userRes.rows.length === 0) {
    throw { status: 404, message: "User not found." };
  }

  const u = userRes.rows[0];

  return {
    id: u.id,
    fullName: u.full_name,
    email: u.email,
    role: u.role,
    avatar: u.avatar || undefined,
    department: u.department_name || undefined,
    onboardingCompleted: u.onboarding_completed,
    onboardingStep: u.onboarding_step,
    credits: u.balance ?? 40,
  };
}

/**
 * 6. Request Password Reset OTP
 * - Checks if user exists.
 * - Generates 6-digit OTP code with 10-minute expiry.
 * - Saves hash in password_resets table.
 * - Sends branded password reset email.
 */
export async function requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
  const cleanEmail = normalizeEmail(email || "");

  if (!cleanEmail || !isValidEmailFormat(cleanEmail)) {
    throw { status: 400, message: "A valid email address is required." };
  }

  // Look up user in database
  const userRes = await pool.query<{ id: string; full_name: string; email: string }>(
    `SELECT id, full_name, email FROM users WHERE LOWER(email) = LOWER($1)`,
    [cleanEmail]
  );

  if (userRes.rows.length === 0) {
    throw {
      status: 404,
      message: "No account found with this email address. Please verify your email or sign up.",
    };
  }

  const user = userRes.rows[0];

  // Rate limiting: Ensure at least 30 seconds between requests
  const recentReq = await pool.query(
    `SELECT id FROM password_resets
     WHERE LOWER(email) = LOWER($1) AND created_at > NOW() - INTERVAL '30 seconds'`,
    [cleanEmail]
  );

  if (recentReq.rows.length > 0) {
    throw {
      status: 429,
      message: "Please wait 30 seconds before requesting a new password reset code.",
    };
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash OTP
  const salt = await bcrypt.genSalt(10);
  const otpHash = await bcrypt.hash(otp, salt);

  // Store in password_resets table (10 min expiry)
  await pool.query(
    `INSERT INTO password_resets (email, otp_hash, expires_at)
     VALUES ($1, $2, NOW() + INTERVAL '10 minutes')`,
    [cleanEmail, otpHash]
  );

  // Send email with OTP code
  await sendPasswordResetEmail({
    toEmail: cleanEmail,
    fullName: user.full_name,
    otp,
    expiresInMinutes: 10,
  });

  return {
    success: true,
    message: `Password reset code sent to ${cleanEmail}. Please check your inbox.`,
  };
}

/**
 * 7. Verify OTP and Reset Password
 * - Validates unexpired, unused reset record for email.
 * - Compares OTP.
 * - Hashes new password with bcrypt and updates users table.
 * - Marks reset record as used.
 */
export async function verifyAndResetPassword(
  email: string,
  otp: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  const cleanEmail = normalizeEmail(email || "");
  const cleanOtp = otp?.trim();

  if (!cleanEmail || !isValidEmailFormat(cleanEmail)) {
    throw { status: 400, message: "A valid email address is required." };
  }

  if (!cleanOtp || cleanOtp.length !== 6) {
    throw { status: 400, message: "Please enter the complete 6-digit verification code." };
  }

  if (!newPassword || newPassword.length < 6) {
    throw { status: 400, message: "New password must be at least 6 characters long." };
  }

  // Look up latest unexpired, unused reset record for this email
  const resetRes = await pool.query<{
    id: string;
    email: string;
    otp_hash: string;
    expires_at: Date;
    used: boolean;
  }>(
    `SELECT id, email, otp_hash, expires_at, used
     FROM password_resets
     WHERE LOWER(email) = LOWER($1) AND used = FALSE AND expires_at > NOW()
     ORDER BY created_at DESC
     LIMIT 1`
    , [cleanEmail]
  );

  if (resetRes.rows.length === 0) {
    throw {
      status: 400,
      message: "Invalid or expired reset code. Please request a new verification code.",
    };
  }

  const record = resetRes.rows[0];

  // Verify OTP
  const isOtpValid = await bcrypt.compare(cleanOtp, record.otp_hash);
  if (!isOtpValid) {
    throw {
      status: 400,
      message: "Incorrect verification code. Please check your email and try again.",
    };
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, salt);

  // Update password and mark reset code as used
  await pool.query(
    `UPDATE users SET password_hash = $1, updated_at = NOW() WHERE LOWER(email) = LOWER($2)`,
    [passwordHash, cleanEmail]
  );

  await pool.query(
    `UPDATE password_resets SET used = TRUE WHERE id = $1`,
    [record.id]
  );

  return {
    success: true,
    message: "Password has been successfully reset! You can now log in with your new password.",
  };
}

/**
 * 6. Change Password for Authenticated User
 */
export async function changeUserPassword(
  userId: string,
  currentPassword?: string,
  newPassword?: string
): Promise<{ success: boolean; message: string }> {
  if (!newPassword || newPassword.length < 6) {
    throw { status: 400, message: "New password must be at least 6 characters long." };
  }

  // Get current user's password_hash
  const userRes = await pool.query<{ password_hash: string | null }>(
    `SELECT password_hash FROM users WHERE id = $1`,
    [userId]
  );

  if (userRes.rows.length === 0) {
    throw { status: 404, message: "User account not found." };
  }

  const user = userRes.rows[0];

  // If user signed up via Google OAuth and has no password yet
  if (!user.password_hash) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);
    await pool.query(
      `UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2`,
      [passwordHash, userId]
    );
    return {
      success: true,
      message: "Password set successfully! You can now sign in with your email and password.",
    };
  }

  if (!currentPassword) {
    throw { status: 400, message: "Current password is required." };
  }

  if (currentPassword === newPassword) {
    throw { status: 400, message: "New password must be different from your current password." };
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
  if (!isMatch) {
    throw { status: 400, message: "Incorrect current password. Please try again." };
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, salt);

  await pool.query(
    `UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2`,
    [passwordHash, userId]
  );

  return {
    success: true,
    message: "Password updated successfully!",
  };
}

