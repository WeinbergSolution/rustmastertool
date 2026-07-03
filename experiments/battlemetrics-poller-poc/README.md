# BattleMetrics Poller PoC

## Ziel
Validierung des Polling-Ansatzes und des globalen Budgets.

## Definition of Done

### A. Fixture PoC DoD
- [x] Fixture-Modus läuft ohne API-Key
- [x] Typecheck erfolgreich
- [x] Normalisierte Beispielausgabe erzeugt
- [x] Keine Secrets committed
- [x] Polling-Budget-Simulation ausgeführt

### B. Live/API DoD
- [ ] Live-Endpoint mit echtem API-Key verifiziert
- [ ] 24h/50-Server-Test durchgeführt
- [ ] echter Wipe an Live-Daten erkannt

### C. Terms/Legal DoD
- [ ] Terms-Anfrage beantwortet (SEO / Polling-Raten)

### D. Produktisierungs-DoD
- [ ] Tragfähiger Budget-Controller implementiert
- [ ] Robustes Fehlerhandling live getestet
