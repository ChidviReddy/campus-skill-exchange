import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { testDatabaseConnection } from "./config/db";

const PORT = Number(process.env.PORT) || 5000;

async function startServer(): Promise<void> {
  // Test the database connection before accepting traffic
  await testDatabaseConnection();

  app.listen(PORT, () => {
    console.log(`🚀  SkillSwap backend running on http://localhost:${PORT}`);
    console.log(`   Health check  → http://localhost:${PORT}/api/health`);
    console.log(`   DB check      → http://localhost:${PORT}/api/health/database`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
