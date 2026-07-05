# Phase 1.1-B Execution Checklist

## A. Target
- **Project ref:** `fcmjevwfuwzqtpozwigf`
- **Environment:** Staging / Development

## B. Preconditions
- `main` is clean.
- Phase 1.0 GREEN-B.
- Phase 1.1-A Runbook in main.
- Docker/Supabase CLI/psql lokal vorhanden.
- Owner bestätigt Target Project.
- Keine Production-Annahme.

## C. Remote Discovery Commands
Führe nacheinander diese Discovery-Schritte aus:
1. `supabase login`
2. `supabase link --project-ref fcmjevwfuwzqtpozwigf`
3. `supabase migration list --linked`
4. `supabase db push --dry-run` 
   *(Falls `--dry-run` nicht verfügbar ist, nutze stattdessen: `supabase db diff --linked --schema public`)*

## D. Remote State Documentation
Vor dem finalen Push muss dokumentiert werden:
- Linked project ref
- Migration list result
- Dry-run/diff result
- Ob Remote Tabellen bereits existieren
- Ob Migration History leer/teilweise/vollständig ist
- Ob Zustand erwartet ist

*Wichtig: Keine Secrets oder rohen CLI-Outputs dokumentieren.*

## E. STOP-AND-CONFIRM Gate
**DIREKT VOR `supabase db push` MUSS GESTOPPT WERDEN.**
Es darf NUR fortgefahren werden, wenn:
- Linked ref exakt `fcmjevwfuwzqtpozwigf` ist.
- Environment ist Staging/Development.
- Remote state ist erwartbar (leer, teilweise applied ohne Konflikt, oder bereits applied).
- Dry-run/diff zeigt nur erwartete additive Änderungen.
- Keine destruktiven/unerwarteten Statements.
- Keine Secrets im Output/Report.
- Der Owner antwortet exakt:
  `CONFIRM PUSH TO fcmjevwfuwzqtpozwigf STAGING`

Wenn diese exakte Bestätigung fehlt -> KEIN db push, Report YELLOW, Stop.

## F. Push Step
**Nur nach Bestätigung:**
`supabase db push`

Erlaubt sind nur:
- `20260704014000_core_foundation.sql`
- `20260704015000_core_client_grants.sql`

Nicht anwenden:
- `migrations_gated/**`
- `provider_snapshots`
- `seed.sql`

Bei Fehler: STOP. Kein Force. Kein Retry ohne Review. Report RED/YELLOW.

## G. Remote Verification
Nach erfolgreichem Push:
- Remote Smoke SQL (`docs/sql/rls-smoke/phase-1-1-b-remote-rls-smoke.sql`) im Supabase SQL Editor ausführen.
- Kein DB-Passwort verwenden.
- Keine Connection URL in Report kopieren.
- Ergebnis dokumentieren (PASS/FAIL, angewandte Migrationen, Datum).

## H. Stop Conditions
**STOP bei:**
- Project ref abweichend.
- Ziel wirkt wie Production.
- Migration History leer, aber Tabellen existieren.
- Tabellen existieren unerwartet.
- Dry-run/diff zeigt destructive/unerwartete Statements.
- Secret im Output, Chat oder Repo.
- Fehler beim Push.
- Fehlende Owner-Bestätigung.
- Remote Smoke FAIL.
