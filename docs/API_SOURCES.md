# API Sources & Integration

- **BattleMetrics:** Primärquelle für Server-Pop, Queue, Wipe-Zeiten. Zentrales Polling (Budget-limitiert).
- **RustMaps:** Primärquelle für Map-Bilder und Seed/Size-Lookup.
- **Rust+ Companion (Facepunch):** Quelle für Live-Map-Marker, Team, Vending, Smart Devices.
- **Discord API:** Alert-Zustellung, Slash-Commands.
- **Lokale `.map` Datei:** Eigener Parser für Custom Maps und Heatmaps.
