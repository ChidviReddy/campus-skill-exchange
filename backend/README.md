# SkillSwap Backend

Express + PostgreSQL API server for the SkillSwap campus skill-exchange platform.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | v18 or later |
| PostgreSQL | v14 or later |

---

## 1 — Create the PostgreSQL database

Open `psql` (or pgAdmin) and run:

```sql
CREATE DATABASE skillswap;
```

---

## 2 — Configure environment variables

Copy the example file and fill in your local values:

```bash
cp .env.example .env
```

Open `backend/.env` and set your PostgreSQL password:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_real_password_here
DB_NAME=skillswap
```

> **Never commit `.env` — it is listed in `.gitignore`.**

---

## 3 — Install dependencies & Run Migrations

```bash
cd backend
npm install
npm run migrate
```

---

## 4 — Start in development mode

```bash
npm run dev
```

Expected terminal output:

```
✅  PostgreSQL connected successfully
🚀  SkillSwap backend running on http://localhost:5000
   Health check  → http://localhost:5000/api/health
   DB check      → http://localhost:5000/api/health/database
```

---

## 5 — Test the API

### API liveness

```
GET http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "SkillSwap API is running"
}
```

### Database connectivity

```
GET http://localhost:5000/api/health/database
```

Expected response:

```json
{
  "success": true,
  "message": "PostgreSQL database connection is working",
  "serverTime": "2026-09-02T..."
}
```

---

## 6 — Database Schema Architecture

The PostgreSQL relational schema comprises 15 tables designed for all campus skill-exchange features:

| Table | Purpose |
|-------|---------|
| `departments` | Academic departments (CSE, ECE, IT, etc.) for filtering |
| `users` | User accounts, profiles, department reference, and VIT authentication placeholder |
| `skills` | Master skill catalog with categories and descriptions |
| `user_skills` | Users teaching or learning specific skills (`TEACH` / `LEARN`) |
| `user_availabilities` | Mentor weekly schedule availability slots |
| `sessions` | Booked & confirmed mentorship sessions with status lifecycle |
| `session_requests` | Session proposals from learners with auto-expiration tracking |
| `reschedule_requests` | Reschedule proposals initiated by either mentor or learner |
| `conversations` | 1-on-1 direct messaging threads |
| `messages` | Chat messages with read receipts |
| `notifications` | User-isolated notification stream (session, review, credit, message) |
| `reviews` | Post-session learner reviews for mentors (1.0 - 5.0 rating) |
| `session_notes` | PDF resource attachments and structured session takeaways |
| `wallets` | User credit balance (starts at 35 credits) |
| `credit_transactions` | Audit ledger (+10 teach, -5 learn, bonus, adjustment) |

---

## Project structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts              ← PostgreSQL connection pool
│   ├── controllers/
│   │   └── healthController.ts
│   ├── db/
│   │   ├── schema.sql         ← Complete PostgreSQL relational DDL
│   │   ├── migrate.ts         ← Database migration runner
│   │   └── verifySchema.ts    ← Schema verification script
│   ├── middleware/
│   │   └── errorMiddleware.ts
│   ├── routes/
│   │   └── healthRoutes.ts
│   ├── app.ts                 ← Express app setup
│   └── server.ts              ← Entry point
├── .env                       ← Local secrets (git-ignored)
├── .env.example               ← Safe template to share
├── .gitignore
├── nodemon.json
├── package.json
├── README.md
└── tsconfig.json
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon (auto-reload on file save) |
| `npm run migrate` | Apply `schema.sql` migrations to PostgreSQL |
| `npm start` | Run compiled production build |
| `npm run build` | Compile TypeScript → `dist/` |
| `npm run typecheck` | Type-check without emitting files |
