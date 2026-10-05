import { Router } from "express";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  markNotificationByRelatedIdAsRead,
  getNotificationPreferences,
  updateNotificationPreferences,
} from "./notificationsController";
import { requireAuth } from "../auth/authMiddleware";

const router = Router();

router.use(requireAuth);

router.get("/preferences", getNotificationPreferences);
router.put("/preferences", updateNotificationPreferences);
router.get("/", getNotifications);
router.patch("/read-all", markAllNotificationsAsRead);
router.patch("/related/:relatedId/read", markNotificationByRelatedIdAsRead);
router.patch("/:id/read", markNotificationAsRead);

export default router;
