# All Rust Items — Source & Schema Audit

**Projekt:** RustMasterTool · **Ort:** Learn → All Rust Items · **Datum:** 2026-07-08
**Typ:** Audit + Datenmodell + Umsetzungsplan (**keine Implementierung**). Kein Code, kein Deploy, kein Merge.

## 1. Zusammenfassung / Empfehlung
Rust-**Gameplay-Item-Daten** (Craft-Kosten, Recycler-Yields, Raid-Damage, Stack Size, Workbench-Level) sind **in keiner offiziellen API** verfügbar — weder Steam noch Facepunch bieten sie. Steam kennt nur **Marktplatz-/Skin-Items**, nicht die Gameplay-Werte. Die belastbaren Gameplay-Daten liegen entweder (a) in den **extrahierbaren Rust-Item-Definitionen** (via Open-Source-Extractor aus den Spieldateien) oder (b) müssen wie bei Map Intel **selbst kuratiert** werden (Rustlabs nur als **manuelle** Referenz, kein Scraping).

**Empfohlene Primärstrategie (Hybrid):**
1. **Identität + Icons** (shortname, item_id, display_name, category, Icon) → aus einem **selbst gehosteten Extractor** (nerif-tafu/rust-api-Stil) **oder** einem lizenzklaren Static-Dump → Icons als **eigene Assets** cachen.
2. **Gameplay/Raid/Craft-Daten** → **eigene kuratierte Registry** (TS/JSON, wie Map Intel `mapIntelData.ts`), mit `source_confidence` + `needs_owner_review`, manuell gegen Rustlabs validiert.
3. **Steam-API** → optional, später, nur für **Skin-Metadaten** — nicht für den Kern.
4. **Supabase** → erst wenn das Datenmodell stabil ist (Phase E).

Das spiegelt exakt das bewährte Map-Intel-Muster: statische, ehrliche, versionierte Wissensbasis mit Confidence-Flags.

## 2. Quellenvergleich

### A) Steam Web API / Steam Economy / SteamWebAPI
- **Was es liefert:** Marktplatz-/Inventar-Items = v. a. **Skins/Cosmetics** (Workshop). `ISteamEconomy/GetAssetClassInfo`, `GetAssetPrices` → Klassen-Metadaten + `icon_url` (Steam Economy CDN), Marktpreise. `IEconItems_252490` teils app-spezifisch.
- **Eignung Icons:** gut für **Skin**-Icons; **nicht** für kanonische Gameplay-Item-Icons (die Basis-Items sind keine Market-Items).
- **Eignung Metadaten:** **Economy-/Skin-Daten**, **keine** Gameplay-Werte (Craft/Raid/Stack/Workbench fehlen komplett).
- **Grenzen:** API-Key nötig, Rate-Limits, Steam-API-Terms; Gameplay-Daten out of scope.
- **Icons:** Steam-CDN-Hotlink möglich, aber für Produktassets **eigenes Caching** + Lizenzprüfung sicherer.
- **Verdikt:** **Nicht** Kern-Quelle. Optionaler Skin-Layer (Phase „später/optional").

### B) nerif-tafu/rust-api bzw. vergleichbare Open-Source-Extractoren
- **Ansatz:** self-hosted; extrahiert die **Item-Definitionen direkt aus den Rust-Spieldateien** (ItemDefinitions) inkl. shortname, item id, display name, category und **Item-Icons**.
- **Icons:** ja — die echten In-Game-Item-Icons (bester kanonischer Icon-Quell-Kandidat).
- **Aufwand:** Docker/Node/Hosting; muss **nach jedem Rust-Update** neu laufen (Item-Änderungen/neue Items).
- **Aktualität:** an Rust-Wipes/Updates gekoppelt → Re-Run-Pipeline nötig.
- **Lizenz:** **vor Nutzung prüfen** (Repo-Lizenz + ob extrahierte Facepunch-Assets weiterverteilt werden dürfen). ⚠️ Icons sind Facepunch-Assets → interne Nutzung meist toleriert, Weiterverteilung/Redistribution rechtlich klären.
- **Verdikt:** **Bester Kandidat** für Identität + Icons, wenn Lizenz/Betrieb geklärt. Einmal extrahieren → als eigene Assets/JSON einfrieren.

### C) Static JSON Dumps / GitHub / uMod (Oxide) Community
- **Ansatz:** fertige Listen `shortname → item_id → display_name (→ category)` (uMod-Item-Listen, GitHub-Gists, Community-Dumps).
- **Eignung:** sehr gut für den **initialen Bootstrap** von IDs/Shortnames/Namen/Kategorien.
- **Aktualitätsrisiko:** Dumps veralten; neue Items fehlen → Versionsstempel + periodischer Abgleich.
- **Lizenzrisiko:** je nach Quelle unklar → Quelle + Lizenz pro Dump dokumentieren, nur lizenzklare verwenden.
- **Qualität/Abdeckung:** IDs/Shortnames gut; **keine** Raid/Craft/Recycler-Werte.
- **Verdikt:** guter **Bootstrap** für Identität; **nicht** für Gameplay-Tiefe.

### D) Rustlabs
- **Datenqualität:** Goldstandard für Craft/Recycle/Research/**Raid-Kosten & Damage**.
- **Aber:** **keine öffentliche API**, **kein Scraping**, keine automatisierte Nutzung ohne Erlaubnis.
- **Zulässig:** **nur manuelle** Referenz durch einen Menschen beim Kuratieren unserer eigenen Daten (Werte selbst eintippen/validieren), sofern rechtlich sauber. Keine Datei-/Bild-Übernahme.
- **Verdikt:** **manuelle Referenz** für die kuratierten Raid/Craft-Felder — nicht als Datenquelle integrieren.

### E) Eigene kuratierte Datenbank
- **Selbst pflegen (manuell validiert):** `usage_summary`, `beginner_notes`, `advanced_notes`, `raid_damage_json`, `raid_cost_profiles_json`, Tipps, „wofür gebraucht", `source_confidence`, `needs_owner_review`.
- **Halbautomatisch importierbar:** `shortname`, `item_id`, `display_name`, `category`, `stack_size`, `icon` (aus B/C), teils `workbench_level`/`research_cost`/`craft_cost`/`recycler_yield` (aus Extractor-Definitionen, falls enthalten) — danach **stichprobenweise validieren**.
- **Verdikt:** das ist der Kern — Identität importieren, Gameplay/Raid kuratieren.

### Quellen-Matrix
| Quelle | Icons | Identität (id/shortname) | Craft/Recycle | Raid-Damage | API? | Lizenz-/ToS-Risiko | Rolle |
|---|---|---|---|---|---|---|---|
| Steam Economy | 🟡 nur Skins | ❌ | ❌ | ❌ | ✅ (Key) | mittel | optional (Skins) |
| Open-Source-Extractor (B) | ✅ | ✅ | 🟡 teils | ❌ | ❌ (self-host) | ⚠️ prüfen | **Kern: Identität+Icons** |
| Static Dumps (C) | 🟡 | ✅ | ❌ | ❌ | ❌ | ⚠️ je Quelle | Bootstrap |
| Rustlabs (D) | – | – | ✅ | ✅ | ❌ | **hoch (Scraping verboten)** | manuelle Referenz |
| Eigene DB (E) | (gecacht) | (importiert) | ✅ kuratiert | ✅ kuratiert | – | gering | **Kern: Gameplay/Raid** |

## 3. Risiko-/Lizenzbewertung
- **Facepunch/Rust-Assets (Icons):** interne/fan-nahe Nutzung meist toleriert; **Redistribution** rechtlich vor breitem Rollout klären. Icons als eigene Assets cachen, Herkunft dokumentieren.
- **Rustlabs:** **kein Scraping**, keine automatisierte Nutzung. Nur manuelle Referenz.
- **Static Dumps:** Lizenz pro Quelle prüfen; nur klare Lizenzen.
- **Steam:** API-Terms + Rate-Limits; Key nur serverseitig (nie Frontend) — falls je genutzt.
- **Generell:** jede importierte Zeile bekommt `source_urls_json` + `source_confidence` + `game_version_or_updated_at` → Nachvollziehbarkeit & Update-Fähigkeit.

## 4. Empfohlenes Datenmodell (`rust_items`)
Rückwärtskompatibel als TS-Interface (Phase B/C als Static Registry, Phase E 1:1 als Supabase-Tabelle). JSON-Felder als strukturierte Sub-Objekte.

```ts
export type ItemSourceConfidence = 'verified' | 'likely' | 'imported' | 'uncertain';

export interface CraftCost { shortname: string; amount: number; }
export interface RecyclerYield { shortname: string; amount: number; chance?: number; }
export interface RaidDamageEntry {         // Schaden/Bedarf gegen ein Ziel
  target: 'wood_wall' | 'stone_wall' | 'metal_wall' | 'armored_wall'
        | 'wood_door' | 'sheet_door' | 'garage_door' | 'armored_door'
        | 'deployable' | string;
  quantity?: number;                        // z. B. „4 C4 für Stone Wall"
  perHit?: number;                          // Schaden pro Treffer
  note?: string;
}
export interface RaidCostProfile {          // aggregiertes Kostenprofil
  target: string; explosive: string; amount: number; sulfurCost?: number;
}

export interface RustItem {
  id: string;                 // interner Slug (stabil)
  shortname: string;          // z. B. "explosive.timed"
  itemId: number | null;      // numerische Rust Item-ID
  displayName: string;
  category: string;           // Weapon, Tool, Resource, Construction, …
  subcategory?: string;
  description: string;
  usageSummary: string;       // „Wofür wird es gebraucht?"
  beginnerNotes?: string;
  advancedNotes?: string;
  stackSize: number | null;
  workbenchLevel: 0 | 1 | 2 | 3 | null;
  researchCost: number | null;       // Scrap
  craftCost: CraftCost[];             // craft_cost_json
  recyclerYield: RecyclerYield[];     // recycler_yield_json
  raidDamage: RaidDamageEntry[];      // raid_damage_json
  raidCostProfiles: RaidCostProfile[];// raid_cost_profiles_json
  durabilityOrHealth?: number | null;
  ammoType?: string | null;
  deployableCategory?: string | null;
  // Medien
  iconSource?: 'extractor' | 'steam' | 'own' | 'placeholder';
  iconUrl?: string | null;            // externe URL (falls erlaubt)
  localIconPath?: string | null;      // bevorzugt: eigenes Asset
  // Steam (optional, später)
  steamClassId?: string | null;
  steamInstanceId?: string | null;
  // Qualität / Herkunft
  sourceUrls: string[];               // source_urls_json
  sourceConfidence: ItemSourceConfidence;
  needsOwnerReview: boolean;
  gameVersionOrUpdatedAt: string;     // ISO oder Rust-Build/Version
  createdAt?: string;
  updatedAt?: string;
}
```
**Feld-Herkunft:** `shortname/itemId/displayName/category/stackSize/icon` → import (B/C); `craftCost/recyclerYield/workbenchLevel/researchCost` → import wenn vorhanden, sonst kuratiert; `raidDamage/raidCostProfiles/usage/notes` → **kuratiert** (Rustlabs manuell). Alles mit `sourceConfidence`.

## 5. UI-Konzept (Learn → All Rust Items)
Analog zum bestehenden **Map Intel**-Muster (`features/learn/map-intel/`) und **Rust Guides**.

**Einstieg:** neue Learn-Card „All Rust Items" in `LearnHub` → View `rust_items` (neuer `ViewState`, display-getoggelt wie map_intel).

**Listenansicht:**
- **Search** (Name/shortname).
- **Kategorie-Chips** (Weapon, Tool, Resource, Construction, Medical, Ammo, Component, Deployable, Electrical, …).
- **Filter:** Workbench-Level (0/1/2/3), Raid-Relevanz (ja/nein), Craftable / Non-craftable, Recycler-relevant.
- **Item-Cards:** Icon, Name, Kategorie-Badge, Kurzinfo (`usageSummary`), Confidence-/„needs review"-Badge (Ehrlichkeit wie Map Intel).

**Detailansicht (Modal/Panel):**
- Großes Icon + Name + Kategorie/Confidence-Badges.
- **Beschreibung** & **„Wofür nutzen?"**.
- **Crafting** (craftCost + Workbench-Level), **Research** (Scrap), **Recycler-Yield**.
- **Raid-Kosten** (raidCostProfiles/raidDamage) — mit **„Open in Raid Calculator"**-Button, wenn raid-relevant.
- **Tipps** (beginner/advanced), **Verwandte Items**.
- Ehrliche Fallbacks: fehlende Werte → „not documented yet", **keine erfundenen Zahlen**.

**Raid-Calculator-Verknüpfung:** Detail-CTA übergibt `shortname`/Ziel an den bestehenden/geplanten Raid Calculator (aktuell RoadmapView `raid_calculator`).

## 6. Implementierungsphasen
- **Phase A — Source & Schema Audit** ← *dieses Dokument.*
- **Phase B — Static Item Registry Foundation:** `features/learn/rust-items/rustItemsData.ts` (Interface aus §4), **20–50 Kern-Items** (Explosives, Türen/Wände, Tools, Kern-Waffen, Schlüssel-Ressourcen), UI unter Learn (List+Detail+Filter), Icons als Placeholder/erste eigene Assets. Confidence/Review sichtbar.
- **Phase C — Full Item Import:** Identität+Icons via Extractor/Dump (B/C), Kategorien, komplette Suche/Filter; Icons als eigene Assets (`public/rust-items/assets/<shortname>.png`), Lizenz geklärt.
- **Phase D — Raid Data Layer:** Explosives, Türen/Wände/Deployables, `raidCostProfiles`; feste Verknüpfung zum **Raid Calculator**.
- **Phase E — Supabase Item DB:** erst wenn Modell stabil; Admin-/Review-Felder, Update-Pipeline (Extractor-Re-Run nach Rust-Update), RLS public-read/service-write (wie `rustmaps_map_cache`-Muster).

## 7. Klare Empfehlung — nächster Real-Implementation-Step
**Phase B — Static Item Registry Foundation.** Konkret:
1. `ViewState 'rust_items'` + LearnHub-Card + `RustItemsView` (List/Detail/Filter) nach Map-Intel-Muster.
2. `rustItemsData.ts` mit dem §4-Interface und **~30 raid-/progression-relevanten Kern-Items**, **kuratiert** (Rustlabs manuell), jede Zeile mit `sourceConfidence`/`needsOwnerReview`.
3. Icons zunächst als **generierte Platzhalter** (kein Asset-Download in diesem Schritt), Pfad `localIconPath` vorgesehen.
4. **Kein** externer Call, **keine** Supabase, **keine** Icons herunterladen — reine Frontend-Foundation, mergefähig und ehrlich.

Parallel **vor** Phase C zu klären (Owner/rechtlich): Lizenz des Extractors (B) + Zulässigkeit der Icon-Redistribution. Ohne diese Klärung bleibt Phase B (eigene Kuration + Platzhalter) der sichere Weg.

## 8. Was ausdrücklich NICHT gemacht wird
Kein Rustlabs-Scraping, keine automatisierte Rustlabs-Nutzung, keine Icon-Redistribution ohne Lizenz, keine Fake-Werte, kein API-Key im Frontend, keine Steam-Bearer/User-Tokens, keine DB/Supabase-Änderung in Audit/Phase B.
