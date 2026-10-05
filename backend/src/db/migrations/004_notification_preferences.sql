-- =============================================================================
-- Migration 004: Add notification preferences column to users table
-- =============================================================================

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{"sessionRequests":true,"sessionReminders":true,"messages":true,"reviews":true,"credits":true,"emailNotifications":false}'::jsonb;
