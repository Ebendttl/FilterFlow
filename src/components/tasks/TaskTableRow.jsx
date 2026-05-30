import React, { useState } from 'react';
import StatusBadge from '../ui/StatusBadge';
import PriorityBadge from '../ui/PriorityBadge';
import Avatar from '../ui/Avatar';
import TaskContextMenu from './TaskContextMenu';
import { formatDueDate, PROJECT_COLORS } from './taskUtils';

export default function TaskTableRow({
  task,
  isNew,
  isSelected,
  onSelect,
  onRowClick,
  onEdit,
  onDuplicate,
  onDelete,
  onStatusChange,
}) {
  const due = formatDueDate(task.dueDate);

  return (
    <tr
      className={`h-12 border-b border-zinc-800/50 group transition-colors duration-100 cursor-pointer ${
        isNew ? 'new-task-flash' : ''
      } ${isSelected ? 'bg-violet-500/5 border-l-2 border-l-violet-500' : 'bg-zinc-950 hover:bg-zinc-900'}`}
      onClick={() => onRowClick(task)}
    >
      {/* Checkbox */}
      <td className="pl-4 pr-2 w-10" onClick={e => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(task.id)}
          className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-violet-600 focus:ring-violet-500 focus:ring-offset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 cursor-pointer"
          aria-label={`Select ${task.id}`}
        />
      </td>

      {/* Task title */}
      <td className="px-4 min-w-[280px]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[10px] text-zinc-700 shrink-0">{task.id}</span>
          <span className="text-[13.5px] font-medium text-zinc-100 hover:text-violet-400 transition-colors truncate max-w-xs">
            {task.title}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 w-[130px]">
        <StatusBadge status={task.status} />
      </td>

      {/* Priority */}
      <td className="px-4 w-[110px]">
        <PriorityBadge priority={task.priority} />
      </td>

      {/* Project */}
      <td className="px-4 w-[150px]">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${PROJECT_COLORS[task.project] || 'bg-zinc-500'}`} />
          <span className="text-xs text-zinc-400 truncate">{task.project}</span>
        </div>
      </td>

      {/* Assignee */}
      <td className="px-4 w-[160px]">
        <div className="flex items-center gap-2">
          <Avatar initials={task.assignee.initials} color={task.assignee.color} name={task.assignee.name} size="xs" showTooltip />
          <span className="text-xs text-zinc-400 truncate">{task.assignee.name}</span>
        </div>
      </td>

      {/* Due date */}
      <td className="px-4 w-[120px]">
        <span className={`text-xs ${due.cls}`}>{due.text}</span>
      </td>

      {/* Actions */}
      <td className="px-3 w-[52px] text-right" onClick={e => e.stopPropagation()}>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          <TaskContextMenu
            task={task}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        </div>
      </td>
    </tr>
  );
}
