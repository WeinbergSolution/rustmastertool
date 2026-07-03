# Degradation Matrix

| Quelle | Ausfall-Szenario | User-Facing Auswirkung |
|---|---|---|
| BattleMetrics | Rate Limit oder Limit-Streckung (Budget voll) | UI zeigt "Datenstand HH:MM" / "reduzierte Aktualisierung". |
| RustMaps | API Down | UI nutzt gecachte Map-Bilder oder Parser 2D Render. |
| Rust+ | Facepunch-Socket blockiert | Live-Map stoppt. UI Banner: "Live-Verbindung zum Server aktuell gestört". |
| Alert-Engine | Queue-Verzögerung (z.B. Wipe-Tag-Peak) | Meldung über temporäre Verzögerungen in Discord/Dashboard. |
