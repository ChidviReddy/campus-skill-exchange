import { Router } from "express";
import {
  requestVerification,
  verifyOtpAndCreateAccount,
  login,
  googleAuth,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
} from "./authController";
import { requireAuth } from "./authMiddleware";

const router = Router();

// Signup Email Verification Flow (OTP)
router.post("/signup/request-verification", requestVerification);
router.post("/signup/verify", verifyOtpAndCreateAccount);

// Legacy signup alias for request-verification
router.post("/signup", requestVerification);

// Email/Password login
router.post("/login", login);

// Password Reset Flow (OTP)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Change password (authenticated)
router.post("/change-password", requireAuth, changePassword);

// Real Google OAuth / GIS login & signup
router.post("/google", googleAuth);

// Authenticated user profile (Me)
router.get("/me", requireAuth, getProfile);

export default router;
