import React from 'react';

export default function FilterChip({ 
  label, 
  isActive, 
  onClick, 
  dotColor 
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 h-7 px-3 rounded-full border text-[12px] transition-all duration-150 ease-out select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 active:scale-[0.98] ${
        isActive 
          ? "bg-indigo-100 border-indigo-300 text-indigo-700 font-medium" 
          : "bg-surface-2 border-transparent text-customText-secondary hover:border-indigo-300 hover:text-indigo-700"
      }`}
    >
      {dotColor && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      )}
      <span>{label}</span>
    </button>
  );
}
