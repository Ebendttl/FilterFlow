import React, { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';

const SWATCHES = {
  obsidian: { base: '#09090b', accent: '#8b5cf6', cyan: '#06b6d4' },
  arctic:   { base: '#ffffff', accent: '#6366f1', cyan: '#0891b2' },
  midnight: { base: '#0d1117', accent: '#58a6ff', cyan: '#39d353' },
  ember:    { base: '#0c0a09', accent: '#f97316', cyan: '#fb923c' },
};

export default function ThemePicker({
  themes,
  theme,
  setTheme,
  isSystem,
  onClose
}) {
  const containerRef = useRef(null);

  // Close when clicking outside the picker container
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose?.();
      }
    }
    // Delay adding to avoid picking up the initial trigger click event
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 50);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-full mt-2 z-50 bg-ff-elevated border border-ff-border rounded-xl shadow-2xl shadow-black/50 p-3 w-56 select-none"
    >
      <p className="text-[10px] text-ff-muted font-bold uppercase tracking-wider mb-2.5 px-1">
        Appearance
      </p>

      {/* Theme selection grid */}
      <div className="grid grid-cols-2 gap-2">
        {themes.map((t) => {
          const isActive = theme === t.key && !isSystem;
          const sw = SWATCHES[t.key] || SWATCHES.obsidian;

          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTheme(t.key)}
              className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-150 relative flex flex-col items-start w-full group ${
                isActive
                  ? 'border-ff-accent bg-ff-accent/10'
                  : 'bg-ff-card border-transparent hover:border-ff-border'
              }`}
            >
              {/* Swatch circle stack */}
              <div className="flex gap-1">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-ff-border/20 shrink-0"
                  style={{ backgroundColor: sw.base }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: sw.accent }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: sw.cyan }}
                />
              </div>

              <span className="text-[11px] font-semibold text-ff-primary mt-2 group-hover:text-ff-accent transition-colors">
                {t.name}
              </span>

              {isActive && (
                <Check className="w-3.5 h-3.5 text-ff-accent absolute right-2 top-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Sync with system toggle bar */}
      <div className="flex items-center justify-between px-1 mt-3 pt-3 border-t border-ff-border">
        <span className="text-xs text-ff-secondary font-medium">
          System preference
        </span>

        {/* Toggle Switch */}
        <button
          type="button"
          onClick={() => setTheme('system')}
          aria-label="Toggle system preferences syncing"
          className="relative inline-flex h-4.5 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-255 ease-in-out focus:outline-none"
          style={{
            backgroundColor: isSystem ? 'var(--accent)' : 'var(--bg-border)'
          }}
        >
          <span
            className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              isSystem ? 'translate-x-3.5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
