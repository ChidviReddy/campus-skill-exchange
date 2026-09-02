import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedUserPayload {
  userId: string;
  email: string;
  role: string;
}

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUserPayload;
    }
  }
}

/**
 * JWT Authentication Middleware
 * Validates the Bearer token in the Authorization header.
 * Attaches the verified user payload to `req.user`.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Authentication required. Please log in.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "skillswap_vit_jwt_secret_key_super_secure_2026";

  try {
    const decoded = jwt.verify(token, secret) as AuthenticatedUserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    const err = error as Error;
    if (err.name === "TokenExpiredError") {
      res.status(401).json({
        success: false,
        message: "Your session has expired. Please log in again.",
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: "Invalid authentication token. Please log in again.",
    });
  }
}
