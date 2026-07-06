# Phase 1.7-B Implementation Report: Server Pulse Activation

## Zielsetzung
Aktivierung der Server Pulse Foundation auf Staging und Ausarbeitung der Retention-Logik, ohne Fake-Daten zu generieren. Verbesserung der Gamer-UI durch Entfernen technischer Setup-Kommandos und Einführen ehrlicher "Collecting"-States.

## Was implementiert wurde (Phase 1.7-B)
1. **Remote Deployments**:
   - `supabase db push` wurde erfolgreich ausgeführt (Migration `20260706001000_server_population_snapshots.sql` ist auf Staging).
   - `server-pulse-ingest` Edge Function wurde erfolgreich auf Staging deployed.
2. **Server Pulse View Aufwertung**:
   - Die technischen `curl`-Runbook-Kommandos wurden aus der normalen UI entfernt.
   - Eine echte Status-Anzeige ruft nun über Supabase den globalen Count von `provider_servers` und `server_population_snapshots` ab und zeigt "Data collection is active" oder "Waiting for first ingestion".
3. **Retention Buckets Logik (`retention.ts`)**:
   - Die Funktion `calculatePulseSummary` berechnet ehrlich Peak Players (innerhalb 24h nach Wipe) und baut Buckets (6h, 12h, 18h, 24h, 30h) auf Basis von echten Snapshots auf.
   - Enthält Health Labels (`Strong Retention`, `Moderate Drop`, `Fast Dying`, `Not enough data`).
4. **Server Card & Server Detail UI**:
   - **Server Card**: Zeigt ein dezentes "Pulse collecting" Badge als Teaser für das neue Feature an.
   - **Server Detail**: Zeigt die berechneten Retention-Buckets an, wenn genügend Snapshots vorhanden sind. Wenn nicht, wird ehrlich kommuniziert: "Server Pulse is collecting historical snapshots...".
5. **Topbar Phase Label**:
   - Wurde von "Phase 1.3-A" auf "Server Intelligence Alpha" aktualisiert.

## Was NICHT implementiert wurde (Guardrails eingehalten)
- Keine Fake-Daten, keine Dummy-Graphen.
- Kein aggressives Crawling.
- **Ingestion Execution**: Da das Secret `SERVER_PULSE_INGEST_SECRET` auf Staging aktuell NICHT gesetzt war, wurde die Ingestion *nicht* getriggert, um Errors zu vermeiden. Dies ist nun ein Admin-Task für den Owner.

## Security Checks
- Typecheck & Build: GREEN
- Secret Check: GREEN (Kein Ingest Secret, keine DB URLs im Frontend).

## Nächste Schritte (Owner Task)
Da das `SERVER_PULSE_INGEST_SECRET` auf Supabase noch fehlt, muss der Owner Folgendes tun:
1. `npx supabase secrets set SERVER_PULSE_INGEST_SECRET="<DEIN_WUNSCH_SECRET>"`
2. Danach manueller Ingest-Test via cURL (Runbook liegt in `docs/runbooks/phase-1-7-a-server-pulse-ingest.md`).
3. Browser öffnen und prüfen, ob die UI nach dem ersten Lauf erste Daten anzeigt.
