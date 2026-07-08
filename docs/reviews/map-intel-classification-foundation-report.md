# Map Intel — Classification Foundation (Phase 1) Report

**Branch:** `feature/map-intel-classification-foundation` · **Datum:** 2026-07-08
**Scope:** Technische Grundlage (Klassifikation + sichere Chip-Auflösung + Foundation-Einträge). **Nicht** die vollständige Monument-Enzyklopädie.

## Was gebaut wurde

1. **`monumentClassification.ts`** (neu) — zentrale, crashfreie Klassifikation.
   - `classifyMonument()` liefert **immer** ein Ergebnis (nie `null`, nie throw). Unknown-Fallback ist sicher.
   - Auch: `normalizeRawMonumentName`, `normalizeMonumentNames`, `classifyMonuments`, `getKnownMapIntelCanonicalIds`.
   - Match-Reihenfolge: Cave-Regex → Rock → Power-Substation → Tunnel-Entrance → Terrain/Powerline → Review-Overrides → Longest-Alias-First (klassisch) → Unknown.
   - Varianten bleiben erhalten (Caves: `small_medium`…`large_sewers_hard`; Rocks: `tiny_god`/`anvil`/`medium_god`/`three_wall`/`large_god`; Substation: `small`/`big`; Tunnel: `transition`).
   - Import-Richtung zyklusfrei: importiert nur `mapIntelData` (Leaf).

2. **`mapIntelData.ts`** — Schema erweitert (`MonumentCategoryId`, `MonumentConfidence`, `confidence`, `needsOwnerReview`); Kategorien-Enum + `MONUMENT_CATEGORIES` erweitert. **46 Einträge** (8 migriert + 38 Foundation). Foundation-Texte sind kurz & ehrlich; Terrain/Rock/Infra fokussieren Base-/Route-/Heatmap-Relevanz statt Loot. **Warehouse** & **Military Base** = `confidence: likely` + `needsOwnerReview`.

3. **`ServerDetailPanel.tsx`** — Monument-Chips sind jetzt **Buttons** mit Kategorie-Farbpunkt; Klick öffnet ein lokales `MonumentInfoModal` (kein Router-/AppShell-Umbau). Bekannte Chips zeigen den kuratierten Eintrag (inkl. Confidence-/Review-Badge); Unknown-Chips öffnen einen neutralen „not classified yet"-Zustand ohne erfundene Angaben. Kein Crash.

4. **`serverFilters.ts`** — Monument-Filter matcht nur noch auf **sichere, filterbare** Canonical-IDs (`isFilterable && canonicalId`), nie auf Rohwerten oder Terrain/Rock/Infra.

5. **`ServersExplorer.tsx`** — „with map intel"-Counter nutzt `classifyMonuments(...).some(hasMapIntelEntry)`.

6. **`MapIntelView.tsx` / `.css`** — Confidence-/Review-Badges an Karten und Modal.

## Klassifikations-Kategorien

`safe_zone`, `tier_1`, `tier_2`, `tier_3`, `offshore`, `cave`, `tunnel`, `quarry`, `roadside`, `terrain`, `rock_formation`, `infrastructure`, `event`, `unknown`.

## Verifikation des echten 58-String-Samples

Alle 58 rawNames klassifiziert (Wegwerf-`tsx`-Skript, nicht committet): **unknown = 0**, **ohne Map-Intel-Eintrag = 0** (alle klickbar). Edge-Cases (`""`, `"   "`, „Some Custom Prefab XYZ", bare „Harbor") → `unknown` / `null` ohne Crash.

Nur `likely` + Review: **Warehouse** (`warehouse`), **Military Base** (`military_base`). `Tunnel Entrance Transition` → `tunnel_entrance` variant `transition` (`likely`). Alles Übrige `verified`.

## Checks
- `npm run typecheck:web` — EXIT 0
- `npm run build:web` — EXIT 0 (nur vorbestehende 500-kB-Chunk-Info)
- `npm run lint --workspace=apps/web` — EXIT 0 (nur vorbestehende unused-catch-Warnungen)

## Nicht gemacht (bewusst außerhalb Scope)
Keine RustMaps-API-Integration, kein Map-Parser, kein Heatmap-Scoring, keine Bilder (nur SVG/Icon-Placeholder), kein Router-Umbau, keine DB/Functions/Auth/Cron/env-Änderung, kein Deploy, kein `main`-Push.
