// Auto-generated from rust_tutorial_komplett.md

export type RustGuideVideo = {
  id: string;
  title: string;
  url: string;
  youtubeId: string;
  categorySlug: string;
  stageSlug: string;
};

export type RustGuideCategory = {
  slug: string;
  title: string;
  count: number;
  stageSlug: string;
  description: string;
  videos: RustGuideVideo[];
};

export type RustGuideStage = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  order: number;
  categorySlugs: string[];
};

export const RUST_GUIDE_STAGES: RustGuideStage[] = [
  {
    "slug": "start_here",
    "title": "Start Here",
    "subtitle": "Beginner & Wipe Day",
    "description": "Everything you need to survive your first few hours.",
    "order": 1,
    "categorySlugs": [
      "beginner-einsteiger-guide",
      "progression-fortschritt",
      "workbench-tech-tree-blueprints",
      "solo-survival",
      "anpflanzen-planter-genetik-kreuzung",
      "tee-mixing-table",
      "medizin-heilung",
      "z-ge-workcart-above-ground-rail",
      "recoil-control-aim-training",
      "loadouts-roaming-r-stung-ausr-stung"
    ]
  },
  {
    "slug": "economy_resources",
    "title": "Economy & Resources",
    "subtitle": "Gather & Recycle",
    "description": "Learn to farm efficiently and recycle for scrap.",
    "order": 2,
    "categorySlugs": [
      "stoff-hanf-farm-cloth-farm",
      "schwefel-farm-sulfur",
      "metall-hqm-farm",
      "holz-stein-farm",
      "scrap-farm",
      "low-grade-fuel-crude-oil",
      "components-komponenten-farmen",
      "recycler-recycling",
      "minicopter-scrap-heli-fliegen"
    ]
  },
  {
    "slug": "food_farming_animals",
    "title": "Food, Farming & Animals",
    "subtitle": "Sustain Yourself",
    "description": "Master hunting, farming, and genetics.",
    "order": 3,
    "categorySlugs": [
      "jagd-tiere-hunting",
      "pferde-horses-z-hmen-reiten-pflegen",
      "angeln-fishing",
      "nahrung-kochen-h-hner-kompost"
    ]
  },
  {
    "slug": "base_systems",
    "title": "Base Systems",
    "subtitle": "Automation & Tech",
    "description": "Electricity, industrial piping, and defense.",
    "order": 4,
    "categorySlugs": [
      "elektrik-electricity",
      "industrie-system-f-rderb-nder-pipes-sorter"
    ]
  },
  {
    "slug": "monuments_keycards",
    "title": "Monuments & Keycards",
    "subtitle": "Puzzles & Loot",
    "description": "Complete keycard puzzles and secure high-tier loot.",
    "order": 5,
    "categorySlugs": [
      "alle-monumente-bersicht",
      "airfield",
      "launch-site",
      "military-tunnels",
      "water-treatment-plant",
      "train-yard",
      "power-plant",
      "harbor",
      "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
      "the-dome",
      "giant-excavator",
      "arctic-research-base",
      "nuclear-missile-silo",
      "underwater-labs",
      "oil-rig-small-large"
    ]
  },
  {
    "slug": "events_bosses",
    "title": "Events & Bosses",
    "subtitle": "High-risk Encounters",
    "description": "Take down the Bradley, Heli, and secure events.",
    "order": 6,
    "categorySlugs": [
      "cargo-ship-containerschiff",
      "bradley-apc-panzer-besiegen",
      "patrol-helicopter-heli-abschie-en",
      "attack-helicopter",
      "airdrop-locked-crate-chinook"
    ]
  },
  {
    "slug": "vehicles",
    "title": "Vehicles",
    "subtitle": "Land, Air & Sea",
    "description": "Master mini-copters, cars, and boats.",
    "order": 7,
    "categorySlugs": [
      "auto-turret-flame-turret-shotgun-trap",
      "modular-cars-autos",
      "u-boote-submarines",
      "boote-rhib-rowboat",
      "hei-luftballon-hot-air-balloon"
    ]
  },
  {
    "slug": "combat_raiding",
    "title": "Combat & Raiding",
    "subtitle": "PvP & Destruction",
    "description": "Learn recoil patterns, loadouts, and raiding techniques.",
    "order": 8,
    "categorySlugs": [
      "sprengstoff-munition-craften",
      "raiding-guide-kosten-basics",
      "wie-raiden-sprengstoff-einsetzen",
      "pvp-guide"
    ]
  }
];

export const RUST_GUIDE_CATEGORIES: RustGuideCategory[] = [
  {
    "slug": "beginner-einsteiger-guide",
    "title": "Beginner / Einsteiger-Guide",
    "count": 19,
    "stageSlug": "start_here",
    "description": "Guides and tutorials for Beginner / Einsteiger-Guide",
    "videos": [
      {
        "id": "beginner-einsteiger-guide-Wc0ZJo06oAw",
        "title": "Der ultimative Rust-Anfängerguide",
        "url": "https://www.youtube.com/watch?v=Wc0ZJo06oAw",
        "youtubeId": "Wc0ZJo06oAw",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-gPa_ZK8JBtw",
        "title": "Der ultimative RUST-Anfängerleitfaden",
        "url": "https://www.youtube.com/watch?v=gPa_ZK8JBtw",
        "youtubeId": "gPa_ZK8JBtw",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-xmfY_V5OA2Y",
        "title": "Ein vollständiger Leitfaden für Rust",
        "url": "https://www.youtube.com/watch?v=xmfY_V5OA2Y",
        "youtubeId": "xmfY_V5OA2Y",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-8n2tptpwQuw",
        "title": "101 Rust-Tipps für jeden Spieler",
        "url": "https://www.youtube.com/watch?v=8n2tptpwQuw",
        "youtubeId": "8n2tptpwQuw",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-L1tw1MKqpAc",
        "title": "Über 100 Rust-Tipps & Tricks",
        "url": "https://www.youtube.com/watch?v=L1tw1MKqpAc",
        "youtubeId": "L1tw1MKqpAc",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-kr0spV5-NRI",
        "title": "How to 100% Progress in Rust",
        "url": "https://www.youtube.com/watch?v=kr0spV5-NRI",
        "youtubeId": "kr0spV5-NRI",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-veGr_qgz3Mk",
        "title": "Der BESTE Rust Anfänger Guide",
        "url": "https://www.youtube.com/watch?v=veGr_qgz3Mk",
        "youtubeId": "veGr_qgz3Mk",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-ENMi9FVyowI",
        "title": "Wie man 2025 mit RUST beginnt",
        "url": "https://www.youtube.com/watch?v=ENMi9FVyowI",
        "youtubeId": "ENMi9FVyowI",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-cttZEQacYQE",
        "title": "Der perfekte Start- und Basisguide",
        "url": "https://www.youtube.com/watch?v=cttZEQacYQE",
        "youtubeId": "cttZEQacYQE",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-mkfERHvOXoE",
        "title": "Rust Beginner Guide 2026",
        "url": "https://www.youtube.com/watch?v=mkfERHvOXoE",
        "youtubeId": "mkfERHvOXoE",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-fPk-fyP9MFM",
        "title": "Ultimate Beginner's Guide",
        "url": "https://www.youtube.com/watch?v=fPk-fyP9MFM",
        "youtubeId": "fPk-fyP9MFM",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-NqaO-wMEwSk",
        "title": "How to Have a Perfect Start",
        "url": "https://www.youtube.com/watch?v=NqaO-wMEwSk",
        "youtubeId": "NqaO-wMEwSk",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-OHJCcV6gtog",
        "title": "A Complete Beginner's Guide",
        "url": "https://www.youtube.com/watch?v=OHJCcV6gtog",
        "youtubeId": "OHJCcV6gtog",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-HtKxMNTOlB4",
        "title": "20 Rust-Tipps, die ich gerne wusste",
        "url": "https://www.youtube.com/watch?v=HtKxMNTOlB4",
        "youtubeId": "HtKxMNTOlB4",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-trjVKr5PEqo",
        "title": "So spielt man Rust SOLO",
        "url": "https://www.youtube.com/watch?v=trjVKr5PEqo",
        "youtubeId": "trjVKr5PEqo",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-jw6UFiNMPRI",
        "title": "I tried Rust as a complete beginner",
        "url": "https://www.youtube.com/watch?v=jw6UFiNMPRI",
        "youtubeId": "jw6UFiNMPRI",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-xsq2htu3gy0",
        "title": "50+ Rust Tips Most Players Miss",
        "url": "https://www.youtube.com/watch?v=xsq2htu3gy0",
        "youtubeId": "xsq2htu3gy0",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-Y7d4PMNtxrY",
        "title": "25 Dinge für jeden Solo",
        "url": "https://www.youtube.com/watch?v=Y7d4PMNtxrY",
        "youtubeId": "Y7d4PMNtxrY",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      },
      {
        "id": "beginner-einsteiger-guide-OKHeEVEHtjY",
        "title": "Ultimativer Anfängerleitfaden",
        "url": "https://www.youtube.com/watch?v=OKHeEVEHtjY",
        "youtubeId": "OKHeEVEHtjY",
        "categorySlug": "beginner-einsteiger-guide",
        "stageSlug": "start_here"
      }
    ]
  },
  {
    "slug": "progression-fortschritt",
    "title": "Progression / Fortschritt",
    "count": 19,
    "stageSlug": "start_here",
    "description": "Guides and tutorials for Progression / Fortschritt",
    "videos": [
      {
        "id": "progression-fortschritt-kr0spV5-NRI",
        "title": "How to 100% Progress in Rust",
        "url": "https://www.youtube.com/watch?v=kr0spV5-NRI",
        "youtubeId": "kr0spV5-NRI",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-xmfY_V5OA2Y",
        "title": "Ein vollständiger Leitfaden",
        "url": "https://www.youtube.com/watch?v=xmfY_V5OA2Y",
        "youtubeId": "xmfY_V5OA2Y",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-Q_5GK7LV5oo",
        "title": "Veteran's Ultimate Beginner Guide",
        "url": "https://www.youtube.com/watch?v=Q_5GK7LV5oo",
        "youtubeId": "Q_5GK7LV5oo",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-Wc0ZJo06oAw",
        "title": "Der ultimative Rust-Anfängerguide",
        "url": "https://www.youtube.com/watch?v=Wc0ZJo06oAw",
        "youtubeId": "Wc0ZJo06oAw",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-NqaO-wMEwSk",
        "title": "How to Have a Perfect Start",
        "url": "https://www.youtube.com/watch?v=NqaO-wMEwSk",
        "youtubeId": "NqaO-wMEwSk",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-gPa_ZK8JBtw",
        "title": "Der ultimative RUST-Anfängerleitfaden",
        "url": "https://www.youtube.com/watch?v=gPa_ZK8JBtw",
        "youtubeId": "gPa_ZK8JBtw",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-N4QO8boc0Qg",
        "title": "How a Solo with 11,362 Hours",
        "url": "https://www.youtube.com/watch?v=N4QO8boc0Qg",
        "youtubeId": "N4QO8boc0Qg",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-trjVKr5PEqo",
        "title": "So spielt man Rust SOLO",
        "url": "https://www.youtube.com/watch?v=trjVKr5PEqo",
        "youtubeId": "trjVKr5PEqo",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-6ScoiF0wPi4",
        "title": "Die besten Strategien für den Start",
        "url": "https://www.youtube.com/watch?v=6ScoiF0wPi4",
        "youtubeId": "6ScoiF0wPi4",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-ENMi9FVyowI",
        "title": "Wie man 2025 mit RUST beginnt",
        "url": "https://www.youtube.com/watch?v=ENMi9FVyowI",
        "youtubeId": "ENMi9FVyowI",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-yH5uS-3aiMg",
        "title": "Meistere den Rust Wipe Day",
        "url": "https://www.youtube.com/watch?v=yH5uS-3aiMg",
        "youtubeId": "yH5uS-3aiMg",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-IkpkGy6VHzQ",
        "title": "How to Progress as a Solo",
        "url": "https://www.youtube.com/watch?v=IkpkGy6VHzQ",
        "youtubeId": "IkpkGy6VHzQ",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-OHJCcV6gtog",
        "title": "A Complete Beginner's Guide",
        "url": "https://www.youtube.com/watch?v=OHJCcV6gtog",
        "youtubeId": "OHJCcV6gtog",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-hrHMjg0lAwk",
        "title": "Ultimate Snowball Guide",
        "url": "https://www.youtube.com/watch?v=hrHMjg0lAwk",
        "youtubeId": "hrHMjg0lAwk",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-X0nt5S21Aho",
        "title": "How a Solo with 14,274 hours",
        "url": "https://www.youtube.com/watch?v=X0nt5S21Aho",
        "youtubeId": "X0nt5S21Aho",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-aI3uceNGhyo",
        "title": "The Solo Strategy Explained",
        "url": "https://www.youtube.com/watch?v=aI3uceNGhyo",
        "youtubeId": "aI3uceNGhyo",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-U5EFZAj1cXs",
        "title": "Der Plan für den Einstieg",
        "url": "https://www.youtube.com/watch?v=U5EFZAj1cXs",
        "youtubeId": "U5EFZAj1cXs",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-jw6UFiNMPRI",
        "title": "I tried Rust as a complete beginner",
        "url": "https://www.youtube.com/watch?v=jw6UFiNMPRI",
        "youtubeId": "jw6UFiNMPRI",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      },
      {
        "id": "progression-fortschritt-Yn_f5XuT9u4",
        "title": "I Tested 4 Secret Solo Methods",
        "url": "https://www.youtube.com/watch?v=Yn_f5XuT9u4",
        "youtubeId": "Yn_f5XuT9u4",
        "categorySlug": "progression-fortschritt",
        "stageSlug": "start_here"
      }
    ]
  },
  {
    "slug": "workbench-tech-tree-blueprints",
    "title": "Workbench & Tech Tree (Blueprints)",
    "count": 17,
    "stageSlug": "start_here",
    "description": "Guides and tutorials for Workbench & Tech Tree (Blueprints)",
    "videos": [
      {
        "id": "workbench-tech-tree-blueprints-R4BfyuOhn9Q",
        "title": "Leitfaden zum Technologiebaum",
        "url": "https://www.youtube.com/watch?v=R4BfyuOhn9Q",
        "youtubeId": "R4BfyuOhn9Q",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-9qgmClfvlRY",
        "title": "Neuer Blueprint-Fragment-Guide",
        "url": "https://www.youtube.com/watch?v=9qgmClfvlRY",
        "youtubeId": "9qgmClfvlRY",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-qA_Ci1mzWO4",
        "title": "The New Workbench Tech Tree",
        "url": "https://www.youtube.com/watch?v=qA_Ci1mzWO4",
        "youtubeId": "qA_Ci1mzWO4",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-Q_5GK7LV5oo",
        "title": "Veteran's Ultimate Beginner Guide",
        "url": "https://www.youtube.com/watch?v=Q_5GK7LV5oo",
        "youtubeId": "Q_5GK7LV5oo",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-p4pOPc8gYQU",
        "title": "New Tech Tree Update",
        "url": "https://www.youtube.com/watch?v=p4pOPc8gYQU",
        "youtubeId": "p4pOPc8gYQU",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-J9CdDwFLDLc",
        "title": "Der schnellste Weg zur Werkbank",
        "url": "https://www.youtube.com/watch?v=J9CdDwFLDLc",
        "youtubeId": "J9CdDwFLDLc",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-ln5GcMwrB8I",
        "title": "Die beste Komponenten-Rangliste",
        "url": "https://www.youtube.com/watch?v=ln5GcMwrB8I",
        "youtubeId": "ln5GcMwrB8I",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-G4Q02pYk4IE",
        "title": "7 Easy Ways to Get Guns",
        "url": "https://www.youtube.com/watch?v=G4Q02pYk4IE",
        "youtubeId": "G4Q02pYk4IE",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-RXOYRxhHu3g",
        "title": "Strategies You NEED To Know",
        "url": "https://www.youtube.com/watch?v=RXOYRxhHu3g",
        "youtubeId": "RXOYRxhHu3g",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-e2u2nSuvlE0",
        "title": "Beginners Guide: What Are BPs",
        "url": "https://www.youtube.com/watch?v=e2u2nSuvlE0",
        "youtubeId": "e2u2nSuvlE0",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-oWd7t7Cy1fY",
        "title": "Ultimativer Industrieleitfaden",
        "url": "https://www.youtube.com/watch?v=oWd7t7Cy1fY",
        "youtubeId": "oWd7t7Cy1fY",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-j7-5gjLmeLE",
        "title": "Werkbänke kurz & präzise",
        "url": "https://www.youtube.com/watch?v=j7-5gjLmeLE",
        "youtubeId": "j7-5gjLmeLE",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-95uFFMv7ics",
        "title": "New Rust Workbench Upgrades",
        "url": "https://www.youtube.com/watch?v=95uFFMv7ics",
        "youtubeId": "95uFFMv7ics",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-Jftebxn0CBg",
        "title": "Wie man Werkbank-Upgrades nutzt",
        "url": "https://www.youtube.com/watch?v=Jftebxn0CBg",
        "youtubeId": "Jftebxn0CBg",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-yJAxMIBhYT8",
        "title": "New Workbenches / Tech Tree",
        "url": "https://www.youtube.com/watch?v=yJAxMIBhYT8",
        "youtubeId": "yJAxMIBhYT8",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-CceTzki5zx8",
        "title": "New Workbench System Tutorial",
        "url": "https://www.youtube.com/watch?v=CceTzki5zx8",
        "youtubeId": "CceTzki5zx8",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      },
      {
        "id": "workbench-tech-tree-blueprints-tPg65pIFpv0",
        "title": "Wo man Werkbank-Upgrades findet",
        "url": "https://www.youtube.com/watch?v=tPg65pIFpv0",
        "youtubeId": "tPg65pIFpv0",
        "categorySlug": "workbench-tech-tree-blueprints",
        "stageSlug": "start_here"
      }
    ]
  },
  {
    "slug": "solo-survival",
    "title": "Solo Survival",
    "count": 20,
    "stageSlug": "start_here",
    "description": "Guides and tutorials for Solo Survival",
    "videos": [
      {
        "id": "solo-survival-trjVKr5PEqo",
        "title": "So spielt man Rust SOLO",
        "url": "https://www.youtube.com/watch?v=trjVKr5PEqo",
        "youtubeId": "trjVKr5PEqo",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-N4QO8boc0Qg",
        "title": "How a Solo with 11,362 Hours",
        "url": "https://www.youtube.com/watch?v=N4QO8boc0Qg",
        "youtubeId": "N4QO8boc0Qg",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-ctLS9PBdt0A",
        "title": "How a solo with 14,782 Hours",
        "url": "https://www.youtube.com/watch?v=ctLS9PBdt0A",
        "youtubeId": "ctLS9PBdt0A",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-aI3uceNGhyo",
        "title": "The Solo Strategy Explained",
        "url": "https://www.youtube.com/watch?v=aI3uceNGhyo",
        "youtubeId": "aI3uceNGhyo",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-gPa_ZK8JBtw",
        "title": "Der ultimative RUST-Anfängerleitfaden",
        "url": "https://www.youtube.com/watch?v=gPa_ZK8JBtw",
        "youtubeId": "gPa_ZK8JBtw",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-Wc0ZJo06oAw",
        "title": "Der ultimative Rust-Anfängerguide",
        "url": "https://www.youtube.com/watch?v=Wc0ZJo06oAw",
        "youtubeId": "Wc0ZJo06oAw",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-X0nt5S21Aho",
        "title": "How a Solo with 14,274 hours",
        "url": "https://www.youtube.com/watch?v=X0nt5S21Aho",
        "youtubeId": "X0nt5S21Aho",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-zXl4ZrM8Yq4",
        "title": "How a solo builder with 12,487h",
        "url": "https://www.youtube.com/watch?v=zXl4ZrM8Yq4",
        "youtubeId": "zXl4ZrM8Yq4",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-kr0spV5-NRI",
        "title": "How to 100% Progress in Rust",
        "url": "https://www.youtube.com/watch?v=kr0spV5-NRI",
        "youtubeId": "kr0spV5-NRI",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-3gCjjwZ_hsw",
        "title": "How a Solo with 6,454 Hours",
        "url": "https://www.youtube.com/watch?v=3gCjjwZ_hsw",
        "youtubeId": "3gCjjwZ_hsw",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-ICKtd31l3jw",
        "title": "The Reality of New Progression",
        "url": "https://www.youtube.com/watch?v=ICKtd31l3jw",
        "youtubeId": "ICKtd31l3jw",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-NNzAFRFwCpc",
        "title": "Solo Rust will never be the same",
        "url": "https://www.youtube.com/watch?v=NNzAFRFwCpc",
        "youtubeId": "NNzAFRFwCpc",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-4czl4yXIYtA",
        "title": "Rust - The Solo Life V14",
        "url": "https://www.youtube.com/watch?v=4czl4yXIYtA",
        "youtubeId": "4czl4yXIYtA",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-Q_5GK7LV5oo",
        "title": "Veteran's Ultimate Beginner Guide",
        "url": "https://www.youtube.com/watch?v=Q_5GK7LV5oo",
        "youtubeId": "Q_5GK7LV5oo",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-GHbIwk7RnUM",
        "title": "How I took over the Jungle",
        "url": "https://www.youtube.com/watch?v=GHbIwk7RnUM",
        "youtubeId": "GHbIwk7RnUM",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-IkpkGy6VHzQ",
        "title": "How to Progress as a Solo",
        "url": "https://www.youtube.com/watch?v=IkpkGy6VHzQ",
        "youtubeId": "IkpkGy6VHzQ",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-D6KRx2Iq6AE",
        "title": "I created the New Solo strat",
        "url": "https://www.youtube.com/watch?v=D6KRx2Iq6AE",
        "youtubeId": "D6KRx2Iq6AE",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-v1nVdoKD-FM",
        "title": "Rust's Best Solo Teaches Us",
        "url": "https://www.youtube.com/watch?v=v1nVdoKD-FM",
        "youtubeId": "v1nVdoKD-FM",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-4V-HogxU_OY",
        "title": "I designed a new Solo Strategy",
        "url": "https://www.youtube.com/watch?v=4V-HogxU_OY",
        "youtubeId": "4V-HogxU_OY",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      },
      {
        "id": "solo-survival-xmfY_V5OA2Y",
        "title": "Ein vollständiger Leitfaden",
        "url": "https://www.youtube.com/watch?v=xmfY_V5OA2Y",
        "youtubeId": "xmfY_V5OA2Y",
        "categorySlug": "solo-survival",
        "stageSlug": "start_here"
      }
    ]
  },
  {
    "slug": "stoff-hanf-farm-cloth-farm",
    "title": "Stoff / Hanf-Farm (Cloth Farm)",
    "count": 20,
    "stageSlug": "economy_resources",
    "description": "Guides and tutorials for Stoff / Hanf-Farm (Cloth Farm)",
    "videos": [
      {
        "id": "stoff-hanf-farm-cloth-farm-p3OdpHJNIl4",
        "title": "Farming & Genetics Guide",
        "url": "https://www.youtube.com/watch?v=p3OdpHJNIl4",
        "youtubeId": "p3OdpHJNIl4",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-qPA-AZ0Gaew",
        "title": "How to Build a Basic Hemp Farm",
        "url": "https://www.youtube.com/watch?v=qPA-AZ0Gaew",
        "youtubeId": "qPA-AZ0Gaew",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-EeLINRhtBG0",
        "title": "Farming 3.0 – Ultimativer Leitfaden",
        "url": "https://www.youtube.com/watch?v=EeLINRhtBG0",
        "youtubeId": "EeLINRhtBG0",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-2UHWLiYxLCU",
        "title": "I built an ILLEGAL cloth cartel",
        "url": "https://www.youtube.com/watch?v=2UHWLiYxLCU",
        "youtubeId": "2UHWLiYxLCU",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-k6M6Zjozlwk",
        "title": "Genetics Guide | What They Are",
        "url": "https://www.youtube.com/watch?v=k6M6Zjozlwk",
        "youtubeId": "k6M6Zjozlwk",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-m9y6ACVQR-M",
        "title": "Crossbreed a God Clone (lazy)",
        "url": "https://www.youtube.com/watch?v=m9y6ACVQR-M",
        "youtubeId": "m9y6ACVQR-M",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-qmCaE0liZLM",
        "title": "I Spent a Week Building a Hemp Farm",
        "url": "https://www.youtube.com/watch?v=qmCaE0liZLM",
        "youtubeId": "qmCaE0liZLM",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-n5lmlO0wwKw",
        "title": "Cheapest Cloth Farm in Rust",
        "url": "https://www.youtube.com/watch?v=n5lmlO0wwKw",
        "youtubeId": "n5lmlO0wwKw",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-y5RqXTxiGkA",
        "title": "We Built the Greatest Cloth Farm",
        "url": "https://www.youtube.com/watch?v=y5RqXTxiGkA",
        "youtubeId": "y5RqXTxiGkA",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-4ElucWHyfbM",
        "title": "How to get perfect clones",
        "url": "https://www.youtube.com/watch?v=4ElucWHyfbM",
        "youtubeId": "4ElucWHyfbM",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-z1Xs8KNpGwk",
        "title": "How To Build Cloth Farm for Solos",
        "url": "https://www.youtube.com/watch?v=z1Xs8KNpGwk",
        "youtubeId": "z1Xs8KNpGwk",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-E3EWe2p6I44",
        "title": "Wie ein Profi-Farmer farmt",
        "url": "https://www.youtube.com/watch?v=E3EWe2p6I44",
        "youtubeId": "E3EWe2p6I44",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-eavfD_HCHu4",
        "title": "10 Farming-Tipps",
        "url": "https://www.youtube.com/watch?v=eavfD_HCHu4",
        "youtubeId": "eavfD_HCHu4",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-DDfjh_c2p7k",
        "title": "Cheap Ocean/Saltwater Farm",
        "url": "https://www.youtube.com/watch?v=DDfjh_c2p7k",
        "youtubeId": "DDfjh_c2p7k",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-cbgfyBssSwg",
        "title": "Hemp Farm Starter Base",
        "url": "https://www.youtube.com/watch?v=cbgfyBssSwg",
        "youtubeId": "cbgfyBssSwg",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-z5SKkOXL_ms",
        "title": "Der Arbeiter – Basis",
        "url": "https://www.youtube.com/watch?v=z5SKkOXL_ms",
        "youtubeId": "z5SKkOXL_ms",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-HZ1yazJcOkg",
        "title": "The Smallest Auto Farm Base",
        "url": "https://www.youtube.com/watch?v=HZ1yazJcOkg",
        "youtubeId": "HZ1yazJcOkg",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-nwWXbMeRB74",
        "title": "Compact 3x3 Farm Base",
        "url": "https://www.youtube.com/watch?v=nwWXbMeRB74",
        "youtubeId": "nwWXbMeRB74",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-0kjPpKWg0ug",
        "title": "How to Make a Hemp and Berry Farm",
        "url": "https://www.youtube.com/watch?v=0kjPpKWg0ug",
        "youtubeId": "0kjPpKWg0ug",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "stoff-hanf-farm-cloth-farm-JhMv_FuPKLU",
        "title": "Hemp Farming Documentary",
        "url": "https://www.youtube.com/watch?v=JhMv_FuPKLU",
        "youtubeId": "JhMv_FuPKLU",
        "categorySlug": "stoff-hanf-farm-cloth-farm",
        "stageSlug": "economy_resources"
      }
    ]
  },
  {
    "slug": "schwefel-farm-sulfur",
    "title": "Schwefel-Farm (Sulfur)",
    "count": 18,
    "stageSlug": "economy_resources",
    "description": "Guides and tutorials for Schwefel-Farm (Sulfur)",
    "videos": [
      {
        "id": "schwefel-farm-sulfur-ohG7OYsA81I",
        "title": "Ways to Get Boom Without Farming",
        "url": "https://www.youtube.com/watch?v=ohG7OYsA81I",
        "youtubeId": "ohG7OYsA81I",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-3bPe9CTfkFc",
        "title": "How To Get Sulfur Easily",
        "url": "https://www.youtube.com/watch?v=3bPe9CTfkFc",
        "youtubeId": "3bPe9CTfkFc",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-7s-RaVquK_I",
        "title": "Knotenpunkte-Leitfaden",
        "url": "https://www.youtube.com/watch?v=7s-RaVquK_I",
        "youtubeId": "7s-RaVquK_I",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-WpN9pzg-MKY",
        "title": "Kennen Spieler mit wenig Zeit...",
        "url": "https://www.youtube.com/watch?v=WpN9pzg-MKY",
        "youtubeId": "WpN9pzg-MKY",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-ZRmjCNSd1gg",
        "title": "i farmed one million sulfur",
        "url": "https://www.youtube.com/watch?v=ZRmjCNSd1gg",
        "youtubeId": "ZRmjCNSd1gg",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-JyJiTD9pWsM",
        "title": "Die effizienteste Methode",
        "url": "https://www.youtube.com/watch?v=JyJiTD9pWsM",
        "youtubeId": "JyJiTD9pWsM",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-1cBHdTG6Ah8",
        "title": "I Automated the Sulfur Quarry",
        "url": "https://www.youtube.com/watch?v=1cBHdTG6Ah8",
        "youtubeId": "1cBHdTG6Ah8",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-dhO6vxJuXRw",
        "title": "The Sulfur Guardians",
        "url": "https://www.youtube.com/watch?v=dhO6vxJuXRw",
        "youtubeId": "dhO6vxJuXRw",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-rPZyWaWK65Y",
        "title": "Farming 1,000,000 Sulfur",
        "url": "https://www.youtube.com/watch?v=rPZyWaWK65Y",
        "youtubeId": "rPZyWaWK65Y",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-kMgPjJmdCCs",
        "title": "Automatisierte Schwefelfarm",
        "url": "https://www.youtube.com/watch?v=kMgPjJmdCCs",
        "youtubeId": "kMgPjJmdCCs",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-y2jY34q2-T8",
        "title": "How a 55,000 Hour Godsquad Farms",
        "url": "https://www.youtube.com/watch?v=y2jY34q2-T8",
        "youtubeId": "y2jY34q2-T8",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-BddzzUCeJBQ",
        "title": "Sulfur Generator",
        "url": "https://www.youtube.com/watch?v=BddzzUCeJBQ",
        "youtubeId": "BddzzUCeJBQ",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-NhGizHFoI6o",
        "title": "I Struck Gold in this Rare Farm",
        "url": "https://www.youtube.com/watch?v=NhGizHFoI6o",
        "youtubeId": "NhGizHFoI6o",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-3BV66OxkYA4",
        "title": "The Sulfur Cartel",
        "url": "https://www.youtube.com/watch?v=3BV66OxkYA4",
        "youtubeId": "3BV66OxkYA4",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-ArJG93zi5X4",
        "title": "I Claimed a Swamp with Infinite",
        "url": "https://www.youtube.com/watch?v=ArJG93zi5X4",
        "youtubeId": "ArJG93zi5X4",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-Vh9YwOlQ598",
        "title": "How we got 1,000,000 Sulfur",
        "url": "https://www.youtube.com/watch?v=Vh9YwOlQ598",
        "youtubeId": "Vh9YwOlQ598",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-QzK35xBDzWQ",
        "title": "Schwefelsteinbruch",
        "url": "https://www.youtube.com/watch?v=QzK35xBDzWQ",
        "youtubeId": "QzK35xBDzWQ",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      },
      {
        "id": "schwefel-farm-sulfur-SRuJiWBiTRY",
        "title": "I Defended 250k Sulfur",
        "url": "https://www.youtube.com/watch?v=SRuJiWBiTRY",
        "youtubeId": "SRuJiWBiTRY",
        "categorySlug": "schwefel-farm-sulfur",
        "stageSlug": "economy_resources"
      }
    ]
  },
  {
    "slug": "metall-hqm-farm",
    "title": "Metall & HQM-Farm",
    "count": 19,
    "stageSlug": "economy_resources",
    "description": "Guides and tutorials for Metall & HQM-Farm",
    "videos": [
      {
        "id": "metall-hqm-farm-kAOjuWTlxeE",
        "title": "The Best Ways to Farm HQM",
        "url": "https://www.youtube.com/watch?v=kAOjuWTlxeE",
        "youtubeId": "kAOjuWTlxeE",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-Tkg4R1mlJVs",
        "title": "How to get HQM in Rust",
        "url": "https://www.youtube.com/watch?v=Tkg4R1mlJVs",
        "youtubeId": "Tkg4R1mlJVs",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-vPVyWbT4hh0",
        "title": "Kurzanleitung – 9000 Schrott",
        "url": "https://www.youtube.com/watch?v=vPVyWbT4hh0",
        "youtubeId": "vPVyWbT4hh0",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-7s-RaVquK_I",
        "title": "Knotenpunkte-Leitfaden",
        "url": "https://www.youtube.com/watch?v=7s-RaVquK_I",
        "youtubeId": "7s-RaVquK_I",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-aj9pMpehhEI",
        "title": "Best Ways to Farm Scrap",
        "url": "https://www.youtube.com/watch?v=aj9pMpehhEI",
        "youtubeId": "aj9pMpehhEI",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-xnqxNC2OQxM",
        "title": "Wie man hochwertiges Metall farmt",
        "url": "https://www.youtube.com/watch?v=xnqxNC2OQxM",
        "youtubeId": "xnqxNC2OQxM",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-3I3ZVUEYmBg",
        "title": "Zahlen Sie mit diesem Trick",
        "url": "https://www.youtube.com/watch?v=3I3ZVUEYmBg",
        "youtubeId": "3I3ZVUEYmBg",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-rT1-1mw2Pro",
        "title": "How To Get Scrap Fast",
        "url": "https://www.youtube.com/watch?v=rT1-1mw2Pro",
        "youtubeId": "rT1-1mw2Pro",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-z_sjmDbu4Nc",
        "title": "How To Get Metal Fragments",
        "url": "https://www.youtube.com/watch?v=z_sjmDbu4Nc",
        "youtubeId": "z_sjmDbu4Nc",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-5wBZw5Bp1yw",
        "title": "How to get High Quality Metal",
        "url": "https://www.youtube.com/watch?v=5wBZw5Bp1yw",
        "youtubeId": "5wBZw5Bp1yw",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-kdMJv5YgQdE",
        "title": "Console: The Safest Way",
        "url": "https://www.youtube.com/watch?v=kdMJv5YgQdE",
        "youtubeId": "kdMJv5YgQdE",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-oQ0nC_8-rkc",
        "title": "How to use the Junkyard Crane",
        "url": "https://www.youtube.com/watch?v=oQ0nC_8-rkc",
        "youtubeId": "oQ0nC_8-rkc",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-JPKQUJ57-JU",
        "title": "So verwenden Sie den HQM-Steinbruch",
        "url": "https://www.youtube.com/watch?v=JPKQUJ57-JU",
        "youtubeId": "JPKQUJ57-JU",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-AYymth531fk",
        "title": "How to use The Giant Excavator",
        "url": "https://www.youtube.com/watch?v=AYymth531fk",
        "youtubeId": "AYymth531fk",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-s70aHJjPINM",
        "title": "Maximiere deine Abbaurate",
        "url": "https://www.youtube.com/watch?v=s70aHJjPINM",
        "youtubeId": "s70aHJjPINM",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-FguUzQkjfRY",
        "title": "How to Harvest Metal Ore",
        "url": "https://www.youtube.com/watch?v=FguUzQkjfRY",
        "youtubeId": "FguUzQkjfRY",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-C_aZ_lrJVUs",
        "title": "Rust für Dummies – schnelles Metall",
        "url": "https://www.youtube.com/watch?v=C_aZ_lrJVUs",
        "youtubeId": "C_aZ_lrJVUs",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-Akf9BtC1WWg",
        "title": "How to Get High Quality Metal",
        "url": "https://www.youtube.com/watch?v=Akf9BtC1WWg",
        "youtubeId": "Akf9BtC1WWg",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "metall-hqm-farm-Y3wM_Ag9WGQ",
        "title": "Stein-, Metall-, Schwefelnutzung",
        "url": "https://www.youtube.com/watch?v=Y3wM_Ag9WGQ",
        "youtubeId": "Y3wM_Ag9WGQ",
        "categorySlug": "metall-hqm-farm",
        "stageSlug": "economy_resources"
      }
    ]
  },
  {
    "slug": "holz-stein-farm",
    "title": "Holz & Stein-Farm",
    "count": 10,
    "stageSlug": "economy_resources",
    "description": "Guides and tutorials for Holz & Stein-Farm",
    "videos": [
      {
        "id": "holz-stein-farm-_NWZIbrOhq4",
        "title": "How to Collect Wood – Quick",
        "url": "https://www.youtube.com/watch?v=_NWZIbrOhq4",
        "youtubeId": "_NWZIbrOhq4",
        "categorySlug": "holz-stein-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "holz-stein-farm-7s-RaVquK_I",
        "title": "Knotenpunkte-Leitfaden",
        "url": "https://www.youtube.com/watch?v=7s-RaVquK_I",
        "youtubeId": "7s-RaVquK_I",
        "categorySlug": "holz-stein-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "holz-stein-farm-q6ZYkzKRt8g",
        "title": "Fastest way to farm stone",
        "url": "https://www.youtube.com/watch?v=q6ZYkzKRt8g",
        "youtubeId": "q6ZYkzKRt8g",
        "categorySlug": "holz-stein-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "holz-stein-farm-6IveGZBXVaU",
        "title": "Beginner Guide: How to Farm",
        "url": "https://www.youtube.com/watch?v=6IveGZBXVaU",
        "youtubeId": "6IveGZBXVaU",
        "categorySlug": "holz-stein-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "holz-stein-farm-jFqBAIlyTq0",
        "title": "Guide to Basic Resources",
        "url": "https://www.youtube.com/watch?v=jFqBAIlyTq0",
        "youtubeId": "jFqBAIlyTq0",
        "categorySlug": "holz-stein-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "holz-stein-farm-aj9pMpehhEI",
        "title": "Best Ways to Farm Scrap",
        "url": "https://www.youtube.com/watch?v=aj9pMpehhEI",
        "youtubeId": "aj9pMpehhEI",
        "categorySlug": "holz-stein-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "holz-stein-farm-xNSZ4vS8BM4",
        "title": "Console Beginners Guide",
        "url": "https://www.youtube.com/watch?v=xNSZ4vS8BM4",
        "youtubeId": "xNSZ4vS8BM4",
        "categorySlug": "holz-stein-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "holz-stein-farm-rT1-1mw2Pro",
        "title": "How To Get Scrap Fast",
        "url": "https://www.youtube.com/watch?v=rT1-1mw2Pro",
        "youtubeId": "rT1-1mw2Pro",
        "categorySlug": "holz-stein-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "holz-stein-farm-RB2qil0OelM",
        "title": "So erhalten Sie Stein in Rust",
        "url": "https://www.youtube.com/watch?v=RB2qil0OelM",
        "youtubeId": "RB2qil0OelM",
        "categorySlug": "holz-stein-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "holz-stein-farm-jKJO7rAa2vU",
        "title": "Wie man schnell Stein farmt",
        "url": "https://www.youtube.com/watch?v=jKJO7rAa2vU",
        "youtubeId": "jKJO7rAa2vU",
        "categorySlug": "holz-stein-farm",
        "stageSlug": "economy_resources"
      }
    ]
  },
  {
    "slug": "scrap-farm",
    "title": "Scrap-Farm",
    "count": 18,
    "stageSlug": "economy_resources",
    "description": "Guides and tutorials for Scrap-Farm",
    "videos": [
      {
        "id": "scrap-farm-vPVyWbT4hh0",
        "title": "Kurzanleitung – 9000 Schrott",
        "url": "https://www.youtube.com/watch?v=vPVyWbT4hh0",
        "youtubeId": "vPVyWbT4hh0",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-aj9pMpehhEI",
        "title": "Best Ways to Farm Scrap",
        "url": "https://www.youtube.com/watch?v=aj9pMpehhEI",
        "youtubeId": "aj9pMpehhEI",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-rT1-1mw2Pro",
        "title": "How To Get Scrap Fast",
        "url": "https://www.youtube.com/watch?v=rT1-1mw2Pro",
        "youtubeId": "rT1-1mw2Pro",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-xX8rUXQobxA",
        "title": "Bei weitem das BESTE sichere",
        "url": "https://www.youtube.com/watch?v=xX8rUXQobxA",
        "youtubeId": "xX8rUXQobxA",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-lUJc0Vmo_QE",
        "title": "5 unbedingt erforderliche Routen",
        "url": "https://www.youtube.com/watch?v=lUJc0Vmo_QE",
        "youtubeId": "lUJc0Vmo_QE",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-fVfwDfaIp60",
        "title": "How To Get 20,000 Scrap an Hour",
        "url": "https://www.youtube.com/watch?v=fVfwDfaIp60",
        "youtubeId": "fVfwDfaIp60",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-Ma4MmFpd8xU",
        "title": "Schrott-Generierungsbasis",
        "url": "https://www.youtube.com/watch?v=Ma4MmFpd8xU",
        "youtubeId": "Ma4MmFpd8xU",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-9aIGe1Y7KTA",
        "title": "The Minnow Fish Trap Farm",
        "url": "https://www.youtube.com/watch?v=9aIGe1Y7KTA",
        "youtubeId": "9aIGe1Y7KTA",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-PtkQykRNqnc",
        "title": "I Built an unlimited scrap farm",
        "url": "https://www.youtube.com/watch?v=PtkQykRNqnc",
        "youtubeId": "PtkQykRNqnc",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm--i8nlSXvUuQ",
        "title": "Get 2000+ Scrap",
        "url": "https://www.youtube.com/watch?v=-i8nlSXvUuQ",
        "youtubeId": "-i8nlSXvUuQ",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-yqid8U77pnc",
        "title": "The New Fast way to farm Scrap",
        "url": "https://www.youtube.com/watch?v=yqid8U77pnc",
        "youtubeId": "yqid8U77pnc",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-JqU5xvUto3s",
        "title": "Wie komme ich im frühen Spiel",
        "url": "https://www.youtube.com/watch?v=JqU5xvUto3s",
        "youtubeId": "JqU5xvUto3s",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-NjFT0Qa3L20",
        "title": "Werde reich mit deiner Basis",
        "url": "https://www.youtube.com/watch?v=NjFT0Qa3L20",
        "youtubeId": "NjFT0Qa3L20",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-aw_e4Xa9FY8",
        "title": "Ultimative Fischfallen-Farm",
        "url": "https://www.youtube.com/watch?v=aw_e4Xa9FY8",
        "youtubeId": "aw_e4Xa9FY8",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-LXd0ePDTwFg",
        "title": "Infinite AFK Scrap Farm",
        "url": "https://www.youtube.com/watch?v=LXd0ePDTwFg",
        "youtubeId": "LXd0ePDTwFg",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-vimhQkVILf4",
        "title": "Low Risk & Easy Scrap Farming",
        "url": "https://www.youtube.com/watch?v=vimhQkVILf4",
        "youtubeId": "vimhQkVILf4",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-WFicKjb6pjU",
        "title": "How To Get Scrap",
        "url": "https://www.youtube.com/watch?v=WFicKjb6pjU",
        "youtubeId": "WFicKjb6pjU",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      },
      {
        "id": "scrap-farm-z5SKkOXL_ms",
        "title": "Der Arbeiter – Basis",
        "url": "https://www.youtube.com/watch?v=z5SKkOXL_ms",
        "youtubeId": "z5SKkOXL_ms",
        "categorySlug": "scrap-farm",
        "stageSlug": "economy_resources"
      }
    ]
  },
  {
    "slug": "low-grade-fuel-crude-oil",
    "title": "Low Grade Fuel / Crude Oil",
    "count": 19,
    "stageSlug": "economy_resources",
    "description": "Guides and tutorials for Low Grade Fuel / Crude Oil",
    "videos": [
      {
        "id": "low-grade-fuel-crude-oil-iiiKs-d2lW0",
        "title": "Minderwertigen Kraftstoff herstellen",
        "url": "https://www.youtube.com/watch?v=iiiKs-d2lW0",
        "youtubeId": "iiiKs-d2lW0",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-m_cxomH2wZU",
        "title": "Ultimate Low Grade Fuel Guide",
        "url": "https://www.youtube.com/watch?v=m_cxomH2wZU",
        "youtubeId": "m_cxomH2wZU",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-bqqST9L_edQ",
        "title": "Das Thunfischdosen-Basisdesign",
        "url": "https://www.youtube.com/watch?v=bqqST9L_edQ",
        "youtubeId": "bqqST9L_edQ",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-AMNbbbBlO38",
        "title": "Quick guide (Beginners)",
        "url": "https://www.youtube.com/watch?v=AMNbbbBlO38",
        "youtubeId": "AMNbbbBlO38",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-m9nvE7HoV58",
        "title": "How To Get Low Grade Fuel",
        "url": "https://www.youtube.com/watch?v=m9nvE7HoV58",
        "youtubeId": "m9nvE7HoV58",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-0devbJL3AQg",
        "title": "How to Farm Low Grade for TONS",
        "url": "https://www.youtube.com/watch?v=0devbJL3AQg",
        "youtubeId": "0devbJL3AQg",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-hMjVbTcQapM",
        "title": "Beginners Quick Start Guide",
        "url": "https://www.youtube.com/watch?v=hMjVbTcQapM",
        "youtubeId": "hMjVbTcQapM",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-8S1YR_fy3YM",
        "title": "How to Easily Get Low Grade",
        "url": "https://www.youtube.com/watch?v=8S1YR_fy3YM",
        "youtubeId": "8S1YR_fy3YM",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-eX6wS28cXvc",
        "title": "Infinite Low Grade",
        "url": "https://www.youtube.com/watch?v=eX6wS28cXvc",
        "youtubeId": "eX6wS28cXvc",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-6UOmr-U2CrE",
        "title": "Raffinerien richtig nutzen",
        "url": "https://www.youtube.com/watch?v=6UOmr-U2CrE",
        "youtubeId": "6UOmr-U2CrE",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-d6KBZlNCFD8",
        "title": "So erhalten Sie minderwertigen",
        "url": "https://www.youtube.com/watch?v=d6KBZlNCFD8",
        "youtubeId": "d6KBZlNCFD8",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-rdXoqMXPTiQ",
        "title": "Diesel Fuel Guide",
        "url": "https://www.youtube.com/watch?v=rdXoqMXPTiQ",
        "youtubeId": "rdXoqMXPTiQ",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-LP2QJNSpmqQ",
        "title": "How to automate Low Grade Fuel",
        "url": "https://www.youtube.com/watch?v=LP2QJNSpmqQ",
        "youtubeId": "LP2QJNSpmqQ",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-LSJ7lqTrfu8",
        "title": "How to get Low Grade Fuel",
        "url": "https://www.youtube.com/watch?v=LSJ7lqTrfu8",
        "youtubeId": "LSJ7lqTrfu8",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-zPUIX5ys6GM",
        "title": "Best Low Grade Fuel Farm",
        "url": "https://www.youtube.com/watch?v=zPUIX5ys6GM",
        "youtubeId": "zPUIX5ys6GM",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-vZM_Iub68mQ",
        "title": "Farming Tons of Low Grade",
        "url": "https://www.youtube.com/watch?v=vZM_Iub68mQ",
        "youtubeId": "vZM_Iub68mQ",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-Aodat5CcXRU",
        "title": "How to Get Low Grade Fuel",
        "url": "https://www.youtube.com/watch?v=Aodat5CcXRU",
        "youtubeId": "Aodat5CcXRU",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-Ao-lWrH2QtI",
        "title": "Anfänger Guide (Lowgrade)",
        "url": "https://www.youtube.com/watch?v=Ao-lWrH2QtI",
        "youtubeId": "Ao-lWrH2QtI",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      },
      {
        "id": "low-grade-fuel-crude-oil-ibUeQOCUyW8",
        "title": "Rust für Anfänger – Kurzanleitung",
        "url": "https://www.youtube.com/watch?v=ibUeQOCUyW8",
        "youtubeId": "ibUeQOCUyW8",
        "categorySlug": "low-grade-fuel-crude-oil",
        "stageSlug": "economy_resources"
      }
    ]
  },
  {
    "slug": "components-komponenten-farmen",
    "title": "Components / Komponenten farmen",
    "count": 18,
    "stageSlug": "economy_resources",
    "description": "Guides and tutorials for Components / Komponenten farmen",
    "videos": [
      {
        "id": "components-komponenten-farmen-p3OdpHJNIl4",
        "title": "Farming & Genetics Guide",
        "url": "https://www.youtube.com/watch?v=p3OdpHJNIl4",
        "youtubeId": "p3OdpHJNIl4",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-ln5GcMwrB8I",
        "title": "Beste Komponenten-Rangliste",
        "url": "https://www.youtube.com/watch?v=ln5GcMwrB8I",
        "youtubeId": "ln5GcMwrB8I",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-EeLINRhtBG0",
        "title": "Farming 3.0 – Ultimativer Leitfaden",
        "url": "https://www.youtube.com/watch?v=EeLINRhtBG0",
        "youtubeId": "EeLINRhtBG0",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-aj9pMpehhEI",
        "title": "Best Ways to Farm Scrap",
        "url": "https://www.youtube.com/watch?v=aj9pMpehhEI",
        "youtubeId": "aj9pMpehhEI",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-vPVyWbT4hh0",
        "title": "Kurzanleitung – 9000 Schrott",
        "url": "https://www.youtube.com/watch?v=vPVyWbT4hh0",
        "youtubeId": "vPVyWbT4hh0",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-eavfD_HCHu4",
        "title": "10 Farming-Tipps",
        "url": "https://www.youtube.com/watch?v=eavfD_HCHu4",
        "youtubeId": "eavfD_HCHu4",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-dM6QvlF7aAI",
        "title": "Full Underground Tunnel Guide",
        "url": "https://www.youtube.com/watch?v=dM6QvlF7aAI",
        "youtubeId": "dM6QvlF7aAI",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-aO1Br2ysi5U",
        "title": "Ultimate Loot Guide",
        "url": "https://www.youtube.com/watch?v=aO1Br2ysi5U",
        "youtubeId": "aO1Br2ysi5U",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-rT1-1mw2Pro",
        "title": "How To Get Scrap Fast",
        "url": "https://www.youtube.com/watch?v=rT1-1mw2Pro",
        "youtubeId": "rT1-1mw2Pro",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-9qgmClfvlRY",
        "title": "Neuer Blueprint-Fragment-Guide",
        "url": "https://www.youtube.com/watch?v=9qgmClfvlRY",
        "youtubeId": "9qgmClfvlRY",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-7s-RaVquK_I",
        "title": "Knotenpunkte-Leitfaden",
        "url": "https://www.youtube.com/watch?v=7s-RaVquK_I",
        "youtubeId": "7s-RaVquK_I",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-fvRAZ0rF3Q8",
        "title": "What Every Electrical Component",
        "url": "https://www.youtube.com/watch?v=fvRAZ0rF3Q8",
        "youtubeId": "fvRAZ0rF3Q8",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-1EhnL6P15VM",
        "title": "Komponenten – was behalten",
        "url": "https://www.youtube.com/watch?v=1EhnL6P15VM",
        "youtubeId": "1EhnL6P15VM",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-kAOjuWTlxeE",
        "title": "Best Ways to Farm HQM",
        "url": "https://www.youtube.com/watch?v=kAOjuWTlxeE",
        "youtubeId": "kAOjuWTlxeE",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-oWd7t7Cy1fY",
        "title": "Ultimativer Industrieleitfaden",
        "url": "https://www.youtube.com/watch?v=oWd7t7Cy1fY",
        "youtubeId": "oWd7t7Cy1fY",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-Q_5GK7LV5oo",
        "title": "Veteran's Ultimate Beginner Guide",
        "url": "https://www.youtube.com/watch?v=Q_5GK7LV5oo",
        "youtubeId": "Q_5GK7LV5oo",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-TxPct-Dz4-I",
        "title": "So fertigen Sie Komponenten",
        "url": "https://www.youtube.com/watch?v=TxPct-Dz4-I",
        "youtubeId": "TxPct-Dz4-I",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "components-komponenten-farmen-eihAv_MueUQ",
        "title": "Der beste Fahrzeugbau",
        "url": "https://www.youtube.com/watch?v=eihAv_MueUQ",
        "youtubeId": "eihAv_MueUQ",
        "categorySlug": "components-komponenten-farmen",
        "stageSlug": "economy_resources"
      }
    ]
  },
  {
    "slug": "recycler-recycling",
    "title": "Recycler & Recycling",
    "count": 19,
    "stageSlug": "economy_resources",
    "description": "Guides and tutorials for Recycler & Recycling",
    "videos": [
      {
        "id": "recycler-recycling-ln5GcMwrB8I",
        "title": "Beste Komponenten-Rangliste",
        "url": "https://www.youtube.com/watch?v=ln5GcMwrB8I",
        "youtubeId": "ln5GcMwrB8I",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-1EhnL6P15VM",
        "title": "Komponenten – was behalten",
        "url": "https://www.youtube.com/watch?v=1EhnL6P15VM",
        "youtubeId": "1EhnL6P15VM",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-Qyd_WT7Mo4Q",
        "title": "How A Solo Exploits The New Recycler",
        "url": "https://www.youtube.com/watch?v=Qyd_WT7Mo4Q",
        "youtubeId": "Qyd_WT7Mo4Q",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-DBbPc1B7CYI",
        "title": "Ultimate Rust Recycler Guide",
        "url": "https://www.youtube.com/watch?v=DBbPc1B7CYI",
        "youtubeId": "DBbPc1B7CYI",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-qlUx9QwEBs0",
        "title": "How to use a Recycler",
        "url": "https://www.youtube.com/watch?v=qlUx9QwEBs0",
        "youtubeId": "qlUx9QwEBs0",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-vPVyWbT4hh0",
        "title": "Kurzanleitung – 9000 Schrott",
        "url": "https://www.youtube.com/watch?v=vPVyWbT4hh0",
        "youtubeId": "vPVyWbT4hh0",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-SLEMbOhmcFc",
        "title": "New Component Tutorial",
        "url": "https://www.youtube.com/watch?v=SLEMbOhmcFc",
        "youtubeId": "SLEMbOhmcFc",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-sIZTIaB2XVc",
        "title": "How to use Industrial Recycler",
        "url": "https://www.youtube.com/watch?v=sIZTIaB2XVc",
        "youtubeId": "sIZTIaB2XVc",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-qJvTHUystVY",
        "title": "Schrott-Recycler in Rust",
        "url": "https://www.youtube.com/watch?v=qJvTHUystVY",
        "youtubeId": "qJvTHUystVY",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-nEsp0ocdiQE",
        "title": "Wo befindet sich das Recycling",
        "url": "https://www.youtube.com/watch?v=nEsp0ocdiQE",
        "youtubeId": "nEsp0ocdiQE",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-aj9pMpehhEI",
        "title": "Best Ways to Farm Scrap",
        "url": "https://www.youtube.com/watch?v=aj9pMpehhEI",
        "youtubeId": "aj9pMpehhEI",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-9YWW6YOWhR8",
        "title": "All Recycler Locations",
        "url": "https://www.youtube.com/watch?v=9YWW6YOWhR8",
        "youtubeId": "9YWW6YOWhR8",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-tvEw3aWjvFk",
        "title": "Recycle Manager Update",
        "url": "https://www.youtube.com/watch?v=tvEw3aWjvFk",
        "youtubeId": "tvEw3aWjvFk",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-rfW1XgBsgxg",
        "title": "Ultimate Recycler Guide 2026",
        "url": "https://www.youtube.com/watch?v=rfW1XgBsgxg",
        "youtubeId": "rfW1XgBsgxg",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-X_h-kN6tkHU",
        "title": "Alles, was Sie wissen müssen",
        "url": "https://www.youtube.com/watch?v=X_h-kN6tkHU",
        "youtubeId": "X_h-kN6tkHU",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-wdex1Y4RFSU",
        "title": "What Is The Recycler",
        "url": "https://www.youtube.com/watch?v=wdex1Y4RFSU",
        "youtubeId": "wdex1Y4RFSU",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-K35d_ZxB_oM",
        "title": "Recycler + Minicopter",
        "url": "https://www.youtube.com/watch?v=K35d_ZxB_oM",
        "youtubeId": "K35d_ZxB_oM",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-FyK6EDuT_MQ",
        "title": "Where to Find the Recycler",
        "url": "https://www.youtube.com/watch?v=FyK6EDuT_MQ",
        "youtubeId": "FyK6EDuT_MQ",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      },
      {
        "id": "recycler-recycling-XoMWpKtVJ9Y",
        "title": "Kurzanleitung Standort",
        "url": "https://www.youtube.com/watch?v=XoMWpKtVJ9Y",
        "youtubeId": "XoMWpKtVJ9Y",
        "categorySlug": "recycler-recycling",
        "stageSlug": "economy_resources"
      }
    ]
  },
  {
    "slug": "anpflanzen-planter-genetik-kreuzung",
    "title": "Anpflanzen, Planter & Genetik/Kreuzung",
    "count": 15,
    "stageSlug": "start_here",
    "description": "Guides and tutorials for Anpflanzen, Planter & Genetik/Kreuzung",
    "videos": [
      {
        "id": "anpflanzen-planter-genetik-kreuzung-p3OdpHJNIl4",
        "title": "Farming & Genetics Guide",
        "url": "https://www.youtube.com/watch?v=p3OdpHJNIl4",
        "youtubeId": "p3OdpHJNIl4",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-EeLINRhtBG0",
        "title": "Farming 3.0 – Ultimativer Leitfaden",
        "url": "https://www.youtube.com/watch?v=EeLINRhtBG0",
        "youtubeId": "EeLINRhtBG0",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-Z_rW0QkCags",
        "title": "Lernen Sie Kreuzung in Rust",
        "url": "https://www.youtube.com/watch?v=Z_rW0QkCags",
        "youtubeId": "Z_rW0QkCags",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-k6M6Zjozlwk",
        "title": "Genetics Guide | What They Are",
        "url": "https://www.youtube.com/watch?v=k6M6Zjozlwk",
        "youtubeId": "k6M6Zjozlwk",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-m9y6ACVQR-M",
        "title": "Crossbreed a God Clone (lazy)",
        "url": "https://www.youtube.com/watch?v=m9y6ACVQR-M",
        "youtubeId": "m9y6ACVQR-M",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-INvqPFsvD0E",
        "title": "Farming Complete Guide",
        "url": "https://www.youtube.com/watch?v=INvqPFsvD0E",
        "youtubeId": "INvqPFsvD0E",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-pKG1z1p1fFA",
        "title": "How To Crossbreed | Guide",
        "url": "https://www.youtube.com/watch?v=pKG1z1p1fFA",
        "youtubeId": "pKG1z1p1fFA",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-eavfD_HCHu4",
        "title": "10 Farming-Tipps",
        "url": "https://www.youtube.com/watch?v=eavfD_HCHu4",
        "youtubeId": "eavfD_HCHu4",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-4ElucWHyfbM",
        "title": "How to get perfect clones",
        "url": "https://www.youtube.com/watch?v=4ElucWHyfbM",
        "youtubeId": "4ElucWHyfbM",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-5FbuVbnwu94",
        "title": "Plant Breeding in Rust",
        "url": "https://www.youtube.com/watch?v=5FbuVbnwu94",
        "youtubeId": "5FbuVbnwu94",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-dKIAejPCi7Y",
        "title": "Rust Crossbreeding (Kreuzung)",
        "url": "https://www.youtube.com/watch?v=dKIAejPCi7Y",
        "youtubeId": "dKIAejPCi7Y",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-mgTUFN7XjY8",
        "title": "Fortgeschrittener Leitfaden",
        "url": "https://www.youtube.com/watch?v=mgTUFN7XjY8",
        "youtubeId": "mgTUFN7XjY8",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-E3EWe2p6I44",
        "title": "Wie ein Profi-Farmer farmt",
        "url": "https://www.youtube.com/watch?v=E3EWe2p6I44",
        "youtubeId": "E3EWe2p6I44",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-BT31_nCkGbY",
        "title": "This Update Changed Farming",
        "url": "https://www.youtube.com/watch?v=BT31_nCkGbY",
        "youtubeId": "BT31_nCkGbY",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      },
      {
        "id": "anpflanzen-planter-genetik-kreuzung-O5bmJK5wphk",
        "title": "Farming-Guide: So erreichst du",
        "url": "https://www.youtube.com/watch?v=O5bmJK5wphk",
        "youtubeId": "O5bmJK5wphk",
        "categorySlug": "anpflanzen-planter-genetik-kreuzung",
        "stageSlug": "start_here"
      }
    ]
  },
  {
    "slug": "tee-mixing-table",
    "title": "Tee & Mixing Table",
    "count": 15,
    "stageSlug": "start_here",
    "description": "Guides and tutorials for Tee & Mixing Table",
    "videos": [
      {
        "id": "tee-mixing-table-ZF3qACRDSw8",
        "title": "Mischtabelle, Tee- und Beeren-Guide",
        "url": "https://www.youtube.com/watch?v=ZF3qACRDSw8",
        "youtubeId": "ZF3qACRDSw8",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-VeE076brslE",
        "title": "The Ultimate Rust Tea Guide",
        "url": "https://www.youtube.com/watch?v=VeE076brslE",
        "youtubeId": "VeE076brslE",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-mgTUFN7XjY8",
        "title": "Fortgeschrittener Leitfaden",
        "url": "https://www.youtube.com/watch?v=mgTUFN7XjY8",
        "youtubeId": "mgTUFN7XjY8",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-5byLsUwm6kI",
        "title": "Intro to Tea Farming",
        "url": "https://www.youtube.com/watch?v=5byLsUwm6kI",
        "youtubeId": "5byLsUwm6kI",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-Adpfg9Q4bwQ",
        "title": "How to Craft a Mixing Table",
        "url": "https://www.youtube.com/watch?v=Adpfg9Q4bwQ",
        "youtubeId": "Adpfg9Q4bwQ",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-quk7pgh8-WE",
        "title": "Farming Update! How to Farm",
        "url": "https://www.youtube.com/watch?v=quk7pgh8-WE",
        "youtubeId": "quk7pgh8-WE",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-VCQNoaKTVtc",
        "title": "How To Get Crafting Quality",
        "url": "https://www.youtube.com/watch?v=VCQNoaKTVtc",
        "youtubeId": "VCQNoaKTVtc",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-lFsvaKfRwAY",
        "title": "Basic Teas Are Underrated",
        "url": "https://www.youtube.com/watch?v=lFsvaKfRwAY",
        "youtubeId": "lFsvaKfRwAY",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-uRtzUj2uzcs",
        "title": "The Easiest Way for Solos",
        "url": "https://www.youtube.com/watch?v=uRtzUj2uzcs",
        "youtubeId": "uRtzUj2uzcs",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-ewj1d-hy0ao",
        "title": "Ultimativer Kuchen-Koch-Leitfaden",
        "url": "https://www.youtube.com/watch?v=ewj1d-hy0ao",
        "youtubeId": "ewj1d-hy0ao",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-3J1dJK-4cGU",
        "title": "Tea Guide | Mixing Table",
        "url": "https://www.youtube.com/watch?v=3J1dJK-4cGU",
        "youtubeId": "3J1dJK-4cGU",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-TYRj59e8boI",
        "title": "Tea Time (A Rust Tea Guide)",
        "url": "https://www.youtube.com/watch?v=TYRj59e8boI",
        "youtubeId": "TYRj59e8boI",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-fN7RsoDnUz0",
        "title": "Beginner's Guide – Everything",
        "url": "https://www.youtube.com/watch?v=fN7RsoDnUz0",
        "youtubeId": "fN7RsoDnUz0",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-yZENuY5oi5A",
        "title": "How to Make Cooling Tea",
        "url": "https://www.youtube.com/watch?v=yZENuY5oi5A",
        "youtubeId": "yZENuY5oi5A",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      },
      {
        "id": "tee-mixing-table-O5bmJK5wphk",
        "title": "Farming-Guide: So erreichst du",
        "url": "https://www.youtube.com/watch?v=O5bmJK5wphk",
        "youtubeId": "O5bmJK5wphk",
        "categorySlug": "tee-mixing-table",
        "stageSlug": "start_here"
      }
    ]
  },
  {
    "slug": "jagd-tiere-hunting",
    "title": "Jagd / Tiere (Hunting)",
    "count": 11,
    "stageSlug": "food_farming_animals",
    "description": "Guides and tutorials for Jagd / Tiere (Hunting)",
    "videos": [
      {
        "id": "jagd-tiere-hunting-JPDGwVgCgUU",
        "title": "Neuer Dschungelbiom-Leitfaden",
        "url": "https://www.youtube.com/watch?v=JPDGwVgCgUU",
        "youtubeId": "JPDGwVgCgUU",
        "categorySlug": "jagd-tiere-hunting",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "jagd-tiere-hunting-4eoaJ_HZ5S4",
        "title": "For Beginners: Cloth, Bone",
        "url": "https://www.youtube.com/watch?v=4eoaJ_HZ5S4",
        "youtubeId": "4eoaJ_HZ5S4",
        "categorySlug": "jagd-tiere-hunting",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "jagd-tiere-hunting-O4K65T4nPD4",
        "title": "All Rust Animals Explained",
        "url": "https://www.youtube.com/watch?v=O4K65T4nPD4",
        "youtubeId": "O4K65T4nPD4",
        "categorySlug": "jagd-tiere-hunting",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "jagd-tiere-hunting-_1GVrcPaJD8",
        "title": "How to Fight New Jungle Animals",
        "url": "https://www.youtube.com/watch?v=_1GVrcPaJD8",
        "youtubeId": "_1GVrcPaJD8",
        "categorySlug": "jagd-tiere-hunting",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "jagd-tiere-hunting-vPVyWbT4hh0",
        "title": "Kurzanleitung – 9000 Schrott",
        "url": "https://www.youtube.com/watch?v=vPVyWbT4hh0",
        "youtubeId": "vPVyWbT4hh0",
        "categorySlug": "jagd-tiere-hunting",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "jagd-tiere-hunting-5gg_1EFf46I",
        "title": "The Hidden Animal Path System",
        "url": "https://www.youtube.com/watch?v=5gg_1EFf46I",
        "youtubeId": "5gg_1EFf46I",
        "categorySlug": "jagd-tiere-hunting",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "jagd-tiere-hunting-OSYIsXYL_uM",
        "title": "A Guide For Hunting",
        "url": "https://www.youtube.com/watch?v=OSYIsXYL_uM",
        "youtubeId": "OSYIsXYL_uM",
        "categorySlug": "jagd-tiere-hunting",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "jagd-tiere-hunting-v9puwQkL0Ac",
        "title": "Rust: Hunting season",
        "url": "https://www.youtube.com/watch?v=v9puwQkL0Ac",
        "youtubeId": "v9puwQkL0Ac",
        "categorySlug": "jagd-tiere-hunting",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "jagd-tiere-hunting-W8Gent8n6hw",
        "title": "How to hunt an animal in Rust",
        "url": "https://www.youtube.com/watch?v=W8Gent8n6hw",
        "youtubeId": "W8Gent8n6hw",
        "categorySlug": "jagd-tiere-hunting",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "jagd-tiere-hunting-hHMuZAkXDhg",
        "title": "Guide to Hunting Animals S5",
        "url": "https://www.youtube.com/watch?v=hHMuZAkXDhg",
        "youtubeId": "hHMuZAkXDhg",
        "categorySlug": "jagd-tiere-hunting",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "jagd-tiere-hunting-mG53lX7O1WQ",
        "title": "Hunting vs Compound",
        "url": "https://www.youtube.com/watch?v=mG53lX7O1WQ",
        "youtubeId": "mG53lX7O1WQ",
        "categorySlug": "jagd-tiere-hunting",
        "stageSlug": "food_farming_animals"
      }
    ]
  },
  {
    "slug": "pferde-horses-z-hmen-reiten-pflegen",
    "title": "Pferde (Horses) – zähmen, reiten, pflegen",
    "count": 18,
    "stageSlug": "food_farming_animals",
    "description": "Guides and tutorials for Pferde (Horses) – zähmen, reiten, pflegen",
    "videos": [
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-KC0mXozXrv0",
        "title": "Leitfaden zu Pferden und Ställen",
        "url": "https://www.youtube.com/watch?v=KC0mXozXrv0",
        "youtubeId": "KC0mXozXrv0",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-4mtK-Hv3jQg",
        "title": "Wie man verhindert dass Pferde",
        "url": "https://www.youtube.com/watch?v=4mtK-Hv3jQg",
        "youtubeId": "4mtK-Hv3jQg",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-kUPv5TXQk00",
        "title": "Wie man Pferde bekommt",
        "url": "https://www.youtube.com/watch?v=kUPv5TXQk00",
        "youtubeId": "kUPv5TXQk00",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-UDPe5IJOYjw",
        "title": "Horse Guide | Tutorial",
        "url": "https://www.youtube.com/watch?v=UDPe5IJOYjw",
        "youtubeId": "UDPe5IJOYjw",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-tGsuvS3KCsg",
        "title": "So sperren Sie Pferde",
        "url": "https://www.youtube.com/watch?v=tGsuvS3KCsg",
        "youtubeId": "tGsuvS3KCsg",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-JvS9yCoKg68",
        "title": "He Spent 3,000 Hours Mastering",
        "url": "https://www.youtube.com/watch?v=JvS9yCoKg68",
        "youtubeId": "JvS9yCoKg68",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-eTu1Bn192ec",
        "title": "Racing Horses in Rust",
        "url": "https://www.youtube.com/watch?v=eTu1Bn192ec",
        "youtubeId": "eTu1Bn192ec",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-RPMwFJTNv1I",
        "title": "Riding a Horse in Rust",
        "url": "https://www.youtube.com/watch?v=RPMwFJTNv1I",
        "youtubeId": "RPMwFJTNv1I",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-vkwiPJIUnlY",
        "title": "How a 6,900 Hour Solo Abuses",
        "url": "https://www.youtube.com/watch?v=vkwiPJIUnlY",
        "youtubeId": "vkwiPJIUnlY",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-ihLeEcS54qw",
        "title": "Horse + Shield Meta is Broken",
        "url": "https://www.youtube.com/watch?v=ihLeEcS54qw",
        "youtubeId": "ihLeEcS54qw",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-gguCttStoPs",
        "title": "How to Take Care of Horses",
        "url": "https://www.youtube.com/watch?v=gguCttStoPs",
        "youtubeId": "gguCttStoPs",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-dBn3ebHVDMI",
        "title": "Pferd + diese Waffe ist wahnsinnig",
        "url": "https://www.youtube.com/watch?v=dBn3ebHVDMI",
        "youtubeId": "dBn3ebHVDMI",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-JLCUKmr4LTI",
        "title": "Wie man aus Pferdemist Dünger macht",
        "url": "https://www.youtube.com/watch?v=JLCUKmr4LTI",
        "youtubeId": "JLCUKmr4LTI",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-oNRaQveU-rU",
        "title": "Wie Sie Ihr Pferd heilen",
        "url": "https://www.youtube.com/watch?v=oNRaQveU-rU",
        "youtubeId": "oNRaQveU-rU",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-wVLW7PdOL7o",
        "title": "The Untold Power of Horse Poop",
        "url": "https://www.youtube.com/watch?v=wVLW7PdOL7o",
        "youtubeId": "wVLW7PdOL7o",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-uIcwrEj-kek",
        "title": "So satteln Sie ein Pferd",
        "url": "https://www.youtube.com/watch?v=uIcwrEj-kek",
        "youtubeId": "uIcwrEj-kek",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-0H2yxKjZXgE",
        "title": "Horse and Equipment Guide",
        "url": "https://www.youtube.com/watch?v=0H2yxKjZXgE",
        "youtubeId": "0H2yxKjZXgE",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "pferde-horses-z-hmen-reiten-pflegen-NtPV_R-Yje8",
        "title": "How to Pick The Perfect Horse",
        "url": "https://www.youtube.com/watch?v=NtPV_R-Yje8",
        "youtubeId": "NtPV_R-Yje8",
        "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
        "stageSlug": "food_farming_animals"
      }
    ]
  },
  {
    "slug": "angeln-fishing",
    "title": "Angeln (Fishing)",
    "count": 20,
    "stageSlug": "food_farming_animals",
    "description": "Guides and tutorials for Angeln (Fishing)",
    "videos": [
      {
        "id": "angeln-fishing-TKhmIJDDMlU",
        "title": "So verhindern Sie Leinenriss",
        "url": "https://www.youtube.com/watch?v=TKhmIJDDMlU",
        "youtubeId": "TKhmIJDDMlU",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-wL0gaHGT5hg",
        "title": "Fishing Guide Tutorial 2025",
        "url": "https://www.youtube.com/watch?v=wL0gaHGT5hg",
        "youtubeId": "wL0gaHGT5hg",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-dueGhHtX7Go",
        "title": "Angel-Guide – der einfachste",
        "url": "https://www.youtube.com/watch?v=dueGhHtX7Go",
        "youtubeId": "dueGhHtX7Go",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-4PXXh3f_GXE",
        "title": "Basic Fishing Guide",
        "url": "https://www.youtube.com/watch?v=4PXXh3f_GXE",
        "youtubeId": "4PXXh3f_GXE",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-viFQUqurl_E",
        "title": "Kurzanleitung zum Angeln",
        "url": "https://www.youtube.com/watch?v=viFQUqurl_E",
        "youtubeId": "viFQUqurl_E",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-be6iOwS5wuQ",
        "title": "Wie man in Rust fischt",
        "url": "https://www.youtube.com/watch?v=be6iOwS5wuQ",
        "youtubeId": "be6iOwS5wuQ",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-4Z0-ab25wDo",
        "title": "3 PRO Fishing Tricks",
        "url": "https://www.youtube.com/watch?v=4Z0-ab25wDo",
        "youtubeId": "4Z0-ab25wDo",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-aQz9rJgH_G4",
        "title": "5 Tricks für mehr Fisch",
        "url": "https://www.youtube.com/watch?v=aQz9rJgH_G4",
        "youtubeId": "aQz9rJgH_G4",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-xX8rUXQobxA",
        "title": "Bestes sicheres Scrap",
        "url": "https://www.youtube.com/watch?v=xX8rUXQobxA",
        "youtubeId": "xX8rUXQobxA",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-gNMutNFURFE",
        "title": "How to catch Every Fish",
        "url": "https://www.youtube.com/watch?v=gNMutNFURFE",
        "youtubeId": "gNMutNFURFE",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-U1-UjwTVr5w",
        "title": "Console Fishing",
        "url": "https://www.youtube.com/watch?v=U1-UjwTVr5w",
        "youtubeId": "U1-UjwTVr5w",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-vtO78_W-Dc0",
        "title": "How to Fish (Full Guide)",
        "url": "https://www.youtube.com/watch?v=vtO78_W-Dc0",
        "youtubeId": "vtO78_W-Dc0",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-4s_MbqgQFuw",
        "title": "So verwenden Sie eine Fischfalle",
        "url": "https://www.youtube.com/watch?v=4s_MbqgQFuw",
        "youtubeId": "4s_MbqgQFuw",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-PMjPPQXn0W4",
        "title": "Fixing a Broken Fishing Rod",
        "url": "https://www.youtube.com/watch?v=PMjPPQXn0W4",
        "youtubeId": "PMjPPQXn0W4",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-jNvuDHN26nc",
        "title": "Quick Fishing Guide",
        "url": "https://www.youtube.com/watch?v=jNvuDHN26nc",
        "youtubeId": "jNvuDHN26nc",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-taMFMLsTn5s",
        "title": "In 5 Minuten mit diesem Trick",
        "url": "https://www.youtube.com/watch?v=taMFMLsTn5s",
        "youtubeId": "taMFMLsTn5s",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-NjFT0Qa3L20",
        "title": "Werde reich mit deiner Basis",
        "url": "https://www.youtube.com/watch?v=NjFT0Qa3L20",
        "youtubeId": "NjFT0Qa3L20",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-vPVyWbT4hh0",
        "title": "Kurzanleitung – 9000 Schrott",
        "url": "https://www.youtube.com/watch?v=vPVyWbT4hh0",
        "youtubeId": "vPVyWbT4hh0",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-9pYMdwIdNJo",
        "title": "Top 3 Easy Beach Fishing",
        "url": "https://www.youtube.com/watch?v=9pYMdwIdNJo",
        "youtubeId": "9pYMdwIdNJo",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "angeln-fishing-TWrvYxF3CKY",
        "title": "The New 100% Catch Fishing Base",
        "url": "https://www.youtube.com/watch?v=TWrvYxF3CKY",
        "youtubeId": "TWrvYxF3CKY",
        "categorySlug": "angeln-fishing",
        "stageSlug": "food_farming_animals"
      }
    ]
  },
  {
    "slug": "nahrung-kochen-h-hner-kompost",
    "title": "Nahrung, Kochen & Hühner/Kompost",
    "count": 47,
    "stageSlug": "food_farming_animals",
    "description": "Guides and tutorials for Nahrung, Kochen & Hühner/Kompost",
    "videos": [
      {
        "id": "nahrung-kochen-h-hner-kompost-pAT3yJLm1DI",
        "title": "How to Use Chicken Coop",
        "url": "https://www.youtube.com/watch?v=pAT3yJLm1DI",
        "youtubeId": "pAT3yJLm1DI",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-ewj1d-hy0ao",
        "title": "Ultimativer Kuchen-Koch-Leitfaden",
        "url": "https://www.youtube.com/watch?v=ewj1d-hy0ao",
        "youtubeId": "ewj1d-hy0ao",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-yTBzyDbHfEs",
        "title": "How To Cook Food",
        "url": "https://www.youtube.com/watch?v=yTBzyDbHfEs",
        "youtubeId": "yTBzyDbHfEs",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-ZF3qACRDSw8",
        "title": "Mischtabelle, Tee- und Beeren-Guide",
        "url": "https://www.youtube.com/watch?v=ZF3qACRDSw8",
        "youtubeId": "ZF3qACRDSw8",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-9exljSpM4CU",
        "title": "Rust für Anfänger – Nahrung",
        "url": "https://www.youtube.com/watch?v=9exljSpM4CU",
        "youtubeId": "9exljSpM4CU",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-VCQNoaKTVtc",
        "title": "How To Get Crafting Quality (Cooking)",
        "url": "https://www.youtube.com/watch?v=VCQNoaKTVtc",
        "youtubeId": "VCQNoaKTVtc",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-SxwIHO4iCa0",
        "title": "🔌 Rust Elektrizitätshandbuch",
        "url": "https://www.youtube.com/watch?v=SxwIHO4iCa0",
        "youtubeId": "SxwIHO4iCa0",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-5yZWc8VAX9A",
        "title": "The BEST Rust Electricity Guide",
        "url": "https://www.youtube.com/watch?v=5yZWc8VAX9A",
        "youtubeId": "5yZWc8VAX9A",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-XCsIUd_UVz8",
        "title": "Ultimate Electricity Guide",
        "url": "https://www.youtube.com/watch?v=XCsIUd_UVz8",
        "youtubeId": "XCsIUd_UVz8",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-UBiDjyjtSaM",
        "title": "Die 10 wichtigsten Stromkreise",
        "url": "https://www.youtube.com/watch?v=UBiDjyjtSaM",
        "youtubeId": "UBiDjyjtSaM",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-fvRAZ0rF3Q8",
        "title": "What Every Electrical Component",
        "url": "https://www.youtube.com/watch?v=fvRAZ0rF3Q8",
        "youtubeId": "fvRAZ0rF3Q8",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-ixzQazNVL80",
        "title": "Rust 101: Electricity Guide",
        "url": "https://www.youtube.com/watch?v=ixzQazNVL80",
        "youtubeId": "ixzQazNVL80",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-ZjjGlpC-Lf4",
        "title": "Power Distribution And Logic",
        "url": "https://www.youtube.com/watch?v=ZjjGlpC-Lf4",
        "youtubeId": "ZjjGlpC-Lf4",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-ulfq_qr-DvA",
        "title": "5 essenzielle Stromkreise",
        "url": "https://www.youtube.com/watch?v=ulfq_qr-DvA",
        "youtubeId": "ulfq_qr-DvA",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-_87f5pwiUCI",
        "title": "A Basic Electricity Guide",
        "url": "https://www.youtube.com/watch?v=_87f5pwiUCI",
        "youtubeId": "_87f5pwiUCI",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost--0BR8BN5WGg",
        "title": "Beginners Guide To Electricity",
        "url": "https://www.youtube.com/watch?v=-0BR8BN5WGg",
        "youtubeId": "-0BR8BN5WGg",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-NoGeJWKkKKc",
        "title": "Master the Electrical Branch",
        "url": "https://www.youtube.com/watch?v=NoGeJWKkKKc",
        "youtubeId": "NoGeJWKkKKc",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-p4MyY_FuPMw",
        "title": "Rust Electrical | How To Wire",
        "url": "https://www.youtube.com/watch?v=p4MyY_FuPMw",
        "youtubeId": "p4MyY_FuPMw",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-eJCmG1M9q_4",
        "title": "Rust advanced electricity",
        "url": "https://www.youtube.com/watch?v=eJCmG1M9q_4",
        "youtubeId": "eJCmG1M9q_4",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-S2jV-V62sMo",
        "title": "Unlimited Ore Smelting w/ Electr.",
        "url": "https://www.youtube.com/watch?v=S2jV-V62sMo",
        "youtubeId": "S2jV-V62sMo",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-rcEQ7eBZP5U",
        "title": "Wind Turbine Placement Made Easy",
        "url": "https://www.youtube.com/watch?v=rcEQ7eBZP5U",
        "youtubeId": "rcEQ7eBZP5U",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-fPk-fyP9MFM",
        "title": "Ultimate Beginner's Guide",
        "url": "https://www.youtube.com/watch?v=fPk-fyP9MFM",
        "youtubeId": "fPk-fyP9MFM",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-R4WIXh-c5eI",
        "title": "Stromerzeugung & -speicherung",
        "url": "https://www.youtube.com/watch?v=R4WIXh-c5eI",
        "youtubeId": "R4WIXh-c5eI",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-3a2i9bU9WJU",
        "title": "Pushing Base Limits w/ Electr.",
        "url": "https://www.youtube.com/watch?v=3a2i9bU9WJU",
        "youtubeId": "3a2i9bU9WJU",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-oW9bPJO3CcM",
        "title": "Rust-Experte: beste Setups",
        "url": "https://www.youtube.com/watch?v=oW9bPJO3CcM",
        "youtubeId": "oW9bPJO3CcM",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-oWd7t7Cy1fY",
        "title": "Ultimativer Industrieleitfaden",
        "url": "https://www.youtube.com/watch?v=oWd7t7Cy1fY",
        "youtubeId": "oWd7t7Cy1fY",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-uAeHH0INIFI",
        "title": "Meistern Sie Industrielle Pipes",
        "url": "https://www.youtube.com/watch?v=uAeHH0INIFI",
        "youtubeId": "uAeHH0INIFI",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-EDvZ21gcNgU",
        "title": "The best auto-sorter design",
        "url": "https://www.youtube.com/watch?v=EDvZ21gcNgU",
        "youtubeId": "EDvZ21gcNgU",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-lTA0y9OStnw",
        "title": "Auto-Fill Your TC",
        "url": "https://www.youtube.com/watch?v=lTA0y9OStnw",
        "youtubeId": "lTA0y9OStnw",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-jWI6dCUm4Jc",
        "title": "Auto Sorting System – Never",
        "url": "https://www.youtube.com/watch?v=jWI6dCUm4Jc",
        "youtubeId": "jWI6dCUm4Jc",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-Fz_HkoeXH2g",
        "title": "Most Efficient Way to Organize",
        "url": "https://www.youtube.com/watch?v=Fz_HkoeXH2g",
        "youtubeId": "Fz_HkoeXH2g",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-bv-YJiHAvhc",
        "title": "The Auto Sorting System",
        "url": "https://www.youtube.com/watch?v=bv-YJiHAvhc",
        "youtubeId": "bv-YJiHAvhc",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-KcTqG_2YD-g",
        "title": "Modular Industrial Pipes",
        "url": "https://www.youtube.com/watch?v=KcTqG_2YD-g",
        "youtubeId": "KcTqG_2YD-g",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-80LCDpEFjCE",
        "title": "Industrieller Handwerker",
        "url": "https://www.youtube.com/watch?v=80LCDpEFjCE",
        "youtubeId": "80LCDpEFjCE",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-uXfRoMIddeQ",
        "title": "Vollautomatik – einfache Anleitung",
        "url": "https://www.youtube.com/watch?v=uXfRoMIddeQ",
        "youtubeId": "uXfRoMIddeQ",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-dHawUz3q-Oo",
        "title": "Das EINZIGE Sortiersystem",
        "url": "https://www.youtube.com/watch?v=dHawUz3q-Oo",
        "youtubeId": "dHawUz3q-Oo",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-qvZtucyRCZs",
        "title": "Industrial – Basics & Storage",
        "url": "https://www.youtube.com/watch?v=qvZtucyRCZs",
        "youtubeId": "qvZtucyRCZs",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-ftbFe0QaCGU",
        "title": "Simplest Auto Smelter",
        "url": "https://www.youtube.com/watch?v=ftbFe0QaCGU",
        "youtubeId": "ftbFe0QaCGU",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-d1s_f4DXYBA",
        "title": "How to Use Industrial Conveyors",
        "url": "https://www.youtube.com/watch?v=d1s_f4DXYBA",
        "youtubeId": "d1s_f4DXYBA",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-m9fAjD5nvp0",
        "title": "Automatisches Auffüllen extern",
        "url": "https://www.youtube.com/watch?v=m9fAjD5nvp0",
        "youtubeId": "m9fAjD5nvp0",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-Lb0jzj2QUZk",
        "title": "Apartment-Komplex Guide",
        "url": "https://www.youtube.com/watch?v=Lb0jzj2QUZk",
        "youtubeId": "Lb0jzj2QUZk",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-DJmFbUmieHQ",
        "title": "Rust Automation Tutorial",
        "url": "https://www.youtube.com/watch?v=DJmFbUmieHQ",
        "youtubeId": "DJmFbUmieHQ",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-uWJHDPzfcOc",
        "title": "Industrial / Electrical",
        "url": "https://www.youtube.com/watch?v=uWJHDPzfcOc",
        "youtubeId": "uWJHDPzfcOc",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-tAVuPWXqkfQ",
        "title": "How to setup Auto Turrets",
        "url": "https://www.youtube.com/watch?v=tAVuPWXqkfQ",
        "youtubeId": "tAVuPWXqkfQ",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-WcAOA9PiJwU",
        "title": "The Auto Turret & Setup Guide",
        "url": "https://www.youtube.com/watch?v=WcAOA9PiJwU",
        "youtubeId": "WcAOA9PiJwU",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-OV6nYMuP-mw",
        "title": "So bekommst du Schwarzpulver",
        "url": "https://www.youtube.com/watch?v=OV6nYMuP-mw",
        "youtubeId": "OV6nYMuP-mw",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      },
      {
        "id": "nahrung-kochen-h-hner-kompost-_T5adqyJdXg",
        "title": "How to Craft Explosives in Rust",
        "url": "https://www.youtube.com/watch?v=_T5adqyJdXg",
        "youtubeId": "_T5adqyJdXg",
        "categorySlug": "nahrung-kochen-h-hner-kompost",
        "stageSlug": "food_farming_animals"
      }
    ]
  },
  {
    "slug": "elektrik-electricity",
    "title": "Elektrik / Electricity",
    "count": 16,
    "stageSlug": "base_systems",
    "description": "Guides and tutorials for Elektrik / Electricity",
    "videos": [
      {
        "id": "elektrik-electricity-SxwIHO4iCa0",
        "title": "Rust Elektrizitätshandbuch – Vom Anfänger zum Profi",
        "url": "https://www.youtube.com/watch?v=SxwIHO4iCa0",
        "youtubeId": "SxwIHO4iCa0",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-5yZWc8VAX9A",
        "title": "The BEST Rust Electricity Guide for Beginners",
        "url": "https://www.youtube.com/watch?v=5yZWc8VAX9A",
        "youtubeId": "5yZWc8VAX9A",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-UBiDjyjtSaM",
        "title": "Die 10 wichtigsten Stromkreise in Rust",
        "url": "https://www.youtube.com/watch?v=UBiDjyjtSaM",
        "youtubeId": "UBiDjyjtSaM",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-ulfq_qr-DvA",
        "title": "5 essenzielle Stromkreise, die jeder Rust-Spieler kennen muss",
        "url": "https://www.youtube.com/watch?v=ulfq_qr-DvA",
        "youtubeId": "ulfq_qr-DvA",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-XCsIUd_UVz8",
        "title": "Ultimate Electricity Guide – Beginner To Pro",
        "url": "https://www.youtube.com/watch?v=XCsIUd_UVz8",
        "youtubeId": "XCsIUd_UVz8",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-dHawUz3q-Oo",
        "title": "Das EINZIGE Rust-Sortiersystem-Tutorial",
        "url": "https://www.youtube.com/watch?v=dHawUz3q-Oo",
        "youtubeId": "dHawUz3q-Oo",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-fvRAZ0rF3Q8",
        "title": "What Every Electrical Component Does in Rust",
        "url": "https://www.youtube.com/watch?v=fvRAZ0rF3Q8",
        "youtubeId": "fvRAZ0rF3Q8",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-eJCmG1M9q_4",
        "title": "Rust advanced electricity",
        "url": "https://www.youtube.com/watch?v=eJCmG1M9q_4",
        "youtubeId": "eJCmG1M9q_4",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-ZjjGlpC-Lf4",
        "title": "Rust Power Distribution And Logic Flow",
        "url": "https://www.youtube.com/watch?v=ZjjGlpC-Lf4",
        "youtubeId": "ZjjGlpC-Lf4",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity--0BR8BN5WGg",
        "title": "Beginners Guide To Electricity – Understanding Basics",
        "url": "https://www.youtube.com/watch?v=-0BR8BN5WGg",
        "youtubeId": "-0BR8BN5WGg",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-p4MyY_FuPMw",
        "title": "RUST Electrical – How To WIRE LIKE A PRO",
        "url": "https://www.youtube.com/watch?v=p4MyY_FuPMw",
        "youtubeId": "p4MyY_FuPMw",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-HgpRufq9oJw",
        "title": "Ultimate Guide to Electric Furnace Automation",
        "url": "https://www.youtube.com/watch?v=HgpRufq9oJw",
        "youtubeId": "HgpRufq9oJw",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-ixzQazNVL80",
        "title": "RUST 101: Electricity Guide – Solar Panels",
        "url": "https://www.youtube.com/watch?v=ixzQazNVL80",
        "youtubeId": "ixzQazNVL80",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-3a2i9bU9WJU",
        "title": "Pushing Base Limits With Rust Electricity",
        "url": "https://www.youtube.com/watch?v=3a2i9bU9WJU",
        "youtubeId": "3a2i9bU9WJU",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-hvCS8lKB1Os",
        "title": "Rust-Energiemanagement ENDLICH erklärt",
        "url": "https://www.youtube.com/watch?v=hvCS8lKB1Os",
        "youtubeId": "hvCS8lKB1Os",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      },
      {
        "id": "elektrik-electricity-87JewNRuKMs",
        "title": "Die böseste Basis, die ich je in Rust gebaut habe",
        "url": "https://www.youtube.com/watch?v=87JewNRuKMs",
        "youtubeId": "87JewNRuKMs",
        "categorySlug": "elektrik-electricity",
        "stageSlug": "base_systems"
      }
    ]
  },
  {
    "slug": "industrie-system-f-rderb-nder-pipes-sorter",
    "title": "Industrie-System (Förderbänder/Pipes/Sorter)",
    "count": 16,
    "stageSlug": "base_systems",
    "description": "Guides and tutorials for Industrie-System (Förderbänder/Pipes/Sorter)",
    "videos": [
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-KcTqG_2YD-g",
        "title": "Rust Modular Sorting System V2 Tutorial",
        "url": "https://www.youtube.com/watch?v=KcTqG_2YD-g",
        "youtubeId": "KcTqG_2YD-g",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-Fz_HkoeXH2g",
        "title": "The Most EFFICIENT Way to Organize Your Loot",
        "url": "https://www.youtube.com/watch?v=Fz_HkoeXH2g",
        "youtubeId": "Fz_HkoeXH2g",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-EDvZ21gcNgU",
        "title": "The best auto-sorter design – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=EDvZ21gcNgU",
        "youtubeId": "EDvZ21gcNgU",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-jWI6dCUm4Jc",
        "title": "Rust Auto Sorting System – NEVER Mess Up",
        "url": "https://www.youtube.com/watch?v=jWI6dCUm4Jc",
        "youtubeId": "jWI6dCUm4Jc",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-oW9bPJO3CcM",
        "title": "RUST-Experte verrät die besten Geheimnisse",
        "url": "https://www.youtube.com/watch?v=oW9bPJO3CcM",
        "youtubeId": "oW9bPJO3CcM",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-oWd7t7Cy1fY",
        "title": "Ultimativer Industrieleitfaden – So automatisierst du",
        "url": "https://www.youtube.com/watch?v=oWd7t7Cy1fY",
        "youtubeId": "oWd7t7Cy1fY",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-uAeHH0INIFI",
        "title": "Meistern Sie Rust INDUSTRIELLE Kombinierer",
        "url": "https://www.youtube.com/watch?v=uAeHH0INIFI",
        "youtubeId": "uAeHH0INIFI",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-80LCDpEFjCE",
        "title": "Industrieller Handwerker Rust: Automatisierung",
        "url": "https://www.youtube.com/watch?v=80LCDpEFjCE",
        "youtubeId": "80LCDpEFjCE",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-uXfRoMIddeQ",
        "title": "Die einfache Anleitung zur vollautomatischen Basis",
        "url": "https://www.youtube.com/watch?v=uXfRoMIddeQ",
        "youtubeId": "uXfRoMIddeQ",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-bv-YJiHAvhc",
        "title": "The Auto Sorting System of Your Dreams",
        "url": "https://www.youtube.com/watch?v=bv-YJiHAvhc",
        "youtubeId": "bv-YJiHAvhc",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-nE_hCjU31pM",
        "title": "Rust Automatic Sorting System – Industrial",
        "url": "https://www.youtube.com/watch?v=nE_hCjU31pM",
        "youtubeId": "nE_hCjU31pM",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-u_rNj10iNUE",
        "title": "Full Base Industrial Automation – Auto Smelting",
        "url": "https://www.youtube.com/watch?v=u_rNj10iNUE",
        "youtubeId": "u_rNj10iNUE",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-UqxPoxzOrk8",
        "title": "Auto Upkeep Module – Rust Modular Sorting",
        "url": "https://www.youtube.com/watch?v=UqxPoxzOrk8",
        "youtubeId": "UqxPoxzOrk8",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-uR0U0OKECRw",
        "title": "How To Make an Auto Sorting Conveyor",
        "url": "https://www.youtube.com/watch?v=uR0U0OKECRw",
        "youtubeId": "uR0U0OKECRw",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-dHawUz3q-Oo",
        "title": "Das EINZIGE Rust-Sortiersystem-Tutorial",
        "url": "https://www.youtube.com/watch?v=dHawUz3q-Oo",
        "youtubeId": "dHawUz3q-Oo",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      },
      {
        "id": "industrie-system-f-rderb-nder-pipes-sorter-T3kgpLryzmI",
        "title": "Sorters and Conveyors Tutorial",
        "url": "https://www.youtube.com/watch?v=T3kgpLryzmI",
        "youtubeId": "T3kgpLryzmI",
        "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
        "stageSlug": "base_systems"
      }
    ]
  },
  {
    "slug": "auto-turret-flame-turret-shotgun-trap",
    "title": "Auto-Turret / Flame Turret / Shotgun Trap",
    "count": 15,
    "stageSlug": "vehicles",
    "description": "Guides and tutorials for Auto-Turret / Flame Turret / Shotgun Trap",
    "videos": [
      {
        "id": "auto-turret-flame-turret-shotgun-trap-kNQljV77PgQ",
        "title": "Traps & Turrets – Defence & Base Guide",
        "url": "https://www.youtube.com/watch?v=kNQljV77PgQ",
        "youtubeId": "kNQljV77PgQ",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-WcAOA9PiJwU",
        "title": "The Auto Turret & Setup Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=WcAOA9PiJwU",
        "youtubeId": "WcAOA9PiJwU",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-sciLQC-j6nA",
        "title": "Rust Auto Turret Defense – HBHF Sensor Setup",
        "url": "https://www.youtube.com/watch?v=sciLQC-j6nA",
        "youtubeId": "sciLQC-j6nA",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-iG0RwAhyEEM",
        "title": "Double the HV Rocket Cost of Your Auto Turret",
        "url": "https://www.youtube.com/watch?v=iG0RwAhyEEM",
        "youtubeId": "iG0RwAhyEEM",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-QiOVn0tnMRY",
        "title": "RUST – FLAME TURRET TEST",
        "url": "https://www.youtube.com/watch?v=QiOVn0tnMRY",
        "youtubeId": "QiOVn0tnMRY",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-msTLTg-HTDE",
        "title": "TUNA LAMPS & FLAME SENTRY TURRET – Rust Update",
        "url": "https://www.youtube.com/watch?v=msTLTg-HTDE",
        "youtubeId": "msTLTg-HTDE",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-BezenhUwVI8",
        "title": "Aufsätze für automatische Geschütze",
        "url": "https://www.youtube.com/watch?v=BezenhUwVI8",
        "youtubeId": "BezenhUwVI8",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-K_jazjYC97Q",
        "title": "Flame Turrets are Broken in Rust",
        "url": "https://www.youtube.com/watch?v=K_jazjYC97Q",
        "youtubeId": "K_jazjYC97Q",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-JsW8yW5sVe4",
        "title": "Never Before Seen Flame Turret Trick",
        "url": "https://www.youtube.com/watch?v=JsW8yW5sVe4",
        "youtubeId": "JsW8yW5sVe4",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-pdZDy-L7r4Y",
        "title": "Rust Raiding Economics – Turrets and Traps",
        "url": "https://www.youtube.com/watch?v=pdZDy-L7r4Y",
        "youtubeId": "pdZDy-L7r4Y",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-q7mCnIGK2NM",
        "title": "The Rust Flame Turret Trap Base",
        "url": "https://www.youtube.com/watch?v=q7mCnIGK2NM",
        "youtubeId": "q7mCnIGK2NM",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-nxABq4TFKTg",
        "title": "RUST Flame Turret Trap Base",
        "url": "https://www.youtube.com/watch?v=nxABq4TFKTg",
        "youtubeId": "nxABq4TFKTg",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-Ojw5TTlBaSc",
        "title": "Auto Turret Road – Rust",
        "url": "https://www.youtube.com/watch?v=Ojw5TTlBaSc",
        "youtubeId": "Ojw5TTlBaSc",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-IxOlfjZYhl0",
        "title": "Rust Ships: Schrotflinten-Falle",
        "url": "https://www.youtube.com/watch?v=IxOlfjZYhl0",
        "youtubeId": "IxOlfjZYhl0",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      },
      {
        "id": "auto-turret-flame-turret-shotgun-trap-vakrYWQ-HcE",
        "title": "Flame Turret AFK Trap",
        "url": "https://www.youtube.com/watch?v=vakrYWQ-HcE",
        "youtubeId": "vakrYWQ-HcE",
        "categorySlug": "auto-turret-flame-turret-shotgun-trap",
        "stageSlug": "vehicles"
      }
    ]
  },
  {
    "slug": "sprengstoff-munition-craften",
    "title": "Sprengstoff & Munition craften",
    "count": 14,
    "stageSlug": "combat_raiding",
    "description": "Guides and tutorials for Sprengstoff & Munition craften",
    "videos": [
      {
        "id": "sprengstoff-munition-craften-MoiAyqT6UyA",
        "title": "Ultimativer Raid-Guide – Der effizienteste Weg",
        "url": "https://www.youtube.com/watch?v=MoiAyqT6UyA",
        "youtubeId": "MoiAyqT6UyA",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "sprengstoff-munition-craften-cqRTbM7hOfc",
        "title": "Rust Tips – How To Get Explosives FAST!",
        "url": "https://www.youtube.com/watch?v=cqRTbM7hOfc",
        "youtubeId": "cqRTbM7hOfc",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "sprengstoff-munition-craften-_T5adqyJdXg",
        "title": "How to Craft Explosives in Rust (Step-by-Step)",
        "url": "https://www.youtube.com/watch?v=_T5adqyJdXg",
        "youtubeId": "_T5adqyJdXg",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "sprengstoff-munition-craften-tanJIeZ_WG0",
        "title": "A GUIDE TO C4 DAMAGE",
        "url": "https://www.youtube.com/watch?v=tanJIeZ_WG0",
        "youtubeId": "tanJIeZ_WG0",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "sprengstoff-munition-craften-dJj4fivYCY4",
        "title": "Rust Raid Guide: How Much C4, Rockets, Satchels",
        "url": "https://www.youtube.com/watch?v=dJj4fivYCY4",
        "youtubeId": "dJj4fivYCY4",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "sprengstoff-munition-craften-STcvfus8umw",
        "title": "Raiding when you can't craft C4 or Rockets",
        "url": "https://www.youtube.com/watch?v=STcvfus8umw",
        "youtubeId": "STcvfus8umw",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "sprengstoff-munition-craften-ACq3RAnFEEs",
        "title": "Guide to Explosives – Rust",
        "url": "https://www.youtube.com/watch?v=ACq3RAnFEEs",
        "youtubeId": "ACq3RAnFEEs",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "sprengstoff-munition-craften-kWEb_lX1orc",
        "title": "Bradley mit einer Drohne und C4 erobern",
        "url": "https://www.youtube.com/watch?v=kWEb_lX1orc",
        "youtubeId": "kWEb_lX1orc",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "sprengstoff-munition-craften-V_VA4FflnHA",
        "title": "Rust – So zerstört man Panzertüren",
        "url": "https://www.youtube.com/watch?v=V_VA4FflnHA",
        "youtubeId": "V_VA4FflnHA",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "sprengstoff-munition-craften-QCsWG5_h-3A",
        "title": "Rust – Wie viele Taschen, explosive Munition…",
        "url": "https://www.youtube.com/watch?v=QCsWG5_h-3A",
        "youtubeId": "QCsWG5_h-3A",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "sprengstoff-munition-craften-sr0J7BZL55Y",
        "title": "How To Rust: Day 44! – Using C4, Rockets",
        "url": "https://www.youtube.com/watch?v=sr0J7BZL55Y",
        "youtubeId": "sr0J7BZL55Y",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "sprengstoff-munition-craften-IGUzaK4sGx8",
        "title": "Rust – Wie viele Molotowcocktails, Schuld…",
        "url": "https://www.youtube.com/watch?v=IGUzaK4sGx8",
        "youtubeId": "IGUzaK4sGx8",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "sprengstoff-munition-craften--WMFamUwpCE",
        "title": "Rust a noobs guide part 6: Explosive weapons",
        "url": "https://www.youtube.com/watch?v=-WMFamUwpCE",
        "youtubeId": "-WMFamUwpCE",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "sprengstoff-munition-craften-XWlNXkitj7o",
        "title": "NEW Raiding META? – Ultimate Primitive Raiding",
        "url": "https://www.youtube.com/watch?v=XWlNXkitj7o",
        "youtubeId": "XWlNXkitj7o",
        "categorySlug": "sprengstoff-munition-craften",
        "stageSlug": "combat_raiding"
      }
    ]
  },
  {
    "slug": "medizin-heilung",
    "title": "Medizin & Heilung",
    "count": 8,
    "stageSlug": "start_here",
    "description": "Guides and tutorials for Medizin & Heilung",
    "videos": [
      {
        "id": "medizin-heilung-8xzAmWgj4FI",
        "title": "Heal Faster & Efficiently! TLDR Healing Guide",
        "url": "https://www.youtube.com/watch?v=8xzAmWgj4FI",
        "youtubeId": "8xzAmWgj4FI",
        "categorySlug": "medizin-heilung",
        "stageSlug": "start_here"
      },
      {
        "id": "medizin-heilung-_y40zxs63nI",
        "title": "Medical Syringe Alternative – How many Bandages",
        "url": "https://www.youtube.com/watch?v=_y40zxs63nI",
        "youtubeId": "_y40zxs63nI",
        "categorySlug": "medizin-heilung",
        "stageSlug": "start_here"
      },
      {
        "id": "medizin-heilung-RBCxCHAhjfw",
        "title": "Rust: Automatische medizinische Spritzen",
        "url": "https://www.youtube.com/watch?v=RBCxCHAhjfw",
        "youtubeId": "RBCxCHAhjfw",
        "categorySlug": "medizin-heilung",
        "stageSlug": "start_here"
      },
      {
        "id": "medizin-heilung-l4qfAuqOyeY",
        "title": "Rust Beginners Guide How To Heal Yourself",
        "url": "https://www.youtube.com/watch?v=l4qfAuqOyeY",
        "youtubeId": "l4qfAuqOyeY",
        "categorySlug": "medizin-heilung",
        "stageSlug": "start_here"
      },
      {
        "id": "medizin-heilung-e_7Qd9vzUmk",
        "title": "wait, that's not a medical syringe...",
        "url": "https://www.youtube.com/watch?v=e_7Qd9vzUmk",
        "youtubeId": "e_7Qd9vzUmk",
        "categorySlug": "medizin-heilung",
        "stageSlug": "start_here"
      },
      {
        "id": "medizin-heilung-GRxlrFxyA9A",
        "title": "Medical Syringe – Rust Legacy",
        "url": "https://www.youtube.com/watch?v=GRxlrFxyA9A",
        "youtubeId": "GRxlrFxyA9A",
        "categorySlug": "medizin-heilung",
        "stageSlug": "start_here"
      },
      {
        "id": "medizin-heilung-MXTZbF4bAfE",
        "title": "Chest Seals/Sucking Chest Wounds",
        "url": "https://www.youtube.com/watch?v=MXTZbF4bAfE",
        "youtubeId": "MXTZbF4bAfE",
        "categorySlug": "medizin-heilung",
        "stageSlug": "start_here"
      },
      {
        "id": "medizin-heilung-TvUcmxjMs7E",
        "title": "How to Upgrade Healing Bandage",
        "url": "https://www.youtube.com/watch?v=TvUcmxjMs7E",
        "youtubeId": "TvUcmxjMs7E",
        "categorySlug": "medizin-heilung",
        "stageSlug": "start_here"
      }
    ]
  },
  {
    "slug": "alle-monumente-bersicht",
    "title": "Alle Monumente (Übersicht)",
    "count": 15,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Alle Monumente (Übersicht)",
    "videos": [
      {
        "id": "alle-monumente-bersicht-Lb0jzj2QUZk",
        "title": "Rust Monuments",
        "url": "https://www.youtube.com/watch?v=Lb0jzj2QUZk",
        "youtubeId": "Lb0jzj2QUZk",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-geW88NvTzPI",
        "title": "Leitfaden zu allen Fundorten der Monumente",
        "url": "https://www.youtube.com/watch?v=geW88NvTzPI",
        "youtubeId": "geW88NvTzPI",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-u6zHvXaKQaA",
        "title": "Small Rust Monuments Guide – Everything You Need",
        "url": "https://www.youtube.com/watch?v=u6zHvXaKQaA",
        "youtubeId": "u6zHvXaKQaA",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-Inn345Rwd8I",
        "title": "Der ultimative Leitfaden zu den Monumenten",
        "url": "https://www.youtube.com/watch?v=Inn345Rwd8I",
        "youtubeId": "Inn345Rwd8I",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-ZqK2gTdJL9Q",
        "title": "What Are The Best Monuments In Rust?",
        "url": "https://www.youtube.com/watch?v=ZqK2gTdJL9Q",
        "youtubeId": "ZqK2gTdJL9Q",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-WqEp1WLyDNc",
        "title": "Rust Monument Guide",
        "url": "https://www.youtube.com/watch?v=WqEp1WLyDNc",
        "youtubeId": "WqEp1WLyDNc",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-8jTvWNf8aFA",
        "title": "100 ESSENTIAL Tips for ALL Monuments",
        "url": "https://www.youtube.com/watch?v=8jTvWNf8aFA",
        "youtubeId": "8jTvWNf8aFA",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-SElsAKcDgzA",
        "title": "How To Get EASY Loot – Top 3 Monuments",
        "url": "https://www.youtube.com/watch?v=SElsAKcDgzA",
        "youtubeId": "SElsAKcDgzA",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-kr0spV5-NRI",
        "title": "How to 100% PROGRESS in Rust 2025",
        "url": "https://www.youtube.com/watch?v=kr0spV5-NRI",
        "youtubeId": "kr0spV5-NRI",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-gOqiN2sHTzY",
        "title": "Big meta changes, BP frags, New monuments",
        "url": "https://www.youtube.com/watch?v=gOqiN2sHTzY",
        "youtubeId": "gOqiN2sHTzY",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-FICzFsiiA5k",
        "title": "Sewer Branch Monument – Loot & Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=FICzFsiiA5k",
        "youtubeId": "FICzFsiiA5k",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-o4nX3zlqySQ",
        "title": "Kurzer Leitfaden für die grüne Karte",
        "url": "https://www.youtube.com/watch?v=o4nX3zlqySQ",
        "youtubeId": "o4nX3zlqySQ",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-Xr7AvpLUnRo",
        "title": "Flugplatzdenkmal – Loot & Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=Xr7AvpLUnRo",
        "youtubeId": "Xr7AvpLUnRo",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-RZ1KcBNJzl8",
        "title": "Über 25 Strategien 2025",
        "url": "https://www.youtube.com/watch?v=RZ1KcBNJzl8",
        "youtubeId": "RZ1KcBNJzl8",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "alle-monumente-bersicht-RkhLevC72Iw",
        "title": "I did every rust monument in one day",
        "url": "https://www.youtube.com/watch?v=RkhLevC72Iw",
        "youtubeId": "RkhLevC72Iw",
        "categorySlug": "alle-monumente-bersicht",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "airfield",
    "title": "Airfield",
    "count": 10,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Airfield",
    "videos": [
      {
        "id": "airfield-Nmv0_y7X6zo",
        "title": "Airfield Monument Loot & Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=Nmv0_y7X6zo",
        "youtubeId": "Nmv0_y7X6zo",
        "categorySlug": "airfield",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "airfield-Xr7AvpLUnRo",
        "title": "Airfield Monument – Loot & Puzzle Guide 2025",
        "url": "https://www.youtube.com/watch?v=Xr7AvpLUnRo",
        "youtubeId": "Xr7AvpLUnRo",
        "categorySlug": "airfield",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "airfield-yKQIuvMWxd4",
        "title": "Rust – Airfield Monument Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=yKQIuvMWxd4",
        "youtubeId": "yKQIuvMWxd4",
        "categorySlug": "airfield",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "airfield-eJaOw8ei7wU",
        "title": "Ultimate AIRFIELD Puzzle Guide in 2 Minutes",
        "url": "https://www.youtube.com/watch?v=eJaOw8ei7wU",
        "youtubeId": "eJaOw8ei7wU",
        "categorySlug": "airfield",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "airfield-EaKJjQn6-i4",
        "title": "How to Solve the Airfield Keycard Puzzle",
        "url": "https://www.youtube.com/watch?v=EaKJjQn6-i4",
        "youtubeId": "EaKJjQn6-i4",
        "categorySlug": "airfield",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "airfield-OjDq32SHjJE",
        "title": "Rust Monument Guide – The Airfield",
        "url": "https://www.youtube.com/watch?v=OjDq32SHjJE",
        "youtubeId": "OjDq32SHjJE",
        "categorySlug": "airfield",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "airfield-tHcpn77cwkI",
        "title": "Rust – How to Airfield Puzzle",
        "url": "https://www.youtube.com/watch?v=tHcpn77cwkI",
        "youtubeId": "tHcpn77cwkI",
        "categorySlug": "airfield",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "airfield-Se77Bsld9PA",
        "title": "Rust Monument Puzzles – Airfield Green and Blue",
        "url": "https://www.youtube.com/watch?v=Se77Bsld9PA",
        "youtubeId": "Se77Bsld9PA",
        "categorySlug": "airfield",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "airfield-eTHyuK2sZN4",
        "title": "How to do the Airfield Puzzle in Rust",
        "url": "https://www.youtube.com/watch?v=eTHyuK2sZN4",
        "youtubeId": "eTHyuK2sZN4",
        "categorySlug": "airfield",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "airfield-vmowqHYTCsk",
        "title": "Rust Monument Guide – Airfield 2021 Update",
        "url": "https://www.youtube.com/watch?v=vmowqHYTCsk",
        "youtubeId": "vmowqHYTCsk",
        "categorySlug": "airfield",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "launch-site",
    "title": "Launch Site",
    "count": 10,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Launch Site",
    "videos": [
      {
        "id": "launch-site-Rey8Ad_nt3Y",
        "title": "Launch Site Keycard Puzzle in 113 Seconds",
        "url": "https://www.youtube.com/watch?v=Rey8Ad_nt3Y",
        "youtubeId": "Rey8Ad_nt3Y",
        "categorySlug": "launch-site",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "launch-site-zz0XpmDkE8U",
        "title": "Launch Site Puzzle Guide in Rust",
        "url": "https://www.youtube.com/watch?v=zz0XpmDkE8U",
        "youtubeId": "zz0XpmDkE8U",
        "categorySlug": "launch-site",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "launch-site-u-6l_626F-k",
        "title": "Complete LAUNCH SITE Red Card Puzzle",
        "url": "https://www.youtube.com/watch?v=u-6l_626F-k",
        "youtubeId": "u-6l_626F-k",
        "categorySlug": "launch-site",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "launch-site-8zme3s7dSYA",
        "title": "Launch Site Puzzle Guide in Rust",
        "url": "https://www.youtube.com/watch?v=8zme3s7dSYA",
        "youtubeId": "8zme3s7dSYA",
        "categorySlug": "launch-site",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "launch-site-Inn345Rwd8I",
        "title": "The ULTIMATE Tier 3 Monuments Guide",
        "url": "https://www.youtube.com/watch?v=Inn345Rwd8I",
        "youtubeId": "Inn345Rwd8I",
        "categorySlug": "launch-site",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "launch-site-YFCFr2oKCUk",
        "title": "Launch Site Red Card Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=YFCFr2oKCUk",
        "youtubeId": "YFCFr2oKCUk",
        "categorySlug": "launch-site",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "launch-site-tiSYf3mCyzw",
        "title": "Launch Site Keycard Puzzle Tutorial",
        "url": "https://www.youtube.com/watch?v=tiSYf3mCyzw",
        "youtubeId": "tiSYf3mCyzw",
        "categorySlug": "launch-site",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "launch-site-geW88NvTzPI",
        "title": "ALL Monument Keycard Puzzle Locations",
        "url": "https://www.youtube.com/watch?v=geW88NvTzPI",
        "youtubeId": "geW88NvTzPI",
        "categorySlug": "launch-site",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "launch-site-AGtTjNOAE0s",
        "title": "Launch Site Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=AGtTjNOAE0s",
        "youtubeId": "AGtTjNOAE0s",
        "categorySlug": "launch-site",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "launch-site-7ZeoeMg0uj8",
        "title": "The NEW Launch Site Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=7ZeoeMg0uj8",
        "youtubeId": "7ZeoeMg0uj8",
        "categorySlug": "launch-site",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "military-tunnels",
    "title": "Military Tunnels",
    "count": 10,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Military Tunnels",
    "videos": [
      {
        "id": "military-tunnels-Ga3SVYUivv0",
        "title": "Military Tunnels Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=Ga3SVYUivv0",
        "youtubeId": "Ga3SVYUivv0",
        "categorySlug": "military-tunnels",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "military-tunnels-E3wZOGM3RS4",
        "title": "NEW Military Tunnels Guide In 2026",
        "url": "https://www.youtube.com/watch?v=E3wZOGM3RS4",
        "youtubeId": "E3wZOGM3RS4",
        "categorySlug": "military-tunnels",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "military-tunnels-T02DJuPlHGA",
        "title": "Rust – Military Tunnels Monument Puzzle",
        "url": "https://www.youtube.com/watch?v=T02DJuPlHGA",
        "youtubeId": "T02DJuPlHGA",
        "categorySlug": "military-tunnels",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "military-tunnels-QlqiA2fIJYs",
        "title": "Military Tunnels Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=QlqiA2fIJYs",
        "youtubeId": "QlqiA2fIJYs",
        "categorySlug": "military-tunnels",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "military-tunnels-rJthtIpajzE",
        "title": "MILITARY TUNNELS WALK-THROUGH GUIDE 2025",
        "url": "https://www.youtube.com/watch?v=rJthtIpajzE",
        "youtubeId": "rJthtIpajzE",
        "categorySlug": "military-tunnels",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "military-tunnels-tRGPLqGmaSM",
        "title": "Rust Military Tunnels Guide – 2 Minute Tutorial",
        "url": "https://www.youtube.com/watch?v=tRGPLqGmaSM",
        "youtubeId": "tRGPLqGmaSM",
        "categorySlug": "military-tunnels",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "military-tunnels-Inn345Rwd8I",
        "title": "The ULTIMATE Tier 3 Monuments Guide",
        "url": "https://www.youtube.com/watch?v=Inn345Rwd8I",
        "youtubeId": "Inn345Rwd8I",
        "categorySlug": "military-tunnels",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "military-tunnels-OIImYNdnz7w",
        "title": "Military Tunnels Full Puzzle Walkthrough",
        "url": "https://www.youtube.com/watch?v=OIImYNdnz7w",
        "youtubeId": "OIImYNdnz7w",
        "categorySlug": "military-tunnels",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "military-tunnels-MlPqwEZfVHo",
        "title": "ULTIMATE Military Tunnel Puzzle Guide Console",
        "url": "https://www.youtube.com/watch?v=MlPqwEZfVHo",
        "youtubeId": "MlPqwEZfVHo",
        "categorySlug": "military-tunnels",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "military-tunnels-Ax2pL0N7Xww",
        "title": "Military Tunnels Red Card Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=Ax2pL0N7Xww",
        "youtubeId": "Ax2pL0N7Xww",
        "categorySlug": "military-tunnels",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "water-treatment-plant",
    "title": "Water Treatment Plant",
    "count": 8,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Water Treatment Plant",
    "videos": [
      {
        "id": "water-treatment-plant-GLZaepYwJdo",
        "title": "Water Treatment Plant Monument Guide",
        "url": "https://www.youtube.com/watch?v=GLZaepYwJdo",
        "youtubeId": "GLZaepYwJdo",
        "categorySlug": "water-treatment-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "water-treatment-plant-omM9wYp05Ds",
        "title": "Water Treatment Plant Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=omM9wYp05Ds",
        "youtubeId": "omM9wYp05Ds",
        "categorySlug": "water-treatment-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "water-treatment-plant-vKJ7xwUNxnw",
        "title": "Rust Water Treatment Guide – Puzzle, Radiation",
        "url": "https://www.youtube.com/watch?v=vKJ7xwUNxnw",
        "youtubeId": "vKJ7xwUNxnw",
        "categorySlug": "water-treatment-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "water-treatment-plant-9Qg6Istthxs",
        "title": "ULTIMATE Rust Water Treatment Guide 2026",
        "url": "https://www.youtube.com/watch?v=9Qg6Istthxs",
        "youtubeId": "9Qg6Istthxs",
        "categorySlug": "water-treatment-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "water-treatment-plant-FICzFsiiA5k",
        "title": "Sewer Branch Monument – Loot & Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=FICzFsiiA5k",
        "youtubeId": "FICzFsiiA5k",
        "categorySlug": "water-treatment-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "water-treatment-plant-WpH-VC1Jvo0",
        "title": "How to Do the Water Treatment Puzzle",
        "url": "https://www.youtube.com/watch?v=WpH-VC1Jvo0",
        "youtubeId": "WpH-VC1Jvo0",
        "categorySlug": "water-treatment-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "water-treatment-plant-626U2gEFYhI",
        "title": "How to do the Water Treatment Puzzle",
        "url": "https://www.youtube.com/watch?v=626U2gEFYhI",
        "youtubeId": "626U2gEFYhI",
        "categorySlug": "water-treatment-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "water-treatment-plant-I54zI4QWP-g",
        "title": "Rust Monument Guide – The Water Treatment",
        "url": "https://www.youtube.com/watch?v=I54zI4QWP-g",
        "youtubeId": "I54zI4QWP-g",
        "categorySlug": "water-treatment-plant",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "train-yard",
    "title": "Train Yard",
    "count": 8,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Train Yard",
    "videos": [
      {
        "id": "train-yard-ntoudT6eZuA",
        "title": "Train Yard Monument Loot & Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=ntoudT6eZuA",
        "youtubeId": "ntoudT6eZuA",
        "categorySlug": "train-yard",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "train-yard-EceO04tAHTk",
        "title": "Rust – Train Yard Monument Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=EceO04tAHTk",
        "youtubeId": "EceO04tAHTk",
        "categorySlug": "train-yard",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "train-yard--rMLRBJwwOA",
        "title": "Rust Monument Puzzles – Trainyard Green and Blue",
        "url": "https://www.youtube.com/watch?v=-rMLRBJwwOA",
        "youtubeId": "-rMLRBJwwOA",
        "categorySlug": "train-yard",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "train-yard-dOdFE3FI6l0",
        "title": "Ultimate Rust TRAINYARD Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=dOdFE3FI6l0",
        "youtubeId": "dOdFE3FI6l0",
        "categorySlug": "train-yard",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "train-yard-a30ETOIV4Ss",
        "title": "NEW Train Event – Train Yard Monument Loot",
        "url": "https://www.youtube.com/watch?v=a30ETOIV4Ss",
        "youtubeId": "a30ETOIV4Ss",
        "categorySlug": "train-yard",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "train-yard-G6NVTj2jnNk",
        "title": "Rust Trainyard Blue Door Monument Puzzle",
        "url": "https://www.youtube.com/watch?v=G6NVTj2jnNk",
        "youtubeId": "G6NVTj2jnNk",
        "categorySlug": "train-yard",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "train-yard-myn-B-5xq9E",
        "title": "How to Do the Trainyard Keycard Puzzle",
        "url": "https://www.youtube.com/watch?v=myn-B-5xq9E",
        "youtubeId": "myn-B-5xq9E",
        "categorySlug": "train-yard",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "train-yard-_zC3PSnRm4Q",
        "title": "Train Yard Puzzle Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=_zC3PSnRm4Q",
        "youtubeId": "_zC3PSnRm4Q",
        "categorySlug": "train-yard",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "power-plant",
    "title": "Power Plant",
    "count": 10,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Power Plant",
    "videos": [
      {
        "id": "power-plant-5Y9gRkWe-F8",
        "title": "Rust – Power Plant Monument Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=5Y9gRkWe-F8",
        "youtubeId": "5Y9gRkWe-F8",
        "categorySlug": "power-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "power-plant-FzJb9Vf_OGc",
        "title": "Power Plant Monument Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=FzJb9Vf_OGc",
        "youtubeId": "FzJb9Vf_OGc",
        "categorySlug": "power-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "power-plant-sgIUt3QxfEw",
        "title": "Rust – Power Plant Keycard Puzzle Tutorial",
        "url": "https://www.youtube.com/watch?v=sgIUt3QxfEw",
        "youtubeId": "sgIUt3QxfEw",
        "categorySlug": "power-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "power-plant-J2taQaFLciM",
        "title": "Power Plant Puzzle Guide in Rust",
        "url": "https://www.youtube.com/watch?v=J2taQaFLciM",
        "youtubeId": "J2taQaFLciM",
        "categorySlug": "power-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "power-plant-qiZBcM3vvXE",
        "title": "Power Plant Full Puzzle Walkthrough",
        "url": "https://www.youtube.com/watch?v=qiZBcM3vvXE",
        "youtubeId": "qiZBcM3vvXE",
        "categorySlug": "power-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "power-plant-BHUmPycpU4Y",
        "title": "Rust: How to Run Power Plant Puzzles",
        "url": "https://www.youtube.com/watch?v=BHUmPycpU4Y",
        "youtubeId": "BHUmPycpU4Y",
        "categorySlug": "power-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "power-plant-UHW4gzIvE8M",
        "title": "How to run Power Plant Puzzle",
        "url": "https://www.youtube.com/watch?v=UHW4gzIvE8M",
        "youtubeId": "UHW4gzIvE8M",
        "categorySlug": "power-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "power-plant-geW88NvTzPI",
        "title": "ALL Monument Keycard Puzzle Locations",
        "url": "https://www.youtube.com/watch?v=geW88NvTzPI",
        "youtubeId": "geW88NvTzPI",
        "categorySlug": "power-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "power-plant-svpV9z-QN_Y",
        "title": "Power Plant Keycard Puzzle in 160 Seconds",
        "url": "https://www.youtube.com/watch?v=svpV9z-QN_Y",
        "youtubeId": "svpV9z-QN_Y",
        "categorySlug": "power-plant",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "power-plant-wgX-PAr69xQ",
        "title": "Red Card – Power Plant Blue Card Puzzle",
        "url": "https://www.youtube.com/watch?v=wgX-PAr69xQ",
        "youtubeId": "wgX-PAr69xQ",
        "categorySlug": "power-plant",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "harbor",
    "title": "Harbor",
    "count": 10,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Harbor",
    "videos": [
      {
        "id": "harbor-Bsrb9L-QDJ8",
        "title": "Harbour Keycard Puzzle (Both Variants)",
        "url": "https://www.youtube.com/watch?v=Bsrb9L-QDJ8",
        "youtubeId": "Bsrb9L-QDJ8",
        "categorySlug": "harbor",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "harbor-qiB7SaFL2Xg",
        "title": "Rust – Large Harbor Monument Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=qiB7SaFL2Xg",
        "youtubeId": "qiB7SaFL2Xg",
        "categorySlug": "harbor",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "harbor-mLIPKRaWcLs",
        "title": "The ULTIMATE Harbour Keycard Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=mLIPKRaWcLs",
        "youtubeId": "mLIPKRaWcLs",
        "categorySlug": "harbor",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "harbor-etNkDxNEOns",
        "title": "Rust – Small Harbor Monument Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=etNkDxNEOns",
        "youtubeId": "etNkDxNEOns",
        "categorySlug": "harbor",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "harbor-SIQrkUX29Nk",
        "title": "Rust Monument Guide – The Harbor",
        "url": "https://www.youtube.com/watch?v=SIQrkUX29Nk",
        "youtubeId": "SIQrkUX29Nk",
        "categorySlug": "harbor",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "harbor-geW88NvTzPI",
        "title": "ALL Monument Keycard Puzzle Locations",
        "url": "https://www.youtube.com/watch?v=geW88NvTzPI",
        "youtubeId": "geW88NvTzPI",
        "categorySlug": "harbor",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "harbor-n0W33_8XA0g",
        "title": "Harbor Puzzle Guide in Rust",
        "url": "https://www.youtube.com/watch?v=n0W33_8XA0g",
        "youtubeId": "n0W33_8XA0g",
        "categorySlug": "harbor",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "harbor-GXHn0NGvfNk",
        "title": "Harbor Monument Guide – Small and Large",
        "url": "https://www.youtube.com/watch?v=GXHn0NGvfNk",
        "youtubeId": "GXHn0NGvfNk",
        "categorySlug": "harbor",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "harbor-w4B5Zk_3gpg",
        "title": "Harbour Monument Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=w4B5Zk_3gpg",
        "youtubeId": "w4B5Zk_3gpg",
        "categorySlug": "harbor",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "harbor-mn6ypbkuNhQ",
        "title": "All Keycard locations – Keycard & Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=mn6ypbkuNhQ",
        "youtubeId": "mn6ypbkuNhQ",
        "categorySlug": "harbor",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
    "title": "Kleine Monumente (Gas Station/Supermarket/Junkyard/Satellite/Sewer)",
    "count": 10,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Kleine Monumente (Gas Station/Supermarket/Junkyard/Satellite/Sewer)",
    "videos": [
      {
        "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-u6zHvXaKQaA",
        "title": "Small Rust Monuments Guide – Everything You Need",
        "url": "https://www.youtube.com/watch?v=u6zHvXaKQaA",
        "youtubeId": "u6zHvXaKQaA",
        "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-aUIqlLkoxMI",
        "title": "Small Monuments Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=aUIqlLkoxMI",
        "youtubeId": "aUIqlLkoxMI",
        "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-NXxZUZ2bfIs",
        "title": "Rust Monument Guide: Satellite Dish Loot",
        "url": "https://www.youtube.com/watch?v=NXxZUZ2bfIs",
        "youtubeId": "NXxZUZ2bfIs",
        "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-g601suPTlUg",
        "title": "Sewer Branch Monument Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=g601suPTlUg",
        "youtubeId": "g601suPTlUg",
        "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-gBweJ3nz40o",
        "title": "Satellite Monument Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=gBweJ3nz40o",
        "youtubeId": "gBweJ3nz40o",
        "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-YFRhWFqAlBE",
        "title": "Satellite Monument Guide 2",
        "url": "https://www.youtube.com/watch?v=YFRhWFqAlBE",
        "youtubeId": "YFRhWFqAlBE",
        "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-7NKv6p9P2CI",
        "title": "Rust Monument Guide – The Junkyard",
        "url": "https://www.youtube.com/watch?v=7NKv6p9P2CI",
        "youtubeId": "7NKv6p9P2CI",
        "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-FICzFsiiA5k",
        "title": "Sewer Branch Monument – Loot & Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=FICzFsiiA5k",
        "youtubeId": "FICzFsiiA5k",
        "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-Osj442q2p3k",
        "title": "Rust Monument Guide – The Satellite Dish",
        "url": "https://www.youtube.com/watch?v=Osj442q2p3k",
        "youtubeId": "Osj442q2p3k",
        "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-SEpKbmaeH3I",
        "title": "Oxum's Gas Station – Monument Guide",
        "url": "https://www.youtube.com/watch?v=SEpKbmaeH3I",
        "youtubeId": "SEpKbmaeH3I",
        "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "the-dome",
    "title": "The Dome",
    "count": 9,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for The Dome",
    "videos": [
      {
        "id": "the-dome-Wq1NUCCuRTQ",
        "title": "Dome Monument Loot & Climbing Guide",
        "url": "https://www.youtube.com/watch?v=Wq1NUCCuRTQ",
        "youtubeId": "Wq1NUCCuRTQ",
        "categorySlug": "the-dome",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "the-dome-jK-rS46FbDI",
        "title": "Rust – Dome Monument Guide",
        "url": "https://www.youtube.com/watch?v=jK-rS46FbDI",
        "youtubeId": "jK-rS46FbDI",
        "categorySlug": "the-dome",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "the-dome-81X1T1mbJxc",
        "title": "How to Climb and Loot the Dome",
        "url": "https://www.youtube.com/watch?v=81X1T1mbJxc",
        "youtubeId": "81X1T1mbJxc",
        "categorySlug": "the-dome",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "the-dome-rkkciMJB7os",
        "title": "The Dome – Monument guide – Rust",
        "url": "https://www.youtube.com/watch?v=rkkciMJB7os",
        "youtubeId": "rkkciMJB7os",
        "categorySlug": "the-dome",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "the-dome-Wv29xLlERrk",
        "title": "Dome Monument Puzzle Guide In Rust",
        "url": "https://www.youtube.com/watch?v=Wv29xLlERrk",
        "youtubeId": "Wv29xLlERrk",
        "categorySlug": "the-dome",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "the-dome-tRvabimFj4g",
        "title": "Rust Beginners Guide For The Dome",
        "url": "https://www.youtube.com/watch?v=tRvabimFj4g",
        "youtubeId": "tRvabimFj4g",
        "categorySlug": "the-dome",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "the-dome-UQl4j5jbW1Y",
        "title": "Dome Monument Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=UQl4j5jbW1Y",
        "youtubeId": "UQl4j5jbW1Y",
        "categorySlug": "the-dome",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "the-dome-mP_OMGc_sjo",
        "title": "How To Climb To The Top Of Dome Monument",
        "url": "https://www.youtube.com/watch?v=mP_OMGc_sjo",
        "youtubeId": "mP_OMGc_sjo",
        "categorySlug": "the-dome",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "the-dome-EA4k0R0MbiQ",
        "title": "Rust Monument Guide – The Dome",
        "url": "https://www.youtube.com/watch?v=EA4k0R0MbiQ",
        "youtubeId": "EA4k0R0MbiQ",
        "categorySlug": "the-dome",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "giant-excavator",
    "title": "Giant Excavator",
    "count": 9,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Giant Excavator",
    "videos": [
      {
        "id": "giant-excavator-H7eMgAUkR-U",
        "title": "Giant Excavator Pit Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=H7eMgAUkR-U",
        "youtubeId": "H7eMgAUkR-U",
        "categorySlug": "giant-excavator",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "giant-excavator-iXCqaiaePVw",
        "title": "Rust – Giant Excavator Pit Monument Guide",
        "url": "https://www.youtube.com/watch?v=iXCqaiaePVw",
        "youtubeId": "iXCqaiaePVw",
        "categorySlug": "giant-excavator",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "giant-excavator-UuIXnQHFFXY",
        "title": "Giant Excavator Guide – Rust",
        "url": "https://www.youtube.com/watch?v=UuIXnQHFFXY",
        "youtubeId": "UuIXnQHFFXY",
        "categorySlug": "giant-excavator",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "giant-excavator-GsbinuimORU",
        "title": "Rust Monument Guide – Giant Excavator",
        "url": "https://www.youtube.com/watch?v=GsbinuimORU",
        "youtubeId": "GsbinuimORU",
        "categorySlug": "giant-excavator",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "giant-excavator-Inn345Rwd8I",
        "title": "The ULTIMATE Tier 3 Monuments Guide",
        "url": "https://www.youtube.com/watch?v=Inn345Rwd8I",
        "youtubeId": "Inn345Rwd8I",
        "categorySlug": "giant-excavator",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "giant-excavator-BXLNJgKZles",
        "title": "Rust Monument Guide – The Large Excavator",
        "url": "https://www.youtube.com/watch?v=BXLNJgKZles",
        "youtubeId": "BXLNJgKZles",
        "categorySlug": "giant-excavator",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "giant-excavator-5Yu3sbY-_2g",
        "title": "RUST EXCAVATOR PIT MONUMENT GUIDE",
        "url": "https://www.youtube.com/watch?v=5Yu3sbY-_2g",
        "youtubeId": "5Yu3sbY-_2g",
        "categorySlug": "giant-excavator",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "giant-excavator-AYymth531fk",
        "title": "How to use The GIANT EXCAVATOR in Rust",
        "url": "https://www.youtube.com/watch?v=AYymth531fk",
        "youtubeId": "AYymth531fk",
        "categorySlug": "giant-excavator",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "giant-excavator-2tHToW6McZI",
        "title": "How to do the Excavator in Rust",
        "url": "https://www.youtube.com/watch?v=2tHToW6McZI",
        "youtubeId": "2tHToW6McZI",
        "categorySlug": "giant-excavator",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "arctic-research-base",
    "title": "Arctic Research Base",
    "count": 7,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Arctic Research Base",
    "videos": [
      {
        "id": "arctic-research-base-IAcleSkW_J4",
        "title": "Arctic Research Base Blue Card Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=IAcleSkW_J4",
        "youtubeId": "IAcleSkW_J4",
        "categorySlug": "arctic-research-base",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "arctic-research-base-lTaUsyKT1BE",
        "title": "Arctic Research Base Puzzle Guide in Rust",
        "url": "https://www.youtube.com/watch?v=lTaUsyKT1BE",
        "youtubeId": "lTaUsyKT1BE",
        "categorySlug": "arctic-research-base",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "arctic-research-base-JeZNxXn6KQg",
        "title": "Arctic Base Monument & Snowmobile Guide",
        "url": "https://www.youtube.com/watch?v=JeZNxXn6KQg",
        "youtubeId": "JeZNxXn6KQg",
        "categorySlug": "arctic-research-base",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "arctic-research-base-QoRDx1m3zvI",
        "title": "Arctic Research Base Loot Guide",
        "url": "https://www.youtube.com/watch?v=QoRDx1m3zvI",
        "youtubeId": "QoRDx1m3zvI",
        "categorySlug": "arctic-research-base",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "arctic-research-base-eHqEnfsUDdA",
        "title": "Arctic Research Base Blue Card Puzzle",
        "url": "https://www.youtube.com/watch?v=eHqEnfsUDdA",
        "youtubeId": "eHqEnfsUDdA",
        "categorySlug": "arctic-research-base",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "arctic-research-base-NP_7rVE9fNA",
        "title": "Arctic Research Base Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=NP_7rVE9fNA",
        "youtubeId": "NP_7rVE9fNA",
        "categorySlug": "arctic-research-base",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "arctic-research-base-Y1tkn3IIiCQ",
        "title": "Arctic Research Base Red Keycard Location",
        "url": "https://www.youtube.com/watch?v=Y1tkn3IIiCQ",
        "youtubeId": "Y1tkn3IIiCQ",
        "categorySlug": "arctic-research-base",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "nuclear-missile-silo",
    "title": "Nuclear Missile Silo",
    "count": 7,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Nuclear Missile Silo",
    "videos": [
      {
        "id": "nuclear-missile-silo-lUPephY1j8U",
        "title": "NEW Nuclear Missile Silo Monument – A Deep Dive",
        "url": "https://www.youtube.com/watch?v=lUPephY1j8U",
        "youtubeId": "lUPephY1j8U",
        "categorySlug": "nuclear-missile-silo",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "nuclear-missile-silo-vvwiRm7lREM",
        "title": "Missile Silo Guide in Rust",
        "url": "https://www.youtube.com/watch?v=vvwiRm7lREM",
        "youtubeId": "vvwiRm7lREM",
        "categorySlug": "nuclear-missile-silo",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "nuclear-missile-silo-81kkuY1Pv0A",
        "title": "Rust Guide – Nuclear Missile Silo Monument",
        "url": "https://www.youtube.com/watch?v=81kkuY1Pv0A",
        "youtubeId": "81kkuY1Pv0A",
        "categorySlug": "nuclear-missile-silo",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "nuclear-missile-silo-l40Q0_yKTmg",
        "title": "Missile Silo Loot Guide and Walkthrough",
        "url": "https://www.youtube.com/watch?v=l40Q0_yKTmg",
        "youtubeId": "l40Q0_yKTmg",
        "categorySlug": "nuclear-missile-silo",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "nuclear-missile-silo-nPIMXQfMNXc",
        "title": "Nuclear Missile Silo Blue Card Puzzle",
        "url": "https://www.youtube.com/watch?v=nPIMXQfMNXc",
        "youtubeId": "nPIMXQfMNXc",
        "categorySlug": "nuclear-missile-silo",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "nuclear-missile-silo-YPTQVvqRWNI",
        "title": "Rust – How To Open Missile Silo Hatch",
        "url": "https://www.youtube.com/watch?v=YPTQVvqRWNI",
        "youtubeId": "YPTQVvqRWNI",
        "categorySlug": "nuclear-missile-silo",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "nuclear-missile-silo-PA6iCK59XEU",
        "title": "Ultimate Rust Puzzle Guide – DOME, MISSILE SILO",
        "url": "https://www.youtube.com/watch?v=PA6iCK59XEU",
        "youtubeId": "PA6iCK59XEU",
        "categorySlug": "nuclear-missile-silo",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "underwater-labs",
    "title": "Underwater Labs",
    "count": 10,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Underwater Labs",
    "videos": [
      {
        "id": "underwater-labs-bfxdIUg4FcE",
        "title": "Rust Underwater Labs Guide – 2 Minute Tutorial",
        "url": "https://www.youtube.com/watch?v=bfxdIUg4FcE",
        "youtubeId": "bfxdIUg4FcE",
        "categorySlug": "underwater-labs",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "underwater-labs-Yj38XRHpD_o",
        "title": "Underwater Labs Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=Yj38XRHpD_o",
        "youtubeId": "Yj38XRHpD_o",
        "categorySlug": "underwater-labs",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "underwater-labs-UlPItcplbzc",
        "title": "Get RICH with this Monument – Underwater Labs",
        "url": "https://www.youtube.com/watch?v=UlPItcplbzc",
        "youtubeId": "UlPItcplbzc",
        "categorySlug": "underwater-labs",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "underwater-labs-uOoS6K2ZmNs",
        "title": "Rust Underwater Lab Monument Guide",
        "url": "https://www.youtube.com/watch?v=uOoS6K2ZmNs",
        "youtubeId": "uOoS6K2ZmNs",
        "categorySlug": "underwater-labs",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "underwater-labs-jirywxgfPmI",
        "title": "Rust – Underwater Labs Guide",
        "url": "https://www.youtube.com/watch?v=jirywxgfPmI",
        "youtubeId": "jirywxgfPmI",
        "categorySlug": "underwater-labs",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "underwater-labs-RyIX0GIk1F0",
        "title": "How to Run Underwater Labs",
        "url": "https://www.youtube.com/watch?v=RyIX0GIk1F0",
        "youtubeId": "RyIX0GIk1F0",
        "categorySlug": "underwater-labs",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "underwater-labs-tXRWIJZ_lKc",
        "title": "Under Water Labs Puzzle Guide in Rust",
        "url": "https://www.youtube.com/watch?v=tXRWIJZ_lKc",
        "youtubeId": "tXRWIJZ_lKc",
        "categorySlug": "underwater-labs",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "underwater-labs-nZC8n8pi52s",
        "title": "Underwater Labs Guide",
        "url": "https://www.youtube.com/watch?v=nZC8n8pi52s",
        "youtubeId": "nZC8n8pi52s",
        "categorySlug": "underwater-labs",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "underwater-labs-tEOKqA79ce8",
        "title": "How to Get in Underwater Labs Quick Guide",
        "url": "https://www.youtube.com/watch?v=tEOKqA79ce8",
        "youtubeId": "tEOKqA79ce8",
        "categorySlug": "underwater-labs",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "underwater-labs-xo5xOxMWxkw",
        "title": "COMPLETE Underwater Labs GUIDE",
        "url": "https://www.youtube.com/watch?v=xo5xOxMWxkw",
        "youtubeId": "xo5xOxMWxkw",
        "categorySlug": "underwater-labs",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "oil-rig-small-large",
    "title": "Oil Rig (Small & Large)",
    "count": 10,
    "stageSlug": "monuments_keycards",
    "description": "Guides and tutorials for Oil Rig (Small & Large)",
    "videos": [
      {
        "id": "oil-rig-small-large-2lzGW8X5NcY",
        "title": "Small Oil Rig Monument – Loot, Strategies",
        "url": "https://www.youtube.com/watch?v=2lzGW8X5NcY",
        "youtubeId": "2lzGW8X5NcY",
        "categorySlug": "oil-rig-small-large",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "oil-rig-small-large-NBignVjTNzQ",
        "title": "Small Oil Rig Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=NBignVjTNzQ",
        "youtubeId": "NBignVjTNzQ",
        "categorySlug": "oil-rig-small-large",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "oil-rig-small-large-GN4khDsR6z4",
        "title": "Large Oil Rig Monument – Best Strategies",
        "url": "https://www.youtube.com/watch?v=GN4khDsR6z4",
        "youtubeId": "GN4khDsR6z4",
        "categorySlug": "oil-rig-small-large",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "oil-rig-small-large-EV1agPOJpHI",
        "title": "How to find Oil Rig Monument Loot",
        "url": "https://www.youtube.com/watch?v=EV1agPOJpHI",
        "youtubeId": "EV1agPOJpHI",
        "categorySlug": "oil-rig-small-large",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "oil-rig-small-large-_c_WW4B7K-Q",
        "title": "Rust Monument Guide – Small Oil Rig 2021",
        "url": "https://www.youtube.com/watch?v=_c_WW4B7K-Q",
        "youtubeId": "_c_WW4B7K-Q",
        "categorySlug": "oil-rig-small-large",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "oil-rig-small-large-5kEHYr96alw",
        "title": "Complete Guide to Small Oil Rig",
        "url": "https://www.youtube.com/watch?v=5kEHYr96alw",
        "youtubeId": "5kEHYr96alw",
        "categorySlug": "oil-rig-small-large",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "oil-rig-small-large-OS_MtfVSMyY",
        "title": "Rust Monument Guide – The Oil Rig",
        "url": "https://www.youtube.com/watch?v=OS_MtfVSMyY",
        "youtubeId": "OS_MtfVSMyY",
        "categorySlug": "oil-rig-small-large",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "oil-rig-small-large-DjHWtWKBD4w",
        "title": "Rust Monument Guide – The Small Oil Rig",
        "url": "https://www.youtube.com/watch?v=DjHWtWKBD4w",
        "youtubeId": "DjHWtWKBD4w",
        "categorySlug": "oil-rig-small-large",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "oil-rig-small-large-u6zHvXaKQaA",
        "title": "Small Rust Monuments Guide – Everything",
        "url": "https://www.youtube.com/watch?v=u6zHvXaKQaA",
        "youtubeId": "u6zHvXaKQaA",
        "categorySlug": "oil-rig-small-large",
        "stageSlug": "monuments_keycards"
      },
      {
        "id": "oil-rig-small-large-GXHn0NGvfNk",
        "title": "Harbor Monument Guide – Small and Large",
        "url": "https://www.youtube.com/watch?v=GXHn0NGvfNk",
        "youtubeId": "GXHn0NGvfNk",
        "categorySlug": "oil-rig-small-large",
        "stageSlug": "monuments_keycards"
      }
    ]
  },
  {
    "slug": "cargo-ship-containerschiff",
    "title": "Cargo Ship (Containerschiff)",
    "count": 18,
    "stageSlug": "events_bosses",
    "description": "Guides and tutorials for Cargo Ship (Containerschiff)",
    "videos": [
      {
        "id": "cargo-ship-containerschiff-DHMTfWCnYcs",
        "title": "The Cargo Ship Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=DHMTfWCnYcs",
        "youtubeId": "DHMTfWCnYcs",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-WwIA_rTEg0I",
        "title": "Taking Cargo Solo: A complete guide",
        "url": "https://www.youtube.com/watch?v=WwIA_rTEg0I",
        "youtubeId": "WwIA_rTEg0I",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-iMYODoGRNss",
        "title": "NEW Harbour & Cargo Event Guide",
        "url": "https://www.youtube.com/watch?v=iMYODoGRNss",
        "youtubeId": "iMYODoGRNss",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-CsM5Nj9rF1o",
        "title": "My most Insane Solo Cargo",
        "url": "https://www.youtube.com/watch?v=CsM5Nj9rF1o",
        "youtubeId": "CsM5Nj9rF1o",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-VbodnFNDO_c",
        "title": "NEVER LOSE Cargo Ship AGAIN",
        "url": "https://www.youtube.com/watch?v=VbodnFNDO_c",
        "youtubeId": "VbodnFNDO_c",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-2XaJxhcq1tw",
        "title": "Rust Guide – Cargo Ship",
        "url": "https://www.youtube.com/watch?v=2XaJxhcq1tw",
        "youtubeId": "2XaJxhcq1tw",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-ZQjYcO_W1to",
        "title": "Taking Cargo Ship Guide",
        "url": "https://www.youtube.com/watch?v=ZQjYcO_W1to",
        "youtubeId": "ZQjYcO_W1to",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-SpI4BAzAEnw",
        "title": "Cargo MOVEMENT GUIDE",
        "url": "https://www.youtube.com/watch?v=SpI4BAzAEnw",
        "youtubeId": "SpI4BAzAEnw",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-Gaf-0uR6BsU",
        "title": "The Beginners Guide to TAKING Cargo",
        "url": "https://www.youtube.com/watch?v=Gaf-0uR6BsU",
        "youtubeId": "Gaf-0uR6BsU",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-zeC9dpM1LiM",
        "title": "The best way to get on Cargo in Rust",
        "url": "https://www.youtube.com/watch?v=zeC9dpM1LiM",
        "youtubeId": "zeC9dpM1LiM",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-ps3boxn0cZw",
        "title": "THE CARGO KING – Rust",
        "url": "https://www.youtube.com/watch?v=ps3boxn0cZw",
        "youtubeId": "ps3boxn0cZw",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-WQRDYYAHGks",
        "title": "How we ABUSED Cargo Ship",
        "url": "https://www.youtube.com/watch?v=WQRDYYAHGks",
        "youtubeId": "WQRDYYAHGks",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-pwo6mRTpFqw",
        "title": "Cargo Ship Guide – Rust Console",
        "url": "https://www.youtube.com/watch?v=pwo6mRTpFqw",
        "youtubeId": "pwo6mRTpFqw",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-AiOq6TrRm1k",
        "title": "Rust CargoShip Tips & Tricks",
        "url": "https://www.youtube.com/watch?v=AiOq6TrRm1k",
        "youtubeId": "AiOq6TrRm1k",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-vzbpd69chXk",
        "title": "RUST: Solo Practicing Safe Way",
        "url": "https://www.youtube.com/watch?v=vzbpd69chXk",
        "youtubeId": "vzbpd69chXk",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-ZU1KohCPfGk",
        "title": "Rust Cargo Ship Guide Solo 2024",
        "url": "https://www.youtube.com/watch?v=ZU1KohCPfGk",
        "youtubeId": "ZU1KohCPfGk",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-0Tq9iv7C41M",
        "title": "I Gave 25 Rust Players their own Cargo",
        "url": "https://www.youtube.com/watch?v=0Tq9iv7C41M",
        "youtubeId": "0Tq9iv7C41M",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      },
      {
        "id": "cargo-ship-containerschiff-rI1CVUMOuoI",
        "title": "This Cargo Glitch lets me see everything",
        "url": "https://www.youtube.com/watch?v=rI1CVUMOuoI",
        "youtubeId": "rI1CVUMOuoI",
        "categorySlug": "cargo-ship-containerschiff",
        "stageSlug": "events_bosses"
      }
    ]
  },
  {
    "slug": "bradley-apc-panzer-besiegen",
    "title": "Bradley APC (Panzer) besiegen",
    "count": 9,
    "stageSlug": "events_bosses",
    "description": "Guides and tutorials for Bradley APC (Panzer) besiegen",
    "videos": [
      {
        "id": "bradley-apc-panzer-besiegen-dgTuu2Tp93Q",
        "title": "7 Ways to Kill Bradley at Launch Site",
        "url": "https://www.youtube.com/watch?v=dgTuu2Tp93Q",
        "youtubeId": "dgTuu2Tp93Q",
        "categorySlug": "bradley-apc-panzer-besiegen",
        "stageSlug": "events_bosses"
      },
      {
        "id": "bradley-apc-panzer-besiegen-T3q-4XYWTdM",
        "title": "NEW Bradley APC Guide – Everything You Need",
        "url": "https://www.youtube.com/watch?v=T3q-4XYWTdM",
        "youtubeId": "T3q-4XYWTdM",
        "categorySlug": "bradley-apc-panzer-besiegen",
        "stageSlug": "events_bosses"
      },
      {
        "id": "bradley-apc-panzer-besiegen-F8WtGiOasU8",
        "title": "HOW TO KILL THE TANK (BRADLEY APC)",
        "url": "https://www.youtube.com/watch?v=F8WtGiOasU8",
        "youtubeId": "F8WtGiOasU8",
        "categorySlug": "bradley-apc-panzer-besiegen",
        "stageSlug": "events_bosses"
      },
      {
        "id": "bradley-apc-panzer-besiegen-6VcrPcChSFk",
        "title": "Easiest Way to Destroy the Bradley",
        "url": "https://www.youtube.com/watch?v=6VcrPcChSFk",
        "youtubeId": "6VcrPcChSFk",
        "categorySlug": "bradley-apc-panzer-besiegen",
        "stageSlug": "events_bosses"
      },
      {
        "id": "bradley-apc-panzer-besiegen-q2EZTk787rw",
        "title": "Cheapest Way to Destroy Bradley Tank",
        "url": "https://www.youtube.com/watch?v=q2EZTk787rw",
        "youtubeId": "q2EZTk787rw",
        "categorySlug": "bradley-apc-panzer-besiegen",
        "stageSlug": "events_bosses"
      },
      {
        "id": "bradley-apc-panzer-besiegen-wIunMhcSSKw",
        "title": "Rust Academy: 5 WAYS to KILL M2 BRADLEY",
        "url": "https://www.youtube.com/watch?v=wIunMhcSSKw",
        "youtubeId": "wIunMhcSSKw",
        "categorySlug": "bradley-apc-panzer-besiegen",
        "stageSlug": "events_bosses"
      },
      {
        "id": "bradley-apc-panzer-besiegen-EGCoqfBQd_8",
        "title": "Bradley Guide Rust Launch Site (90 Seconds)",
        "url": "https://www.youtube.com/watch?v=EGCoqfBQd_8",
        "youtubeId": "EGCoqfBQd_8",
        "categorySlug": "bradley-apc-panzer-besiegen",
        "stageSlug": "events_bosses"
      },
      {
        "id": "bradley-apc-panzer-besiegen-kWEb_lX1orc",
        "title": "Taking Bradley with a Drone and C4",
        "url": "https://www.youtube.com/watch?v=kWEb_lX1orc",
        "youtubeId": "kWEb_lX1orc",
        "categorySlug": "bradley-apc-panzer-besiegen",
        "stageSlug": "events_bosses"
      },
      {
        "id": "bradley-apc-panzer-besiegen-pdxfIVdk2iQ",
        "title": "How To Take Bradley – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=pdxfIVdk2iQ",
        "youtubeId": "pdxfIVdk2iQ",
        "categorySlug": "bradley-apc-panzer-besiegen",
        "stageSlug": "events_bosses"
      }
    ]
  },
  {
    "slug": "patrol-helicopter-heli-abschie-en",
    "title": "Patrol Helicopter (Heli abschießen)",
    "count": 9,
    "stageSlug": "events_bosses",
    "description": "Guides and tutorials for Patrol Helicopter (Heli abschießen)",
    "videos": [
      {
        "id": "patrol-helicopter-heli-abschie-en-tp5uDSCKVkw",
        "title": "Taking Patrol Helicopter The Best Way",
        "url": "https://www.youtube.com/watch?v=tp5uDSCKVkw",
        "youtubeId": "tp5uDSCKVkw",
        "categorySlug": "patrol-helicopter-heli-abschie-en",
        "stageSlug": "events_bosses"
      },
      {
        "id": "patrol-helicopter-heli-abschie-en-6OJjTQ-hBkA",
        "title": "Rust Beginner's Guide – How To Take Down Heli",
        "url": "https://www.youtube.com/watch?v=6OJjTQ-hBkA",
        "youtubeId": "6OJjTQ-hBkA",
        "categorySlug": "patrol-helicopter-heli-abschie-en",
        "stageSlug": "events_bosses"
      },
      {
        "id": "patrol-helicopter-heli-abschie-en-oPKrHHqBarc",
        "title": "How to CORRECTLY Take Patrol Heli",
        "url": "https://www.youtube.com/watch?v=oPKrHHqBarc",
        "youtubeId": "oPKrHHqBarc",
        "categorySlug": "patrol-helicopter-heli-abschie-en",
        "stageSlug": "events_bosses"
      },
      {
        "id": "patrol-helicopter-heli-abschie-en--rgYdHWQkhM",
        "title": "A complete guide to taking Heli in Rust",
        "url": "https://www.youtube.com/watch?v=-rgYdHWQkhM",
        "youtubeId": "-rgYdHWQkhM",
        "categorySlug": "patrol-helicopter-heli-abschie-en",
        "stageSlug": "events_bosses"
      },
      {
        "id": "patrol-helicopter-heli-abschie-en-B-UbBrHbAh0",
        "title": "NEW Patrol Helicopter & Tower Guide",
        "url": "https://www.youtube.com/watch?v=B-UbBrHbAh0",
        "youtubeId": "B-UbBrHbAh0",
        "categorySlug": "patrol-helicopter-heli-abschie-en",
        "stageSlug": "events_bosses"
      },
      {
        "id": "patrol-helicopter-heli-abschie-en-mLIF9m0NMtU",
        "title": "Rust Heli! How to take down the Patrol Helicopter",
        "url": "https://www.youtube.com/watch?v=mLIF9m0NMtU",
        "youtubeId": "mLIF9m0NMtU",
        "categorySlug": "patrol-helicopter-heli-abschie-en",
        "stageSlug": "events_bosses"
      },
      {
        "id": "patrol-helicopter-heli-abschie-en-9qW0Swh4-pg",
        "title": "Rust – Patrol Helicopter Guide",
        "url": "https://www.youtube.com/watch?v=9qW0Swh4-pg",
        "youtubeId": "9qW0Swh4-pg",
        "categorySlug": "patrol-helicopter-heli-abschie-en",
        "stageSlug": "events_bosses"
      },
      {
        "id": "patrol-helicopter-heli-abschie-en-_gTyuLbVq7A",
        "title": "Patrol Helicopter Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=_gTyuLbVq7A",
        "youtubeId": "_gTyuLbVq7A",
        "categorySlug": "patrol-helicopter-heli-abschie-en",
        "stageSlug": "events_bosses"
      },
      {
        "id": "patrol-helicopter-heli-abschie-en-5QbUpxjjkVw",
        "title": "How to Easily Destroy a Patrol Helicopter",
        "url": "https://www.youtube.com/watch?v=5QbUpxjjkVw",
        "youtubeId": "5QbUpxjjkVw",
        "categorySlug": "patrol-helicopter-heli-abschie-en",
        "stageSlug": "events_bosses"
      }
    ]
  },
  {
    "slug": "attack-helicopter",
    "title": "Attack Helicopter",
    "count": 8,
    "stageSlug": "events_bosses",
    "description": "Guides and tutorials for Attack Helicopter",
    "videos": [
      {
        "id": "attack-helicopter-JX-Nyg6mCqE",
        "title": "Attack Helicopter, Homing Missile & Parachute",
        "url": "https://www.youtube.com/watch?v=JX-Nyg6mCqE",
        "youtubeId": "JX-Nyg6mCqE",
        "categorySlug": "attack-helicopter",
        "stageSlug": "events_bosses"
      },
      {
        "id": "attack-helicopter-DK0wJTCzfnM",
        "title": "New Player Attack Helicopter Guide",
        "url": "https://www.youtube.com/watch?v=DK0wJTCzfnM",
        "youtubeId": "DK0wJTCzfnM",
        "categorySlug": "attack-helicopter",
        "stageSlug": "events_bosses"
      },
      {
        "id": "attack-helicopter-NLlWEfsGhyQ",
        "title": "How to Use Rockets in the Attack Helicopter",
        "url": "https://www.youtube.com/watch?v=NLlWEfsGhyQ",
        "youtubeId": "NLlWEfsGhyQ",
        "categorySlug": "attack-helicopter",
        "stageSlug": "events_bosses"
      },
      {
        "id": "attack-helicopter-ZhbeU1Q_p3I",
        "title": "How to Load Rockets into the Attack Heli",
        "url": "https://www.youtube.com/watch?v=ZhbeU1Q_p3I",
        "youtubeId": "ZhbeU1Q_p3I",
        "categorySlug": "attack-helicopter",
        "stageSlug": "events_bosses"
      },
      {
        "id": "attack-helicopter-5dNUDXDMiho",
        "title": "How to Use The Turret in The Attack Heli",
        "url": "https://www.youtube.com/watch?v=5dNUDXDMiho",
        "youtubeId": "5dNUDXDMiho",
        "categorySlug": "attack-helicopter",
        "stageSlug": "events_bosses"
      },
      {
        "id": "attack-helicopter-B-UbBrHbAh0",
        "title": "NEW Patrol Helicopter & Tower Guide",
        "url": "https://www.youtube.com/watch?v=B-UbBrHbAh0",
        "youtubeId": "B-UbBrHbAh0",
        "categorySlug": "attack-helicopter",
        "stageSlug": "events_bosses"
      },
      {
        "id": "attack-helicopter-TvID5ytf-nI",
        "title": "How to Use Flares in the Attack Heli",
        "url": "https://www.youtube.com/watch?v=TvID5ytf-nI",
        "youtubeId": "TvID5ytf-nI",
        "categorySlug": "attack-helicopter",
        "stageSlug": "events_bosses"
      },
      {
        "id": "attack-helicopter-ROmrnKwzJjU",
        "title": "How to Avoid Attack Helicopters in Rust",
        "url": "https://www.youtube.com/watch?v=ROmrnKwzJjU",
        "youtubeId": "ROmrnKwzJjU",
        "categorySlug": "attack-helicopter",
        "stageSlug": "events_bosses"
      }
    ]
  },
  {
    "slug": "airdrop-locked-crate-chinook",
    "title": "Airdrop / Locked Crate / Chinook",
    "count": 10,
    "stageSlug": "events_bosses",
    "description": "Guides and tutorials for Airdrop / Locked Crate / Chinook",
    "videos": [
      {
        "id": "airdrop-locked-crate-chinook--3c-ZbMAc-4",
        "title": "CH-47 Chinook Event Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=-3c-ZbMAc-4",
        "youtubeId": "-3c-ZbMAc-4",
        "categorySlug": "airdrop-locked-crate-chinook",
        "stageSlug": "events_bosses"
      },
      {
        "id": "airdrop-locked-crate-chinook-dVkALU3lyOI",
        "title": "Rust – CH47 and Locked Loot Crates",
        "url": "https://www.youtube.com/watch?v=dVkALU3lyOI",
        "youtubeId": "dVkALU3lyOI",
        "categorySlug": "airdrop-locked-crate-chinook",
        "stageSlug": "events_bosses"
      },
      {
        "id": "airdrop-locked-crate-chinook-AHBgTZLu9u4",
        "title": "I Found All The Ways to Steal The Chinook",
        "url": "https://www.youtube.com/watch?v=AHBgTZLu9u4",
        "youtubeId": "AHBgTZLu9u4",
        "categorySlug": "airdrop-locked-crate-chinook",
        "stageSlug": "events_bosses"
      },
      {
        "id": "airdrop-locked-crate-chinook-JW-UDQbyiEs",
        "title": "Rust – Airdrop & Locked Crate Guide",
        "url": "https://www.youtube.com/watch?v=JW-UDQbyiEs",
        "youtubeId": "JW-UDQbyiEs",
        "categorySlug": "airdrop-locked-crate-chinook",
        "stageSlug": "events_bosses"
      },
      {
        "id": "airdrop-locked-crate-chinook-Ya0rV1-MFcc",
        "title": "Rust – CH47 Chinook Heli Event, Locked Crate",
        "url": "https://www.youtube.com/watch?v=Ya0rV1-MFcc",
        "youtubeId": "Ya0rV1-MFcc",
        "categorySlug": "airdrop-locked-crate-chinook",
        "stageSlug": "events_bosses"
      },
      {
        "id": "airdrop-locked-crate-chinook-oMLFGIrHPFQ",
        "title": "Defending a LOCKED CRATE at Dome",
        "url": "https://www.youtube.com/watch?v=oMLFGIrHPFQ",
        "youtubeId": "oMLFGIrHPFQ",
        "categorySlug": "airdrop-locked-crate-chinook",
        "stageSlug": "events_bosses"
      },
      {
        "id": "airdrop-locked-crate-chinook-wWpUkmhY9c4",
        "title": "TAKING DOWN the CHINOOK helicopter",
        "url": "https://www.youtube.com/watch?v=wWpUkmhY9c4",
        "youtubeId": "wWpUkmhY9c4",
        "categorySlug": "airdrop-locked-crate-chinook",
        "stageSlug": "events_bosses"
      },
      {
        "id": "airdrop-locked-crate-chinook-P7dxVI9Rpp0",
        "title": "Rust Beginner Guide – Boote Chinook Airdrop",
        "url": "https://www.youtube.com/watch?v=P7dxVI9Rpp0",
        "youtubeId": "P7dxVI9Rpp0",
        "categorySlug": "airdrop-locked-crate-chinook",
        "stageSlug": "events_bosses"
      },
      {
        "id": "airdrop-locked-crate-chinook-gdpHWQGEA3M",
        "title": "Rust Chaos! Overpowered Crates & Chinook",
        "url": "https://www.youtube.com/watch?v=gdpHWQGEA3M",
        "youtubeId": "gdpHWQGEA3M",
        "categorySlug": "airdrop-locked-crate-chinook",
        "stageSlug": "events_bosses"
      },
      {
        "id": "airdrop-locked-crate-chinook-8lq-ChxyZ40",
        "title": "How to Open Locked Crates in Rust",
        "url": "https://www.youtube.com/watch?v=8lq-ChxyZ40",
        "youtubeId": "8lq-ChxyZ40",
        "categorySlug": "airdrop-locked-crate-chinook",
        "stageSlug": "events_bosses"
      }
    ]
  },
  {
    "slug": "modular-cars-autos",
    "title": "Modular Cars (Autos)",
    "count": 9,
    "stageSlug": "vehicles",
    "description": "Guides and tutorials for Modular Cars (Autos)",
    "videos": [
      {
        "id": "modular-cars-autos-3JHZjZ9NAvs",
        "title": "How to Make a Car in Rust Quick Guide",
        "url": "https://www.youtube.com/watch?v=3JHZjZ9NAvs",
        "youtubeId": "3JHZjZ9NAvs",
        "categorySlug": "modular-cars-autos",
        "stageSlug": "vehicles"
      },
      {
        "id": "modular-cars-autos-eihAv_MueUQ",
        "title": "The Best Vehicle Build In Rust 2024",
        "url": "https://www.youtube.com/watch?v=eihAv_MueUQ",
        "youtubeId": "eihAv_MueUQ",
        "categorySlug": "modular-cars-autos",
        "stageSlug": "vehicles"
      },
      {
        "id": "modular-cars-autos-qsOU4C_7icM",
        "title": "RUST How To Car Guide",
        "url": "https://www.youtube.com/watch?v=qsOU4C_7icM",
        "youtubeId": "qsOU4C_7icM",
        "categorySlug": "modular-cars-autos",
        "stageSlug": "vehicles"
      },
      {
        "id": "modular-cars-autos-nOL4lSOlMLw",
        "title": "Modular Vehicles Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=nOL4lSOlMLw",
        "youtubeId": "nOL4lSOlMLw",
        "categorySlug": "modular-cars-autos",
        "stageSlug": "vehicles"
      },
      {
        "id": "modular-cars-autos-apW0h0JP3Mw",
        "title": "Customize Your RUST Vehicle in Minutes",
        "url": "https://www.youtube.com/watch?v=apW0h0JP3Mw",
        "youtubeId": "apW0h0JP3Mw",
        "categorySlug": "modular-cars-autos",
        "stageSlug": "vehicles"
      },
      {
        "id": "modular-cars-autos-i1ZuSdfHobc",
        "title": "Rust NEW Modular Cars – Quick In-Depth",
        "url": "https://www.youtube.com/watch?v=i1ZuSdfHobc",
        "youtubeId": "i1ZuSdfHobc",
        "categorySlug": "modular-cars-autos",
        "stageSlug": "vehicles"
      },
      {
        "id": "modular-cars-autos-x9u9zBVUUSk",
        "title": "RUST – Best Modular Car Update Guide",
        "url": "https://www.youtube.com/watch?v=x9u9zBVUUSk",
        "youtubeId": "x9u9zBVUUSk",
        "categorySlug": "modular-cars-autos",
        "stageSlug": "vehicles"
      },
      {
        "id": "modular-cars-autos-VqOejl7OCfo",
        "title": "How To Use Vehicle Modules in Rust",
        "url": "https://www.youtube.com/watch?v=VqOejl7OCfo",
        "youtubeId": "VqOejl7OCfo",
        "categorySlug": "modular-cars-autos",
        "stageSlug": "vehicles"
      },
      {
        "id": "modular-cars-autos-jpFGfY0C4Og",
        "title": "MODULAR CARS – Update 2021 – RUST Guide",
        "url": "https://www.youtube.com/watch?v=jpFGfY0C4Og",
        "youtubeId": "jpFGfY0C4Og",
        "categorySlug": "modular-cars-autos",
        "stageSlug": "vehicles"
      }
    ]
  },
  {
    "slug": "u-boote-submarines",
    "title": "U-Boote (Submarines)",
    "count": 9,
    "stageSlug": "vehicles",
    "description": "Guides and tutorials for U-Boote (Submarines)",
    "videos": [
      {
        "id": "u-boote-submarines-LqWRNtfLl8Q",
        "title": "How to Control the Submarine in Rust",
        "url": "https://www.youtube.com/watch?v=LqWRNtfLl8Q",
        "youtubeId": "LqWRNtfLl8Q",
        "categorySlug": "u-boote-submarines",
        "stageSlug": "vehicles"
      },
      {
        "id": "u-boote-submarines-ZdQmgNJMbXo",
        "title": "How to Use the SUBMARINE & Get Torpedoes",
        "url": "https://www.youtube.com/watch?v=ZdQmgNJMbXo",
        "youtubeId": "ZdQmgNJMbXo",
        "categorySlug": "u-boote-submarines",
        "stageSlug": "vehicles"
      },
      {
        "id": "u-boote-submarines-DQA_PRl4T48",
        "title": "How to Fuel the Submarine in Rust",
        "url": "https://www.youtube.com/watch?v=DQA_PRl4T48",
        "youtubeId": "DQA_PRl4T48",
        "categorySlug": "u-boote-submarines",
        "stageSlug": "vehicles"
      },
      {
        "id": "u-boote-submarines-uRod97iNI1s",
        "title": "RUST: SUBMARINE TIPS! Things u NEED TO KNOW",
        "url": "https://www.youtube.com/watch?v=uRod97iNI1s",
        "youtubeId": "uRod97iNI1s",
        "categorySlug": "u-boote-submarines",
        "stageSlug": "vehicles"
      },
      {
        "id": "u-boote-submarines-2IpOueDVS04",
        "title": "How to Get a Submarine in Rust",
        "url": "https://www.youtube.com/watch?v=2IpOueDVS04",
        "youtubeId": "2IpOueDVS04",
        "categorySlug": "u-boote-submarines",
        "stageSlug": "vehicles"
      },
      {
        "id": "u-boote-submarines-GoJDeiFGTxA",
        "title": "Best Rust Console Underwater Labs & Sub Guide",
        "url": "https://www.youtube.com/watch?v=GoJDeiFGTxA",
        "youtubeId": "GoJDeiFGTxA",
        "categorySlug": "u-boote-submarines",
        "stageSlug": "vehicles"
      },
      {
        "id": "u-boote-submarines-Yj38XRHpD_o",
        "title": "Underwater Labs Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=Yj38XRHpD_o",
        "youtubeId": "Yj38XRHpD_o",
        "categorySlug": "u-boote-submarines",
        "stageSlug": "vehicles"
      },
      {
        "id": "u-boote-submarines-5cgKQhsgGHA",
        "title": "How to Use Torpedoes in Rust",
        "url": "https://www.youtube.com/watch?v=5cgKQhsgGHA",
        "youtubeId": "5cgKQhsgGHA",
        "categorySlug": "u-boote-submarines",
        "stageSlug": "vehicles"
      },
      {
        "id": "u-boote-submarines-bfxdIUg4FcE",
        "title": "Rust Underwater Labs Guide – 2 Minute Tutorial",
        "url": "https://www.youtube.com/watch?v=bfxdIUg4FcE",
        "youtubeId": "bfxdIUg4FcE",
        "categorySlug": "u-boote-submarines",
        "stageSlug": "vehicles"
      }
    ]
  },
  {
    "slug": "boote-rhib-rowboat",
    "title": "Boote (RHIB / Rowboat)",
    "count": 10,
    "stageSlug": "vehicles",
    "description": "Guides and tutorials for Boote (RHIB / Rowboat)",
    "videos": [
      {
        "id": "boote-rhib-rowboat-eS2Ldsbggrg",
        "title": "Rust Rowboat and RHIB base – Duo Trio",
        "url": "https://www.youtube.com/watch?v=eS2Ldsbggrg",
        "youtubeId": "eS2Ldsbggrg",
        "categorySlug": "boote-rhib-rowboat",
        "stageSlug": "vehicles"
      },
      {
        "id": "boote-rhib-rowboat-OkrsqhrAuks",
        "title": "The Perfect RHIB/Boat Base – Rust Build",
        "url": "https://www.youtube.com/watch?v=OkrsqhrAuks",
        "youtubeId": "OkrsqhrAuks",
        "categorySlug": "boote-rhib-rowboat",
        "stageSlug": "vehicles"
      },
      {
        "id": "boote-rhib-rowboat-zJY9d5iJShs",
        "title": "Rust – RowBoat Guide – Everything You Need",
        "url": "https://www.youtube.com/watch?v=zJY9d5iJShs",
        "youtubeId": "zJY9d5iJShs",
        "categorySlug": "boote-rhib-rowboat",
        "stageSlug": "vehicles"
      },
      {
        "id": "boote-rhib-rowboat-JAyKi6R10T4",
        "title": "Ultimate Boat Building & Defence Guide",
        "url": "https://www.youtube.com/watch?v=JAyKi6R10T4",
        "youtubeId": "JAyKi6R10T4",
        "categorySlug": "boote-rhib-rowboat",
        "stageSlug": "vehicles"
      },
      {
        "id": "boote-rhib-rowboat-s1qUiX6y8Ew",
        "title": "Rust Boat Base – Base Building Tutorial",
        "url": "https://www.youtube.com/watch?v=s1qUiX6y8Ew",
        "youtubeId": "s1qUiX6y8Ew",
        "categorySlug": "boote-rhib-rowboat",
        "stageSlug": "vehicles"
      },
      {
        "id": "boote-rhib-rowboat-gGqhOFsKPAw",
        "title": "How to Build a PERFECT BOAT in Rust",
        "url": "https://www.youtube.com/watch?v=gGqhOFsKPAw",
        "youtubeId": "gGqhOFsKPAw",
        "categorySlug": "boote-rhib-rowboat",
        "stageSlug": "vehicles"
      },
      {
        "id": "boote-rhib-rowboat-42-3d7VMOu4",
        "title": "The CHEAPEST Rust RHIB Boat Base EVER!!",
        "url": "https://www.youtube.com/watch?v=42-3d7VMOu4",
        "youtubeId": "42-3d7VMOu4",
        "categorySlug": "boote-rhib-rowboat",
        "stageSlug": "vehicles"
      },
      {
        "id": "boote-rhib-rowboat-EJaDfxb8ofE",
        "title": "How to Store Subs and RHIBs in Rust",
        "url": "https://www.youtube.com/watch?v=EJaDfxb8ofE",
        "youtubeId": "EJaDfxb8ofE",
        "categorySlug": "boote-rhib-rowboat",
        "stageSlug": "vehicles"
      },
      {
        "id": "boote-rhib-rowboat-IjCQ8d0XcO0",
        "title": "Shark – Simple RHIB Rust Boat Base",
        "url": "https://www.youtube.com/watch?v=IjCQ8d0XcO0",
        "youtubeId": "IjCQ8d0XcO0",
        "categorySlug": "boote-rhib-rowboat",
        "stageSlug": "vehicles"
      },
      {
        "id": "boote-rhib-rowboat-aEOkD7U0u7w",
        "title": "How To Build a Boat In Rust",
        "url": "https://www.youtube.com/watch?v=aEOkD7U0u7w",
        "youtubeId": "aEOkD7U0u7w",
        "categorySlug": "boote-rhib-rowboat",
        "stageSlug": "vehicles"
      }
    ]
  },
  {
    "slug": "minicopter-scrap-heli-fliegen",
    "title": "Minicopter & Scrap Heli (fliegen)",
    "count": 9,
    "stageSlug": "economy_resources",
    "description": "Guides and tutorials for Minicopter & Scrap Heli (fliegen)",
    "videos": [
      {
        "id": "minicopter-scrap-heli-fliegen-5WRcJNJIIBQ",
        "title": "Minicopter & Scrap Heli Guide – How To Fly",
        "url": "https://www.youtube.com/watch?v=5WRcJNJIIBQ",
        "youtubeId": "5WRcJNJIIBQ",
        "categorySlug": "minicopter-scrap-heli-fliegen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "minicopter-scrap-heli-fliegen-pFBtGwgqhT0",
        "title": "How to fly the Minicopter & Scrap Transport",
        "url": "https://www.youtube.com/watch?v=pFBtGwgqhT0",
        "youtubeId": "pFBtGwgqhT0",
        "categorySlug": "minicopter-scrap-heli-fliegen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "minicopter-scrap-heli-fliegen-2GpaFsx0kOs",
        "title": "How to Fly a Minicopter in Rust (Full Guide)",
        "url": "https://www.youtube.com/watch?v=2GpaFsx0kOs",
        "youtubeId": "2GpaFsx0kOs",
        "categorySlug": "minicopter-scrap-heli-fliegen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "minicopter-scrap-heli-fliegen-OovOTiJITEw",
        "title": "How To Fly MiniCopter & Scrap Heli",
        "url": "https://www.youtube.com/watch?v=OovOTiJITEw",
        "youtubeId": "OovOTiJITEw",
        "categorySlug": "minicopter-scrap-heli-fliegen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "minicopter-scrap-heli-fliegen-wys2e01c9WQ",
        "title": "Rust – How to Fly a Minicopter",
        "url": "https://www.youtube.com/watch?v=wys2e01c9WQ",
        "youtubeId": "wys2e01c9WQ",
        "categorySlug": "minicopter-scrap-heli-fliegen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "minicopter-scrap-heli-fliegen-NDO8YpOX0Sg",
        "title": "How To Fly a Minicopter In Rust",
        "url": "https://www.youtube.com/watch?v=NDO8YpOX0Sg",
        "youtubeId": "NDO8YpOX0Sg",
        "categorySlug": "minicopter-scrap-heli-fliegen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "minicopter-scrap-heli-fliegen-YTFf47CEkbw",
        "title": "Rust – How to fly Minicopter and Scrapcopter",
        "url": "https://www.youtube.com/watch?v=YTFf47CEkbw",
        "youtubeId": "YTFf47CEkbw",
        "categorySlug": "minicopter-scrap-heli-fliegen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "minicopter-scrap-heli-fliegen-KRwWzHrtlq8",
        "title": "The Best Minicopter Pilot Teaches Us How",
        "url": "https://www.youtube.com/watch?v=KRwWzHrtlq8",
        "youtubeId": "KRwWzHrtlq8",
        "categorySlug": "minicopter-scrap-heli-fliegen",
        "stageSlug": "economy_resources"
      },
      {
        "id": "minicopter-scrap-heli-fliegen-dQA6E2mbAVQ",
        "title": "Minicopter Heli Guide – How To Fly 2025",
        "url": "https://www.youtube.com/watch?v=dQA6E2mbAVQ",
        "youtubeId": "dQA6E2mbAVQ",
        "categorySlug": "minicopter-scrap-heli-fliegen",
        "stageSlug": "economy_resources"
      }
    ]
  },
  {
    "slug": "hei-luftballon-hot-air-balloon",
    "title": "Heißluftballon (Hot Air Balloon)",
    "count": 9,
    "stageSlug": "vehicles",
    "description": "Guides and tutorials for Heißluftballon (Hot Air Balloon)",
    "videos": [
      {
        "id": "hei-luftballon-hot-air-balloon-eJlJ-wAjVW8",
        "title": "BEGINNERS GUIDE: How To Fly Air Balloons",
        "url": "https://www.youtube.com/watch?v=eJlJ-wAjVW8",
        "youtubeId": "eJlJ-wAjVW8",
        "categorySlug": "hei-luftballon-hot-air-balloon",
        "stageSlug": "vehicles"
      },
      {
        "id": "hei-luftballon-hot-air-balloon-rSXgXpRDT9Y",
        "title": "How to Fly and Control the Hot Air Balloon",
        "url": "https://www.youtube.com/watch?v=rSXgXpRDT9Y",
        "youtubeId": "rSXgXpRDT9Y",
        "categorySlug": "hei-luftballon-hot-air-balloon",
        "stageSlug": "vehicles"
      },
      {
        "id": "hei-luftballon-hot-air-balloon-uxAS9J0euk0",
        "title": "How to Fly Hot Air Balloons in Rust",
        "url": "https://www.youtube.com/watch?v=uxAS9J0euk0",
        "youtubeId": "uxAS9J0euk0",
        "categorySlug": "hei-luftballon-hot-air-balloon",
        "stageSlug": "vehicles"
      },
      {
        "id": "hei-luftballon-hot-air-balloon-m5NWz-8uTmI",
        "title": "How to Get a Hot Air Balloon in Rust",
        "url": "https://www.youtube.com/watch?v=m5NWz-8uTmI",
        "youtubeId": "m5NWz-8uTmI",
        "categorySlug": "hei-luftballon-hot-air-balloon",
        "stageSlug": "vehicles"
      },
      {
        "id": "hei-luftballon-hot-air-balloon-mFNaJgcv9BU",
        "title": "Rust – How to Use the Hot Air Balloon",
        "url": "https://www.youtube.com/watch?v=mFNaJgcv9BU",
        "youtubeId": "mFNaJgcv9BU",
        "categorySlug": "hei-luftballon-hot-air-balloon",
        "stageSlug": "vehicles"
      },
      {
        "id": "hei-luftballon-hot-air-balloon-VsuVlTYVaVM",
        "title": "How to Fuel the Hot Air Balloon",
        "url": "https://www.youtube.com/watch?v=VsuVlTYVaVM",
        "youtubeId": "VsuVlTYVaVM",
        "categorySlug": "hei-luftballon-hot-air-balloon",
        "stageSlug": "vehicles"
      },
      {
        "id": "hei-luftballon-hot-air-balloon-DdqxZE10Thw",
        "title": "How to Fly and Control the Hot Air Balloon 2",
        "url": "https://www.youtube.com/watch?v=DdqxZE10Thw",
        "youtubeId": "DdqxZE10Thw",
        "categorySlug": "hei-luftballon-hot-air-balloon",
        "stageSlug": "vehicles"
      },
      {
        "id": "hei-luftballon-hot-air-balloon-Iqi0TO4nnYI",
        "title": "How To Get Hot Air Balloon in Rust",
        "url": "https://www.youtube.com/watch?v=Iqi0TO4nnYI",
        "youtubeId": "Iqi0TO4nnYI",
        "categorySlug": "hei-luftballon-hot-air-balloon",
        "stageSlug": "vehicles"
      },
      {
        "id": "hei-luftballon-hot-air-balloon-UyoJJLjVHJ0",
        "title": "How To Get And Use Hot Air Balloon Armor",
        "url": "https://www.youtube.com/watch?v=UyoJJLjVHJ0",
        "youtubeId": "UyoJJLjVHJ0",
        "categorySlug": "hei-luftballon-hot-air-balloon",
        "stageSlug": "vehicles"
      }
    ]
  },
  {
    "slug": "z-ge-workcart-above-ground-rail",
    "title": "Züge / Workcart / Above-Ground Rail",
    "count": 10,
    "stageSlug": "start_here",
    "description": "Guides and tutorials for Züge / Workcart / Above-Ground Rail",
    "videos": [
      {
        "id": "z-ge-workcart-above-ground-rail-420Qha-ZXu0",
        "title": "Work Cart Tunnel Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=420Qha-ZXu0",
        "youtubeId": "420Qha-ZXu0",
        "categorySlug": "z-ge-workcart-above-ground-rail",
        "stageSlug": "start_here"
      },
      {
        "id": "z-ge-workcart-above-ground-rail-Pe5ZFGDGV48",
        "title": "Rust – Above-ground Trains Update – Everything",
        "url": "https://www.youtube.com/watch?v=Pe5ZFGDGV48",
        "youtubeId": "Pe5ZFGDGV48",
        "categorySlug": "z-ge-workcart-above-ground-rail",
        "stageSlug": "start_here"
      },
      {
        "id": "z-ge-workcart-above-ground-rail-JFp1JUAukes",
        "title": "RUST: New Workcarts and Underground rail",
        "url": "https://www.youtube.com/watch?v=JFp1JUAukes",
        "youtubeId": "JFp1JUAukes",
        "categorySlug": "z-ge-workcart-above-ground-rail",
        "stageSlug": "start_here"
      },
      {
        "id": "z-ge-workcart-above-ground-rail-xDBlJXYGwWI",
        "title": "RUST Above-Ground Trains are HERE!!",
        "url": "https://www.youtube.com/watch?v=xDBlJXYGwWI",
        "youtubeId": "xDBlJXYGwWI",
        "categorySlug": "z-ge-workcart-above-ground-rail",
        "stageSlug": "start_here"
      },
      {
        "id": "z-ge-workcart-above-ground-rail-ntoudT6eZuA",
        "title": "Train Yard Monument Loot & Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=ntoudT6eZuA",
        "youtubeId": "ntoudT6eZuA",
        "categorySlug": "z-ge-workcart-above-ground-rail",
        "stageSlug": "start_here"
      },
      {
        "id": "z-ge-workcart-above-ground-rail--6mFK1Tb9eA",
        "title": "Freight Transit Line Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=-6mFK1Tb9eA",
        "youtubeId": "-6mFK1Tb9eA",
        "categorySlug": "z-ge-workcart-above-ground-rail",
        "stageSlug": "start_here"
      },
      {
        "id": "z-ge-workcart-above-ground-rail-x-IRp2wrUq0",
        "title": "Rust – How to Drive Trains, Attach and Detach",
        "url": "https://www.youtube.com/watch?v=x-IRp2wrUq0",
        "youtubeId": "x-IRp2wrUq0",
        "categorySlug": "z-ge-workcart-above-ground-rail",
        "stageSlug": "start_here"
      },
      {
        "id": "z-ge-workcart-above-ground-rail-a30ETOIV4Ss",
        "title": "NEW Train Event – Train Yard Monument",
        "url": "https://www.youtube.com/watch?v=a30ETOIV4Ss",
        "youtubeId": "a30ETOIV4Ss",
        "categorySlug": "z-ge-workcart-above-ground-rail",
        "stageSlug": "start_here"
      },
      {
        "id": "z-ge-workcart-above-ground-rail-uE_oQy121I8",
        "title": "Rust Train Yard Expansion Overview",
        "url": "https://www.youtube.com/watch?v=uE_oQy121I8",
        "youtubeId": "uE_oQy121I8",
        "categorySlug": "z-ge-workcart-above-ground-rail",
        "stageSlug": "start_here"
      },
      {
        "id": "z-ge-workcart-above-ground-rail-dOdFE3FI6l0",
        "title": "Ultimate Rust TRAINYARD Puzzle Guide",
        "url": "https://www.youtube.com/watch?v=dOdFE3FI6l0",
        "youtubeId": "dOdFE3FI6l0",
        "categorySlug": "z-ge-workcart-above-ground-rail",
        "stageSlug": "start_here"
      }
    ]
  },
  {
    "slug": "raiding-guide-kosten-basics",
    "title": "Raiding Guide (Kosten & Basics)",
    "count": 9,
    "stageSlug": "combat_raiding",
    "description": "Guides and tutorials for Raiding Guide (Kosten & Basics)",
    "videos": [
      {
        "id": "raiding-guide-kosten-basics-GVA-RLboMI0",
        "title": "The ULTIMATE Rust Raiding Guide In 2026",
        "url": "https://www.youtube.com/watch?v=GVA-RLboMI0",
        "youtubeId": "GVA-RLboMI0",
        "categorySlug": "raiding-guide-kosten-basics",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "raiding-guide-kosten-basics-MoiAyqT6UyA",
        "title": "Ultimate Raiding Guide – Most Efficient Way",
        "url": "https://www.youtube.com/watch?v=MoiAyqT6UyA",
        "youtubeId": "MoiAyqT6UyA",
        "categorySlug": "raiding-guide-kosten-basics",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "raiding-guide-kosten-basics-Ny7fL1RQPoY",
        "title": "Ultimate Solo Raiding Guide – Best Strategies",
        "url": "https://www.youtube.com/watch?v=Ny7fL1RQPoY",
        "youtubeId": "Ny7fL1RQPoY",
        "categorySlug": "raiding-guide-kosten-basics",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "raiding-guide-kosten-basics-XWlNXkitj7o",
        "title": "NEW Raiding META? – Ultimate Primitive Raiding",
        "url": "https://www.youtube.com/watch?v=XWlNXkitj7o",
        "youtubeId": "XWlNXkitj7o",
        "categorySlug": "raiding-guide-kosten-basics",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "raiding-guide-kosten-basics-Q3sZdKLzSgE",
        "title": "Raiding Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=Q3sZdKLzSgE",
        "youtubeId": "Q3sZdKLzSgE",
        "categorySlug": "raiding-guide-kosten-basics",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "raiding-guide-kosten-basics-w0QQJ07Ohq8",
        "title": "A Beginner's Step-By-Step Guide to Raiding",
        "url": "https://www.youtube.com/watch?v=w0QQJ07Ohq8",
        "youtubeId": "w0QQJ07Ohq8",
        "categorySlug": "raiding-guide-kosten-basics",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "raiding-guide-kosten-basics-JziB9Zt7uR0",
        "title": "The Raid Base Setup Guide Everyone Needs",
        "url": "https://www.youtube.com/watch?v=JziB9Zt7uR0",
        "youtubeId": "JziB9Zt7uR0",
        "categorySlug": "raiding-guide-kosten-basics",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "raiding-guide-kosten-basics-GCn-wUanF2k",
        "title": "The Cheapest Ways To RAID In Rust",
        "url": "https://www.youtube.com/watch?v=GCn-wUanF2k",
        "youtubeId": "GCn-wUanF2k",
        "categorySlug": "raiding-guide-kosten-basics",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "raiding-guide-kosten-basics-y6ncGBiMOL4",
        "title": "BEGINNERS GUIDE: 5 Tips and Strategies for Raiding",
        "url": "https://www.youtube.com/watch?v=y6ncGBiMOL4",
        "youtubeId": "y6ncGBiMOL4",
        "categorySlug": "raiding-guide-kosten-basics",
        "stageSlug": "combat_raiding"
      }
    ]
  },
  {
    "slug": "wie-raiden-sprengstoff-einsetzen",
    "title": "Wie raiden (Sprengstoff einsetzen)",
    "count": 10,
    "stageSlug": "combat_raiding",
    "description": "Guides and tutorials for Wie raiden (Sprengstoff einsetzen)",
    "videos": [
      {
        "id": "wie-raiden-sprengstoff-einsetzen-MoiAyqT6UyA",
        "title": "Ultimate Raiding Guide – Most Efficient Way",
        "url": "https://www.youtube.com/watch?v=MoiAyqT6UyA",
        "youtubeId": "MoiAyqT6UyA",
        "categorySlug": "wie-raiden-sprengstoff-einsetzen",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "wie-raiden-sprengstoff-einsetzen-7VrvVsXeTaQ",
        "title": "Rust How to Raid 2021",
        "url": "https://www.youtube.com/watch?v=7VrvVsXeTaQ",
        "youtubeId": "7VrvVsXeTaQ",
        "categorySlug": "wie-raiden-sprengstoff-einsetzen",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "wie-raiden-sprengstoff-einsetzen-Q3sZdKLzSgE",
        "title": "Raiding Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=Q3sZdKLzSgE",
        "youtubeId": "Q3sZdKLzSgE",
        "categorySlug": "wie-raiden-sprengstoff-einsetzen",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "wie-raiden-sprengstoff-einsetzen-Ny7fL1RQPoY",
        "title": "Ultimate Solo Raiding Guide",
        "url": "https://www.youtube.com/watch?v=Ny7fL1RQPoY",
        "youtubeId": "Ny7fL1RQPoY",
        "categorySlug": "wie-raiden-sprengstoff-einsetzen",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "wie-raiden-sprengstoff-einsetzen-McRM05n6Aig",
        "title": "How To Get And Use Explosives in Rust",
        "url": "https://www.youtube.com/watch?v=McRM05n6Aig",
        "youtubeId": "McRM05n6Aig",
        "categorySlug": "wie-raiden-sprengstoff-einsetzen",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "wie-raiden-sprengstoff-einsetzen-sr0J7BZL55Y",
        "title": "How To Rust: Day 44! – Using C4, Rockets",
        "url": "https://www.youtube.com/watch?v=sr0J7BZL55Y",
        "youtubeId": "sr0J7BZL55Y",
        "categorySlug": "wie-raiden-sprengstoff-einsetzen",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "wie-raiden-sprengstoff-einsetzen-cqRTbM7hOfc",
        "title": "Rust Tips – How To Get Explosives FAST!",
        "url": "https://www.youtube.com/watch?v=cqRTbM7hOfc",
        "youtubeId": "cqRTbM7hOfc",
        "categorySlug": "wie-raiden-sprengstoff-einsetzen",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "wie-raiden-sprengstoff-einsetzen-XWlNXkitj7o",
        "title": "NEW Raiding META?",
        "url": "https://www.youtube.com/watch?v=XWlNXkitj7o",
        "youtubeId": "XWlNXkitj7o",
        "categorySlug": "wie-raiden-sprengstoff-einsetzen",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "wie-raiden-sprengstoff-einsetzen-RODA9LNkCzY",
        "title": "How To Use Explosives in Rust",
        "url": "https://www.youtube.com/watch?v=RODA9LNkCzY",
        "youtubeId": "RODA9LNkCzY",
        "categorySlug": "wie-raiden-sprengstoff-einsetzen",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "wie-raiden-sprengstoff-einsetzen-gxiYodTjN70",
        "title": "The SMART WAY to Raiding Rust Bases",
        "url": "https://www.youtube.com/watch?v=gxiYodTjN70",
        "youtubeId": "gxiYodTjN70",
        "categorySlug": "wie-raiden-sprengstoff-einsetzen",
        "stageSlug": "combat_raiding"
      }
    ]
  },
  {
    "slug": "pvp-guide",
    "title": "PvP Guide",
    "count": 10,
    "stageSlug": "combat_raiding",
    "description": "Guides and tutorials for PvP Guide",
    "videos": [
      {
        "id": "pvp-guide-coG1qbzsN8U",
        "title": "15 PRO Tips to WIN MORE FIGHTS in Rust!",
        "url": "https://www.youtube.com/watch?v=coG1qbzsN8U",
        "youtubeId": "coG1qbzsN8U",
        "categorySlug": "pvp-guide",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "pvp-guide-JW2FwsgFRPM",
        "title": "How to WIN EVERY FIGHT in Rust (20 Pro Tips)",
        "url": "https://www.youtube.com/watch?v=JW2FwsgFRPM",
        "youtubeId": "JW2FwsgFRPM",
        "categorySlug": "pvp-guide",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "pvp-guide-pilTZe1SSBg",
        "title": "How to ACTUALLY FIGHT like a PRO in RUST",
        "url": "https://www.youtube.com/watch?v=pilTZe1SSBg",
        "youtubeId": "pilTZe1SSBg",
        "categorySlug": "pvp-guide",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "pvp-guide-DfRlCWeoxvs",
        "title": "RUST – HOW TO ALWAYS WIN GUNFIGHTS",
        "url": "https://www.youtube.com/watch?v=DfRlCWeoxvs",
        "youtubeId": "DfRlCWeoxvs",
        "categorySlug": "pvp-guide",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "pvp-guide-OWZkwcheNu8",
        "title": "HOW TO WIN MORE FIGHTS CONSISTENTLY",
        "url": "https://www.youtube.com/watch?v=OWZkwcheNu8",
        "youtubeId": "OWZkwcheNu8",
        "categorySlug": "pvp-guide",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "pvp-guide-dnpWl_Npd1o",
        "title": "HOW TO GET GOOD AT RUST PVP 2024",
        "url": "https://www.youtube.com/watch?v=dnpWl_Npd1o",
        "youtubeId": "dnpWl_Npd1o",
        "categorySlug": "pvp-guide",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "pvp-guide-CPf9_s9f9BU",
        "title": "PvP Tips n' Tricks – Rust Console",
        "url": "https://www.youtube.com/watch?v=CPf9_s9f9BU",
        "youtubeId": "CPf9_s9f9BU",
        "categorySlug": "pvp-guide",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "pvp-guide-KfbJECZ9udM",
        "title": "RUST – Absolute beginners guide – Low Skill PvP",
        "url": "https://www.youtube.com/watch?v=KfbJECZ9udM",
        "youtubeId": "KfbJECZ9udM",
        "categorySlug": "pvp-guide",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "pvp-guide-xpsitYA7Cgs",
        "title": "3 Best Tips To Win More Primitive Fights",
        "url": "https://www.youtube.com/watch?v=xpsitYA7Cgs",
        "youtubeId": "xpsitYA7Cgs",
        "categorySlug": "pvp-guide",
        "stageSlug": "combat_raiding"
      },
      {
        "id": "pvp-guide-8hteJtJt0_M",
        "title": "How to GET BETTER at BOW PVP Rust",
        "url": "https://www.youtube.com/watch?v=8hteJtJt0_M",
        "youtubeId": "8hteJtJt0_M",
        "categorySlug": "pvp-guide",
        "stageSlug": "combat_raiding"
      }
    ]
  },
  {
    "slug": "recoil-control-aim-training",
    "title": "Recoil Control / Aim Training",
    "count": 10,
    "stageSlug": "start_here",
    "description": "Guides and tutorials for Recoil Control / Aim Training",
    "videos": [
      {
        "id": "recoil-control-aim-training--stHqrthxE0",
        "title": "How to INSTANTLY Improve Your Recoil",
        "url": "https://www.youtube.com/watch?v=-stHqrthxE0",
        "youtubeId": "-stHqrthxE0",
        "categorySlug": "recoil-control-aim-training",
        "stageSlug": "start_here"
      },
      {
        "id": "recoil-control-aim-training-WqJIC0JosaI",
        "title": "How To Get PERFECT AIM in Rust (No BS Guide)",
        "url": "https://www.youtube.com/watch?v=WqJIC0JosaI",
        "youtubeId": "WqJIC0JosaI",
        "categorySlug": "recoil-control-aim-training",
        "stageSlug": "start_here"
      },
      {
        "id": "recoil-control-aim-training-mVlCUvmUMDQ",
        "title": "Where to AIM TRAIN in Rust",
        "url": "https://www.youtube.com/watch?v=mVlCUvmUMDQ",
        "youtubeId": "mVlCUvmUMDQ",
        "categorySlug": "recoil-control-aim-training",
        "stageSlug": "start_here"
      },
      {
        "id": "recoil-control-aim-training-G6rKUUblNSM",
        "title": "A Rust Veteran's Guide on Recoil Control",
        "url": "https://www.youtube.com/watch?v=G6rKUUblNSM",
        "youtubeId": "G6rKUUblNSM",
        "categorySlug": "recoil-control-aim-training",
        "stageSlug": "start_here"
      },
      {
        "id": "recoil-control-aim-training-nG_de-sBgQ0",
        "title": "CONTROLLING RECOIL and AIM Tutorial 2024",
        "url": "https://www.youtube.com/watch?v=nG_de-sBgQ0",
        "youtubeId": "nG_de-sBgQ0",
        "categorySlug": "recoil-control-aim-training",
        "stageSlug": "start_here"
      },
      {
        "id": "recoil-control-aim-training-j5aVK9qMT3k",
        "title": "6 Tips That Will INSTANTLY FIX Your Aim",
        "url": "https://www.youtube.com/watch?v=j5aVK9qMT3k",
        "youtubeId": "j5aVK9qMT3k",
        "categorySlug": "recoil-control-aim-training",
        "stageSlug": "start_here"
      },
      {
        "id": "recoil-control-aim-training-rCvJY7vpzZ4",
        "title": "A RUST VETERAN'S GUIDE on RECOIL CONTROL",
        "url": "https://www.youtube.com/watch?v=rCvJY7vpzZ4",
        "youtubeId": "rCvJY7vpzZ4",
        "categorySlug": "recoil-control-aim-training",
        "stageSlug": "start_here"
      },
      {
        "id": "recoil-control-aim-training-5S7ux8K1at4",
        "title": "How to Improve Aiming in Rust",
        "url": "https://www.youtube.com/watch?v=5S7ux8K1at4",
        "youtubeId": "5S7ux8K1at4",
        "categorySlug": "recoil-control-aim-training",
        "stageSlug": "start_here"
      },
      {
        "id": "recoil-control-aim-training-AsC3P-0Esw4",
        "title": "How to AIM TRAIN in Rust 2021",
        "url": "https://www.youtube.com/watch?v=AsC3P-0Esw4",
        "youtubeId": "AsC3P-0Esw4",
        "categorySlug": "recoil-control-aim-training",
        "stageSlug": "start_here"
      },
      {
        "id": "recoil-control-aim-training-ZjA9kJNZtLM",
        "title": "PERFECT RECOIL in RUST – EZ3 Aim Train",
        "url": "https://www.youtube.com/watch?v=ZjA9kJNZtLM",
        "youtubeId": "ZjA9kJNZtLM",
        "categorySlug": "recoil-control-aim-training",
        "stageSlug": "start_here"
      }
    ]
  },
  {
    "slug": "loadouts-roaming-r-stung-ausr-stung",
    "title": "Loadouts & Roaming (Rüstung & Ausrüstung)",
    "count": 10,
    "stageSlug": "start_here",
    "description": "Guides and tutorials for Loadouts & Roaming (Rüstung & Ausrüstung)",
    "videos": [
      {
        "id": "loadouts-roaming-r-stung-ausr-stung-futa2Pr-KgM",
        "title": "Armor & Clothing Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=futa2Pr-KgM",
        "youtubeId": "futa2Pr-KgM",
        "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
        "stageSlug": "start_here"
      },
      {
        "id": "loadouts-roaming-r-stung-ausr-stung-bNqbB_aHEtY",
        "title": "The Only Rust Armor Guide You'll Ever Need",
        "url": "https://www.youtube.com/watch?v=bNqbB_aHEtY",
        "youtubeId": "bNqbB_aHEtY",
        "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
        "stageSlug": "start_here"
      },
      {
        "id": "loadouts-roaming-r-stung-ausr-stung-U2tuehA7nLc",
        "title": "The CHEAPEST Armor Setup That Actually Works",
        "url": "https://www.youtube.com/watch?v=U2tuehA7nLc",
        "youtubeId": "U2tuehA7nLc",
        "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
        "stageSlug": "start_here"
      },
      {
        "id": "loadouts-roaming-r-stung-ausr-stung-tLvyS_y181A",
        "title": "Armor & Plating Inserts Guide – Rust Tutorial",
        "url": "https://www.youtube.com/watch?v=tLvyS_y181A",
        "youtubeId": "tLvyS_y181A",
        "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
        "stageSlug": "start_here"
      },
      {
        "id": "loadouts-roaming-r-stung-ausr-stung-cdNu_TNmwp8",
        "title": "ARMOR OVERVIEW – Projectile protection",
        "url": "https://www.youtube.com/watch?v=cdNu_TNmwp8",
        "youtubeId": "cdNu_TNmwp8",
        "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
        "stageSlug": "start_here"
      },
      {
        "id": "loadouts-roaming-r-stung-ausr-stung-WFmF4MgF5EI",
        "title": "Rust Tutorial: Best Armor and Clothing",
        "url": "https://www.youtube.com/watch?v=WFmF4MgF5EI",
        "youtubeId": "WFmF4MgF5EI",
        "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
        "stageSlug": "start_here"
      },
      {
        "id": "loadouts-roaming-r-stung-ausr-stung-lQ7Ov6XNIIk",
        "title": "RU RUST – Best & Worst Armour Stats Guide",
        "url": "https://www.youtube.com/watch?v=lQ7Ov6XNIIk",
        "youtubeId": "lQ7Ov6XNIIk",
        "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
        "stageSlug": "start_here"
      },
      {
        "id": "loadouts-roaming-r-stung-ausr-stung-5j9FDs8gmA0",
        "title": "Best Primitive Armor Kit in Rust",
        "url": "https://www.youtube.com/watch?v=5j9FDs8gmA0",
        "youtubeId": "5j9FDs8gmA0",
        "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
        "stageSlug": "start_here"
      },
      {
        "id": "loadouts-roaming-r-stung-ausr-stung-foZFOTgklPY",
        "title": "Why you should always roam with Primitive",
        "url": "https://www.youtube.com/watch?v=foZFOTgklPY",
        "youtubeId": "foZFOTgklPY",
        "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
        "stageSlug": "start_here"
      },
      {
        "id": "loadouts-roaming-r-stung-ausr-stung-3H2r7K28WoY",
        "title": "Top Armor Kit in Rust",
        "url": "https://www.youtube.com/watch?v=3H2r7K28WoY",
        "youtubeId": "3H2r7K28WoY",
        "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
        "stageSlug": "start_here"
      }
    ]
  }
];

export const ALL_RUST_GUIDE_VIDEOS: RustGuideVideo[] = [
  {
    "id": "beginner-einsteiger-guide-Wc0ZJo06oAw",
    "title": "Der ultimative Rust-Anfängerguide",
    "url": "https://www.youtube.com/watch?v=Wc0ZJo06oAw",
    "youtubeId": "Wc0ZJo06oAw",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-gPa_ZK8JBtw",
    "title": "Der ultimative RUST-Anfängerleitfaden",
    "url": "https://www.youtube.com/watch?v=gPa_ZK8JBtw",
    "youtubeId": "gPa_ZK8JBtw",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-xmfY_V5OA2Y",
    "title": "Ein vollständiger Leitfaden für Rust",
    "url": "https://www.youtube.com/watch?v=xmfY_V5OA2Y",
    "youtubeId": "xmfY_V5OA2Y",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-8n2tptpwQuw",
    "title": "101 Rust-Tipps für jeden Spieler",
    "url": "https://www.youtube.com/watch?v=8n2tptpwQuw",
    "youtubeId": "8n2tptpwQuw",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-L1tw1MKqpAc",
    "title": "Über 100 Rust-Tipps & Tricks",
    "url": "https://www.youtube.com/watch?v=L1tw1MKqpAc",
    "youtubeId": "L1tw1MKqpAc",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-kr0spV5-NRI",
    "title": "How to 100% Progress in Rust",
    "url": "https://www.youtube.com/watch?v=kr0spV5-NRI",
    "youtubeId": "kr0spV5-NRI",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-veGr_qgz3Mk",
    "title": "Der BESTE Rust Anfänger Guide",
    "url": "https://www.youtube.com/watch?v=veGr_qgz3Mk",
    "youtubeId": "veGr_qgz3Mk",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-ENMi9FVyowI",
    "title": "Wie man 2025 mit RUST beginnt",
    "url": "https://www.youtube.com/watch?v=ENMi9FVyowI",
    "youtubeId": "ENMi9FVyowI",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-cttZEQacYQE",
    "title": "Der perfekte Start- und Basisguide",
    "url": "https://www.youtube.com/watch?v=cttZEQacYQE",
    "youtubeId": "cttZEQacYQE",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-mkfERHvOXoE",
    "title": "Rust Beginner Guide 2026",
    "url": "https://www.youtube.com/watch?v=mkfERHvOXoE",
    "youtubeId": "mkfERHvOXoE",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-fPk-fyP9MFM",
    "title": "Ultimate Beginner's Guide",
    "url": "https://www.youtube.com/watch?v=fPk-fyP9MFM",
    "youtubeId": "fPk-fyP9MFM",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-NqaO-wMEwSk",
    "title": "How to Have a Perfect Start",
    "url": "https://www.youtube.com/watch?v=NqaO-wMEwSk",
    "youtubeId": "NqaO-wMEwSk",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-OHJCcV6gtog",
    "title": "A Complete Beginner's Guide",
    "url": "https://www.youtube.com/watch?v=OHJCcV6gtog",
    "youtubeId": "OHJCcV6gtog",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-HtKxMNTOlB4",
    "title": "20 Rust-Tipps, die ich gerne wusste",
    "url": "https://www.youtube.com/watch?v=HtKxMNTOlB4",
    "youtubeId": "HtKxMNTOlB4",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-trjVKr5PEqo",
    "title": "So spielt man Rust SOLO",
    "url": "https://www.youtube.com/watch?v=trjVKr5PEqo",
    "youtubeId": "trjVKr5PEqo",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-jw6UFiNMPRI",
    "title": "I tried Rust as a complete beginner",
    "url": "https://www.youtube.com/watch?v=jw6UFiNMPRI",
    "youtubeId": "jw6UFiNMPRI",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-xsq2htu3gy0",
    "title": "50+ Rust Tips Most Players Miss",
    "url": "https://www.youtube.com/watch?v=xsq2htu3gy0",
    "youtubeId": "xsq2htu3gy0",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-Y7d4PMNtxrY",
    "title": "25 Dinge für jeden Solo",
    "url": "https://www.youtube.com/watch?v=Y7d4PMNtxrY",
    "youtubeId": "Y7d4PMNtxrY",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "beginner-einsteiger-guide-OKHeEVEHtjY",
    "title": "Ultimativer Anfängerleitfaden",
    "url": "https://www.youtube.com/watch?v=OKHeEVEHtjY",
    "youtubeId": "OKHeEVEHtjY",
    "categorySlug": "beginner-einsteiger-guide",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-kr0spV5-NRI",
    "title": "How to 100% Progress in Rust",
    "url": "https://www.youtube.com/watch?v=kr0spV5-NRI",
    "youtubeId": "kr0spV5-NRI",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-xmfY_V5OA2Y",
    "title": "Ein vollständiger Leitfaden",
    "url": "https://www.youtube.com/watch?v=xmfY_V5OA2Y",
    "youtubeId": "xmfY_V5OA2Y",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-Q_5GK7LV5oo",
    "title": "Veteran's Ultimate Beginner Guide",
    "url": "https://www.youtube.com/watch?v=Q_5GK7LV5oo",
    "youtubeId": "Q_5GK7LV5oo",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-Wc0ZJo06oAw",
    "title": "Der ultimative Rust-Anfängerguide",
    "url": "https://www.youtube.com/watch?v=Wc0ZJo06oAw",
    "youtubeId": "Wc0ZJo06oAw",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-NqaO-wMEwSk",
    "title": "How to Have a Perfect Start",
    "url": "https://www.youtube.com/watch?v=NqaO-wMEwSk",
    "youtubeId": "NqaO-wMEwSk",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-gPa_ZK8JBtw",
    "title": "Der ultimative RUST-Anfängerleitfaden",
    "url": "https://www.youtube.com/watch?v=gPa_ZK8JBtw",
    "youtubeId": "gPa_ZK8JBtw",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-N4QO8boc0Qg",
    "title": "How a Solo with 11,362 Hours",
    "url": "https://www.youtube.com/watch?v=N4QO8boc0Qg",
    "youtubeId": "N4QO8boc0Qg",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-trjVKr5PEqo",
    "title": "So spielt man Rust SOLO",
    "url": "https://www.youtube.com/watch?v=trjVKr5PEqo",
    "youtubeId": "trjVKr5PEqo",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-6ScoiF0wPi4",
    "title": "Die besten Strategien für den Start",
    "url": "https://www.youtube.com/watch?v=6ScoiF0wPi4",
    "youtubeId": "6ScoiF0wPi4",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-ENMi9FVyowI",
    "title": "Wie man 2025 mit RUST beginnt",
    "url": "https://www.youtube.com/watch?v=ENMi9FVyowI",
    "youtubeId": "ENMi9FVyowI",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-yH5uS-3aiMg",
    "title": "Meistere den Rust Wipe Day",
    "url": "https://www.youtube.com/watch?v=yH5uS-3aiMg",
    "youtubeId": "yH5uS-3aiMg",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-IkpkGy6VHzQ",
    "title": "How to Progress as a Solo",
    "url": "https://www.youtube.com/watch?v=IkpkGy6VHzQ",
    "youtubeId": "IkpkGy6VHzQ",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-OHJCcV6gtog",
    "title": "A Complete Beginner's Guide",
    "url": "https://www.youtube.com/watch?v=OHJCcV6gtog",
    "youtubeId": "OHJCcV6gtog",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-hrHMjg0lAwk",
    "title": "Ultimate Snowball Guide",
    "url": "https://www.youtube.com/watch?v=hrHMjg0lAwk",
    "youtubeId": "hrHMjg0lAwk",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-X0nt5S21Aho",
    "title": "How a Solo with 14,274 hours",
    "url": "https://www.youtube.com/watch?v=X0nt5S21Aho",
    "youtubeId": "X0nt5S21Aho",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-aI3uceNGhyo",
    "title": "The Solo Strategy Explained",
    "url": "https://www.youtube.com/watch?v=aI3uceNGhyo",
    "youtubeId": "aI3uceNGhyo",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-U5EFZAj1cXs",
    "title": "Der Plan für den Einstieg",
    "url": "https://www.youtube.com/watch?v=U5EFZAj1cXs",
    "youtubeId": "U5EFZAj1cXs",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-jw6UFiNMPRI",
    "title": "I tried Rust as a complete beginner",
    "url": "https://www.youtube.com/watch?v=jw6UFiNMPRI",
    "youtubeId": "jw6UFiNMPRI",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "progression-fortschritt-Yn_f5XuT9u4",
    "title": "I Tested 4 Secret Solo Methods",
    "url": "https://www.youtube.com/watch?v=Yn_f5XuT9u4",
    "youtubeId": "Yn_f5XuT9u4",
    "categorySlug": "progression-fortschritt",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-R4BfyuOhn9Q",
    "title": "Leitfaden zum Technologiebaum",
    "url": "https://www.youtube.com/watch?v=R4BfyuOhn9Q",
    "youtubeId": "R4BfyuOhn9Q",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-9qgmClfvlRY",
    "title": "Neuer Blueprint-Fragment-Guide",
    "url": "https://www.youtube.com/watch?v=9qgmClfvlRY",
    "youtubeId": "9qgmClfvlRY",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-qA_Ci1mzWO4",
    "title": "The New Workbench Tech Tree",
    "url": "https://www.youtube.com/watch?v=qA_Ci1mzWO4",
    "youtubeId": "qA_Ci1mzWO4",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-Q_5GK7LV5oo",
    "title": "Veteran's Ultimate Beginner Guide",
    "url": "https://www.youtube.com/watch?v=Q_5GK7LV5oo",
    "youtubeId": "Q_5GK7LV5oo",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-p4pOPc8gYQU",
    "title": "New Tech Tree Update",
    "url": "https://www.youtube.com/watch?v=p4pOPc8gYQU",
    "youtubeId": "p4pOPc8gYQU",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-J9CdDwFLDLc",
    "title": "Der schnellste Weg zur Werkbank",
    "url": "https://www.youtube.com/watch?v=J9CdDwFLDLc",
    "youtubeId": "J9CdDwFLDLc",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-ln5GcMwrB8I",
    "title": "Die beste Komponenten-Rangliste",
    "url": "https://www.youtube.com/watch?v=ln5GcMwrB8I",
    "youtubeId": "ln5GcMwrB8I",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-G4Q02pYk4IE",
    "title": "7 Easy Ways to Get Guns",
    "url": "https://www.youtube.com/watch?v=G4Q02pYk4IE",
    "youtubeId": "G4Q02pYk4IE",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-RXOYRxhHu3g",
    "title": "Strategies You NEED To Know",
    "url": "https://www.youtube.com/watch?v=RXOYRxhHu3g",
    "youtubeId": "RXOYRxhHu3g",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-e2u2nSuvlE0",
    "title": "Beginners Guide: What Are BPs",
    "url": "https://www.youtube.com/watch?v=e2u2nSuvlE0",
    "youtubeId": "e2u2nSuvlE0",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-oWd7t7Cy1fY",
    "title": "Ultimativer Industrieleitfaden",
    "url": "https://www.youtube.com/watch?v=oWd7t7Cy1fY",
    "youtubeId": "oWd7t7Cy1fY",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-j7-5gjLmeLE",
    "title": "Werkbänke kurz & präzise",
    "url": "https://www.youtube.com/watch?v=j7-5gjLmeLE",
    "youtubeId": "j7-5gjLmeLE",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-95uFFMv7ics",
    "title": "New Rust Workbench Upgrades",
    "url": "https://www.youtube.com/watch?v=95uFFMv7ics",
    "youtubeId": "95uFFMv7ics",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-Jftebxn0CBg",
    "title": "Wie man Werkbank-Upgrades nutzt",
    "url": "https://www.youtube.com/watch?v=Jftebxn0CBg",
    "youtubeId": "Jftebxn0CBg",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-yJAxMIBhYT8",
    "title": "New Workbenches / Tech Tree",
    "url": "https://www.youtube.com/watch?v=yJAxMIBhYT8",
    "youtubeId": "yJAxMIBhYT8",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-CceTzki5zx8",
    "title": "New Workbench System Tutorial",
    "url": "https://www.youtube.com/watch?v=CceTzki5zx8",
    "youtubeId": "CceTzki5zx8",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "workbench-tech-tree-blueprints-tPg65pIFpv0",
    "title": "Wo man Werkbank-Upgrades findet",
    "url": "https://www.youtube.com/watch?v=tPg65pIFpv0",
    "youtubeId": "tPg65pIFpv0",
    "categorySlug": "workbench-tech-tree-blueprints",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-trjVKr5PEqo",
    "title": "So spielt man Rust SOLO",
    "url": "https://www.youtube.com/watch?v=trjVKr5PEqo",
    "youtubeId": "trjVKr5PEqo",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-N4QO8boc0Qg",
    "title": "How a Solo with 11,362 Hours",
    "url": "https://www.youtube.com/watch?v=N4QO8boc0Qg",
    "youtubeId": "N4QO8boc0Qg",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-ctLS9PBdt0A",
    "title": "How a solo with 14,782 Hours",
    "url": "https://www.youtube.com/watch?v=ctLS9PBdt0A",
    "youtubeId": "ctLS9PBdt0A",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-aI3uceNGhyo",
    "title": "The Solo Strategy Explained",
    "url": "https://www.youtube.com/watch?v=aI3uceNGhyo",
    "youtubeId": "aI3uceNGhyo",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-gPa_ZK8JBtw",
    "title": "Der ultimative RUST-Anfängerleitfaden",
    "url": "https://www.youtube.com/watch?v=gPa_ZK8JBtw",
    "youtubeId": "gPa_ZK8JBtw",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-Wc0ZJo06oAw",
    "title": "Der ultimative Rust-Anfängerguide",
    "url": "https://www.youtube.com/watch?v=Wc0ZJo06oAw",
    "youtubeId": "Wc0ZJo06oAw",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-X0nt5S21Aho",
    "title": "How a Solo with 14,274 hours",
    "url": "https://www.youtube.com/watch?v=X0nt5S21Aho",
    "youtubeId": "X0nt5S21Aho",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-zXl4ZrM8Yq4",
    "title": "How a solo builder with 12,487h",
    "url": "https://www.youtube.com/watch?v=zXl4ZrM8Yq4",
    "youtubeId": "zXl4ZrM8Yq4",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-kr0spV5-NRI",
    "title": "How to 100% Progress in Rust",
    "url": "https://www.youtube.com/watch?v=kr0spV5-NRI",
    "youtubeId": "kr0spV5-NRI",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-3gCjjwZ_hsw",
    "title": "How a Solo with 6,454 Hours",
    "url": "https://www.youtube.com/watch?v=3gCjjwZ_hsw",
    "youtubeId": "3gCjjwZ_hsw",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-ICKtd31l3jw",
    "title": "The Reality of New Progression",
    "url": "https://www.youtube.com/watch?v=ICKtd31l3jw",
    "youtubeId": "ICKtd31l3jw",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-NNzAFRFwCpc",
    "title": "Solo Rust will never be the same",
    "url": "https://www.youtube.com/watch?v=NNzAFRFwCpc",
    "youtubeId": "NNzAFRFwCpc",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-4czl4yXIYtA",
    "title": "Rust - The Solo Life V14",
    "url": "https://www.youtube.com/watch?v=4czl4yXIYtA",
    "youtubeId": "4czl4yXIYtA",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-Q_5GK7LV5oo",
    "title": "Veteran's Ultimate Beginner Guide",
    "url": "https://www.youtube.com/watch?v=Q_5GK7LV5oo",
    "youtubeId": "Q_5GK7LV5oo",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-GHbIwk7RnUM",
    "title": "How I took over the Jungle",
    "url": "https://www.youtube.com/watch?v=GHbIwk7RnUM",
    "youtubeId": "GHbIwk7RnUM",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-IkpkGy6VHzQ",
    "title": "How to Progress as a Solo",
    "url": "https://www.youtube.com/watch?v=IkpkGy6VHzQ",
    "youtubeId": "IkpkGy6VHzQ",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-D6KRx2Iq6AE",
    "title": "I created the New Solo strat",
    "url": "https://www.youtube.com/watch?v=D6KRx2Iq6AE",
    "youtubeId": "D6KRx2Iq6AE",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-v1nVdoKD-FM",
    "title": "Rust's Best Solo Teaches Us",
    "url": "https://www.youtube.com/watch?v=v1nVdoKD-FM",
    "youtubeId": "v1nVdoKD-FM",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-4V-HogxU_OY",
    "title": "I designed a new Solo Strategy",
    "url": "https://www.youtube.com/watch?v=4V-HogxU_OY",
    "youtubeId": "4V-HogxU_OY",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "solo-survival-xmfY_V5OA2Y",
    "title": "Ein vollständiger Leitfaden",
    "url": "https://www.youtube.com/watch?v=xmfY_V5OA2Y",
    "youtubeId": "xmfY_V5OA2Y",
    "categorySlug": "solo-survival",
    "stageSlug": "start_here"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-p3OdpHJNIl4",
    "title": "Farming & Genetics Guide",
    "url": "https://www.youtube.com/watch?v=p3OdpHJNIl4",
    "youtubeId": "p3OdpHJNIl4",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-qPA-AZ0Gaew",
    "title": "How to Build a Basic Hemp Farm",
    "url": "https://www.youtube.com/watch?v=qPA-AZ0Gaew",
    "youtubeId": "qPA-AZ0Gaew",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-EeLINRhtBG0",
    "title": "Farming 3.0 – Ultimativer Leitfaden",
    "url": "https://www.youtube.com/watch?v=EeLINRhtBG0",
    "youtubeId": "EeLINRhtBG0",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-2UHWLiYxLCU",
    "title": "I built an ILLEGAL cloth cartel",
    "url": "https://www.youtube.com/watch?v=2UHWLiYxLCU",
    "youtubeId": "2UHWLiYxLCU",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-k6M6Zjozlwk",
    "title": "Genetics Guide | What They Are",
    "url": "https://www.youtube.com/watch?v=k6M6Zjozlwk",
    "youtubeId": "k6M6Zjozlwk",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-m9y6ACVQR-M",
    "title": "Crossbreed a God Clone (lazy)",
    "url": "https://www.youtube.com/watch?v=m9y6ACVQR-M",
    "youtubeId": "m9y6ACVQR-M",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-qmCaE0liZLM",
    "title": "I Spent a Week Building a Hemp Farm",
    "url": "https://www.youtube.com/watch?v=qmCaE0liZLM",
    "youtubeId": "qmCaE0liZLM",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-n5lmlO0wwKw",
    "title": "Cheapest Cloth Farm in Rust",
    "url": "https://www.youtube.com/watch?v=n5lmlO0wwKw",
    "youtubeId": "n5lmlO0wwKw",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-y5RqXTxiGkA",
    "title": "We Built the Greatest Cloth Farm",
    "url": "https://www.youtube.com/watch?v=y5RqXTxiGkA",
    "youtubeId": "y5RqXTxiGkA",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-4ElucWHyfbM",
    "title": "How to get perfect clones",
    "url": "https://www.youtube.com/watch?v=4ElucWHyfbM",
    "youtubeId": "4ElucWHyfbM",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-z1Xs8KNpGwk",
    "title": "How To Build Cloth Farm for Solos",
    "url": "https://www.youtube.com/watch?v=z1Xs8KNpGwk",
    "youtubeId": "z1Xs8KNpGwk",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-E3EWe2p6I44",
    "title": "Wie ein Profi-Farmer farmt",
    "url": "https://www.youtube.com/watch?v=E3EWe2p6I44",
    "youtubeId": "E3EWe2p6I44",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-eavfD_HCHu4",
    "title": "10 Farming-Tipps",
    "url": "https://www.youtube.com/watch?v=eavfD_HCHu4",
    "youtubeId": "eavfD_HCHu4",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-DDfjh_c2p7k",
    "title": "Cheap Ocean/Saltwater Farm",
    "url": "https://www.youtube.com/watch?v=DDfjh_c2p7k",
    "youtubeId": "DDfjh_c2p7k",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-cbgfyBssSwg",
    "title": "Hemp Farm Starter Base",
    "url": "https://www.youtube.com/watch?v=cbgfyBssSwg",
    "youtubeId": "cbgfyBssSwg",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-z5SKkOXL_ms",
    "title": "Der Arbeiter – Basis",
    "url": "https://www.youtube.com/watch?v=z5SKkOXL_ms",
    "youtubeId": "z5SKkOXL_ms",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-HZ1yazJcOkg",
    "title": "The Smallest Auto Farm Base",
    "url": "https://www.youtube.com/watch?v=HZ1yazJcOkg",
    "youtubeId": "HZ1yazJcOkg",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-nwWXbMeRB74",
    "title": "Compact 3x3 Farm Base",
    "url": "https://www.youtube.com/watch?v=nwWXbMeRB74",
    "youtubeId": "nwWXbMeRB74",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-0kjPpKWg0ug",
    "title": "How to Make a Hemp and Berry Farm",
    "url": "https://www.youtube.com/watch?v=0kjPpKWg0ug",
    "youtubeId": "0kjPpKWg0ug",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "stoff-hanf-farm-cloth-farm-JhMv_FuPKLU",
    "title": "Hemp Farming Documentary",
    "url": "https://www.youtube.com/watch?v=JhMv_FuPKLU",
    "youtubeId": "JhMv_FuPKLU",
    "categorySlug": "stoff-hanf-farm-cloth-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-ohG7OYsA81I",
    "title": "Ways to Get Boom Without Farming",
    "url": "https://www.youtube.com/watch?v=ohG7OYsA81I",
    "youtubeId": "ohG7OYsA81I",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-3bPe9CTfkFc",
    "title": "How To Get Sulfur Easily",
    "url": "https://www.youtube.com/watch?v=3bPe9CTfkFc",
    "youtubeId": "3bPe9CTfkFc",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-7s-RaVquK_I",
    "title": "Knotenpunkte-Leitfaden",
    "url": "https://www.youtube.com/watch?v=7s-RaVquK_I",
    "youtubeId": "7s-RaVquK_I",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-WpN9pzg-MKY",
    "title": "Kennen Spieler mit wenig Zeit...",
    "url": "https://www.youtube.com/watch?v=WpN9pzg-MKY",
    "youtubeId": "WpN9pzg-MKY",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-ZRmjCNSd1gg",
    "title": "i farmed one million sulfur",
    "url": "https://www.youtube.com/watch?v=ZRmjCNSd1gg",
    "youtubeId": "ZRmjCNSd1gg",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-JyJiTD9pWsM",
    "title": "Die effizienteste Methode",
    "url": "https://www.youtube.com/watch?v=JyJiTD9pWsM",
    "youtubeId": "JyJiTD9pWsM",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-1cBHdTG6Ah8",
    "title": "I Automated the Sulfur Quarry",
    "url": "https://www.youtube.com/watch?v=1cBHdTG6Ah8",
    "youtubeId": "1cBHdTG6Ah8",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-dhO6vxJuXRw",
    "title": "The Sulfur Guardians",
    "url": "https://www.youtube.com/watch?v=dhO6vxJuXRw",
    "youtubeId": "dhO6vxJuXRw",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-rPZyWaWK65Y",
    "title": "Farming 1,000,000 Sulfur",
    "url": "https://www.youtube.com/watch?v=rPZyWaWK65Y",
    "youtubeId": "rPZyWaWK65Y",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-kMgPjJmdCCs",
    "title": "Automatisierte Schwefelfarm",
    "url": "https://www.youtube.com/watch?v=kMgPjJmdCCs",
    "youtubeId": "kMgPjJmdCCs",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-y2jY34q2-T8",
    "title": "How a 55,000 Hour Godsquad Farms",
    "url": "https://www.youtube.com/watch?v=y2jY34q2-T8",
    "youtubeId": "y2jY34q2-T8",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-BddzzUCeJBQ",
    "title": "Sulfur Generator",
    "url": "https://www.youtube.com/watch?v=BddzzUCeJBQ",
    "youtubeId": "BddzzUCeJBQ",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-NhGizHFoI6o",
    "title": "I Struck Gold in this Rare Farm",
    "url": "https://www.youtube.com/watch?v=NhGizHFoI6o",
    "youtubeId": "NhGizHFoI6o",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-3BV66OxkYA4",
    "title": "The Sulfur Cartel",
    "url": "https://www.youtube.com/watch?v=3BV66OxkYA4",
    "youtubeId": "3BV66OxkYA4",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-ArJG93zi5X4",
    "title": "I Claimed a Swamp with Infinite",
    "url": "https://www.youtube.com/watch?v=ArJG93zi5X4",
    "youtubeId": "ArJG93zi5X4",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-Vh9YwOlQ598",
    "title": "How we got 1,000,000 Sulfur",
    "url": "https://www.youtube.com/watch?v=Vh9YwOlQ598",
    "youtubeId": "Vh9YwOlQ598",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-QzK35xBDzWQ",
    "title": "Schwefelsteinbruch",
    "url": "https://www.youtube.com/watch?v=QzK35xBDzWQ",
    "youtubeId": "QzK35xBDzWQ",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "schwefel-farm-sulfur-SRuJiWBiTRY",
    "title": "I Defended 250k Sulfur",
    "url": "https://www.youtube.com/watch?v=SRuJiWBiTRY",
    "youtubeId": "SRuJiWBiTRY",
    "categorySlug": "schwefel-farm-sulfur",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-kAOjuWTlxeE",
    "title": "The Best Ways to Farm HQM",
    "url": "https://www.youtube.com/watch?v=kAOjuWTlxeE",
    "youtubeId": "kAOjuWTlxeE",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-Tkg4R1mlJVs",
    "title": "How to get HQM in Rust",
    "url": "https://www.youtube.com/watch?v=Tkg4R1mlJVs",
    "youtubeId": "Tkg4R1mlJVs",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-vPVyWbT4hh0",
    "title": "Kurzanleitung – 9000 Schrott",
    "url": "https://www.youtube.com/watch?v=vPVyWbT4hh0",
    "youtubeId": "vPVyWbT4hh0",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-7s-RaVquK_I",
    "title": "Knotenpunkte-Leitfaden",
    "url": "https://www.youtube.com/watch?v=7s-RaVquK_I",
    "youtubeId": "7s-RaVquK_I",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-aj9pMpehhEI",
    "title": "Best Ways to Farm Scrap",
    "url": "https://www.youtube.com/watch?v=aj9pMpehhEI",
    "youtubeId": "aj9pMpehhEI",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-xnqxNC2OQxM",
    "title": "Wie man hochwertiges Metall farmt",
    "url": "https://www.youtube.com/watch?v=xnqxNC2OQxM",
    "youtubeId": "xnqxNC2OQxM",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-3I3ZVUEYmBg",
    "title": "Zahlen Sie mit diesem Trick",
    "url": "https://www.youtube.com/watch?v=3I3ZVUEYmBg",
    "youtubeId": "3I3ZVUEYmBg",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-rT1-1mw2Pro",
    "title": "How To Get Scrap Fast",
    "url": "https://www.youtube.com/watch?v=rT1-1mw2Pro",
    "youtubeId": "rT1-1mw2Pro",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-z_sjmDbu4Nc",
    "title": "How To Get Metal Fragments",
    "url": "https://www.youtube.com/watch?v=z_sjmDbu4Nc",
    "youtubeId": "z_sjmDbu4Nc",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-5wBZw5Bp1yw",
    "title": "How to get High Quality Metal",
    "url": "https://www.youtube.com/watch?v=5wBZw5Bp1yw",
    "youtubeId": "5wBZw5Bp1yw",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-kdMJv5YgQdE",
    "title": "Console: The Safest Way",
    "url": "https://www.youtube.com/watch?v=kdMJv5YgQdE",
    "youtubeId": "kdMJv5YgQdE",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-oQ0nC_8-rkc",
    "title": "How to use the Junkyard Crane",
    "url": "https://www.youtube.com/watch?v=oQ0nC_8-rkc",
    "youtubeId": "oQ0nC_8-rkc",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-JPKQUJ57-JU",
    "title": "So verwenden Sie den HQM-Steinbruch",
    "url": "https://www.youtube.com/watch?v=JPKQUJ57-JU",
    "youtubeId": "JPKQUJ57-JU",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-AYymth531fk",
    "title": "How to use The Giant Excavator",
    "url": "https://www.youtube.com/watch?v=AYymth531fk",
    "youtubeId": "AYymth531fk",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-s70aHJjPINM",
    "title": "Maximiere deine Abbaurate",
    "url": "https://www.youtube.com/watch?v=s70aHJjPINM",
    "youtubeId": "s70aHJjPINM",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-FguUzQkjfRY",
    "title": "How to Harvest Metal Ore",
    "url": "https://www.youtube.com/watch?v=FguUzQkjfRY",
    "youtubeId": "FguUzQkjfRY",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-C_aZ_lrJVUs",
    "title": "Rust für Dummies – schnelles Metall",
    "url": "https://www.youtube.com/watch?v=C_aZ_lrJVUs",
    "youtubeId": "C_aZ_lrJVUs",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-Akf9BtC1WWg",
    "title": "How to Get High Quality Metal",
    "url": "https://www.youtube.com/watch?v=Akf9BtC1WWg",
    "youtubeId": "Akf9BtC1WWg",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "metall-hqm-farm-Y3wM_Ag9WGQ",
    "title": "Stein-, Metall-, Schwefelnutzung",
    "url": "https://www.youtube.com/watch?v=Y3wM_Ag9WGQ",
    "youtubeId": "Y3wM_Ag9WGQ",
    "categorySlug": "metall-hqm-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "holz-stein-farm-_NWZIbrOhq4",
    "title": "How to Collect Wood – Quick",
    "url": "https://www.youtube.com/watch?v=_NWZIbrOhq4",
    "youtubeId": "_NWZIbrOhq4",
    "categorySlug": "holz-stein-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "holz-stein-farm-7s-RaVquK_I",
    "title": "Knotenpunkte-Leitfaden",
    "url": "https://www.youtube.com/watch?v=7s-RaVquK_I",
    "youtubeId": "7s-RaVquK_I",
    "categorySlug": "holz-stein-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "holz-stein-farm-q6ZYkzKRt8g",
    "title": "Fastest way to farm stone",
    "url": "https://www.youtube.com/watch?v=q6ZYkzKRt8g",
    "youtubeId": "q6ZYkzKRt8g",
    "categorySlug": "holz-stein-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "holz-stein-farm-6IveGZBXVaU",
    "title": "Beginner Guide: How to Farm",
    "url": "https://www.youtube.com/watch?v=6IveGZBXVaU",
    "youtubeId": "6IveGZBXVaU",
    "categorySlug": "holz-stein-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "holz-stein-farm-jFqBAIlyTq0",
    "title": "Guide to Basic Resources",
    "url": "https://www.youtube.com/watch?v=jFqBAIlyTq0",
    "youtubeId": "jFqBAIlyTq0",
    "categorySlug": "holz-stein-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "holz-stein-farm-aj9pMpehhEI",
    "title": "Best Ways to Farm Scrap",
    "url": "https://www.youtube.com/watch?v=aj9pMpehhEI",
    "youtubeId": "aj9pMpehhEI",
    "categorySlug": "holz-stein-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "holz-stein-farm-xNSZ4vS8BM4",
    "title": "Console Beginners Guide",
    "url": "https://www.youtube.com/watch?v=xNSZ4vS8BM4",
    "youtubeId": "xNSZ4vS8BM4",
    "categorySlug": "holz-stein-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "holz-stein-farm-rT1-1mw2Pro",
    "title": "How To Get Scrap Fast",
    "url": "https://www.youtube.com/watch?v=rT1-1mw2Pro",
    "youtubeId": "rT1-1mw2Pro",
    "categorySlug": "holz-stein-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "holz-stein-farm-RB2qil0OelM",
    "title": "So erhalten Sie Stein in Rust",
    "url": "https://www.youtube.com/watch?v=RB2qil0OelM",
    "youtubeId": "RB2qil0OelM",
    "categorySlug": "holz-stein-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "holz-stein-farm-jKJO7rAa2vU",
    "title": "Wie man schnell Stein farmt",
    "url": "https://www.youtube.com/watch?v=jKJO7rAa2vU",
    "youtubeId": "jKJO7rAa2vU",
    "categorySlug": "holz-stein-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-vPVyWbT4hh0",
    "title": "Kurzanleitung – 9000 Schrott",
    "url": "https://www.youtube.com/watch?v=vPVyWbT4hh0",
    "youtubeId": "vPVyWbT4hh0",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-aj9pMpehhEI",
    "title": "Best Ways to Farm Scrap",
    "url": "https://www.youtube.com/watch?v=aj9pMpehhEI",
    "youtubeId": "aj9pMpehhEI",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-rT1-1mw2Pro",
    "title": "How To Get Scrap Fast",
    "url": "https://www.youtube.com/watch?v=rT1-1mw2Pro",
    "youtubeId": "rT1-1mw2Pro",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-xX8rUXQobxA",
    "title": "Bei weitem das BESTE sichere",
    "url": "https://www.youtube.com/watch?v=xX8rUXQobxA",
    "youtubeId": "xX8rUXQobxA",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-lUJc0Vmo_QE",
    "title": "5 unbedingt erforderliche Routen",
    "url": "https://www.youtube.com/watch?v=lUJc0Vmo_QE",
    "youtubeId": "lUJc0Vmo_QE",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-fVfwDfaIp60",
    "title": "How To Get 20,000 Scrap an Hour",
    "url": "https://www.youtube.com/watch?v=fVfwDfaIp60",
    "youtubeId": "fVfwDfaIp60",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-Ma4MmFpd8xU",
    "title": "Schrott-Generierungsbasis",
    "url": "https://www.youtube.com/watch?v=Ma4MmFpd8xU",
    "youtubeId": "Ma4MmFpd8xU",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-9aIGe1Y7KTA",
    "title": "The Minnow Fish Trap Farm",
    "url": "https://www.youtube.com/watch?v=9aIGe1Y7KTA",
    "youtubeId": "9aIGe1Y7KTA",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-PtkQykRNqnc",
    "title": "I Built an unlimited scrap farm",
    "url": "https://www.youtube.com/watch?v=PtkQykRNqnc",
    "youtubeId": "PtkQykRNqnc",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm--i8nlSXvUuQ",
    "title": "Get 2000+ Scrap",
    "url": "https://www.youtube.com/watch?v=-i8nlSXvUuQ",
    "youtubeId": "-i8nlSXvUuQ",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-yqid8U77pnc",
    "title": "The New Fast way to farm Scrap",
    "url": "https://www.youtube.com/watch?v=yqid8U77pnc",
    "youtubeId": "yqid8U77pnc",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-JqU5xvUto3s",
    "title": "Wie komme ich im frühen Spiel",
    "url": "https://www.youtube.com/watch?v=JqU5xvUto3s",
    "youtubeId": "JqU5xvUto3s",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-NjFT0Qa3L20",
    "title": "Werde reich mit deiner Basis",
    "url": "https://www.youtube.com/watch?v=NjFT0Qa3L20",
    "youtubeId": "NjFT0Qa3L20",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-aw_e4Xa9FY8",
    "title": "Ultimative Fischfallen-Farm",
    "url": "https://www.youtube.com/watch?v=aw_e4Xa9FY8",
    "youtubeId": "aw_e4Xa9FY8",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-LXd0ePDTwFg",
    "title": "Infinite AFK Scrap Farm",
    "url": "https://www.youtube.com/watch?v=LXd0ePDTwFg",
    "youtubeId": "LXd0ePDTwFg",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-vimhQkVILf4",
    "title": "Low Risk & Easy Scrap Farming",
    "url": "https://www.youtube.com/watch?v=vimhQkVILf4",
    "youtubeId": "vimhQkVILf4",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-WFicKjb6pjU",
    "title": "How To Get Scrap",
    "url": "https://www.youtube.com/watch?v=WFicKjb6pjU",
    "youtubeId": "WFicKjb6pjU",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "scrap-farm-z5SKkOXL_ms",
    "title": "Der Arbeiter – Basis",
    "url": "https://www.youtube.com/watch?v=z5SKkOXL_ms",
    "youtubeId": "z5SKkOXL_ms",
    "categorySlug": "scrap-farm",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-iiiKs-d2lW0",
    "title": "Minderwertigen Kraftstoff herstellen",
    "url": "https://www.youtube.com/watch?v=iiiKs-d2lW0",
    "youtubeId": "iiiKs-d2lW0",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-m_cxomH2wZU",
    "title": "Ultimate Low Grade Fuel Guide",
    "url": "https://www.youtube.com/watch?v=m_cxomH2wZU",
    "youtubeId": "m_cxomH2wZU",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-bqqST9L_edQ",
    "title": "Das Thunfischdosen-Basisdesign",
    "url": "https://www.youtube.com/watch?v=bqqST9L_edQ",
    "youtubeId": "bqqST9L_edQ",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-AMNbbbBlO38",
    "title": "Quick guide (Beginners)",
    "url": "https://www.youtube.com/watch?v=AMNbbbBlO38",
    "youtubeId": "AMNbbbBlO38",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-m9nvE7HoV58",
    "title": "How To Get Low Grade Fuel",
    "url": "https://www.youtube.com/watch?v=m9nvE7HoV58",
    "youtubeId": "m9nvE7HoV58",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-0devbJL3AQg",
    "title": "How to Farm Low Grade for TONS",
    "url": "https://www.youtube.com/watch?v=0devbJL3AQg",
    "youtubeId": "0devbJL3AQg",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-hMjVbTcQapM",
    "title": "Beginners Quick Start Guide",
    "url": "https://www.youtube.com/watch?v=hMjVbTcQapM",
    "youtubeId": "hMjVbTcQapM",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-8S1YR_fy3YM",
    "title": "How to Easily Get Low Grade",
    "url": "https://www.youtube.com/watch?v=8S1YR_fy3YM",
    "youtubeId": "8S1YR_fy3YM",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-eX6wS28cXvc",
    "title": "Infinite Low Grade",
    "url": "https://www.youtube.com/watch?v=eX6wS28cXvc",
    "youtubeId": "eX6wS28cXvc",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-6UOmr-U2CrE",
    "title": "Raffinerien richtig nutzen",
    "url": "https://www.youtube.com/watch?v=6UOmr-U2CrE",
    "youtubeId": "6UOmr-U2CrE",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-d6KBZlNCFD8",
    "title": "So erhalten Sie minderwertigen",
    "url": "https://www.youtube.com/watch?v=d6KBZlNCFD8",
    "youtubeId": "d6KBZlNCFD8",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-rdXoqMXPTiQ",
    "title": "Diesel Fuel Guide",
    "url": "https://www.youtube.com/watch?v=rdXoqMXPTiQ",
    "youtubeId": "rdXoqMXPTiQ",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-LP2QJNSpmqQ",
    "title": "How to automate Low Grade Fuel",
    "url": "https://www.youtube.com/watch?v=LP2QJNSpmqQ",
    "youtubeId": "LP2QJNSpmqQ",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-LSJ7lqTrfu8",
    "title": "How to get Low Grade Fuel",
    "url": "https://www.youtube.com/watch?v=LSJ7lqTrfu8",
    "youtubeId": "LSJ7lqTrfu8",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-zPUIX5ys6GM",
    "title": "Best Low Grade Fuel Farm",
    "url": "https://www.youtube.com/watch?v=zPUIX5ys6GM",
    "youtubeId": "zPUIX5ys6GM",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-vZM_Iub68mQ",
    "title": "Farming Tons of Low Grade",
    "url": "https://www.youtube.com/watch?v=vZM_Iub68mQ",
    "youtubeId": "vZM_Iub68mQ",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-Aodat5CcXRU",
    "title": "How to Get Low Grade Fuel",
    "url": "https://www.youtube.com/watch?v=Aodat5CcXRU",
    "youtubeId": "Aodat5CcXRU",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-Ao-lWrH2QtI",
    "title": "Anfänger Guide (Lowgrade)",
    "url": "https://www.youtube.com/watch?v=Ao-lWrH2QtI",
    "youtubeId": "Ao-lWrH2QtI",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "low-grade-fuel-crude-oil-ibUeQOCUyW8",
    "title": "Rust für Anfänger – Kurzanleitung",
    "url": "https://www.youtube.com/watch?v=ibUeQOCUyW8",
    "youtubeId": "ibUeQOCUyW8",
    "categorySlug": "low-grade-fuel-crude-oil",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-p3OdpHJNIl4",
    "title": "Farming & Genetics Guide",
    "url": "https://www.youtube.com/watch?v=p3OdpHJNIl4",
    "youtubeId": "p3OdpHJNIl4",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-ln5GcMwrB8I",
    "title": "Beste Komponenten-Rangliste",
    "url": "https://www.youtube.com/watch?v=ln5GcMwrB8I",
    "youtubeId": "ln5GcMwrB8I",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-EeLINRhtBG0",
    "title": "Farming 3.0 – Ultimativer Leitfaden",
    "url": "https://www.youtube.com/watch?v=EeLINRhtBG0",
    "youtubeId": "EeLINRhtBG0",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-aj9pMpehhEI",
    "title": "Best Ways to Farm Scrap",
    "url": "https://www.youtube.com/watch?v=aj9pMpehhEI",
    "youtubeId": "aj9pMpehhEI",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-vPVyWbT4hh0",
    "title": "Kurzanleitung – 9000 Schrott",
    "url": "https://www.youtube.com/watch?v=vPVyWbT4hh0",
    "youtubeId": "vPVyWbT4hh0",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-eavfD_HCHu4",
    "title": "10 Farming-Tipps",
    "url": "https://www.youtube.com/watch?v=eavfD_HCHu4",
    "youtubeId": "eavfD_HCHu4",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-dM6QvlF7aAI",
    "title": "Full Underground Tunnel Guide",
    "url": "https://www.youtube.com/watch?v=dM6QvlF7aAI",
    "youtubeId": "dM6QvlF7aAI",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-aO1Br2ysi5U",
    "title": "Ultimate Loot Guide",
    "url": "https://www.youtube.com/watch?v=aO1Br2ysi5U",
    "youtubeId": "aO1Br2ysi5U",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-rT1-1mw2Pro",
    "title": "How To Get Scrap Fast",
    "url": "https://www.youtube.com/watch?v=rT1-1mw2Pro",
    "youtubeId": "rT1-1mw2Pro",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-9qgmClfvlRY",
    "title": "Neuer Blueprint-Fragment-Guide",
    "url": "https://www.youtube.com/watch?v=9qgmClfvlRY",
    "youtubeId": "9qgmClfvlRY",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-7s-RaVquK_I",
    "title": "Knotenpunkte-Leitfaden",
    "url": "https://www.youtube.com/watch?v=7s-RaVquK_I",
    "youtubeId": "7s-RaVquK_I",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-fvRAZ0rF3Q8",
    "title": "What Every Electrical Component",
    "url": "https://www.youtube.com/watch?v=fvRAZ0rF3Q8",
    "youtubeId": "fvRAZ0rF3Q8",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-1EhnL6P15VM",
    "title": "Komponenten – was behalten",
    "url": "https://www.youtube.com/watch?v=1EhnL6P15VM",
    "youtubeId": "1EhnL6P15VM",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-kAOjuWTlxeE",
    "title": "Best Ways to Farm HQM",
    "url": "https://www.youtube.com/watch?v=kAOjuWTlxeE",
    "youtubeId": "kAOjuWTlxeE",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-oWd7t7Cy1fY",
    "title": "Ultimativer Industrieleitfaden",
    "url": "https://www.youtube.com/watch?v=oWd7t7Cy1fY",
    "youtubeId": "oWd7t7Cy1fY",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-Q_5GK7LV5oo",
    "title": "Veteran's Ultimate Beginner Guide",
    "url": "https://www.youtube.com/watch?v=Q_5GK7LV5oo",
    "youtubeId": "Q_5GK7LV5oo",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-TxPct-Dz4-I",
    "title": "So fertigen Sie Komponenten",
    "url": "https://www.youtube.com/watch?v=TxPct-Dz4-I",
    "youtubeId": "TxPct-Dz4-I",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "components-komponenten-farmen-eihAv_MueUQ",
    "title": "Der beste Fahrzeugbau",
    "url": "https://www.youtube.com/watch?v=eihAv_MueUQ",
    "youtubeId": "eihAv_MueUQ",
    "categorySlug": "components-komponenten-farmen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-ln5GcMwrB8I",
    "title": "Beste Komponenten-Rangliste",
    "url": "https://www.youtube.com/watch?v=ln5GcMwrB8I",
    "youtubeId": "ln5GcMwrB8I",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-1EhnL6P15VM",
    "title": "Komponenten – was behalten",
    "url": "https://www.youtube.com/watch?v=1EhnL6P15VM",
    "youtubeId": "1EhnL6P15VM",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-Qyd_WT7Mo4Q",
    "title": "How A Solo Exploits The New Recycler",
    "url": "https://www.youtube.com/watch?v=Qyd_WT7Mo4Q",
    "youtubeId": "Qyd_WT7Mo4Q",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-DBbPc1B7CYI",
    "title": "Ultimate Rust Recycler Guide",
    "url": "https://www.youtube.com/watch?v=DBbPc1B7CYI",
    "youtubeId": "DBbPc1B7CYI",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-qlUx9QwEBs0",
    "title": "How to use a Recycler",
    "url": "https://www.youtube.com/watch?v=qlUx9QwEBs0",
    "youtubeId": "qlUx9QwEBs0",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-vPVyWbT4hh0",
    "title": "Kurzanleitung – 9000 Schrott",
    "url": "https://www.youtube.com/watch?v=vPVyWbT4hh0",
    "youtubeId": "vPVyWbT4hh0",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-SLEMbOhmcFc",
    "title": "New Component Tutorial",
    "url": "https://www.youtube.com/watch?v=SLEMbOhmcFc",
    "youtubeId": "SLEMbOhmcFc",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-sIZTIaB2XVc",
    "title": "How to use Industrial Recycler",
    "url": "https://www.youtube.com/watch?v=sIZTIaB2XVc",
    "youtubeId": "sIZTIaB2XVc",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-qJvTHUystVY",
    "title": "Schrott-Recycler in Rust",
    "url": "https://www.youtube.com/watch?v=qJvTHUystVY",
    "youtubeId": "qJvTHUystVY",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-nEsp0ocdiQE",
    "title": "Wo befindet sich das Recycling",
    "url": "https://www.youtube.com/watch?v=nEsp0ocdiQE",
    "youtubeId": "nEsp0ocdiQE",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-aj9pMpehhEI",
    "title": "Best Ways to Farm Scrap",
    "url": "https://www.youtube.com/watch?v=aj9pMpehhEI",
    "youtubeId": "aj9pMpehhEI",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-9YWW6YOWhR8",
    "title": "All Recycler Locations",
    "url": "https://www.youtube.com/watch?v=9YWW6YOWhR8",
    "youtubeId": "9YWW6YOWhR8",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-tvEw3aWjvFk",
    "title": "Recycle Manager Update",
    "url": "https://www.youtube.com/watch?v=tvEw3aWjvFk",
    "youtubeId": "tvEw3aWjvFk",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-rfW1XgBsgxg",
    "title": "Ultimate Recycler Guide 2026",
    "url": "https://www.youtube.com/watch?v=rfW1XgBsgxg",
    "youtubeId": "rfW1XgBsgxg",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-X_h-kN6tkHU",
    "title": "Alles, was Sie wissen müssen",
    "url": "https://www.youtube.com/watch?v=X_h-kN6tkHU",
    "youtubeId": "X_h-kN6tkHU",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-wdex1Y4RFSU",
    "title": "What Is The Recycler",
    "url": "https://www.youtube.com/watch?v=wdex1Y4RFSU",
    "youtubeId": "wdex1Y4RFSU",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-K35d_ZxB_oM",
    "title": "Recycler + Minicopter",
    "url": "https://www.youtube.com/watch?v=K35d_ZxB_oM",
    "youtubeId": "K35d_ZxB_oM",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-FyK6EDuT_MQ",
    "title": "Where to Find the Recycler",
    "url": "https://www.youtube.com/watch?v=FyK6EDuT_MQ",
    "youtubeId": "FyK6EDuT_MQ",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "recycler-recycling-XoMWpKtVJ9Y",
    "title": "Kurzanleitung Standort",
    "url": "https://www.youtube.com/watch?v=XoMWpKtVJ9Y",
    "youtubeId": "XoMWpKtVJ9Y",
    "categorySlug": "recycler-recycling",
    "stageSlug": "economy_resources"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-p3OdpHJNIl4",
    "title": "Farming & Genetics Guide",
    "url": "https://www.youtube.com/watch?v=p3OdpHJNIl4",
    "youtubeId": "p3OdpHJNIl4",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-EeLINRhtBG0",
    "title": "Farming 3.0 – Ultimativer Leitfaden",
    "url": "https://www.youtube.com/watch?v=EeLINRhtBG0",
    "youtubeId": "EeLINRhtBG0",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-Z_rW0QkCags",
    "title": "Lernen Sie Kreuzung in Rust",
    "url": "https://www.youtube.com/watch?v=Z_rW0QkCags",
    "youtubeId": "Z_rW0QkCags",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-k6M6Zjozlwk",
    "title": "Genetics Guide | What They Are",
    "url": "https://www.youtube.com/watch?v=k6M6Zjozlwk",
    "youtubeId": "k6M6Zjozlwk",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-m9y6ACVQR-M",
    "title": "Crossbreed a God Clone (lazy)",
    "url": "https://www.youtube.com/watch?v=m9y6ACVQR-M",
    "youtubeId": "m9y6ACVQR-M",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-INvqPFsvD0E",
    "title": "Farming Complete Guide",
    "url": "https://www.youtube.com/watch?v=INvqPFsvD0E",
    "youtubeId": "INvqPFsvD0E",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-pKG1z1p1fFA",
    "title": "How To Crossbreed | Guide",
    "url": "https://www.youtube.com/watch?v=pKG1z1p1fFA",
    "youtubeId": "pKG1z1p1fFA",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-eavfD_HCHu4",
    "title": "10 Farming-Tipps",
    "url": "https://www.youtube.com/watch?v=eavfD_HCHu4",
    "youtubeId": "eavfD_HCHu4",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-4ElucWHyfbM",
    "title": "How to get perfect clones",
    "url": "https://www.youtube.com/watch?v=4ElucWHyfbM",
    "youtubeId": "4ElucWHyfbM",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-5FbuVbnwu94",
    "title": "Plant Breeding in Rust",
    "url": "https://www.youtube.com/watch?v=5FbuVbnwu94",
    "youtubeId": "5FbuVbnwu94",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-dKIAejPCi7Y",
    "title": "Rust Crossbreeding (Kreuzung)",
    "url": "https://www.youtube.com/watch?v=dKIAejPCi7Y",
    "youtubeId": "dKIAejPCi7Y",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-mgTUFN7XjY8",
    "title": "Fortgeschrittener Leitfaden",
    "url": "https://www.youtube.com/watch?v=mgTUFN7XjY8",
    "youtubeId": "mgTUFN7XjY8",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-E3EWe2p6I44",
    "title": "Wie ein Profi-Farmer farmt",
    "url": "https://www.youtube.com/watch?v=E3EWe2p6I44",
    "youtubeId": "E3EWe2p6I44",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-BT31_nCkGbY",
    "title": "This Update Changed Farming",
    "url": "https://www.youtube.com/watch?v=BT31_nCkGbY",
    "youtubeId": "BT31_nCkGbY",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "anpflanzen-planter-genetik-kreuzung-O5bmJK5wphk",
    "title": "Farming-Guide: So erreichst du",
    "url": "https://www.youtube.com/watch?v=O5bmJK5wphk",
    "youtubeId": "O5bmJK5wphk",
    "categorySlug": "anpflanzen-planter-genetik-kreuzung",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-ZF3qACRDSw8",
    "title": "Mischtabelle, Tee- und Beeren-Guide",
    "url": "https://www.youtube.com/watch?v=ZF3qACRDSw8",
    "youtubeId": "ZF3qACRDSw8",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-VeE076brslE",
    "title": "The Ultimate Rust Tea Guide",
    "url": "https://www.youtube.com/watch?v=VeE076brslE",
    "youtubeId": "VeE076brslE",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-mgTUFN7XjY8",
    "title": "Fortgeschrittener Leitfaden",
    "url": "https://www.youtube.com/watch?v=mgTUFN7XjY8",
    "youtubeId": "mgTUFN7XjY8",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-5byLsUwm6kI",
    "title": "Intro to Tea Farming",
    "url": "https://www.youtube.com/watch?v=5byLsUwm6kI",
    "youtubeId": "5byLsUwm6kI",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-Adpfg9Q4bwQ",
    "title": "How to Craft a Mixing Table",
    "url": "https://www.youtube.com/watch?v=Adpfg9Q4bwQ",
    "youtubeId": "Adpfg9Q4bwQ",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-quk7pgh8-WE",
    "title": "Farming Update! How to Farm",
    "url": "https://www.youtube.com/watch?v=quk7pgh8-WE",
    "youtubeId": "quk7pgh8-WE",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-VCQNoaKTVtc",
    "title": "How To Get Crafting Quality",
    "url": "https://www.youtube.com/watch?v=VCQNoaKTVtc",
    "youtubeId": "VCQNoaKTVtc",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-lFsvaKfRwAY",
    "title": "Basic Teas Are Underrated",
    "url": "https://www.youtube.com/watch?v=lFsvaKfRwAY",
    "youtubeId": "lFsvaKfRwAY",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-uRtzUj2uzcs",
    "title": "The Easiest Way for Solos",
    "url": "https://www.youtube.com/watch?v=uRtzUj2uzcs",
    "youtubeId": "uRtzUj2uzcs",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-ewj1d-hy0ao",
    "title": "Ultimativer Kuchen-Koch-Leitfaden",
    "url": "https://www.youtube.com/watch?v=ewj1d-hy0ao",
    "youtubeId": "ewj1d-hy0ao",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-3J1dJK-4cGU",
    "title": "Tea Guide | Mixing Table",
    "url": "https://www.youtube.com/watch?v=3J1dJK-4cGU",
    "youtubeId": "3J1dJK-4cGU",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-TYRj59e8boI",
    "title": "Tea Time (A Rust Tea Guide)",
    "url": "https://www.youtube.com/watch?v=TYRj59e8boI",
    "youtubeId": "TYRj59e8boI",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-fN7RsoDnUz0",
    "title": "Beginner's Guide – Everything",
    "url": "https://www.youtube.com/watch?v=fN7RsoDnUz0",
    "youtubeId": "fN7RsoDnUz0",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-yZENuY5oi5A",
    "title": "How to Make Cooling Tea",
    "url": "https://www.youtube.com/watch?v=yZENuY5oi5A",
    "youtubeId": "yZENuY5oi5A",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "tee-mixing-table-O5bmJK5wphk",
    "title": "Farming-Guide: So erreichst du",
    "url": "https://www.youtube.com/watch?v=O5bmJK5wphk",
    "youtubeId": "O5bmJK5wphk",
    "categorySlug": "tee-mixing-table",
    "stageSlug": "start_here"
  },
  {
    "id": "jagd-tiere-hunting-JPDGwVgCgUU",
    "title": "Neuer Dschungelbiom-Leitfaden",
    "url": "https://www.youtube.com/watch?v=JPDGwVgCgUU",
    "youtubeId": "JPDGwVgCgUU",
    "categorySlug": "jagd-tiere-hunting",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "jagd-tiere-hunting-4eoaJ_HZ5S4",
    "title": "For Beginners: Cloth, Bone",
    "url": "https://www.youtube.com/watch?v=4eoaJ_HZ5S4",
    "youtubeId": "4eoaJ_HZ5S4",
    "categorySlug": "jagd-tiere-hunting",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "jagd-tiere-hunting-O4K65T4nPD4",
    "title": "All Rust Animals Explained",
    "url": "https://www.youtube.com/watch?v=O4K65T4nPD4",
    "youtubeId": "O4K65T4nPD4",
    "categorySlug": "jagd-tiere-hunting",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "jagd-tiere-hunting-_1GVrcPaJD8",
    "title": "How to Fight New Jungle Animals",
    "url": "https://www.youtube.com/watch?v=_1GVrcPaJD8",
    "youtubeId": "_1GVrcPaJD8",
    "categorySlug": "jagd-tiere-hunting",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "jagd-tiere-hunting-vPVyWbT4hh0",
    "title": "Kurzanleitung – 9000 Schrott",
    "url": "https://www.youtube.com/watch?v=vPVyWbT4hh0",
    "youtubeId": "vPVyWbT4hh0",
    "categorySlug": "jagd-tiere-hunting",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "jagd-tiere-hunting-5gg_1EFf46I",
    "title": "The Hidden Animal Path System",
    "url": "https://www.youtube.com/watch?v=5gg_1EFf46I",
    "youtubeId": "5gg_1EFf46I",
    "categorySlug": "jagd-tiere-hunting",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "jagd-tiere-hunting-OSYIsXYL_uM",
    "title": "A Guide For Hunting",
    "url": "https://www.youtube.com/watch?v=OSYIsXYL_uM",
    "youtubeId": "OSYIsXYL_uM",
    "categorySlug": "jagd-tiere-hunting",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "jagd-tiere-hunting-v9puwQkL0Ac",
    "title": "Rust: Hunting season",
    "url": "https://www.youtube.com/watch?v=v9puwQkL0Ac",
    "youtubeId": "v9puwQkL0Ac",
    "categorySlug": "jagd-tiere-hunting",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "jagd-tiere-hunting-W8Gent8n6hw",
    "title": "How to hunt an animal in Rust",
    "url": "https://www.youtube.com/watch?v=W8Gent8n6hw",
    "youtubeId": "W8Gent8n6hw",
    "categorySlug": "jagd-tiere-hunting",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "jagd-tiere-hunting-hHMuZAkXDhg",
    "title": "Guide to Hunting Animals S5",
    "url": "https://www.youtube.com/watch?v=hHMuZAkXDhg",
    "youtubeId": "hHMuZAkXDhg",
    "categorySlug": "jagd-tiere-hunting",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "jagd-tiere-hunting-mG53lX7O1WQ",
    "title": "Hunting vs Compound",
    "url": "https://www.youtube.com/watch?v=mG53lX7O1WQ",
    "youtubeId": "mG53lX7O1WQ",
    "categorySlug": "jagd-tiere-hunting",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-KC0mXozXrv0",
    "title": "Leitfaden zu Pferden und Ställen",
    "url": "https://www.youtube.com/watch?v=KC0mXozXrv0",
    "youtubeId": "KC0mXozXrv0",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-4mtK-Hv3jQg",
    "title": "Wie man verhindert dass Pferde",
    "url": "https://www.youtube.com/watch?v=4mtK-Hv3jQg",
    "youtubeId": "4mtK-Hv3jQg",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-kUPv5TXQk00",
    "title": "Wie man Pferde bekommt",
    "url": "https://www.youtube.com/watch?v=kUPv5TXQk00",
    "youtubeId": "kUPv5TXQk00",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-UDPe5IJOYjw",
    "title": "Horse Guide | Tutorial",
    "url": "https://www.youtube.com/watch?v=UDPe5IJOYjw",
    "youtubeId": "UDPe5IJOYjw",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-tGsuvS3KCsg",
    "title": "So sperren Sie Pferde",
    "url": "https://www.youtube.com/watch?v=tGsuvS3KCsg",
    "youtubeId": "tGsuvS3KCsg",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-JvS9yCoKg68",
    "title": "He Spent 3,000 Hours Mastering",
    "url": "https://www.youtube.com/watch?v=JvS9yCoKg68",
    "youtubeId": "JvS9yCoKg68",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-eTu1Bn192ec",
    "title": "Racing Horses in Rust",
    "url": "https://www.youtube.com/watch?v=eTu1Bn192ec",
    "youtubeId": "eTu1Bn192ec",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-RPMwFJTNv1I",
    "title": "Riding a Horse in Rust",
    "url": "https://www.youtube.com/watch?v=RPMwFJTNv1I",
    "youtubeId": "RPMwFJTNv1I",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-vkwiPJIUnlY",
    "title": "How a 6,900 Hour Solo Abuses",
    "url": "https://www.youtube.com/watch?v=vkwiPJIUnlY",
    "youtubeId": "vkwiPJIUnlY",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-ihLeEcS54qw",
    "title": "Horse + Shield Meta is Broken",
    "url": "https://www.youtube.com/watch?v=ihLeEcS54qw",
    "youtubeId": "ihLeEcS54qw",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-gguCttStoPs",
    "title": "How to Take Care of Horses",
    "url": "https://www.youtube.com/watch?v=gguCttStoPs",
    "youtubeId": "gguCttStoPs",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-dBn3ebHVDMI",
    "title": "Pferd + diese Waffe ist wahnsinnig",
    "url": "https://www.youtube.com/watch?v=dBn3ebHVDMI",
    "youtubeId": "dBn3ebHVDMI",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-JLCUKmr4LTI",
    "title": "Wie man aus Pferdemist Dünger macht",
    "url": "https://www.youtube.com/watch?v=JLCUKmr4LTI",
    "youtubeId": "JLCUKmr4LTI",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-oNRaQveU-rU",
    "title": "Wie Sie Ihr Pferd heilen",
    "url": "https://www.youtube.com/watch?v=oNRaQveU-rU",
    "youtubeId": "oNRaQveU-rU",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-wVLW7PdOL7o",
    "title": "The Untold Power of Horse Poop",
    "url": "https://www.youtube.com/watch?v=wVLW7PdOL7o",
    "youtubeId": "wVLW7PdOL7o",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-uIcwrEj-kek",
    "title": "So satteln Sie ein Pferd",
    "url": "https://www.youtube.com/watch?v=uIcwrEj-kek",
    "youtubeId": "uIcwrEj-kek",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-0H2yxKjZXgE",
    "title": "Horse and Equipment Guide",
    "url": "https://www.youtube.com/watch?v=0H2yxKjZXgE",
    "youtubeId": "0H2yxKjZXgE",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "pferde-horses-z-hmen-reiten-pflegen-NtPV_R-Yje8",
    "title": "How to Pick The Perfect Horse",
    "url": "https://www.youtube.com/watch?v=NtPV_R-Yje8",
    "youtubeId": "NtPV_R-Yje8",
    "categorySlug": "pferde-horses-z-hmen-reiten-pflegen",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-TKhmIJDDMlU",
    "title": "So verhindern Sie Leinenriss",
    "url": "https://www.youtube.com/watch?v=TKhmIJDDMlU",
    "youtubeId": "TKhmIJDDMlU",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-wL0gaHGT5hg",
    "title": "Fishing Guide Tutorial 2025",
    "url": "https://www.youtube.com/watch?v=wL0gaHGT5hg",
    "youtubeId": "wL0gaHGT5hg",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-dueGhHtX7Go",
    "title": "Angel-Guide – der einfachste",
    "url": "https://www.youtube.com/watch?v=dueGhHtX7Go",
    "youtubeId": "dueGhHtX7Go",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-4PXXh3f_GXE",
    "title": "Basic Fishing Guide",
    "url": "https://www.youtube.com/watch?v=4PXXh3f_GXE",
    "youtubeId": "4PXXh3f_GXE",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-viFQUqurl_E",
    "title": "Kurzanleitung zum Angeln",
    "url": "https://www.youtube.com/watch?v=viFQUqurl_E",
    "youtubeId": "viFQUqurl_E",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-be6iOwS5wuQ",
    "title": "Wie man in Rust fischt",
    "url": "https://www.youtube.com/watch?v=be6iOwS5wuQ",
    "youtubeId": "be6iOwS5wuQ",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-4Z0-ab25wDo",
    "title": "3 PRO Fishing Tricks",
    "url": "https://www.youtube.com/watch?v=4Z0-ab25wDo",
    "youtubeId": "4Z0-ab25wDo",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-aQz9rJgH_G4",
    "title": "5 Tricks für mehr Fisch",
    "url": "https://www.youtube.com/watch?v=aQz9rJgH_G4",
    "youtubeId": "aQz9rJgH_G4",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-xX8rUXQobxA",
    "title": "Bestes sicheres Scrap",
    "url": "https://www.youtube.com/watch?v=xX8rUXQobxA",
    "youtubeId": "xX8rUXQobxA",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-gNMutNFURFE",
    "title": "How to catch Every Fish",
    "url": "https://www.youtube.com/watch?v=gNMutNFURFE",
    "youtubeId": "gNMutNFURFE",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-U1-UjwTVr5w",
    "title": "Console Fishing",
    "url": "https://www.youtube.com/watch?v=U1-UjwTVr5w",
    "youtubeId": "U1-UjwTVr5w",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-vtO78_W-Dc0",
    "title": "How to Fish (Full Guide)",
    "url": "https://www.youtube.com/watch?v=vtO78_W-Dc0",
    "youtubeId": "vtO78_W-Dc0",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-4s_MbqgQFuw",
    "title": "So verwenden Sie eine Fischfalle",
    "url": "https://www.youtube.com/watch?v=4s_MbqgQFuw",
    "youtubeId": "4s_MbqgQFuw",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-PMjPPQXn0W4",
    "title": "Fixing a Broken Fishing Rod",
    "url": "https://www.youtube.com/watch?v=PMjPPQXn0W4",
    "youtubeId": "PMjPPQXn0W4",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-jNvuDHN26nc",
    "title": "Quick Fishing Guide",
    "url": "https://www.youtube.com/watch?v=jNvuDHN26nc",
    "youtubeId": "jNvuDHN26nc",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-taMFMLsTn5s",
    "title": "In 5 Minuten mit diesem Trick",
    "url": "https://www.youtube.com/watch?v=taMFMLsTn5s",
    "youtubeId": "taMFMLsTn5s",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-NjFT0Qa3L20",
    "title": "Werde reich mit deiner Basis",
    "url": "https://www.youtube.com/watch?v=NjFT0Qa3L20",
    "youtubeId": "NjFT0Qa3L20",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-vPVyWbT4hh0",
    "title": "Kurzanleitung – 9000 Schrott",
    "url": "https://www.youtube.com/watch?v=vPVyWbT4hh0",
    "youtubeId": "vPVyWbT4hh0",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-9pYMdwIdNJo",
    "title": "Top 3 Easy Beach Fishing",
    "url": "https://www.youtube.com/watch?v=9pYMdwIdNJo",
    "youtubeId": "9pYMdwIdNJo",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "angeln-fishing-TWrvYxF3CKY",
    "title": "The New 100% Catch Fishing Base",
    "url": "https://www.youtube.com/watch?v=TWrvYxF3CKY",
    "youtubeId": "TWrvYxF3CKY",
    "categorySlug": "angeln-fishing",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-pAT3yJLm1DI",
    "title": "How to Use Chicken Coop",
    "url": "https://www.youtube.com/watch?v=pAT3yJLm1DI",
    "youtubeId": "pAT3yJLm1DI",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-ewj1d-hy0ao",
    "title": "Ultimativer Kuchen-Koch-Leitfaden",
    "url": "https://www.youtube.com/watch?v=ewj1d-hy0ao",
    "youtubeId": "ewj1d-hy0ao",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-yTBzyDbHfEs",
    "title": "How To Cook Food",
    "url": "https://www.youtube.com/watch?v=yTBzyDbHfEs",
    "youtubeId": "yTBzyDbHfEs",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-ZF3qACRDSw8",
    "title": "Mischtabelle, Tee- und Beeren-Guide",
    "url": "https://www.youtube.com/watch?v=ZF3qACRDSw8",
    "youtubeId": "ZF3qACRDSw8",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-9exljSpM4CU",
    "title": "Rust für Anfänger – Nahrung",
    "url": "https://www.youtube.com/watch?v=9exljSpM4CU",
    "youtubeId": "9exljSpM4CU",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-VCQNoaKTVtc",
    "title": "How To Get Crafting Quality (Cooking)",
    "url": "https://www.youtube.com/watch?v=VCQNoaKTVtc",
    "youtubeId": "VCQNoaKTVtc",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-SxwIHO4iCa0",
    "title": "🔌 Rust Elektrizitätshandbuch",
    "url": "https://www.youtube.com/watch?v=SxwIHO4iCa0",
    "youtubeId": "SxwIHO4iCa0",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-5yZWc8VAX9A",
    "title": "The BEST Rust Electricity Guide",
    "url": "https://www.youtube.com/watch?v=5yZWc8VAX9A",
    "youtubeId": "5yZWc8VAX9A",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-XCsIUd_UVz8",
    "title": "Ultimate Electricity Guide",
    "url": "https://www.youtube.com/watch?v=XCsIUd_UVz8",
    "youtubeId": "XCsIUd_UVz8",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-UBiDjyjtSaM",
    "title": "Die 10 wichtigsten Stromkreise",
    "url": "https://www.youtube.com/watch?v=UBiDjyjtSaM",
    "youtubeId": "UBiDjyjtSaM",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-fvRAZ0rF3Q8",
    "title": "What Every Electrical Component",
    "url": "https://www.youtube.com/watch?v=fvRAZ0rF3Q8",
    "youtubeId": "fvRAZ0rF3Q8",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-ixzQazNVL80",
    "title": "Rust 101: Electricity Guide",
    "url": "https://www.youtube.com/watch?v=ixzQazNVL80",
    "youtubeId": "ixzQazNVL80",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-ZjjGlpC-Lf4",
    "title": "Power Distribution And Logic",
    "url": "https://www.youtube.com/watch?v=ZjjGlpC-Lf4",
    "youtubeId": "ZjjGlpC-Lf4",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-ulfq_qr-DvA",
    "title": "5 essenzielle Stromkreise",
    "url": "https://www.youtube.com/watch?v=ulfq_qr-DvA",
    "youtubeId": "ulfq_qr-DvA",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-_87f5pwiUCI",
    "title": "A Basic Electricity Guide",
    "url": "https://www.youtube.com/watch?v=_87f5pwiUCI",
    "youtubeId": "_87f5pwiUCI",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost--0BR8BN5WGg",
    "title": "Beginners Guide To Electricity",
    "url": "https://www.youtube.com/watch?v=-0BR8BN5WGg",
    "youtubeId": "-0BR8BN5WGg",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-NoGeJWKkKKc",
    "title": "Master the Electrical Branch",
    "url": "https://www.youtube.com/watch?v=NoGeJWKkKKc",
    "youtubeId": "NoGeJWKkKKc",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-p4MyY_FuPMw",
    "title": "Rust Electrical | How To Wire",
    "url": "https://www.youtube.com/watch?v=p4MyY_FuPMw",
    "youtubeId": "p4MyY_FuPMw",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-eJCmG1M9q_4",
    "title": "Rust advanced electricity",
    "url": "https://www.youtube.com/watch?v=eJCmG1M9q_4",
    "youtubeId": "eJCmG1M9q_4",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-S2jV-V62sMo",
    "title": "Unlimited Ore Smelting w/ Electr.",
    "url": "https://www.youtube.com/watch?v=S2jV-V62sMo",
    "youtubeId": "S2jV-V62sMo",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-rcEQ7eBZP5U",
    "title": "Wind Turbine Placement Made Easy",
    "url": "https://www.youtube.com/watch?v=rcEQ7eBZP5U",
    "youtubeId": "rcEQ7eBZP5U",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-fPk-fyP9MFM",
    "title": "Ultimate Beginner's Guide",
    "url": "https://www.youtube.com/watch?v=fPk-fyP9MFM",
    "youtubeId": "fPk-fyP9MFM",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-R4WIXh-c5eI",
    "title": "Stromerzeugung & -speicherung",
    "url": "https://www.youtube.com/watch?v=R4WIXh-c5eI",
    "youtubeId": "R4WIXh-c5eI",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-3a2i9bU9WJU",
    "title": "Pushing Base Limits w/ Electr.",
    "url": "https://www.youtube.com/watch?v=3a2i9bU9WJU",
    "youtubeId": "3a2i9bU9WJU",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-oW9bPJO3CcM",
    "title": "Rust-Experte: beste Setups",
    "url": "https://www.youtube.com/watch?v=oW9bPJO3CcM",
    "youtubeId": "oW9bPJO3CcM",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-oWd7t7Cy1fY",
    "title": "Ultimativer Industrieleitfaden",
    "url": "https://www.youtube.com/watch?v=oWd7t7Cy1fY",
    "youtubeId": "oWd7t7Cy1fY",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-uAeHH0INIFI",
    "title": "Meistern Sie Industrielle Pipes",
    "url": "https://www.youtube.com/watch?v=uAeHH0INIFI",
    "youtubeId": "uAeHH0INIFI",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-EDvZ21gcNgU",
    "title": "The best auto-sorter design",
    "url": "https://www.youtube.com/watch?v=EDvZ21gcNgU",
    "youtubeId": "EDvZ21gcNgU",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-lTA0y9OStnw",
    "title": "Auto-Fill Your TC",
    "url": "https://www.youtube.com/watch?v=lTA0y9OStnw",
    "youtubeId": "lTA0y9OStnw",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-jWI6dCUm4Jc",
    "title": "Auto Sorting System – Never",
    "url": "https://www.youtube.com/watch?v=jWI6dCUm4Jc",
    "youtubeId": "jWI6dCUm4Jc",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-Fz_HkoeXH2g",
    "title": "Most Efficient Way to Organize",
    "url": "https://www.youtube.com/watch?v=Fz_HkoeXH2g",
    "youtubeId": "Fz_HkoeXH2g",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-bv-YJiHAvhc",
    "title": "The Auto Sorting System",
    "url": "https://www.youtube.com/watch?v=bv-YJiHAvhc",
    "youtubeId": "bv-YJiHAvhc",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-KcTqG_2YD-g",
    "title": "Modular Industrial Pipes",
    "url": "https://www.youtube.com/watch?v=KcTqG_2YD-g",
    "youtubeId": "KcTqG_2YD-g",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-80LCDpEFjCE",
    "title": "Industrieller Handwerker",
    "url": "https://www.youtube.com/watch?v=80LCDpEFjCE",
    "youtubeId": "80LCDpEFjCE",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-uXfRoMIddeQ",
    "title": "Vollautomatik – einfache Anleitung",
    "url": "https://www.youtube.com/watch?v=uXfRoMIddeQ",
    "youtubeId": "uXfRoMIddeQ",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-dHawUz3q-Oo",
    "title": "Das EINZIGE Sortiersystem",
    "url": "https://www.youtube.com/watch?v=dHawUz3q-Oo",
    "youtubeId": "dHawUz3q-Oo",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-qvZtucyRCZs",
    "title": "Industrial – Basics & Storage",
    "url": "https://www.youtube.com/watch?v=qvZtucyRCZs",
    "youtubeId": "qvZtucyRCZs",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-ftbFe0QaCGU",
    "title": "Simplest Auto Smelter",
    "url": "https://www.youtube.com/watch?v=ftbFe0QaCGU",
    "youtubeId": "ftbFe0QaCGU",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-d1s_f4DXYBA",
    "title": "How to Use Industrial Conveyors",
    "url": "https://www.youtube.com/watch?v=d1s_f4DXYBA",
    "youtubeId": "d1s_f4DXYBA",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-m9fAjD5nvp0",
    "title": "Automatisches Auffüllen extern",
    "url": "https://www.youtube.com/watch?v=m9fAjD5nvp0",
    "youtubeId": "m9fAjD5nvp0",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-Lb0jzj2QUZk",
    "title": "Apartment-Komplex Guide",
    "url": "https://www.youtube.com/watch?v=Lb0jzj2QUZk",
    "youtubeId": "Lb0jzj2QUZk",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-DJmFbUmieHQ",
    "title": "Rust Automation Tutorial",
    "url": "https://www.youtube.com/watch?v=DJmFbUmieHQ",
    "youtubeId": "DJmFbUmieHQ",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-uWJHDPzfcOc",
    "title": "Industrial / Electrical",
    "url": "https://www.youtube.com/watch?v=uWJHDPzfcOc",
    "youtubeId": "uWJHDPzfcOc",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-tAVuPWXqkfQ",
    "title": "How to setup Auto Turrets",
    "url": "https://www.youtube.com/watch?v=tAVuPWXqkfQ",
    "youtubeId": "tAVuPWXqkfQ",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-WcAOA9PiJwU",
    "title": "The Auto Turret & Setup Guide",
    "url": "https://www.youtube.com/watch?v=WcAOA9PiJwU",
    "youtubeId": "WcAOA9PiJwU",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-OV6nYMuP-mw",
    "title": "So bekommst du Schwarzpulver",
    "url": "https://www.youtube.com/watch?v=OV6nYMuP-mw",
    "youtubeId": "OV6nYMuP-mw",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "nahrung-kochen-h-hner-kompost-_T5adqyJdXg",
    "title": "How to Craft Explosives in Rust",
    "url": "https://www.youtube.com/watch?v=_T5adqyJdXg",
    "youtubeId": "_T5adqyJdXg",
    "categorySlug": "nahrung-kochen-h-hner-kompost",
    "stageSlug": "food_farming_animals"
  },
  {
    "id": "elektrik-electricity-SxwIHO4iCa0",
    "title": "Rust Elektrizitätshandbuch – Vom Anfänger zum Profi",
    "url": "https://www.youtube.com/watch?v=SxwIHO4iCa0",
    "youtubeId": "SxwIHO4iCa0",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-5yZWc8VAX9A",
    "title": "The BEST Rust Electricity Guide for Beginners",
    "url": "https://www.youtube.com/watch?v=5yZWc8VAX9A",
    "youtubeId": "5yZWc8VAX9A",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-UBiDjyjtSaM",
    "title": "Die 10 wichtigsten Stromkreise in Rust",
    "url": "https://www.youtube.com/watch?v=UBiDjyjtSaM",
    "youtubeId": "UBiDjyjtSaM",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-ulfq_qr-DvA",
    "title": "5 essenzielle Stromkreise, die jeder Rust-Spieler kennen muss",
    "url": "https://www.youtube.com/watch?v=ulfq_qr-DvA",
    "youtubeId": "ulfq_qr-DvA",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-XCsIUd_UVz8",
    "title": "Ultimate Electricity Guide – Beginner To Pro",
    "url": "https://www.youtube.com/watch?v=XCsIUd_UVz8",
    "youtubeId": "XCsIUd_UVz8",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-dHawUz3q-Oo",
    "title": "Das EINZIGE Rust-Sortiersystem-Tutorial",
    "url": "https://www.youtube.com/watch?v=dHawUz3q-Oo",
    "youtubeId": "dHawUz3q-Oo",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-fvRAZ0rF3Q8",
    "title": "What Every Electrical Component Does in Rust",
    "url": "https://www.youtube.com/watch?v=fvRAZ0rF3Q8",
    "youtubeId": "fvRAZ0rF3Q8",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-eJCmG1M9q_4",
    "title": "Rust advanced electricity",
    "url": "https://www.youtube.com/watch?v=eJCmG1M9q_4",
    "youtubeId": "eJCmG1M9q_4",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-ZjjGlpC-Lf4",
    "title": "Rust Power Distribution And Logic Flow",
    "url": "https://www.youtube.com/watch?v=ZjjGlpC-Lf4",
    "youtubeId": "ZjjGlpC-Lf4",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity--0BR8BN5WGg",
    "title": "Beginners Guide To Electricity – Understanding Basics",
    "url": "https://www.youtube.com/watch?v=-0BR8BN5WGg",
    "youtubeId": "-0BR8BN5WGg",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-p4MyY_FuPMw",
    "title": "RUST Electrical – How To WIRE LIKE A PRO",
    "url": "https://www.youtube.com/watch?v=p4MyY_FuPMw",
    "youtubeId": "p4MyY_FuPMw",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-HgpRufq9oJw",
    "title": "Ultimate Guide to Electric Furnace Automation",
    "url": "https://www.youtube.com/watch?v=HgpRufq9oJw",
    "youtubeId": "HgpRufq9oJw",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-ixzQazNVL80",
    "title": "RUST 101: Electricity Guide – Solar Panels",
    "url": "https://www.youtube.com/watch?v=ixzQazNVL80",
    "youtubeId": "ixzQazNVL80",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-3a2i9bU9WJU",
    "title": "Pushing Base Limits With Rust Electricity",
    "url": "https://www.youtube.com/watch?v=3a2i9bU9WJU",
    "youtubeId": "3a2i9bU9WJU",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-hvCS8lKB1Os",
    "title": "Rust-Energiemanagement ENDLICH erklärt",
    "url": "https://www.youtube.com/watch?v=hvCS8lKB1Os",
    "youtubeId": "hvCS8lKB1Os",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "elektrik-electricity-87JewNRuKMs",
    "title": "Die böseste Basis, die ich je in Rust gebaut habe",
    "url": "https://www.youtube.com/watch?v=87JewNRuKMs",
    "youtubeId": "87JewNRuKMs",
    "categorySlug": "elektrik-electricity",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-KcTqG_2YD-g",
    "title": "Rust Modular Sorting System V2 Tutorial",
    "url": "https://www.youtube.com/watch?v=KcTqG_2YD-g",
    "youtubeId": "KcTqG_2YD-g",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-Fz_HkoeXH2g",
    "title": "The Most EFFICIENT Way to Organize Your Loot",
    "url": "https://www.youtube.com/watch?v=Fz_HkoeXH2g",
    "youtubeId": "Fz_HkoeXH2g",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-EDvZ21gcNgU",
    "title": "The best auto-sorter design – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=EDvZ21gcNgU",
    "youtubeId": "EDvZ21gcNgU",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-jWI6dCUm4Jc",
    "title": "Rust Auto Sorting System – NEVER Mess Up",
    "url": "https://www.youtube.com/watch?v=jWI6dCUm4Jc",
    "youtubeId": "jWI6dCUm4Jc",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-oW9bPJO3CcM",
    "title": "RUST-Experte verrät die besten Geheimnisse",
    "url": "https://www.youtube.com/watch?v=oW9bPJO3CcM",
    "youtubeId": "oW9bPJO3CcM",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-oWd7t7Cy1fY",
    "title": "Ultimativer Industrieleitfaden – So automatisierst du",
    "url": "https://www.youtube.com/watch?v=oWd7t7Cy1fY",
    "youtubeId": "oWd7t7Cy1fY",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-uAeHH0INIFI",
    "title": "Meistern Sie Rust INDUSTRIELLE Kombinierer",
    "url": "https://www.youtube.com/watch?v=uAeHH0INIFI",
    "youtubeId": "uAeHH0INIFI",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-80LCDpEFjCE",
    "title": "Industrieller Handwerker Rust: Automatisierung",
    "url": "https://www.youtube.com/watch?v=80LCDpEFjCE",
    "youtubeId": "80LCDpEFjCE",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-uXfRoMIddeQ",
    "title": "Die einfache Anleitung zur vollautomatischen Basis",
    "url": "https://www.youtube.com/watch?v=uXfRoMIddeQ",
    "youtubeId": "uXfRoMIddeQ",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-bv-YJiHAvhc",
    "title": "The Auto Sorting System of Your Dreams",
    "url": "https://www.youtube.com/watch?v=bv-YJiHAvhc",
    "youtubeId": "bv-YJiHAvhc",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-nE_hCjU31pM",
    "title": "Rust Automatic Sorting System – Industrial",
    "url": "https://www.youtube.com/watch?v=nE_hCjU31pM",
    "youtubeId": "nE_hCjU31pM",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-u_rNj10iNUE",
    "title": "Full Base Industrial Automation – Auto Smelting",
    "url": "https://www.youtube.com/watch?v=u_rNj10iNUE",
    "youtubeId": "u_rNj10iNUE",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-UqxPoxzOrk8",
    "title": "Auto Upkeep Module – Rust Modular Sorting",
    "url": "https://www.youtube.com/watch?v=UqxPoxzOrk8",
    "youtubeId": "UqxPoxzOrk8",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-uR0U0OKECRw",
    "title": "How To Make an Auto Sorting Conveyor",
    "url": "https://www.youtube.com/watch?v=uR0U0OKECRw",
    "youtubeId": "uR0U0OKECRw",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-dHawUz3q-Oo",
    "title": "Das EINZIGE Rust-Sortiersystem-Tutorial",
    "url": "https://www.youtube.com/watch?v=dHawUz3q-Oo",
    "youtubeId": "dHawUz3q-Oo",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "industrie-system-f-rderb-nder-pipes-sorter-T3kgpLryzmI",
    "title": "Sorters and Conveyors Tutorial",
    "url": "https://www.youtube.com/watch?v=T3kgpLryzmI",
    "youtubeId": "T3kgpLryzmI",
    "categorySlug": "industrie-system-f-rderb-nder-pipes-sorter",
    "stageSlug": "base_systems"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-kNQljV77PgQ",
    "title": "Traps & Turrets – Defence & Base Guide",
    "url": "https://www.youtube.com/watch?v=kNQljV77PgQ",
    "youtubeId": "kNQljV77PgQ",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-WcAOA9PiJwU",
    "title": "The Auto Turret & Setup Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=WcAOA9PiJwU",
    "youtubeId": "WcAOA9PiJwU",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-sciLQC-j6nA",
    "title": "Rust Auto Turret Defense – HBHF Sensor Setup",
    "url": "https://www.youtube.com/watch?v=sciLQC-j6nA",
    "youtubeId": "sciLQC-j6nA",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-iG0RwAhyEEM",
    "title": "Double the HV Rocket Cost of Your Auto Turret",
    "url": "https://www.youtube.com/watch?v=iG0RwAhyEEM",
    "youtubeId": "iG0RwAhyEEM",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-QiOVn0tnMRY",
    "title": "RUST – FLAME TURRET TEST",
    "url": "https://www.youtube.com/watch?v=QiOVn0tnMRY",
    "youtubeId": "QiOVn0tnMRY",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-msTLTg-HTDE",
    "title": "TUNA LAMPS & FLAME SENTRY TURRET – Rust Update",
    "url": "https://www.youtube.com/watch?v=msTLTg-HTDE",
    "youtubeId": "msTLTg-HTDE",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-BezenhUwVI8",
    "title": "Aufsätze für automatische Geschütze",
    "url": "https://www.youtube.com/watch?v=BezenhUwVI8",
    "youtubeId": "BezenhUwVI8",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-K_jazjYC97Q",
    "title": "Flame Turrets are Broken in Rust",
    "url": "https://www.youtube.com/watch?v=K_jazjYC97Q",
    "youtubeId": "K_jazjYC97Q",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-JsW8yW5sVe4",
    "title": "Never Before Seen Flame Turret Trick",
    "url": "https://www.youtube.com/watch?v=JsW8yW5sVe4",
    "youtubeId": "JsW8yW5sVe4",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-pdZDy-L7r4Y",
    "title": "Rust Raiding Economics – Turrets and Traps",
    "url": "https://www.youtube.com/watch?v=pdZDy-L7r4Y",
    "youtubeId": "pdZDy-L7r4Y",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-q7mCnIGK2NM",
    "title": "The Rust Flame Turret Trap Base",
    "url": "https://www.youtube.com/watch?v=q7mCnIGK2NM",
    "youtubeId": "q7mCnIGK2NM",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-nxABq4TFKTg",
    "title": "RUST Flame Turret Trap Base",
    "url": "https://www.youtube.com/watch?v=nxABq4TFKTg",
    "youtubeId": "nxABq4TFKTg",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-Ojw5TTlBaSc",
    "title": "Auto Turret Road – Rust",
    "url": "https://www.youtube.com/watch?v=Ojw5TTlBaSc",
    "youtubeId": "Ojw5TTlBaSc",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-IxOlfjZYhl0",
    "title": "Rust Ships: Schrotflinten-Falle",
    "url": "https://www.youtube.com/watch?v=IxOlfjZYhl0",
    "youtubeId": "IxOlfjZYhl0",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "auto-turret-flame-turret-shotgun-trap-vakrYWQ-HcE",
    "title": "Flame Turret AFK Trap",
    "url": "https://www.youtube.com/watch?v=vakrYWQ-HcE",
    "youtubeId": "vakrYWQ-HcE",
    "categorySlug": "auto-turret-flame-turret-shotgun-trap",
    "stageSlug": "vehicles"
  },
  {
    "id": "sprengstoff-munition-craften-MoiAyqT6UyA",
    "title": "Ultimativer Raid-Guide – Der effizienteste Weg",
    "url": "https://www.youtube.com/watch?v=MoiAyqT6UyA",
    "youtubeId": "MoiAyqT6UyA",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "sprengstoff-munition-craften-cqRTbM7hOfc",
    "title": "Rust Tips – How To Get Explosives FAST!",
    "url": "https://www.youtube.com/watch?v=cqRTbM7hOfc",
    "youtubeId": "cqRTbM7hOfc",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "sprengstoff-munition-craften-_T5adqyJdXg",
    "title": "How to Craft Explosives in Rust (Step-by-Step)",
    "url": "https://www.youtube.com/watch?v=_T5adqyJdXg",
    "youtubeId": "_T5adqyJdXg",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "sprengstoff-munition-craften-tanJIeZ_WG0",
    "title": "A GUIDE TO C4 DAMAGE",
    "url": "https://www.youtube.com/watch?v=tanJIeZ_WG0",
    "youtubeId": "tanJIeZ_WG0",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "sprengstoff-munition-craften-dJj4fivYCY4",
    "title": "Rust Raid Guide: How Much C4, Rockets, Satchels",
    "url": "https://www.youtube.com/watch?v=dJj4fivYCY4",
    "youtubeId": "dJj4fivYCY4",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "sprengstoff-munition-craften-STcvfus8umw",
    "title": "Raiding when you can't craft C4 or Rockets",
    "url": "https://www.youtube.com/watch?v=STcvfus8umw",
    "youtubeId": "STcvfus8umw",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "sprengstoff-munition-craften-ACq3RAnFEEs",
    "title": "Guide to Explosives – Rust",
    "url": "https://www.youtube.com/watch?v=ACq3RAnFEEs",
    "youtubeId": "ACq3RAnFEEs",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "sprengstoff-munition-craften-kWEb_lX1orc",
    "title": "Bradley mit einer Drohne und C4 erobern",
    "url": "https://www.youtube.com/watch?v=kWEb_lX1orc",
    "youtubeId": "kWEb_lX1orc",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "sprengstoff-munition-craften-V_VA4FflnHA",
    "title": "Rust – So zerstört man Panzertüren",
    "url": "https://www.youtube.com/watch?v=V_VA4FflnHA",
    "youtubeId": "V_VA4FflnHA",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "sprengstoff-munition-craften-QCsWG5_h-3A",
    "title": "Rust – Wie viele Taschen, explosive Munition…",
    "url": "https://www.youtube.com/watch?v=QCsWG5_h-3A",
    "youtubeId": "QCsWG5_h-3A",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "sprengstoff-munition-craften-sr0J7BZL55Y",
    "title": "How To Rust: Day 44! – Using C4, Rockets",
    "url": "https://www.youtube.com/watch?v=sr0J7BZL55Y",
    "youtubeId": "sr0J7BZL55Y",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "sprengstoff-munition-craften-IGUzaK4sGx8",
    "title": "Rust – Wie viele Molotowcocktails, Schuld…",
    "url": "https://www.youtube.com/watch?v=IGUzaK4sGx8",
    "youtubeId": "IGUzaK4sGx8",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "sprengstoff-munition-craften--WMFamUwpCE",
    "title": "Rust a noobs guide part 6: Explosive weapons",
    "url": "https://www.youtube.com/watch?v=-WMFamUwpCE",
    "youtubeId": "-WMFamUwpCE",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "sprengstoff-munition-craften-XWlNXkitj7o",
    "title": "NEW Raiding META? – Ultimate Primitive Raiding",
    "url": "https://www.youtube.com/watch?v=XWlNXkitj7o",
    "youtubeId": "XWlNXkitj7o",
    "categorySlug": "sprengstoff-munition-craften",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "medizin-heilung-8xzAmWgj4FI",
    "title": "Heal Faster & Efficiently! TLDR Healing Guide",
    "url": "https://www.youtube.com/watch?v=8xzAmWgj4FI",
    "youtubeId": "8xzAmWgj4FI",
    "categorySlug": "medizin-heilung",
    "stageSlug": "start_here"
  },
  {
    "id": "medizin-heilung-_y40zxs63nI",
    "title": "Medical Syringe Alternative – How many Bandages",
    "url": "https://www.youtube.com/watch?v=_y40zxs63nI",
    "youtubeId": "_y40zxs63nI",
    "categorySlug": "medizin-heilung",
    "stageSlug": "start_here"
  },
  {
    "id": "medizin-heilung-RBCxCHAhjfw",
    "title": "Rust: Automatische medizinische Spritzen",
    "url": "https://www.youtube.com/watch?v=RBCxCHAhjfw",
    "youtubeId": "RBCxCHAhjfw",
    "categorySlug": "medizin-heilung",
    "stageSlug": "start_here"
  },
  {
    "id": "medizin-heilung-l4qfAuqOyeY",
    "title": "Rust Beginners Guide How To Heal Yourself",
    "url": "https://www.youtube.com/watch?v=l4qfAuqOyeY",
    "youtubeId": "l4qfAuqOyeY",
    "categorySlug": "medizin-heilung",
    "stageSlug": "start_here"
  },
  {
    "id": "medizin-heilung-e_7Qd9vzUmk",
    "title": "wait, that's not a medical syringe...",
    "url": "https://www.youtube.com/watch?v=e_7Qd9vzUmk",
    "youtubeId": "e_7Qd9vzUmk",
    "categorySlug": "medizin-heilung",
    "stageSlug": "start_here"
  },
  {
    "id": "medizin-heilung-GRxlrFxyA9A",
    "title": "Medical Syringe – Rust Legacy",
    "url": "https://www.youtube.com/watch?v=GRxlrFxyA9A",
    "youtubeId": "GRxlrFxyA9A",
    "categorySlug": "medizin-heilung",
    "stageSlug": "start_here"
  },
  {
    "id": "medizin-heilung-MXTZbF4bAfE",
    "title": "Chest Seals/Sucking Chest Wounds",
    "url": "https://www.youtube.com/watch?v=MXTZbF4bAfE",
    "youtubeId": "MXTZbF4bAfE",
    "categorySlug": "medizin-heilung",
    "stageSlug": "start_here"
  },
  {
    "id": "medizin-heilung-TvUcmxjMs7E",
    "title": "How to Upgrade Healing Bandage",
    "url": "https://www.youtube.com/watch?v=TvUcmxjMs7E",
    "youtubeId": "TvUcmxjMs7E",
    "categorySlug": "medizin-heilung",
    "stageSlug": "start_here"
  },
  {
    "id": "alle-monumente-bersicht-Lb0jzj2QUZk",
    "title": "Rust Monuments",
    "url": "https://www.youtube.com/watch?v=Lb0jzj2QUZk",
    "youtubeId": "Lb0jzj2QUZk",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-geW88NvTzPI",
    "title": "Leitfaden zu allen Fundorten der Monumente",
    "url": "https://www.youtube.com/watch?v=geW88NvTzPI",
    "youtubeId": "geW88NvTzPI",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-u6zHvXaKQaA",
    "title": "Small Rust Monuments Guide – Everything You Need",
    "url": "https://www.youtube.com/watch?v=u6zHvXaKQaA",
    "youtubeId": "u6zHvXaKQaA",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-Inn345Rwd8I",
    "title": "Der ultimative Leitfaden zu den Monumenten",
    "url": "https://www.youtube.com/watch?v=Inn345Rwd8I",
    "youtubeId": "Inn345Rwd8I",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-ZqK2gTdJL9Q",
    "title": "What Are The Best Monuments In Rust?",
    "url": "https://www.youtube.com/watch?v=ZqK2gTdJL9Q",
    "youtubeId": "ZqK2gTdJL9Q",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-WqEp1WLyDNc",
    "title": "Rust Monument Guide",
    "url": "https://www.youtube.com/watch?v=WqEp1WLyDNc",
    "youtubeId": "WqEp1WLyDNc",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-8jTvWNf8aFA",
    "title": "100 ESSENTIAL Tips for ALL Monuments",
    "url": "https://www.youtube.com/watch?v=8jTvWNf8aFA",
    "youtubeId": "8jTvWNf8aFA",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-SElsAKcDgzA",
    "title": "How To Get EASY Loot – Top 3 Monuments",
    "url": "https://www.youtube.com/watch?v=SElsAKcDgzA",
    "youtubeId": "SElsAKcDgzA",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-kr0spV5-NRI",
    "title": "How to 100% PROGRESS in Rust 2025",
    "url": "https://www.youtube.com/watch?v=kr0spV5-NRI",
    "youtubeId": "kr0spV5-NRI",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-gOqiN2sHTzY",
    "title": "Big meta changes, BP frags, New monuments",
    "url": "https://www.youtube.com/watch?v=gOqiN2sHTzY",
    "youtubeId": "gOqiN2sHTzY",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-FICzFsiiA5k",
    "title": "Sewer Branch Monument – Loot & Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=FICzFsiiA5k",
    "youtubeId": "FICzFsiiA5k",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-o4nX3zlqySQ",
    "title": "Kurzer Leitfaden für die grüne Karte",
    "url": "https://www.youtube.com/watch?v=o4nX3zlqySQ",
    "youtubeId": "o4nX3zlqySQ",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-Xr7AvpLUnRo",
    "title": "Flugplatzdenkmal – Loot & Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=Xr7AvpLUnRo",
    "youtubeId": "Xr7AvpLUnRo",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-RZ1KcBNJzl8",
    "title": "Über 25 Strategien 2025",
    "url": "https://www.youtube.com/watch?v=RZ1KcBNJzl8",
    "youtubeId": "RZ1KcBNJzl8",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "alle-monumente-bersicht-RkhLevC72Iw",
    "title": "I did every rust monument in one day",
    "url": "https://www.youtube.com/watch?v=RkhLevC72Iw",
    "youtubeId": "RkhLevC72Iw",
    "categorySlug": "alle-monumente-bersicht",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "airfield-Nmv0_y7X6zo",
    "title": "Airfield Monument Loot & Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=Nmv0_y7X6zo",
    "youtubeId": "Nmv0_y7X6zo",
    "categorySlug": "airfield",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "airfield-Xr7AvpLUnRo",
    "title": "Airfield Monument – Loot & Puzzle Guide 2025",
    "url": "https://www.youtube.com/watch?v=Xr7AvpLUnRo",
    "youtubeId": "Xr7AvpLUnRo",
    "categorySlug": "airfield",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "airfield-yKQIuvMWxd4",
    "title": "Rust – Airfield Monument Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=yKQIuvMWxd4",
    "youtubeId": "yKQIuvMWxd4",
    "categorySlug": "airfield",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "airfield-eJaOw8ei7wU",
    "title": "Ultimate AIRFIELD Puzzle Guide in 2 Minutes",
    "url": "https://www.youtube.com/watch?v=eJaOw8ei7wU",
    "youtubeId": "eJaOw8ei7wU",
    "categorySlug": "airfield",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "airfield-EaKJjQn6-i4",
    "title": "How to Solve the Airfield Keycard Puzzle",
    "url": "https://www.youtube.com/watch?v=EaKJjQn6-i4",
    "youtubeId": "EaKJjQn6-i4",
    "categorySlug": "airfield",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "airfield-OjDq32SHjJE",
    "title": "Rust Monument Guide – The Airfield",
    "url": "https://www.youtube.com/watch?v=OjDq32SHjJE",
    "youtubeId": "OjDq32SHjJE",
    "categorySlug": "airfield",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "airfield-tHcpn77cwkI",
    "title": "Rust – How to Airfield Puzzle",
    "url": "https://www.youtube.com/watch?v=tHcpn77cwkI",
    "youtubeId": "tHcpn77cwkI",
    "categorySlug": "airfield",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "airfield-Se77Bsld9PA",
    "title": "Rust Monument Puzzles – Airfield Green and Blue",
    "url": "https://www.youtube.com/watch?v=Se77Bsld9PA",
    "youtubeId": "Se77Bsld9PA",
    "categorySlug": "airfield",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "airfield-eTHyuK2sZN4",
    "title": "How to do the Airfield Puzzle in Rust",
    "url": "https://www.youtube.com/watch?v=eTHyuK2sZN4",
    "youtubeId": "eTHyuK2sZN4",
    "categorySlug": "airfield",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "airfield-vmowqHYTCsk",
    "title": "Rust Monument Guide – Airfield 2021 Update",
    "url": "https://www.youtube.com/watch?v=vmowqHYTCsk",
    "youtubeId": "vmowqHYTCsk",
    "categorySlug": "airfield",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "launch-site-Rey8Ad_nt3Y",
    "title": "Launch Site Keycard Puzzle in 113 Seconds",
    "url": "https://www.youtube.com/watch?v=Rey8Ad_nt3Y",
    "youtubeId": "Rey8Ad_nt3Y",
    "categorySlug": "launch-site",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "launch-site-zz0XpmDkE8U",
    "title": "Launch Site Puzzle Guide in Rust",
    "url": "https://www.youtube.com/watch?v=zz0XpmDkE8U",
    "youtubeId": "zz0XpmDkE8U",
    "categorySlug": "launch-site",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "launch-site-u-6l_626F-k",
    "title": "Complete LAUNCH SITE Red Card Puzzle",
    "url": "https://www.youtube.com/watch?v=u-6l_626F-k",
    "youtubeId": "u-6l_626F-k",
    "categorySlug": "launch-site",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "launch-site-8zme3s7dSYA",
    "title": "Launch Site Puzzle Guide in Rust",
    "url": "https://www.youtube.com/watch?v=8zme3s7dSYA",
    "youtubeId": "8zme3s7dSYA",
    "categorySlug": "launch-site",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "launch-site-Inn345Rwd8I",
    "title": "The ULTIMATE Tier 3 Monuments Guide",
    "url": "https://www.youtube.com/watch?v=Inn345Rwd8I",
    "youtubeId": "Inn345Rwd8I",
    "categorySlug": "launch-site",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "launch-site-YFCFr2oKCUk",
    "title": "Launch Site Red Card Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=YFCFr2oKCUk",
    "youtubeId": "YFCFr2oKCUk",
    "categorySlug": "launch-site",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "launch-site-tiSYf3mCyzw",
    "title": "Launch Site Keycard Puzzle Tutorial",
    "url": "https://www.youtube.com/watch?v=tiSYf3mCyzw",
    "youtubeId": "tiSYf3mCyzw",
    "categorySlug": "launch-site",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "launch-site-geW88NvTzPI",
    "title": "ALL Monument Keycard Puzzle Locations",
    "url": "https://www.youtube.com/watch?v=geW88NvTzPI",
    "youtubeId": "geW88NvTzPI",
    "categorySlug": "launch-site",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "launch-site-AGtTjNOAE0s",
    "title": "Launch Site Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=AGtTjNOAE0s",
    "youtubeId": "AGtTjNOAE0s",
    "categorySlug": "launch-site",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "launch-site-7ZeoeMg0uj8",
    "title": "The NEW Launch Site Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=7ZeoeMg0uj8",
    "youtubeId": "7ZeoeMg0uj8",
    "categorySlug": "launch-site",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "military-tunnels-Ga3SVYUivv0",
    "title": "Military Tunnels Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=Ga3SVYUivv0",
    "youtubeId": "Ga3SVYUivv0",
    "categorySlug": "military-tunnels",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "military-tunnels-E3wZOGM3RS4",
    "title": "NEW Military Tunnels Guide In 2026",
    "url": "https://www.youtube.com/watch?v=E3wZOGM3RS4",
    "youtubeId": "E3wZOGM3RS4",
    "categorySlug": "military-tunnels",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "military-tunnels-T02DJuPlHGA",
    "title": "Rust – Military Tunnels Monument Puzzle",
    "url": "https://www.youtube.com/watch?v=T02DJuPlHGA",
    "youtubeId": "T02DJuPlHGA",
    "categorySlug": "military-tunnels",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "military-tunnels-QlqiA2fIJYs",
    "title": "Military Tunnels Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=QlqiA2fIJYs",
    "youtubeId": "QlqiA2fIJYs",
    "categorySlug": "military-tunnels",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "military-tunnels-rJthtIpajzE",
    "title": "MILITARY TUNNELS WALK-THROUGH GUIDE 2025",
    "url": "https://www.youtube.com/watch?v=rJthtIpajzE",
    "youtubeId": "rJthtIpajzE",
    "categorySlug": "military-tunnels",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "military-tunnels-tRGPLqGmaSM",
    "title": "Rust Military Tunnels Guide – 2 Minute Tutorial",
    "url": "https://www.youtube.com/watch?v=tRGPLqGmaSM",
    "youtubeId": "tRGPLqGmaSM",
    "categorySlug": "military-tunnels",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "military-tunnels-Inn345Rwd8I",
    "title": "The ULTIMATE Tier 3 Monuments Guide",
    "url": "https://www.youtube.com/watch?v=Inn345Rwd8I",
    "youtubeId": "Inn345Rwd8I",
    "categorySlug": "military-tunnels",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "military-tunnels-OIImYNdnz7w",
    "title": "Military Tunnels Full Puzzle Walkthrough",
    "url": "https://www.youtube.com/watch?v=OIImYNdnz7w",
    "youtubeId": "OIImYNdnz7w",
    "categorySlug": "military-tunnels",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "military-tunnels-MlPqwEZfVHo",
    "title": "ULTIMATE Military Tunnel Puzzle Guide Console",
    "url": "https://www.youtube.com/watch?v=MlPqwEZfVHo",
    "youtubeId": "MlPqwEZfVHo",
    "categorySlug": "military-tunnels",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "military-tunnels-Ax2pL0N7Xww",
    "title": "Military Tunnels Red Card Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=Ax2pL0N7Xww",
    "youtubeId": "Ax2pL0N7Xww",
    "categorySlug": "military-tunnels",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "water-treatment-plant-GLZaepYwJdo",
    "title": "Water Treatment Plant Monument Guide",
    "url": "https://www.youtube.com/watch?v=GLZaepYwJdo",
    "youtubeId": "GLZaepYwJdo",
    "categorySlug": "water-treatment-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "water-treatment-plant-omM9wYp05Ds",
    "title": "Water Treatment Plant Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=omM9wYp05Ds",
    "youtubeId": "omM9wYp05Ds",
    "categorySlug": "water-treatment-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "water-treatment-plant-vKJ7xwUNxnw",
    "title": "Rust Water Treatment Guide – Puzzle, Radiation",
    "url": "https://www.youtube.com/watch?v=vKJ7xwUNxnw",
    "youtubeId": "vKJ7xwUNxnw",
    "categorySlug": "water-treatment-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "water-treatment-plant-9Qg6Istthxs",
    "title": "ULTIMATE Rust Water Treatment Guide 2026",
    "url": "https://www.youtube.com/watch?v=9Qg6Istthxs",
    "youtubeId": "9Qg6Istthxs",
    "categorySlug": "water-treatment-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "water-treatment-plant-FICzFsiiA5k",
    "title": "Sewer Branch Monument – Loot & Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=FICzFsiiA5k",
    "youtubeId": "FICzFsiiA5k",
    "categorySlug": "water-treatment-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "water-treatment-plant-WpH-VC1Jvo0",
    "title": "How to Do the Water Treatment Puzzle",
    "url": "https://www.youtube.com/watch?v=WpH-VC1Jvo0",
    "youtubeId": "WpH-VC1Jvo0",
    "categorySlug": "water-treatment-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "water-treatment-plant-626U2gEFYhI",
    "title": "How to do the Water Treatment Puzzle",
    "url": "https://www.youtube.com/watch?v=626U2gEFYhI",
    "youtubeId": "626U2gEFYhI",
    "categorySlug": "water-treatment-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "water-treatment-plant-I54zI4QWP-g",
    "title": "Rust Monument Guide – The Water Treatment",
    "url": "https://www.youtube.com/watch?v=I54zI4QWP-g",
    "youtubeId": "I54zI4QWP-g",
    "categorySlug": "water-treatment-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "train-yard-ntoudT6eZuA",
    "title": "Train Yard Monument Loot & Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=ntoudT6eZuA",
    "youtubeId": "ntoudT6eZuA",
    "categorySlug": "train-yard",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "train-yard-EceO04tAHTk",
    "title": "Rust – Train Yard Monument Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=EceO04tAHTk",
    "youtubeId": "EceO04tAHTk",
    "categorySlug": "train-yard",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "train-yard--rMLRBJwwOA",
    "title": "Rust Monument Puzzles – Trainyard Green and Blue",
    "url": "https://www.youtube.com/watch?v=-rMLRBJwwOA",
    "youtubeId": "-rMLRBJwwOA",
    "categorySlug": "train-yard",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "train-yard-dOdFE3FI6l0",
    "title": "Ultimate Rust TRAINYARD Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=dOdFE3FI6l0",
    "youtubeId": "dOdFE3FI6l0",
    "categorySlug": "train-yard",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "train-yard-a30ETOIV4Ss",
    "title": "NEW Train Event – Train Yard Monument Loot",
    "url": "https://www.youtube.com/watch?v=a30ETOIV4Ss",
    "youtubeId": "a30ETOIV4Ss",
    "categorySlug": "train-yard",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "train-yard-G6NVTj2jnNk",
    "title": "Rust Trainyard Blue Door Monument Puzzle",
    "url": "https://www.youtube.com/watch?v=G6NVTj2jnNk",
    "youtubeId": "G6NVTj2jnNk",
    "categorySlug": "train-yard",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "train-yard-myn-B-5xq9E",
    "title": "How to Do the Trainyard Keycard Puzzle",
    "url": "https://www.youtube.com/watch?v=myn-B-5xq9E",
    "youtubeId": "myn-B-5xq9E",
    "categorySlug": "train-yard",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "train-yard-_zC3PSnRm4Q",
    "title": "Train Yard Puzzle Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=_zC3PSnRm4Q",
    "youtubeId": "_zC3PSnRm4Q",
    "categorySlug": "train-yard",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "power-plant-5Y9gRkWe-F8",
    "title": "Rust – Power Plant Monument Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=5Y9gRkWe-F8",
    "youtubeId": "5Y9gRkWe-F8",
    "categorySlug": "power-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "power-plant-FzJb9Vf_OGc",
    "title": "Power Plant Monument Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=FzJb9Vf_OGc",
    "youtubeId": "FzJb9Vf_OGc",
    "categorySlug": "power-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "power-plant-sgIUt3QxfEw",
    "title": "Rust – Power Plant Keycard Puzzle Tutorial",
    "url": "https://www.youtube.com/watch?v=sgIUt3QxfEw",
    "youtubeId": "sgIUt3QxfEw",
    "categorySlug": "power-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "power-plant-J2taQaFLciM",
    "title": "Power Plant Puzzle Guide in Rust",
    "url": "https://www.youtube.com/watch?v=J2taQaFLciM",
    "youtubeId": "J2taQaFLciM",
    "categorySlug": "power-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "power-plant-qiZBcM3vvXE",
    "title": "Power Plant Full Puzzle Walkthrough",
    "url": "https://www.youtube.com/watch?v=qiZBcM3vvXE",
    "youtubeId": "qiZBcM3vvXE",
    "categorySlug": "power-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "power-plant-BHUmPycpU4Y",
    "title": "Rust: How to Run Power Plant Puzzles",
    "url": "https://www.youtube.com/watch?v=BHUmPycpU4Y",
    "youtubeId": "BHUmPycpU4Y",
    "categorySlug": "power-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "power-plant-UHW4gzIvE8M",
    "title": "How to run Power Plant Puzzle",
    "url": "https://www.youtube.com/watch?v=UHW4gzIvE8M",
    "youtubeId": "UHW4gzIvE8M",
    "categorySlug": "power-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "power-plant-geW88NvTzPI",
    "title": "ALL Monument Keycard Puzzle Locations",
    "url": "https://www.youtube.com/watch?v=geW88NvTzPI",
    "youtubeId": "geW88NvTzPI",
    "categorySlug": "power-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "power-plant-svpV9z-QN_Y",
    "title": "Power Plant Keycard Puzzle in 160 Seconds",
    "url": "https://www.youtube.com/watch?v=svpV9z-QN_Y",
    "youtubeId": "svpV9z-QN_Y",
    "categorySlug": "power-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "power-plant-wgX-PAr69xQ",
    "title": "Red Card – Power Plant Blue Card Puzzle",
    "url": "https://www.youtube.com/watch?v=wgX-PAr69xQ",
    "youtubeId": "wgX-PAr69xQ",
    "categorySlug": "power-plant",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "harbor-Bsrb9L-QDJ8",
    "title": "Harbour Keycard Puzzle (Both Variants)",
    "url": "https://www.youtube.com/watch?v=Bsrb9L-QDJ8",
    "youtubeId": "Bsrb9L-QDJ8",
    "categorySlug": "harbor",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "harbor-qiB7SaFL2Xg",
    "title": "Rust – Large Harbor Monument Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=qiB7SaFL2Xg",
    "youtubeId": "qiB7SaFL2Xg",
    "categorySlug": "harbor",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "harbor-mLIPKRaWcLs",
    "title": "The ULTIMATE Harbour Keycard Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=mLIPKRaWcLs",
    "youtubeId": "mLIPKRaWcLs",
    "categorySlug": "harbor",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "harbor-etNkDxNEOns",
    "title": "Rust – Small Harbor Monument Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=etNkDxNEOns",
    "youtubeId": "etNkDxNEOns",
    "categorySlug": "harbor",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "harbor-SIQrkUX29Nk",
    "title": "Rust Monument Guide – The Harbor",
    "url": "https://www.youtube.com/watch?v=SIQrkUX29Nk",
    "youtubeId": "SIQrkUX29Nk",
    "categorySlug": "harbor",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "harbor-geW88NvTzPI",
    "title": "ALL Monument Keycard Puzzle Locations",
    "url": "https://www.youtube.com/watch?v=geW88NvTzPI",
    "youtubeId": "geW88NvTzPI",
    "categorySlug": "harbor",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "harbor-n0W33_8XA0g",
    "title": "Harbor Puzzle Guide in Rust",
    "url": "https://www.youtube.com/watch?v=n0W33_8XA0g",
    "youtubeId": "n0W33_8XA0g",
    "categorySlug": "harbor",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "harbor-GXHn0NGvfNk",
    "title": "Harbor Monument Guide – Small and Large",
    "url": "https://www.youtube.com/watch?v=GXHn0NGvfNk",
    "youtubeId": "GXHn0NGvfNk",
    "categorySlug": "harbor",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "harbor-w4B5Zk_3gpg",
    "title": "Harbour Monument Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=w4B5Zk_3gpg",
    "youtubeId": "w4B5Zk_3gpg",
    "categorySlug": "harbor",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "harbor-mn6ypbkuNhQ",
    "title": "All Keycard locations – Keycard & Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=mn6ypbkuNhQ",
    "youtubeId": "mn6ypbkuNhQ",
    "categorySlug": "harbor",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-u6zHvXaKQaA",
    "title": "Small Rust Monuments Guide – Everything You Need",
    "url": "https://www.youtube.com/watch?v=u6zHvXaKQaA",
    "youtubeId": "u6zHvXaKQaA",
    "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-aUIqlLkoxMI",
    "title": "Small Monuments Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=aUIqlLkoxMI",
    "youtubeId": "aUIqlLkoxMI",
    "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-NXxZUZ2bfIs",
    "title": "Rust Monument Guide: Satellite Dish Loot",
    "url": "https://www.youtube.com/watch?v=NXxZUZ2bfIs",
    "youtubeId": "NXxZUZ2bfIs",
    "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-g601suPTlUg",
    "title": "Sewer Branch Monument Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=g601suPTlUg",
    "youtubeId": "g601suPTlUg",
    "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-gBweJ3nz40o",
    "title": "Satellite Monument Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=gBweJ3nz40o",
    "youtubeId": "gBweJ3nz40o",
    "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-YFRhWFqAlBE",
    "title": "Satellite Monument Guide 2",
    "url": "https://www.youtube.com/watch?v=YFRhWFqAlBE",
    "youtubeId": "YFRhWFqAlBE",
    "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-7NKv6p9P2CI",
    "title": "Rust Monument Guide – The Junkyard",
    "url": "https://www.youtube.com/watch?v=7NKv6p9P2CI",
    "youtubeId": "7NKv6p9P2CI",
    "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-FICzFsiiA5k",
    "title": "Sewer Branch Monument – Loot & Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=FICzFsiiA5k",
    "youtubeId": "FICzFsiiA5k",
    "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-Osj442q2p3k",
    "title": "Rust Monument Guide – The Satellite Dish",
    "url": "https://www.youtube.com/watch?v=Osj442q2p3k",
    "youtubeId": "Osj442q2p3k",
    "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer-SEpKbmaeH3I",
    "title": "Oxum's Gas Station – Monument Guide",
    "url": "https://www.youtube.com/watch?v=SEpKbmaeH3I",
    "youtubeId": "SEpKbmaeH3I",
    "categorySlug": "kleine-monumente-gas-station-supermarket-junkyard-satellite-sewer",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "the-dome-Wq1NUCCuRTQ",
    "title": "Dome Monument Loot & Climbing Guide",
    "url": "https://www.youtube.com/watch?v=Wq1NUCCuRTQ",
    "youtubeId": "Wq1NUCCuRTQ",
    "categorySlug": "the-dome",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "the-dome-jK-rS46FbDI",
    "title": "Rust – Dome Monument Guide",
    "url": "https://www.youtube.com/watch?v=jK-rS46FbDI",
    "youtubeId": "jK-rS46FbDI",
    "categorySlug": "the-dome",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "the-dome-81X1T1mbJxc",
    "title": "How to Climb and Loot the Dome",
    "url": "https://www.youtube.com/watch?v=81X1T1mbJxc",
    "youtubeId": "81X1T1mbJxc",
    "categorySlug": "the-dome",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "the-dome-rkkciMJB7os",
    "title": "The Dome – Monument guide – Rust",
    "url": "https://www.youtube.com/watch?v=rkkciMJB7os",
    "youtubeId": "rkkciMJB7os",
    "categorySlug": "the-dome",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "the-dome-Wv29xLlERrk",
    "title": "Dome Monument Puzzle Guide In Rust",
    "url": "https://www.youtube.com/watch?v=Wv29xLlERrk",
    "youtubeId": "Wv29xLlERrk",
    "categorySlug": "the-dome",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "the-dome-tRvabimFj4g",
    "title": "Rust Beginners Guide For The Dome",
    "url": "https://www.youtube.com/watch?v=tRvabimFj4g",
    "youtubeId": "tRvabimFj4g",
    "categorySlug": "the-dome",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "the-dome-UQl4j5jbW1Y",
    "title": "Dome Monument Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=UQl4j5jbW1Y",
    "youtubeId": "UQl4j5jbW1Y",
    "categorySlug": "the-dome",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "the-dome-mP_OMGc_sjo",
    "title": "How To Climb To The Top Of Dome Monument",
    "url": "https://www.youtube.com/watch?v=mP_OMGc_sjo",
    "youtubeId": "mP_OMGc_sjo",
    "categorySlug": "the-dome",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "the-dome-EA4k0R0MbiQ",
    "title": "Rust Monument Guide – The Dome",
    "url": "https://www.youtube.com/watch?v=EA4k0R0MbiQ",
    "youtubeId": "EA4k0R0MbiQ",
    "categorySlug": "the-dome",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "giant-excavator-H7eMgAUkR-U",
    "title": "Giant Excavator Pit Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=H7eMgAUkR-U",
    "youtubeId": "H7eMgAUkR-U",
    "categorySlug": "giant-excavator",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "giant-excavator-iXCqaiaePVw",
    "title": "Rust – Giant Excavator Pit Monument Guide",
    "url": "https://www.youtube.com/watch?v=iXCqaiaePVw",
    "youtubeId": "iXCqaiaePVw",
    "categorySlug": "giant-excavator",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "giant-excavator-UuIXnQHFFXY",
    "title": "Giant Excavator Guide – Rust",
    "url": "https://www.youtube.com/watch?v=UuIXnQHFFXY",
    "youtubeId": "UuIXnQHFFXY",
    "categorySlug": "giant-excavator",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "giant-excavator-GsbinuimORU",
    "title": "Rust Monument Guide – Giant Excavator",
    "url": "https://www.youtube.com/watch?v=GsbinuimORU",
    "youtubeId": "GsbinuimORU",
    "categorySlug": "giant-excavator",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "giant-excavator-Inn345Rwd8I",
    "title": "The ULTIMATE Tier 3 Monuments Guide",
    "url": "https://www.youtube.com/watch?v=Inn345Rwd8I",
    "youtubeId": "Inn345Rwd8I",
    "categorySlug": "giant-excavator",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "giant-excavator-BXLNJgKZles",
    "title": "Rust Monument Guide – The Large Excavator",
    "url": "https://www.youtube.com/watch?v=BXLNJgKZles",
    "youtubeId": "BXLNJgKZles",
    "categorySlug": "giant-excavator",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "giant-excavator-5Yu3sbY-_2g",
    "title": "RUST EXCAVATOR PIT MONUMENT GUIDE",
    "url": "https://www.youtube.com/watch?v=5Yu3sbY-_2g",
    "youtubeId": "5Yu3sbY-_2g",
    "categorySlug": "giant-excavator",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "giant-excavator-AYymth531fk",
    "title": "How to use The GIANT EXCAVATOR in Rust",
    "url": "https://www.youtube.com/watch?v=AYymth531fk",
    "youtubeId": "AYymth531fk",
    "categorySlug": "giant-excavator",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "giant-excavator-2tHToW6McZI",
    "title": "How to do the Excavator in Rust",
    "url": "https://www.youtube.com/watch?v=2tHToW6McZI",
    "youtubeId": "2tHToW6McZI",
    "categorySlug": "giant-excavator",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "arctic-research-base-IAcleSkW_J4",
    "title": "Arctic Research Base Blue Card Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=IAcleSkW_J4",
    "youtubeId": "IAcleSkW_J4",
    "categorySlug": "arctic-research-base",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "arctic-research-base-lTaUsyKT1BE",
    "title": "Arctic Research Base Puzzle Guide in Rust",
    "url": "https://www.youtube.com/watch?v=lTaUsyKT1BE",
    "youtubeId": "lTaUsyKT1BE",
    "categorySlug": "arctic-research-base",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "arctic-research-base-JeZNxXn6KQg",
    "title": "Arctic Base Monument & Snowmobile Guide",
    "url": "https://www.youtube.com/watch?v=JeZNxXn6KQg",
    "youtubeId": "JeZNxXn6KQg",
    "categorySlug": "arctic-research-base",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "arctic-research-base-QoRDx1m3zvI",
    "title": "Arctic Research Base Loot Guide",
    "url": "https://www.youtube.com/watch?v=QoRDx1m3zvI",
    "youtubeId": "QoRDx1m3zvI",
    "categorySlug": "arctic-research-base",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "arctic-research-base-eHqEnfsUDdA",
    "title": "Arctic Research Base Blue Card Puzzle",
    "url": "https://www.youtube.com/watch?v=eHqEnfsUDdA",
    "youtubeId": "eHqEnfsUDdA",
    "categorySlug": "arctic-research-base",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "arctic-research-base-NP_7rVE9fNA",
    "title": "Arctic Research Base Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=NP_7rVE9fNA",
    "youtubeId": "NP_7rVE9fNA",
    "categorySlug": "arctic-research-base",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "arctic-research-base-Y1tkn3IIiCQ",
    "title": "Arctic Research Base Red Keycard Location",
    "url": "https://www.youtube.com/watch?v=Y1tkn3IIiCQ",
    "youtubeId": "Y1tkn3IIiCQ",
    "categorySlug": "arctic-research-base",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "nuclear-missile-silo-lUPephY1j8U",
    "title": "NEW Nuclear Missile Silo Monument – A Deep Dive",
    "url": "https://www.youtube.com/watch?v=lUPephY1j8U",
    "youtubeId": "lUPephY1j8U",
    "categorySlug": "nuclear-missile-silo",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "nuclear-missile-silo-vvwiRm7lREM",
    "title": "Missile Silo Guide in Rust",
    "url": "https://www.youtube.com/watch?v=vvwiRm7lREM",
    "youtubeId": "vvwiRm7lREM",
    "categorySlug": "nuclear-missile-silo",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "nuclear-missile-silo-81kkuY1Pv0A",
    "title": "Rust Guide – Nuclear Missile Silo Monument",
    "url": "https://www.youtube.com/watch?v=81kkuY1Pv0A",
    "youtubeId": "81kkuY1Pv0A",
    "categorySlug": "nuclear-missile-silo",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "nuclear-missile-silo-l40Q0_yKTmg",
    "title": "Missile Silo Loot Guide and Walkthrough",
    "url": "https://www.youtube.com/watch?v=l40Q0_yKTmg",
    "youtubeId": "l40Q0_yKTmg",
    "categorySlug": "nuclear-missile-silo",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "nuclear-missile-silo-nPIMXQfMNXc",
    "title": "Nuclear Missile Silo Blue Card Puzzle",
    "url": "https://www.youtube.com/watch?v=nPIMXQfMNXc",
    "youtubeId": "nPIMXQfMNXc",
    "categorySlug": "nuclear-missile-silo",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "nuclear-missile-silo-YPTQVvqRWNI",
    "title": "Rust – How To Open Missile Silo Hatch",
    "url": "https://www.youtube.com/watch?v=YPTQVvqRWNI",
    "youtubeId": "YPTQVvqRWNI",
    "categorySlug": "nuclear-missile-silo",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "nuclear-missile-silo-PA6iCK59XEU",
    "title": "Ultimate Rust Puzzle Guide – DOME, MISSILE SILO",
    "url": "https://www.youtube.com/watch?v=PA6iCK59XEU",
    "youtubeId": "PA6iCK59XEU",
    "categorySlug": "nuclear-missile-silo",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "underwater-labs-bfxdIUg4FcE",
    "title": "Rust Underwater Labs Guide – 2 Minute Tutorial",
    "url": "https://www.youtube.com/watch?v=bfxdIUg4FcE",
    "youtubeId": "bfxdIUg4FcE",
    "categorySlug": "underwater-labs",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "underwater-labs-Yj38XRHpD_o",
    "title": "Underwater Labs Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=Yj38XRHpD_o",
    "youtubeId": "Yj38XRHpD_o",
    "categorySlug": "underwater-labs",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "underwater-labs-UlPItcplbzc",
    "title": "Get RICH with this Monument – Underwater Labs",
    "url": "https://www.youtube.com/watch?v=UlPItcplbzc",
    "youtubeId": "UlPItcplbzc",
    "categorySlug": "underwater-labs",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "underwater-labs-uOoS6K2ZmNs",
    "title": "Rust Underwater Lab Monument Guide",
    "url": "https://www.youtube.com/watch?v=uOoS6K2ZmNs",
    "youtubeId": "uOoS6K2ZmNs",
    "categorySlug": "underwater-labs",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "underwater-labs-jirywxgfPmI",
    "title": "Rust – Underwater Labs Guide",
    "url": "https://www.youtube.com/watch?v=jirywxgfPmI",
    "youtubeId": "jirywxgfPmI",
    "categorySlug": "underwater-labs",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "underwater-labs-RyIX0GIk1F0",
    "title": "How to Run Underwater Labs",
    "url": "https://www.youtube.com/watch?v=RyIX0GIk1F0",
    "youtubeId": "RyIX0GIk1F0",
    "categorySlug": "underwater-labs",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "underwater-labs-tXRWIJZ_lKc",
    "title": "Under Water Labs Puzzle Guide in Rust",
    "url": "https://www.youtube.com/watch?v=tXRWIJZ_lKc",
    "youtubeId": "tXRWIJZ_lKc",
    "categorySlug": "underwater-labs",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "underwater-labs-nZC8n8pi52s",
    "title": "Underwater Labs Guide",
    "url": "https://www.youtube.com/watch?v=nZC8n8pi52s",
    "youtubeId": "nZC8n8pi52s",
    "categorySlug": "underwater-labs",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "underwater-labs-tEOKqA79ce8",
    "title": "How to Get in Underwater Labs Quick Guide",
    "url": "https://www.youtube.com/watch?v=tEOKqA79ce8",
    "youtubeId": "tEOKqA79ce8",
    "categorySlug": "underwater-labs",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "underwater-labs-xo5xOxMWxkw",
    "title": "COMPLETE Underwater Labs GUIDE",
    "url": "https://www.youtube.com/watch?v=xo5xOxMWxkw",
    "youtubeId": "xo5xOxMWxkw",
    "categorySlug": "underwater-labs",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "oil-rig-small-large-2lzGW8X5NcY",
    "title": "Small Oil Rig Monument – Loot, Strategies",
    "url": "https://www.youtube.com/watch?v=2lzGW8X5NcY",
    "youtubeId": "2lzGW8X5NcY",
    "categorySlug": "oil-rig-small-large",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "oil-rig-small-large-NBignVjTNzQ",
    "title": "Small Oil Rig Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=NBignVjTNzQ",
    "youtubeId": "NBignVjTNzQ",
    "categorySlug": "oil-rig-small-large",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "oil-rig-small-large-GN4khDsR6z4",
    "title": "Large Oil Rig Monument – Best Strategies",
    "url": "https://www.youtube.com/watch?v=GN4khDsR6z4",
    "youtubeId": "GN4khDsR6z4",
    "categorySlug": "oil-rig-small-large",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "oil-rig-small-large-EV1agPOJpHI",
    "title": "How to find Oil Rig Monument Loot",
    "url": "https://www.youtube.com/watch?v=EV1agPOJpHI",
    "youtubeId": "EV1agPOJpHI",
    "categorySlug": "oil-rig-small-large",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "oil-rig-small-large-_c_WW4B7K-Q",
    "title": "Rust Monument Guide – Small Oil Rig 2021",
    "url": "https://www.youtube.com/watch?v=_c_WW4B7K-Q",
    "youtubeId": "_c_WW4B7K-Q",
    "categorySlug": "oil-rig-small-large",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "oil-rig-small-large-5kEHYr96alw",
    "title": "Complete Guide to Small Oil Rig",
    "url": "https://www.youtube.com/watch?v=5kEHYr96alw",
    "youtubeId": "5kEHYr96alw",
    "categorySlug": "oil-rig-small-large",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "oil-rig-small-large-OS_MtfVSMyY",
    "title": "Rust Monument Guide – The Oil Rig",
    "url": "https://www.youtube.com/watch?v=OS_MtfVSMyY",
    "youtubeId": "OS_MtfVSMyY",
    "categorySlug": "oil-rig-small-large",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "oil-rig-small-large-DjHWtWKBD4w",
    "title": "Rust Monument Guide – The Small Oil Rig",
    "url": "https://www.youtube.com/watch?v=DjHWtWKBD4w",
    "youtubeId": "DjHWtWKBD4w",
    "categorySlug": "oil-rig-small-large",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "oil-rig-small-large-u6zHvXaKQaA",
    "title": "Small Rust Monuments Guide – Everything",
    "url": "https://www.youtube.com/watch?v=u6zHvXaKQaA",
    "youtubeId": "u6zHvXaKQaA",
    "categorySlug": "oil-rig-small-large",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "oil-rig-small-large-GXHn0NGvfNk",
    "title": "Harbor Monument Guide – Small and Large",
    "url": "https://www.youtube.com/watch?v=GXHn0NGvfNk",
    "youtubeId": "GXHn0NGvfNk",
    "categorySlug": "oil-rig-small-large",
    "stageSlug": "monuments_keycards"
  },
  {
    "id": "cargo-ship-containerschiff-DHMTfWCnYcs",
    "title": "The Cargo Ship Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=DHMTfWCnYcs",
    "youtubeId": "DHMTfWCnYcs",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-WwIA_rTEg0I",
    "title": "Taking Cargo Solo: A complete guide",
    "url": "https://www.youtube.com/watch?v=WwIA_rTEg0I",
    "youtubeId": "WwIA_rTEg0I",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-iMYODoGRNss",
    "title": "NEW Harbour & Cargo Event Guide",
    "url": "https://www.youtube.com/watch?v=iMYODoGRNss",
    "youtubeId": "iMYODoGRNss",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-CsM5Nj9rF1o",
    "title": "My most Insane Solo Cargo",
    "url": "https://www.youtube.com/watch?v=CsM5Nj9rF1o",
    "youtubeId": "CsM5Nj9rF1o",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-VbodnFNDO_c",
    "title": "NEVER LOSE Cargo Ship AGAIN",
    "url": "https://www.youtube.com/watch?v=VbodnFNDO_c",
    "youtubeId": "VbodnFNDO_c",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-2XaJxhcq1tw",
    "title": "Rust Guide – Cargo Ship",
    "url": "https://www.youtube.com/watch?v=2XaJxhcq1tw",
    "youtubeId": "2XaJxhcq1tw",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-ZQjYcO_W1to",
    "title": "Taking Cargo Ship Guide",
    "url": "https://www.youtube.com/watch?v=ZQjYcO_W1to",
    "youtubeId": "ZQjYcO_W1to",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-SpI4BAzAEnw",
    "title": "Cargo MOVEMENT GUIDE",
    "url": "https://www.youtube.com/watch?v=SpI4BAzAEnw",
    "youtubeId": "SpI4BAzAEnw",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-Gaf-0uR6BsU",
    "title": "The Beginners Guide to TAKING Cargo",
    "url": "https://www.youtube.com/watch?v=Gaf-0uR6BsU",
    "youtubeId": "Gaf-0uR6BsU",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-zeC9dpM1LiM",
    "title": "The best way to get on Cargo in Rust",
    "url": "https://www.youtube.com/watch?v=zeC9dpM1LiM",
    "youtubeId": "zeC9dpM1LiM",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-ps3boxn0cZw",
    "title": "THE CARGO KING – Rust",
    "url": "https://www.youtube.com/watch?v=ps3boxn0cZw",
    "youtubeId": "ps3boxn0cZw",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-WQRDYYAHGks",
    "title": "How we ABUSED Cargo Ship",
    "url": "https://www.youtube.com/watch?v=WQRDYYAHGks",
    "youtubeId": "WQRDYYAHGks",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-pwo6mRTpFqw",
    "title": "Cargo Ship Guide – Rust Console",
    "url": "https://www.youtube.com/watch?v=pwo6mRTpFqw",
    "youtubeId": "pwo6mRTpFqw",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-AiOq6TrRm1k",
    "title": "Rust CargoShip Tips & Tricks",
    "url": "https://www.youtube.com/watch?v=AiOq6TrRm1k",
    "youtubeId": "AiOq6TrRm1k",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-vzbpd69chXk",
    "title": "RUST: Solo Practicing Safe Way",
    "url": "https://www.youtube.com/watch?v=vzbpd69chXk",
    "youtubeId": "vzbpd69chXk",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-ZU1KohCPfGk",
    "title": "Rust Cargo Ship Guide Solo 2024",
    "url": "https://www.youtube.com/watch?v=ZU1KohCPfGk",
    "youtubeId": "ZU1KohCPfGk",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-0Tq9iv7C41M",
    "title": "I Gave 25 Rust Players their own Cargo",
    "url": "https://www.youtube.com/watch?v=0Tq9iv7C41M",
    "youtubeId": "0Tq9iv7C41M",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "cargo-ship-containerschiff-rI1CVUMOuoI",
    "title": "This Cargo Glitch lets me see everything",
    "url": "https://www.youtube.com/watch?v=rI1CVUMOuoI",
    "youtubeId": "rI1CVUMOuoI",
    "categorySlug": "cargo-ship-containerschiff",
    "stageSlug": "events_bosses"
  },
  {
    "id": "bradley-apc-panzer-besiegen-dgTuu2Tp93Q",
    "title": "7 Ways to Kill Bradley at Launch Site",
    "url": "https://www.youtube.com/watch?v=dgTuu2Tp93Q",
    "youtubeId": "dgTuu2Tp93Q",
    "categorySlug": "bradley-apc-panzer-besiegen",
    "stageSlug": "events_bosses"
  },
  {
    "id": "bradley-apc-panzer-besiegen-T3q-4XYWTdM",
    "title": "NEW Bradley APC Guide – Everything You Need",
    "url": "https://www.youtube.com/watch?v=T3q-4XYWTdM",
    "youtubeId": "T3q-4XYWTdM",
    "categorySlug": "bradley-apc-panzer-besiegen",
    "stageSlug": "events_bosses"
  },
  {
    "id": "bradley-apc-panzer-besiegen-F8WtGiOasU8",
    "title": "HOW TO KILL THE TANK (BRADLEY APC)",
    "url": "https://www.youtube.com/watch?v=F8WtGiOasU8",
    "youtubeId": "F8WtGiOasU8",
    "categorySlug": "bradley-apc-panzer-besiegen",
    "stageSlug": "events_bosses"
  },
  {
    "id": "bradley-apc-panzer-besiegen-6VcrPcChSFk",
    "title": "Easiest Way to Destroy the Bradley",
    "url": "https://www.youtube.com/watch?v=6VcrPcChSFk",
    "youtubeId": "6VcrPcChSFk",
    "categorySlug": "bradley-apc-panzer-besiegen",
    "stageSlug": "events_bosses"
  },
  {
    "id": "bradley-apc-panzer-besiegen-q2EZTk787rw",
    "title": "Cheapest Way to Destroy Bradley Tank",
    "url": "https://www.youtube.com/watch?v=q2EZTk787rw",
    "youtubeId": "q2EZTk787rw",
    "categorySlug": "bradley-apc-panzer-besiegen",
    "stageSlug": "events_bosses"
  },
  {
    "id": "bradley-apc-panzer-besiegen-wIunMhcSSKw",
    "title": "Rust Academy: 5 WAYS to KILL M2 BRADLEY",
    "url": "https://www.youtube.com/watch?v=wIunMhcSSKw",
    "youtubeId": "wIunMhcSSKw",
    "categorySlug": "bradley-apc-panzer-besiegen",
    "stageSlug": "events_bosses"
  },
  {
    "id": "bradley-apc-panzer-besiegen-EGCoqfBQd_8",
    "title": "Bradley Guide Rust Launch Site (90 Seconds)",
    "url": "https://www.youtube.com/watch?v=EGCoqfBQd_8",
    "youtubeId": "EGCoqfBQd_8",
    "categorySlug": "bradley-apc-panzer-besiegen",
    "stageSlug": "events_bosses"
  },
  {
    "id": "bradley-apc-panzer-besiegen-kWEb_lX1orc",
    "title": "Taking Bradley with a Drone and C4",
    "url": "https://www.youtube.com/watch?v=kWEb_lX1orc",
    "youtubeId": "kWEb_lX1orc",
    "categorySlug": "bradley-apc-panzer-besiegen",
    "stageSlug": "events_bosses"
  },
  {
    "id": "bradley-apc-panzer-besiegen-pdxfIVdk2iQ",
    "title": "How To Take Bradley – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=pdxfIVdk2iQ",
    "youtubeId": "pdxfIVdk2iQ",
    "categorySlug": "bradley-apc-panzer-besiegen",
    "stageSlug": "events_bosses"
  },
  {
    "id": "patrol-helicopter-heli-abschie-en-tp5uDSCKVkw",
    "title": "Taking Patrol Helicopter The Best Way",
    "url": "https://www.youtube.com/watch?v=tp5uDSCKVkw",
    "youtubeId": "tp5uDSCKVkw",
    "categorySlug": "patrol-helicopter-heli-abschie-en",
    "stageSlug": "events_bosses"
  },
  {
    "id": "patrol-helicopter-heli-abschie-en-6OJjTQ-hBkA",
    "title": "Rust Beginner's Guide – How To Take Down Heli",
    "url": "https://www.youtube.com/watch?v=6OJjTQ-hBkA",
    "youtubeId": "6OJjTQ-hBkA",
    "categorySlug": "patrol-helicopter-heli-abschie-en",
    "stageSlug": "events_bosses"
  },
  {
    "id": "patrol-helicopter-heli-abschie-en-oPKrHHqBarc",
    "title": "How to CORRECTLY Take Patrol Heli",
    "url": "https://www.youtube.com/watch?v=oPKrHHqBarc",
    "youtubeId": "oPKrHHqBarc",
    "categorySlug": "patrol-helicopter-heli-abschie-en",
    "stageSlug": "events_bosses"
  },
  {
    "id": "patrol-helicopter-heli-abschie-en--rgYdHWQkhM",
    "title": "A complete guide to taking Heli in Rust",
    "url": "https://www.youtube.com/watch?v=-rgYdHWQkhM",
    "youtubeId": "-rgYdHWQkhM",
    "categorySlug": "patrol-helicopter-heli-abschie-en",
    "stageSlug": "events_bosses"
  },
  {
    "id": "patrol-helicopter-heli-abschie-en-B-UbBrHbAh0",
    "title": "NEW Patrol Helicopter & Tower Guide",
    "url": "https://www.youtube.com/watch?v=B-UbBrHbAh0",
    "youtubeId": "B-UbBrHbAh0",
    "categorySlug": "patrol-helicopter-heli-abschie-en",
    "stageSlug": "events_bosses"
  },
  {
    "id": "patrol-helicopter-heli-abschie-en-mLIF9m0NMtU",
    "title": "Rust Heli! How to take down the Patrol Helicopter",
    "url": "https://www.youtube.com/watch?v=mLIF9m0NMtU",
    "youtubeId": "mLIF9m0NMtU",
    "categorySlug": "patrol-helicopter-heli-abschie-en",
    "stageSlug": "events_bosses"
  },
  {
    "id": "patrol-helicopter-heli-abschie-en-9qW0Swh4-pg",
    "title": "Rust – Patrol Helicopter Guide",
    "url": "https://www.youtube.com/watch?v=9qW0Swh4-pg",
    "youtubeId": "9qW0Swh4-pg",
    "categorySlug": "patrol-helicopter-heli-abschie-en",
    "stageSlug": "events_bosses"
  },
  {
    "id": "patrol-helicopter-heli-abschie-en-_gTyuLbVq7A",
    "title": "Patrol Helicopter Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=_gTyuLbVq7A",
    "youtubeId": "_gTyuLbVq7A",
    "categorySlug": "patrol-helicopter-heli-abschie-en",
    "stageSlug": "events_bosses"
  },
  {
    "id": "patrol-helicopter-heli-abschie-en-5QbUpxjjkVw",
    "title": "How to Easily Destroy a Patrol Helicopter",
    "url": "https://www.youtube.com/watch?v=5QbUpxjjkVw",
    "youtubeId": "5QbUpxjjkVw",
    "categorySlug": "patrol-helicopter-heli-abschie-en",
    "stageSlug": "events_bosses"
  },
  {
    "id": "attack-helicopter-JX-Nyg6mCqE",
    "title": "Attack Helicopter, Homing Missile & Parachute",
    "url": "https://www.youtube.com/watch?v=JX-Nyg6mCqE",
    "youtubeId": "JX-Nyg6mCqE",
    "categorySlug": "attack-helicopter",
    "stageSlug": "events_bosses"
  },
  {
    "id": "attack-helicopter-DK0wJTCzfnM",
    "title": "New Player Attack Helicopter Guide",
    "url": "https://www.youtube.com/watch?v=DK0wJTCzfnM",
    "youtubeId": "DK0wJTCzfnM",
    "categorySlug": "attack-helicopter",
    "stageSlug": "events_bosses"
  },
  {
    "id": "attack-helicopter-NLlWEfsGhyQ",
    "title": "How to Use Rockets in the Attack Helicopter",
    "url": "https://www.youtube.com/watch?v=NLlWEfsGhyQ",
    "youtubeId": "NLlWEfsGhyQ",
    "categorySlug": "attack-helicopter",
    "stageSlug": "events_bosses"
  },
  {
    "id": "attack-helicopter-ZhbeU1Q_p3I",
    "title": "How to Load Rockets into the Attack Heli",
    "url": "https://www.youtube.com/watch?v=ZhbeU1Q_p3I",
    "youtubeId": "ZhbeU1Q_p3I",
    "categorySlug": "attack-helicopter",
    "stageSlug": "events_bosses"
  },
  {
    "id": "attack-helicopter-5dNUDXDMiho",
    "title": "How to Use The Turret in The Attack Heli",
    "url": "https://www.youtube.com/watch?v=5dNUDXDMiho",
    "youtubeId": "5dNUDXDMiho",
    "categorySlug": "attack-helicopter",
    "stageSlug": "events_bosses"
  },
  {
    "id": "attack-helicopter-B-UbBrHbAh0",
    "title": "NEW Patrol Helicopter & Tower Guide",
    "url": "https://www.youtube.com/watch?v=B-UbBrHbAh0",
    "youtubeId": "B-UbBrHbAh0",
    "categorySlug": "attack-helicopter",
    "stageSlug": "events_bosses"
  },
  {
    "id": "attack-helicopter-TvID5ytf-nI",
    "title": "How to Use Flares in the Attack Heli",
    "url": "https://www.youtube.com/watch?v=TvID5ytf-nI",
    "youtubeId": "TvID5ytf-nI",
    "categorySlug": "attack-helicopter",
    "stageSlug": "events_bosses"
  },
  {
    "id": "attack-helicopter-ROmrnKwzJjU",
    "title": "How to Avoid Attack Helicopters in Rust",
    "url": "https://www.youtube.com/watch?v=ROmrnKwzJjU",
    "youtubeId": "ROmrnKwzJjU",
    "categorySlug": "attack-helicopter",
    "stageSlug": "events_bosses"
  },
  {
    "id": "airdrop-locked-crate-chinook--3c-ZbMAc-4",
    "title": "CH-47 Chinook Event Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=-3c-ZbMAc-4",
    "youtubeId": "-3c-ZbMAc-4",
    "categorySlug": "airdrop-locked-crate-chinook",
    "stageSlug": "events_bosses"
  },
  {
    "id": "airdrop-locked-crate-chinook-dVkALU3lyOI",
    "title": "Rust – CH47 and Locked Loot Crates",
    "url": "https://www.youtube.com/watch?v=dVkALU3lyOI",
    "youtubeId": "dVkALU3lyOI",
    "categorySlug": "airdrop-locked-crate-chinook",
    "stageSlug": "events_bosses"
  },
  {
    "id": "airdrop-locked-crate-chinook-AHBgTZLu9u4",
    "title": "I Found All The Ways to Steal The Chinook",
    "url": "https://www.youtube.com/watch?v=AHBgTZLu9u4",
    "youtubeId": "AHBgTZLu9u4",
    "categorySlug": "airdrop-locked-crate-chinook",
    "stageSlug": "events_bosses"
  },
  {
    "id": "airdrop-locked-crate-chinook-JW-UDQbyiEs",
    "title": "Rust – Airdrop & Locked Crate Guide",
    "url": "https://www.youtube.com/watch?v=JW-UDQbyiEs",
    "youtubeId": "JW-UDQbyiEs",
    "categorySlug": "airdrop-locked-crate-chinook",
    "stageSlug": "events_bosses"
  },
  {
    "id": "airdrop-locked-crate-chinook-Ya0rV1-MFcc",
    "title": "Rust – CH47 Chinook Heli Event, Locked Crate",
    "url": "https://www.youtube.com/watch?v=Ya0rV1-MFcc",
    "youtubeId": "Ya0rV1-MFcc",
    "categorySlug": "airdrop-locked-crate-chinook",
    "stageSlug": "events_bosses"
  },
  {
    "id": "airdrop-locked-crate-chinook-oMLFGIrHPFQ",
    "title": "Defending a LOCKED CRATE at Dome",
    "url": "https://www.youtube.com/watch?v=oMLFGIrHPFQ",
    "youtubeId": "oMLFGIrHPFQ",
    "categorySlug": "airdrop-locked-crate-chinook",
    "stageSlug": "events_bosses"
  },
  {
    "id": "airdrop-locked-crate-chinook-wWpUkmhY9c4",
    "title": "TAKING DOWN the CHINOOK helicopter",
    "url": "https://www.youtube.com/watch?v=wWpUkmhY9c4",
    "youtubeId": "wWpUkmhY9c4",
    "categorySlug": "airdrop-locked-crate-chinook",
    "stageSlug": "events_bosses"
  },
  {
    "id": "airdrop-locked-crate-chinook-P7dxVI9Rpp0",
    "title": "Rust Beginner Guide – Boote Chinook Airdrop",
    "url": "https://www.youtube.com/watch?v=P7dxVI9Rpp0",
    "youtubeId": "P7dxVI9Rpp0",
    "categorySlug": "airdrop-locked-crate-chinook",
    "stageSlug": "events_bosses"
  },
  {
    "id": "airdrop-locked-crate-chinook-gdpHWQGEA3M",
    "title": "Rust Chaos! Overpowered Crates & Chinook",
    "url": "https://www.youtube.com/watch?v=gdpHWQGEA3M",
    "youtubeId": "gdpHWQGEA3M",
    "categorySlug": "airdrop-locked-crate-chinook",
    "stageSlug": "events_bosses"
  },
  {
    "id": "airdrop-locked-crate-chinook-8lq-ChxyZ40",
    "title": "How to Open Locked Crates in Rust",
    "url": "https://www.youtube.com/watch?v=8lq-ChxyZ40",
    "youtubeId": "8lq-ChxyZ40",
    "categorySlug": "airdrop-locked-crate-chinook",
    "stageSlug": "events_bosses"
  },
  {
    "id": "modular-cars-autos-3JHZjZ9NAvs",
    "title": "How to Make a Car in Rust Quick Guide",
    "url": "https://www.youtube.com/watch?v=3JHZjZ9NAvs",
    "youtubeId": "3JHZjZ9NAvs",
    "categorySlug": "modular-cars-autos",
    "stageSlug": "vehicles"
  },
  {
    "id": "modular-cars-autos-eihAv_MueUQ",
    "title": "The Best Vehicle Build In Rust 2024",
    "url": "https://www.youtube.com/watch?v=eihAv_MueUQ",
    "youtubeId": "eihAv_MueUQ",
    "categorySlug": "modular-cars-autos",
    "stageSlug": "vehicles"
  },
  {
    "id": "modular-cars-autos-qsOU4C_7icM",
    "title": "RUST How To Car Guide",
    "url": "https://www.youtube.com/watch?v=qsOU4C_7icM",
    "youtubeId": "qsOU4C_7icM",
    "categorySlug": "modular-cars-autos",
    "stageSlug": "vehicles"
  },
  {
    "id": "modular-cars-autos-nOL4lSOlMLw",
    "title": "Modular Vehicles Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=nOL4lSOlMLw",
    "youtubeId": "nOL4lSOlMLw",
    "categorySlug": "modular-cars-autos",
    "stageSlug": "vehicles"
  },
  {
    "id": "modular-cars-autos-apW0h0JP3Mw",
    "title": "Customize Your RUST Vehicle in Minutes",
    "url": "https://www.youtube.com/watch?v=apW0h0JP3Mw",
    "youtubeId": "apW0h0JP3Mw",
    "categorySlug": "modular-cars-autos",
    "stageSlug": "vehicles"
  },
  {
    "id": "modular-cars-autos-i1ZuSdfHobc",
    "title": "Rust NEW Modular Cars – Quick In-Depth",
    "url": "https://www.youtube.com/watch?v=i1ZuSdfHobc",
    "youtubeId": "i1ZuSdfHobc",
    "categorySlug": "modular-cars-autos",
    "stageSlug": "vehicles"
  },
  {
    "id": "modular-cars-autos-x9u9zBVUUSk",
    "title": "RUST – Best Modular Car Update Guide",
    "url": "https://www.youtube.com/watch?v=x9u9zBVUUSk",
    "youtubeId": "x9u9zBVUUSk",
    "categorySlug": "modular-cars-autos",
    "stageSlug": "vehicles"
  },
  {
    "id": "modular-cars-autos-VqOejl7OCfo",
    "title": "How To Use Vehicle Modules in Rust",
    "url": "https://www.youtube.com/watch?v=VqOejl7OCfo",
    "youtubeId": "VqOejl7OCfo",
    "categorySlug": "modular-cars-autos",
    "stageSlug": "vehicles"
  },
  {
    "id": "modular-cars-autos-jpFGfY0C4Og",
    "title": "MODULAR CARS – Update 2021 – RUST Guide",
    "url": "https://www.youtube.com/watch?v=jpFGfY0C4Og",
    "youtubeId": "jpFGfY0C4Og",
    "categorySlug": "modular-cars-autos",
    "stageSlug": "vehicles"
  },
  {
    "id": "u-boote-submarines-LqWRNtfLl8Q",
    "title": "How to Control the Submarine in Rust",
    "url": "https://www.youtube.com/watch?v=LqWRNtfLl8Q",
    "youtubeId": "LqWRNtfLl8Q",
    "categorySlug": "u-boote-submarines",
    "stageSlug": "vehicles"
  },
  {
    "id": "u-boote-submarines-ZdQmgNJMbXo",
    "title": "How to Use the SUBMARINE & Get Torpedoes",
    "url": "https://www.youtube.com/watch?v=ZdQmgNJMbXo",
    "youtubeId": "ZdQmgNJMbXo",
    "categorySlug": "u-boote-submarines",
    "stageSlug": "vehicles"
  },
  {
    "id": "u-boote-submarines-DQA_PRl4T48",
    "title": "How to Fuel the Submarine in Rust",
    "url": "https://www.youtube.com/watch?v=DQA_PRl4T48",
    "youtubeId": "DQA_PRl4T48",
    "categorySlug": "u-boote-submarines",
    "stageSlug": "vehicles"
  },
  {
    "id": "u-boote-submarines-uRod97iNI1s",
    "title": "RUST: SUBMARINE TIPS! Things u NEED TO KNOW",
    "url": "https://www.youtube.com/watch?v=uRod97iNI1s",
    "youtubeId": "uRod97iNI1s",
    "categorySlug": "u-boote-submarines",
    "stageSlug": "vehicles"
  },
  {
    "id": "u-boote-submarines-2IpOueDVS04",
    "title": "How to Get a Submarine in Rust",
    "url": "https://www.youtube.com/watch?v=2IpOueDVS04",
    "youtubeId": "2IpOueDVS04",
    "categorySlug": "u-boote-submarines",
    "stageSlug": "vehicles"
  },
  {
    "id": "u-boote-submarines-GoJDeiFGTxA",
    "title": "Best Rust Console Underwater Labs & Sub Guide",
    "url": "https://www.youtube.com/watch?v=GoJDeiFGTxA",
    "youtubeId": "GoJDeiFGTxA",
    "categorySlug": "u-boote-submarines",
    "stageSlug": "vehicles"
  },
  {
    "id": "u-boote-submarines-Yj38XRHpD_o",
    "title": "Underwater Labs Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=Yj38XRHpD_o",
    "youtubeId": "Yj38XRHpD_o",
    "categorySlug": "u-boote-submarines",
    "stageSlug": "vehicles"
  },
  {
    "id": "u-boote-submarines-5cgKQhsgGHA",
    "title": "How to Use Torpedoes in Rust",
    "url": "https://www.youtube.com/watch?v=5cgKQhsgGHA",
    "youtubeId": "5cgKQhsgGHA",
    "categorySlug": "u-boote-submarines",
    "stageSlug": "vehicles"
  },
  {
    "id": "u-boote-submarines-bfxdIUg4FcE",
    "title": "Rust Underwater Labs Guide – 2 Minute Tutorial",
    "url": "https://www.youtube.com/watch?v=bfxdIUg4FcE",
    "youtubeId": "bfxdIUg4FcE",
    "categorySlug": "u-boote-submarines",
    "stageSlug": "vehicles"
  },
  {
    "id": "boote-rhib-rowboat-eS2Ldsbggrg",
    "title": "Rust Rowboat and RHIB base – Duo Trio",
    "url": "https://www.youtube.com/watch?v=eS2Ldsbggrg",
    "youtubeId": "eS2Ldsbggrg",
    "categorySlug": "boote-rhib-rowboat",
    "stageSlug": "vehicles"
  },
  {
    "id": "boote-rhib-rowboat-OkrsqhrAuks",
    "title": "The Perfect RHIB/Boat Base – Rust Build",
    "url": "https://www.youtube.com/watch?v=OkrsqhrAuks",
    "youtubeId": "OkrsqhrAuks",
    "categorySlug": "boote-rhib-rowboat",
    "stageSlug": "vehicles"
  },
  {
    "id": "boote-rhib-rowboat-zJY9d5iJShs",
    "title": "Rust – RowBoat Guide – Everything You Need",
    "url": "https://www.youtube.com/watch?v=zJY9d5iJShs",
    "youtubeId": "zJY9d5iJShs",
    "categorySlug": "boote-rhib-rowboat",
    "stageSlug": "vehicles"
  },
  {
    "id": "boote-rhib-rowboat-JAyKi6R10T4",
    "title": "Ultimate Boat Building & Defence Guide",
    "url": "https://www.youtube.com/watch?v=JAyKi6R10T4",
    "youtubeId": "JAyKi6R10T4",
    "categorySlug": "boote-rhib-rowboat",
    "stageSlug": "vehicles"
  },
  {
    "id": "boote-rhib-rowboat-s1qUiX6y8Ew",
    "title": "Rust Boat Base – Base Building Tutorial",
    "url": "https://www.youtube.com/watch?v=s1qUiX6y8Ew",
    "youtubeId": "s1qUiX6y8Ew",
    "categorySlug": "boote-rhib-rowboat",
    "stageSlug": "vehicles"
  },
  {
    "id": "boote-rhib-rowboat-gGqhOFsKPAw",
    "title": "How to Build a PERFECT BOAT in Rust",
    "url": "https://www.youtube.com/watch?v=gGqhOFsKPAw",
    "youtubeId": "gGqhOFsKPAw",
    "categorySlug": "boote-rhib-rowboat",
    "stageSlug": "vehicles"
  },
  {
    "id": "boote-rhib-rowboat-42-3d7VMOu4",
    "title": "The CHEAPEST Rust RHIB Boat Base EVER!!",
    "url": "https://www.youtube.com/watch?v=42-3d7VMOu4",
    "youtubeId": "42-3d7VMOu4",
    "categorySlug": "boote-rhib-rowboat",
    "stageSlug": "vehicles"
  },
  {
    "id": "boote-rhib-rowboat-EJaDfxb8ofE",
    "title": "How to Store Subs and RHIBs in Rust",
    "url": "https://www.youtube.com/watch?v=EJaDfxb8ofE",
    "youtubeId": "EJaDfxb8ofE",
    "categorySlug": "boote-rhib-rowboat",
    "stageSlug": "vehicles"
  },
  {
    "id": "boote-rhib-rowboat-IjCQ8d0XcO0",
    "title": "Shark – Simple RHIB Rust Boat Base",
    "url": "https://www.youtube.com/watch?v=IjCQ8d0XcO0",
    "youtubeId": "IjCQ8d0XcO0",
    "categorySlug": "boote-rhib-rowboat",
    "stageSlug": "vehicles"
  },
  {
    "id": "boote-rhib-rowboat-aEOkD7U0u7w",
    "title": "How To Build a Boat In Rust",
    "url": "https://www.youtube.com/watch?v=aEOkD7U0u7w",
    "youtubeId": "aEOkD7U0u7w",
    "categorySlug": "boote-rhib-rowboat",
    "stageSlug": "vehicles"
  },
  {
    "id": "minicopter-scrap-heli-fliegen-5WRcJNJIIBQ",
    "title": "Minicopter & Scrap Heli Guide – How To Fly",
    "url": "https://www.youtube.com/watch?v=5WRcJNJIIBQ",
    "youtubeId": "5WRcJNJIIBQ",
    "categorySlug": "minicopter-scrap-heli-fliegen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "minicopter-scrap-heli-fliegen-pFBtGwgqhT0",
    "title": "How to fly the Minicopter & Scrap Transport",
    "url": "https://www.youtube.com/watch?v=pFBtGwgqhT0",
    "youtubeId": "pFBtGwgqhT0",
    "categorySlug": "minicopter-scrap-heli-fliegen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "minicopter-scrap-heli-fliegen-2GpaFsx0kOs",
    "title": "How to Fly a Minicopter in Rust (Full Guide)",
    "url": "https://www.youtube.com/watch?v=2GpaFsx0kOs",
    "youtubeId": "2GpaFsx0kOs",
    "categorySlug": "minicopter-scrap-heli-fliegen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "minicopter-scrap-heli-fliegen-OovOTiJITEw",
    "title": "How To Fly MiniCopter & Scrap Heli",
    "url": "https://www.youtube.com/watch?v=OovOTiJITEw",
    "youtubeId": "OovOTiJITEw",
    "categorySlug": "minicopter-scrap-heli-fliegen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "minicopter-scrap-heli-fliegen-wys2e01c9WQ",
    "title": "Rust – How to Fly a Minicopter",
    "url": "https://www.youtube.com/watch?v=wys2e01c9WQ",
    "youtubeId": "wys2e01c9WQ",
    "categorySlug": "minicopter-scrap-heli-fliegen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "minicopter-scrap-heli-fliegen-NDO8YpOX0Sg",
    "title": "How To Fly a Minicopter In Rust",
    "url": "https://www.youtube.com/watch?v=NDO8YpOX0Sg",
    "youtubeId": "NDO8YpOX0Sg",
    "categorySlug": "minicopter-scrap-heli-fliegen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "minicopter-scrap-heli-fliegen-YTFf47CEkbw",
    "title": "Rust – How to fly Minicopter and Scrapcopter",
    "url": "https://www.youtube.com/watch?v=YTFf47CEkbw",
    "youtubeId": "YTFf47CEkbw",
    "categorySlug": "minicopter-scrap-heli-fliegen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "minicopter-scrap-heli-fliegen-KRwWzHrtlq8",
    "title": "The Best Minicopter Pilot Teaches Us How",
    "url": "https://www.youtube.com/watch?v=KRwWzHrtlq8",
    "youtubeId": "KRwWzHrtlq8",
    "categorySlug": "minicopter-scrap-heli-fliegen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "minicopter-scrap-heli-fliegen-dQA6E2mbAVQ",
    "title": "Minicopter Heli Guide – How To Fly 2025",
    "url": "https://www.youtube.com/watch?v=dQA6E2mbAVQ",
    "youtubeId": "dQA6E2mbAVQ",
    "categorySlug": "minicopter-scrap-heli-fliegen",
    "stageSlug": "economy_resources"
  },
  {
    "id": "hei-luftballon-hot-air-balloon-eJlJ-wAjVW8",
    "title": "BEGINNERS GUIDE: How To Fly Air Balloons",
    "url": "https://www.youtube.com/watch?v=eJlJ-wAjVW8",
    "youtubeId": "eJlJ-wAjVW8",
    "categorySlug": "hei-luftballon-hot-air-balloon",
    "stageSlug": "vehicles"
  },
  {
    "id": "hei-luftballon-hot-air-balloon-rSXgXpRDT9Y",
    "title": "How to Fly and Control the Hot Air Balloon",
    "url": "https://www.youtube.com/watch?v=rSXgXpRDT9Y",
    "youtubeId": "rSXgXpRDT9Y",
    "categorySlug": "hei-luftballon-hot-air-balloon",
    "stageSlug": "vehicles"
  },
  {
    "id": "hei-luftballon-hot-air-balloon-uxAS9J0euk0",
    "title": "How to Fly Hot Air Balloons in Rust",
    "url": "https://www.youtube.com/watch?v=uxAS9J0euk0",
    "youtubeId": "uxAS9J0euk0",
    "categorySlug": "hei-luftballon-hot-air-balloon",
    "stageSlug": "vehicles"
  },
  {
    "id": "hei-luftballon-hot-air-balloon-m5NWz-8uTmI",
    "title": "How to Get a Hot Air Balloon in Rust",
    "url": "https://www.youtube.com/watch?v=m5NWz-8uTmI",
    "youtubeId": "m5NWz-8uTmI",
    "categorySlug": "hei-luftballon-hot-air-balloon",
    "stageSlug": "vehicles"
  },
  {
    "id": "hei-luftballon-hot-air-balloon-mFNaJgcv9BU",
    "title": "Rust – How to Use the Hot Air Balloon",
    "url": "https://www.youtube.com/watch?v=mFNaJgcv9BU",
    "youtubeId": "mFNaJgcv9BU",
    "categorySlug": "hei-luftballon-hot-air-balloon",
    "stageSlug": "vehicles"
  },
  {
    "id": "hei-luftballon-hot-air-balloon-VsuVlTYVaVM",
    "title": "How to Fuel the Hot Air Balloon",
    "url": "https://www.youtube.com/watch?v=VsuVlTYVaVM",
    "youtubeId": "VsuVlTYVaVM",
    "categorySlug": "hei-luftballon-hot-air-balloon",
    "stageSlug": "vehicles"
  },
  {
    "id": "hei-luftballon-hot-air-balloon-DdqxZE10Thw",
    "title": "How to Fly and Control the Hot Air Balloon 2",
    "url": "https://www.youtube.com/watch?v=DdqxZE10Thw",
    "youtubeId": "DdqxZE10Thw",
    "categorySlug": "hei-luftballon-hot-air-balloon",
    "stageSlug": "vehicles"
  },
  {
    "id": "hei-luftballon-hot-air-balloon-Iqi0TO4nnYI",
    "title": "How To Get Hot Air Balloon in Rust",
    "url": "https://www.youtube.com/watch?v=Iqi0TO4nnYI",
    "youtubeId": "Iqi0TO4nnYI",
    "categorySlug": "hei-luftballon-hot-air-balloon",
    "stageSlug": "vehicles"
  },
  {
    "id": "hei-luftballon-hot-air-balloon-UyoJJLjVHJ0",
    "title": "How To Get And Use Hot Air Balloon Armor",
    "url": "https://www.youtube.com/watch?v=UyoJJLjVHJ0",
    "youtubeId": "UyoJJLjVHJ0",
    "categorySlug": "hei-luftballon-hot-air-balloon",
    "stageSlug": "vehicles"
  },
  {
    "id": "z-ge-workcart-above-ground-rail-420Qha-ZXu0",
    "title": "Work Cart Tunnel Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=420Qha-ZXu0",
    "youtubeId": "420Qha-ZXu0",
    "categorySlug": "z-ge-workcart-above-ground-rail",
    "stageSlug": "start_here"
  },
  {
    "id": "z-ge-workcart-above-ground-rail-Pe5ZFGDGV48",
    "title": "Rust – Above-ground Trains Update – Everything",
    "url": "https://www.youtube.com/watch?v=Pe5ZFGDGV48",
    "youtubeId": "Pe5ZFGDGV48",
    "categorySlug": "z-ge-workcart-above-ground-rail",
    "stageSlug": "start_here"
  },
  {
    "id": "z-ge-workcart-above-ground-rail-JFp1JUAukes",
    "title": "RUST: New Workcarts and Underground rail",
    "url": "https://www.youtube.com/watch?v=JFp1JUAukes",
    "youtubeId": "JFp1JUAukes",
    "categorySlug": "z-ge-workcart-above-ground-rail",
    "stageSlug": "start_here"
  },
  {
    "id": "z-ge-workcart-above-ground-rail-xDBlJXYGwWI",
    "title": "RUST Above-Ground Trains are HERE!!",
    "url": "https://www.youtube.com/watch?v=xDBlJXYGwWI",
    "youtubeId": "xDBlJXYGwWI",
    "categorySlug": "z-ge-workcart-above-ground-rail",
    "stageSlug": "start_here"
  },
  {
    "id": "z-ge-workcart-above-ground-rail-ntoudT6eZuA",
    "title": "Train Yard Monument Loot & Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=ntoudT6eZuA",
    "youtubeId": "ntoudT6eZuA",
    "categorySlug": "z-ge-workcart-above-ground-rail",
    "stageSlug": "start_here"
  },
  {
    "id": "z-ge-workcart-above-ground-rail--6mFK1Tb9eA",
    "title": "Freight Transit Line Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=-6mFK1Tb9eA",
    "youtubeId": "-6mFK1Tb9eA",
    "categorySlug": "z-ge-workcart-above-ground-rail",
    "stageSlug": "start_here"
  },
  {
    "id": "z-ge-workcart-above-ground-rail-x-IRp2wrUq0",
    "title": "Rust – How to Drive Trains, Attach and Detach",
    "url": "https://www.youtube.com/watch?v=x-IRp2wrUq0",
    "youtubeId": "x-IRp2wrUq0",
    "categorySlug": "z-ge-workcart-above-ground-rail",
    "stageSlug": "start_here"
  },
  {
    "id": "z-ge-workcart-above-ground-rail-a30ETOIV4Ss",
    "title": "NEW Train Event – Train Yard Monument",
    "url": "https://www.youtube.com/watch?v=a30ETOIV4Ss",
    "youtubeId": "a30ETOIV4Ss",
    "categorySlug": "z-ge-workcart-above-ground-rail",
    "stageSlug": "start_here"
  },
  {
    "id": "z-ge-workcart-above-ground-rail-uE_oQy121I8",
    "title": "Rust Train Yard Expansion Overview",
    "url": "https://www.youtube.com/watch?v=uE_oQy121I8",
    "youtubeId": "uE_oQy121I8",
    "categorySlug": "z-ge-workcart-above-ground-rail",
    "stageSlug": "start_here"
  },
  {
    "id": "z-ge-workcart-above-ground-rail-dOdFE3FI6l0",
    "title": "Ultimate Rust TRAINYARD Puzzle Guide",
    "url": "https://www.youtube.com/watch?v=dOdFE3FI6l0",
    "youtubeId": "dOdFE3FI6l0",
    "categorySlug": "z-ge-workcart-above-ground-rail",
    "stageSlug": "start_here"
  },
  {
    "id": "raiding-guide-kosten-basics-GVA-RLboMI0",
    "title": "The ULTIMATE Rust Raiding Guide In 2026",
    "url": "https://www.youtube.com/watch?v=GVA-RLboMI0",
    "youtubeId": "GVA-RLboMI0",
    "categorySlug": "raiding-guide-kosten-basics",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "raiding-guide-kosten-basics-MoiAyqT6UyA",
    "title": "Ultimate Raiding Guide – Most Efficient Way",
    "url": "https://www.youtube.com/watch?v=MoiAyqT6UyA",
    "youtubeId": "MoiAyqT6UyA",
    "categorySlug": "raiding-guide-kosten-basics",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "raiding-guide-kosten-basics-Ny7fL1RQPoY",
    "title": "Ultimate Solo Raiding Guide – Best Strategies",
    "url": "https://www.youtube.com/watch?v=Ny7fL1RQPoY",
    "youtubeId": "Ny7fL1RQPoY",
    "categorySlug": "raiding-guide-kosten-basics",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "raiding-guide-kosten-basics-XWlNXkitj7o",
    "title": "NEW Raiding META? – Ultimate Primitive Raiding",
    "url": "https://www.youtube.com/watch?v=XWlNXkitj7o",
    "youtubeId": "XWlNXkitj7o",
    "categorySlug": "raiding-guide-kosten-basics",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "raiding-guide-kosten-basics-Q3sZdKLzSgE",
    "title": "Raiding Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=Q3sZdKLzSgE",
    "youtubeId": "Q3sZdKLzSgE",
    "categorySlug": "raiding-guide-kosten-basics",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "raiding-guide-kosten-basics-w0QQJ07Ohq8",
    "title": "A Beginner's Step-By-Step Guide to Raiding",
    "url": "https://www.youtube.com/watch?v=w0QQJ07Ohq8",
    "youtubeId": "w0QQJ07Ohq8",
    "categorySlug": "raiding-guide-kosten-basics",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "raiding-guide-kosten-basics-JziB9Zt7uR0",
    "title": "The Raid Base Setup Guide Everyone Needs",
    "url": "https://www.youtube.com/watch?v=JziB9Zt7uR0",
    "youtubeId": "JziB9Zt7uR0",
    "categorySlug": "raiding-guide-kosten-basics",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "raiding-guide-kosten-basics-GCn-wUanF2k",
    "title": "The Cheapest Ways To RAID In Rust",
    "url": "https://www.youtube.com/watch?v=GCn-wUanF2k",
    "youtubeId": "GCn-wUanF2k",
    "categorySlug": "raiding-guide-kosten-basics",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "raiding-guide-kosten-basics-y6ncGBiMOL4",
    "title": "BEGINNERS GUIDE: 5 Tips and Strategies for Raiding",
    "url": "https://www.youtube.com/watch?v=y6ncGBiMOL4",
    "youtubeId": "y6ncGBiMOL4",
    "categorySlug": "raiding-guide-kosten-basics",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "wie-raiden-sprengstoff-einsetzen-MoiAyqT6UyA",
    "title": "Ultimate Raiding Guide – Most Efficient Way",
    "url": "https://www.youtube.com/watch?v=MoiAyqT6UyA",
    "youtubeId": "MoiAyqT6UyA",
    "categorySlug": "wie-raiden-sprengstoff-einsetzen",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "wie-raiden-sprengstoff-einsetzen-7VrvVsXeTaQ",
    "title": "Rust How to Raid 2021",
    "url": "https://www.youtube.com/watch?v=7VrvVsXeTaQ",
    "youtubeId": "7VrvVsXeTaQ",
    "categorySlug": "wie-raiden-sprengstoff-einsetzen",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "wie-raiden-sprengstoff-einsetzen-Q3sZdKLzSgE",
    "title": "Raiding Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=Q3sZdKLzSgE",
    "youtubeId": "Q3sZdKLzSgE",
    "categorySlug": "wie-raiden-sprengstoff-einsetzen",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "wie-raiden-sprengstoff-einsetzen-Ny7fL1RQPoY",
    "title": "Ultimate Solo Raiding Guide",
    "url": "https://www.youtube.com/watch?v=Ny7fL1RQPoY",
    "youtubeId": "Ny7fL1RQPoY",
    "categorySlug": "wie-raiden-sprengstoff-einsetzen",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "wie-raiden-sprengstoff-einsetzen-McRM05n6Aig",
    "title": "How To Get And Use Explosives in Rust",
    "url": "https://www.youtube.com/watch?v=McRM05n6Aig",
    "youtubeId": "McRM05n6Aig",
    "categorySlug": "wie-raiden-sprengstoff-einsetzen",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "wie-raiden-sprengstoff-einsetzen-sr0J7BZL55Y",
    "title": "How To Rust: Day 44! – Using C4, Rockets",
    "url": "https://www.youtube.com/watch?v=sr0J7BZL55Y",
    "youtubeId": "sr0J7BZL55Y",
    "categorySlug": "wie-raiden-sprengstoff-einsetzen",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "wie-raiden-sprengstoff-einsetzen-cqRTbM7hOfc",
    "title": "Rust Tips – How To Get Explosives FAST!",
    "url": "https://www.youtube.com/watch?v=cqRTbM7hOfc",
    "youtubeId": "cqRTbM7hOfc",
    "categorySlug": "wie-raiden-sprengstoff-einsetzen",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "wie-raiden-sprengstoff-einsetzen-XWlNXkitj7o",
    "title": "NEW Raiding META?",
    "url": "https://www.youtube.com/watch?v=XWlNXkitj7o",
    "youtubeId": "XWlNXkitj7o",
    "categorySlug": "wie-raiden-sprengstoff-einsetzen",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "wie-raiden-sprengstoff-einsetzen-RODA9LNkCzY",
    "title": "How To Use Explosives in Rust",
    "url": "https://www.youtube.com/watch?v=RODA9LNkCzY",
    "youtubeId": "RODA9LNkCzY",
    "categorySlug": "wie-raiden-sprengstoff-einsetzen",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "wie-raiden-sprengstoff-einsetzen-gxiYodTjN70",
    "title": "The SMART WAY to Raiding Rust Bases",
    "url": "https://www.youtube.com/watch?v=gxiYodTjN70",
    "youtubeId": "gxiYodTjN70",
    "categorySlug": "wie-raiden-sprengstoff-einsetzen",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "pvp-guide-coG1qbzsN8U",
    "title": "15 PRO Tips to WIN MORE FIGHTS in Rust!",
    "url": "https://www.youtube.com/watch?v=coG1qbzsN8U",
    "youtubeId": "coG1qbzsN8U",
    "categorySlug": "pvp-guide",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "pvp-guide-JW2FwsgFRPM",
    "title": "How to WIN EVERY FIGHT in Rust (20 Pro Tips)",
    "url": "https://www.youtube.com/watch?v=JW2FwsgFRPM",
    "youtubeId": "JW2FwsgFRPM",
    "categorySlug": "pvp-guide",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "pvp-guide-pilTZe1SSBg",
    "title": "How to ACTUALLY FIGHT like a PRO in RUST",
    "url": "https://www.youtube.com/watch?v=pilTZe1SSBg",
    "youtubeId": "pilTZe1SSBg",
    "categorySlug": "pvp-guide",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "pvp-guide-DfRlCWeoxvs",
    "title": "RUST – HOW TO ALWAYS WIN GUNFIGHTS",
    "url": "https://www.youtube.com/watch?v=DfRlCWeoxvs",
    "youtubeId": "DfRlCWeoxvs",
    "categorySlug": "pvp-guide",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "pvp-guide-OWZkwcheNu8",
    "title": "HOW TO WIN MORE FIGHTS CONSISTENTLY",
    "url": "https://www.youtube.com/watch?v=OWZkwcheNu8",
    "youtubeId": "OWZkwcheNu8",
    "categorySlug": "pvp-guide",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "pvp-guide-dnpWl_Npd1o",
    "title": "HOW TO GET GOOD AT RUST PVP 2024",
    "url": "https://www.youtube.com/watch?v=dnpWl_Npd1o",
    "youtubeId": "dnpWl_Npd1o",
    "categorySlug": "pvp-guide",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "pvp-guide-CPf9_s9f9BU",
    "title": "PvP Tips n' Tricks – Rust Console",
    "url": "https://www.youtube.com/watch?v=CPf9_s9f9BU",
    "youtubeId": "CPf9_s9f9BU",
    "categorySlug": "pvp-guide",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "pvp-guide-KfbJECZ9udM",
    "title": "RUST – Absolute beginners guide – Low Skill PvP",
    "url": "https://www.youtube.com/watch?v=KfbJECZ9udM",
    "youtubeId": "KfbJECZ9udM",
    "categorySlug": "pvp-guide",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "pvp-guide-xpsitYA7Cgs",
    "title": "3 Best Tips To Win More Primitive Fights",
    "url": "https://www.youtube.com/watch?v=xpsitYA7Cgs",
    "youtubeId": "xpsitYA7Cgs",
    "categorySlug": "pvp-guide",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "pvp-guide-8hteJtJt0_M",
    "title": "How to GET BETTER at BOW PVP Rust",
    "url": "https://www.youtube.com/watch?v=8hteJtJt0_M",
    "youtubeId": "8hteJtJt0_M",
    "categorySlug": "pvp-guide",
    "stageSlug": "combat_raiding"
  },
  {
    "id": "recoil-control-aim-training--stHqrthxE0",
    "title": "How to INSTANTLY Improve Your Recoil",
    "url": "https://www.youtube.com/watch?v=-stHqrthxE0",
    "youtubeId": "-stHqrthxE0",
    "categorySlug": "recoil-control-aim-training",
    "stageSlug": "start_here"
  },
  {
    "id": "recoil-control-aim-training-WqJIC0JosaI",
    "title": "How To Get PERFECT AIM in Rust (No BS Guide)",
    "url": "https://www.youtube.com/watch?v=WqJIC0JosaI",
    "youtubeId": "WqJIC0JosaI",
    "categorySlug": "recoil-control-aim-training",
    "stageSlug": "start_here"
  },
  {
    "id": "recoil-control-aim-training-mVlCUvmUMDQ",
    "title": "Where to AIM TRAIN in Rust",
    "url": "https://www.youtube.com/watch?v=mVlCUvmUMDQ",
    "youtubeId": "mVlCUvmUMDQ",
    "categorySlug": "recoil-control-aim-training",
    "stageSlug": "start_here"
  },
  {
    "id": "recoil-control-aim-training-G6rKUUblNSM",
    "title": "A Rust Veteran's Guide on Recoil Control",
    "url": "https://www.youtube.com/watch?v=G6rKUUblNSM",
    "youtubeId": "G6rKUUblNSM",
    "categorySlug": "recoil-control-aim-training",
    "stageSlug": "start_here"
  },
  {
    "id": "recoil-control-aim-training-nG_de-sBgQ0",
    "title": "CONTROLLING RECOIL and AIM Tutorial 2024",
    "url": "https://www.youtube.com/watch?v=nG_de-sBgQ0",
    "youtubeId": "nG_de-sBgQ0",
    "categorySlug": "recoil-control-aim-training",
    "stageSlug": "start_here"
  },
  {
    "id": "recoil-control-aim-training-j5aVK9qMT3k",
    "title": "6 Tips That Will INSTANTLY FIX Your Aim",
    "url": "https://www.youtube.com/watch?v=j5aVK9qMT3k",
    "youtubeId": "j5aVK9qMT3k",
    "categorySlug": "recoil-control-aim-training",
    "stageSlug": "start_here"
  },
  {
    "id": "recoil-control-aim-training-rCvJY7vpzZ4",
    "title": "A RUST VETERAN'S GUIDE on RECOIL CONTROL",
    "url": "https://www.youtube.com/watch?v=rCvJY7vpzZ4",
    "youtubeId": "rCvJY7vpzZ4",
    "categorySlug": "recoil-control-aim-training",
    "stageSlug": "start_here"
  },
  {
    "id": "recoil-control-aim-training-5S7ux8K1at4",
    "title": "How to Improve Aiming in Rust",
    "url": "https://www.youtube.com/watch?v=5S7ux8K1at4",
    "youtubeId": "5S7ux8K1at4",
    "categorySlug": "recoil-control-aim-training",
    "stageSlug": "start_here"
  },
  {
    "id": "recoil-control-aim-training-AsC3P-0Esw4",
    "title": "How to AIM TRAIN in Rust 2021",
    "url": "https://www.youtube.com/watch?v=AsC3P-0Esw4",
    "youtubeId": "AsC3P-0Esw4",
    "categorySlug": "recoil-control-aim-training",
    "stageSlug": "start_here"
  },
  {
    "id": "recoil-control-aim-training-ZjA9kJNZtLM",
    "title": "PERFECT RECOIL in RUST – EZ3 Aim Train",
    "url": "https://www.youtube.com/watch?v=ZjA9kJNZtLM",
    "youtubeId": "ZjA9kJNZtLM",
    "categorySlug": "recoil-control-aim-training",
    "stageSlug": "start_here"
  },
  {
    "id": "loadouts-roaming-r-stung-ausr-stung-futa2Pr-KgM",
    "title": "Armor & Clothing Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=futa2Pr-KgM",
    "youtubeId": "futa2Pr-KgM",
    "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
    "stageSlug": "start_here"
  },
  {
    "id": "loadouts-roaming-r-stung-ausr-stung-bNqbB_aHEtY",
    "title": "The Only Rust Armor Guide You'll Ever Need",
    "url": "https://www.youtube.com/watch?v=bNqbB_aHEtY",
    "youtubeId": "bNqbB_aHEtY",
    "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
    "stageSlug": "start_here"
  },
  {
    "id": "loadouts-roaming-r-stung-ausr-stung-U2tuehA7nLc",
    "title": "The CHEAPEST Armor Setup That Actually Works",
    "url": "https://www.youtube.com/watch?v=U2tuehA7nLc",
    "youtubeId": "U2tuehA7nLc",
    "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
    "stageSlug": "start_here"
  },
  {
    "id": "loadouts-roaming-r-stung-ausr-stung-tLvyS_y181A",
    "title": "Armor & Plating Inserts Guide – Rust Tutorial",
    "url": "https://www.youtube.com/watch?v=tLvyS_y181A",
    "youtubeId": "tLvyS_y181A",
    "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
    "stageSlug": "start_here"
  },
  {
    "id": "loadouts-roaming-r-stung-ausr-stung-cdNu_TNmwp8",
    "title": "ARMOR OVERVIEW – Projectile protection",
    "url": "https://www.youtube.com/watch?v=cdNu_TNmwp8",
    "youtubeId": "cdNu_TNmwp8",
    "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
    "stageSlug": "start_here"
  },
  {
    "id": "loadouts-roaming-r-stung-ausr-stung-WFmF4MgF5EI",
    "title": "Rust Tutorial: Best Armor and Clothing",
    "url": "https://www.youtube.com/watch?v=WFmF4MgF5EI",
    "youtubeId": "WFmF4MgF5EI",
    "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
    "stageSlug": "start_here"
  },
  {
    "id": "loadouts-roaming-r-stung-ausr-stung-lQ7Ov6XNIIk",
    "title": "RU RUST – Best & Worst Armour Stats Guide",
    "url": "https://www.youtube.com/watch?v=lQ7Ov6XNIIk",
    "youtubeId": "lQ7Ov6XNIIk",
    "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
    "stageSlug": "start_here"
  },
  {
    "id": "loadouts-roaming-r-stung-ausr-stung-5j9FDs8gmA0",
    "title": "Best Primitive Armor Kit in Rust",
    "url": "https://www.youtube.com/watch?v=5j9FDs8gmA0",
    "youtubeId": "5j9FDs8gmA0",
    "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
    "stageSlug": "start_here"
  },
  {
    "id": "loadouts-roaming-r-stung-ausr-stung-foZFOTgklPY",
    "title": "Why you should always roam with Primitive",
    "url": "https://www.youtube.com/watch?v=foZFOTgklPY",
    "youtubeId": "foZFOTgklPY",
    "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
    "stageSlug": "start_here"
  },
  {
    "id": "loadouts-roaming-r-stung-ausr-stung-3H2r7K28WoY",
    "title": "Top Armor Kit in Rust",
    "url": "https://www.youtube.com/watch?v=3H2r7K28WoY",
    "youtubeId": "3H2r7K28WoY",
    "categorySlug": "loadouts-roaming-r-stung-ausr-stung",
    "stageSlug": "start_here"
  }
];
