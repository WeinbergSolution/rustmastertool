# Model Handoff

## Aktuelle Phase
Phase 0.3-QA – Verify and Repair PoC Batch 1 Documentation

## Letzter abgeschlossener Schritt
Phase 0.3 – PoC Batch 1: BattleMetrics + RustMaps

## Branch
poc/batch-1-battlemetrics-rustmaps

## Relevanter Commit
b0ef938

## Was wurde geprüft?
Die Existenz und der Inhalt der PoC Reports (`battlemetrics-poc-report.md`, `rustmaps-poc-report.md`) sowie des `MODEL_HANDOFF.md`. Die Dokumentationskonsistenz in `CURRENT_SPRINT.md`, `API_SOURCES.md`, `POLLING_BUDGET_DESIGN.md` und `LEGAL_TERMS_OUTREACH.md` wurde validiert.

## Was wurde repariert?
Die beiden PoC Reports und dieses Model Handoff wurden überarbeitet, um strikt das geforderte Format und alle Überschriften aus den Mindestanforderungen zu enthalten.

## PoC-Ergebnisse kurz
- **BattleMetrics:** Server-Normalisierung, Wipe-Detection und Budget-Simulation arbeiten erfolgreich. Eine Degradation für Warm/Cold Server bei 5000+ Servern ist zwingend.
- **RustMaps:** Map-Lookups via Seed/Size klappen, Monumente werden sauber normalisiert. Map-Grafiken werden nur per URL referenziert, nicht gecacht.

## Ausgeführte Befehle
```bash
npm run typecheck
npm start
```
(ausgeführt in den PoC-Ordnern, nur Fixtures)

## Testergebnisse
Der Typecheck (`tsc --noEmit`) lief fehlerfrei durch, der Fixture-Lauf der PoCs (`npm start`) lieferte wie erwartet die normalisierten Ausgaben für beide Experimente.

## Offene Risiken
Markenrecht, BattleMetrics-Limits/Terms bei hohen Polling-Volumina, RustMaps Caching-Erlaubnis, Rust+ Machbarkeit.

## Offene Terms-/API-Fragen
- BattleMetrics: SEO-Republikation erlaubt?
- RustMaps: Bild-Caching erlaubt? Attribution-Regeln für Mobile/Desktop?

## Nächster sicherer Schritt
Review durch Pascal/ChatGPT, danach Entscheidung: PoC Batch 2 oder zuerst Terms-Outreach.

## Was das nächste Modell NICHT tun darf
- kein Rust+ starten ohne Freigabe
- kein map-format-poc starten ohne Freigabe
- kein discord-alert-poc starten ohne Freigabe
- kein Merge nach main ohne Review
- keine Produktfeatures bauen
- keine externen API-Keys committen
