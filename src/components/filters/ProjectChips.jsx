import React from 'react';
import FilterChip from '../ui/FilterChip';
import { PROJECTS } from '../../data/tasks';

const PROJECT_DOTS = {
  'Design System':  'bg-violet-500',
  'Mobile App':     'bg-blue-500',
  'Backend API':    'bg-emerald-500',
  'Marketing Site': 'bg-orange-500',
};

export default function ProjectChips({ selected, onToggle }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <span className="text-xs text-zinc-600 font-medium shrink-0 hidden sm:inline">Project:</span>
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {PROJECTS.map(proj => (
          <FilterChip
            key={proj}
            label={proj}
            dotColor={PROJECT_DOTS[proj]}
            isActive={selected.includes(proj)}
            onClick={() => onToggle(proj)}
          />
        ))}
      </div>
    </div>
  );
}
