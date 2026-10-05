# 🎓 SkillSwap — Campus Skill Exchange & Peer Mentorship Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.0-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

**SkillSwap** is a full-stack, peer-to-peer university mentorship and skill-exchange platform. It enables college students to exchange academic, technical, and creative skills through 1-on-1 scheduled sessions, integrated video classrooms, real-time messaging, and a credit-based honor economy.

---

## 📑 Table of Contents

- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Database Schema](#-database-schema)
- [API Overview](#-api-overview)
- [Directory Structure](#-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
  - [Running with Docker](#3-running-with-docker-optional)
- [Environment Variables](#-environment-variables)
- [Production Deployment](#-production-deployment-aws-ec2--nginx)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Key Features

### 🔐 Authentication & Onboarding
- **Multi-method Auth**: Email/Password authentication with salted bcrypt hashes + Google OAuth 2.0 integration.
- **Forgot Password & Recovery**: Secure 6-digit OTP email verification via Nodemailer with timed expiration and automatic cleanup.
- **2-Step Profile Onboarding**:
  - Step 1: Campus department, year of study, headline, and bio.
  - Step 2: Interactive search & selection of skills offered (teaching) and skills desired (learning) with proficiency levels.

### 🔍 Mentor & Skill Discovery
- **Live Search & Filter**: Search peers by name, skill tag, or department (CSE, ECE, IT, EEE, MECH, etc.).
- **Smart Categorization**: Browse tech stacks (React, Python, DSA, AI/ML, Cloud) and creative arts.
- **Dynamic Rating Badge**: Mentors display real-time computed average star ratings and review tallies.
- **Detailed Mentor Profiles**: Bio, campus year, skills offered/wanted, hourly slot availability, and verified peer reviews.

### 📅 1-on-1 Mentorship Sessions
- **Frictionless Booking**: Reserve sessions based on mentor availability with conflict checking.
- **Request Management**: Mentors can accept, decline, or suggest rescheduling for incoming requests.
- **Two-Way Rescheduling**: Propose alternate session dates and times with counterparty review.
- **Session Notes & Agendas**: Collaborative markdown/rich notes linked directly to completed sessions.

### 🎥 Live Video Classroom
- **Integrated Jitsi Meet**: WebRTC-powered video conferencing with zero external software required.
- **Lobby & Waiting Room**: Role-aware pre-call checks (camera, mic) and instant connection to peer rooms.
- **In-Session Collaboration**: Screen sharing, text chat, collaborative whiteboard, and tile views.

### 💬 Direct Peer Messaging
- **Conversation Threads**: Private 1-on-1 chat channels linked to user profiles and mentorship sessions.
- **Member Search**: Find any registered campus member by name or skill to initiate a chat.
- **Unread Tracking**: Real-time unread badge counts across the sidebar, topbar, and conversation list.

### 💰 Skill Credit Economy
- **Fair Exchange System**: Every student begins with starting credits.
  - Learners spend credits to book a mentorship session (-5 credits).
  - Mentors earn credits upon successful session completion (+10 credits).
- **Transaction History**: Transparent audit ledger of credit grants, bookings, and completions.

### ⭐ Reputation & Reviews
- **Verified Feedback**: Only students who complete a session can submit ratings (1–5 stars) and testimonials.
- **Weighted Mentor Rating**: Mentor profile cards dynamically aggregate reviews into an average rating.

### 🔔 Centralized Notifications
- Real-time in-app alerts for session requests, status updates, new messages, reviews, and wallet transactions.
- Filter notifications by `All`, `Unread`, `Sessions`, `Messages`, `Reviews`, `Credits`, and `System`.

---

## 🏛️ System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                       Client Browser                        │
│             React 19 + TypeScript + Vite + Tailwind 4        │
└──────────────┬──────────────────────────────▲───────────────┘
               │ HTTP / REST                  │ WebRTC
               ▼                              ▼
┌──────────────────────────────┐       ┌──────────────────────┐
│       Node.js / Express      │       │      Jitsi Meet      │
│      TypeScript API Layer    │       │     Video Server     │
└──────────────┬───────────────┘       └──────────────────────┘
               │ pg Pool
               ▼
┌──────────────────────────────┐
│      PostgreSQL 16 DB        │
│   16 Normalized Relations    │
└──────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **HTTP Client**: Native Fetch API with custom typed wrappers
- **Video Call**: `@jitsi/react-sdk`

### Backend
- **Runtime**: [Node.js 20.x LTS](https://nodejs.org/)
- **Server Framework**: [Express 4.21](https://expressjs.com/) + TypeScript
- **Database**: [PostgreSQL 16](https://www.postgresql.org/) (`pg` connection pool)
- **Security & Auth**: `jsonwebtoken` (JWT), `bcryptjs`, `cors`, `helmet`, `express-rate-limit`
- **Email Service**: `nodemailer` (SMTP / Gmail App Passwords)
- **Validation**: Strict TypeScript interfaces & request body sanitizers

---

## 🗄️ Database Schema

The database consists of **16 normalized relational tables** managed through automated SQL migrations:

| Table Name | Description |
| :--- | :--- |
| `users` | User accounts, hashed passwords, roles, departments, avatars, bio |
| `skills` | Master catalog of technical and non-technical skills |
| `user_skills` | Junction table linking users to skills offered or desired |
| `availability_slots` | Day-of-week and recurring time slots for mentors |
| `sessions` | 1-on-1 mentorship bookings, scheduled timestamps, status |
| `reschedule_requests`| Proposed alternative session dates/times awaiting approval |
| `session_notes` | Shared agendas and summaries created during or after sessions |
| `reviews` | Star ratings and testimonials submitted post-session |
| `conversations` | 1-on-1 messaging threads between two peers |
| `messages` | Individual chat messages with read receipts |
| `notifications` | User alerts with category tagging and route redirections |
| `wallets` | Virtual balance for each user |
| `wallet_transactions`| Detailed ledger of credit additions, deductions, and transfers |
| `password_reset_tokens`| One-time hashed tokens and OTPs for account recovery |
| `email_verifications`| Account verification tokens |
| `migrations` | Schema migration tracking log |

---

## 📡 API Overview

### Authentication (`/api/auth`)
- `POST /register` — Create new student account.
- `POST /login` — Authenticate and receive JWT access token.
- `GET /me` — Fetch authenticated user profile.
- `POST /forgot-password` — Request a 6-digit password reset OTP.
- `POST /reset-password` — Verify OTP and set a new password.
- `POST /google` — Google OAuth credential login/signup.

### Onboarding & Users (`/api/onboarding`, `/api/users`)
- `POST /api/onboarding` — Complete 2-step profile setup (bio, skills).
- `GET /api/users` — List users with optional search/filter queries.
- `GET /api/users/:id` — Retrieve comprehensive public profile.

### Mentors & Skills (`/api/mentors`, `/api/skills`)
- `GET /api/mentors` — List active mentors with skills and ratings.
- `GET /api/mentors/:id/availability` — Fetch mentor booking slots.
- `GET /api/skills` — Fetch all available skills and categories.

### Sessions (`/api/sessions`)
- `GET /api/sessions` — Fetch user's upcoming, pending, and past sessions.
- `POST /api/sessions` — Book a new mentorship session.
- `PATCH /api/sessions/:id/status` — Accept, decline, or complete a session.
- `POST /api/sessions/:id/reschedule` — Propose rescheduling for a session.
- `PATCH /api/sessions/reschedule/:requestId` — Accept/reject reschedule request.

### Messaging (`/api/messages`)
- `GET /api/messages/conversations` — List conversations with unread counts.
- `GET /api/messages/:conversationId` — Retrieve messages for a conversation.
- `POST /api/messages` — Send a direct message.
- `PATCH /api/messages/:conversationId/read` — Mark conversation as read.

### Wallet & Reviews (`/api/wallet`, `/api/reviews`)
- `GET /api/wallet` — Retrieve credit balance and recent transactions.
- `POST /api/reviews` — Submit post-session rating and feedback.
- `GET /api/reviews/mentor/:mentorId` — Retrieve all reviews for a mentor.

---

## 📁 Directory Structure

```text
campus-skill-exchange/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment configuration & DB connection pool
│   │   ├── db/              # SQL schema, seeds, and migration runner
│   │   │   ├── migrations/  # Incremental database migrations
│   │   │   ├── schema.sql   # Full PostgreSQL schema definition
│   │   │   └── seed.ts      # Initial seed data
│   │   ├── middleware/      # JWT auth, error handlers, rate-limiting
│   │   ├── modules/         # Feature controllers, services & routes
│   │   │   ├── auth/        # Login, registration, OTP reset, Google OAuth
│   │   │   ├── onboarding/  # Profile setup & skill assignment
│   │   │   ├── mentors/     # Mentors & availability query handlers
│   │   │   ├── sessions/    # Session lifecycle & rescheduling
│   │   │   ├── messages/    # Direct messaging & conversation threads
│   │   │   ├── notifications/# User alerts & unread tracking
│   │   │   ├── reviews/     # Ratings & mentor aggregate calculation
│   │   │   ├── notes/       # Shared session notes
│   │   │   ├── skills/      # Skill taxonomy & search
│   │   │   └── wallet/      # Skill credit transactions
│   │   ├── app.ts           # Express application configuration
│   │   └── server.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components by domain
│   │   │   ├── auth/        # Login, Signup & ForgotPassword forms
│   │   │   ├── dashboard/   # Sidebar, Topbar, WelcomeBanner, StatsCards
│   │   │   ├── explore/     # Search, filter tabs, mentor grid
│   │   │   ├── messages/    # Conversation list, ChatWindow, MessageList
│   │   │   ├── onboarding/  # Step 1 (Bio) & Step 2 (Skills) wizard
│   │   │   ├── session/     # Session cards, room lobby, notes editor
│   │   │   └── ui/          # Reusable badges, modals, avatars
│   │   ├── context/         # React Contexts (Auth, Chat, Session, Wallet, Notification)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Routed view pages
│   │   ├── routes/          # AppRoutes definition
│   │   ├── services/        # Frontend API clients
│   │   ├── types/           # Shared TypeScript interfaces
│   │   └── index.css        # Global CSS & Tailwind configuration
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml       # Multi-container orchestration (PostgreSQL + Backend + Frontend)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL**: v14.0 or higher (or Docker)
- **Git**

---

### 1. Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example `.env` file and configure your credentials:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your PostgreSQL database credentials and JWT secret (see [Environment Variables](#-environment-variables)).

4. **Run Database Migrations**:
   ```bash
   npm run migrate
   ```

5. **Start Backend Development Server**:
   ```bash
   npm run dev
   ```
   The backend API will run on **`http://localhost:5000`** (Health check: `http://localhost:5000/api/health`).

---

### 2. Frontend Setup

1. **Open a new terminal and navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```
   Ensure `VITE_API_URL=http://localhost:5000/api` is set.

4. **Start Vite Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at **`http://localhost:5173`**.

---

### 3. Running with Docker (Optional)

Run the entire stack (PostgreSQL, Backend API, and Frontend) in Docker containers with a single command:

```bash
docker-compose up --build
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **PostgreSQL Database**: `localhost:5432`

To shut down the containers:
```bash
docker-compose down
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=skillswap
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRES_IN=7d

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# SMTP Email (For Password Reset OTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM="SkillSwap Support <noreply@skillswap.edu>"
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

---

## ☁️ Production Deployment (AWS EC2 + Nginx)

1. **Launch an AWS EC2 Instance** (Ubuntu 24.04 LTS, `t2.micro` or `t2.small`).
2. **Configure Security Group**:
   - Inbound: Port `80` (HTTP), Port `443` (HTTPS), Port `22` (SSH).
3. **Connect to your EC2 instance**:
   ```bash
   ssh -i "your-key.pem" ubuntu@<EC2-PUBLIC-IP>
   ```
4. **Install Dependencies**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs postgresql nginx git
   ```
5. **Clone & Build**:
   ```bash
   git clone https://github.com/ChidviReddy/campus-skill-exchange.git
   cd campus-skill-exchange
   
   # Build Frontend
   cd frontend
   npm install
   npm run build
   
   # Setup Backend with PM2
   cd ../backend
   npm install
   npm run build
   sudo npm install -g pm2
   pm2 start dist/server.js --name "skillswap-api"
   pm2 save
   pm2 startup
   ```
6. **Serve Frontend via Nginx**:
   ```bash
   sudo cp -r dist/* /var/www/html/
   sudo systemctl restart nginx
   ```

---

## 🤝 Contributing

Contributions make the open-source community a powerful place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for campus peer learning and collaborative growth.
</p>
