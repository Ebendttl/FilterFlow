import React from 'react';
import StatusDropdown from './StatusDropdown';
import PriorityDropdown from './PriorityDropdown';
import AssigneeDropdown from './AssigneeDropdown';
import DateRangePicker from './DateRangePicker';
import ProjectChips from './ProjectChips';
import SortDropdown from './SortDropdown';
import { SlidersHorizontal } from 'lucide-react';

export default function FilterToolbar({
  filters,
  toggleStatus, togglePriority, toggleAssignee, toggleProject,
  setDateRange, setSort,
}) {
  return (
    <div className="bg-zinc-900/40 border-b border-zinc-800 px-4 sm:px-6 py-3 flex items-center gap-2 flex-wrap shrink-0">
      <StatusDropdown    selected={filters.statuses}   onToggle={toggleStatus} />
      <PriorityDropdown  selected={filters.priorities} onToggle={togglePriority} />
      <AssigneeDropdown  selected={filters.assignees}  onToggle={toggleAssignee} />
      <DateRangePicker   value={filters.dateRange}     onChange={setDateRange} />

      <div className="w-px h-4 bg-zinc-700 mx-1 hidden sm:block shrink-0" />

      <ProjectChips selected={filters.projects} onToggle={toggleProject} />

      <div className="ml-auto flex items-center gap-2">
        <SortDropdown sortBy={filters.sortBy} sortDir={filters.sortDir} onSetSort={setSort} />
        <button
          type="button"
          onClick={() => {}} // reserved for "more filters" sheet
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-400 hover:text-zinc-300 transition-colors duration-150 cursor-pointer whitespace-nowrap"
        >
          <SlidersHorizontal className="w-3 h-3" />
          <span className="hidden sm:inline">More</span>
        </button>
      </div>
    </div>
  );
}
