# ADR 004: Event Bus Semantics

**Status:** Proposed / Open

## Kontext
Klärung der Transport-Semantik.
## Vorschlag
- Redis Streams + Consumer Groups für Domain-Events (Rückgrat).
- Redis Pub/Sub für WebSocket Fanout.
- BullMQ für Zustell-Jobs (Discord).
## Entscheidung
[Ausstehend]
