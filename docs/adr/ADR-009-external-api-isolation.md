# ADR 009: External API Isolation

**Status:** Accepted

## Entscheidung
Jede externe Quelle (BattleMetrics, RustMaps, Rust+) bekommt ein eigenes isoliertes Package mit Circuit Breaker.
