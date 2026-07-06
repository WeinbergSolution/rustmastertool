-- Add page_size to server_pulse_scheduler_state to allow controlled scaling
ALTER TABLE public.server_pulse_scheduler_state
ADD COLUMN page_size integer NOT NULL DEFAULT 100;

-- Ensure page_size is between 25 and 100
ALTER TABLE public.server_pulse_scheduler_state
ADD CONSTRAINT server_pulse_scheduler_state_page_size_check
CHECK (page_size >= 25 AND page_size <= 100);

-- Update existing defaults
UPDATE public.server_pulse_scheduler_state
SET 
  page_size = 100,
  max_pages_per_run = 1,
  interval_minutes = 60,
  max_page_window = 20
WHERE category IN ('official', 'community', 'modded');
