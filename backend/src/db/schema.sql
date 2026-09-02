-- =============================================================================
-- SkillSwap PostgreSQL Database Schema
-- Designed for VIT Campus Skill Exchange Platform
-- =============================================================================

-- Enable UUID extension (built-in in PG13+, safe fallback)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. DEPARTMENTS TABLE
-- Academic departments supported for user categorization and filtering
-- =============================================================================
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 2. USERS TABLE
-- Represents registered SkillSwap user accounts (learners, mentors, faculty)
-- Note: Email domain is restricted to @vitstudent.ac.in and @vit.ac.in at app layer
-- =============================================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    google_id VARCHAR(255) UNIQUE,
    role VARCHAR(50) NOT NULL DEFAULT 'student',
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    registration_number VARCHAR(100),
    university VARCHAR(100) DEFAULT 'VIT Chennai',
    year_of_study VARCHAR(50),
    phone_number VARCHAR(50),
    avatar TEXT,
    bio TEXT,
    experience_years VARCHAR(50),
    projects_built VARCHAR(50),
    languages VARCHAR(255),
    location VARCHAR(150),
    availability_preference VARCHAR(100),
    preferred_time VARCHAR(100),
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    onboarding_step INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 3. SKILLS TABLE
-- Master catalog of skills available across the platform
-- =============================================================================
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100),
    description TEXT,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 4. USER SKILLS TABLE (Relationship: Users <-> Skills)
-- Associates users with skills they can teach or wish to learn
-- =============================================================================
CREATE TABLE IF NOT EXISTS user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    skill_type VARCHAR(20) NOT NULL CHECK (skill_type IN ('TEACH', 'LEARN')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_skill_type UNIQUE (user_id, skill_id, skill_type)
);

-- =============================================================================
-- 5. USER AVAILABILITY TABLE
-- Weekly recurring schedule slots configured by mentors
-- =============================================================================
CREATE TABLE IF NOT EXISTS user_availabilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    day_of_week VARCHAR(20) NOT NULL CHECK (
        day_of_week IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')
    ),
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_availability_day UNIQUE (user_id, day_of_week)
);

-- =============================================================================
-- 6. SESSIONS TABLE
-- Represents booked or confirmed mentorship sessions
-- =============================================================================
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mentor_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    learner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    skill_id UUID REFERENCES skills(id) ON DELETE SET NULL,
    topic VARCHAR(200) NOT NULL,
    session_description TEXT,
    learner_goal TEXT,
    scheduled_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    credits INTEGER NOT NULL DEFAULT 5,
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'upcoming', 'in_progress', 'completed', 'cancelled', 'rejected')
    ),
    is_started BOOLEAN NOT NULL DEFAULT FALSE,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_session_distinct_users CHECK (mentor_id <> learner_id)
);

-- =============================================================================
-- 7. SESSION REQUESTS TABLE
-- Tracks mentorship requests sent from learner to mentor
-- =============================================================================
CREATE TABLE IF NOT EXISTS session_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'accepted', 'declined', 'cancelled', 'expired')
    ),
    requested_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_request_distinct_users CHECK (requester_id <> recipient_id)
);

-- =============================================================================
-- 8. RESCHEDULE REQUESTS TABLE
-- Tracks rescheduling proposals initiated by mentor or learner
-- =============================================================================
CREATE TABLE IF NOT EXISTS reschedule_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    requested_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    requested_to UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    proposed_date DATE NOT NULL,
    proposed_start_time TIME NOT NULL,
    proposed_end_time TIME NOT NULL,
    reason TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'accepted', 'declined', 'cancelled', 'expired')
    ),
    responded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_reschedule_distinct_users CHECK (requested_by <> requested_to)
);

-- =============================================================================
-- 9. CONVERSATIONS TABLE
-- 1-on-1 direct message threads between platform users
-- =============================================================================
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_one_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    participant_two_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_conversation_order CHECK (participant_one_id < participant_two_id),
    CONSTRAINT uq_conversation_participants UNIQUE (participant_one_id, participant_two_id)
);

-- =============================================================================
-- 10. MESSAGES TABLE
-- Individual chat messages within conversations
-- =============================================================================
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_message_distinct_users CHECK (sender_id <> receiver_id)
);

-- =============================================================================
-- 11. NOTIFICATIONS TABLE
-- User-specific alert stream (session updates, chat, reviews, wallet)
-- =============================================================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (
        type IN ('session', 'message', 'review', 'credit', 'system')
    ),
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    related_id VARCHAR(100),
    related_route VARCHAR(255),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 12. REVIEWS TABLE
-- Completed session reviews submitted by learner for mentor
-- =============================================================================
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 1.0 AND rating <= 5.0),
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_session_reviewer UNIQUE (session_id, reviewer_id),
    CONSTRAINT chk_review_distinct_users CHECK (reviewer_id <> reviewee_id)
);

-- =============================================================================
-- 13. SESSION NOTES TABLE
-- PDF attachments, feedback, takeaways, and resources per session
-- =============================================================================
CREATE TABLE IF NOT EXISTS session_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    uploaded_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    summary TEXT,
    key_takeaways JSONB DEFAULT '[]'::jsonb,
    additional_notes TEXT,
    mentor_feedback TEXT,
    recommended_resources JSONB DEFAULT '[]'::jsonb,
    file_name VARCHAR(255),
    file_url TEXT,
    file_size_bytes BIGINT,
    file_type VARCHAR(100) DEFAULT 'application/pdf',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 14. WALLETS TABLE
-- User credit balance (35 initial starting balance for peer learning)
-- =============================================================================
CREATE TABLE IF NOT EXISTS wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    balance INTEGER NOT NULL DEFAULT 40 CHECK (balance >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 15. CREDIT TRANSACTIONS TABLE
-- Audit log of all credit operations (+10 teach, -5 learn, refund, etc.)
-- =============================================================================
CREATE TABLE IF NOT EXISTS credit_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    wallet_id UUID REFERENCES wallets(id) ON DELETE CASCADE,
    session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    amount INTEGER NOT NULL,
    transaction_type VARCHAR(50) NOT NULL CHECK (
        transaction_type IN ('SESSION_TAUGHT', 'SESSION_LEARNED', 'INITIAL_SIGNUP_BONUS', 'INITIAL_BONUS', 'REFUND', 'ADJUSTMENT')
    ),
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- INDEXES FOR COMMONLY QUERIED FIELDS
-- =============================================================================

-- Users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_department ON users(department_id);

-- Skills
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_department ON skills(department_id);

-- User Skills
CREATE INDEX IF NOT EXISTS idx_user_skills_user ON user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_skill ON user_skills(skill_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_type ON user_skills(skill_type);

-- User Availabilities
CREATE INDEX IF NOT EXISTS idx_user_availabilities_user ON user_availabilities(user_id);

-- Sessions
CREATE INDEX IF NOT EXISTS idx_sessions_mentor ON sessions(mentor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_learner ON sessions(learner_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_sessions_skill ON sessions(skill_id);

-- Session Requests
CREATE INDEX IF NOT EXISTS idx_session_requests_session ON session_requests(session_id);
CREATE INDEX IF NOT EXISTS idx_session_requests_recipient ON session_requests(recipient_id);
CREATE INDEX IF NOT EXISTS idx_session_requests_requester ON session_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_session_requests_status ON session_requests(status);
CREATE INDEX IF NOT EXISTS idx_session_requests_expires ON session_requests(expires_at);

-- Reschedule Requests
CREATE INDEX IF NOT EXISTS idx_reschedule_requests_session ON reschedule_requests(session_id);
CREATE INDEX IF NOT EXISTS idx_reschedule_requests_requested_to ON reschedule_requests(requested_to);
CREATE INDEX IF NOT EXISTS idx_reschedule_requests_status ON reschedule_requests(status);

-- Conversations & Messages
CREATE INDEX IF NOT EXISTS idx_conversations_p1 ON conversations(participant_one_id);
CREATE INDEX IF NOT EXISTS idx_conversations_p2 ON conversations(participant_two_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(receiver_id, is_read);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);

-- Notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at);

-- Reviews
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee ON reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_reviews_session ON reviews(session_id);

-- Session Notes
CREATE INDEX IF NOT EXISTS idx_session_notes_session ON session_notes(session_id);

-- Wallet & Transactions
CREATE INDEX IF NOT EXISTS idx_wallets_user ON wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_session ON credit_transactions(session_id);
