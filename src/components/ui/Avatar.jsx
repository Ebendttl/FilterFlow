import React from 'react';

export default function Avatar({ initials = 'AJ', color = 'bg-violet-600', name = '', image, size = 'md', showTooltip = false }) {
  const sizes = {
    xs: 'w-6 h-6 text-[9px]',
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-9 h-9 text-[11px]',
    lg: 'w-11 h-11 text-xs',
    hero: 'w-20 h-20 xl:w-24 xl:h-24 text-lg'
  };
  return (
    <div className="relative group inline-flex shrink-0">
      {image ? (
        <img
          src={image}
          alt={name || initials}
          className={`${sizes[size]} rounded-full object-cover shrink-0 ring-1 ring-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.34)]`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center font-mono font-bold text-white uppercase shrink-0 ring-1 ring-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.34)]`} aria-label={name}>
          {initials}
        </div>
      )}
      {showTooltip && name && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap z-50 pointer-events-none font-sans">
          {name}
        </div>
      )}
    </div>
  );
}
