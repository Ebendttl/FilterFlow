import React from 'react';
import { Menu, Sparkles } from 'lucide-react';

export default function TopNav({
  onOpenSidebarDrawer,
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

        <div className="flex-1 min-w-0" />

        {/* Zone C — actions, shrink-0 */}
        <div className="shrink-0 flex items-center gap-1">

          <ProductionBadge />
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

        <ProductionBadge />
      </div>

    </header>
  );
}

function ProductionBadge() {
  return (
    <div
      className="flex h-8 items-center gap-1.5 rounded-md border px-3 text-xs font-medium"
      style={{
        color: 'var(--text-muted)',
        borderColor: '#23232a',
        background: '#15151a'
      }}
    >
      <Sparkles className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
      Production Mode
    </div>
  );
}
