# ADR 001: Monorepo and Workspace

**Status:** Accepted

## Kontext
Projekt besteht aus mehreren Apps und Packages.
## Entscheidung
Turborepo mit pnpm Workspaces für TS/JS; Cargo Workspace für Rust.
## Konsequenzen
Zentrale Abhängigkeitsverwaltung, saubere Kapselung externer APIs in `packages/`.
