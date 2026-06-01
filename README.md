# FilterFlow

FilterFlow is a polished React workspace for managing product and engineering work through fast filters, multiple task views, keyboard-driven navigation, and an optional AI assistant. It is built as a Vite single-page application with Tailwind CSS, Framer Motion, Lucide icons, and local in-memory task data.

The current product behaves like a high-fidelity project operations dashboard: users can inspect seeded tasks, filter and sort work, switch between list/board/calendar/timeline/project/sprint/report/insight views, create and edit tasks during the session, and ask a Claude-powered assistant to analyze the current workspace when an Anthropic API key is configured.

## Table of Contents

- [Highlights](#highlights)
- [Product Overview](#product-overview)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Core Workflows](#core-workflows)
- [Architecture Notes](#architecture-notes)
- [Data Model](#data-model)
- [AI Assistant](#ai-assistant)
- [Styling and Theming](#styling-and-theming)
- [Deployment](#deployment)
- [Quality and Maintenance](#quality-and-maintenance)
- [Known Limitations](#known-limitations)
- [Roadmap Ideas](#roadmap-ideas)
- [Contributing](#contributing)
- [License](#license)

## Highlights

- **Multi-view task workspace** with inbox-style task list, personal task filtering, board, calendar, timeline, projects, sprints, reports, and insights views.
- **Responsive interface** with a desktop sidebar, mobile drawer, mobile task list, and adaptive toast positioning.
- **Advanced filtering** across search, status, priority, assignee, project, due date range, and sortable table columns.
- **Task operations** including create, update, delete, duplicate, status movement, detail sheet editing, and bulk updates.
- **Command palette** for navigation, task creation, AI panel access, quick filters, filter clearing, theme changes, and shortcut discovery.
- **Keyboard shortcuts** for common workflows such as command palette, new task creation, assistant toggling, and overlay dismissal.
- **AI assistant panel** that sends current task context to Claude when `VITE_ANTHROPIC_API_KEY` is available.
- **Theme support** for dark and light modes through CSS variables and persisted `localStorage` preferences.
- **Render static-site deployment** with a Vite production build emitted to `dist/`.

## Product Overview

FilterFlow is designed for teams that need to triage and understand work quickly. The interface emphasizes dense, scannable operational information rather than marketing-style presentation. The primary screen is the workspace itself: navigation, filters, table/board views, task details, and AI analysis are all available without moving through a separate landing page.

The seeded workspace includes projects such as:

- Core App
- Render Deploy
- Analytics Engine
- Design System
- API Integration

The seeded team includes named assignees and realistic task metadata so the dashboard can be explored immediately after installation.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3, CSS custom properties |
| Animation | Framer Motion |
| Icons | Lucide React |
| Dates | date-fns |
| Notifications | react-hot-toast |
| AI integration | Anthropic Messages API through a small browser-side wrapper |
| Deployment target | Render static site |

## Repository Structure

```text
FilterFlow/
├── src/
│   ├── App.jsx                         # Main application shell and view router
│   ├── main.jsx                        # React entry point
│   ├── index.css                       # Tailwind imports, global styles, theme classes
│   ├── data/
│   │   └── tasks.js                    # Seed task, team, and project data
│   ├── hooks/
│   │   ├── useTaskStore.js             # In-memory task CRUD and movement operations
│   │   ├── useFilters.js               # Search, filters, date range, sorting
│   │   ├── useKeyboard.js              # Global keyboard shortcut registration
│   │   ├── useMediaQuery.js            # Responsive viewport helpers
│   │   ├── useTheme.js                 # Theme state, CSS variable application
│   │   └── useClickOutside.js          # Shared outside-click behavior
│   ├── lib/
│   │   └── anthropic.js                # Claude API wrapper and JSON parsing helper
│   └── components/
│       ├── filters/                    # Filter toolbar, dropdowns, chips, date range UI
│       ├── layout/                     # Sidebar, top nav, assistant panel, footer, guide
│       ├── modals/                     # New task, command palette, shortcuts modal
│       ├── tasks/                      # Task table, mobile list, row, card, details, bulk actions
│       ├── ui/                         # Small reusable UI primitives
│       └── views/                      # Board, calendar, timeline, projects, sprints, reports, insights
├── dist/                               # Generated Vite build output, if committed for hosting/demo needs
├── index.html                          # Vite HTML shell
├── package.json                        # npm scripts and dependencies
├── tailwind.config.js                  # Tailwind theme extension
├── postcss.config.js                   # PostCSS/Tailwind wiring
├── vite.config.js                      # Vite React config
├── vercel.json                         # Legacy/optional Vercel SPA rewrite config
├── .env.example                        # Documented environment variable template
├── memory.md                           # Work progress and decision memory
└── README.md
```

> Note: this repository currently contains both `src/components/...` files and older top-level component files such as `src/components/TaskCard.jsx`. The active app imports the organized `layout`, `filters`, `tasks`, `views`, `modals`, and `ui` component paths from `src/App.jsx`.

## Getting Started

### Prerequisites

- Node.js 18 or newer is recommended for Vite 5.
- npm, which is already represented by the committed `package-lock.json`.
- An Anthropic API key only if you want the AI assistant to call Claude.

### Installation

```bash
npm install
```

### Configure Environment

Create a local `.env` file from the example:

```bash
cp .env.example .env
```

Then set your Anthropic key if you want live AI responses:

```bash
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
```

The app still runs without this key. The AI panel will show an error message when a live assistant response is requested without a valid key.

### Run Locally

```bash
npm run dev
```

The Vite dev server is configured to use port `3000` and listen on all hosts:

```text
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

The production build is emitted to `dist/`.

### Preview the Production Build

```bash
npm run preview
```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_ANTHROPIC_API_KEY` | Optional | Browser-exposed Anthropic API key used by `src/lib/anthropic.js` for Claude assistant calls. |

### Important Security Note

Vite exposes variables prefixed with `VITE_` to browser code. That means `VITE_ANTHROPIC_API_KEY` is visible to the client bundle and should not be treated as a private server secret in a production deployment.

For a production-grade AI deployment, route assistant requests through a backend or serverless function that stores the Anthropic key server-side, validates requests, applies rate limits, and returns only the assistant response needed by the UI.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server on port `3000`. |
| `npm run build` | Build the static production bundle into `dist/`. |
| `npm run preview` | Serve the production build locally for verification. |

No lint, format, type-check, or automated test scripts are currently configured in `package.json`.

## Core Workflows

### Navigate the Workspace

Use the sidebar or command palette to move between workspace views:

- Inbox / All Tasks
- My Issues
- Board
- Calendar
- Timeline
- Projects
- Sprints
- Reports
- Insights

`App.jsx` holds the active view in local state and routes to the correct view component.

### Filter Tasks

The filter system supports:

- Debounced title and task ID search
- Multi-select status filters
- Multi-select priority filters
- Multi-select assignee filters
- Multi-select project filters
- Due date range filtering
- Sort toggling by supported task fields

Filtering is implemented in `src/hooks/useFilters.js`. The hook receives the current task list and returns the filter state, derived `filteredTasks`, active filter count, and mutation helpers.

### Manage Tasks

The task store supports:

- Creating tasks
- Updating task fields
- Deleting tasks
- Duplicating tasks
- Moving one or more tasks to another status
- Highlighting newly created tasks for a short period

Task state is managed by `src/hooks/useTaskStore.js` and is intentionally in-memory at this stage. Refreshing the browser resets the workspace to the seed data from `src/data/tasks.js`.

### Use Bulk Actions

The desktop task table supports row selection and select-all behavior. Selected IDs are passed into `BulkActionsBar`, which can apply status/field updates or delete selected tasks.

### Open the Command Palette

Open the command palette with:

- `Cmd + K` on macOS
- `Ctrl + K` on Windows/Linux

The command palette supports keyboard navigation, command search, view switching, task creation, assistant toggling, quick filters, filter clearing, theme changes, and opening the shortcut guide.

### Use Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Cmd/Ctrl + K` | Open command palette |
| `Cmd/Ctrl + J` | Toggle AI assistant panel |
| `Cmd/Ctrl + N` | Open create task modal |
| `Esc` | Close the active overlay or dismiss open UI |
| `?` | Open the keyboard shortcut helper |

### Ask the AI Assistant

Open the assistant panel from the sidebar, command palette, or shortcut. The panel sends a compact version of current task data to Claude and asks for concise project-management help.

Example built-in prompts include:

- Analyze sprint status
- Generate a Redis caching task template
- Show urgent or blocked tasks

## Architecture Notes

### Application Shell

`src/App.jsx` is the central orchestration point. It wires together:

- Layout components
- View routing state
- Task state
- Filter state
- Selection state
- Modal and drawer state
- Keyboard shortcuts
- Theme state
- Toast configuration

### State Management

The app currently uses React hooks and local component state instead of a global external state library. This is appropriate for the current product size, but a backend-backed version would likely introduce a dedicated data layer for persistence, authentication, permissions, and sync.

### Filtering and Sorting

`useFilters` uses `useMemo` to derive filtered task results from task input, search text, filter arrays, date ranges, and sorting state. Search is debounced by 200ms.

### Responsive Behavior

The app switches between desktop and mobile task experiences through `useIsMobile`. Desktop users get the task table and persistent sidebar. Mobile users get a drawer sidebar and compact task list.

### Local Persistence

The following preferences are stored in `localStorage`:

- `ff-theme`: selected theme
- `ff-product-guide-v2-seen`: whether the product guide has been dismissed

Task data itself is not persisted.

## Data Model

Seed tasks have the following general shape:

```js
{
  id: 'FF-101',
  title: 'Implement command palette and search shortcut',
  status: 'in_progress',
  priority: 'urgent',
  project: 'Core App',
  assignee: {
    name: 'Joan Akinseinde',
    initials: 'JA',
    color: 'bg-violet-600',
    image: 'https://...'
  },
  dueDate: '2026-06-02',
  createdAt: '2026-05-22',
  tags: ['command', 'search']
}
```

Supported statuses in the current seed data and UI include:

- `todo`
- `in_progress`
- `in_review`
- `done`
- `blocked`

Supported priorities include:

- `none`
- `low`
- `medium`
- `high`
- `urgent`

## AI Assistant

The assistant integration is implemented in `src/lib/anthropic.js` and consumed by `src/components/layout/AIChatPanel.jsx`.

Current behavior:

- Reads `import.meta.env.VITE_ANTHROPIC_API_KEY`.
- Sends requests to the Anthropic Messages API.
- Uses the configured Claude model string in the local wrapper.
- Includes current task context in the system prompt.
- Simulates streaming in the UI by progressively revealing a completed response.
- Shows an error if the key is missing or the request fails.

Production recommendations:

- Move Anthropic calls behind a backend or serverless API route.
- Keep the Anthropic key out of the browser.
- Add request validation and rate limiting.
- Add user authentication before exposing workspace data to an AI service.
- Store conversation state server-side only if product requirements call for it.

## Styling and Theming

FilterFlow uses Tailwind utility classes for layout and component styling, with CSS variables for application-level colors.

Theme behavior lives in `src/hooks/useTheme.js`. The current implemented themes are:

- `obsidian`
- `arctic`

Some command palette options refer to additional theme names that are not currently defined in `useTheme.js`. Selecting undefined themes is safely ignored by the theme hook.

## Deployment

FilterFlow is deployed as a Render Static Site.

Recommended Render settings:

| Render setting | Value |
| --- | --- |
| Service type | Static Site |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | Node 18 or newer |

For single-page app routing, configure a rewrite rule in Render:

| Source | Destination | Action |
| --- | --- | --- |
| `/*` | `/index.html` | Rewrite |

This builds the Vite app and rewrites client-side routes to `index.html`, which is the standard SPA fallback behavior.

### Render Environment Variables

Add `VITE_ANTHROPIC_API_KEY` in Render only for demos where browser-exposed AI keys are acceptable. For production use, move Anthropic calls behind a server-side API before adding a real provider secret.

### Optional Vercel Config

The repository also includes a `vercel.json` file:

```json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

That file is not the live deployment target documented here. It can be kept only if you want optional Vercel compatibility, or removed later if Render is the only supported hosting platform.

## Quality and Maintenance

Current verification command:

```bash
npm run build
```

Recommended next quality additions:

- ESLint for React and hooks rules.
- Prettier for consistent formatting.
- Vitest and React Testing Library for unit/component coverage.
- Playwright for core workflow checks across desktop and mobile.
- A server-side AI route before any production use of Claude.
- CI checks that run install, lint, tests, and build on pull requests.

## Known Limitations

- Task data is in-memory and resets on page refresh.
- There is no authentication, authorization, or multi-user backend.
- The Anthropic API key is currently read by browser code when configured.
- No automated tests are configured yet.
- No lint or formatter scripts are configured yet.
- The AI command bar in `App.jsx` is currently disabled behind `false && showFilters`.
- Only `obsidian` and `arctic` themes are implemented, while the command palette mentions additional theme names.
- The project includes generated `dist/` output. Teams should decide whether to keep build artifacts committed or generate them only in CI/deployment.

## Roadmap Ideas

- Persistent task storage through an API and database.
- User authentication and workspace membership.
- Saved views and shared filters.
- Real AI natural-language filter parsing.
- Server-side Anthropic integration.
- Drag-and-drop board interactions with optimistic persistence.
- Activity history and audit trails.
- Task comments and attachments.
- Import/export workflows.
- Analytics events for filter and view usage.
- Automated test coverage and CI.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development workflow, branch guidance, commit expectations, and pull request standards.

## Security

See [SECURITY.md](SECURITY.md) for supported reporting guidance and current security notes.

## License

FilterFlow is released under the MIT License. See [LICENSE](LICENSE) for the full text.
