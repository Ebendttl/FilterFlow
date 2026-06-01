import React from 'react';
import {
  Bell, Bookmark, ChevronDown, Folder, HelpCircle, Inbox,
  Layers3, Plus, Settings, Sparkles, X
} from 'lucide-react';
import Avatar from '../ui/Avatar';
import { PROJECTS } from '../../data/tasks';

const PROJECT_DOTS = {
  'Core App': 'bg-violet-500',
  'Render Deploy': 'bg-sky-500',
  'Analytics Engine': 'bg-emerald-500',
  'Design System': 'bg-pink-500',
  'API Integration': 'bg-amber-500',
};

export default function Sidebar({
  activeView,
  onViewChange,
  onOpenSettings,
  tasks = [],
  filters,
  toggleProject,
  clearProjectFilter,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) {
  const inboxCount = tasks.filter(t => t.status === 'blocked' || t.priority === 'urgent').length;
  const myIssuesCount = tasks.filter(t => t.assignee?.name === 'Joan Akinseinde').length;
  const selectedProjects = filters?.projects || [];
  const close = () => onCloseMobileDrawer?.();

  const handleProject = (project) => {
    onViewChange('all-tasks');
    if (selectedProjects.length && !selectedProjects.includes(project)) clearProjectFilter?.();
    toggleProject?.(project);
    close();
  };

  const navButton = ({ key, icon: Icon, label, count, onClick }) => {
    const active = activeView === key;
    return (
      <button
        type="button"
        onClick={onClick || (() => { onViewChange(key); close(); })}
        className="group flex h-11 w-full items-center gap-3 rounded-md px-3 text-left text-[15px] font-medium transition-colors"
        style={{
          color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
          background: active ? 'rgba(255,255,255,0.075)' : 'transparent',
        }}
      >
        <Icon
          className="h-[22px] w-[22px] shrink-0 transition-colors"
          strokeWidth={1.9}
          style={{ color: active ? 'var(--accent)' : 'var(--text-muted)' }}
        />
        <span className="flex-1">{label}</span>
        {count !== undefined && (
          <span
            className="flex h-7 min-w-6 items-center justify-center rounded-md px-2 text-xs font-bold"
            style={{
              color: active ? '#d8b4fe' : 'var(--text-secondary)',
              background: active
                ? 'color-mix(in srgb, var(--accent) 22%, transparent)'
                : 'rgba(255,255,255,0.075)'
            }}
          >
            {count}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside
      className="flex h-full w-full select-none flex-col border-r"
      style={{ background: '#09090d', borderColor: '#24242a' }}
    >
      <div className="flex h-[86px] shrink-0 items-center justify-between border-b px-6" style={{ borderColor: '#222228' }}>
        <div className="flex min-w-0 items-center gap-3">
          <FilterFlowIcon className="h-8 w-8" />
          <div className="min-w-0">
            <div className="text-xs font-semibold leading-none" style={{ color: 'var(--text-muted)' }}>
              Workspace
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="truncate text-[15px] font-bold leading-none text-white">FilterFlow</span>
              <ChevronDown className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
            </div>
          </div>
        </div>

        {isMobileDrawer && (
          <button
            type="button"
            onClick={close}
            aria-label="Close sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ color: 'var(--text-muted)' }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <nav className="space-y-1">
          {navButton({ key: 'all-tasks', icon: Bell, label: 'Inbox', count: inboxCount })}
          {navButton({ key: 'my-tasks', icon: Layers3, label: 'My Issues', count: myIssuesCount })}
          {navButton({ key: 'board', icon: Bookmark, label: 'Views' })}
          {navButton({ key: 'settings', icon: Settings, label: 'Settings', onClick: onOpenSettings })}
        </nav>

        <div className="my-5 h-px" style={{ background: '#17171c' }} />

        <div className="mb-3 flex items-center justify-between px-3">
          <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
            Projects
          </span>
          <button
            type="button"
            aria-label="Add project"
            className="flex h-6 w-6 items-center justify-center rounded-md"
            style={{ color: 'var(--text-muted)' }}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-1">
          <button
            type="button"
            onClick={() => { clearProjectFilter?.(); onViewChange('all-tasks'); close(); }}
            className="flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-sm font-semibold"
            style={{
              color: !selectedProjects.length ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: !selectedProjects.length ? 'rgba(255,255,255,0.075)' : 'transparent'
            }}
          >
            <Folder className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
            All Projects
          </button>

          {PROJECTS.map(project => {
            const active = selectedProjects.includes(project);
            return (
              <button
                key={project}
                type="button"
                onClick={() => handleProject(project)}
                className="flex h-9 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition-colors"
                style={{
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: active ? 'rgba(255,255,255,0.06)' : 'transparent'
                }}
              >
                <span className={`h-2 w-2 rounded-full ${PROJECT_DOTS[project] || 'bg-zinc-500'}`} />
                <span className="truncate">{project}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => { onViewChange('insights'); close(); }}
          className="mt-6 flex h-10 w-full items-center gap-2.5 rounded-md px-3 text-left text-sm font-semibold"
          style={{ color: 'var(--accent-cyan)', background: 'rgba(34,211,238,0.055)' }}
        >
          <Sparkles className="h-4 w-4" />
          AI Assistant
        </button>
      </div>

      <div className="border-t px-4 py-4" style={{ borderColor: '#1f1f25' }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar
              initials="JA"
              color="bg-violet-600"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80"
              size="sm"
              showTooltip={false}
            />
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">Joan Akinseinde</div>
              <div className="mt-0.5 truncate text-xs" style={{ color: 'var(--text-muted)' }}>joan@filterflow.com</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Help"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
            style={{ color: 'var(--text-muted)' }}
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function FilterFlowIcon({ className = '' }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg ${className}`}
      style={{ background: 'linear-gradient(180deg, #7c3aed, #5b21b6)' }}
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 2H14V6H8V9H12V13H8V18H4Z" fill="white" />
        <path d="M10 5H18V9H13V12H16V15H13V18H10Z" fill="white" fillOpacity="0.58" />
      </svg>
    </div>
  );
}
