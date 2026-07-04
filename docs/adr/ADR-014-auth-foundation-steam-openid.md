# ADR-014: Auth Foundation - Steam OpenID (Proposed)

## Status
Proposed (Documentation Only)

## Context
We need an authentication mechanism for users of the RustMasterTool. Since this tool targets Rust players, using their existing gaming identities makes onboarding seamless. 

## Decision
- We will likely use Steam OpenID as the primary game identity.
- SteamID64 is considered Personally Identifiable Information (PII) and will be treated as sensitive.
- Discord identity will be explored later as a separate layer.
- **Note:** No implementation has been done yet. This is strictly a planned architecture component.
