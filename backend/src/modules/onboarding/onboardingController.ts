import { Request, Response } from "express";
import {
  getOnboardingStatus,
  saveStepOnePersonal,
  saveStepTwoSkills,
  saveStepThreePreferences,
} from "./onboardingService";

export async function getStatus(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized." });
      return;
    }

    const data = await getOnboardingStatus(userId);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Failed to fetch onboarding status.";
    res.status(status).json({ success: false, message });
  }
}

export async function savePersonal(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized." });
      return;
    }

    const data = await saveStepOnePersonal(userId, req.body);
    res.status(200).json({
      success: true,
      message: "Personal information saved successfully.",
      data,
    });
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Failed to save personal information.";
    res.status(status).json({ success: false, message });
  }
}

export async function saveSkills(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized." });
      return;
    }

    const data = await saveStepTwoSkills(userId, req.body);
    res.status(200).json({
      success: true,
      message: "Skills and interests saved successfully.",
      data,
    });
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Failed to save skills and interests.";
    res.status(status).json({ success: false, message });
  }
}

export async function savePreferences(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized." });
      return;
    }

    const data = await saveStepThreePreferences(userId, req.body);
    res.status(200).json({
      success: true,
      message: "Preferences saved. Onboarding complete!",
      data,
    });
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Failed to save preferences.";
    res.status(status).json({ success: false, message });
  }
}
