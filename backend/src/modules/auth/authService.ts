import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../../config/db";
import {
  isVitEmail,
  isValidEmailFormat,
  normalizeEmail,
  VIT_EMAIL_ERROR,
} from "./authValidation";

const JWT_SECRET = process.env.JWT_SECRET || "skillswap_vit_jwt_secret_key_super_secure_2026";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

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
 * 1. Email + Password Signup
 * Creates user, creates wallet, grants exact +40 credits inside a single transaction.
 */
export async function signupWithEmailPassword(
  fullName: string,
  email: string,
  password: string
): Promise<AuthResult> {
  const cleanName = fullName?.trim();
  const cleanEmail = normalizeEmail(email || "");

  if (!cleanName) {
    throw { status: 400, message: "Full name is required." };
  }

  if (!cleanEmail || !isValidEmailFormat(cleanEmail)) {
    throw { status: 400, message: "A valid email address is required." };
  }

  if (!isVitEmail(cleanEmail)) {
    throw { status: 400, message: VIT_EMAIL_ERROR };
  }

  if (!password || password.length < 6) {
    throw { status: 400, message: "Password must be at least 6 characters long." };
  }

  // Check if user already exists with this email
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

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Insert user with onboarding_completed = false, onboarding_step = 1
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
      [cleanName, cleanEmail, passwordHash]
    );

    const newUser = userRes.rows[0];

    // 2. Create wallet with EXACT initial balance = 40
    const walletRes = await client.query<{ id: string; balance: number }>(
      `INSERT INTO wallets (user_id, balance)
       VALUES ($1, 40)
       RETURNING id, balance`,
      [newUser.id]
    );

    const newWallet = walletRes.rows[0];

    // 3. Create initial +40 credit transaction record
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
 * 2. Email + Password Login
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
    throw { status: 400, message: VIT_EMAIL_ERROR };
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
 * 3. Google Authentication (Sign-Up / Login)
 * - Verifies verified Google email must belong to @vitstudent.ac.in or @vit.ac.in
 * - If user does not exist: creates account, creates wallet, gives exactly +40 credits
 * - If user exists: logs in existing account (DOES NOT duplicate credits or wallet)
 */
export async function authenticateGoogle(payload: {
  email: string;
  name?: string;
  avatar?: string;
  googleId?: string;
}): Promise<AuthResult> {
  const cleanEmail = normalizeEmail(payload.email || "");
  const fullName = payload.name?.trim() || cleanEmail.split("@")[0] || "VIT Student";
  const avatar = payload.avatar || undefined;
  const googleId = payload.googleId || undefined;

  if (!cleanEmail || !isValidEmailFormat(cleanEmail)) {
    throw { status: 400, message: "Invalid email address received from Google." };
  }

  // Enforce VIT domain strictly on Google accounts
  if (!isVitEmail(cleanEmail)) {
    throw {
      status: 403,
      message: "Access restricted: Only VIT Google accounts (@vitstudent.ac.in or @vit.ac.in) are allowed.",
    };
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
 * 4. Get Current User Profile (Me)
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
