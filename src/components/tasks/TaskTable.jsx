import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import TaskTableRow from './TaskTableRow';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';

const COLS = [
  { key: null,        label: '',          cls: 'w-10 pl-4'    },
  { key: 'title',     label: 'Task',      cls: 'min-w-[280px] flex-1' },
  { key: 'status',    label: 'Status',    cls: 'w-[130px]'    },
  { key: 'priority',  label: 'Priority',  cls: 'w-[110px]'    },
  { key: null,        label: 'Project',   cls: 'w-[150px]'    },
  { key: null,        label: 'Assignee',  cls: 'w-[160px]'    },
  { key: 'dueDate',   label: 'Due Date',  cls: 'w-[120px]'    },
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
    <div className="flex-1 overflow-auto">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-ff-elevated">
          <tr className="h-10 border-b border-ff-border">
            <th className="pl-4 pr-2 w-10 text-center">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="w-4 h-4 rounded border-ff-border bg-ff-card text-ff-accent focus:ring-ff-accent focus:ring-offset-0 cursor-pointer"
                aria-label="Select all tasks"
              />
            </th>
            {COLS.slice(1).map((col, i) => (
              <th
                key={i}
                onClick={col.key ? () => onSetSort(col.key) : undefined}
                className={`px-4 text-left text-[11px] uppercase tracking-wider text-ff-muted font-medium ${col.cls} ${col.key ? 'cursor-pointer hover:text-ff-secondary group select-none' : ''} transition-colors`}
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
