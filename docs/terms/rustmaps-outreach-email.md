Subject: API & Image Usage Inquiry for Rust Companion Tool

Hello RustMaps Team,

I hope this email finds you well. I am currently designing "RustMasterTool" (working title), a companion SaaS application for Rust players. Before moving past our initial technical experiments, I want to ensure our planned usage of RustMaps metadata and images fully complies with your Terms of Service.

**Our Product Context:**
We are building a tool that provides Map Intelligence, Seed/Size lookups, monument context, map previews, user watchlists, and eventually Discord alerts for Rust players.

**Clear Boundaries of our Implementation:**
- We will NOT scrape your website; we will only use the official API.
- We will NOT bypass rate limits.
- We will NOT cache or rehost your map images or thumbnails without your explicit permission.
- We will strictly respect and implement any required attribution.
- We will NOT resell raw map assets.

**Our Planned Usage Includes:**
- Seed/Size lookups via the API.
- Fetching map metadata and monument lists.
- Displaying map previews in a logged-in user dashboard.
- Sending Discord embeds with map previews (only if explicitly allowed).
- Public map/server pages (only if explicitly allowed).
- Possible future caching/CDN rehosting to improve performance (only if explicitly allowed).

**To ensure we build this correctly, could you please clarify the following questions:**
1. Is commercial usage of the API allowed?
2. Is usage inside a paid SaaS tool permitted?
3. May we store map metadata (e.g., in our own database)?
4. May we store Seed/Size lookup results?
5. May we store the monument data provided by the API?
6. May we hotlink map image URLs directly from your servers?
7. May we cache thumbnails locally on our servers?
8. May we rehost full images or serve CDN copies of the maps?
9. Are Discord embeds containing your map image previews allowed?
10. Is public SEO usage (displaying maps on public pages) allowed?
11. What exact attribution is required across Web, Discord, and Desktop interfaces?
12. Are there specific rate limits, or do you offer a commercial/API plan?
13. How should our backend properly handle asynchronous map generation requests?

We would greatly appreciate your written permission, guidance, or details on any commercial API plans. Your service is fantastic, and we want to ensure our integration respects your bandwidth and rights.

Thank you very much for your time.

Best regards,
Pascal
