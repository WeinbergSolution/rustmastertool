# Data Model

## Table Overview

- **profiles**: Core user data linked to auth.users.
- **provider_servers**: Synchronized/Normalized game servers from BattleMetrics/RustMaps.
- **provider_source_status**: Health tracking of data ingestion from providers.
- **user_watchlists**: User-created lists to organize servers. Unique constraint on (user_id, name).
- **watchlist_items**: Junction table connecting watchlists to provider servers.
- **alert_rules**: User-defined rules for notifications (e.g. pop spike, wipe).
- **alert_events**: Instantiated alerts sent to users. Uses dedup_key with unique constraint (user_id, dedup_key) to prevent duplicate spam.

### Gated Tables
- **provider_snapshots**: Historical server polling data. Currently gated and not actively migrated due to BattleMetrics terms and polling budget constraints.

## RLS Matrix

| Table | SELECT | INSERT | UPDATE | DELETE | Service Role |
|-------|--------|--------|--------|--------|--------------|
| `profiles` | Own profile (auth.uid() = id) | Own profile | Own profile | Admin only | Full Access |
| `provider_servers` | Public (true) | None | None | None | Full Access |
| `provider_source_status` | Public (true) | None | None | None | Full Access |
| `user_watchlists` | Own watchlists | Own watchlists | Own watchlists | Own watchlists | Full Access |
| `watchlist_items` | Via Watchlist Ownership | Via Watchlist Ownership | Via Watchlist Ownership | Via Watchlist Ownership | Full Access |
| `alert_rules` | Own rules | Own rules | Own rules | Own rules | Full Access |
| `alert_events` | Own events | None (System/Service) | Own events | Own events | Full Access |

## Security Boundaries
- The **Supabase Client** in `apps/web` uses only `VITE_SUPABASE_URL` and the anon key (`VITE_SUPABASE_ANON_KEY`).
- The **Service Role Key** (`SUPABASE_SERVICE_ROLE_KEY`) is strictly confined to server-side code and backend jobs. It is never exposed to the frontend.
- **PII Boundary**: SteamID64 and Discord IDs are considered Personally Identifiable Information (PII) and will be treated as sensitive data.

## Migrations Status
- Core foundation tables are applied or ready to apply.
- `provider_snapshots` is heavily gated. The migration script for this table is prefixed with `DO NOT APPLY` and placed in `supabase/migrations_gated`.

