# Current Sprint (Phase 1.8-A)

**Phase:** Phase 1.8-A Base Blueprints YouTube Foundation (IMPLEMENTATION)

## Was geändert wurde
- [x] Phase 1.4-A: Steam Login + Active Server Core Loop
- [x] Phase 1.5-A: Three-Layer Navigation + Command-Center Dashboard + MyRust Shell
- [x] Phase 1.6-A: Server Explorer Data Expansion + BattleMetrics Filters + Base Blueprints Shell
- [x] Phase 1.7-A: Server Pulse / Population Retention Foundation
- [x] Phase 1.7-B: Server Pulse Activation + Retention Intelligence UI
  - **Remote Deployments**: Supabase DB Migration und `server-pulse-ingest` Edge Function auf Staging gepusht/deployed.
  - **UI Cleanup**: Runbook und technische curl-Commands wurden aus der ServerPulseView entfernt. Die View ruft nun echte Count-Stats (`provider_servers`, `server_population_snapshots`) ab.
  - **Retention Logik**: Utility-Funktion `calculatePulseSummary` implementiert, die anhand echter Snapshots Retention-Prozentwerte für die Intervalle 6h, 12h, 18h, 24h, 30h berechnet.
  - **Server Detail Panel**: Bindet die Retention-Buckets und den Pulse Health Label ein. Zeigt ehrlichen "Collecting" Status an, falls die Datenbasis nicht ausreicht.
  - **Server Cards**: Dezentes "Pulse collecting" Badge integriert.
  - **Topbar**: Phase Label auf "Server Intelligence Alpha" aktualisiert.
- [ ] Phase 1.8-A: Base Blueprints YouTube Foundation
  - **Datenbank**: Migration `20260706040901_base_blueprints_youtube.sql` erstellt. Beinhaltet Tabellen `base_blueprints` und `user_saved_blueprints`. (Dry-Run erfolgreich)
  - **Edge Function**: `base-blueprints` geschrieben, fragt sicher serverseitig die YouTube Data API v3 ab.
  - **Frontend API Client**: `apps/web/src/lib/api/baseBlueprints.ts` hinzugefügt, um sicher mit der Edge Function zu kommunizieren.
  - **Base Blueprints UI**: `BaseBlueprintsView.tsx` erstellt, ersetzt die Roadmap-Ansicht. Beinhaltet Netflix-ähnliches Grid, Categories/Presets, YouTube Modal Embed und Search Bar.

## Was NICHT implementiert wurde (Guardrails eingehalten)
- Keine Scraping-Logik, nur die offizielle YouTube Data API.
- Keine `YOUTUBE_API_KEY` oder andere Secrets im Frontend geleakt.
- Es fanden keine YouTube API Aufrufe direkt aus dem Client statt.
- **REMOTE GATES SIND NOCH OFFEN**: Die Datenbankmigration und die Edge Function wurden noch nicht auf Supabase Staging (`fcmjevwfuwzqtpozwigf`) angewandt, da dies explizite Owner-Freigabe erfordert.

## Aktueller Fokus
Owner Gate: Freigabe von DB Push und Edge Function Deploy für Base Blueprints.

## Nächster sicherer Schritt
1. Owner bestätigt die Remote Gates für Base Blueprints.
2. Der AI Engineer führt `supabase db push` und `supabase functions deploy base-blueprints` aus.
3. Danach manueller Browser-Test der neuen YouTube UI.
