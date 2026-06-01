import React from 'react';
import StatusDropdown from './StatusDropdown';
import PriorityDropdown from './PriorityDropdown';
import AssigneeDropdown from './AssigneeDropdown';
import DateRangePicker from './DateRangePicker';
import { Clock, Command, Search, UserRound } from 'lucide-react';

export default function FilterToolbar({
  searchValue,
  onSearchChange,
  onOpenCommandPalette,
  filters,
  toggleStatus, togglePriority, toggleAssignee, toggleProject,
  setDateRange, setSort,
}) {
  const isAssignedToMe = filters.assignees.includes('Joan Akinseinde');
  const setAssignedToMe = () => {
    if (!isAssignedToMe) toggleAssignee('Joan Akinseinde');
  };

  const setOverdue = () => {
    setDateRange('2026-01-01', '2026-05-31');
  };

  return (
    <div
      className="border-b px-3 py-3 sm:px-5 lg:px-7 shrink-0"
      style={{
        background: '#09090d',
        borderColor: '#1f1f24'
      }}
    >
      <div className="flex flex-col items-stretch gap-3 xl:flex-row xl:items-start xl:justify-between">
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          <div className="relative col-span-2 w-full sm:w-[340px] lg:w-[362px] sm:max-w-full sm:shrink">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 sm:left-[18px] sm:h-6 sm:w-6" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={searchValue}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search tasks..."
              className="h-10 w-full rounded-md border pl-10 pr-[58px] text-sm outline-none transition-colors sm:pl-[46px] sm:text-[15px]"
              style={{
                background: '#15161b',
                borderColor: '#24252b',
                color: 'var(--text-primary)'
              }}
            />
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded border px-1.5 py-1 text-[10px] font-medium leading-none"
              style={{ color: 'var(--text-muted)', background: '#202127', borderColor: '#2b2c32' }}
            >
              Ctrl <Command className="h-2.5 w-2.5" /> K
            </button>
          </div>

          <StatusDropdown selected={filters.statuses} onToggle={toggleStatus} />
          <PriorityDropdown selected={filters.priorities} onToggle={togglePriority} />
          <AssigneeDropdown selected={filters.assignees} onToggle={toggleAssignee} />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0 sm:items-center">
          <button
            type="button"
            onClick={setAssignedToMe}
            className="flex h-9 items-center justify-center gap-2 rounded-full border px-3 text-xs font-medium sm:px-3.5 sm:text-sm"
            style={{
              color: isAssignedToMe ? 'var(--accent)' : 'var(--text-secondary)',
              background: isAssignedToMe ? 'rgba(155,92,255,0.08)' : '#0c0c10',
              borderColor: isAssignedToMe ? 'rgba(155,92,255,0.28)' : '#28282f'
            }}
          >
            <UserRound className="h-4 w-4" />
            Assigned to me
          </button>
          <button
            type="button"
            onClick={setOverdue}
            className="flex h-9 items-center justify-center gap-2 rounded-full border px-3 text-xs font-medium sm:px-3.5 sm:text-sm"
            style={{ color: 'var(--text-secondary)', background: '#0c0c10', borderColor: '#28282f' }}
          >
            <Clock className="h-4 w-4" />
            Overdue
          </button>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-4 sm:mt-3">
        <div className="flex min-w-0 items-center gap-3">
          <DateRangePicker value={filters.dateRange} onChange={setDateRange} />
        </div>
        <div />
      </div>
    </div>
  );
}
