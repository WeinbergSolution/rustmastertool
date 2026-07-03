# BattleMetrics Poller PoC Report

## Ziel
Validierung der Normalisierung von Serverdaten, Wipedetection-Heuristiken und Simulation eines globalen Polling-Budgets für Distinct Servers.

## Scope
Erstellung eines isolierten TS-Clients für BattleMetrics mit Fixture-Support und Wipe-Detection, lokal ausgeführt ohne produktive Abhängigkeiten.

## Implementierte Dateien
- `src/battlemetrics-client.ts`
- `src/server-url-parser.ts`
- `src/snapshot-normalizer.ts`
- `src/wipe-detector.ts`
- `src/polling-budget-simulator.ts`
- `src/index.ts`
- `src/types.ts`
- Fixtures und Konfigurationen (`package.json`, `tsconfig.json`)

## Ausführung
```bash
npm install
npm run typecheck
npm start
```

## Fixture-Modus Ergebnis
Erfolgreich normalisiert. Die Fixture-Daten (`123456`) werden korrekt verarbeitet.

## Optionaler Live-Modus
Ein Live-Modus über `BATTLEMETRICS_TOKEN` in `.env.local` wurde im Code vorbereitet, aber im Rahmen des PoCs standardmäßig nicht ausgeführt.

## Normalisierte Felder
`source`, `battlemetricsServerId`, `name`, `status`, `players`, `maxPlayers`, `queue`, `rank`, `country`, `address`, `port`, `queryPort`, `mapName`, `rustWorldSeed`, `rustWorldSize`, `rustLastWipe`, `rustLastSeedChange`, `rustBorn`, `rustEntityCount`, `rustFps`, `rustFpsAvg`, `updatedAt`, `rawDetailsKeys`.

## Server-ID/URL Parser Ergebnis
Der Parser kann erfolgreich Server-IDs aus BattleMetrics-URLs und direkten ID-Strings extrahieren.

## Wipe-Detector Ergebnis
Die Wipe-Detection funktioniert zuverlässig. Bei Änderungen an `rustLastWipe`, `rustWorldSeed` oder signifikantem Einbruch von `rustEntityCount` schlägt die Erkennung (`confidence: high/medium`) an.

## Polling-Budget-Simulation
Simuliert wurden 50 bis 50.000 Server. Die ideale Rate (Hot=1m, Warm=5m, Cold=60m) überschreitet ab 5.000 Servern das fiktive Limit von 600 RPM.

## Erkenntnisse zum Distinct-Server-Problem
Die zentrale Erkenntnis: Ein globales Budgeting und eine dynamische Degradation für Warm/Cold Server ist zwingend. Bei 50.000 Servern erfordert die Skalierung eine Drosselung auf Warm=15m und Cold=3h, um die Hot-Server (Live-Nutzer) zu schützen.

## Offene API-Fragen
Ist die Normalisierung der `rawDetailsKeys` stabil über alle Serverversionen hinweg? Wie strikt sind die tatsächlichen Rate-Limits für Enterprise-Tiers beim Polling?

## Offene Terms-Fragen
- Dürfen Server-Detailseiten für SEO re-publiziert werden?
- Sind hohe Polling-Raten für reine Watchlisten zulässig?

## Risiken
Änderungen der API-Struktur durch BattleMetrics; Limitierungen durch Terms of Service.

## Empfehlung
BattleMetrics ist technisch extrem gut als erste Server-Intelligence-Basis geeignet, sofern die Terms das Polling erlauben.

## Grenzen / Nicht erlaubt
- keine SEO-Freigabe
- keine kommerzielle Nutzung ohne Terms-Klärung
- kein aggressives Polling
- keine Rohdaten-Replikation
