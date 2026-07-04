# Phase 1.0 Supabase RLS Smoke Report

## Übersicht
In Phase 1.0 (Fix) wurde das lokale Supabase RLS-Smoke-SQL-Skript exakt an das existierende `core_foundation` Schema angepasst und danach in Phase 1.0-RUNTIME-FIX idempotent gegen initiale Seed-Daten (`supabase/seed.sql`) gemacht.

## Durchgeführte Fixes
- **M1 (Schema Angleichung)**: Alle falschen Spalten (z.B. `steam_id` -> `username`, `provider` -> `provider_type`, etc.) im Insert-Setup-Block und in den Views korrigiert.
- **M2 (Verbotene Inserts)**: Die RLS-Tests für Inserts geben nun gültige Daten (mit allen `NOT NULL` Feldern) vor, so dass der einzige Hinderungsgrund beim `INSERT` exakt `insufficient_privilege` (`SQLSTATE 42501`) ist.
- **M3 (Unique Constraints)**: Die Struktur-Prüfungen auf `pg_index` und `pg_attribute` für die vier geforderten Tabellen (`provider_servers`, `user_watchlists`, `watchlist_items`, `alert_events`) wurden im Setup-Block ergänzt, um Unique-Coverage zu verifizieren.
- **M4 (Runner repariert)**: Das Verifikationsscript `verify-supabase-local.mjs` testet nun explizit auf `psql --version`. Statt des Supabase-CLI-Wrappers wird die `psql`-Ausführung (`psql -h 127.0.0.1 -p 54322 ...`) benutzt, um PGPASSWORD direkt im Prozess-Environment zu binden und Secrets in Logs zu vermeiden.
- **M5 (Ehrlicher Report)**: Status des Reports dokumentiert den wahren Zustand (siehe unten).
- **M6 (Runtime Idempotency)**: Nach dem lokalen Testlauf des Owners schlug das Setup-Script zunächst fehl, da `supabase/seed.sql` bereits `provider_source_status` Einträge für `'battlemetrics'` angelegt hatte. Dies führte zu einer Unique Constraint Kollision. Die `INSERT`-Statements im Setup-Block von `phase-1-0-rls-smoke.sql` wurden nun mit `ON CONFLICT DO NOTHING` versehen, um verlässlich gegen beliebig existierende Fixture-Daten aus `seed.sql` zu bestehen, ohne die RLS-Testdaten selbst zu beschädigen.

## Ausführungsstatus: YELLOW 🟡 (Prepared / Runtime Fixed)
- **Artifacts vorbereitet**: Ja, die Scripte und SQL-Dateien sind fertig, Schema-konsistent und nun idempotent gegen `seed.sql`.
- **Lokal ausgeführt (Owner)**: Ja, der Owner hat den Test via Windows ausführen können. Die `supabase db reset` Instanz hat erfolgreich Migration und `seed.sql` übernommen. Der anschließend ausgelöste Unique-Error wurde durch diesen Fix behoben.
- **Lokal ausgeführt (KI-Umgebung)**: Nein. Da die Umgebung keinen Zugriff auf `psql`, `docker` oder die `supabase cli` gewährt, wurde die Verifizierung übersprungen.
- **Migrationen ausgeführt**: Nur lokal vom Owner.
- **DB-Verbindung getestet**: Nur lokal vom Owner (127.0.0.1:54322).
- **Remote-Verbindung**: Nein.
- **Secrets geleakt**: Nein.

## Nächste Schritte
Da der Unique-Constraint-Fehler nun behoben ist, muss der Owner den Befehl in seiner lokalen Docker-Umgebung erneut ausführen:
```bash
npm run db:verify:local
```
Erfolgreiche Ausführung dieses erneuten Laufs hebt den Status final auf GREEN-B und bestätigt die Sicherheit der RLS.
