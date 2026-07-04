# Phase 1.1-A Remote/Staging Migration Runbook

## A. Purpose
Dieses Runbook existiert, um die in Phase 1.0 als GREEN-B bestätigten lokalen Migrationen und RLS-Policies sicher auf ein Remote/Staging-Projekt von Supabase zu übertragen. Die Verifikation von Phase 1.0 hat bewiesen, dass die Migrationen und Grants korrekt funktionieren und sicher gegen Seed-Daten sind. 
Die Remote/Staging-Umgebung ist bisher unberührt. Das primäre Ziel ist eine streng kontrollierte Migration, ohne versehentlich das falsche Projekt anzusprechen, Production-Ausfälle zu riskieren oder Secrets (Keys/Passwörter) zu leaken.

## B. Preconditions
- `main` ist clean.
- Phase 1.0-Verifikation ist abgeschlossen und hat den Status GREEN-B.
- `npm run db:verify:local` lieferte lokal grüne Testergebnisse.
- Lokale Voraussetzungen sind erfüllt: Docker, Supabase CLI und `psql` sind verfügbar.
- Das Supabase Remote Project wurde vom Owner explizit bestätigt.
- Das Projekt wurde klar als "Staging" (bevorzugt) oder "Production" klassifiziert.
- **Keine Migration wird ohne explizite Freigabe ausgeführt.**

## C. Target Project Confirmation Checklist
*(Diese Felder müssen vor einer Ausführung ausgefüllt und bestätigt werden. Keine echten Secrets eintragen!)*

- **Supabase project ref:** 
- **Project name:** 
- **Environment:** [ ] staging / [ ] production
- **Region:** 
- **Confirmed by:** 
- **Date:** 
- **Is this production?** 
- **Has owner explicitly approved migration?** 

*WICHTIG:* Keine echten API Keys, keine Service Role Keys und keine Datenbank-Passwörter in diese Checkliste oder dieses Repository eintragen!

## D. Allowed Commands Later
**Hinweis: Diese Commands dürfen erst in einer späteren Execution-Phase (Phase 1.1-B) ausgeführt werden. In Phase 1.1-A (aktuell) werden diese Befehle NICHT ausgeführt.**

- `supabase login`
- `supabase link --project-ref <confirmed-project-ref>`
- `supabase migration list`
- `supabase db push`

## E. Forbidden Commands / Actions
- Kein `supabase db push` ohne bestätigten Project Ref.
- Kein `supabase db reset` in einer Remote/Cloud-Umgebung (Gefahr des kompletten Datenverlusts!).
- Keine `--linked` Befehle ohne ein bewusstes, klar bestätigtes Ziel.
- Keine Production-Migration ohne vorherige, separate Freigabe.
- Niemals `service_role` Keys in das Frontend (apps/web) übernehmen.
- Niemals `.env.local` Datei-Inhalte ausgeben oder im Git speichern.
- Keine Secrets (Tokens, Passwörter) im Git Repository ablegen.
- Kein Copy/Paste von rohem Supabase CLI Output in Reports, falls dieser Secrets enthält.

## F. Migration Scope
Die folgenden Migrationen sollen remote angewendet werden:
- `supabase/migrations/20260704014000_core_foundation.sql`
- `supabase/migrations/20260704015000_core_client_grants.sql`

**Nicht anwenden:**
- `supabase/migrations_gated/**`
- `provider_snapshots` bleibt weiterhin gated.

## G. Remote Verification Plan
Nach der späteren Remote-Migration (in Phase 1.1-B) muss folgendes remote geprüft werden:
- Die erwarteten Tabellen existieren.
- Die Tabelle `provider_snapshots` existiert weiterhin nicht.
- RLS (Row Level Security) ist auf allen Tabellen aktiviert.
- Die korrekten Grants für `anon` und `authenticated` sind vorhanden.
- Provider Tabellen erlauben Public-Read.
- Provider Tabellen blockieren Client-Writes.
- User-Tabellen sind strikt auf `authenticated` und über RLS auf den jeweiligen User gescoped.
- `alert_events` ist Client-seitig SELECT-only.
- Clientseitige `INSERT`, `UPDATE`, oder `DELETE` Operationen auf `alert_events` sind blockiert.
- Kein Service-Role Token im Frontend vorhanden.

## H. Remote RLS Smoke Strategy
Geplante Teststrategien für die Remote-RLS-Verifikation (später auszuführen):
- **Option 1**: Ein Remote Smoke SQL Skript mit temporären Testusern und anschließendem Rollback.
- **Option 2**: Manuelle Verifikation über das Supabase Dashboard bzw. den integrierten SQL Editor.
- **Option 3**: Ein separates Testskript in der Zukunft mit einer expliziten Remote-Bestätigung.
*Wichtig: Keine dieser Strategien wird während der Ausarbeitung dieses Runbooks ausgeführt.*

## I. Rollback / Recovery
- Vor einer Production Migration muss zwingend ein Backup/Restore-Plan existieren.
- Migrationen immer zuerst in einer Staging-Umgebung (falls vorhanden) testen.
- Aktuell handelt es sich um keine destruktiven Migrationen (ausschließlich neue Tabellen und Grants).
- Bei Auftreten eines Fehlers: Es erfolgen keine weiteren Pushes. Es wird umgehend ein Report erstellt und ein manueller Migration-Review eingeleitet.

## J. Secrets Policy
- Der öffentliche `anon`/`publishable` Key darf in späteren Schritten in die Frontend-Umgebungsvariablen übernommen werden.
- Der `service_role` Key darf **niemals** im Frontend auftauchen.
- Datenbank-Passwörter dürfen **niemals** in das Repo oder in Issues gelangen.
- Inhalte der `.env.local` dürfen nicht in Reports kopiert werden.
- Lokale Supabase Dev-Keys dürfen nicht gepostet werden.
- Bei einem versehentlichen Leak eines Cloud-Secrets muss dieses **sofort** rotiert werden ("rotate immediately").

## K. Go/No-Go Gate
**GO (Execution erlaubt), wenn:**
- Owner bestätigt explizit das Target Project.
- Phase 1.0 (local) GREEN-B ist dokumentiert und aktuell.
- Dieses Runbook wurde einem Review unterzogen.
- Staging-Deployment (falls vorhanden) wird bevorzugt behandelt.
- Explizites Approval für die Execution-Phase liegt vor.

**NO-GO (Execution blockiert), wenn:**
- Der Project Ref unklar oder unbekannt ist.
- Eine Production-Umgebung als Ziel dient, diese aber unbestätigt ist.
- Secrets im Chatverlauf oder im Repository auftauchen.
- Ein `db push` Versuch ohne formelles Approval stattfinden soll.
- RLS Tests lokal nicht grün sind.

## L. Future Execution Prompt Placeholder
**Do not execute from this runbook. Use a separate Phase 1.1-B execution prompt.**
