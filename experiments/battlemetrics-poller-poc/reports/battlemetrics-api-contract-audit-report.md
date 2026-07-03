# BattleMetrics API Contract Audit Report

## Official Documentation Audit
- **Confirmed**: 
  - Base URL is https://api.battlemetrics.com.
  - Authentication requires an OAuth 2.0 Bearer token via Authorization header.
  - Rate Limits are 60/min unauthenticated and 300/min authenticated. The headers X-Rate-Limit-Limit and X-Rate-Limit-Remaining are exposed.
  - Endpoints /servers (search/filter) and /servers/{server_id} (detail) are well documented.
  - Pagination, sparse fieldsets, includes, sorting and filtering are all standardized per JSON API specs.
  - Core server attributes (id, name, players, status, address, ip) are formally defined.
- **Unknown/Not Documented**:
  - The exact schema for the attributes.details object, which contains all Rust-specific data (e.g. rust_world_seed, rust_world_size, rust_last_wipe, rust_fps, map, rust_queued_players), is NOT formally documented. The API simply says "Game and server specific information. Will vary from server to server. You should provide reasonable defaults, nothing is guaranteed."

## Live Smoke Test Execution
- **Executed**: No (Aborted cleanly because BATTLEMETRICS_LIVE_CALLS_ENABLED was false/missing).
- **Reason**: Live calls are explicitly gated via environment variable to protect the token and prevent accidental API load.

## Consequences for Product
- **Safe to use in Experiment/Fixture**: We can safely build our Dashboard shell and parsing logic using the API contract structure (JSON API).
- **Gated**: True live requests against BattleMetrics remain gated until explicit user opt-in (BATTLEMETRICS_LIVE_CALLS_ENABLED=true) is configured.
- **Frontend/Shell**: The fields mapped in the API Contract Matrix are perfectly suited to build a Dashboard Fixture. We must handle missing Rust details gracefully since their presence is not guaranteed by the contract.
