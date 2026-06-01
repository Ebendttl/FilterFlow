import React from 'react';
import { Menu, Sparkles } from 'lucide-react';

export default function TopNav({
  onOpenSidebarDrawer,
  onOpenGuide,
  tasks = []
}) {
  return (
    <header
      className="h-16 flex items-center px-3 md:px-7 gap-2 shrink-0 border-b z-40 sticky top-0"
      style={{
        background: '#09090d',
        borderColor: '#202026',
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

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <FilterFlowMark />
          <div className="min-w-0">
            <div className="truncate text-sm font-bold leading-none text-white">FilterFlow</div>
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--text-muted)' }}>Workspace</div>
          </div>
        </div>

        {/* Zone C — actions, shrink-0 */}
        <div className="shrink-0 flex items-center gap-1">

          <ProductionBadge onClick={onOpenGuide} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  DESKTOP  ≥768px — breadcrumb | search + controls      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="hidden md:flex items-center w-full gap-5">

        {/* Left: breadcrumb */}
        <div className="flex items-center gap-2.5 select-none shrink-0">
          <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
            joanisunique
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>/</span>
          <span className="text-[15px] font-bold" style={{ color: 'var(--text-primary)' }}>
            FilterFlow
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.14em] px-2 py-1 rounded-md border"
            style={{
              color: 'var(--accent)',
              background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
              borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)'
            }}
          >
            SaaS
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        <ProductionBadge onClick={onOpenGuide} />
      </div>

    </header>
  );
}

function ProductionBadge({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors hover:border-violet-500/40 sm:px-3"
      style={{
        color: 'var(--text-muted)',
        borderColor: '#23232a',
        background: '#15151a'
      }}
    >
      <Sparkles className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
      <span className="hidden min-[390px]:inline">Production Mode</span>
      <span className="min-[390px]:hidden">Guide</span>
    </button>
  );
}

function FilterFlowMark() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: 'linear-gradient(180deg, #7c3aed, #5b21b6)' }}>
      <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 2H14V6H8V9H12V13H8V18H4Z" fill="white" />
        <path d="M10 5H18V9H13V12H16V15H13V18H10Z" fill="white" fillOpacity="0.58" />
      </svg>
    </div>
  );
}
