# Product Vision

Das Betriebssystem für deinen Rust-Wipe – von der Serverwahl bis zum letzten Raid, für dich und dein Team.

## Säulen
1. **Server Intelligence:** BattleMetrics-basiert. Suche, Wipe-Erkennung, Charts.
2. **Map Intelligence:** RustMaps + eigener `.map`-Parser. Monumente, Routen, Ratings.
3. **Live Companion:** Rust+ Anbindung. Live-Map, Team, Events, Smart Devices.
4. **Distribution:** Web, Discord Bot, Desktop App.

## Phasenverschiebungen (gemäß Architektur-Review)
- **Desktop/Pairing:** Rust+ Pairing muss zuerst bewiesen werden. Falls ein lokaler Flow nötig ist, muss der Desktop-Fallback oder ein lokaler Pairing-Helper vorgezogen werden.
- **Monetarisierung:** Stripe/Billing-Vollintegration wurde nach hinten verschoben. Phase 2 baut nur Auth + Teams v0 + Entitlements. Paid Launch ist auf nach Phase 9/10 vorgezogen worden. Stripe Integration ist eine spätere, eigene Phase direkt vor dem Paid Launch.
