import { Request, Response } from "express";
import {
  signupWithEmailPassword,
  loginWithEmailPassword,
  authenticateGoogle,
  getMe,
} from "./authService";

export async function signup(req: Request, res: Response): Promise<void> {
  try {
    const { fullName, email, password } = req.body;
    const result = await signupWithEmailPassword(fullName, email, password);

    res.status(201).json({
      success: true,
      message: "Account created successfully. Welcome to SkillSwap!",
      data: result,
    });
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "An error occurred during account creation.";
    res.status(status).json({ success: false, message });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const result = await loginWithEmailPassword(email, password);

    res.status(200).json({
      success: true,
      message: "Signed in successfully.",
      data: result,
    });
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "An error occurred during sign in.";
    res.status(status).json({ success: false, message });
  }
}

export async function googleAuth(req: Request, res: Response): Promise<void> {
  try {
    const { email, name, avatar, googleId } = req.body;
    const result = await authenticateGoogle({ email, name, avatar, googleId });

    res.status(200).json({
      success: true,
      message: "Google authentication successful.",
      data: result,
    });
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "An error occurred during Google authentication.";
    res.status(status).json({ success: false, message });
  }
}

export async function getProfile(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ success: false, message: "Unauthorized." });
      return;
    }

    const user = await getMe(req.user.userId);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "An error occurred fetching profile.";
    res.status(status).json({ success: false, message });
  }
}
