# Open Questions

- **[Prüfpunkt]** Rust+ Pairing: Ist die Registrierung serverseitig machbar oder lokaler Desktop-Flow zwingend?
- **[Prüfpunkt]** Smart Devices: Kann Token B ein Gerät steuern, das von Token A desselben Teams gepairt wurde? (Token-Routing)
- **[Prüfpunkt]** `.map` Format: Werden prozedurale Maps in der aktuellen Rust-Version noch lokal persistiert?
- **[Prüfpunkt]** BattleMetrics: Sind SEO-indexierte Server-Detailseiten laut Terms erlaubt?
- **[Prüfpunkt]** DB-Infrastruktur: Hetzner managed Postgres + TimescaleDB-Unterstützung? Alternativen?

- **[Prüfpunkt]** Supabase is now the preferred candidate for Database/Auth/Storage. Status: Proposed / Pending Validation. No secrets committed. No implementation yet. Steam OpenID should be considered early Auth Foundation, but ADR-014 will be created later.

## Phase 0.6 Questions
- **Polling Budget**: Is the BattleMetrics polling budget 300 RPM or 600 RPM?
- **Auth**: Auth is not implemented. Steam OpenID remains planned.
