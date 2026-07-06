-- 20260706040901_base_blueprints_youtube.sql
-- Migration: Base Blueprints Foundation (YouTube)

-- A) base_blueprints
CREATE TABLE IF NOT EXISTS public.base_blueprints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL DEFAULT 'youtube',
  youtube_video_id text UNIQUE NOT NULL,
  title text NOT NULL,
  channel_title text,
  channel_id text,
  description text,
  thumbnail_url text,
  published_at timestamptz,
  duration_iso text,
  duration_seconds integer,
  default_search_query text,
  category text,
  tags text[],
  base_type text,
  group_size text,
  wipe_stage text,
  difficulty text,
  build_cost_notes text,
  upkeep_notes text,
  raid_resistance_notes text,
  raw_youtube jsonb,
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.base_blueprints ENABLE ROW LEVEL SECURITY;

-- Base Blueprints are readable by everyone
CREATE POLICY "Base blueprints are readable by public"
  ON public.base_blueprints FOR SELECT
  USING (true);

-- B) user_saved_blueprints
CREATE TABLE IF NOT EXISTS public.user_saved_blueprints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  blueprint_id uuid NOT NULL REFERENCES public.base_blueprints(id) ON DELETE CASCADE,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, blueprint_id)
);

-- Enable RLS
ALTER TABLE public.user_saved_blueprints ENABLE ROW LEVEL SECURITY;

-- User Saved Blueprints Policies
CREATE POLICY "Users can view own saved blueprints"
  ON public.user_saved_blueprints FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved blueprints"
  ON public.user_saved_blueprints FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved blueprints"
  ON public.user_saved_blueprints FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own saved blueprints"
  ON public.user_saved_blueprints FOR UPDATE
  USING (auth.uid() = user_id);
