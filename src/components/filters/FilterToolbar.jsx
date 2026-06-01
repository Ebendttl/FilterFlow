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
      className="border-b px-4 py-4 sm:px-7 shrink-0"
      style={{
        background: '#09090d',
        borderColor: '#1f1f24'
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
          <div className="relative w-[362px] max-w-full shrink">
            <Search className="pointer-events-none absolute left-[18px] top-1/2 h-6 w-6 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={searchValue}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search tasks..."
              className="h-10 w-full rounded-md border pl-[46px] pr-[58px] text-[15px] outline-none transition-colors"
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

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <button
            type="button"
            onClick={setAssignedToMe}
            className="flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-medium"
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
            className="flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-medium"
            style={{ color: 'var(--text-secondary)', background: '#0c0c10', borderColor: '#28282f' }}
          >
            <Clock className="h-4 w-4" />
            Overdue
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <DateRangePicker value={filters.dateRange} onChange={setDateRange} />
        </div>
        <div />
      </div>
    </div>
  );
}
