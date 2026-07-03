# Map Format PoC

## Ziel
Validierung der Parser-Säule und Datenstruktur der `.map`-Dateien.

## Tests & Prüfpunkte
- **Custom Map Test:** Parse von Custom Maps.
- **Prozedural-Map-Persistenz:** Werden prozedurale Maps lokal als `.map` persistiert? (Ja/Nein-Test).
- **LZ4/Protobuf Prüfpunkt:** Welches Format/Header liegt vor?

## Definition of Done
- [ ] Custom Map Test erfolgreich (Datei gefunden).
- [ ] Prozedural-Map-Persistenz Ja/Nein-Test geklärt.
- [ ] LZ4/Protobuf Dekompression/Decode geprüft.
- [ ] Prefab- / Path-Zählung plausibel.
- [ ] Monument-JSON extrahiert.
- [ ] Primitives PNG-Render der Map erzeugt.
- [ ] Koordinatenabgleich mit Ingame-Grid erfolgreich.
- [ ] Parse-Zeit und RAM-Messung einer 4500er Map dokumentiert.
- [ ] Strategie-Notiz geschrieben, falls prozedurale Maps nicht lokal persistieren.
