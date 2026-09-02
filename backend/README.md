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

## 3 — Install dependencies

```bash
cd backend
npm install
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

## 6 — Common connection errors

| Error | Likely cause |
|-------|-------------|
| `ECONNREFUSED` | PostgreSQL is not running |
| `password authentication failed` | Wrong `DB_PASSWORD` in `.env` |
| `database "skillswap" does not exist` | Run `CREATE DATABASE skillswap;` |
| `role "postgres" does not exist` | Use your actual PostgreSQL username |

---

## Project structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts              ← PostgreSQL connection pool
│   ├── controllers/
│   │   └── healthController.ts
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
| `npm start` | Run compiled production build |
| `npm run build` | Compile TypeScript → `dist/` |
| `npm run typecheck` | Type-check without emitting files |
