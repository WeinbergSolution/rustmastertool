# Server Filter Capability Audit

## Phase 2 — Capability Matrix

| filterOrInfo | ownerWish | availableNow | sourceField | sourceReliability | implementationType | frontendOnlyPossible | backendRequired | heuristicPossible | falsePositiveRisk | recommendedUI | recommendedPriority | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Wipe Age | 1 | yes_exact | `details.rust_last_wipe` | exact | derived_from_timestamp | true | false | false | low | Dropdown (Any, ≤10m, ≤1h...) | Tier 1 | Easy exact diff from current time. |
| Wipe Date/Time | 2 | yes_exact | `details.rust_last_wipe` | exact | existing_field | true | false | false | low | Date/Time Picker | Tier 1 | Next wipe is not exact, often needs heuristic. |
| Farm-/Loot-Mult | 3 | heuristic_only | `tags`, `name` | medium | derived_from_tags | true | false | true | high | "likely 2x", "Farm Rate (Heuristic)" | Tier 3 | Risk of confusing gather rate with stack size. |
| Teamlimit | 4 | heuristic_only | `tags`, `name` | medium | derived_from_tags | true | false | true | high | Solo, Duo, Trio, Quad, 5+, Clan | Tier 3 | No official `maxGroupSize` in standard API subset. |
| Region | 5 | yes_derived | `country` | high | derived_from_country | true | false | false | low | EU, NA, SA, AS, OCE, AF | Tier 2 | Requires mapping ISO codes to regions. |
| Wipe Shoulder Day| 6 | yes_derived | `details.rust_last_wipe` | exact | derived_from_timestamp | true | false | false | low | Wipe Weekday, Thursday Wipe | Tier 2 | Better naming than "disabled". |
| Combat Training | 7 | heuristic_only | `tags`, `name` | medium | derived_from_tags | true | false | true | medium | Mode filter: Combat / Arena | Tier 3 | Can be added to existing mode filters. |
| Ingame Time | 8 | not_available | - | unknown | impossible_from_current_data| false | true | false | high | NO-GO | Tier 5 | Needs RCON or Rust Plugin polling. |
| Raid Windows | 9 | heuristic_only | `tags`, `name` | low | derived_from_name_description| true | false | true | high | "Rules detected" / Heuristic | Tier 3 | Very non-standard phrasing across servers. |
| Rank | 10 | yes_exact | `rank` | exact | existing_field | true | false | false | low | Top 100, Top 500, Top 1000 | Tier 1 | Already in API response. |
| Country | 11 | yes_exact | `country` | exact | existing_field | true | false | false | low | ISO-Code Dropdown | Tier 1 | Already implemented. |
| Map-Daten | 12 | yes_exact | `details.map`, `details.rust_world_size`, `seed`| exact | existing_field | true | false | false | low | Map Size, Custom Map, Map Name | Tier 1 | Seed should remain hidden for privacy. |
| Player-Liste | 13 | not_available | BM `/players` | exact | requires_new_api_call | false | true | false | low | Detail-on-demand | Tier 4 | Risk of Rate Limits, needs API keys. |
| Restart-Zeit | 14 | heuristic_only | `name`, description | low | derived_from_name_description| true | false | true | high | - | Tier 3 | Rarely accurate without Backend. |
| Spawn-Intervalle| 15 | not_available | - | unknown | impossible_from_current_data| false | true | false | high | NO-GO | Tier 5 | Needs RCON / config access. |

## Phase 3 — Einzelprüfung der Owner-Wünsche

### A) Zeit seit Wipe
- **Prüfung:** `details.rust_last_wipe` ist ein exaktes Timestamp-Feld mit ISO-Format (inkl. UTC-Timezone). Es ist im Frontend bereits über `lastWipe` in `serverSummary` abrufbar.
- **Fazit:** Exakt berechenbar (Current time - `lastWipe`).
- **UI-Vorschlag:** Dropdown "Wipe age": Any, ≤10m, ≤30m, ≤1h, ≤2h, ≤4h, ≤8h, ≤12h, ≤24h, ≤3d.

### B) Wipe Date / Wipe Time / Next Wipe
- **Prüfung:** `rust_last_wipe` enthält exaktes Datum und Uhrzeit. "Next Wipe" gibt es nicht als strukturiertes API-Feld in unserer aktuellen Integration.
- **Fazit:** Datum und Uhrzeit für Last Wipe sind exact. Next Wipe ist *heuristic_only* oder erfordert Scraping der Beschreibung.

### C) Farm-/Loot-Multiplikator
- **Prüfung:** Kein strukturiertes Feld. Wir haben nur `tags`, `name` und ggf. `description`.
- **Fazit:** *heuristic_only*. Es gibt ein hohes Risiko für False Positives (z.B. "2x stack" vs "2x gather").
- **UI-Vorschlag:** Label "likely 2x", "likely 3x". Klar als "heuristic_only" markieren.

### D) Teamlimit / Gruppengröße
- **Prüfung:** Kein strukturiertes Feld wie `maxGroupSize` im normalen Payload. Nur über `tags` ("solo", "duo") oder Name.
- **Fazit:** *heuristic_only*.
- **Empfohlene Filter:** Any, Solo, Duo, Trio, Quad, 5+, No Limit / Clan, Unknown.

### E) Region
- **Prüfung:** `country` (z.B. ISO-Code "US", "DE") ist vorhanden. Region ist aktuell nicht im Filter implementiert, da Mapping fehlt.
- **Fazit:** *yes_derived*. Ein statisches Mapping von ISO-Country-Code zu Region (EU, NA, SA, AS, OCE, AF) kann im Frontend problemlos eingebaut werden.

### F) Wipe Shoulder Day
- **Prüfung:** "Disabled" Filter im UI ist vermutlich ein Überbleibsel. Man kann aus `rust_last_wipe` den Wochentag ableiten (`new Date(lastWipe).getDay()`).
- **Fazit:** *yes_derived*.
- **Empfehlung:** Umbenennen in "Wipe timing" (Thursday wipe, Weekend wipe, Wiped today).

### G) Combat Training
- **Prüfung:** Nur als Heuristik über Name/Tags machbar ("aim train", "battlefield", "ukn").
- **Fazit:** *heuristic_only*. Kann wie `pve` oder `roleplay` als Mode-Filter integriert werden.

### H) Ingame-Zeit / Tag-Nacht
- **Prüfung:** Weder BattleMetrics noch unsere API liefern die Ingame-World-Time regelmäßig und zuverlässig genug, ohne aktiv den Rust Server über RCON abzufragen.
- **Fazit:** NO-GO für aktuelle API. *future backend requirement*.

### I) Raid-Zeiten / Raid Windows
- **Prüfung:** Keine strukturierten Felder. Nur aus Description/Tags ablesbar.
- **Fazit:** *heuristic_only*. Sollte als "Rules detected" / "Heuristic" angeboten werden.

### J) Rank
- **Prüfung:** `rank` Feld ist in BattleMetrics vorhanden und wird bereits als `server.rank` im Frontend ausgelesen.
- **Fazit:** *yes_exact*. Kann als Range-Slider oder Dropdown (Top 100, Top 500) gefiltert werden.

### K) Map-Daten
- **Prüfung:** `details.map` (Map Name), `details.rust_world_size` (Size) und `seed` existieren. Aus DB (`server_map_identity`) gibt es `is_custom_map`, Map Intel und Monumente.
- **Fazit:** *yes_exact*. **Achtung:** `seed` aus UX/Privacy-Gründen weiterhin verstecken.

### L) Player-Liste
- **Prüfung:** Nicht in der Search/Detail Payload enthalten. Erfordert Aufruf des BattleMetrics `/players` Endpoints.
- **Fazit:** *requires_new_api_call*. Massenabfragen vermeiden (Rate Limit Risiko). Wenn, dann nur als *Detail-on-demand*.

### M) Restart-Zeit
- **Prüfung:** Kein API-Feld. Nur Serverbeschreibung.
- **Fazit:** *heuristic_only*. Sehr unzuverlässig.

### N) Spawn-Intervalle
- **Prüfung:** Keine Daten vorhanden. Braucht RCON oder Plugin.
- **Fazit:** NO-GO.

## Phase 4 — Available Server Data Inventory

| fieldPath | exampleValue | type | source | reliability | currentlyUsedInUI | possibleFutureUse | notes |
|---|---|---|---|---|---|---|---|
| `id` | "12345" | string | BM API | exact | Yes | - | Internal BM ID |
| `name` | "Rusticated EU..." | string | BM API | exact | Yes | Regex filters | - |
| `players` | 150 | number | BM API | exact | Yes | Range filters | - |
| `maxPlayers` | 300 | number | BM API | exact | Yes | Fill % filters | - |
| `status` | "online" | string | BM API | exact | Yes | Hide offline | - |
| `country` | "DE" | string | BM API | exact | Yes | Region mapping | ISO Code |
| `rank` | 42 | number | BM API | exact | Yes (Sort) | Top N filters | - |
| `details.map` | "Procedural Map" | string | BM API | exact | Yes | - | - |
| `details.rust_world_size` | 4500 | number | BM API | exact | Yes | Map Size Range | - |
| `details.rust_world_seed` | 123456 | number | BM API | exact | No | - | Hidden for Privacy |
| `details.rust_last_wipe` | "2023-10-10T..." | string | BM API | exact | Yes (Text) | Wipe Age Filter | High precision datetime |
| `details.rust_type` | "official" | string | BM API | exact | Yes | Type Filter | - |
| `details.rust_queued_players`| 15 | number | BM API | exact | Yes | Has Queue Filter | - |
| `details.pve` | false | boolean| BM API | exact | Yes (Filter) | - | - |
| `details.rust_secure` | true | boolean| BM API | exact | Yes (Filter) | - | EAC status |
| `details.tags` | ["vanilla"] | string[]| BM API | exact | Yes (Mode) | Teamlimit / Loot (Heuristic) | - |
| DB: `map_type` | "procedural" | string | Supabase | exact | Yes | Custom map filter | - |
| DB: `monument_names` | ["launch_site"] | string[]| Supabase | exact | Yes | Map Intel Filter | Canonical mapping exists |

## Phase 5 — Quick Wins

**Tier 1 — Exact / sofort sicher:**
- Wipe Age (`current time` - `lastWipe`)
- Rank Filter (Top 100, Top 500, etc.)
- Map Size Range Filter (1000 - 6000)

**Tier 2 — Derived:**
- Region Filter (Mapping von `country` nach EU/NA/SA/AS/OCE/AF)
- Wipe Timing / Weekday (Thursday wipe, Weekend wipe anhand des Dates)

**Tier 3 — Heuristic:**
- Combat Training (via Tags/Name in Mode-Filter)
- Teamlimit (via Tags/Name mit "likely" Label)

**Tier 4 — Backend nötig:**
- Aktuelle Player-Liste (Detail-on-demand)

**Tier 5 — NO-GO aktuell:**
- Ingame Server Time / Day-Night Cycle
- Spawn-Intervalle

## Phase 6 — Konkreter Implementierungsplan

**Phase A: Safe exact filters**
- **Wipe Age:** Dropdown im `serverFilters.ts` (e.g., `maxWipeAgeHours`). `applyClientFilters` berechnet `Date.now() - Date.parse(s.lastWipe)`.
- **Rank:** Range Filter `minRank` / `maxRank`.
- **Map Size:** Range Slider im Frontend.

**Phase B: Derived filters**
- **Region:** Neues Mapping-Objekt im Frontend (z.B. `const EU_COUNTRIES = ['DE', 'FR', 'GB', ...]`). Filter `region` ergänzt `country`.
- **Wipe Timing:** Helper-Funktion extrahiert Tag (`.getDay() === 4` -> Thursday). Filter Option hinzufügen.

**Phase C: Heuristic filters mit Confidence Labels**
- Neues Badge-System für UI: "Heuristic Match: Solo/Duo".
- Regex / Array-includes auf `tags` und `name.toLowerCase()`.
- **Teamlimit:** `/\b(solo|duo|trio|quad|5 man)\b/`
- **Loot Multiplier:** `/\b([235]x)\b/`

**Phase D: Backend Enrichment**
- **Player List:** Nur in `ServerDetailPanel.tsx` einen neuen Tab "Players" bauen, der on-click eine neue Supabase Function aufruft (fetcht BM `/players`), um API-Kosten zu minimieren.
