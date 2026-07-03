# BattleMetrics Poller PoC Report

## Ziel
Validierung der Normalisierung von Serverdaten, Wipedetection-Heuristiken und Simulation eines globalen Polling-Budgets für Distinct Servers.

## Implementierung
- `server-url-parser`: Extrahiert ID aus URLs.
- `battlemetrics-client`: Bietet Fixture-Modus (Standard) und optional Live-Modus.
- `snapshot-normalizer`: Mappt API-Attribute defensiv auf interne `NormalizedServerSnapshot` Struktur.
- `wipe-detector`: Prüft Seed, Size, LastWipe und EntityCount.
- `polling-budget-simulator`: Simuliert 50 bis 50.000 Server und berechnet Degradation.

## Ausführung
```bash
pnpm install
pnpm start
```

## Ergebnisse & Limits
- **Fixture:** Erfolgreich normalisiert. Wipe-Detection funktioniert zuverlässig für Hard-Resets (Seed/Wipe-Date).
- **Budgeting:** Ab 5000 Servern wird ein Rate-Limit von 600 RPM schnell überschritten. Eine Degradation für "Warm" und "Cold" Server ist zwingend erforderlich, da sonst die "Hot" Server (für Live-Nutzer) nicht gepollt werden können.

## Empfehlung
BattleMetrics ist technisch extrem gut geeignet als Server-Intelligence-Basis. 

**Klare Grenzen:**
- **Keine kommerzielle Nutzung oder SEO-Freigabe, bis die rechtlichen Terms geklärt sind.**
- Polling muss global pro Server gesteuert werden, nicht pro User.
