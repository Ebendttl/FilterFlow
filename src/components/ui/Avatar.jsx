import React from 'react';

export default function Avatar({ initials = 'AJ', color = 'bg-violet-600', name = '', size = 'md', showTooltip = false }) {
  const sizes = { xs: 'w-5 h-5 text-[9px]', sm: 'w-6 h-6 text-[10px]', md: 'w-7 h-7 text-[11px]', lg: 'w-8 h-8 text-xs' };
  return (
    <div className="relative group inline-flex shrink-0">
      <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center font-mono font-medium text-white uppercase shrink-0 ring-1 ring-white/10`} aria-label={name}>
        {initials}
      </div>
      {showTooltip && name && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap z-50 pointer-events-none font-sans">
          {name}
        </div>
      )}
    </div>
  );
}
