import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckSquare, 
  LayoutList, 
  Columns, 
  CalendarDays, 
  Sparkles, 
  Plus, 
  Wand2, 
  Circle, 
  AlertTriangle, 
  X, 
  Moon, 
  Sun, 
  Flame, 
  Keyboard, 
  Palette, 
  SearchX 
} from 'lucide-react';

export default function CommandPalette({
  isOpen,
  onClose,
  onViewChange,
  onOpenNewTask,
  onToggleAiPanel,
  onFocusCommandBar,
  toggleStatus,
  togglePriority,
  clearAllFilters,
  setTheme,
  onOpenShortcuts
}) {
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const rawCommands = [
    // NAVIGATION
    { label: 'Go to My Tasks', group: 'NAVIGATION', icon: CheckSquare, shortcut: '', action: () => onViewChange('my-tasks') },
    { label: 'Go to All Tasks', group: 'NAVIGATION', icon: LayoutList, shortcut: '', action: () => onViewChange('all-tasks') },
    { label: 'Go to Board View', group: 'NAVIGATION', icon: Columns, shortcut: '', action: () => onViewChange('board') },
    { label: 'Go to Calendar View', group: 'NAVIGATION', icon: CalendarDays, shortcut: '', action: () => onViewChange('calendar') },
    { label: 'Go to Insights Dashboard', group: 'NAVIGATION', icon: Sparkles, shortcut: '', action: () => onViewChange('insights') },

    // ACTIONS
    { label: 'Create new task', group: 'ACTIONS', icon: Plus, shortcut: '⌘N', action: onOpenNewTask },
    { label: 'Open AI assistant panel', group: 'ACTIONS', icon: Sparkles, shortcut: '⌘J', action: onToggleAiPanel },
    { label: 'Apply AI search filters', group: 'ACTIONS', icon: Wand2, shortcut: '⌘K', action: onFocusCommandBar },

    // FILTERS
    { label: 'Filter by Status: In Progress', group: 'FILTERS', icon: Circle, shortcut: '', action: () => toggleStatus('in_progress') },
    { label: 'Filter by Priority: Urgent', group: 'FILTERS', icon: AlertTriangle, shortcut: '', action: () => togglePriority('urgent') },
    { label: 'Clear all active filters', group: 'FILTERS', icon: X, shortcut: '', action: clearAllFilters },

    // APPEARANCE
    { label: 'Switch to Obsidian theme', group: 'APPEARANCE', icon: Moon, shortcut: '', action: () => setTheme('obsidian') },
    { label: 'Switch to Arctic theme', group: 'APPEARANCE', icon: Sun, shortcut: '', action: () => setTheme('arctic') },
    { label: 'Switch to Midnight theme', group: 'APPEARANCE', icon: Moon, shortcut: '', action: () => setTheme('midnight') },
    { label: 'Switch to Ember theme', group: 'APPEARANCE', icon: Flame, shortcut: '', action: () => setTheme('ember') },

    // HELP
    { label: 'View keyboard shortcuts guide', group: 'HELP', icon: Keyboard, shortcut: '?', action: onOpenShortcuts },
    { label: 'Toggle appearance theme', group: 'HELP', icon: Palette, shortcut: '', action: () => {
      // Cylce theme
      const themes = ['obsidian', 'arctic', 'midnight', 'ember'];
      const current = localStorage.getItem('ff-theme') || 'obsidian';
      const idx = themes.indexOf(current);
      const next = themes[(idx + 1) % themes.length];
      setTheme(next);
    }}
  ];

  // Filter commands by search query
  const filteredCommands = rawCommands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.group.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation listeners
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredCommands[activeIndex];
        if (selected) {
          selected.action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, activeIndex, onClose]);

  // Adjust scroll when activeIndex changes
  useEffect(() => {
    const activeEl = listRef.current?.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  // Group the filtered commands
  const groups = {};
  filteredCommands.forEach((cmd, idx) => {
    if (!groups[cmd.group]) groups[cmd.group] = [];
    groups[cmd.group].push({ ...cmd, globalIndex: idx });
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity"
          />

          {/* Centered Panel */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] p-4">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="bg-ff-elevated border border-ff-border w-full max-w-xl rounded-2xl shadow-2xl shadow-black/70 overflow-hidden select-none"
            >
              {/* Header Search Field */}
              <div className="px-4 pt-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setActiveIndex(0); }}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent border-none outline-none text-base text-ff-primary placeholder:text-ff-muted font-medium outline-none focus:ring-0"
                />
                <div className="border-b border-ff-border pb-3 mt-3" />
              </div>

              {/* Body lists */}
              <div 
                ref={listRef}
                className="max-h-96 overflow-y-auto py-2"
              >
                {filteredCommands.length === 0 ? (
                  <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
                    <SearchX className="w-8 h-8 text-ff-muted animate-pulse" />
                    <span className="text-xs font-semibold text-ff-muted uppercase tracking-wider">
                      No commands found
                    </span>
                  </div>
                ) : (
                  Object.entries(groups).map(([groupName, items]) => (
                    <div key={groupName}>
                      {/* Group label header */}
                      <div className="text-[9px] uppercase tracking-widest text-ff-muted font-bold px-4 py-2 select-none">
                        {groupName}
                      </div>

                      {/* Items */}
                      <div className="space-y-0.5">
                        {items.map((item) => {
                          const IconComponent = item.icon;
                          const isActive = activeIndex === item.globalIndex;

                          return (
                            <div
                              key={item.label}
                              onClick={() => { item.action(); onClose(); }}
                              onMouseEnter={() => setActiveIndex(item.globalIndex)}
                              data-active={isActive}
                              className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl cursor-pointer text-sm transition-colors duration-100 ${
                                isActive
                                  ? 'bg-ff-accent/10 text-ff-accent font-semibold'
                                  : 'text-ff-secondary hover:bg-ff-hover hover:text-ff-primary'
                              }`}
                            >
                              <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-ff-accent' : 'text-ff-muted'}`} />
                              <span>{item.label}</span>

                              {item.shortcut && (
                                <span className="ml-auto text-[9px] font-bold font-mono bg-ff-card border border-ff-border px-1.5 py-0.5 rounded text-ff-muted leading-none">
                                  {item.shortcut}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer instruction guidelines */}
              <div className="px-4 py-3 border-t border-ff-border flex items-center gap-4 text-[9px] font-bold text-ff-muted font-mono uppercase tracking-widest bg-ff-base/40">
                <span>↑↓ navigate</span>
                <span className="text-ff-muted/30">•</span>
                <span>↵ select</span>
                <span className="text-ff-muted/30">•</span>
                <span>esc close</span>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
