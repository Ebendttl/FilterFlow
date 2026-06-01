import React from 'react';

export default function FilterChip({ label, isActive, onClick, dotColor }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-150 cursor-pointer select-none shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${
        isActive
          ? 'bg-violet-500/15 border-violet-500/40 text-violet-300'
          : 'bg-white/[0.035] border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
      }`}
    >
      {dotColor && <span className={`w-1.5 h-1.5 rounded-full ${dotColor} shrink-0`} />}
      {label}
    </button>
  );
}
