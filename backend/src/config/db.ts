import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

/**
 * Reusable PostgreSQL connection pool.
 *
 * Uses environment variables — never hardcoded credentials.
 * Configured once and reused across all requests.
 */
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "skillswap",
});

/**
 * Test the database connection on startup.
 * Logs a clear success or failure message.
 * Does NOT crash the process — allows the server to start so
 * health check endpoints can still report the exact error.
 */
export async function testDatabaseConnection(): Promise<void> {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();
    console.log("✅  PostgreSQL connected successfully");
  } catch (error) {
    const err = error as Error;
    console.error("❌  PostgreSQL connection failed:", err.message);
    console.error(
      "    → Check that PostgreSQL is running and .env credentials are correct."
    );
  }
}

export default pool;
