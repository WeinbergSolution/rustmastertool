# Terms Decision Matrix

| Provider | Topic | Current Status | Risk | Question Asked | Allowed Outcome | Denied Outcome | Product Consequence | Fallback |
|---|---|---|---|---|---|---|---|---|
| BattleMetrics | commercial use | Pending | High | Is commercial usage allowed? | Proceed with BM | Blocked | Cannot monetize BM data directly | Rust+ / direct polling |
| BattleMetrics | logged-in dashboard | Pending | Med | Are logged-in dashboards allowed? | Proceed | Blocked | Only desktop/local tool | Remove feature |
| BattleMetrics | Discord bot | Pending | Med | Are Discord bot summaries allowed? | Proceed | Blocked | No Discord alerts | Remove feature |
| BattleMetrics | public SEO server pages | Pending | Med | Are public SEO pages allowed? | Proceed | Blocked | No SEO growth loop | Remove feature |
| BattleMetrics | polling volume / rate limits | Pending | High | What rate limits apply? / Enterprise? | Design robust budget | Throttled | Data degradation required | Drop massive watchlists |
| BattleMetrics | historical snapshots | Pending | Med | May we store historical snapshots? | Build charts | Blocked | No historical charts | Live data only |
| BattleMetrics | allowed fields | Pending | Low | Which fields may be stored? | Use all needed | Filtered | Adjust DB schema | - |
| BattleMetrics | player/private restrictions | Pending | Med | Are player/session fields forbidden? | Use cautiously | Blocked | No player tracking | Exclude feature |
| RustMaps | commercial use | Pending | High | Is commercial usage allowed? | Proceed with RM | Blocked | Cannot monetize RM data | Procedural gen locally |
| RustMaps | metadata storage | Pending | Low | May we store map metadata? | Store in DB | Blocked | Must fetch on the fly | Slow lookups |
| RustMaps | monument data | Pending | Low | May we store monument data? | Store in DB | Blocked | Must fetch on the fly | Slow lookups |
| RustMaps | image hotlinking | Pending | Med | May we hotlink image URLs? | Use direct URLs | Blocked | Rehosting required (if allowed) | No images |
| RustMaps | image caching | Pending | High | May we cache thumbnails? | Cache locally | Blocked | Must hotlink (if allowed) | Slower load times |
| RustMaps | image rehosting/CDN | Pending | High | May we rehost full images? | Use CDN | Blocked | Must hotlink | Dependency on RM uptime |
| RustMaps | Discord embeds | Pending | Med | Are Discord embeds allowed? | Rich embeds | Blocked | Text-only alerts | - |
| RustMaps | public SEO pages | Pending | Med | Is public SEO usage allowed? | Proceed | Blocked | No SEO growth loop | - |
| RustMaps | attribution | Pending | Low | What exact attribution is required? | Implement UI link | Strict rules | UX adjustments | - |
| RustMaps | rate limits / commercial | Pending | Med | Rate limits or commercial plans? | Purchase plan | Throttled | Queue lookups | - |
