# Contributing to FilterFlow

Thank you for improving FilterFlow. This project is currently a Vite React application with local task state, Tailwind styling, and an optional Anthropic-powered assistant.

## Development Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file if you need AI assistant calls:

   ```bash
   cp .env.example .env
   ```

3. Start the app:

   ```bash
   npm run dev
   ```

4. Open:

   ```text
   http://localhost:3000
   ```

## Branching

Use short, descriptive branch names:

- `feature/task-persistence`
- `fix/filter-date-range`
- `docs/readme-refresh`
- `chore/tooling`

## Commit Guidance

Prefer clear commits that describe the user-visible or maintainer-visible change:

- `Add task detail validation`
- `Fix date range filtering`
- `Document Render deployment`
- `Add build verification notes`

Conventional Commits are welcome but not required.

## Pull Request Checklist

Before opening a pull request:

- Confirm the app installs cleanly with `npm install`.
- Run `npm run build`.
- Manually verify the affected workflow in the browser.
- Update `README.md` when setup, scripts, architecture, or user-visible behavior changes.
- Update `memory.md` when a decision, limitation, or major progress item changes.
- Avoid committing secrets or real API keys.
- Keep changes scoped to the purpose of the pull request.

## Code Style

- Follow the existing React component and hook patterns.
- Prefer small, focused components over broad rewrites.
- Keep task state and filtering behavior predictable.
- Use existing UI primitives and Lucide icons where possible.
- Avoid introducing new dependencies unless the product value clearly justifies them.

## Testing Status

Automated tests are not configured yet. Until test tooling is added, use `npm run build` plus manual verification for changed workflows.

Recommended future test layers:

- Vitest for pure logic and hooks.
- React Testing Library for component behavior.
- Playwright for end-to-end workspace flows.

## Documentation Expectations

Documentation should be honest about the current app state. Do not describe a backend, database, authentication, CI pipeline, or production-safe AI secret handling until those systems exist.
