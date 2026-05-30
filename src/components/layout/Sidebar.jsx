import React, { useState, useEffect } from 'react';
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
  tasks = [],
  isMobileDrawer,
  onCloseMobileDrawer 
}) {
  
  // Count tasks assigned to Alex Johnson
  const myTasksCount = tasks.filter(t => t.assignee?.name === 'Alex Johnson').length;

  // Donut progress calculation metrics
  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'done').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const blockedCount = tasks.filter(t => t.status === 'blocked').length;
  const completionRate = totalCount ? (completedCount / totalCount) : 0;

  const radius = 22;
  const circumference = 2 * Math.PI * radius; // ~138.23
  
  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  useEffect(() => {
    const targetOffset = circumference * (1 - completionRate);
    const timer = setTimeout(() => {
      setAnimatedOffset(targetOffset);
    }, 50);
    return () => clearTimeout(timer);
  }, [completionRate, circumference]);

  const navItemClass = (viewName) => {
    const isAct = activeView === viewName;
    return `flex items-center gap-3 px-4 py-2 mx-2 rounded-lg text-sm transition-all duration-150 cursor-pointer select-none ${
      isAct
        ? 'bg-ff-accent/10 text-ff-accent font-semibold border-l-2 border-ff-accent rounded-l-none'
        : 'text-ff-secondary hover:bg-ff-hover hover:text-ff-primary'
    }`;
  };

  return (
    <aside className="w-full h-full bg-ff-base border-r border-ff-border flex flex-col justify-between overflow-y-auto relative select-none">
      
      <div>
        {/* Logo Zone */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-ff-border shrink-0">
          <div className="flex items-center gap-2">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path d="M4 2 H14 V6 H8 V9 H12 V13 H8 V18 H4 Z" fill="var(--accent)" />
              <path d="M10 5 H18 V9 H13 V12 H16 V15 H13 V18 H10 Z" fill="var(--accent)" fillOpacity="0.6" />
            </svg>
            <span className="text-[15px] font-bold text-ff-primary tracking-tight">
              FilterFlow
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-bold text-ff-muted font-mono bg-ff-elevated border border-ff-border px-1.5 py-0.5 rounded animate-pulse">
              v2.1
            </span>
            {isMobileDrawer && (
              <button
                type="button"
                onClick={onCloseMobileDrawer}
                aria-label="Close sidebar drawer"
                className="w-7 h-7 rounded-lg hover:bg-ff-hover flex items-center justify-center text-ff-muted hover:text-ff-primary cursor-pointer ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Ambient Top Glow */}
        <div className="absolute top-14 left-0 right-0 h-[120px] bg-gradient-to-b from-ff-accent/5 to-transparent pointer-events-none" />

        {/* Navigation lists */}
        <div className="mt-4 space-y-5">
          {/* Section: WORKSPACE */}
          <div>
            <div className="text-[9px] tracking-[0.15em] uppercase text-ff-muted font-bold px-5 mb-2 mt-4 select-none">
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
                <span className="text-[10px] font-bold font-mono bg-ff-accent text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0">
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
            <div className="text-[9px] tracking-[0.15em] uppercase text-ff-muted font-bold px-5 mb-2 select-none">
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
            <div className="text-[9px] tracking-[0.15em] uppercase text-ff-muted font-bold px-5 mb-2 select-none">
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
                <Sparkles className="w-4 h-4 shrink-0 text-ff-cyan" />
                <span className="text-ff-cyan">Insights</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Task Progress Ring Widget */}
        <div className="mx-3 mt-5 p-3 rounded-xl bg-ff-card border border-ff-border shadow-sm">
          <div className="flex items-center text-xs font-semibold text-ff-primary select-none">
            <span>Sprint 4</span>
            <span className="text-[10px] text-amber-500 font-mono ml-auto font-bold animate-pulse">
              2 days left
            </span>
          </div>

          <div className="flex items-center gap-4 mt-3 select-none">
            {/* Donut progress ring */}
            <div className="relative w-[52px] h-[52px] shrink-0">
              <svg width="52" height="52" className="transform -rotate-90">
                {/* Track circle background */}
                <circle
                  cx="26"
                  cy="26"
                  r={radius}
                  fill="none"
                  stroke="var(--bg-border)"
                  strokeWidth="4"
                />
                {/* Progress bar circle foreground */}
                <circle
                  cx="26"
                  cy="26"
                  r={radius}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={animatedOffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                />
              </svg>
              {/* Central Text percentage indicator */}
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-ff-primary">
                {Math.round(completionRate * 100)}%
              </div>
            </div>

            {/* Metrics detail breakdown list */}
            <div className="flex-1 min-w-0">
              <div className="text-xs text-ff-secondary font-semibold">
                {completedCount}/{totalCount} tasks
              </div>
              <div className="space-y-0.5 mt-1.5">
                <div className="flex items-center gap-1.5 text-[10px] text-ff-secondary font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">Done</span>
                  <span className="ml-auto font-mono text-[9px] font-bold text-ff-muted">{completedCount}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-ff-secondary font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="truncate">In Progress</span>
                  <span className="ml-auto font-mono text-[9px] font-bold text-ff-muted">{inProgressCount}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-ff-secondary font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span className="truncate">Blocked</span>
                  <span className="ml-auto font-mono text-[9px] font-bold text-red-400">{blockedCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant shortcut */}
        <div className="px-4 mt-4">
          <button
            type="button"
            onClick={() => { onToggleAiPanel(); onCloseMobileDrawer?.(); }}
            className="flex items-center justify-between px-3 py-2.5 w-full bg-ff-cyan/10 border border-ff-cyan/20 hover:border-ff-cyan/40 text-ff-cyan text-xs rounded-xl font-medium cursor-pointer transition-all duration-150 active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>AI Assistant</span>
            </div>
            <kbd className="bg-ff-cyan/10 text-ff-cyan border border-ff-cyan/20 text-[9px] font-bold font-mono px-1.5 py-0.5 rounded leading-none shrink-0">
              ⌘J
            </kbd>
          </button>
        </div>
      </div>

      {/* Footer User row */}
      <div className="mt-6 shrink-0">
        <div className="h-px bg-ff-border" />
        <div className="px-4 py-3 flex items-center justify-between hover:bg-ff-hover transition-colors select-none">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar initials="AJ" color="bg-ff-accent" size="lg" showTooltip={false} />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-ff-primary leading-tight">
                Alex Johnson
              </span>
              <span className="text-xs text-ff-muted truncate leading-none mt-0.5 font-medium">
                alex@acme.co
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Settings"
            className="w-7 h-7 rounded-lg hover:bg-ff-hover flex items-center justify-center text-ff-muted hover:text-ff-primary transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

    </aside>
  );
}
