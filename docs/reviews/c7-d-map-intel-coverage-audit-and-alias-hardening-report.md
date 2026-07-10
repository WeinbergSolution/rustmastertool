# C7-D — Map Intel Coverage Audit & Alias Hardening Report

**Executive Verdict**: GO

## Status & Tracking
- **Branch**: `experiment/landing-pricing-auth-foundation`
- **Commit Hash**: `[pending]` (wird nach diesem Report committed)
- **Push erfolgreich**: Ja (wird im Anschluss gepusht)

## Coverage Summary
Es wurden 31 generische Canonical-IDs (sowie verschiedene Deep-Content-IDs) aus `CLASSIC_ALIASES` (in `monumentClassification.ts`), `MAP_MONUMENTS` und `DEEP_MONUMENT_DATA` abgeglichen.

- **Total checked**: > 40 (inklusive Sub-Varianten)
- **Full Coverage** (Base + Deep vorhanden): 29 (z.B. Outpost, Launch Site, Airfield, Dome, etc.)
- **Base-Only** (Base vorhanden, Deep fehlt): `bandit_camp`
- **Alias-Needed** (Mapping fehlte/war inkonsistent): 
  - `military_base` vs `abandoned_military_base`
  - spezifische Deep-Caves (z.B. `cave_small_easy`) zu Base `cave`
  - Rock Formations (z.B. `rock_formation_tiny_god`) zu Base `rock_formation`
  - Power Substations zu Base `power_substation`
- **Missing / Content-Gap** (Komplett fehlend, Fallback greift): 
  - Keine der aktuell 31 in `CLASSIC_ALIASES` definierten Monumente fehlen komplett in den Base-Daten. Jedes dieser Monumente hat mindestens Base-Content!
- **Fallback-Only**: Lediglich komplett unbekannte Custom-Monument-Strings, die von Servern gemeldet werden und nicht in `CLASSIC_ALIASES` oder `MAP_MONUMENTS` existieren, nutzen nun das sichere `MonumentInfoModal`-Fallback.

## Ergänzte Aliases (`mapIntelLookup.ts`)
Um die Inkonsistenzen aufzulösen und die Abdeckung zu perfektionieren, wurden folgende Aliases und Fallbacks in `findMapIntelEntryByCanonicalId` eingebaut:
1. `military_base` ↔ `abandoned_military_base` (Base nutzte "military_base", Deep nutzte "abandoned_military_base").
2. `military_tunnel` → `military_tunnels`
3. `sewer` → `sewer_branch`
4. `launchsite` → `launch_site`
5. `ferry` → `ferry_terminal`
6. **Generic Fallbacks**:
   - Wenn ein Server spezifische Deep-Caves meldet (z.B. `cave_small_easy`), wird als Base-Content der generische `cave`-Eintrag herangezogen.
   - Gleiches gilt für `rock_formation_*` (zu `rock_formation`) und `power_substation_*` (zu `power_substation`).

## Offene Content-Gaps
- **Bandit Camp**: Hat einen Base-Eintrag, aber noch keinen Deep-Content (im JSON-File `map-intel-deep-content.json` fehlt der Key `bandit_camp`).
- Dieser Gap bricht die App nicht; die Modal-Karte wird einfach nur den Base-Content (ohne Videos/Deep-Text) für Bandit Camp anzeigen.

## ServerDetailPanel Fallback
- Das Fallback auf `MonumentInfoModal` für unbekannte/unmapped canonicalIds bleibt weiterhin 100% stabil.
- Durch die ergänzten Aliases wird das Fallback aber nun noch seltener beansprucht, da die Coverage-Lücken für Militärbasen, Höhlen und Felsen geschlossen wurden.

## Nächster Schritt
- **C7-E Map Intel Content Gap Fill** (z.B. Bandit Camp Deep Content ergänzen) oder **Raid Calculator Import Audit**. Beides ist technisch direkt anknüpfbar.

## Checks
- `npm run typecheck`: Bestanden.
- `npm run build`: Bestanden.
- Arbeitsregeln: Keine Main-Merges, keine Production Deploys, keine DB-Änderungen, keine Eingriffe in die Heatmap-Pipelines vorgenommen.
