import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Check, 
  User, 
  SlidersHorizontal, 
  Flag 
} from 'lucide-react';
import SearchBar from './SearchBar';
import DateRangePicker from './DateRangePicker';
import FilterChip from './FilterChip';
import Avatar from './Avatar';
import { TEAM_MEMBERS, PROJECTS } from '../data/tasks';

const STATUS_OPTIONS = [
  { value: 'todo', label: 'Todo', color: 'bg-gray-400' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-blue-500' },
  { value: 'in_review', label: 'In Review', color: 'bg-amber-500' },
  { value: 'done', label: 'Done', color: 'bg-emerald-500' },
  { value: 'blocked', label: 'Blocked', color: 'bg-red-500' }
];

const PRIORITY_OPTIONS = [
  { value: 'urgent', label: 'Urgent', color: 'bg-red-500', icon: '🔴' },
  { value: 'high', label: 'High', color: 'bg-orange-500', icon: '🟠' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-400', icon: '🟡' },
  { value: 'low', label: 'Low', color: 'bg-sky-400', icon: '🔵' },
  { value: 'none', label: 'No Priority', color: 'bg-gray-300', icon: '⚪' }
];

export default function FilterToolbar({ 
  filters, 
  setSearch, 
  toggleStatus, 
  togglePriority, 
  toggleAssignee, 
  toggleProject, 
  setDateRange 
}) {
  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [assigneeOpen, setAssigneeOpen] = useState(false);

  const statusRef = useRef(null);
  const priorityRef = useRef(null);
  const assigneeRef = useRef(null);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setStatusOpen(false);
      }
      if (priorityRef.current && !priorityRef.current.contains(event.target)) {
        setPriorityOpen(false);
      }
      if (assigneeRef.current && !assigneeRef.current.contains(event.target)) {
        setAssigneeOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[52px] bg-white border-b border-customBorder flex items-center px-6 gap-3 overflow-x-auto select-none shrink-0 scrollbar-none">
      {/* 1. Search Bar */}
      <SearchBar value={filters.search} onChange={setSearch} />

      {/* 2. Thin divider */}
      <div className="w-px h-5 bg-customBorder shrink-0" />

      {/* 3. Status Dropdown */}
      <div className="relative shrink-0" ref={statusRef}>
        <button
          type="button"
          onClick={() => setStatusOpen(!statusOpen)}
          aria-expanded={statusOpen}
          aria-haspopup="true"
          aria-label="Filter by status"
          className={`h-8 px-3 border rounded-md flex items-center gap-1.5 text-[13px] font-medium transition-all duration-150 cursor-pointer active:scale-[0.98] ${
            filters.statuses.length > 0
              ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold'
              : 'bg-white border-customBorder text-customText-secondary hover:border-indigo-300 hover:text-indigo-700'
          }`}
        >
          {filters.statuses.length === 1 ? (
            <>
              <span className={`w-1.5 h-1.5 rounded-full ${STATUS_OPTIONS.find(o => o.value === filters.statuses[0])?.color}`} />
              <span>{STATUS_OPTIONS.find(o => o.value === filters.statuses[0])?.label}</span>
            </>
          ) : filters.statuses.length > 1 ? (
            <span>Status ({filters.statuses.length})</span>
          ) : (
            <span>Status</span>
          )}
          <ChevronDown className="w-3 h-3 text-customText-tertiary" />
        </button>

        {statusOpen && (
          <div className="absolute left-0 mt-1.5 w-48 bg-white rounded-xl border border-customBorder shadow-lg z-50 p-1 animate-fade-in origin-top-left">
            {STATUS_OPTIONS.map(opt => {
              const isSelected = filters.statuses.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  onClick={() => toggleStatus(opt.value)}
                  className={`flex items-center justify-between px-3 py-2 text-[13px] rounded-md cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-indigo-50/70 text-indigo-700 font-medium' 
                      : 'text-customText-primary hover:bg-surface-2'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${opt.color}`} />
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Priority Dropdown */}
      <div className="relative shrink-0" ref={priorityRef}>
        <button
          type="button"
          onClick={() => setPriorityOpen(!priorityOpen)}
          aria-expanded={priorityOpen}
          aria-haspopup="true"
          aria-label="Filter by priority"
          className={`h-8 px-3 border rounded-md flex items-center gap-1.5 text-[13px] font-medium transition-all duration-150 cursor-pointer active:scale-[0.98] ${
            filters.priorities.length > 0
              ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold'
              : 'bg-white border-customBorder text-customText-secondary hover:border-indigo-300 hover:text-indigo-700'
          }`}
        >
          {filters.priorities.length === 1 ? (
            <>
              <span>{PRIORITY_OPTIONS.find(o => o.value === filters.priorities[0])?.icon}</span>
              <span>{PRIORITY_OPTIONS.find(o => o.value === filters.priorities[0])?.label}</span>
            </>
          ) : filters.priorities.length > 1 ? (
            <span>Priority ({filters.priorities.length})</span>
          ) : (
            <span>Priority</span>
          )}
          <ChevronDown className="w-3 h-3 text-customText-tertiary" />
        </button>

        {priorityOpen && (
          <div className="absolute left-0 mt-1.5 w-48 bg-white rounded-xl border border-customBorder shadow-lg z-50 p-1 animate-fade-in origin-top-left">
            {PRIORITY_OPTIONS.map(opt => {
              const isSelected = filters.priorities.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  onClick={() => togglePriority(opt.value)}
                  className={`flex items-center justify-between px-3 py-2 text-[13px] rounded-md cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-indigo-50/70 text-indigo-700 font-medium' 
                      : 'text-customText-primary hover:bg-surface-2'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm leading-none">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Assignee Dropdown */}
      <div className="relative shrink-0" ref={assigneeRef}>
        <button
          type="button"
          onClick={() => setAssigneeOpen(!assigneeOpen)}
          aria-expanded={assigneeOpen}
          aria-haspopup="true"
          aria-label="Filter by assignee"
          className={`h-8 px-3 border rounded-md flex items-center gap-1.5 text-[13px] font-medium transition-all duration-150 cursor-pointer active:scale-[0.98] ${
            filters.assignees.length > 0
              ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold'
              : 'bg-white border-customBorder text-customText-secondary hover:border-indigo-300 hover:text-indigo-700'
          }`}
        >
          <User className={`w-3.5 h-3.5 ${filters.assignees.length > 0 ? 'text-indigo-600' : 'text-customText-tertiary'}`} />
          {filters.assignees.length === 1 ? (
            <span>{filters.assignees[0]}</span>
          ) : filters.assignees.length > 1 ? (
            <span>Assignees ({filters.assignees.length})</span>
          ) : (
            <span>Assignee</span>
          )}
          <ChevronDown className="w-3 h-3 text-customText-tertiary" />
        </button>

        {assigneeOpen && (
          <div className="absolute left-0 mt-1.5 w-60 bg-white rounded-xl border border-customBorder shadow-lg z-50 p-1 animate-fade-in origin-top-left">
            {TEAM_MEMBERS.map(member => {
              const isSelected = filters.assignees.includes(member.name);
              return (
                <div
                  key={member.name}
                  onClick={() => toggleAssignee(member.name)}
                  className={`flex items-center justify-between px-3 py-2 text-[13px] rounded-md cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-indigo-50/70 text-indigo-700 font-medium' 
                      : 'text-customText-primary hover:bg-surface-2'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar initials={member.initials} color={member.color} name={member.name} size="sm" />
                    <div className="flex flex-col min-w-0">
                      <span className="truncate leading-tight">{member.name}</span>
                      <span className="text-[10px] text-customText-tertiary truncate">{member.email}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 ml-2" />}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Date Range Picker */}
      <DateRangePicker value={filters.dateRange} onChange={setDateRange} />

      {/* 7. Project Toggle Chips */}
      <div className="w-px h-5 bg-customBorder shrink-0 mx-1" />
      <span className="text-[12px] text-customText-tertiary shrink-0 font-medium select-none">
        Project:
      </span>
      <div className="flex items-center gap-1.5 shrink-0">
        {PROJECTS.map(proj => {
          const isSelected = filters.projects.includes(proj.name);
          return (
            <FilterChip
              key={proj.name}
              label={proj.name}
              dotColor={proj.dotColor}
              isActive={isSelected}
              onClick={() => toggleProject(proj.name)}
            />
          );
        })}
      </div>

      {/* 8. More filters button on the far right */}
      <button
        type="button"
        onClick={() => console.log('More filters clicked')}
        className="ml-auto h-8 px-2.5 rounded-md flex items-center gap-1 text-[13px] text-customText-secondary hover:text-customText-primary hover:bg-surface-2 transition-colors shrink-0 cursor-pointer active:scale-[0.98]"
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-customText-secondary" />
        <span>More filters</span>
      </button>
    </div>
  );
}
