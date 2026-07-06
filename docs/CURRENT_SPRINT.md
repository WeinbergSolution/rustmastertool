# Current Sprint (Phase 2.1-A)

**Phase:** Phase 2.1-A Vercel Production Data Fix & API Connectivity Audit (AUDIT)

## Was geändert wurde
- [x] Phase 1.8-A: Base Blueprints YouTube Foundation
- [x] Phase 1.9-A: Automation and Blueprint Polish
- [x] Phase 1.9-B: Server Pulse Cron Activation & Scaling
- [x] Phase 2.0-A: Map Intelligence Foundation (Server Map Previews)
- [x] Phase 2.1-A: Vercel Production Audit
  - **Vercel Audit**: Überprüfung der Frontend-Codebasis auf Hardcoded URLs und Env-Probleme. Ursache für fehlende Produktionsdaten identifiziert (fehlende `VITE_DATA_MODE`, `VITE_SUPABASE_URL` etc. in Vercel).
  - **Runbook**: `vercel-production-deployment.md` angelegt, um klar zu dokumentieren, welche Variablen in Vercel und Supabase (`ALLOWED_ORIGIN` für `steam-auth`) konfiguriert werden müssen.
  - **RLS/Edge Functions**: Keine Code-Fixes an den RLS-Policies oder den Supabase Edge Functions notwendig, da diese korrekt implementiert wurden, aber auf korrekte Produktions-Envs angewiesen sind.

## Was NICHT implementiert wurde (Guardrails eingehalten)
- **Keine Secrets exponiert**: Keine Supabase Service Role Keys oder API Keys wurden in die Source Code Files committed.
- **Keine Hardcoded Fixes**: Kein "Quick-Fix" der Production URLs im Code, da dynamische Env-Variablen (`ALLOWED_ORIGIN`, `VITE_SUPABASE_URL`) der korrekte Architekturschritt sind.
- **Kein RustMaps API Call**: Map Preview bleibt auf `rust_maps` Details aus BattleMetrics gestützt.

## Aktueller Fokus
Owner Gate: Konfiguration der Env-Variablen in Vercel und Supabase Vault gemäß dem Vercel Runbook.

## Nächster sicherer Schritt
1. Owner setzt die Variablen in Vercel.
2. Owner fügt `ALLOWED_ORIGIN=https://rustmastertool-web.vercel.app` den Supabase Edge Function Secrets hinzu.
3. Owner prüft die Production-URL.
