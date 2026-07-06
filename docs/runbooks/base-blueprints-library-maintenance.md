# Base Blueprints Library Maintenance

This document explains how the Base Blueprints video library is seeded and maintained without triggering YouTube API rate limits.

## Architecture

To avoid YouTube Data API Quota exhaustion (429 Rate Limit), the Base Blueprints feature utilizes a **cache-first** architecture:
1. Videos are read entirely from the Supabase `base_blueprints` table during initial page loads.
2. The UI never queries the YouTube API directly for the Netflix-style Rails.
3. The Search functionality queries the `base_blueprints` database table (`ilike` on title, category, and array intersection on `tags`).

## How to update the Seed Data

When new videos need to be added to the library, we do NOT use live YouTube search spam. We use a curated Markdown file.

1. **Add videos to the Markdown Seed**
   Open `docs/seeds/rust_youtube_links.md` and append your YouTube links under the appropriate category headers.
   Example:
   ```markdown
   ## Solo (22)
   [BEST Solo Base Design 2026](https://www.youtube.com/watch?v=XYZ123)
   ```

2. **Generate the SQL Migration**
   Run the parser script to generate a new idempotent database migration:
   ```bash
   node scripts/generate-base-blueprints-seed.mjs
   ```

3. **Deploy the Migration**
   Review the generated `.sql` file in `supabase/migrations/` to ensure accuracy, then apply it to the remote database:
   ```bash
   npx supabase db push
   ```

## Managing Refresh Access

The `base-blueprints` Edge Function still contains a `refresh` action that *can* connect to YouTube. However, this is tightly gated to prevent accidental quota usage:
- The "Fetch Live YT" button in the UI is wrapped in `isDev` and is hidden from standard users.
- Regular users cannot trigger live YouTube requests.
