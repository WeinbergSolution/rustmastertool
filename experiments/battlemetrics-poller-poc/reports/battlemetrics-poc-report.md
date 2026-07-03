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
Im Fixture-Modus erfolgreich verifiziert. Die Fixture-Daten (`123456`) werden geparst.

## Optionaler Live-Modus
Ein Live-Modus über `BATTLEMETRICS_TOKEN` in `.env.local` wurde im Code vorbereitet, ist aber noch nicht live verifiziert.

## Normalisierte Felder
`source`, `battlemetricsServerId`, `name`, `status`, `players`, `maxPlayers`, `queue`, `rank`, `country`, `address`, `port`, `queryPort`, `mapName`, `rustWorldSeed`, `rustWorldSize`, `rustLastWipe`, `rustLastSeedChange`, `rustBorn`, `rustEntityCount`, `rustFps`, `rustFpsAvg`, `updatedAt`, `rawDetailsKeys`.

## Server-ID/URL Parser Ergebnis
Der Parser extrahiert Server-IDs aus den getesteten BattleMetrics-URLs und direkten ID-Strings. Nur Experiment-Stand.

## Wipe-Detector Ergebnis
Die Wipe-Detection ist ein reines Experiment. Sie wurde nur mit Fixtures getestet, nicht mit echten Wipe-Daten.

## Polling-Budget-Simulation
Die Polling-Budget-Simulation ist rein illustrativ. Die simulierte Degradation löst das 600-RPM-Problem bei 5.000/50.000 Servern NICHT vollständig. Ein echter Budget-Controller braucht stärkere Drosselung, Cold-Pause/on-demand, Hot-Deckelung oder vertragliche Enterprise-Limits.

## Erkenntnisse zum Distinct-Server-Problem
Ein globales Budgeting ist zwingend. Bei 50.000 Servern reicht eine einfache Degradation nicht aus, um fiktive Rate-Limits einzuhalten.

## Offene API-Fragen
API-Endpunkte/Terms bleiben Prüfpunkt. Ist die Normalisierung der `rawDetailsKeys` stabil über alle Serverversionen hinweg? 

## Offene Terms-Fragen
- Dürfen Server-Detailseiten für SEO re-publiziert werden?
- Sind hohe Polling-Raten für reine Watchlisten zulässig?

## Risiken
Änderungen der API-Struktur durch BattleMetrics; Limitierungen durch Terms of Service. API nicht live verifiziert.

## Empfehlung
BattleMetrics ist technisch potenziell geeignet, bleibt aber bis zur Terms-Klärung ein reines isoliertes Experiment. Nicht produktionsreif.

## Grenzen / Nicht erlaubt
- keine SEO-Freigabe
- keine kommerzielle Nutzung ohne Terms-Klärung
- kein aggressives Polling
- keine Rohdaten-Replikation
