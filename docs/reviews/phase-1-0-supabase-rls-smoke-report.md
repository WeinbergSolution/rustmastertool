# Phase 1.0 Supabase RLS Smoke Report

## Übersicht
In Phase 1.0 (Fix) wurde das lokale Supabase RLS-Smoke-SQL-Skript exakt an das existierende `core_foundation` Schema angepasst, danach in Phase 1.0-RUNTIME-FIX idempotent gegen initiale Seed-Daten (`supabase/seed.sql`) gemacht. Im anschließenden Runtime-Fix-2 wurden zudem Least-Privilege GRANTs für die Client-Rollen implementiert. Runtime-Fix-3 hat die GRANTs für `alert_events` nochmal restriktiver angepasst, da hier im Vorfeld ein Security-Scope-Problem auftrat.

## Durchgeführte Fixes
- **M1 (Schema Angleichung)**: Alle falschen Spalten (z.B. `steam_id` -> `username`, `provider` -> `provider_type`, etc.) im Insert-Setup-Block und in den Views korrigiert.
- **M2 (Verbotene Inserts)**: Die RLS-Tests für Inserts geben nun gültige Daten (mit allen `NOT NULL` Feldern) vor, so dass der einzige Hinderungsgrund beim `INSERT` exakt `insufficient_privilege` (`SQLSTATE 42501`) ist.
- **M3 (Unique Constraints)**: Die Struktur-Prüfungen auf `pg_index` und `pg_attribute` für die vier geforderten Tabellen (`provider_servers`, `user_watchlists`, `watchlist_items`, `alert_events`) wurden im Setup-Block ergänzt, um Unique-Coverage zu verifizieren.
- **M4 (Runner repariert)**: Das Verifikationsscript `verify-supabase-local.mjs` testet nun explizit auf `psql --version`. Statt des Supabase-CLI-Wrappers wird die `psql`-Ausführung (`psql -h 127.0.0.1 -p 54322 ...`) benutzt, um PGPASSWORD direkt im Prozess-Environment zu binden und Secrets in Logs zu vermeiden.
- **M5 (Ehrlicher Report)**: Status des Reports dokumentiert den wahren Zustand (siehe unten).
- **M6 (Runtime Idempotency)**: Nach dem lokalen Testlauf des Owners schlug das Setup-Script zunächst fehl, da `supabase/seed.sql` bereits `provider_source_status` Einträge für `'battlemetrics'` angelegt hatte. Dies führte zu einer Unique Constraint Kollision. Die `INSERT`-Statements im Setup-Block von `phase-1-0-rls-smoke.sql` wurden nun mit `ON CONFLICT DO NOTHING` versehen.
- **M7 (Least-Privilege Grants)**: Beim erneuten Runtime-Lauf traten Berechtigungsfehler auf, da die Client-Rollen (`anon` und `authenticated`) keine Rechte für die Tabellen besaßen. Es wurde eine neue Migration (`supabase/migrations/20260704015000_core_client_grants.sql`) erstellt.
- **M8 (Security Grant Correction)**: In Fix-2 hatte `authenticated` versehentlich UPDATE und DELETE auf `alert_events`. Fix-3 reduziert dies auf SELECT-only. Die Tabellen für Alert-Events bleiben somit absolut system/server-managed. Das Test-SQL wurde um Case 9b (UPDATE-Verbot) und Case 9c (DELETE-Verbot) erweitert, um diese Restriktionen explizit abzuprüfen.

## Ausführungsstatus: YELLOW 🟡 (Prepared / Runtime Fixed 3)
- **Artifacts vorbereitet**: Ja, Scripte, SQL-Dateien und GRANTs sind fertig, sicher und Least-Privilege.
- **Lokal ausgeführt (Owner)**: Ja, der Owner hat den Test via Windows ausführen können. Der Grant-Fehler wurde bestätigt. Nach diesem finalen Fix muss der Owner die Smoke-Tests erneut ausführen, um die korrekten Client-Grants und RLS endgültig zu verifizieren.
- **Lokal ausgeführt (KI-Umgebung)**: Nein. Da die Umgebung keinen Zugriff auf `psql`, `docker` oder die `supabase cli` gewährt, wurde die Verifizierung übersprungen.
- **Migrationen ausgeführt**: Nur lokal vom Owner.
- **DB-Verbindung getestet**: Nur lokal vom Owner (127.0.0.1:54322).
- **Remote-Verbindung**: Nein.
- **Secrets geleakt**: Nein.

## Nächste Schritte
Der Owner muss den Test in seiner lokalen Docker-Umgebung erneut ausführen:
```bash
npm run db:verify:local
```
Erfolgreiche Ausführung dieses erneuten Laufs hebt den Status final auf GREEN-B und bestätigt die Sicherheit der RLS inklusive der Client-Grants.
