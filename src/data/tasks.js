export const TEAM_MEMBERS = [
  { name: "Sarah Chen", initials: "SC", color: "bg-violet-500", email: "sarah.chen@acme.co" },
  { name: "Marcus Okafor", initials: "MO", color: "bg-blue-500", email: "marcus@acme.co" },
  { name: "Priya Patel", initials: "PP", color: "bg-emerald-500", email: "priya@acme.co" },
  { name: "James Liu", initials: "JL", color: "bg-orange-500", email: "james@acme.co" },
  { name: "Emma Rodriguez", initials: "ER", color: "bg-pink-500", email: "emma@acme.co" },
  { name: "David Kim", initials: "DK", color: "bg-rose-500", email: "david.kim@acme.co" }
];

export const PROJECTS = [
  { name: "Design System", dotColor: "bg-violet-500" },
  { name: "Mobile App", dotColor: "bg-blue-500" },
  { name: "Backend API", dotColor: "bg-emerald-500" },
  { name: "Marketing Site", dotColor: "bg-orange-500" }
];

export const tasks = [
  {
    id: "FF-001",
    title: "Implement OAuth 2.0 token refresh flow",
    status: "in_progress",
    priority: "urgent",
    project: "Backend API",
    assignee: TEAM_MEMBERS[0], // Sarah Chen
    dueDate: "2026-05-30", // Today
    createdAt: "2026-05-20",
    tags: ["auth", "security"]
  },
  {
    id: "FF-002",
    title: "Design onboarding modal animation system",
    status: "todo",
    priority: "high",
    project: "Design System",
    assignee: TEAM_MEMBERS[1], // Marcus Okafor
    dueDate: "2026-06-05", // Future
    createdAt: "2026-05-22",
    tags: ["design", "motion"]
  },
  {
    id: "FF-003",
    title: "Fix memory leak in dashboard WebSocket handler",
    status: "blocked",
    priority: "urgent",
    project: "Backend API",
    assignee: TEAM_MEMBERS[2], // Priya Patel
    dueDate: "2026-05-28", // Overdue
    createdAt: "2026-05-18",
    tags: ["bug", "websocket"]
  },
  {
    id: "FF-004",
    title: "Write API documentation for v3 endpoints",
    status: "done",
    priority: "medium",
    project: "Backend API",
    assignee: TEAM_MEMBERS[3], // James Liu
    dueDate: "2026-05-25", // Overdue/Done (historical)
    createdAt: "2026-05-15",
    tags: ["docs"]
  },
  {
    id: "FF-005",
    title: "Migrate user table to new database schema",
    status: "in_progress",
    priority: "high",
    project: "Backend API",
    assignee: TEAM_MEMBERS[4], // Emma Rodriguez
    dueDate: "2026-05-31", // Tomorrow
    createdAt: "2026-05-10",
    tags: ["migration"]
  },
  {
    id: "FF-006",
    title: "Set up Sentry error tracking for mobile app",
    status: "todo",
    priority: "medium",
    project: "Mobile App",
    assignee: TEAM_MEMBERS[5], // David Kim
    dueDate: "2026-06-12",
    createdAt: "2026-05-25",
    tags: ["mobile", "analytics"]
  },
  {
    id: "FF-007",
    title: "A/B test hero section CTA copy changes",
    status: "in_progress",
    priority: "low",
    project: "Marketing Site",
    assignee: TEAM_MEMBERS[0], // Sarah Chen
    dueDate: "2026-06-02",
    createdAt: "2026-05-28",
    tags: ["marketing", "experiment"]
  },
  {
    id: "FF-008",
    title: "Resolve CORS issue on staging environment",
    status: "done",
    priority: "high",
    project: "Backend API",
    assignee: TEAM_MEMBERS[1], // Marcus Okafor
    dueDate: "2026-05-29", // Yesterday/Done
    createdAt: "2026-05-27",
    tags: ["infrastructure"]
  },
  {
    id: "FF-009",
    title: "Refactor billing table queries for speed",
    status: "in_progress",
    priority: "medium",
    project: "Backend API",
    assignee: TEAM_MEMBERS[2], // Priya Patel
    dueDate: "2026-06-08",
    createdAt: "2026-05-20",
    tags: ["performance"]
  },
  {
    id: "FF-010",
    title: "Create interactive tooltips for filter toolbar",
    status: "in_review",
    priority: "medium",
    project: "Design System",
    assignee: TEAM_MEMBERS[3], // James Liu
    dueDate: "2026-05-30", // Today
    createdAt: "2026-05-24",
    tags: ["ui", "accessibility"]
  },
  {
    id: "FF-011",
    title: "Implement automatic database backups every 6 hours",
    status: "todo",
    priority: "high",
    project: "Backend API",
    assignee: TEAM_MEMBERS[4], // Emma Rodriguez
    dueDate: "2026-06-03",
    createdAt: "2026-05-29",
    tags: ["devops"]
  },
  {
    id: "FF-012",
    title: "Build dark mode toggle and dynamic CSS variables",
    status: "done",
    priority: "low",
    project: "Design System",
    assignee: TEAM_MEMBERS[5], // David Kim
    dueDate: "2026-05-24", // Past/Done
    createdAt: "2026-05-12",
    tags: ["theme"]
  },
  {
    id: "FF-013",
    title: "Add multi-factor authentication setup flow UI",
    status: "in_progress",
    priority: "urgent",
    project: "Mobile App",
    assignee: TEAM_MEMBERS[0], // Sarah Chen
    dueDate: "2026-05-31", // Tomorrow
    createdAt: "2026-05-15",
    tags: ["security"]
  },
  {
    id: "FF-014",
    title: "Optimize image asset compression pipeline",
    status: "todo",
    priority: "low",
    project: "Marketing Site",
    assignee: TEAM_MEMBERS[1], // Marcus Okafor
    dueDate: "2026-06-15",
    createdAt: "2026-05-28",
    tags: ["assets"]
  },
  {
    id: "FF-015",
    title: "Draft release notes for version v2.4.0",
    status: "done",
    priority: "none",
    project: "Marketing Site",
    assignee: TEAM_MEMBERS[2], // Priya Patel
    dueDate: "2026-05-20", // Past/Done
    createdAt: "2026-05-18",
    tags: ["copy"]
  },
  {
    id: "FF-016",
    title: "Conduct UX user testing sessions for calendar view",
    status: "in_review",
    priority: "medium",
    project: "Mobile App",
    assignee: TEAM_MEMBERS[3], // James Liu
    dueDate: "2026-06-01",
    createdAt: "2026-05-25",
    tags: ["ux-testing"]
  },
  {
    id: "FF-017",
    title: "Set up end-to-end testing suite with Playwright",
    status: "in_progress",
    priority: "high",
    project: "Backend API",
    assignee: TEAM_MEMBERS[4], // Emma Rodriguez
    dueDate: "2026-06-10",
    createdAt: "2026-05-20",
    tags: ["testing"]
  },
  {
    id: "FF-018",
    title: "Audit accessibility of the navigation sidebar drawer",
    status: "done",
    priority: "medium",
    project: "Design System",
    assignee: TEAM_MEMBERS[5], // David Kim
    dueDate: "2026-05-26", // Past/Done
    createdAt: "2026-05-22",
    tags: ["a11y"]
  },
  {
    id: "FF-019",
    title: "Integrate Stripe billing webhooks and subscription validation",
    status: "in_progress",
    priority: "high",
    project: "Backend API",
    assignee: TEAM_MEMBERS[0], // Sarah Chen
    dueDate: "2026-06-04",
    createdAt: "2026-05-21",
    tags: ["billing", "stripe"]
  },
  {
    id: "FF-020",
    title: "Improve autocomplete suggestion speed on search bar input",
    status: "in_progress",
    priority: "medium",
    project: "Design System",
    assignee: TEAM_MEMBERS[1], // Marcus Okafor
    dueDate: "2026-06-06",
    createdAt: "2026-05-28",
    tags: ["ux", "performance"]
  },
  {
    id: "FF-021",
    title: "Configure Redis cache for distributed session storage",
    status: "todo",
    priority: "medium",
    project: "Backend API",
    assignee: TEAM_MEMBERS[2], // Priya Patel
    dueDate: "2026-06-11",
    createdAt: "2026-05-29",
    tags: ["cache", "infra"]
  },
  {
    id: "FF-022",
    title: "Create vector SVG logos for marketing header",
    status: "done",
    priority: "low",
    project: "Marketing Site",
    assignee: TEAM_MEMBERS[3], // James Liu
    dueDate: "2026-05-22", // Past/Done
    createdAt: "2026-05-18",
    tags: ["design", "svg"]
  },
  {
    id: "FF-023",
    title: "Fix jumpy scrolling and viewport rendering in task list",
    status: "blocked",
    priority: "high",
    project: "Mobile App",
    assignee: TEAM_MEMBERS[4], // Emma Rodriguez
    dueDate: "2026-05-29", // Overdue
    createdAt: "2026-05-26",
    tags: ["bug", "scroll"]
  },
  {
    id: "FF-024",
    title: "Update npm dependencies and resolve CVE vulnerabilities",
    status: "done",
    priority: "medium",
    project: "Backend API",
    assignee: TEAM_MEMBERS[5], // David Kim
    dueDate: "2026-05-27", // Past/Done
    createdAt: "2026-05-25",
    tags: ["security", "maintenance"]
  },
  {
    id: "FF-025",
    title: "Design empty state illustrations for dashboard empty cards",
    status: "todo",
    priority: "low",
    project: "Design System",
    assignee: TEAM_MEMBERS[0], // Sarah Chen
    dueDate: "2026-06-20",
    createdAt: "2026-05-29",
    tags: ["design"]
  },
  {
    id: "FF-026",
    title: "Implement CSV raw data export for filtered task reports",
    status: "in_review",
    priority: "medium",
    project: "Marketing Site",
    assignee: TEAM_MEMBERS[1], // Marcus Okafor
    dueDate: "2026-05-30", // Today
    createdAt: "2026-05-20",
    tags: ["export", "data"]
  },
  {
    id: "FF-027",
    title: "Optimize bundle size with dynamic code splitting",
    status: "in_progress",
    priority: "medium",
    project: "Mobile App",
    assignee: TEAM_MEMBERS[2], // Priya Patel
    dueDate: "2026-06-07",
    createdAt: "2026-05-25",
    tags: ["optimization"]
  },
  {
    id: "FF-028",
    title: "Set up system health alarm rules and pagerduty thresholds",
    status: "todo",
    priority: "high",
    project: "Backend API",
    assignee: TEAM_MEMBERS[3], // James Liu
    dueDate: "2026-06-09",
    createdAt: "2026-05-28",
    tags: ["devops", "monitoring"]
  },
  {
    id: "FF-029",
    title: "Refactor useFilters custom hook to eliminate layout shifts",
    status: "in_review",
    priority: "medium",
    project: "Design System",
    assignee: TEAM_MEMBERS[4], // Emma Rodriguez
    dueDate: "2026-06-01",
    createdAt: "2026-05-26",
    tags: ["refactoring"]
  },
  {
    id: "FF-030",
    title: "Create high-fidelity design specs for Mobile settings pane",
    status: "todo",
    priority: "medium",
    project: "Mobile App",
    assignee: TEAM_MEMBERS[5], // David Kim
    dueDate: "2026-06-14",
    createdAt: "2026-05-29",
    tags: ["design", "settings"]
  },
  {
    id: "FF-031",
    title: "Implement drag-and-drop kanban card animations",
    status: "in_progress",
    priority: "medium",
    project: "Design System",
    assignee: TEAM_MEMBERS[0], // Sarah Chen
    dueDate: "2026-06-05",
    createdAt: "2026-05-27",
    tags: ["kanban", "motion"]
  },
  {
    id: "FF-032",
    title: "Write robust integration test suites for Stripe webhook flow",
    status: "todo",
    priority: "medium",
    project: "Backend API",
    assignee: TEAM_MEMBERS[1], // Marcus Okafor
    dueDate: "2026-06-12",
    createdAt: "2026-05-29",
    tags: ["testing"]
  },
  {
    id: "FF-033",
    title: "Benchmark staging API server load under simulated client count",
    status: "blocked",
    priority: "high",
    project: "Backend API",
    assignee: TEAM_MEMBERS[2], // Priya Patel
    dueDate: "2026-05-27", // Overdue
    createdAt: "2026-05-15",
    tags: ["benchmark"]
  },
  {
    id: "FF-034",
    title: "Improve SEO indexing and structured schema for landing page",
    status: "done",
    priority: "medium",
    project: "Marketing Site",
    assignee: TEAM_MEMBERS[3], // James Liu
    dueDate: "2026-05-28", // Past/Done
    createdAt: "2026-05-18",
    tags: ["seo"]
  },
  {
    id: "FF-035",
    title: "Redesign checkout wizard flow for subscription tiers",
    status: "in_progress",
    priority: "high",
    project: "Marketing Site",
    assignee: TEAM_MEMBERS[4], // Emma Rodriguez
    dueDate: "2026-06-02",
    createdAt: "2026-05-25",
    tags: ["checkout", "design"]
  },
  {
    id: "FF-036",
    title: "Configure AWS CloudFront edge caching headers",
    status: "done",
    priority: "low",
    project: "Backend API",
    assignee: TEAM_MEMBERS[5], // David Kim
    dueDate: "2026-05-26", // Past/Done
    createdAt: "2026-05-20",
    tags: ["infrastructure"]
  },
  {
    id: "FF-037",
    title: "Analyze visitor churn rates and exit paths in Mixpanel",
    status: "in_progress",
    priority: "medium",
    project: "Marketing Site",
    assignee: TEAM_MEMBERS[0], // Sarah Chen
    dueDate: "2026-06-03",
    createdAt: "2026-05-24",
    tags: ["analytics"]
  },
  {
    id: "FF-038",
    title: "Localize marketing pricing cards to Euro and Japanese Yen",
    status: "done",
    priority: "medium",
    project: "Marketing Site",
    assignee: TEAM_MEMBERS[1], // Marcus Okafor
    dueDate: "2026-05-25", // Past/Done
    createdAt: "2026-05-15",
    tags: ["localization"]
  },
  {
    id: "FF-039",
    title: "Fix memory leaks in React window resize custom hooks",
    status: "blocked",
    priority: "high",
    project: "Mobile App",
    assignee: TEAM_MEMBERS[2], // Priya Patel
    dueDate: "2026-05-29", // Overdue
    createdAt: "2026-05-25",
    tags: ["bug", "hooks"]
  },
  {
    id: "FF-040",
    title: "Setup automated staging deployment webhooks in Vercel",
    status: "done",
    priority: "medium",
    project: "Marketing Site",
    assignee: TEAM_MEMBERS[3], // James Liu
    dueDate: "2026-05-28", // Past/Done
    createdAt: "2026-05-22",
    tags: ["devops", "vercel"]
  },
  {
    id: "FF-041",
    title: "Improve mobile navigation drawer gesture recognition",
    status: "todo",
    priority: "low",
    project: "Mobile App",
    assignee: TEAM_MEMBERS[4], // Emma Rodriguez
    dueDate: "2026-06-18",
    createdAt: "2026-05-29",
    tags: ["mobile", "gestures"]
  },
  {
    id: "FF-042",
    title: "Design token palettes for dark mode UI elements",
    status: "done",
    priority: "medium",
    project: "Design System",
    assignee: TEAM_MEMBERS[5], // David Kim
    dueDate: "2026-05-27", // Past/Done
    createdAt: "2026-05-20",
    tags: ["design-token"]
  },
  {
    id: "FF-043",
    title: "Write PostgreSQL schema migration for task database tags",
    status: "in_progress",
    priority: "high",
    project: "Backend API",
    assignee: TEAM_MEMBERS[0], // Sarah Chen
    dueDate: "2026-06-04",
    createdAt: "2026-05-28",
    tags: ["database"]
  },
  {
    id: "FF-044",
    title: "Implement server-sent events for live task updates",
    status: "todo",
    priority: "urgent",
    project: "Backend API",
    assignee: TEAM_MEMBERS[1], // Marcus Okafor
    dueDate: "2026-06-07",
    createdAt: "2026-05-29",
    tags: ["real-time"]
  },
  {
    id: "FF-045",
    title: "Add focus listener keydown handling for dashboard search",
    status: "in_review",
    priority: "low",
    project: "Design System",
    assignee: TEAM_MEMBERS[2], // Priya Patel
    dueDate: "2026-05-30", // Today
    createdAt: "2026-05-27",
    tags: ["accessibility"]
  },
  {
    id: "FF-046",
    title: "Review pull request for Okta SAML Single Sign-On",
    status: "in_progress",
    priority: "medium",
    project: "Backend API",
    assignee: TEAM_MEMBERS[3], // James Liu
    dueDate: "2026-06-02",
    createdAt: "2026-05-28",
    tags: ["pr-review", "sso"]
  },
  {
    id: "FF-047",
    title: "Update security header policies in staging configuration",
    status: "done",
    priority: "none",
    project: "Backend API",
    assignee: TEAM_MEMBERS[4], // Emma Rodriguez
    dueDate: "2026-05-23", // Past/Done
    createdAt: "2026-05-20",
    tags: ["security"]
  },
  {
    id: "FF-048",
    title: "Create interactive walk-through video for new developers",
    status: "todo",
    priority: "low",
    project: "Marketing Site",
    assignee: TEAM_MEMBERS[5], // David Kim
    dueDate: "2026-06-25",
    createdAt: "2026-05-29",
    tags: ["onboarding"]
  }
];
