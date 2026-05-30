import React from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';

const statusLabels = {
  todo: "Todo",
  in_progress: "In Progress",
  in_review: "In Review",
  done: "Done",
  blocked: "Blocked"
};

const priorityLabels = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
  none: "No Priority"
};

export default function ActiveFilterBar({ 
  filters, 
  activeFilterCount, 
  clearFilter, 
  clearAllFilters 
}) {
  const hasFilters = activeFilterCount > 0;

  // Build the list of active pills
  const pills = [];

  if (filters.search.trim() !== "") {
    pills.push({
      id: 'search',
      label: 'Search',
      value: `"${filters.search}"`,
      onClear: () => clearFilter('search')
    });
  }

  if (filters.statuses.length > 0) {
    pills.push({
      id: 'statuses',
      label: 'Status',
      value: filters.statuses.map(s => statusLabels[s] || s).join(', '),
      onClear: () => clearFilter('statuses')
    });
  }

  if (filters.priorities.length > 0) {
    pills.push({
      id: 'priorities',
      label: 'Priority',
      value: filters.priorities.map(p => priorityLabels[p] || p).join(', '),
      onClear: () => clearFilter('priorities')
    });
  }

  if (filters.assignees.length > 0) {
    pills.push({
      id: 'assignees',
      label: 'Assignee',
      value: filters.assignees.join(', '),
      onClear: () => clearFilter('assignees')
    });
  }

  if (filters.projects.length > 0) {
    pills.push({
      id: 'projects',
      label: 'Project',
      value: filters.projects.join(', '),
      onClear: () => clearFilter('projects')
    });
  }

  if (filters.dateRange.start) {
    const startFmt = format(new Date(filters.dateRange.start), 'MMM d');
    let dateValue = startFmt;
    if (filters.dateRange.end) {
      const endFmt = format(new Date(filters.dateRange.end), 'MMM d');
      dateValue = `${startFmt}–${endFmt}`;
    }
    pills.push({
      id: 'dateRange',
      label: 'Due',
      value: dateValue,
      onClear: () => clearFilter('dateRange')
    });
  }

  return (
    <div 
      className={`bg-indigo-50/60 border-b border-indigo-100 flex items-center px-6 gap-2 overflow-hidden premium-transition shrink-0 ${
        hasFilters ? 'h-11 opacity-100 border-b-indigo-100' : 'h-0 opacity-0 border-b-transparent pointer-events-none'
      }`}
    >
      <span className="text-[12px] font-semibold text-indigo-500 mr-1 select-none">
        Filters:
      </span>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1 py-1">
        {pills.map(pill => (
          <div
            key={pill.id}
            className="inline-flex items-center gap-1.5 bg-white border border-indigo-200 rounded-full pl-3 pr-1 py-0.5 text-[12px] font-medium text-indigo-700 select-none animate-fade-in hover:border-indigo-400 transition-colors"
          >
            <span className="text-indigo-400">{pill.label}:</span>
            <span className="text-indigo-900 truncate max-w-xs">{pill.value}</span>
            <button
              type="button"
              onClick={pill.onClear}
              className="w-4 h-4 rounded-full flex items-center justify-center text-indigo-400 hover:bg-indigo-100 hover:text-indigo-700 transition-all cursor-pointer active:scale-90"
              aria-label={`Clear ${pill.label} filter`}
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={clearAllFilters}
        className="text-indigo-600 hover:text-indigo-800 text-[12px] font-semibold hover:underline cursor-pointer active:scale-95 transition-all select-none shrink-0"
      >
        Clear all
      </button>
    </div>
  );
}
