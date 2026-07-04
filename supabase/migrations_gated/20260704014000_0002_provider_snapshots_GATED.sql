-- DO NOT APPLY.
-- GATED until BattleMetrics terms are clarified and polling budget is recalibrated.
-- This file is documentation/preparation only.

-- Provider Snapshots (Historical Data)
/*
CREATE TABLE public.provider_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_server_id uuid NOT NULL REFERENCES public.provider_servers(id) ON DELETE CASCADE,
  captured_at timestamptz NOT NULL,
  players integer NOT NULL,
  queue integer DEFAULT 0,
  entity_count integer,
  fps integer,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.provider_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view provider snapshots" ON public.provider_snapshots FOR SELECT USING (true);
-- No auth writes (managed by backend service role)
*/
