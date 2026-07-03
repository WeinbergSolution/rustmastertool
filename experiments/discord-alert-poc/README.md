# Discord Alert PoC

## Ziel
Validierung der Alert-Engine (Latenz und Zuverlässigkeit).

## Definition of Done
- [ ] Fake Event generiert.
- [ ] Rule Match ausgewertet.
- [ ] Discord Embed in Test-Guild zugestellt.
- [ ] Latenz P95 < 10s über 100 Wiederholungen nachgewiesen.
- [ ] 0 Duplikate bei Worker-Kill in der Zustellschleife.
- [ ] Dedup-Key-Beweis in DB/Redis erbracht.
