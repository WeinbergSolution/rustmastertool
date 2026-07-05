-- Fix: Restrict alert_events Client Grants
-- Korrigiert Remote-Smoke-Fund aus Phase 1.1-B.
-- alert_events ist system/server-managed.
-- Clients dürfen nur eigene Events lesen, aber nicht erzeugen, ändern oder löschen.
-- service_role/serverseitige Alert Engine ist später separat und nie im Frontend.

-- A. Table Privileges härten
-- Wir entziehen explizit alle Rechte für anon und authenticated,
-- falls durch PUBLIC oder Default-Supabase-Settings etwas gewährt wurde.
REVOKE ALL ON TABLE public.alert_events FROM anon;
REVOKE ALL ON TABLE public.alert_events FROM authenticated;
REVOKE ALL ON TABLE public.alert_events FROM PUBLIC;

-- Und gewähren dann ausschließlich SELECT für authenticated
GRANT SELECT ON TABLE public.alert_events TO authenticated;

-- B. Policies härten
-- Zunächst alte Policies löschen (falls sie Update/Delete erlaubt haben)
DROP POLICY IF EXISTS "Users can update own alert events" ON public.alert_events;
DROP POLICY IF EXISTS "Users can delete own alert events" ON public.alert_events;

-- Auch die Select Policy sicherheitshalber neu erstellen (idempotent)
DROP POLICY IF EXISTS "Users can select own alert events" ON public.alert_events;

CREATE POLICY "alert_events_select_own"
ON public.alert_events
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
