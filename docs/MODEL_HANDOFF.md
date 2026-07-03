# Model Handoff

## Aktuelle Phase
Phase 0.3-FIX – Repair PoC Batch 1 Yellow Findings

## Letzter abgeschlossener Schritt
Phase 0.3-QA – Verify and Repair PoC Batch 1 Documentation

## Branch
poc/batch-1-battlemetrics-rustmaps

## Relevanter Commit
4544736 (letzter Batch 1 Commit vor Fix)

## Was wurde repariert?
- **RustMaps y=0 Bug:** Falsy `||` durch nullish coalescing `??` ersetzt.
- **BattleMetrics Normalizer:** Defensive `??` Prüfung für numerische Felder integriert.
- **Report-Claims entschärft:** Alle Auswertungen weisen nun darauf hin, dass es sich nur um ein Fixture-Experiment handelt (API nicht live verifiziert). Budget-Degradation wurde als illustrativ/unzureichend markiert.
- **DoD-Checklisten reconciliiert:** READMEs trennen nun klar zwischen erfülltem Fixture-PoC und offenen Live-/Terms-Zielen.

## PoC Batch 1 Status
Bleibt ein reines Experiment, keine verifizierte Produktbasis (Opus Review Verdict: YELLOW).

## Ausgeführte Befehle
```bash
npm run typecheck
npm start
```

## Offene Risiken
- BattleMetrics/RustMaps Terms unklar.
- API-Endpoints nicht live verifiziert.
- Polling-Budget noch kein tragfähiger Controller.
- Wipe-Heuristik nicht an echten Daten validiert.

## Nächster sicherer Schritt
1. Merge nach main als isoliertes Experiment, wenn Fix-Review sauber ist.
2. Terms-Outreach sofort starten.
3. PoC Batch 2 parallel möglich, aber getrennt und nur nach Freigabe.

## Was das nächste Modell NICHT tun darf
- kein Rust+ starten ohne Freigabe
- kein map-format-poc starten ohne Freigabe
- kein discord-alert-poc starten ohne Freigabe
- kein Merge nach main ohne Review
- keine Produktfeatures bauen
- keine externen API-Keys committen
