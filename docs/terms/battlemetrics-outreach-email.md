Subject: API Usage Inquiry for Rust Companion Tool (Watchlists & Alerts)

Hello BattleMetrics Team,

I hope this email finds you well. I am currently designing "RustMasterTool" (working title), a companion SaaS application for Rust players. Before moving beyond our initial technical proofs-of-concept, I want to ensure our planned usage of the BattleMetrics API fully complies with your Terms of Service and API guidelines.

**Our Product Context:**
We are building a tool that provides players with server intelligence, user watchlists, wipe reminders, population trends, map context, and eventually Discord alerts.

**Clear Boundaries of our Implementation:**
- We will NOT scrape your website; all data will be fetched strictly via the official API.
- We will NOT bypass any rate limits.
- We will NOT resell raw data or offer competitive API access.
- We will NOT build player dossiers, tracking, or stalking tools.
- We will NOT include ban, RCON, or admin management features.
- We will NOT use or expose sensitive player/session/private data in v1.

**Our Planned Usage Includes:**
- A logged-in web dashboard for players to manage their server watchlists.
- Wipe reminders based on server metadata.
- Population and queue charts based on periodic polling.
- Aggregated historical snapshots to visualize server health over a wipe.
- Discord bot summaries and alerts for watchlisted servers.
- Public, SEO-indexed server detail pages (only if explicitly allowed by you).

**To ensure we build this correctly, could you please clarify the following questions:**
1. Is commercial usage of the API allowed?
2. Is usage inside a paid SaaS/tool permitted?
3. Are logged-in user dashboards utilizing your data allowed?
4. Are Discord bot summaries and alerts allowed?
5. Are public, SEO-indexed server detail pages permitted?
6. What specific attribution or branding is required?
7. What rate limits apply to our intended use case?
8. Are higher or enterprise API limits available for purchase once we scale?
9. Is centralized polling (our backend polling on behalf of user watchlists) allowed, and what is your acceptable polling strategy?
10. May we store aggregated historical snapshots to render our own charts?
11. Which specific API fields are we allowed to store and display?
12. Are there strict restrictions or prohibitions on player, session, or private fields?

We would greatly appreciate your written permission, guidance, or details on any commercial/API/enterprise plans we should consider. We want to be excellent partners and respect your infrastructure and data rights.

Thank you very much for your time and guidance.

Best regards,
Pascal
