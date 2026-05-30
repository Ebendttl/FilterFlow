import React from 'react';

export default function Avatar({ 
  initials = "AJ", 
  color = "bg-brand-primary", 
  name = "Alex Johnson", 
  size = "md", 
  showTooltip = false 
}) {
  // Size mappings
  const sizeClasses = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-7 w-7 text-[11px]",
    lg: "h-8 w-8 text-xs",
  };

  return (
    <div className="relative group inline-flex items-center justify-center">
      <div 
        className={`${sizeClasses[size]} ${color} rounded-full flex items-center justify-center font-medium text-white ring-1 ring-white/10 uppercase shadow-sm select-none`}
        aria-label={name}
      >
        {initials}
      </div>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-[11px] font-medium text-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-out whitespace-nowrap z-50 pointer-events-none">
          <div className="flex flex-col items-center">
            <span>{name}</span>
            {/* Tiny tooltip arrow */}
            <div className="w-1.5 h-1.5 bg-gray-900 rotate-45 mt-0.5 -mb-1"></div>
          </div>
        </div>
      )}
    </div>
  );
}
