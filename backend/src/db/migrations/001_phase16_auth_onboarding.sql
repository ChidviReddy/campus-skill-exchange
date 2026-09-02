-- Migration: 001_phase16_auth_onboarding.sql
-- Add authentication & onboarding columns to users table

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS registration_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS university VARCHAR(100) DEFAULT 'VIT Chennai',
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(50),
ADD COLUMN IF NOT EXISTS availability_preference VARCHAR(100),
ADD COLUMN IF NOT EXISTS preferred_time VARCHAR(100),
ADD COLUMN IF NOT EXISTS github_url TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS portfolio_url TEXT,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS onboarding_step INTEGER NOT NULL DEFAULT 1;

-- Ensure default wallet balance is 40 for new rows
ALTER TABLE wallets ALTER COLUMN balance SET DEFAULT 40;

-- Update credit_transactions check constraint to support INITIAL_SIGNUP_BONUS
ALTER TABLE credit_transactions DROP CONSTRAINT IF EXISTS credit_transactions_transaction_type_check;
ALTER TABLE credit_transactions ADD CONSTRAINT credit_transactions_transaction_type_check 
CHECK (transaction_type IN ('SESSION_TAUGHT', 'SESSION_LEARNED', 'INITIAL_SIGNUP_BONUS', 'INITIAL_BONUS', 'REFUND', 'ADJUSTMENT'));

-- Index for google_id lookups and onboarding status
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
CREATE INDEX IF NOT EXISTS idx_users_onboarding ON users(onboarding_completed, onboarding_step);
