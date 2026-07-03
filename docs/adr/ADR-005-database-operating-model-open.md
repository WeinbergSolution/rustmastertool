# ADR 005: Database Operating Model

**Status:** Proposed / Open

## Kontext
Konflikt: Hetzner bietet kein managed Postgres mit voller Timescale-Unterstützung (Neon unterstützt Timescale-Extension nicht).
## Alternativen
1. Timescale Cloud (EU-Region).
2. Self-Hosted Postgres + Timescale auf Hetzner.
3. Natives Postgres Partitioning ohne Timescale-Extension.
## Entscheidung
[Ausstehend - warten auf Infrastruktur-Checks]


## Supabase Candidate
Supabase is a preferred candidate for managed Postgres/Auth/Storage because the project owner already has an account and prefers the workflow.
Status remains Proposed / Pending Validation.
Required validation:
- Postgres version
- TimescaleDB availability
- pg_cron availability
- pg_net availability
- PostGIS availability
- pg_partman availability
- connection pooling mode for backend/runtime
- migration connection strategy
- auth strategy, especially Steam OpenID
- Realtime limits
- pricing/quotas

Supabase does not replace:
- Rust+ Connector
- Alert Engine
- Discord Bot Service
- Worker Queue
- Realtime Gateway for high-frequency Rust+ data
