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
- Keine Public-SEO-Seiten ohne spätere Freigabe.
- Keine High-Frequency-Polling-Strategie ohne Rate-Limit-Absicherung.

### Phase 0.5 (Frontend Shell)
- Frontend Shell created in pps/web (React + Vite + TypeScript).
- UI utilizes exclusively static Fixture Data based on BattleMetrics API Contract.
- **NO** live provider calls, **NO** DB calls, **NO** auth, **NO** Rust+ integration.
- Gated features are visibly marked in the UI to prevent false assumptions.
- Next recommended step: Claude 4.8 Frontend Shell Review Gate.

## Phase 0.6 Risks
- **Live Provider Ingestion Gated**: We have not enabled live data fetching. Snapshots are gated to avoid API term violations.
- **Supabase Validated**: Supabase remains the preferred candidate for DB but hasn't been fully validated in production.
- **Polling Budget**: 300 RPM vs 600 RPM limit is still an open issue.
