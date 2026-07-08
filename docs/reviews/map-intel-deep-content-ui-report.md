# Walkthrough: Map Intel Deep Content & Asset Tile Video UX

The implementation of the Map Intel Video UX and Deep Content is fully completed according to the plan and corrections. The Map Intel View has been entirely redesigned to display the premium "Asset Tiles", and clicking on any tile opens a richly formatted Detail Modal displaying the deep JSON data.

## Implementation Details

### Data Merge & Assets
- **Base vs. Deep Merge**: The `MapIntelView` now gracefully merges `mapIntelData.ts` and `DEEP_MONUMENT_DATA`. Deep Content objects act as the primary source of truth. Any remaining `MAP_MONUMENTS` that do not exist in the deep JSON are appended and display using a fallback modal layout.
- **SVGs Extracted**: 58 SVGs were extracted from `assets.zip` and placed into `apps/web/public/map-intel/assets`. They are perfectly mapped using the `imageUrl` field.

### Asset Tile UX
- The cards feature dynamic, sleek gradient backgrounds according to their Tier/Category (blue, purple, red, green, teal, grey).
- Top-right corner displays `keycard` and `fuse` requirements as colored dots (Green, Blue, Red, Yellow).
- Extracted SVG assets are rendered as the central icon with drop shadows.
- Tiles with `needsOwnerReview: true` have a small yellow `?` badge in the dots section.

### Deep Content Modal & Video UX
- A `MapIntelDetailModal` has been constructed.
- Renders: *Why Run It, Access, Puzzle & Access (with steps and requirements), Loot Guide, Threats & Risks, Strategy & Tips, Sources, and Related Videos*.
- **Video UX**: `relatedVideos` are rendered as elegant YouTube thumbnail cards. Clicking a card replaces the thumbnail with an embedded YouTube `iframe` that automatically plays. No external packages like `react-youtube` were used.
- Contains the `needs owner review` warning explicitly in the header.

## Formal Report metrics

- **Anzahl Deep Entries**: 58
- **Anzahl kopierter SVG Assets**: 58
- **Anzahl Video IDs/Links**: 66 Total Video Links across all monuments.
- **ID-Mismatches Deep vs Base**:
  - **Deep Entries not in Base (17)**: `abandoned_military_base`, `tunnel_entrance_transition`, `power_substation_small`, `power_substation_big`, `rock_formation_tiny_god`, `rock_formation_anvil`, `rock_formation_medium_god`, `rock_formation_three_wall`, `rock_formation_large_god`, `cave_small_medium`, `cave_medium_easy`, `cave_large_hard`, `cave_small_easy`, `cave_large_medium`, `cave_small_hard`, `cave_large_sewers_hard`, `cave_medium_medium`.
  - **Base Entries not in Deep (5)**: `bandit_camp`, `military_base`, `cave`, `rock_formation`, `power_substation`.
- **Asset-Mismatches**: 0. Every deep entry has a corresponding SVG asset perfectly copied.
- **Video-Mismatches**: 0. All 66 videos successfully map to standard YouTube URL structures that the custom parser successfully extracts the ID from.
- **needsOwnerReview Liste**:
  - `warehouse`
  - `harbor_small`
  - `ferry_terminal`
  - `missile_silo`
- **Caves Handling**: The deep JSON defines specific caves (e.g. `cave_large_hard`, `cave_small_easy`) while the base data only had a generic `cave` entry. All 8 specific deep caves are fully rendered as distinct Asset Tiles using the generic Cave styling (Grey background, SVG) and work perfectly. The old base generic `cave` also remains as a fallback tile, though the deep ones provide much more detail.
- **Bestätigung**:
  > [!IMPORTANT]
  > Hiermit bestätige ich: Es wurden **keine** fremden Bilder (außer euren SVGs/YT-Thumbnails) geladen. Es wurden **keine** Änderungen an DB, Supabase, Auth oder `env` vorgenommen. Es gab **keinen** `git push` nach main.

You can verify the app by launching the development server on the `feature/map-intel-deep-content-ui` branch.
