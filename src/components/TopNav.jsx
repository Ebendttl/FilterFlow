import React, { useState, useEffect } from 'react';
import { Upload, Plus, Bell } from 'lucide-react';
import Avatar from './Avatar';

export default function TopNav() {
  const [animateAttention, setAnimateAttention] = useState(true);

  // Stop the onboarding attention pulse after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateAttention(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="h-14 bg-white border-b border-customBorder flex items-center px-6 gap-4 sticky top-0 z-30 select-none shrink-0">
      
      {/* Left section: Breadcrumbs */}
      <nav className="flex items-center gap-2" aria-label="Breadcrumb">
        <a 
          href="#my-tasks" 
          className="text-customText-secondary text-sm hover:text-customText-primary transition-colors font-medium"
        >
          My Tasks
        </a>
        <span className="text-customText-tertiary text-sm select-none" aria-hidden="true">
          /
        </span>
        <span className="text-customText-primary font-semibold text-sm">
          All Tasks
        </span>
      </nav>

      {/* Right section: Toolbar actions */}
      <div className="ml-auto flex items-center gap-3">
        {/* Import button */}
        <button
          type="button"
          onClick={() => console.log('Import clicked')}
          className="h-8 px-3 rounded-lg text-customText-secondary hover:text-customText-primary hover:bg-surface-2 transition-all duration-150 inline-flex items-center gap-1.5 text-xs font-semibold active:scale-[0.98] cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Import</span>
        </button>

        {/* New Task button with custom pulse onboarding animation */}
        <button
          type="button"
          onClick={() => console.log('New Task clicked')}
          className={`h-8 px-3 bg-brand-primary hover:bg-brand-hover text-white text-xs font-semibold rounded-lg shadow-sm inline-flex items-center gap-1.5 transition-all duration-150 active:scale-[0.98] cursor-pointer ${
            animateAttention 
              ? 'animate-pulse-once ring-4 ring-indigo-300/80 border-indigo-400' 
              : 'focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Task</span>
        </button>

        {/* Vertical divider */}
        <div className="w-px h-5 bg-customBorder mx-1" />

        {/* Notification bell button */}
        <button
          type="button"
          aria-label="View notifications"
          onClick={() => console.log('Notifications clicked')}
          className="w-8 h-8 rounded-lg hover:bg-surface-2 text-customText-secondary hover:text-customText-primary transition-colors flex items-center justify-center relative cursor-pointer active:scale-95"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>

        {/* Profile Avatar Trigger */}
        <button
          type="button"
          aria-label="User menu"
          onClick={() => console.log('User profile menu clicked')}
          className="w-7 h-7 rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 transition-shadow shrink-0 active:scale-95"
        >
          <Avatar initials="AJ" color="bg-brand-primary" name="Alex Johnson" size="md" showTooltip={false} />
        </button>
      </div>

    </header>
  );
}
