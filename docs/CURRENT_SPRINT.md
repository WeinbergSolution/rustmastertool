# Current Sprint (Phase 0.6)

**Phase:** Supabase Foundation & Data Layer

## Was geändert wurde
- Opus-YELLOW-Fixes implementiert (Constraints für user_watchlists und alert_events).
- Supabase Core Tabellen (profiles, provider_servers, watchlists, alerts) als SQL Migration angelegt.
- RLS auf allen Tabellen aktiviert.
- provider_snapshots als separate, dokumentarisch gesperrte Migration (GATED) vorbereitet.
- Supabase-JS Client im Frontend integriert (nur Anon Key).
- WatchlistRepository für Fixture und Supabase Mode (inaktiv).
- Doku (DATA_MODEL.md, phase-0-6-implementation-report.md) erstellt.
- Env-Templates um VITE_SUPABASE_URL/ANON_KEY ergänzt.

## Was nicht gemacht wurde
- Keine DB-Verbindung aufgebaut oder getestet.
- Keine Migrationen angewendet (kein supabase db push/reset).
- Keine Auth implementiert (Steam OpenID bleibt geplant).
- Keine Live-Provider-Daten geladen oder gespeichert.
- Kein UI-Polishing oder Visual Changes.

## Nächster sicherer Schritt
Claude 4.8 Supabase/RLS Review Gate.

