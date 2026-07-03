# Architecture

## Kern-Architektur
- **Monorepo:** Turborepo + pnpm + Cargo
- **Isolation:** Jede externe API (BattleMetrics, RustMaps, Rust+) wird in einem eigenen Package mit Circuit Breaker und Feature-Flag gekapselt.
- **Zentraler Poller:** BattleMetrics wird zentral gepollt, nicht pro Nutzer. Ein globales Polling-Budget regelt die Last.
- **Wipe-Donnerstag als Betriebsmodus:** Pre-scaling, Queue-Prioritäten, Burst-Begrenzung für RustMaps.
- **Event-Transport (ADR-004):**
  - Redis Streams mit Consumer Groups für Domain-Events (Rückgrat)
  - Redis Pub/Sub für WebSocket Fanout
  - BullMQ für Zustell-Jobs

## Datenbankmodell-Korrekturen
- `map_prefabs` wird **nicht** relational gespeichert. Das ParsedMap-Artefakt hält diese Daten im Object Storage. Relational sind nur `monuments` und kuratierte Layer.
- Neue Entitäten: `watchlists`, `watchlist_entries`, `team_invites`, `push_subscriptions`, `notification_deliveries`.
- Erweiterungen: `map_records.generator_version`, `map_records.rust_version`.
- `alert_events.dedup_key` benötigt einen Unique-Index.
- `player_profiles`: Für v1 gestrichen oder reiner Self-Claim. Keine zentrale Fremdspieler-Datenbank.
- `team_notes`: Erhält Schutzmechanik (Auto-Expiry, keine teamübergreifende Suche, Melde-/Entfernungsprozess in der Zukunft).

## Phase 0.6 Updates
- **Supabase Foundation**: Added SQL migrations for user_watchlists, watchlist_items, provider_servers, alert_rules, and alert_events.
- **Auth**: Not yet implemented. Steam OpenID remains the planned provider.
- **Snapshots**: provider_snapshots migration is explicitly gated.
