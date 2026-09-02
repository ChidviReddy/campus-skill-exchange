import { Request, Response } from "express";
import pool from "../config/db";

/**
 * GET /api/health
 * Basic API liveness check — confirms Express is running.
 */
export async function getApiHealth(
  _req: Request,
  res: Response
): Promise<void> {
  res.json({
    success: true,
    message: "SkillSwap API is running",
  });
}

/**
 * GET /api/health/database
 * Tests the PostgreSQL connection by executing a lightweight query.
 * Returns success with the server timestamp, or a safe error message.
 * Never exposes passwords, connection strings, or stack traces.
 */
export async function getDatabaseHealth(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const result = await pool.query<{ now: Date }>("SELECT NOW() AS now");
    const serverTime = result.rows[0].now;

    res.json({
      success: true,
      message: "PostgreSQL database connection is working",
      serverTime,
    });
  } catch (error) {
    const err = error as Error;
    // Log internally but never expose credentials or stack traces to clients.
    console.error("Database health check failed:", err.message);

    res.status(503).json({
      success: false,
      message:
        "PostgreSQL database connection failed. " +
        "Check that the database is running and .env is configured correctly.",
    });
  }
}
