import { Router } from "express";
import { signup, login, googleAuth, getProfile } from "./authController";
import { requireAuth } from "./authMiddleware";

const router = Router();

// Public auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleAuth);

// Protected auth route
router.get("/me", requireAuth, getProfile);

export default router;
