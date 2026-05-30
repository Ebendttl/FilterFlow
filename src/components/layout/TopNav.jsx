import React, { useRef, useEffect } from 'react';
import { Menu, Search, Plus, HelpCircle } from 'lucide-react';
import Avatar from '../ui/Avatar';

export default function TopNav({
  searchValue,
  onSearchChange,
  onOpenSidebarDrawer,
  onOpenNewTaskModal,
  onOpenShortcutsModal,
  searchInputRef,
}) {
  
  // Clean search input clear helper
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      searchInputRef.current?.blur();
    }
  };

  return (
    <header className="h-14 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 sm:px-6 shrink-0 select-none">
      
      {/* Left side: Menu toggle + Search Input */}
      <div className="flex items-center gap-3 flex-1 min-w-0 max-w-lg">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={onOpenSidebarDrawer}
          aria-label="Open navigation drawer"
          className="md:hidden w-8 h-8 rounded-lg hover:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Local Search input */}
        <div className="relative flex-1 flex items-center min-w-0 max-w-sm">
          <Search className="absolute left-3 w-4 h-4 text-zinc-600 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={e => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search tasks..."
            className="w-full bg-zinc-900 hover:bg-zinc-850 focus:bg-zinc-900 border border-zinc-800 focus:border-zinc-700/80 rounded-xl text-xs text-zinc-100 pl-9 pr-12 py-2 outline-none focus:ring-1 focus:ring-zinc-700/30 transition-all placeholder:text-zinc-600"
          />
          {/* ⌘K Badge */}
          <span className="absolute right-3 text-[9px] font-bold font-mono bg-zinc-950 border border-zinc-800/80 text-zinc-500 px-1.5 py-0.5 rounded leading-none shrink-0 pointer-events-none">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right side: New Task CTA + ? button */}
      <div className="flex items-center gap-3 shrink-0">
        
        {/* Help icon button */}
        <button
          type="button"
          onClick={onOpenShortcutsModal}
          aria-label="Keyboard Shortcuts"
          className="w-8 h-8 rounded-lg hover:bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-zinc-350 transition-colors cursor-pointer select-none"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* CTA: Create Task */}
        <button
          type="button"
          onClick={onOpenNewTaskModal}
          className="h-9 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold px-3 sm:px-4 rounded-xl flex items-center gap-1.5 shadow-md shadow-violet-950/20 active:scale-[0.98] transition-all duration-150 cursor-pointer"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          <span className="hidden sm:inline">New Task</span>
        </button>

      </div>

    </header>
  );
}
