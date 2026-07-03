# RustMasterTool - Frontend Shell (Phase 0.5)

This is the first visible frontend shell for the RustMasterTool project. It is built as a professional SaaS dashboard using React and Vite.

## Fixture Mode
**IMPORTANT**: This application currently runs entirely in **Fixture Mode**. 
- No live BattleMetrics API calls are made.
- No Supabase database connections are active.
- Steam authentication is mocked/disabled.
- Map images are not rehosted.

All data is statically served from src/data/fixtures/ and perfectly matches the audited BattleMetrics API Contract and Field Map.

## Starting the App
From the repository root, run:
\\\ash
npm run dev:web
\\\

## Gated Features
Several features are visibly gated in the UI to ensure future models do not assume they are implemented:
- Historical Population Trends
- Alert Delivery (Discord)
- Real-time Rust+ Pairing
- Watchlist mutations
