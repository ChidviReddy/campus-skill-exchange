import { Router } from "express";
import { getApiHealth, getDatabaseHealth } from "../controllers/healthController";

const router = Router();

// GET /api/health        — API liveness
router.get("/", getApiHealth);

// GET /api/health/database — PostgreSQL connectivity
router.get("/database", getDatabaseHealth);

export default router;
