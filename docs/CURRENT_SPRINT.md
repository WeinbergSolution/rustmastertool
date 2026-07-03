# Current Sprint (Phase 0.3)

**Sprint:** Phase 0.3 – PoC Batch 1: BattleMetrics + RustMaps

## Ziel
Sichere Implementierung isolierter PoCs für Server-Intelligence (BattleMetrics) und Map-Intelligence (RustMaps) ohne produktiven App-Code.

## Erlaubter Scope
- TypeScript-Setup für PoCs.
- Fixture-basierte Clients und Normalizer.
- Polling Budget Simulation.
- Ausführung von `pnpm start` in den PoCs.

## Verbotener Scope
- Keine PoCs für Rust+ oder Map-Parser.
- Kein produktiver Code unter `apps/`.
- Kein Einchecken echter Tokens.
- Keine öffentlichen SEO-Seiten.

## Ergebnisse
PoCs laufen im Fixture-Modus stabil. Wichtige Grenzen bzgl. Polling-Volumen (BattleMetrics) und Caching/Attribution (RustMaps) wurden validiert und im Report fixiert.

## Nächster Schritt
PoC Batch 2 (Rust+ Pairing und Map-Format).
