# Decisions Log

Siehe `docs/adr/` für alle Architecture Decision Records.

Offene Entscheidungen (Status: Proposed / Open):
- ADR-002: API Framework (NestJS vs. Fastify)
- ADR-003: WebSocket Implementation (uWebSockets vs. Socket.io)
- ADR-004: Event Bus Semantics
- ADR-005: Database Operating Model
- ADR-006: Auth (Build vs. Buy)
- ADR-007: Multi-Tenancy Pattern
- ADR-010: Rust+ Pairing Variante

- Supabase is now the preferred candidate for Database/Auth/Storage. Status: Proposed / Pending Validation. No secrets committed. No implementation yet. Steam OpenID should be considered early Auth Foundation, but ADR-014 will be created later.
