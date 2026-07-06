-- Migration: Server Pulse Crawl Rotation & Logging

-- 1. Extend scheduler_state with page state
ALTER TABLE public.server_pulse_scheduler_state 
ADD COLUMN IF NOT EXISTS next_page_url text,
ADD COLUMN IF NOT EXISTS next_page_token text,
ADD COLUMN IF NOT EXISTS current_page integer NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS max_page_window integer NOT NULL DEFAULT 20,
ADD COLUMN IF NOT EXISTS last_page_processed integer,
ADD COLUMN IF NOT EXISTS last_reset_at timestamptz;

-- 2. Extend ingest_runs with page stats
ALTER TABLE public.server_pulse_ingest_runs
ADD COLUMN IF NOT EXISTS start_page integer,
ADD COLUMN IF NOT EXISTS end_page integer,
ADD COLUMN IF NOT EXISTS start_page_url text,
ADD COLUMN IF NOT EXISTS end_next_page_url text;
