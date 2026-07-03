# Model Handoff

Dieses Dokument dient der Kontextübergabe an andere KI-Modelle oder Subagenten.

## Stand Phase 0.3 (PoC Batch 1)
- **Status:** Abgeschlossen.
- **Erledigt:** `battlemetrics-poller-poc` und `rustmaps-lookup-poc` wurden erfolgreich als isolierte TypeScript-Experimente im Fixture-Modus gebaut und getestet.
- **Ergebnisse:** Die Normalisierung und die heuristische Wipe-Detection funktionieren. Der Polling-Simulator zeigt, dass eine globale Degradation ab 5000+ Servern zwingend wird. RustMaps-Bilder werden strikt referenziert, nicht gespeichert.
- **Geänderte Dateien:** `/experiments/battlemetrics-poller-poc/*`, `/experiments/rustmaps-lookup-poc/*`, `docs/*`.

## Nächster sicherer Schritt
Phase 0.4: PoC Batch 2 (Rust+ Pairing Machbarkeit und Map-Format Persistenz). Dies sind die kritischen Architektur-Risiken!

## Was das nächste Modell NICHT tun darf
- Keine Produktfeatures in `apps/` bauen.
- Keine API-Keys in Code einchecken.
- Keine produktiven Integrationen.
