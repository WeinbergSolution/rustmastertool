-- Phase 1.4-A: Steam Identity and Active Server

-- Add Steam identity columns
ALTER TABLE public.profiles 
  ADD COLUMN steam_id text UNIQUE,
  ADD COLUMN steam_persona_name text,
  ADD COLUMN last_steam_sync_at timestamptz;

-- Add Active Server column
ALTER TABLE public.profiles
  ADD COLUMN active_server_id uuid REFERENCES public.provider_servers(id) ON DELETE SET NULL;

-- Harden Column-Level Grants for authenticated users
-- Revoke the broad UPDATE permission
REVOKE UPDATE ON public.profiles FROM authenticated;

-- Grant UPDATE only on non-restricted columns
GRANT UPDATE (username, avatar_url, active_server_id) ON public.profiles TO authenticated;

-- (The steam_* columns are intentionally excluded from the authenticated grant so they can only be set via service_role in the Edge Function)
