-- Client Role Grants for Supabase (Least Privilege)

-- 1. Schema Usage
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 2. Public Read Tables
GRANT SELECT ON public.provider_servers TO anon, authenticated;
GRANT SELECT ON public.provider_source_status TO anon, authenticated;
-- No write grants for client roles on provider tables

-- 3. Authenticated User Tables
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
-- Insert profiles is handled via trigger usually, or if client does it, we might need INSERT.
-- The RLS policy says "Users can insert own profile". So let's grant INSERT.
GRANT INSERT ON public.profiles TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_watchlists TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.watchlist_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.alert_rules TO authenticated;

-- 4. Alert Events
-- Client can read, update (mark as read), and delete own alerts. Client CANNOT insert.
GRANT SELECT, UPDATE, DELETE ON public.alert_events TO authenticated;

-- No grants for anon on user tables (profiles, user_watchlists, watchlist_items, alert_rules, alert_events)
