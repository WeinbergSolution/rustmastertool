# Risk Register

1. **Rust+ Protokolländerung (High / High):** Facepunch blockiert Dritt-Apps. Mitigation: Isolation, Fallback auf Server/Map.
2. **BattleMetrics Terms (Med / High):** BM untersagt kommerziellen Usecase/Re-Publikation. Mitigation: Phase-0 Anfrage.
3. **Map Datei Persistenz (Med / Med):** Prozedurale Maps liegen nicht lokal vor. Mitigation: Parser-Fokus primär auf Custom Maps.
4. **Markenrecht "Rust" (Med / High):** Produktname könnte abgemahnt werden. Mitigation: Interne Nutzung des Arbeitsnamens bis zur Freigabe.

### PHASE 0.4-C Status Update (API Contract Audit)
- Terms-Mails wurden vorbereitet, aber bewusst nicht versendet.
- Entwicklung wird fortgesetzt.
- Produktive kommerzielle Nutzung bleibt gated.
- BattleMetrics API Contract Audit wurde abgeschlossen.
- Kein Scraping, keine Player-Dossiers, keine RCON/Ban/Admin-Funktionen.
- Keine Public-SEO-Seiten ohne sp�tere Freigabe.
- Keine High-Frequency-Polling-Strategie ohne Rate-Limit-Absicherung.
