# BattleMetrics API Contract

## Executive Summary
This document outlines the official API contract for BattleMetrics usage within RustMasterTool v1. It is strictly based on the official documentation. We adhere to all documented rate limits, authentication methods, and endpoint restrictions.

## Source URL
https://www.battlemetrics.com/developers/documentation

## Last reviewed date
2026-07-03

## Auth
- **Model**: OAuth 2.0 Bearer tokens
- **Header**: Authorization: Bearer <token>
- **Scopes**: Limit tokens via scopes. Less specific scopes allow more flexibility but could allow more access than necessary.

## Base URL
https://api.battlemetrics.com

## Server Search
- **Endpoint**: GET /servers
- **Description**: List, search and filter servers.

## Server Detail
- **Endpoint**: GET /servers/{server_id}
- **Description**: Server info.

## Pagination
- **Parameters**: page[size], page[key], page[rel], page[offset]
- **Size Limit**: Default 10, Range 1-100.
- **Note**: The prev and 
ext links provide the page[key] value automatically. It's recommended not to manually provide this value.

## Filtering
- **Syntax**: ilter[search], ilter[game]=ark, ilter[status]=online, ilter[countries][]=US. Range: ilter[players][min]=0, ilter[players][max]=100.

## Sorting
- **Syntax**: Sort order is ascending by default. Prefix a minus (-) symbol to change to descending. Multiple attributes separated by comma.
- **Example**: sort=rank, sort=-players,name

## Field Selection (Sparse Fieldsets)
- **Syntax**: ields[resource]=field1,field2
- **Example**: ields[server]=name,ip,port

## Includes/Relationships
- **Syntax**: include=relation1,relation2
- **Example**: include=serverGroup,serverDescription

## Rate Limits / Headers
- **Global limit**: 60 requests/minute, 15 requests/second (unauthenticated). 300 requests/minute, 45 requests/second (authenticated).
- **Headers**: 
  - X-Rate-Limit-Limit: Total limit
  - X-Rate-Limit-Remaining: Remaining limit in window

## Error Handling
- Not explicitly documented in terms of JSON format, but standard HTTP status codes apply. 
- Rate limit exceeded (typically 429).
- Unauthorized (401), Forbidden (403).

## Explicitly Excluded Endpoints
- Any POST, PATCH, DELETE on /servers
- Any POST /servers/{id}/rcon
- Any /bans, /bans-native, /player-flags, /player-notes, /reserved-slots, /players (for v1 player tracking is excluded)

## Open Questions
- Rust specific details in the ttributes.details object are not strongly typed or documented in the official API reference, it just states: "Game and server specific information. Will vary from server to server. You should provide reasonable defaults, nothing is guaranteed."

## Product Consequences
- We must handle missing Rust details gracefully.
- We must respect X-Rate-Limit-Remaining.
- We use only GET /servers and GET /servers/{id}.
- Live data fetching must back off if rate limited.
