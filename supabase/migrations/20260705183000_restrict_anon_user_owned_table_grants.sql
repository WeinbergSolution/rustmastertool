-- Fix: Restrict anon access on user-owned tables
-- Korrigiert Remote-Smoke-Fund aus Phase 1.1-B.
-- User-owned Tabellen dürfen für anon nicht lesbar sein.
-- Authenticated-Zugriff bleibt RLS-scoped.
-- Keine Service Role im Frontend.

-- A. anon/PUBLIC Rechte auf user-owned Tabellen entfernen
REVOKE ALL ON TABLE public.profiles FROM anon;
REVOKE ALL ON TABLE public.profiles FROM PUBLIC;

REVOKE ALL ON TABLE public.user_watchlists FROM anon;
REVOKE ALL ON TABLE public.user_watchlists FROM PUBLIC;

REVOKE ALL ON TABLE public.watchlist_items FROM anon;
REVOKE ALL ON TABLE public.watchlist_items FROM PUBLIC;

REVOKE ALL ON TABLE public.alert_rules FROM anon;
REVOKE ALL ON TABLE public.alert_rules FROM PUBLIC;

REVOKE ALL ON TABLE public.alert_events FROM anon;
REVOKE ALL ON TABLE public.alert_events FROM PUBLIC;

-- B. authenticated Rechte explizit setzen
GRANT SELECT, INSERT, UPDATE ON TABLE public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.user_watchlists TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.watchlist_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.alert_rules TO authenticated;
GRANT SELECT ON TABLE public.alert_events TO authenticated;

-- C. Policies prüfen/härten
-- Falls bekannte anon/public Policies existieren, droppen:
DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Anon can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public can view user_watchlists" ON public.user_watchlists;
DROP POLICY IF EXISTS "Anon can view user_watchlists" ON public.user_watchlists;
DROP POLICY IF EXISTS "Public can view watchlist_items" ON public.watchlist_items;
DROP POLICY IF EXISTS "Anon can view watchlist_items" ON public.watchlist_items;
DROP POLICY IF EXISTS "Public can view alert_rules" ON public.alert_rules;
DROP POLICY IF EXISTS "Anon can view alert_rules" ON public.alert_rules;
DROP POLICY IF EXISTS "Public can view alert_events" ON public.alert_events;
DROP POLICY IF EXISTS "Anon can view alert_events" ON public.alert_events;
