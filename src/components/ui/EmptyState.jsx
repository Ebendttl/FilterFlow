import React from 'react';
import { SearchX, Sparkles } from 'lucide-react';

export default function EmptyState({ onClearFilters, onAskAI }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center select-none">
      {/* Geometric SVG illustration */}
      <div className="relative w-20 h-20 mb-6">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect x="8" y="12" width="40" height="28" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5"/>
          <rect x="18" y="22" width="40" height="28" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5"/>
          <rect x="28" y="32" width="40" height="28" rx="4" fill="#09090b" stroke="#52525b" strokeWidth="1.5"/>
          <path d="M38 46 L48 46 M38 52 L44 52" stroke="#3f3f46" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <h3 className="text-base font-medium text-zinc-400 mb-1">No tasks found</h3>
      <p className="text-sm text-zinc-600 mb-6 max-w-xs">
        Try a different filter or ask AI to search for you
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-100 text-sm rounded-lg transition-colors duration-150 cursor-pointer"
        >
          Clear filters
        </button>
        <button
          onClick={onAskAI}
          className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 text-sm rounded-lg transition-colors duration-150 cursor-pointer flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Ask AI
        </button>
      </div>
    </div>
  );
}
