import React, { useState, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import StatusBadge from '../ui/StatusBadge';
import PriorityBadge from '../ui/PriorityBadge';
import Avatar from '../ui/Avatar';
import TaskContextMenu from './TaskContextMenu';
import QuickActionBar from './QuickActionBar';
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
  onUpdateTask,
}) {
  const due = formatDueDate(task.dueDate);
  const rowRef = useRef(null);

  // Track hover state with debounce (600ms) for QuickActionBar appearance
  const [showQuickBar, setShowQuickBar] = useState(false);
  const [rowRect, setRowRect] = useState(null);
  const hoverTimer = useRef(null);
  const leaveTimer = useRef(null);

  const handleMouseEnterRow = useCallback(() => {
    clearTimeout(leaveTimer.current);
    hoverTimer.current = setTimeout(() => {
      if (rowRef.current) {
        setRowRect(rowRef.current.getBoundingClientRect());
        setShowQuickBar(true);
      }
    }, 600);
  }, []);

  const handleMouseLeaveRow = useCallback(() => {
    clearTimeout(hoverTimer.current);
    leaveTimer.current = setTimeout(() => {
      setShowQuickBar(false);
    }, 150);
  }, []);

  const handleMouseEnterBar = useCallback(() => {
    clearTimeout(leaveTimer.current);
  }, []);

  const handleMouseLeaveBar = useCallback(() => {
    leaveTimer.current = setTimeout(() => {
      setShowQuickBar(false);
    }, 150);
  }, []);

  return (
    <>
      <tr
        ref={rowRef}
        className={`h-12 border-b border-ff-border/50 group transition-colors duration-100 cursor-pointer relative ${
          isNew ? 'new-task-flash' : ''
        } ${isSelected ? 'bg-ff-accent/5 border-l-2 border-l-ff-accent' : 'bg-ff-base hover:bg-ff-hover/60'}`}
        onClick={() => onRowClick(task)}
        onMouseEnter={handleMouseEnterRow}
        onMouseLeave={handleMouseLeaveRow}
      >
        {/* Checkbox */}
        <td className="pl-4 pr-2 w-10" onClick={e => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(task.id)}
            className="w-4 h-4 rounded border-ff-border bg-ff-card text-ff-accent focus:ring-ff-accent focus:ring-offset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 cursor-pointer"
            aria-label={`Select ${task.id}`}
          />
        </td>

        {/* Task title */}
        <td className="px-4 min-w-[280px]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-[10px] text-ff-muted shrink-0">{task.id}</span>
            <span className="text-[13.5px] font-medium text-ff-primary hover:text-ff-accent transition-colors truncate max-w-xs">
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
            <span className="text-xs text-ff-secondary truncate">{task.project}</span>
          </div>
        </td>

        {/* Assignee */}
        <td className="px-4 w-[160px]">
          <div className="flex items-center gap-2">
            <Avatar initials={task.assignee.initials} color={task.assignee.color} name={task.assignee.name} size="xs" showTooltip />
            <span className="text-xs text-ff-secondary truncate">{task.assignee.name}</span>
          </div>
        </td>

        {/* Due date */}
        <td className="px-4 w-[120px]">
          <span className={`text-xs font-medium ${due.cls}`}>{due.text}</span>
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

      {/* QuickActionBar portal — rendered outside table DOM via ReactDOM.createPortal */}
      <AnimatePresence>
        {showQuickBar && rowRect && (
          <QuickActionBar
            taskId={task.id}
            task={task}
            rowRect={rowRect}
            onUpdateTask={onUpdateTask || onStatusChange}
            onOpenContextMenu={(e, t) => {
              // Fall back to row click if no dedicated context menu handler
              onRowClick(t);
            }}
            onMouseLeaveBar={handleMouseLeaveBar}
            onMouseEnterBar={handleMouseEnterBar}
          />
        )}
      </AnimatePresence>
    </>
  );
}
