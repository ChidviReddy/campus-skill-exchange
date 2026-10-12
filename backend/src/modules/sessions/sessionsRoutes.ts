import { Router } from "express";
import {
  getMySessions,
  bookSession,
  updateSessionStatus,
  updateSessionTiming,
  getMyRescheduleRequests,
  createRescheduleRequest,
  respondToRescheduleRequest,
} from "./sessionsController";
import { requireAuth } from "../auth/authMiddleware";

const router = Router();

router.use(requireAuth);

router.get("/my", getMySessions);
router.post("/book", bookSession);

// Reschedule endpoints
router.get("/reschedule/my", getMyRescheduleRequests);
router.patch("/reschedule/:requestId/respond", respondToRescheduleRequest);
router.post("/:id/reschedule", createRescheduleRequest);

router.patch("/:id/status", updateSessionStatus);
router.put("/:id/timing", updateSessionTiming);

export default router;

