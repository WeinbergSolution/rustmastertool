# Current Sprint (Phase 1.9-A)

**Phase:** Phase 1.9-A Automation and Blueprint Polish (IMPLEMENTATION)

## Was geändert wurde
- [x] Phase 1.4-A: Steam Login + Active Server Core Loop
- [x] Phase 1.5-A: Three-Layer Navigation + Command-Center Dashboard + MyRust Shell
- [x] Phase 1.6-A: Server Explorer Data Expansion + BattleMetrics Filters + Base Blueprints Shell
- [x] Phase 1.7-A: Server Pulse / Population Retention Foundation
- [x] Phase 1.7-B: Server Pulse Activation + Retention Intelligence UI
- [x] Phase 1.8-A: Base Blueprints YouTube Foundation
- [x] Phase 1.9-A: Automation and Blueprint Polish
  - **Server Pulse Scheduler**: Migration `20260706074028_server_pulse_scheduler.sql` erstellt für Zustand und Historie (`server_pulse_scheduler_state`, `server_pulse_ingest_runs`).
  - **Edge Function (server-pulse-ingest)**: Erweitert, um jeden Durchlauf (inklusive Errors, Processed Counts) in die Datenbank zu schreiben.
  - **Server Pulse UI**: Überarbeitet und um Metriken, Scheduler-Zustand und die Liste der letzten Durchläufe (Recent Runs) ergänzt.
  - **Base Blueprints Search**: Edge Function (`base-blueprints`) sucht nun cache-first auch in den `tags` (Array-Intersection), Titel und Kategorie.
  - **Base Blueprints Saved UX**: API-Client (`baseBlueprints.ts`) um Speichern/Löschen-Funktionen ergänzt. `BaseBlueprintsView.tsx` rendert eine "My Saved Blueprints" Zeile am Anfang, sofern der Nutzer eingeloggt ist und Favoriten hat. Das Speichern wurde in die VideoCards integriert.
  - **Player Modal ESC-Handler**: Hinzugefügt (Escape-Taste schließt das YouTube Modal).
  - **Runbooks**: `server-pulse-scheduler.md` und `base-blueprints-library-maintenance.md` wurden erstellt, um Architektur und Wartung sicher und verständlich zu dokumentieren.

## Was NICHT implementiert wurde (Guardrails eingehalten)
- **Keine Secrets in Migrationen**: Der Cron Job (Scheduler) wurde explizit **nicht** als SQL-Statement mit Hardcoded-Secrets angelegt. Dies obliegt dem Remote Gate (Owner) über die UI/Vault, um maximale Sicherheit zu gewährleisten.
- Keine falschen (fake) Saves: Das "Saved"-System schreibt echte Daten in `user_saved_blueprints` (bzw. verlangt einen Login).

## Aktueller Fokus
Owner Gate: Freigabe von DB Push (Scheduler) und Function Deploy (Pulse & Blueprints).

## Nächster sicherer Schritt
1. AI Engineer führt Typechecks & Builds aus.
2. AI Engineer wartet auf Bestätigung für `db push` und Edge Function Deploys.
3. Owner prüft die Architektur (Secret-Ansatz) und gibt Remote Gates frei.
