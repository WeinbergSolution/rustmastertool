-- Fix: Restrict Provider Table Client Write Grants
-- Korrigiert Remote-Smoke-Fund aus Phase 1.1-B.
-- Provider-Tabellen sind system/server-managed.
-- Clients dürfen lesen, aber nicht erzeugen, ändern oder löschen.
-- Serverseitiger Provider-Ingest kommt später getrennt und niemals per Frontend-Service-Role.

-- A. Provider Table Privileges härten
-- Für public.provider_servers:
REVOKE ALL ON TABLE public.provider_servers FROM anon;
REVOKE ALL ON TABLE public.provider_servers FROM authenticated;
REVOKE ALL ON TABLE public.provider_servers FROM PUBLIC;

GRANT SELECT ON TABLE public.provider_servers TO anon;
GRANT SELECT ON TABLE public.provider_servers TO authenticated;

-- Für public.provider_source_status:
REVOKE ALL ON TABLE public.provider_source_status FROM anon;
REVOKE ALL ON TABLE public.provider_source_status FROM authenticated;
REVOKE ALL ON TABLE public.provider_source_status FROM PUBLIC;

GRANT SELECT ON TABLE public.provider_source_status TO anon;
GRANT SELECT ON TABLE public.provider_source_status TO authenticated;

-- B. Provider Policies härten
-- Alte/fehlerhafte Policies droppen (falls versehentlich angelegt)
DROP POLICY IF EXISTS "Public can view provider servers" ON public.provider_servers;
DROP POLICY IF EXISTS "Public can view provider source status" ON public.provider_source_status;
-- Eventuelle write-policies sicherheitshalber droppen, auch wenn nicht bekannt
DROP POLICY IF EXISTS "Users can insert provider servers" ON public.provider_servers;
DROP POLICY IF EXISTS "Users can update provider servers" ON public.provider_servers;
DROP POLICY IF EXISTS "Users can delete provider servers" ON public.provider_servers;
DROP POLICY IF EXISTS "Users can insert provider source status" ON public.provider_source_status;
DROP POLICY IF EXISTS "Users can update provider source status" ON public.provider_source_status;
DROP POLICY IF EXISTS "Users can delete provider source status" ON public.provider_source_status;

-- SELECT Policies sauber neu anlegen
CREATE POLICY "provider_servers_select_public"
ON public.provider_servers
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "provider_source_status_select_public"
ON public.provider_source_status
FOR SELECT
TO anon, authenticated
USING (true);
