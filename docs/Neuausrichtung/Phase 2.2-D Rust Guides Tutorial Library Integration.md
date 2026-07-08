# Phase 2.2-D: Rust Guides Tutorial Library Integration

This plan outlines the steps to extract the 713 YouTube tutorials from `rust_tutorial_komplett.md` and integrate them into a new, mobile-optimized `RustGuidesView` without affecting the parallel Mobile Shell / Server Explorer work.

## Open Questions
- **Routing:** Currently, `LearnHub` routes to `base_blueprints`. Are you okay with adding `'rust_guides'` as a valid view state to `AppShell.tsx` and handling it similarly to how `base_blueprints` is handled? (This is minimal).

## Proposed Changes

### 1. Branch Strategy
- **Base Branch:** `feature/phase-2-2-c-mobile-server-explorer` (since it contains the latest Mobile LearnHub work).
- **New Branch:** `feature/phase-2-2-d-rust-guides-library`

### 2. Data Parsing & Structuring
I will write a temporary Node.js script (`scratch/parse_guides.ts`) to read `docs/Neuausrichtung/rust_tutorial_komplett.md`.
The script will use regex to:
1. Identify Categories (`## Category Name`)
2. Extract Videos (`1. [Title](URL)`)
3. Extract `youtubeId` from URLs (`v=` or `youtu.be/`)
4. Filter out invalid links
5. Deduplicate globally while keeping track of which categories a video belongs to.
6. Auto-map the 54 categories into the 8 requested **Progression Stages**:
    - **start_here**: Beginner / Einsteiger, Progression / Fortschritt, Solo Survival, Wipe Day
    - **economy_resources**: Holz & Stein, Schwefel, Metall & HQM, Scrap, Low Grade Fuel, Components, Recycler
    - **food_farming_animals**: Nahrung, Cloth / Hemp, Anpflanzen / Genetik, Tee / Mixing Table, Jagd / Tiere, Pferde, Angeln
    - **base_systems**: Workbench / Tech Tree, Elektrik, Industrial / Sorter, Turrets / Traps, Medizin / Heilung
    - **monuments_keycards**: Alle Monumente, Airfield, Launch Site, Military Tunnels, Water Treatment, Train Yard, Power Plant, Harbor, Kleine Monumente, Dome, Excavator, Arctic Research Base, Missile Silo, Underwater Labs, Oil Rig
    - **events_bosses**: Cargo Ship, Bradley, Patrol Helicopter, Attack Helicopter, Chinook
    - **vehicles**: Modular Cars, Submarines, Boats, Minicopter / Scrap Heli, Hot Air Balloon, Trains / Workcart
    - **combat_raiding**: Raiding Guide, Sprengstoff einsetzen, PvP Guide, Recoil / Aim Training, Loadouts / Roaming
    - *(Any other minor categories will be logically assigned and reported).*

The script will output `apps/web/src/features/learn/rust-guides/rustGuidesData.ts` adhering to the specified TypeScript types.

### 3. Frontend Architecture

#### [NEW] `apps/web/src/features/learn/rust-guides/RustGuidesView.tsx`
A new mobile-first view containing:
- **Hero Header:** Displays title, subtitle, and live stats (713 videos, 54 categories, 8 stages).
- **Search & Filters:** A search input and horizontally scrollable Stage chips.
- **Content Feed:** Vertical list of Stage Cards containing Category Cards.
- **Video Rendering:** Uses `https://img.youtube.com/vi/{youtubeId}/hqdefault.jpg` for thumbnails. To ensure mobile performance, we will render a maximum of 6 videos per category initially, with a "Show All" toggle. External links will open YouTube in a new tab.

#### [MODIFY] `apps/web/src/features/learn/LearnHub.tsx`
- Remove the "Coming Soon" lock on the Rust Guides card.
- Enable `onClick={() => onViewChange('rust_guides')}`.

#### [MODIFY] `apps/web/src/components/AppShell.tsx` (Minimal)
- Add `'rust_guides'` to the `ViewState` type.
- Add rendering logic to display `<RustGuidesView />` when `view === 'rust_guides'`.

## Verification Plan

### Automated Checks
- `npm run typecheck:web`
- `npm run build:web`

### Data Integrity Checks
- Count total recognized categories (Expected: ~54).
- Count total recognized videos (Expected: ~713).
- Count unique YouTube IDs.
- Log any invalid links or unmapped categories.

### Manual Verification
- Simulate mobile viewpoints (390x844, etc.) to ensure the Rust Guides view is responsive, scrollable without horizontal overflow, and performs well despite 713 underlying data points.
- Verify that clicking a LearnHub card opens the RustGuidesView, and clicking a video opens a new tab.
