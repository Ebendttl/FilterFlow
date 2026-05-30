import React from 'react';

// 12 skeleton rows with shimmer effect
export default function Skeleton({ rows = 12 }) {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="border-b border-zinc-800 h-10 bg-zinc-950 flex items-center px-4 gap-4">
        {['w-4', 'flex-1', 'w-28', 'w-24', 'w-32', 'w-36', 'w-24', 'w-8'].map((w, i) => (
          <div key={i} className={`${w} h-3 rounded shimmer`} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 border-b border-zinc-800/50 flex items-center px-4 gap-4">
          <div className="w-4 h-4 rounded shimmer" />
          <div className="flex-1 h-3.5 rounded shimmer" />
          <div className="w-28 h-5 rounded-full shimmer" />
          <div className="w-24 h-3.5 rounded shimmer" />
          <div className="w-32 h-3.5 rounded shimmer" />
          <div className="w-36 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full shimmer" />
            <div className="flex-1 h-3.5 rounded shimmer" />
          </div>
          <div className="w-24 h-3.5 rounded shimmer" />
          <div className="w-8 h-6 rounded shimmer" />
        </div>
      ))}
    </div>
  );
}
