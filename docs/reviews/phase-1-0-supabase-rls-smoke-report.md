# Phase 1.0 Supabase RLS Smoke Report

## Übersicht
In Phase 1.0 (Fix) wurde das lokale Supabase RLS-Smoke-SQL-Skript exakt an das existierende `core_foundation` Schema angepasst, danach in Phase 1.0-RUNTIME-FIX idempotent gegen initiale Seed-Daten (`supabase/seed.sql`) gemacht. Im anschließenden Runtime-Fix-2 wurden zudem Least-Privilege GRANTs für die Client-Rollen implementiert. Runtime-Fix-3 hat die GRANTs für `alert_events` nochmal restriktiver angepasst, da hier im Vorfeld ein Security-Scope-Problem auftrat. Nach diesen Korrekturen wurde die Verifikation durch den Owner lokal vollständig und erfolgreich durchgeführt.

## Durchgeführte Fixes
- **M1 (Schema Angleichung)**: Alle falschen Spalten (z.B. `steam_id` -> `username`, `provider` -> `provider_type`, etc.) im Insert-Setup-Block und in den Views korrigiert.
- **M2 (Verbotene Inserts)**: Die RLS-Tests für Inserts geben nun gültige Daten (mit allen `NOT NULL` Feldern) vor, so dass der einzige Hinderungsgrund beim `INSERT` exakt `insufficient_privilege` (`SQLSTATE 42501`) ist.
- **M3 (Unique Constraints)**: Die Struktur-Prüfungen auf `pg_index` und `pg_attribute` für die vier geforderten Tabellen (`provider_servers`, `user_watchlists`, `watchlist_items`, `alert_events`) wurden im Setup-Block ergänzt, um Unique-Coverage zu verifizieren.
- **M4 (Runner repariert)**: Das Verifikationsscript `verify-supabase-local.mjs` testet nun explizit auf `psql --version`. Statt des Supabase-CLI-Wrappers wird die `psql`-Ausführung (`psql -h 127.0.0.1 -p 54322 ...`) benutzt, um PGPASSWORD direkt im Prozess-Environment zu binden und Secrets in Logs zu vermeiden.
- **M5 (Ehrlicher Report)**: Status des Reports dokumentiert den wahren Zustand (siehe unten).
- **M6 (Runtime Idempotency)**: Nach dem lokalen Testlauf des Owners schlug das Setup-Script zunächst fehl, da `supabase/seed.sql` bereits `provider_source_status` Einträge für `'battlemetrics'` angelegt hatte. Dies führte zu einer Unique Constraint Kollision. Die `INSERT`-Statements im Setup-Block von `phase-1-0-rls-smoke.sql` wurden nun mit `ON CONFLICT DO NOTHING` versehen.
- **M7 (Least-Privilege Grants)**: Beim erneuten Runtime-Lauf traten Berechtigungsfehler auf, da die Client-Rollen (`anon` und `authenticated`) keine Rechte für die Tabellen besaßen. Es wurde eine neue Migration (`supabase/migrations/20260704015000_core_client_grants.sql`) erstellt.
- **M8 (Security Grant Correction)**: In Fix-2 hatte `authenticated` versehentlich UPDATE und DELETE auf `alert_events`. Fix-3 reduziert dies auf SELECT-only. Die Tabellen für Alert-Events bleiben somit absolut system/server-managed. Das Test-SQL wurde um Case 9b (UPDATE-Verbot) und Case 9c (DELETE-Verbot) erweitert, um diese Restriktionen explizit abzuprüfen.

## Ausführungsstatus: GREEN-B 🟢 (Lokale RLS-Verifikation bestanden)
- **Phase 1.0 wurde nach Runtime-Fix-3 lokal vom Owner ausgeführt.**
- **Ergebnis**: GREEN-B. Die Konsole meldete: `[GREEN] Local RLS Smoke Verification Passed.`
- **Lokale Voraussetzungen waren erfüllt**: Docker, Supabase CLI und psql waren verfügbar.
- **Supabase Stack**: `supabase start` und `supabase db reset` liefen lokal erfolgreich durch.
- **Migrationen wurden lokal angewendet**:
  - `20260704014000_core_foundation.sql`
  - `20260704015000_core_client_grants.sql`
- **Seed-Daten**: `supabase/seed.sql` lief lokal einwandfrei.
- **Fehler der Vergangenheit wurden bestätigt behoben**:
  - `provider_source_status` Seed-Kollision ist gefixt.
  - Fehlende GRANTs auf `user_watchlists` wurden ergänzt.
  - `alert_events` Grants wurden erfolgreich auf SELECT-only korrigiert.
- **Security-Architektur wurde validiert**:
  - `alert_events` bleibt system/server-managed: `authenticated` darf SELECT; kein INSERT, UPDATE, oder DELETE.
  - Provider Tabellen bleiben public read, aber kein client write.
  - User-owned Tabellen sind authenticated + RLS-scoped.
  - `anon` hat keinerlei Rechte auf user-owned Tabellen.
  - `provider_snapshots` bleibt weiterhin gated / nicht angewendet.
- **Safety / OPSEC**: Keine Remote-Verbindung, kein `supabase link`, kein `supabase db push`, keine Cloud-Migration, keine dokumentierten echten Secrets, keine rohen Connection URLs mit Passwörtern.
- **Lokale Ausführung (KI-Umgebung)**: Nein (übersprungen, da Owner dies übernommen hat).

## Nächste Schritte
Claude/Opus 4.8 Mini-Re-Review des vollständigen Runtime-Fix-Branches vor Merge nach main.
