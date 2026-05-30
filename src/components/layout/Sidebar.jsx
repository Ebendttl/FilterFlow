import React from 'react';
import { 
  CheckSquare, 
  LayoutList, 
  FolderOpen, 
  Zap, 
  Columns, 
  CalendarDays, 
  GitBranch, 
  BarChart2, 
  Sparkles, 
  Settings,
  X 
} from 'lucide-react';
import Avatar from '../ui/Avatar';

export default function Sidebar({ 
  activeView, 
  onViewChange, 
  onToggleAiPanel, 
  onOpenSettings,
  tasks,
  isMobileDrawer,
  onCloseMobileDrawer 
}) {
  
  // Count tasks assigned to Alex Johnson
  const myTasksCount = tasks.filter(t => t.assignee?.name === 'Alex Johnson').length;

  const navItemClass = (viewName) => {
    const isAct = activeView === viewName;
    return `flex items-center gap-3 px-4 py-2 mx-2 rounded-lg text-sm transition-all duration-150 cursor-pointer select-none ${
      isAct
        ? 'bg-violet-500/10 text-violet-400 font-semibold border-l-2 border-violet-500 rounded-l-none'
        : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
    }`;
  };

  return (
    <aside className="w-full h-full bg-zinc-950 flex flex-col justify-between overflow-y-auto relative select-none">
      
      <div>
        {/* Logo Zone */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            {/* Two interlocking F shapes in violet-500 */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path d="M4 2 H14 V6 H8 V9 H12 V13 H8 V18 H4 Z" fill="#8b5cf6" />
              <path d="M10 5 H18 V9 H13 V12 H16 V15 H13 V18 H10 Z" fill="#8b5cf6" fillOpacity="0.6" />
            </svg>
            <span className="text-[15px] font-bold text-white tracking-tight">
              FilterFlow
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-bold text-zinc-500 font-mono bg-zinc-900 border border-zinc-850 px-1.5 py-0.5 rounded">
              v2.0
            </span>
            {isMobileDrawer && (
              <button
                type="button"
                onClick={onCloseMobileDrawer}
                aria-label="Close sidebar drawer"
                className="w-7 h-7 rounded-lg hover:bg-zinc-850 flex items-center justify-center text-zinc-500 hover:text-zinc-300 cursor-pointer ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Ambient Top Glow */}
        <div className="absolute top-14 left-0 right-0 h-[120px] bg-gradient-to-b from-violet-600/5 to-transparent pointer-events-none" />

        {/* Navigation lists */}
        <div className="mt-4 space-y-5">
          {/* Section: WORKSPACE */}
          <div>
            <div className="text-[9px] tracking-[0.15em] uppercase text-zinc-600 font-bold px-5 mb-2 mt-4 select-none">
              Workspace
            </div>
            <nav className="space-y-0.5" aria-label="Workspace navigations">
              <button
                type="button"
                onClick={() => { onViewChange('my-tasks'); onCloseMobileDrawer?.(); }}
                className={`${navItemClass('my-tasks')} w-[calc(100%-16px)] text-left`}
              >
                <CheckSquare className="w-4 h-4 shrink-0" />
                <span className="flex-1">My Tasks</span>
                <span className="text-[10px] font-bold font-mono bg-violet-600 text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                  {myTasksCount}
                </span>
              </button>
              <button
                type="button"
                onClick={() => { onViewChange('all-tasks'); onCloseMobileDrawer?.(); }}
                className={`${navItemClass('all-tasks')} w-[calc(100%-16px)] text-left`}
              >
                <LayoutList className="w-4 h-4 shrink-0" />
                <span>All Tasks</span>
              </button>
              <button
                type="button"
                onClick={() => { onViewChange('projects'); onCloseMobileDrawer?.(); }}
                className={`${navItemClass('projects')} w-[calc(100%-16px)] text-left`}
              >
                <FolderOpen className="w-4 h-4 shrink-0" />
                <span>Projects</span>
              </button>
              <button
                type="button"
                onClick={() => { onViewChange('sprints'); onCloseMobileDrawer?.(); }}
                className={`${navItemClass('sprints')} w-[calc(100%-16px)] text-left`}
              >
                <Zap className="w-4 h-4 shrink-0" />
                <span>Sprints</span>
              </button>
            </nav>
          </div>

          {/* Section: VIEWS */}
          <div>
            <div className="text-[9px] tracking-[0.15em] uppercase text-zinc-600 font-bold px-5 mb-2 select-none">
              Views
            </div>
            <nav className="space-y-0.5" aria-label="Workspace views">
              <button
                type="button"
                onClick={() => { onViewChange('board'); onCloseMobileDrawer?.(); }}
                className={`${navItemClass('board')} w-[calc(100%-16px)] text-left`}
              >
                <Columns className="w-4 h-4 shrink-0" />
                <span>Board</span>
              </button>
              <button
                type="button"
                onClick={() => { onViewChange('calendar'); onCloseMobileDrawer?.(); }}
                className={`${navItemClass('calendar')} w-[calc(100%-16px)] text-left`}
              >
                <CalendarDays className="w-4 h-4 shrink-0" />
                <span>Calendar</span>
              </button>
              <button
                type="button"
                onClick={() => { onViewChange('timeline'); onCloseMobileDrawer?.(); }}
                className={`${navItemClass('timeline')} w-[calc(100%-16px)] text-left`}
              >
                <GitBranch className="w-4 h-4 shrink-0" />
                <span>Timeline</span>
              </button>
            </nav>
          </div>

          {/* Section: ANALYTICS */}
          <div>
            <div className="text-[9px] tracking-[0.15em] uppercase text-zinc-600 font-bold px-5 mb-2 select-none">
              Analytics
            </div>
            <nav className="space-y-0.5" aria-label="Dashboard analytics">
              <button
                type="button"
                onClick={() => { onViewChange('reports'); onCloseMobileDrawer?.(); }}
                className={`${navItemClass('reports')} w-[calc(100%-16px)] text-left`}
              >
                <BarChart2 className="w-4 h-4 shrink-0" />
                <span>Reports</span>
              </button>
              <button
                type="button"
                onClick={() => { onViewChange('insights'); onCloseMobileDrawer?.(); }}
                className={`${navItemClass('insights')} w-[calc(100%-16px)] text-left`}
              >
                <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
                <span className="text-cyan-400">Insights</span>
              </button>
            </nav>
          </div>
        </div>

        {/* AI Assistant shortcut */}
        <div className="px-4 mt-6">
          <button
            type="button"
            onClick={() => { onToggleAiPanel(); onCloseMobileDrawer?.(); }}
            className="flex items-center justify-between px-3 py-2.5 w-full bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 text-xs rounded-xl font-medium cursor-pointer transition-all duration-150 active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>AI Assistant</span>
            </div>
            <kbd className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] font-bold font-mono px-1.5 py-0.5 rounded leading-none shrink-0">
              ⌘J
            </kbd>
          </button>
        </div>
      </div>

      {/* Footer User row */}
      <div className="mt-6 shrink-0">
        <div className="h-px bg-zinc-800" />
        <div className="px-4 py-3 flex items-center justify-between hover:bg-zinc-900 transition-colors select-none">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar initials="AJ" color="bg-violet-600" size="lg" showTooltip={false} />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-zinc-100 leading-tight">
                Alex Johnson
              </span>
              <span className="text-xs text-zinc-500 truncate leading-none mt-0.5">
                alex@acme.co
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Settings"
            className="w-7 h-7 rounded-lg hover:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

    </aside>
  );
}
