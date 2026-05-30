import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, LayoutList, FolderOpen, Zap,
  Columns, CalendarDays, GitBranch,
  BarChart2, Sparkles, Settings, X
} from 'lucide-react';
import Avatar from '../ui/Avatar';

export default function Sidebar({ 
  activeView, 
  onViewChange, 
  onToggleAiPanel, 
  onOpenSettings,
  tasks = [],
  isMobileDrawer = false,
  onCloseMobileDrawer
}) {
  const myTasksCount   = tasks.filter(t => t.assignee?.name === 'Alex Johnson').length;
  const total          = tasks.length;
  const done           = tasks.filter(t => t.status === 'done').length;
  const inProgress     = tasks.filter(t => t.status === 'in_progress').length;
  const blocked        = tasks.filter(t => t.status === 'blocked').length;
  const pct            = total ? Math.round((done / total) * 100) : 0;

  const radius         = 22;
  const circumference  = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const t = setTimeout(() => setOffset(circumference * (1 - done / (total || 1))), 80);
    return () => clearTimeout(t);
  }, [done, total, circumference]);

  const navItem = (viewName) => {
    const active = activeView === viewName;
    return [
      'flex items-center gap-3 mx-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer select-none w-[calc(100%-16px)] text-left',
      active
        ? 'border-l-2 rounded-l-none font-semibold'
        : 'font-medium',
    ].join(' ');
  };

  const navStyle = (viewName) => {
    const active = activeView === viewName;
    return active
      ? { color: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 10%, transparent)', borderColor: 'var(--accent)' }
      : { color: 'var(--text-secondary)' };
  };

  const close = () => onCloseMobileDrawer?.();

  return (
    <aside
      className="w-full h-full flex flex-col justify-between overflow-y-auto relative select-none border-r"
      style={{ background: 'var(--bg-base)', borderColor: 'var(--bg-border)' }}
    >
      <div>
        {/* ── Logo bar ── */}
        <div
          className="h-14 flex items-center justify-between px-5 border-b shrink-0"
          style={{ borderColor: 'var(--bg-border)' }}
        >
          <div className="flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
              <path d="M4 2H14V6H8V9H12V13H8V18H4Z" fill="var(--accent)" />
              <path d="M10 5H18V9H13V12H16V15H13V18H10Z" fill="var(--accent)" fillOpacity="0.55" />
            </svg>
            <span className="text-[15px] font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              FilterFlow
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className="text-[10px] font-mono px-1.5 py-0.5 rounded border leading-none"
              style={{ color: 'var(--text-muted)', background: 'var(--bg-card)', borderColor: 'var(--bg-border)' }}
            >
              v2.1
            </span>
            {isMobileDrawer && (
              <button
                type="button"
                onClick={close}
                aria-label="Close sidebar"
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ml-1"
                style={{ color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Accent top glow */}
        <div
          className="absolute top-14 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, var(--accent-glow, rgba(139,92,246,0.06)), transparent)' }}
        />

        {/* ── Nav sections ── */}
        <div className="mt-4 space-y-5 relative">

          {/* WORKSPACE */}
          <div>
            <p className="text-[9px] tracking-[0.15em] uppercase font-bold px-5 mb-2 mt-2 select-none"
               style={{ color: 'var(--text-muted)' }}>
              Workspace
            </p>
            <nav className="space-y-0.5">
              {[
                { view: 'my-tasks',  icon: CheckSquare, label: 'My Tasks',  badge: myTasksCount },
                { view: 'all-tasks', icon: LayoutList,  label: 'All Tasks'  },
                { view: 'projects',  icon: FolderOpen,  label: 'Projects'   },
                { view: 'sprints',   icon: Zap,         label: 'Sprints'    },
              ].map(({ view, icon: Icon, label, badge }) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => { onViewChange(view); close(); }}
                  className={navItem(view)}
                  style={navStyle(view)}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1">{label}</span>
                  {badge !== undefined && (
                    <span
                      className="text-[10px] font-bold font-mono w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white"
                      style={{ background: 'var(--accent)' }}
                    >
                      {badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* VIEWS */}
          <div>
            <p className="text-[9px] tracking-[0.15em] uppercase font-bold px-5 mb-2 select-none"
               style={{ color: 'var(--text-muted)' }}>
              Views
            </p>
            <nav className="space-y-0.5">
              {[
                { view: 'board',    icon: Columns,    label: 'Board'    },
                { view: 'calendar', icon: CalendarDays, label: 'Calendar' },
                { view: 'timeline', icon: GitBranch,  label: 'Timeline' },
              ].map(({ view, icon: Icon, label }) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => { onViewChange(view); close(); }}
                  className={navItem(view)}
                  style={navStyle(view)}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* ANALYTICS */}
          <div>
            <p className="text-[9px] tracking-[0.15em] uppercase font-bold px-5 mb-2 select-none"
               style={{ color: 'var(--text-muted)' }}>
              Analytics
            </p>
            <nav className="space-y-0.5">
              <button
                type="button"
                onClick={() => { onViewChange('reports'); close(); }}
                className={navItem('reports')}
                style={navStyle('reports')}
              >
                <BarChart2 className="w-4 h-4 shrink-0" />
                <span>Reports</span>
              </button>
              <button
                type="button"
                onClick={() => { onViewChange('insights'); close(); }}
                className={navItem('insights')}
                style={navStyle('insights')}
              >
                <Sparkles className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-cyan)' }} />
                <span style={{ color: activeView === 'insights' ? 'var(--accent)' : 'var(--accent-cyan)' }}>
                  Insights
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* ── Sprint Progress Ring Widget ── */}
        <div
          className="mx-3 mt-5 p-3.5 rounded-xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--bg-border)' }}
        >
          <div className="flex items-center justify-between text-xs font-semibold mb-3">
            <span style={{ color: 'var(--text-primary)' }}>Sprint 4</span>
            <span className="text-amber-500 font-mono text-[10px] font-bold animate-pulse">2 days left</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Donut ring */}
            <div className="relative w-[52px] h-[52px] shrink-0">
              <svg width="52" height="52" className="-rotate-90">
                <circle cx="26" cy="26" r={radius} fill="none" stroke="var(--bg-border)" strokeWidth="4" />
                <circle
                  cx="26" cy="26" r={radius} fill="none"
                  stroke="var(--accent)" strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
                />
              </svg>
              <div
                className="absolute inset-0 flex items-center justify-center text-[11px] font-mono font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {pct}%
              </div>
            </div>

            {/* Breakdown */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex justify-between text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-semibold">{done}/{total} tasks</span>
              </div>
              {[
                { dot: 'bg-emerald-500', label: 'Done',        count: done       },
                { dot: 'bg-blue-400',    label: 'In Progress', count: inProgress },
                { dot: 'bg-red-400',     label: 'Blocked',     count: blocked, danger: true },
              ].map(({ dot, label, count, danger }) => (
                <div key={label} className="flex items-center gap-1.5 text-[10px]">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                  <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                  <span
                    className="ml-auto font-mono font-bold"
                    style={{ color: danger && count > 0 ? '#f87171' : 'var(--text-muted)' }}
                  >
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── AI Assistant shortcut ── */}
        <div className="px-3 mt-4">
          <button
            type="button"
            onClick={() => { onToggleAiPanel(); close(); }}
            className="flex items-center justify-between px-3 py-2.5 w-full rounded-xl border text-xs font-medium cursor-pointer transition-all duration-150 active:scale-[0.98]"
            style={{
              background:  'color-mix(in srgb, var(--accent-cyan) 8%, transparent)',
              borderColor: 'color-mix(in srgb, var(--accent-cyan) 25%, transparent)',
              color:       'var(--accent-cyan)',
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>AI Assistant</span>
            </div>
            <kbd
              className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded leading-none border"
              style={{
                background:  'color-mix(in srgb, var(--accent-cyan) 10%, transparent)',
                borderColor: 'color-mix(in srgb, var(--accent-cyan) 25%, transparent)',
                color:       'var(--accent-cyan)',
              }}
            >
              ⌘J
            </kbd>
          </button>
        </div>
      </div>

      {/* ── User row ── */}
      <div className="mt-4 shrink-0">
        <div className="h-px" style={{ background: 'var(--bg-border)' }} />
        <div
          className="px-4 py-3 flex items-center justify-between transition-colors cursor-pointer"
          style={{ color: 'var(--text-secondary)' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <Avatar initials="AJ" color="bg-violet-600" size="lg" showTooltip={false} />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
                Alex Johnson
              </span>
              <span className="text-xs truncate leading-none mt-0.5" style={{ color: 'var(--text-muted)' }}>
                alex@acme.co
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Settings"
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            style={{ color: 'var(--text-muted)' }}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
