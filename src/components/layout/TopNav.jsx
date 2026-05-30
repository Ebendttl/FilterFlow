import React, { useState } from 'react';
import { Menu, Search, Plus, Bell, Sun, Moon, Flame, ChevronRight } from 'lucide-react';
import Avatar from '../ui/Avatar';
import ThemePicker from '../ui/ThemePicker';

export default function TopNav({
  searchValue,
  onSearchChange,
  onOpenSidebarDrawer,
  onOpenNewTaskModal,
  onOpenShortcutsModal,
  onOpenCommandPalette,
  searchInputRef,
  theme = 'obsidian',
  themeName,
  themes,
  setTheme,
  isSystem,
  tasks = []
}) {
  const [showThemePicker, setShowThemePicker] = useState(false);

  // Check if any task is blocked for the notification unread badge dot
  const hasUnread = tasks.some(t => t.status === 'blocked');

  // Determine active theme icon
  const themeIcons = {
    obsidian: Moon,
    arctic: Sun,
    midnight: Moon,
    ember: Flame
  };
  const ThemeIcon = themeIcons[theme] || Moon;

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      searchInputRef.current?.blur();
    }
  };

  return (
    <header className="h-13 px-3 md:px-6 gap-2 md:gap-3 flex items-center sticky top-0 z-45 bg-ff-elevated/90 backdrop-blur-md border-b border-ff-border shrink-0 select-none">
      
      {/* ========================================================================= */}
      {/* MOBILE LAYOUT (< 768px)                                                   */}
      {/* ========================================================================= */}
      <div className="flex md:hidden items-center justify-between w-full gap-2">
        
        {/* Zone A — LEFT (flex-shrink-0) */}
        <button 
          onClick={onOpenSidebarDrawer}
          type="button"
          className="flex items-center justify-center w-8 h-8 rounded-lg text-ff-muted hover:text-ff-primary hover:bg-ff-hover transition-colors flex-shrink-0 cursor-pointer"
        >
          <Menu size={18} />
        </button>

        {/* Zone B — CENTER (flex-1, min-width-0) */}
        <div className="flex-1 min-w-0 relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ff-muted/65" size={13} />
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={e => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-8 bg-ff-hover/60 border border-ff-border rounded-lg pl-8 pr-3 text-xs text-ff-primary placeholder:text-ff-muted focus:outline-none focus:border-ff-accent/60 transition-colors"
            placeholder="Search tasks..."
          />
        </div>

        {/* Zone C — RIGHT (flex-shrink-0, flex items-center gap-1) */}
        <div className="flex-shrink-0 flex items-center gap-1 relative">
          {/* 1. Theme toggle button */}
          <button
            type="button"
            onClick={() => setShowThemePicker(p => !p)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-ff-muted hover:text-ff-primary hover:bg-ff-hover transition-colors cursor-pointer"
          >
            <ThemeIcon size={16} />
          </button>

          {/* 2. Notification bell button */}
          <button
            type="button"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-ff-muted hover:text-ff-primary hover:bg-ff-hover relative transition-colors cursor-pointer"
          >
            <Bell size={16} />
            {hasUnread && (
              <span className="w-1.5 h-1.5 absolute top-2 right-2 bg-red-500 rounded-full shadow" />
            )}
          </button>

          {/* 3. New Task button — ICON ONLY on mobile */}
          <button
            type="button"
            onClick={onOpenNewTaskModal}
            className="w-8 h-8 bg-ff-accent hover:bg-ff-accent/80 rounded-lg flex items-center justify-center text-white flex-shrink-0 cursor-pointer active:scale-95 transition-all duration-150"
          >
            <Plus size={16} />
          </button>

          {showThemePicker && (
            <ThemePicker
              themes={themes}
              theme={theme}
              setTheme={setTheme}
              isSystem={isSystem}
              onClose={() => setShowThemePicker(false)}
            />
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (>= 768px)                                                 */}
      {/* ========================================================================= */}
      <div className="hidden md:flex items-center justify-between w-full">
        
        {/* Left: breadcrumb */}
        <div className="flex items-center gap-2 select-none text-xs">
          <span className="text-ff-muted font-bold uppercase tracking-wider text-[10px]">
            FilterFlow
          </span>
          <ChevronRight size={11} className="text-ff-muted/60" />
          <span className="text-ff-primary font-semibold">
            Active Workspace
          </span>
        </div>

        {/* Center: spacing */}
        <div className="flex-1" />

        {/* Right side controls */}
        <div className="flex items-center gap-3 relative shrink-0">
          
          {/* Desktop TopNav Search Area */}
          <div className="relative flex items-center w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ff-muted/65" size={13} />
            <input
              type="text"
              value={searchValue}
              onChange={e => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-8 bg-ff-hover/60 border border-ff-border rounded-lg pl-8 pr-12 text-xs text-ff-primary placeholder:text-ff-muted focus:outline-none focus:border-ff-accent/60 transition-colors"
              placeholder="Search..."
            />
            {/* ⌘K Badge acting as shortcut click trigger */}
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="absolute right-2 text-[9px] font-bold font-mono bg-ff-card border border-ff-border text-ff-muted px-1.5 py-0.5 rounded leading-none shrink-0 cursor-pointer hover:border-ff-accent hover:text-ff-primary transition-colors"
            >
              ⌘K
            </button>
          </div>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={() => setShowThemePicker(p => !p)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-ff-muted hover:text-ff-primary hover:bg-ff-hover transition-colors cursor-pointer"
          >
            <ThemeIcon size={16} />
          </button>

          {/* Notification bell button */}
          <button
            type="button"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-ff-muted hover:text-ff-primary hover:bg-ff-hover relative transition-colors cursor-pointer"
          >
            <Bell size={16} />
            {hasUnread && (
              <span className="w-1.5 h-1.5 absolute top-2.5 right-2.5 bg-red-500 rounded-full shadow" />
            )}
          </button>

          {/* User profile avatar */}
          <Avatar initials="AJ" color="bg-ff-accent" size="xs" showTooltip={false} />

          {/* New Task Button with label */}
          <button
            type="button"
            onClick={onOpenNewTaskModal}
            className="h-8 bg-ff-accent hover:bg-ff-accent/80 text-white text-xs font-semibold px-3.5 rounded-lg flex items-center gap-1.5 shadow active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            <Plus size={14} strokeWidth={2.5} />
            <span>New Task</span>
          </button>

          {showThemePicker && (
            <ThemePicker
              themes={themes}
              theme={theme}
              setTheme={setTheme}
              isSystem={isSystem}
              onClose={() => setShowThemePicker(false)}
            />
          )}
        </div>

      </div>

    </header>
  );
}
