const TEAM_MEMBERS = [
  { name: 'Joan Akinseinde', initials: 'JA', color: 'bg-violet-600', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80' },
  { name: 'Maya Chen',       initials: 'MC', color: 'bg-rose-500',   image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80' },
  { name: 'Iris Morgan',     initials: 'IM', color: 'bg-sky-500',    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=256&q=80' },
  { name: 'Theo Banks',      initials: 'TB', color: 'bg-emerald-500', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80' },
  { name: 'Nora Patel',      initials: 'NP', color: 'bg-pink-500',   image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80' },
  { name: 'Leo Okafor',      initials: 'LO', color: 'bg-amber-500',  image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80' },
];

const PROJECTS = ['Core App', 'Vercel Deploy', 'Analytics Engine', 'Design System', 'API Integration'];

export function generateTasks() {
  return [
    { id:'FF-101', title:'Implement command palette and search shortcut (⌘K)', status:'in_progress', priority:'urgent', project:'Core App', assignee:TEAM_MEMBERS[0], dueDate:'2026-06-02', createdAt:'2026-05-22', tags:['command','search'] },
    { id:'FF-102', title:'Configure vercel.json SPA rewrites & output directory', status:'done', priority:'high', project:'Vercel Deploy', assignee:TEAM_MEMBERS[1], dueDate:'2026-05-29', createdAt:'2026-05-18', tags:['vercel','deployment'] },
    { id:'FF-103', title:'Design premium glassmorphic filter panel dropdowns', status:'in_review', priority:'high', project:'Design System', assignee:TEAM_MEMBERS[2], dueDate:'2026-05-31', createdAt:'2026-05-21', tags:['design','filters'] },
    { id:'FF-104', title:'Instrument filter usage events for analytics dashboard', status:'todo', priority:'medium', project:'Analytics Engine', assignee:TEAM_MEMBERS[3], dueDate:'2026-06-05', createdAt:'2026-05-23', tags:['analytics'] },
    { id:'FF-105', title:'Create assignee quick-filter pills for support triage', status:'blocked', priority:'urgent', project:'Core App', assignee:TEAM_MEMBERS[4], dueDate:'2026-05-30', createdAt:'2026-05-16', tags:['triage'] },
    { id:'FF-106', title:'Add persistent saved views for recurring team workflows', status:'todo', priority:'medium', project:'Core App', assignee:TEAM_MEMBERS[5], dueDate:'2026-06-10', createdAt:'2026-05-19', tags:['views'] },
    { id:'FF-107', title:'Integrate multi-select filters logic in state manager', status:'in_progress', priority:'high', project:'Core App', assignee:TEAM_MEMBERS[0], dueDate:'2026-05-29', createdAt:'2026-05-20', tags:['state','filters'] },
    { id:'FF-108', title:'Build task detail sheet with edit and duplicate actions', status:'done', priority:'medium', project:'Core App', assignee:TEAM_MEMBERS[1], dueDate:'2026-05-28', createdAt:'2026-05-13', tags:['details'] },
    { id:'FF-109', title:'Ship AI natural-language filter parser integration', status:'in_review', priority:'urgent', project:'API Integration', assignee:TEAM_MEMBERS[3], dueDate:'2026-06-03', createdAt:'2026-05-24', tags:['ai','api'] },
    { id:'FF-110', title:'Generate weekly report charts from completed tasks', status:'todo', priority:'low', project:'Analytics Engine', assignee:TEAM_MEMBERS[4], dueDate:'2026-06-14', createdAt:'2026-05-25', tags:['reports'] },
    { id:'FF-111', title:'Research Vercel Edge Middleware for geo-based routing', status:'todo', priority:'none', project:'Vercel Deploy', assignee:{ name:'Unassigned', initials:'--', color:'bg-zinc-800' }, dueDate:'2026-06-20', createdAt:'2026-05-27', tags:['research'] },
    { id:'FF-112', title:'Polish keyboard shortcuts modal and help overlays', status:'done', priority:'low', project:'Design System', assignee:TEAM_MEMBERS[5], dueDate:'2026-05-24', createdAt:'2026-05-10', tags:['keyboard'] },
    { id:'FF-113', title:'Create production status toast for bulk task updates', status:'blocked', priority:'high', project:'API Integration', assignee:TEAM_MEMBERS[2], dueDate:'2026-05-27', createdAt:'2026-05-14', tags:['bulk'] },
    { id:'FF-114', title:'Refine mobile task list density for small screens', status:'in_progress', priority:'medium', project:'Design System', assignee:TEAM_MEMBERS[4], dueDate:'2026-06-07', createdAt:'2026-05-26', tags:['mobile'] },
    { id:'FF-115', title:'Add overdue and assigned-to-me smart filters', status:'todo', priority:'high', project:'Core App', assignee:TEAM_MEMBERS[0], dueDate:'2026-06-08', createdAt:'2026-05-28', tags:['smart-filters'] },
  ];
}

export { TEAM_MEMBERS, PROJECTS };
