# ADR 007: Multi-Tenancy Pattern

**Status:** Proposed / Open

## Kontext
Wie lösen wir `owner_type` / `owner_id` Polymorphie in der DB sicher?
## Alternativen
1. Polymorphie mit Check-Constraints.
2. Getrennte Spalten `user_id` / `team_id` (XOR-Constraint).
## Entscheidung
[Ausstehend]
