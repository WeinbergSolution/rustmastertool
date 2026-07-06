# Current Sprint (Phase 1.7)

**Phase:** Phase 1.7-B Server Pulse Activation + Retention Intelligence UI (IMPLEMENTATION)

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

## Was NICHT implementiert wurde (Guardrails eingehalten)
- Keine Fake-Daten, keine Fake-Graphen.
- Kein db reset.
- Ingestion Task (Edge Function Aufruf) wurde noch nicht getriggert, da das benötigte Secret `SERVER_PULSE_INGEST_SECRET` im Supabase Staging-Projekt noch fehlt. Dies ist eine sichere Handoff-Grenze für den Owner.

## Aktueller Fokus
Owner Gate: Einrichten des Secrets und manueller Ingest-Run.

## Nächster sicherer Schritt
1. Owner setzt das fehlende Ingestion-Secret im Staging-Projekt.
2. Owner führt einen curl POST Run der Edge Function aus.
3. Owner prüft die Server Pulse und Server Detail Views im Browser auf neu generierte Snapshot-Daten.
4. Merge nach main nach Freigabe.
