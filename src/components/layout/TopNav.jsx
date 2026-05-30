import React from 'react';
import { Menu, Search, Plus, Bell, Sun, Moon } from 'lucide-react';
import Avatar from '../ui/Avatar';

export default function TopNav({
  searchValue,
  onSearchChange,
  onOpenSidebarDrawer,
  onOpenNewTaskModal,
  onOpenCommandPalette,
  searchInputRef,
  isDark,
  toggleTheme,
  tasks = []
}) {
  const hasUnread = tasks.some(t => t.status === 'blocked');

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') searchInputRef.current?.blur();
  };

  return (
    <header
      className="h-14 flex items-center px-3 md:px-5 gap-2 shrink-0 border-b z-40 sticky top-0"
      style={{
        background:   'var(--bg-elevated)',
        borderColor:  'var(--bg-border)',
        backdropFilter: 'blur(12px)',
      }}
    >

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  MOBILE  <768px — hamburger | search | actions          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="flex md:hidden items-center w-full gap-2">

        {/* Zone A — hamburger */}
        <button
          type="button"
          onClick={onOpenSidebarDrawer}
          aria-label="Open navigation"
          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
          style={{ color: 'var(--text-muted)' }}
        >
          <Menu size={18} />
        </button>

        {/* Zone B — search, flex-1 */}
        <div className="flex-1 min-w-0 relative">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={e => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search tasks..."
            className="w-full h-8 rounded-lg pl-8 pr-3 text-xs border outline-none transition-colors"
            style={{
              background:   'var(--bg-hover)',
              borderColor:  'var(--bg-border)',
              color:        'var(--text-primary)',
            }}
          />
        </div>

        {/* Zone C — actions, shrink-0 */}
        <div className="shrink-0 flex items-center gap-1">

          {/* Dark / Light toggle — VISIBLE, LABELED */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center gap-1 h-8 px-2.5 rounded-lg border text-[11px] font-semibold transition-all duration-200 cursor-pointer shrink-0 active:scale-95"
            style={{
              background:  'var(--bg-card)',
              borderColor: 'var(--bg-border)',
              color:       'var(--text-secondary)',
            }}
          >
            {isDark
              ? <><Sun  size={12} className="text-amber-400 shrink-0" /><span className="hidden xs:inline">Light</span></>
              : <><Moon size={12} style={{ color: 'var(--accent)' }} className="shrink-0" /><span className="hidden xs:inline">Dark</span></>
            }
          </button>

          {/* New task */}
          <button
            type="button"
            onClick={onOpenNewTaskModal}
            aria-label="Create new task"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white transition-all duration-150 cursor-pointer active:scale-95 shrink-0"
            style={{ background: 'var(--accent)' }}
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  DESKTOP  ≥768px — breadcrumb | search + controls      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="hidden md:flex items-center w-full gap-4">

        {/* Left: breadcrumb */}
        <div className="flex items-center gap-2 select-none shrink-0">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="shrink-0">
            <path d="M4 2H14V6H8V9H12V13H8V18H4Z" fill="var(--accent)" />
            <path d="M10 5H18V9H13V12H16V15H13V18H10Z" fill="var(--accent)" fillOpacity="0.55" />
          </svg>
          <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            FilterFlow
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>›</span>
          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            Active Workspace
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Search bar */}
          <div className="relative flex items-center">
            <Search size={13} className="absolute left-3 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={searchValue}
              onChange={e => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="h-8 w-48 rounded-lg pl-8 pr-10 text-xs border outline-none transition-colors"
              style={{
                background:  'var(--bg-hover)',
                borderColor: 'var(--bg-border)',
                color:       'var(--text-primary)',
              }}
            />
            {/* ⌘K badge */}
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="absolute right-2 text-[9px] font-mono font-bold px-1 py-0.5 rounded border leading-none cursor-pointer transition-colors"
              style={{
                background:  'var(--bg-card)',
                borderColor: 'var(--bg-border)',
                color:       'var(--text-muted)',
              }}
            >
              ⌘K
            </button>
          </div>

          {/* ── DARK / LIGHT TOGGLE — prominent, labeled ── */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95"
            style={{
              background:  'var(--bg-card)',
              borderColor: 'var(--bg-border)',
              color:       'var(--text-secondary)',
            }}
          >
            {isDark
              ? <><Sun  size={13} className="text-amber-400" /><span>Light</span></>
              : <><Moon size={13} style={{ color: 'var(--accent)' }} /><span>Dark</span></>
            }
          </button>

          {/* Bell */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative w-8 h-8 rounded-lg flex items-center justify-center border transition-colors cursor-pointer"
            style={{
              background:  'var(--bg-card)',
              borderColor: 'var(--bg-border)',
              color:       'var(--text-muted)',
            }}
          >
            <Bell size={15} />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            )}
          </button>

          {/* Avatar */}
          <Avatar initials="AJ" color="bg-violet-600" size="xs" showTooltip={false} />

          {/* New task */}
          <button
            type="button"
            onClick={onOpenNewTaskModal}
            className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-xs font-semibold text-white transition-all duration-150 cursor-pointer active:scale-[0.97]"
            style={{ background: 'var(--accent)' }}
          >
            <Plus size={14} strokeWidth={2.5} />
            <span>New Task</span>
          </button>
        </div>
      </div>

    </header>
  );
}
