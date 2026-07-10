# Phase 2.4-C6-D2B — Supabase Key Header Compatibility Fix Report

## Executive Verdict: BLOCKED

Das Format des bereitgestellten API-Keys konnte weder als Legacy JWT (`eyJ...`) noch als Supabase Secret (`sb_secret_...`) identifiziert werden. Der Vorgang wurde daher blockiert, um fehlerhafte Uploads und Autorisierungsfehler bei Supabase zu vermeiden.

## Test Summary

- **Branch:** `experiment/map-intelligence-supabase-publisher`
- **Commit Hash:** `[Wird nach Commit erzeugt, Head aktuell b87168f]`
- **Vorheriger Fehler:** `JWS Protected Header is invalid`
- **Erkannte Ursache:** Der verwendete `SUPABASE_SERVICE_ROLE_KEY` in der lokalen Umgebung entsprach keinem gängigen Supabase Key Format. Das System verhindert nun von vornherein Uploads mit unbekannten oder potenziell defekten Token (z. B. abgeschnittenen Strings oder fehlerhaften Präfixen), die zu `403 Unauthorized` führen.

## Key Format Detection

- **supabaseSecretKeyPresent:** `false`
- **supabaseServiceRoleKeyPresent:** `true`
- **selectedKeyFormat:** `Unknown`
- **authorizationBearerUsed:** `false`
- **apikeyHeaderUsed:** `false` (Upload wurde vor HTTP-Request abgebrochen)

## Upload Ergebnis

- **Upload Attempted:** `false` (Validation schlug mit `FATAL` fehl)
- **uploadedObjectCount:** 0
- **failedObjectCount:** 0 (94 invalid aufgrund Validation-Blockers)
- **bucket:** `map-intelligence`
- **objectPrefix:** `map-intel:286:1321:4750:c7ab7ff1d6c599d5b5d20f1d1d33efed7c6932de5e05946df38dab4e5dc3cfd0:resource-density-v0.2:v1.0`
- **Secret Values Logged:** `false`

## Nächster Schritt

**Bucket/Policy/Auth Fix:**
Bevor wir zu C7-B Frontend Leaflet Overlay Integration übergehen können, muss der Key in der `.env.local` überprüft werden. Er muss entweder:
1. Ein valider Legacy JWT Service Role Key sein (beginnt mit `eyJ...`).
2. Ein valider Supabase Secret Key sein (beginnt mit `sb_secret_...`, kann wahlweise auch als `SUPABASE_SECRET_KEY` gesetzt werden).

Sobald der Key korrigiert ist, kann der Smoke Test erneut durchgeführt werden.
