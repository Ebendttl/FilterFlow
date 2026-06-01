# Security Policy

## Supported Versions

FilterFlow is currently maintained from the main repository state. No separate long-term-support branches are defined.

## Reporting a Vulnerability

If you discover a security issue, please report it privately to the repository owner or maintainer instead of opening a public issue with exploit details.

Include:

- A clear summary of the issue.
- Steps to reproduce.
- Impact and affected files or workflows.
- Any suggested mitigation, if known.

## Current Security Notes

- The app is a client-rendered Vite SPA.
- Task data is local seeded data and in-memory state.
- No authentication or authorization layer exists yet.
- `VITE_ANTHROPIC_API_KEY`, when configured, is exposed to browser code because Vite injects `VITE_*` variables into the client bundle.

## Production AI Recommendation

Do not ship a real Anthropic secret directly through `VITE_ANTHROPIC_API_KEY` for production use. Move AI requests behind a backend or serverless route that:

- Stores the provider key server-side.
- Authenticates the user.
- Validates request payloads.
- Applies rate limits.
- Logs failures without storing sensitive prompt data unnecessarily.

## Secret Handling

- Keep `.env` files out of version control.
- Use `.env.example` only for variable names and safe placeholder values.
- Rotate any key that may have been committed, logged, or shared accidentally.
