# Current Sprint (Phase 0.3-FIX)

**Sprint:** Phase 0.3-FIX – Repair PoC Batch 1 Yellow Findings

## Ziel
Reparatur der Findings aus dem Opus Review (YELLOW Verdict). Die PoCs aus Batch 1 dürfen nicht als verifizierte Produktbasis angesehen werden, sondern bleiben isolierte Experimente.

## Erlaubter Scope
- Defensives Refactoring von falsy (`||`) Operatoren zu nullish coalescing (`??`), speziell der y=0 Bug in RustMaps.
- Entschärfen überzogener Report-Aussagen.
- Reconciliieren der DoD-Checklisten.

## Verbotener Scope
- Kein Rust+ PoC.
- Kein Map-Format PoC.
- Kein Discord-Alert PoC.
- Keine Produktfeatures.
- Kein Merge ohne Freigabe.

## Nächster Schritt
1. Merge nach main als isoliertes Experiment, wenn Fix-Review sauber ist.
2. Terms-Outreach sofort starten.
3. PoC Batch 2 parallel möglich, aber getrennt und nur nach Freigabe.
