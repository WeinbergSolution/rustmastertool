# BattleMetrics API Contract Review Gate

**Verdict**: YELLOW

**Merge**: Not allowed yet

## Grund
- Encoding-/Escape-Korruption in Contract-/Field-Map-/Report-Dokumenten
- PDF-Artefakt-Frage klären

## Security-Status
- Live-Bremse okay
- Keine Secrets geleakt
- Keine RCON/Ban/Admin/Player-Endpunkte genutzt
- Alles strikt in experiments gekapselt (kein Security-RED)

## Required Fixes
- docs/api/battlemetrics-api-contract.md
- docs/api/battlemetrics-field-map.md
- experiments/battlemetrics-poller-poc/reports/battlemetrics-api-contract-audit-report.md
- Governance-Docs mit "spätere" reparieren
- PDF-Artefakte aus dem Branch entfernen/nicht übernehmen