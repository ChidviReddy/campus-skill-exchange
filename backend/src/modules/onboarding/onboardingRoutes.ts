import { Router } from "express";
import {
  getStatus,
  savePersonal,
  saveSkills,
  savePreferences,
} from "./onboardingController";
import { requireAuth } from "../auth/authMiddleware";

const router = Router();

// All onboarding routes require verified JWT authentication
router.use(requireAuth);

router.get("/", getStatus);
router.put("/personal", savePersonal);
router.put("/skills", saveSkills);
router.put("/preferences", savePreferences);

export default router;
