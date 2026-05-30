import { addDays, subDays, format } from 'date-fns';

const today = new Date();
today.setHours(0, 0, 0, 0);

const TEAM_MEMBERS = [
  { name: 'Sarah Chen',     initials: 'SC', color: 'bg-violet-500' },
  { name: 'Marcus Okafor',  initials: 'MO', color: 'bg-blue-500'   },
  { name: 'Priya Patel',    initials: 'PP', color: 'bg-emerald-500' },
  { name: 'James Liu',      initials: 'JL', color: 'bg-orange-500'  },
  { name: 'Emma Rodriguez', initials: 'ER', color: 'bg-pink-500'    },
  { name: 'David Kim',      initials: 'DK', color: 'bg-rose-500'    },
];

const PROJECTS = ['Design System', 'Mobile App', 'Backend API', 'Marketing Site'];

function d(offset) {
  const date = new Date(today);
  date.setDate(date.getDate() + offset);
  return format(date, 'yyyy-MM-dd');
}

export function generateTasks() {
  return [
    { id:'FF-001', title:'Implement OAuth 2.0 token refresh flow', status:'in_progress', priority:'urgent', project:'Backend API', assignee:TEAM_MEMBERS[0], dueDate:d(0), createdAt:d(-10), tags:['auth','security'] },
    { id:'FF-002', title:'Design onboarding modal animation system', status:'todo', priority:'high', project:'Design System', assignee:TEAM_MEMBERS[1], dueDate:d(5), createdAt:d(-8), tags:['design','motion'] },
    { id:'FF-003', title:'Fix memory leak in dashboard WebSocket handler', status:'blocked', priority:'urgent', project:'Backend API', assignee:TEAM_MEMBERS[2], dueDate:d(-2), createdAt:d(-12), tags:['bug','websocket'] },
    { id:'FF-004', title:'Write API documentation for v3 endpoints', status:'done', priority:'medium', project:'Backend API', assignee:TEAM_MEMBERS[3], dueDate:d(-5), createdAt:d(-15), tags:['docs'] },
    { id:'FF-005', title:'Migrate user table to new database schema', status:'in_progress', priority:'high', project:'Backend API', assignee:TEAM_MEMBERS[4], dueDate:d(1), createdAt:d(-20), tags:['migration'] },
    { id:'FF-006', title:'Set up Sentry error tracking for mobile app', status:'todo', priority:'medium', project:'Mobile App', assignee:TEAM_MEMBERS[5], dueDate:d(12), createdAt:d(-5), tags:['mobile','analytics'] },
    { id:'FF-007', title:'A/B test hero section CTA copy changes', status:'in_progress', priority:'low', project:'Marketing Site', assignee:TEAM_MEMBERS[0], dueDate:d(3), createdAt:d(-2), tags:['marketing','experiment'] },
    { id:'FF-008', title:'Resolve CORS issue on staging environment', status:'done', priority:'high', project:'Backend API', assignee:TEAM_MEMBERS[1], dueDate:d(-1), createdAt:d(-3), tags:['infrastructure'] },
    { id:'FF-009', title:'Refactor billing table queries for performance', status:'in_progress', priority:'medium', project:'Backend API', assignee:TEAM_MEMBERS[2], dueDate:d(8), createdAt:d(-10), tags:['performance'] },
    { id:'FF-010', title:'Create interactive tooltips for filter toolbar', status:'in_review', priority:'medium', project:'Design System', assignee:TEAM_MEMBERS[3], dueDate:d(0), createdAt:d(-6), tags:['ui','accessibility'] },
    { id:'FF-011', title:'Implement automatic database backups every 6 hours', status:'todo', priority:'high', project:'Backend API', assignee:TEAM_MEMBERS[4], dueDate:d(4), createdAt:d(-1), tags:['devops'] },
    { id:'FF-012', title:'Build dark mode toggle and dynamic CSS variables', status:'done', priority:'low', project:'Design System', assignee:TEAM_MEMBERS[5], dueDate:d(-4), createdAt:d(-18), tags:['theme'] },
    { id:'FF-013', title:'Add multi-factor authentication setup flow UI', status:'in_progress', priority:'urgent', project:'Mobile App', assignee:TEAM_MEMBERS[0], dueDate:d(1), createdAt:d(-15), tags:['security'] },
    { id:'FF-014', title:'Optimize image asset compression pipeline', status:'todo', priority:'low', project:'Marketing Site', assignee:TEAM_MEMBERS[1], dueDate:d(15), createdAt:d(-2), tags:['assets'] },
    { id:'FF-015', title:'Draft release notes for version v2.4.0', status:'done', priority:'none', project:'Marketing Site', assignee:TEAM_MEMBERS[2], dueDate:d(-10), createdAt:d(-18), tags:['copy'] },
    { id:'FF-016', title:'Conduct UX user testing sessions for calendar view', status:'in_review', priority:'medium', project:'Mobile App', assignee:TEAM_MEMBERS[3], dueDate:d(2), createdAt:d(-5), tags:['ux-testing'] },
    { id:'FF-017', title:'Set up end-to-end testing suite with Playwright', status:'in_progress', priority:'high', project:'Backend API', assignee:TEAM_MEMBERS[4], dueDate:d(10), createdAt:d(-10), tags:['testing'] },
    { id:'FF-018', title:'Audit accessibility of the navigation sidebar drawer', status:'done', priority:'medium', project:'Design System', assignee:TEAM_MEMBERS[5], dueDate:d(-4), createdAt:d(-8), tags:['a11y'] },
    { id:'FF-019', title:'Integrate Stripe billing webhooks and subscription validation', status:'in_progress', priority:'high', project:'Backend API', assignee:TEAM_MEMBERS[0], dueDate:d(5), createdAt:d(-9), tags:['billing','stripe'] },
    { id:'FF-020', title:'Improve autocomplete suggestion speed on search bar input', status:'in_progress', priority:'medium', project:'Design System', assignee:TEAM_MEMBERS[1], dueDate:d(6), createdAt:d(-2), tags:['ux','performance'] },
    { id:'FF-021', title:'Configure Redis cache for distributed session storage', status:'todo', priority:'medium', project:'Backend API', assignee:TEAM_MEMBERS[2], dueDate:d(11), createdAt:d(-1), tags:['cache','infra'] },
    { id:'FF-022', title:'Create vector SVG logos for marketing header', status:'done', priority:'low', project:'Marketing Site', assignee:TEAM_MEMBERS[3], dueDate:d(-8), createdAt:d(-12), tags:['design','svg'] },
    { id:'FF-023', title:'Fix jumpy scrolling and viewport rendering in task list', status:'blocked', priority:'high', project:'Mobile App', assignee:TEAM_MEMBERS[4], dueDate:d(-1), createdAt:d(-4), tags:['bug','scroll'] },
    { id:'FF-024', title:'Update npm dependencies and resolve CVE vulnerabilities', status:'done', priority:'medium', project:'Backend API', assignee:TEAM_MEMBERS[5], dueDate:d(-3), createdAt:d(-5), tags:['security','maintenance'] },
    { id:'FF-025', title:'Design empty state illustrations for dashboard cards', status:'todo', priority:'low', project:'Design System', assignee:TEAM_MEMBERS[0], dueDate:d(20), createdAt:d(-1), tags:['design'] },
    { id:'FF-026', title:'Implement CSV data export for filtered task reports', status:'in_review', priority:'medium', project:'Marketing Site', assignee:TEAM_MEMBERS[1], dueDate:d(0), createdAt:d(-10), tags:['export','data'] },
    { id:'FF-027', title:'Optimize bundle size with dynamic code splitting', status:'in_progress', priority:'medium', project:'Mobile App', assignee:TEAM_MEMBERS[2], dueDate:d(7), createdAt:d(-5), tags:['optimization'] },
    { id:'FF-028', title:'Set up system health alerts and PagerDuty thresholds', status:'todo', priority:'high', project:'Backend API', assignee:TEAM_MEMBERS[3], dueDate:d(9), createdAt:d(-2), tags:['devops','monitoring'] },
    { id:'FF-029', title:'Refactor useFilters hook to eliminate layout shifts', status:'in_review', priority:'medium', project:'Design System', assignee:TEAM_MEMBERS[4], dueDate:d(2), createdAt:d(-6), tags:['refactoring'] },
    { id:'FF-030', title:'Create high-fidelity design specs for mobile settings', status:'todo', priority:'medium', project:'Mobile App', assignee:TEAM_MEMBERS[5], dueDate:d(14), createdAt:d(-1), tags:['design','settings'] },
    { id:'FF-031', title:'Implement drag-and-drop kanban card animations', status:'in_progress', priority:'medium', project:'Design System', assignee:TEAM_MEMBERS[0], dueDate:d(5), createdAt:d(-3), tags:['kanban','motion'] },
    { id:'FF-032', title:'Write integration tests for Stripe webhook flow', status:'todo', priority:'medium', project:'Backend API', assignee:TEAM_MEMBERS[1], dueDate:d(12), createdAt:d(-1), tags:['testing'] },
    { id:'FF-033', title:'Benchmark API server under simulated peak load', status:'blocked', priority:'high', project:'Backend API', assignee:TEAM_MEMBERS[2], dueDate:d(-3), createdAt:d(-15), tags:['benchmark'] },
    { id:'FF-034', title:'Improve SEO and structured schema for landing page', status:'done', priority:'medium', project:'Marketing Site', assignee:TEAM_MEMBERS[3], dueDate:d(-2), createdAt:d(-12), tags:['seo'] },
    { id:'FF-035', title:'Redesign checkout wizard for subscription tiers', status:'in_progress', priority:'high', project:'Marketing Site', assignee:TEAM_MEMBERS[4], dueDate:d(3), createdAt:d(-5), tags:['checkout','design'] },
    { id:'FF-036', title:'Configure CloudFront edge caching headers', status:'done', priority:'low', project:'Backend API', assignee:TEAM_MEMBERS[5], dueDate:d(-6), createdAt:d(-10), tags:['infrastructure'] },
    { id:'FF-037', title:'Analyze visitor churn rates in Mixpanel funnel', status:'in_progress', priority:'medium', project:'Marketing Site', assignee:TEAM_MEMBERS[0], dueDate:d(4), createdAt:d(-6), tags:['analytics'] },
    { id:'FF-038', title:'Localize pricing cards to Euro and Japanese Yen', status:'done', priority:'medium', project:'Marketing Site', assignee:TEAM_MEMBERS[1], dueDate:d(-5), createdAt:d(-15), tags:['localization'] },
    { id:'FF-039', title:'Fix memory leaks in React window resize hooks', status:'blocked', priority:'high', project:'Mobile App', assignee:TEAM_MEMBERS[2], dueDate:d(-1), createdAt:d(-5), tags:['bug','hooks'] },
    { id:'FF-040', title:'Setup automated Vercel staging deployment webhooks', status:'done', priority:'medium', project:'Marketing Site', assignee:TEAM_MEMBERS[3], dueDate:d(-2), createdAt:d(-8), tags:['devops','vercel'] },
    { id:'FF-041', title:'Improve mobile navigation gesture recognition', status:'todo', priority:'low', project:'Mobile App', assignee:TEAM_MEMBERS[4], dueDate:d(18), createdAt:d(-1), tags:['mobile','gestures'] },
    { id:'FF-042', title:'Design token palette for dark mode UI elements', status:'done', priority:'medium', project:'Design System', assignee:TEAM_MEMBERS[5], dueDate:d(-3), createdAt:d(-10), tags:['design-token'] },
    { id:'FF-043', title:'Write PostgreSQL migration for task database tags', status:'in_progress', priority:'high', project:'Backend API', assignee:TEAM_MEMBERS[0], dueDate:d(4), createdAt:d(-2), tags:['database'] },
    { id:'FF-044', title:'Implement server-sent events for live task updates', status:'todo', priority:'urgent', project:'Backend API', assignee:TEAM_MEMBERS[1], dueDate:d(7), createdAt:d(-1), tags:['real-time'] },
    { id:'FF-045', title:'Add keyboard accessibility to dashboard search input', status:'in_review', priority:'low', project:'Design System', assignee:TEAM_MEMBERS[2], dueDate:d(0), createdAt:d(-3), tags:['accessibility'] },
    { id:'FF-046', title:'Review pull request for Okta SAML Single Sign-On', status:'in_progress', priority:'medium', project:'Backend API', assignee:TEAM_MEMBERS[3], dueDate:d(2), createdAt:d(-2), tags:['pr-review','sso'] },
    { id:'FF-047', title:'Update security header policies in staging config', status:'done', priority:'none', project:'Backend API', assignee:TEAM_MEMBERS[4], dueDate:d(-7), createdAt:d(-10), tags:['security'] },
    { id:'FF-048', title:'Create interactive walk-through video for new devs', status:'todo', priority:'low', project:'Marketing Site', assignee:TEAM_MEMBERS[5], dueDate:d(25), createdAt:d(-1), tags:['onboarding'] },
  ];
}

export { TEAM_MEMBERS, PROJECTS };
