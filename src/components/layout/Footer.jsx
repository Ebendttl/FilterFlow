import React from 'react';
import { History, BookOpen, Activity, Sun, Moon, Monitor, Flame } from 'lucide-react';

export default function Footer({ tasks = [], currentTheme = 'obsidian', onOpenShortcuts }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const blockedTasks = tasks.filter(t => t.status === 'blocked').length;

  const themeIcons = {
    obsidian: Moon,
    arctic: Sun,
    midnight: Moon,
    ember: Flame
  };
  const ThemeIcon = themeIcons[currentTheme] || Moon;

  const themeDisplayNames = {
    obsidian: 'Obsidian',
    arctic: 'Arctic',
    midnight: 'Midnight',
    ember: 'Ember'
  };
  const currentThemeName = themeDisplayNames[currentTheme] || 'Obsidian';

  return (
    <footer className="w-full shrink-0 border-t border-ff-border bg-ff-base select-none mt-auto">
      {/* Desktop Footer (hidden on mobile, flex on md:) */}
      <div className="hidden md:flex items-center justify-between px-6 py-5 flex-wrap gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path d="M4 2 H14 V6 H8 V9 H12 V13 H8 V18 H4 Z" fill="var(--accent)" />
              <path d="M10 5 H18 V9 H13 V12 H16 V15 H13 V18 H10 Z" fill="var(--accent)" fillOpacity="0.6" />
            </svg>
            <span className="text-sm font-semibold text-ff-secondary">
              FilterFlow
            </span>
            <span className="text-xs text-ff-muted font-mono ml-1">
              v2.1.0
            </span>
          </div>

          <span className="text-ff-muted/30 font-bold">·</span>

          <span className="text-xs text-ff-muted font-medium">
            {totalTasks} tasks · {completedTasks} completed · {blockedTasks} blocked
          </span>

          <span className="text-ff-muted/30 font-bold">·</span>

          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-ff-muted font-medium">Live</span>
          </div>
        </div>

        {/* Center Section Links */}
        <div className="flex items-center gap-5">
          <a href="#changelog" className="flex items-center gap-1 text-xs text-ff-muted hover:text-ff-secondary cursor-pointer transition-colors font-medium">
            <History size={11} />
            <span>Changelog</span>
          </a>
          <a href="#docs" className="flex items-center gap-1 text-xs text-ff-muted hover:text-ff-secondary cursor-pointer transition-colors font-medium">
            <BookOpen size={11} />
            <span>Docs</span>
          </a>
          <div className="flex items-center gap-1 text-xs text-ff-muted font-medium">
            <Activity size={11} className="text-emerald-500" />
            <span>API Status</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <button
            type="button"
            onClick={onOpenShortcuts}
            className="text-xs text-ff-muted hover:text-ff-secondary cursor-pointer transition-colors font-medium"
          >
            Keyboard Shortcuts
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-ff-muted font-medium">
            <ThemeIcon size={12} className="text-ff-muted" />
            <span className="capitalize">{currentThemeName} theme</span>
          </div>

          <span className="text-ff-muted/30 font-bold">·</span>

          <span className="text-xs text-ff-muted font-medium">
            Built with <span className="text-ff-accent">♥</span> & Claude AI
          </span>
        </div>
      </div>

      {/* Mobile Footer (< 768px) */}
      <div className="flex md:hidden flex-col gap-3 text-center py-5 px-4 bg-ff-base">
        <div className="flex items-center justify-center gap-2">
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path d="M4 2 H14 V6 H8 V9 H12 V13 H8 V18 H4 Z" fill="var(--accent)" />
            <path d="M10 5 H18 V9 H13 V12 H16 V15 H13 V18 H10 Z" fill="var(--accent)" fillOpacity="0.6" />
          </svg>
          <span className="text-sm font-semibold text-ff-secondary">
            FilterFlow
          </span>
          <span className="text-xs text-ff-muted font-mono ml-1">
            v2.1.0
          </span>
        </div>

        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-ff-muted font-medium">Live</span>
          </div>
          <span className="text-ff-muted/30">•</span>
          <span className="text-xs text-ff-muted font-medium">
            {totalTasks} tasks · {completedTasks} completed · {blockedTasks} blocked
          </span>
        </div>

        <span className="text-xs text-ff-muted/80">
          Built with <span className="text-ff-accent">♥</span> & Claude AI
        </span>
      </div>
    </footer>
  );
}
