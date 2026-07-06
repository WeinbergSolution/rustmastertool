# Phase 1.7-A Implementation Report: Server Pulse Foundation

## Zielsetzung
Aufbau einer Foundation für historische Serverdaten ("Server Pulse" / Population Retention Intelligence), mit deren Hilfe später Verlaufskurven, Queue-Druck und Health-Scores pro Rust-Server visualisiert werden können.

## Was implementiert wurde
1. **DB-Schema (`20260706001000_server_population_snapshots.sql`)**:
   - `server_population_snapshots`: Speichert regelmäßige Messpunkte von Server-Populationen.
   - `server_wipe_events`: Speichert aufgetretene Wipes.
   - Die Tabellen sind public read-only (für die Anzeige im UI). Writes erfolgen ausschließlich über Service Role (Edge Function).
2. **Edge Function (`server-pulse-ingest`)**:
   - Fetched BattleMetrics-Daten seitenweise (limitiert auf max 5 Seiten pro Lauf).
   - Führt ein Upsert in `provider_servers` durch.
   - Fügt Snapshots in `server_population_snapshots` ein (truncating to minute um Spams zu vermeiden).
   - Abgesichert via `SERVER_PULSE_INGEST_SECRET`.
3. **Frontend UI (Server Pulse)**:
   - Neues `Server Pulse` Item in der Sidebar (Partial).
   - Eigene `ServerPulseView.tsx` mit einer Info, was Pulse ist, und einem Ingest-Runbook-Block für Admins.
   - Im `ServerDetailPanel.tsx` wird nach dem Fetch des internen Server-UUIDs ein Snapshot-Check durchgeführt. Falls Snapshots vorhanden sind, werden Anzahl und letzter Beobachtungszeitpunkt angezeigt (mit einem Mini-Graph-Platzhalter). Falls nicht, ein ehrlicher Empty State.
4. **Docs & Runbooks**:
   - `docs/runbooks/phase-1-7-a-server-pulse-ingest.md` angelegt.

## Was NICHT implementiert wurde (Guardrails eingehalten)
- Keine Fake-Daten, keine Dummy-Graphen.
- Kein aggressives Crawling, harte Limits auf Pages.
- Keine ML oder Predictions.
- Keine Map/Rust+ Integration.
- Steam Login, Servers Explorer, Watchlist, Active Server und Logout Boundary blieben unberührt und intakt.

## Security Checks
- Tokens/Secrets verbleiben im Backend.
- Das Runbook enthält keine echten Passwörter.
- RLS auf DB-Ebene schützt vor Client-Writes.

## Nächste Schritte (Owner Gate)
Der Code ist bereit, aber **es wurde noch nichts nach Remote gepusht/deployed.** 
1. `npx supabase db push` nach Freigabe.
2. `npx supabase functions deploy server-pulse-ingest` nach Freigabe.
3. Danach manueller Ingest-Test via cURL.
