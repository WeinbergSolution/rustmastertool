# Polling Budget Design

Entwurf für das globale Budgeting des BattleMetrics-Pollers (ADR-011).

## Kernkonzept
Nicht nur User limitieren, sondern die **Anzahl unterschiedlicher aktiv gepollter Server** global limitieren.

## Degradationslogik
Ein globaler Controller verteilt die verfügbare Rate:
- **Hot** (User live online) bleibt 60s.
- **Warm** (nur in Watchlist) wird von z.B. 2min dynamisch auf 15min gestreckt, wenn die Serveranzahl steigt.
- User-Facing Meldung bei Streckung: "Datenstand: 14:05 Uhr (reduzierte Aktualisierung)".

## Überwachung
- Monitoring-Metrik: "Distinct Server je Klasse".
- Globale Obergrenze gepollter Server pro Ausbaustufe/Tier.
