import React from 'react';

export default function FilterChip({ label, isActive, onClick, dotColor }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-all duration-150 cursor-pointer select-none shrink-0 ${
        isActive
          ? 'bg-violet-500/15 border-violet-500/40 text-violet-300'
          : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-300'
      }`}
    >
      {dotColor && <span className={`w-1.5 h-1.5 rounded-full ${dotColor} shrink-0`} />}
      {label}
    </button>
  );
}
