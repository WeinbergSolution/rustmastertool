# Rust+ Pairing PoC

## Ziel
Validierung der Machbarkeit und Stabilität der Rust+ Integration.

## Fragen
- Kann die Companion-Registrierung serverseitig erfolgen?
- Wie verhält sich Token-Affinität bei Smart Devices?

## Voraussetzungen
- Eigener Rust-Testserver mit aktiviertem Rust+.
- Test-Accounts (Steam).
- `rustplus.js` oder ähnliches Referenz-Skript.

## Testvarianten
1. Serverseitige Registrierung simulieren.
2. Lokaler interaktiver Flow simulieren.

## Definition of Done
- [ ] a) Serverseitige Registrierung getestet (Ergebnis dokumentiert).
- [ ] b) Lokaler interaktiver Flow getestet (Ergebnis dokumentiert).
- [ ] c) 24h stabile Socket-Verbindung nachgewiesen.
- [ ] d) Reconnect nach Server-Neustart getestet.
- [ ] e) Team-Test mit 2 Accounts (`getTeamInfo` liefert beide).
- [ ] f) Leader-Failover getestet.
- [ ] g) Smart-Switch Account-A/Token-B-Test (Kann Token B das Gerät von A schalten?).
- [ ] h) Tokenverhalten nach Map-Wipe dokumentiert.
