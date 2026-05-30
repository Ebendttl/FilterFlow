import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  MoreHorizontal, 
  SearchX, 
  Check, 
  Trash2, 
  Edit3, 
  UserPlus, 
  Copy, 
  RefreshCw 
} from 'lucide-react';
import { 
  format, 
  isToday, 
  isYesterday, 
  isTomorrow, 
  isBefore, 
  startOfToday, 
  parseISO,
  differenceInDays
} from 'date-fns';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import Avatar from './Avatar';

const projectColors = {
  "Design System": "bg-violet-500",
  "Mobile App": "bg-blue-500",
  "Backend API": "bg-emerald-500",
  "Marketing Site": "bg-orange-500"
};

export default function TaskTable({ 
  filteredTasks, 
  clearAllFilters 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [activeMenuTaskId, setActiveMenuTaskId] = useState(null);
  
  const menuRef = useRef(null);

  // Fade out loading skeleton after 600ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Close context menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuTaskId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sorting logic
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedTasks = useMemo(() => {
    if (!sortColumn) return filteredTasks;
    const directionMultiplier = sortDirection === 'asc' ? 1 : -1;
    return [...filteredTasks].sort((a, b) => {
      let valA, valB;
      if (sortColumn === 'title') {
        valA = a.title.toLowerCase();
        valB = b.title.toLowerCase();
      } else if (sortColumn === 'status') {
        const order = { todo: 1, in_progress: 2, in_review: 3, done: 4, blocked: 5 };
        valA = order[a.status] || 0;
        valB = order[b.status] || 0;
      } else if (sortColumn === 'priority') {
        const order = { none: 1, low: 2, medium: 3, high: 4, urgent: 5 };
        valA = order[a.priority] || 0;
        valB = order[b.priority] || 0;
      } else if (sortColumn === 'dueDate') {
        valA = new Date(a.dueDate).getTime();
        valB = new Date(b.dueDate).getTime();
      }

      if (valA < valB) return -1 * directionMultiplier;
      if (valA > valB) return 1 * directionMultiplier;
      return 0;
    });
  }, [filteredTasks, sortColumn, sortDirection]);

  // Selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTaskIds(sortedTasks.map(t => t.id));
    } else {
      setSelectedTaskIds([]);
    }
  };

  const handleSelectRow = (taskId) => {
    setSelectedTaskIds(prev => 
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const isAllSelected = sortedTasks.length > 0 && selectedTaskIds.length === sortedTasks.length;

  const getDaysAgoText = (createdAtStr) => {
    const createdDate = parseISO(createdAtStr);
    const anchorDate = new Date('2026-05-30');
    const diff = differenceInDays(anchorDate, createdDate);
    if (diff === 0) return "today";
    if (diff === 1) return "yesterday";
    return `${diff} days ago`;
  };

  const formatDueDate = (dateStr) => {
    const date = parseISO(dateStr);
    const today = startOfToday();
    
    if (isToday(date)) return { text: "Today", style: "text-amber-600 font-medium" };
    if (isYesterday(date)) return { text: "Yesterday", style: "text-red-600 font-medium" };
    if (isTomorrow(date)) return { text: "Tomorrow", style: "text-amber-500 font-medium" };
    
    const isOverdue = isBefore(date, today);
    return { 
      text: format(date, 'MMM d'), 
      style: isOverdue ? "text-red-600 font-medium" : "text-customText-secondary" 
    };
  };

  // Render Skeleton rows
  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto bg-white select-none">
        <table className="w-full border-collapse">
          <thead>
            <tr className="h-9 border-b border-customBorder bg-surface-1 text-[11px] text-customText-tertiary uppercase tracking-wide">
              <th className="w-10 px-4"></th>
              <th className="text-left font-medium px-4">Task</th>
              <th className="text-left font-medium px-4 w-[120px]">Status</th>
              <th className="text-left font-medium px-4 w-[100px]">Priority</th>
              <th className="text-left font-medium px-4 w-[140px]">Project</th>
              <th className="text-left font-medium px-4 w-[140px]">Assignee</th>
              <th className="text-left font-medium px-4 w-[120px]">Due Date</th>
              <th className="w-12 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 12 }).map((_, idx) => (
              <tr key={idx} className="h-12 border-b border-customBorder">
                <td className="px-4">
                  <div className="w-4 h-4 bg-gray-100 rounded animate-pulse" />
                </td>
                <td className="px-4">
                  <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse" />
                </td>
                <td className="px-4">
                  <div className="h-5 bg-gray-100 rounded-full w-20 animate-pulse" />
                </td>
                <td className="px-4">
                  <div className="h-4 bg-gray-100 rounded w-16 animate-pulse" />
                </td>
                <td className="px-4">
                  <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
                </td>
                <td className="px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 animate-pulse" />
                    <div className="h-3.5 bg-gray-100 rounded w-20 animate-pulse" />
                  </div>
                </td>
                <td className="px-4">
                  <div className="h-4 bg-gray-100 rounded w-16 animate-pulse" />
                </td>
                <td className="px-4">
                  <div className="w-6 h-6 rounded bg-gray-100 animate-pulse" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Render Empty State
  if (sortedTasks.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-8 text-center select-none animate-fade-in">
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-customBorder shadow-sm mb-4">
          <SearchX className="w-6 h-6 text-customText-tertiary" />
        </div>
        <h3 className="text-base font-semibold text-customText-primary">
          No tasks match your filters
        </h3>
        <p className="text-sm text-customText-secondary mt-1">
          Try adjusting or clearing your filters to find what you're looking for.
        </p>
        <button
          type="button"
          onClick={clearAllFilters}
          className="mt-5 h-9 px-4 bg-brand-primary hover:bg-brand-hover text-white font-medium rounded-lg text-xs transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 active:scale-[0.98] cursor-pointer"
        >
          Clear filters
        </button>
      </div>
    );
  }

  const RenderSortIcon = ({ column }) => {
    if (sortColumn !== column) {
      return <ChevronUp className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-customText-tertiary transition-opacity" />;
    }
    return (
      <ChevronUp 
        className={`w-3.5 h-3.5 text-indigo-600 transition-transform duration-200 ${
          sortDirection === 'desc' ? 'rotate-180' : ''
        }`} 
      />
    );
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white select-none">
      <table className="w-full border-collapse">
        <thead>
          <tr className="h-9 border-b border-customBorder bg-surface-1 text-[11px] text-customText-tertiary uppercase tracking-wider font-semibold sticky top-0 z-20 shadow-[0_1px_0_0_rgba(229,231,235,1)]">
            <th className="w-10 px-4 text-center">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="rounded border-customBorder text-indigo-600 focus:ring-indigo-500 cursor-pointer h-4 w-4"
                aria-label="Select all tasks"
              />
            </th>
            <th 
              onClick={() => handleSort('title')}
              className="text-left font-medium px-4 cursor-pointer hover:bg-surface-2 group transition-colors"
            >
              <div className="flex items-center gap-1">
                <span className={sortColumn === 'title' ? 'text-customText-primary font-bold' : ''}>Task</span>
                <RenderSortIcon column="title" />
              </div>
            </th>
            <th 
              onClick={() => handleSort('status')}
              className="text-left font-medium px-4 w-[120px] cursor-pointer hover:bg-surface-2 group transition-colors"
            >
              <div className="flex items-center gap-1">
                <span className={sortColumn === 'status' ? 'text-customText-primary font-bold' : ''}>Status</span>
                <RenderSortIcon column="status" />
              </div>
            </th>
            <th 
              onClick={() => handleSort('priority')}
              className="text-left font-medium px-4 w-[100px] cursor-pointer hover:bg-surface-2 group transition-colors"
            >
              <div className="flex items-center gap-1">
                <span className={sortColumn === 'priority' ? 'text-customText-primary font-bold' : ''}>Priority</span>
                <RenderSortIcon column="priority" />
              </div>
            </th>
            <th className="text-left font-medium px-4 w-[140px]">Project</th>
            <th className="text-left font-medium px-4 w-[140px]">Assignee</th>
            <th 
              onClick={() => handleSort('dueDate')}
              className="text-left font-medium px-4 w-[120px] cursor-pointer hover:bg-surface-2 group transition-colors"
            >
              <div className="flex items-center gap-1">
                <span className={sortColumn === 'dueDate' ? 'text-customText-primary font-bold' : ''}>Due Date</span>
                <RenderSortIcon column="dueDate" />
              </div>
            </th>
            <th className="w-12 px-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-customBorder">
          {sortedTasks.map(task => {
            const isRowSelected = selectedTaskIds.includes(task.id);
            const due = formatDueDate(task.dueDate);
            const isMenuOpen = activeMenuTaskId === task.id;

            return (
              <tr 
                key={task.id} 
                className={`h-12 border-b border-customBorder hover:bg-surface-1/80 group transition-colors duration-150 ${
                  isRowSelected ? 'bg-indigo-50/50 hover:bg-indigo-50/70' : ''
                }`}
              >
                <td className="px-4 text-center">
                  <input
                    type="checkbox"
                    checked={isRowSelected}
                    onChange={() => handleSelectRow(task.id)}
                    className={`rounded border-customBorder text-indigo-600 focus:ring-indigo-500 cursor-pointer h-4 w-4 transition-opacity ${
                      isRowSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus:opacity-100'
                    }`}
                    aria-label={`Select task ${task.id}`}
                  />
                </td>
                
                {/* Task Title Cell */}
                <td className="px-4 font-medium text-customText-primary">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] font-mono text-customText-tertiary select-all shrink-0">
                      {task.id}
                    </span>
                    <div className="relative group/title inline-flex min-w-0">
                      <span className="truncate hover:text-indigo-600 hover:underline cursor-pointer transition-colors max-w-sm">
                        {task.title}
                      </span>
                      {/* Tooltip for Creation Date */}
                      <div className="absolute bottom-full left-0 mb-2 px-2.5 py-1.5 bg-gray-900 text-[11px] font-medium text-white rounded-lg shadow-lg opacity-0 invisible group-hover/title:opacity-100 group-hover/title:visible transition-all duration-150 ease-out whitespace-nowrap z-50 pointer-events-none">
                        <div className="flex flex-col items-start">
                          <span>Created {getDaysAgoText(task.createdAt)}</span>
                          <div className="w-1.5 h-1.5 bg-gray-900 rotate-45 mt-0.5 ml-2 -mb-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4">
                  <StatusBadge status={task.status} />
                </td>

                <td className="px-4">
                  <PriorityBadge priority={task.priority} />
                </td>

                <td className="px-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${projectColors[task.project]}`} />
                    <span className="text-[13px] text-customText-secondary truncate max-w-[120px]">
                      {task.project}
                    </span>
                  </div>
                </td>

                <td className="px-4">
                  <div className="flex items-center">
                    <Avatar 
                      initials={task.assignee.initials} 
                      color={task.assignee.color} 
                      name={task.assignee.name} 
                      size="sm" 
                      showTooltip={true}
                    />
                    <span className="text-[13px] text-customText-secondary ml-2 truncate max-w-[100px]">
                      {task.assignee.name}
                    </span>
                  </div>
                </td>

                <td className="px-4">
                  <span className={`text-[13px] ${due.style}`}>
                    {due.text}
                  </span>
                </td>

                {/* Action cell */}
                <td className="px-4 text-right relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuTaskId(isMenuOpen ? null : task.id);
                    }}
                    aria-label="Task actions"
                    className={`w-7 h-7 inline-flex items-center justify-center rounded-md hover:bg-surface-2 text-customText-secondary hover:text-customText-primary transition-opacity transition-colors duration-100 ${
                      isMenuOpen ? 'opacity-100 bg-surface-2' : 'opacity-0 group-hover:opacity-100 focus:opacity-100'
                    }`}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {/* Context Menu Dropdown */}
                  {isMenuOpen && (
                    <div 
                      ref={menuRef}
                      className="absolute right-4 mt-1 w-40 bg-white border border-customBorder rounded-xl shadow-lg z-50 p-1 animate-fade-in origin-top-right text-left"
                    >
                      <button
                        type="button"
                        onClick={() => { console.log(`Edit task ${task.id}`); setActiveMenuTaskId(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-customText-primary hover:bg-surface-2 rounded-md transition-colors font-medium text-left"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-customText-secondary" />
                        <span>Edit Task</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => { console.log(`Assign task ${task.id}`); setActiveMenuTaskId(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-customText-primary hover:bg-surface-2 rounded-md transition-colors font-medium text-left"
                      >
                        <UserPlus className="w-3.5 h-3.5 text-customText-secondary" />
                        <span>Reassign</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => { console.log(`Change status task ${task.id}`); setActiveMenuTaskId(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-customText-primary hover:bg-surface-2 rounded-md transition-colors font-medium text-left"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-customText-secondary" />
                        <span>Change Status</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => { console.log(`Duplicate task ${task.id}`); setActiveMenuTaskId(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-customText-primary hover:bg-surface-2 rounded-md transition-colors font-medium text-left"
                      >
                        <Copy className="w-3.5 h-3.5 text-customText-secondary" />
                        <span>Duplicate</span>
                      </button>
                      <div className="h-px bg-customBorder my-1" />
                      <button
                        type="button"
                        onClick={() => { console.log(`Delete task ${task.id}`); setActiveMenuTaskId(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium text-left"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
