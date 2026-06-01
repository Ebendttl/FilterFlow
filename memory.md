# FilterFlow Work Memory

This file tracks project context, completed work, active decisions, and known follow-ups so future sessions can stay grounded in the repository instead of guessing.

## Last Updated

- 2026-06-01

## Project Snapshot

- App name: FilterFlow
- App type: Vite React single-page application
- Main entry: `src/App.jsx`
- Package manager: npm with `package-lock.json`
- Styling: Tailwind CSS plus CSS custom properties
- Deployment target: Render static site
- Current data source: local seeded task data from `src/data/tasks.js`
- Current task persistence: in-memory React state only
- Current AI integration: browser-side Anthropic Messages API wrapper in `src/lib/anthropic.js`

## Work Completed

### 2026-06-01

- Replaced the placeholder `README.md` with a detailed, production-style project README.
- Added this `memory.md` file to preserve progress, decisions, limitations, and future priorities.
- Expanded `.env.example` with comments about the optional Anthropic key and browser exposure.
- Expanded `.gitignore` with standard Node, Vite, environment, log, editor, coverage, and test artifact ignores.
- Corrected deployment documentation to identify Render, not Vercel, as the live deployment platform.
- Renamed the seeded deployment project/tasks from Vercel-oriented wording to Render-oriented wording.
- Added standard supporting repo files:
  - `CONTRIBUTING.md`
  - `SECURITY.md`
  - `CHANGELOG.md`
  - `CODE_OF_CONDUCT.md`
  - `.editorconfig`

## Current Product Capabilities

- Task workspace with list, board, calendar, timeline, projects, sprints, reports, and insights views.
- Desktop sidebar and mobile drawer navigation.
- Desktop task table and mobile task list.
- Task create, update, delete, duplicate, move, detail sheet, and bulk action flows.
- Filters for search, status, priority, assignee, project, date range, and sorting.
- Command palette with navigation, filters, task creation, assistant access, theme actions, and help.
- Keyboard shortcuts for command palette, assistant panel, new task modal, escape dismissal, and help.
- Theme handling with persisted `localStorage` preference.
- Optional Claude assistant panel using current task context.

## Important Implementation Facts

- `src/App.jsx` orchestrates layout, active view routing, filters, task state, modal state, selection state, keyboard shortcuts, and toasts.
- `src/hooks/useTaskStore.js` owns in-memory task CRUD operations and starts new generated task IDs at `FF-116`.
- `src/hooks/useFilters.js` derives filtered task results and debounces search by 200ms.
- `src/hooks/useTheme.js` currently defines `obsidian` and `arctic` themes.
- `src/components/modals/CommandPalette.jsx` lists `midnight` and `ember`, but those theme keys are not defined in `useTheme.js`; selecting them is safely ignored.
- `AICommandBar` and `ActiveFilterBar` render blocks are currently disabled in `src/App.jsx` through `false && showFilters`.
- `dist/` exists in the working tree, but the updated `.gitignore` now ignores future generated build output.
- `vercel.json` exists as a legacy/optional Vercel compatibility config; the documented deployment target is Render.

## Known Limitations

- Task data resets on refresh.
- No backend, authentication, authorization, database, or multi-user collaboration exists yet.
- `VITE_ANTHROPIC_API_KEY` is exposed to browser code when configured.
- No lint, format, test, or CI scripts are configured yet.
- No automated test suite exists yet.
- Generated `dist/` output was present before the documentation pass; decide whether the repository should keep or remove built artifacts.

## Decisions Made

- Documentation should describe the actual repository state, including limitations, instead of implying production infrastructure that does not exist yet.
- The README should call out the browser-exposed AI key risk and recommend a backend/serverless proxy for production.
- Supporting files should be conventional and lightweight without adding tool dependencies that are not installed.
- `.editorconfig` is safe to add because it improves editor consistency without requiring a formatter package.

## Recommended Next Steps

- Add ESLint and Prettier configuration with npm scripts.
- Add Vitest and React Testing Library for unit/component tests.
- Add Playwright for core desktop/mobile workflow coverage.
- Move Anthropic calls to a server-side route before production use.
- Decide whether to remove committed `dist/` output and rely on deployment builds.
- Persist tasks through a real API and database.
- Reconcile command palette theme options with implemented themes.
- Decide whether to enable or remove the disabled `AICommandBar` and `ActiveFilterBar` code paths.
