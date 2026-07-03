# Phase 0.1 Gate Audit Implementation Plan

Provide a brief description of the problem, any background context, and what the change accomplishes.
Dieses Dokument beschreibt den 10-Punkte-Ausführungsplan für Phase 0.1 (Sanity Audit, Gate Report und Commit-Vorbereitung). Ziel ist es, die in Phase 0 erstellte Dokumentations- und Experiment-Basis formal zu prüfen und freizugeben.

## User Review Required

Bitte prüfe diesen Ablaufplan. Wenn er deinen Erwartungen entspricht, genehmige ihn, damit ich die Prüfungen und Dokumenten-Updates ausführen kann.

## Proposed Changes

### Phase 0.1 Audit & Setup

1. **Strukturprüfung**: Abgleich der tatsächlichen Dateien in `docs/`, `docs/adr/` und `experiments/` gegen die Checkliste.
2. **Review-Auflagen-Prüfung**: Lesen und Validieren der Inhalte, um sicherzustellen, dass die 12 Kernauflagen (Polling Budget, Stripe-Verschiebung etc.) sauber dokumentiert sind.
3. **Produktcode-Prüfung**: Verifizierung, dass keine produktiven App-Features, Secrets oder API-Keys unter `apps/` existieren und strikte Isolation herrscht.
4. **Gate Report Erstellung**: Neuschreiben/Aktualisieren von `docs/PHASE_0_GATE_REPORT.md` inkl. Matrix, Blocker-Liste und Freigabe-Entscheidung (Verdict).
5. **Freigabe definieren**: Start-Erlaubnis für PoC Batch 1 (`rustplus-pairing-poc`, `map-format-poc`) erteilen und Sperre für den restlichen Code aufrechterhalten.
6. **Sprint-Update**: Aktualisierung von `docs/CURRENT_SPRINT.md` auf "Phase 0.1 – Gate Audit & PoC Readiness" mit angepasstem Scope.
7. **Handoff-Update**: Aktualisierung von `docs/MODEL_HANDOFF.md` mit den Prüfergebnissen und Vorgaben für den nächsten Agenten.
8. **Technische Checks**: Ausführen von `pnpm install --ignore-scripts`, `lint`, `typecheck`, `test` und Dokumentation des Ergebnisses (erwartet: Fail/Missing, da keine Skripte).
9. **Git Status**: Abfragen des Git-Status zur Ermittlung aller relevanten untracked/modified Files.
10. **Abschluss**: Ausgabe der Zusammenfassung inkl. der finalen Commit-Message `chore: establish phase 0 architecture and experiment foundation`.

## Verification Plan

### Manual Verification
- Der erstellte `PHASE_0_GATE_REPORT.md` wird transparent zeigen, dass alle Anforderungen aus der Matrix erfüllt sind.
- Der Ausgabeprozess am Ende enthält den `git status` und bestätigt die Ausführbarkeit für den Commit.
