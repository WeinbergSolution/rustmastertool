# Polling Budget Design

Entwurf für das globale Budgeting des BattleMetrics-Pollers (ADR-011).

## Kernkonzept
Nicht nur User limitieren, sondern die **Anzahl unterschiedlicher aktiv gepollter Server** global limitieren.

## Ergebnisse aus PoC Batch 1 (Simulator)
- Bei einer Limitierung von z. B. 600 RPM (Free/Low Tier) wird das Budget bei ca. 5000 überwachten Servern (10% Hot, 30% Warm, 60% Cold) sofort gesprengt, wenn man ideale Intervalle (1m / 5m / 60m) fährt.
- **Lösung (Degradation):** Um die "Hot" Server zu schützen, müssen "Warm" Server auf 15-30 Minuten und "Cold" Server auf 3-12 Stunden gestreckt werden.
- **Terms-Prüfpunkt:** Ob BattleMetrics dieses Volumen (z. B. 50.000 Server = tausende RPM) in bezahlten Tiers zulässt, ist zwingend zu klären.

## Degradationslogik
Ein globaler Controller verteilt die verfügbare Rate:
- **Hot** (User live online) bleibt 60s.
- **Warm** (nur in Watchlist) wird dynamisch gestreckt.
- User-Facing Meldung bei Streckung: "Datenstand: 14:05 Uhr (reduzierte Aktualisierung)".
