# Phase 1.0 Supabase RLS Smoke Report

## Übersicht
In Phase 1.0 (Fix) wurde das lokale Supabase RLS-Smoke-SQL-Skript exakt an das existierende `core_foundation` Schema angepasst. 

## Durchgeführte Fixes
- **M1 (Schema Angleichung)**: Alle falschen Spalten (z.B. `steam_id` -> `username`, `provider` -> `provider_type`, etc.) im Insert-Setup-Block und in den Views korrigiert.
- **M2 (Verbotene Inserts)**: Die RLS-Tests für Inserts geben nun gültige Daten (mit allen `NOT NULL` Feldern) vor, so dass der einzige Hinderungsgrund beim `INSERT` exakt `insufficient_privilege` (`SQLSTATE 42501`) ist.
- **M3 (Unique Constraints)**: Die Struktur-Prüfungen auf `pg_index` und `pg_attribute` für die vier geforderten Tabellen (`provider_servers`, `user_watchlists`, `watchlist_items`, `alert_events`) wurden im Setup-Block ergänzt, um Unique-Coverage zu verifizieren.
- **M4 (Runner repariert)**: Das Verifikationsscript `verify-supabase-local.mjs` testet nun explizit auf `psql --version`. Statt des Supabase-CLI-Wrappers wird die `psql`-Ausführung (`psql -h 127.0.0.1 -p 54322 ...`) benutzt, um PGPASSWORD direkt im Prozess-Environment zu binden und Secrets in Logs zu vermeiden.
- **M5 (Ehrlicher Report)**: Status des Reports ist nun klar als nicht-lokal-ausgeführt (YELLOW) deklariert.

## Ausführungsstatus: YELLOW 🟡
- **Artifacts vorbereitet**: Ja, die Scripte und SQL-Dateien sind fertig und konsistent zum Schema.
- **Lokal ausgeführt**: Nein. Da die Umgebung keinen Zugriff auf `psql`, `docker` oder die `supabase cli` gewährt, wurde die Verifizierung übersprungen.
- **Migrationen ausgeführt**: Nein.
- **DB-Verbindung getestet**: Nein.
- **Remote-Verbindung**: Nein.
- **Secrets geleakt**: Nein.

## Nächste Schritte
Der Owner muss in seiner lokalen Docker-Umgebung ausführen:
```bash
npm run db:verify:local
```
Dies sollte die lokale Supabase Instanz starten, die DB zurücksetzen und das Test-SQL ausführen. Erfolgreiche Ausführung (GREEN) bestätigt die Sicherheit der RLS.
