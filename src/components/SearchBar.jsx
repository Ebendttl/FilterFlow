import React, { useRef, useEffect, useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Focus search input on ⌘K (Mac) or Ctrl+K (Windows)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-80 shrink-0">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search className="w-[15px] h-[15px] text-customText-tertiary" />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search tasks or IDs..."
        className="w-full h-9 pl-9 pr-12 text-[13.5px] text-customText-primary placeholder:text-customText-tertiary bg-surface-2 border border-customBorder rounded-lg transition-all duration-150 ease-out focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white focus:shadow-sm focus:outline-none"
        aria-label="Search tasks"
      />

      <div 
        className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-150 ${
          isFocused ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="inline-flex items-center bg-white border border-customBorder rounded px-1.5 py-0.5 text-[10px] font-mono font-medium text-customText-tertiary shadow-sm">
          ⌘K
        </span>
      </div>
    </div>
  );
}
