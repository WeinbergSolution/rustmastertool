# Polling Budget Design

Entwurf für das globale Budgeting des BattleMetrics-Pollers (ADR-011).

## Kernkonzept
Nicht nur User limitieren, sondern die **Anzahl unterschiedlicher aktiv gepollter Server** global limitieren.

## Ergebnisse aus PoC Batch 1 (Simulator)
- Die aktuelle Simulation ist **kein fertiger Budget-Controller**, sondern rein illustrativ!
- Die Beispiel-Degradation hält bei 5.000 oder 50.000 Distinct Servern ein 600-RPM-Limit **nicht** ein (es entstehen weiterhin über 6.000 RPM).
- Um ein 600 RPM Limit bei dieser Menge zu halten, reicht reine "Warm/Cold"-Streckung nicht aus.

## Offene Designaufgabe für den echten Controller
- Implementierung eines harten globalen Request-Budgets.
- Dynamische Klassen-Streckung je nach Limit-Auslastung.
- "Cold" Server dürfen ggf. nur noch on-demand (bei Aufruf) gepollt werden.
- Hot-Server-Schutz mit harter Obergrenze pro Tier.
- Enterprise-Limits abhängig von den noch zu verhandelnden BattleMetrics Terms (Vertragslage).
