import { Request, Response, NextFunction } from "express";

/**
 * Centralized error-handling middleware.
 *
 * Must be registered LAST in the Express middleware chain (after all routes).
 *
 * Returns a consistent JSON error structure.
 * Never exposes stack traces, database credentials, or internal details
 * to the client.
 */
export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  // Always log internally for debugging
  console.error("Unhandled error:", err.message);

  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
}

/**
 * 404 handler — must be registered after all routes but before errorMiddleware.
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
}
