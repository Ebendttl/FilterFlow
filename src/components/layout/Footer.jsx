import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

export default function Footer({ tasks = [], isDark = true, toggleTheme, onOpenGuide }) {
  const total     = tasks.length;
  const done      = tasks.filter(t => t.status === 'done').length;
  const blocked   = tasks.filter(t => t.status === 'blocked').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;

  return (
    <footer
      className="shrink-0 border-t select-none"
      style={{
        background:   'var(--bg-elevated)',
        borderColor:  'var(--bg-border)',
      }}
    >
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-5">

        {/* ── Left: branding + live status ── */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {/* Logo mark */}
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="shrink-0">
            <path d="M4 2H14V6H8V9H12V13H8V18H4Z" fill="var(--accent)" />
            <path d="M10 5H18V9H13V12H16V15H13V18H10Z" fill="var(--accent)" fillOpacity="0.55" />
          </svg>

          <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            FilterFlow
          </span>

          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded border leading-none"
            style={{
              color:       'var(--text-muted)',
              background:  'var(--bg-card)',
              borderColor: 'var(--bg-border)',
            }}
          >
            v2.1
          </span>

          <span className="hidden sm:inline" style={{ color: 'var(--bg-border)' }}>·</span>

          {/* Live pulse */}
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Live</span>
          </div>

          <span className="hidden md:inline" style={{ color: 'var(--bg-border)' }}>·</span>

          {/* Task stats */}
          <span className="hidden text-[11px] md:inline" style={{ color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{total}</span> tasks
            &nbsp;·&nbsp;
            <span className="text-emerald-500 font-semibold">{done}</span> done
            &nbsp;·&nbsp;
            <span className="text-blue-400 font-semibold">{inProgress}</span> active
            {blocked > 0 && (
              <>
                &nbsp;·&nbsp;
                <span className="text-red-400 font-semibold">{blocked}</span> blocked
              </>
            )}
          </span>
        </div>

        {/* ── Right: dark/light toggle + credit ── */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span
            className="text-[11px] hidden sm:inline"
            style={{ color: 'var(--text-muted)' }}
          >
            Built with <span style={{ color: 'var(--accent)' }}>♥</span> &amp; Claude AI
          </span>

          <span className="hidden sm:block w-px h-3" style={{ background: 'var(--bg-border)' }} />

          <button
            type="button"
            onClick={onOpenGuide}
            className="hidden items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors hover:border-violet-500/40 sm:flex"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--bg-border)',
              color: 'var(--text-secondary)',
            }}
          >
            <Sparkles size={12} style={{ color: 'var(--accent)' }} />
            Guide
          </button>

          {/* ── The visible, labeled Dark / Light toggle ── */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer active:scale-95"
            style={{
              background:   'var(--bg-card)',
              borderColor:  'var(--bg-border)',
              color:        'var(--text-secondary)',
            }}
            title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
          >
            {isDark
              ? <><Sun  size={12} className="text-amber-400" /><span>Light</span></>
              : <><Moon size={12} style={{ color: 'var(--accent)' }} /><span>Dark</span></>
            }
          </button>
        </div>

      </div>
    </footer>
  );
}
