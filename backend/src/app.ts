import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import healthRoutes from "./routes/healthRoutes";
import authRoutes from "./modules/auth/authRoutes";
import onboardingRoutes from "./modules/onboarding/onboardingRoutes";
import { errorMiddleware, notFoundMiddleware } from "./middleware/errorMiddleware";

// Load environment variables as early as possible
dotenv.config();

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────

// Parse incoming JSON bodies
app.use(express.json());

// CORS — allow the Vite dev server origin (configurable via env)
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/onboarding", onboardingRoutes);

// Future route groups will be added here as new phases are implemented:
//   app.use("/api/users",         userRoutes);
//   app.use("/api/skills",        skillRoutes);
//   app.use("/api/sessions",      sessionRoutes);
//   app.use("/api/messages",      messageRoutes);
//   app.use("/api/notifications", notificationRoutes);
//   app.use("/api/wallet",        walletRoutes);

// ─── Error Handling ───────────────────────────────────────────────────────────

// 404 — must come after all routes
app.use(notFoundMiddleware);

// Centralized error handler — must be the very last middleware
app.use(errorMiddleware);

export default app;
