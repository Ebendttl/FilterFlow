import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import TaskTableRow from './TaskTableRow';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';

const COLS = [
  { key: null,        label: 'ID',        cls: 'w-[100px] pl-7' },
  { key: 'title',     label: 'Title',     cls: 'min-w-[300px] flex-1' },
  { key: null,        label: 'Project',   cls: 'w-[160px]' },
  { key: 'status',    label: 'Status',    cls: 'w-[150px]' },
  { key: 'priority',  label: 'Priority',  cls: 'w-[126px]' },
  { key: 'dueDate',   label: 'Due Date',  cls: 'w-[150px]' },
  { key: null,        label: 'Assignee',  cls: 'w-[230px]' },
  { key: null,        label: '',          cls: 'w-[52px]'     },
];

export default function TaskTable({
  tasks,
  newTaskId,
  isLoading,
  selectedIds,
  onSelectId,
  onSelectAll,
  onRowClick,
  onEdit,
  onDuplicate,
  onDelete,
  onStatusChange,
  onUpdateTask,
  onSetSort,
  filters,
  clearAllFilters,
  onAskAI,
}) {
  if (isLoading) return <Skeleton />;
  if (!tasks.length) return (
    <EmptyState onClearFilters={clearAllFilters} onAskAI={onAskAI} />
  );

  const allSelected = tasks.length > 0 && selectedIds.length === tasks.length;

  const SortIcon = ({ col }) => {
    if (!col) return null;
    if (filters.sortBy !== col) return <ChevronUp className="w-3 h-3 text-ff-muted group-hover:text-ff-secondary transition-colors" />;
    return filters.sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-ff-accent" />
      : <ChevronDown className="w-3 h-3 text-ff-accent" />;
  };

  return (
    <div className="flex-1 overflow-auto px-0">
      <div
        className="flex h-12 items-center justify-between border-b px-7 text-sm"
        style={{ borderColor: '#18191d', color: 'var(--text-muted)' }}
      >
        <span>
          Showing {tasks.length} tasks {filters.projects?.length === 1 ? `in "${filters.projects[0]}"` : 'overall'}
        </span>
        <span className="hidden sm:inline">Sorted by Task ID (newest first)</span>
      </div>
      <table className="w-full border-collapse">
        <thead
          className="sticky top-0 z-10 backdrop-blur-md"
          style={{ background: 'rgba(7,8,13,0.88)' }}
        >
          <tr className="h-12 border-b" style={{ borderColor: '#18191d' }}>
            {COLS.map((col, i) => (
              <th
                key={i}
                onClick={col.key ? () => onSetSort(col.key) : undefined}
                className={`px-4 text-left text-[10px] uppercase tracking-[0.18em] text-ff-muted font-bold ${col.cls} ${col.key ? 'cursor-pointer hover:text-ff-secondary group select-none' : ''} transition-colors`}
              >
                <div className="flex items-center gap-1">
                  <span className={filters.sortBy === col.key ? 'text-ff-secondary' : ''}>{col.label}</span>
                  <SortIcon col={col.key} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskTableRow
              key={task.id}
              task={task}
              isNew={task.id === newTaskId}
              isSelected={selectedIds.includes(task.id)}
              onSelect={onSelectId}
              onRowClick={onRowClick}
              onEdit={onEdit}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
              onUpdateTask={onUpdateTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
