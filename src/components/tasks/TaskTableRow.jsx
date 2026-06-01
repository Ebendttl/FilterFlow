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
        className={`h-[142px] xl:h-[156px] border-b group transition-all duration-150 cursor-pointer relative ${
          isNew ? 'new-task-flash' : ''
        } ${isSelected ? 'bg-ff-accent/10 border-l-2 border-l-ff-accent' : 'hover:bg-white/[0.018]'}`}
        style={{ borderColor: '#17181c' }}
        onClick={() => onRowClick(task)}
        onMouseEnter={handleMouseEnterRow}
        onMouseLeave={handleMouseLeaveRow}
      >
        {/* ID */}
        <td className="relative w-[82px] pl-5 pr-3" onClick={e => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(task.id)}
            className="absolute left-2 top-1/2 w-4 h-4 -translate-y-1/2 rounded border-ff-border bg-ff-card text-ff-accent focus:ring-ff-accent focus:ring-offset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-100 cursor-pointer"
            aria-label={`Select ${task.id}`}
          />
          <span className="font-mono text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{task.id}</span>
        </td>

        {/* Task title */}
        <td className="px-4 min-w-[280px]">
          <div className="flex flex-col gap-2 min-w-0">
            <span className={`max-w-[320px] text-[15px] leading-7 font-semibold hover:text-ff-accent transition-colors xl:text-[16px] ${task.status === 'done' ? 'text-ff-muted line-through decoration-ff-muted/70' : 'text-ff-primary'}`}>
              {task.title}
            </span>
          </div>
        </td>

        {/* Project */}
        <td className="px-4 w-[148px]">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md border"
            style={{ background: projectPillBg(task.project), borderColor: projectPillBorder(task.project) }}
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${PROJECT_COLORS[task.project] || 'bg-zinc-500'}`} />
            <span className="text-xs font-bold truncate" style={{ color: projectPillText(task.project) }}>{task.project}</span>
          </div>
        </td>

        {/* Status */}
        <td className="px-4 w-[138px]">
          <StatusBadge status={task.status} />
        </td>

        {/* Priority */}
        <td className="px-4 w-[116px]">
          <PriorityBadge priority={task.priority} />
        </td>

        {/* Due date */}
        <td className="px-4 w-[112px]">
          <span className={`text-sm font-medium ${due.cls}`}>{due.text}</span>
        </td>

        {/* Assignee */}
        <td className="px-4 w-[132px]">
          {task.assignee?.name !== 'Unassigned' ? (
            <Avatar
              initials={task.assignee.initials}
              color={task.assignee.color}
              image={task.assignee.image}
              name={task.assignee.name}
              size="hero"
              showTooltip
            />
          ) : (
            <span className="text-sm italic" style={{ color: 'var(--text-muted)' }}>Unassigned</span>
          )}
        </td>

        {/* Actions */}
        <td className="px-2 w-[40px] text-right" onClick={e => e.stopPropagation()}>
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

function projectPillText(project) {
  if (project === 'Core App') return '#bca7ff';
  if (project === 'Render Deploy') return '#38bdf8';
  if (project === 'Analytics Engine') return '#34d399';
  if (project === 'Design System') return '#f472b6';
  if (project === 'API Integration') return '#fbbf24';
  return 'var(--text-secondary)';
}

function projectPillBg(project) {
  if (project === 'Core App') return 'rgba(139,92,246,0.12)';
  if (project === 'Render Deploy') return 'rgba(14,165,233,0.10)';
  if (project === 'Analytics Engine') return 'rgba(16,185,129,0.10)';
  if (project === 'Design System') return 'rgba(236,72,153,0.10)';
  if (project === 'API Integration') return 'rgba(245,158,11,0.10)';
  return 'rgba(255,255,255,0.025)';
}

function projectPillBorder(project) {
  if (project === 'Core App') return 'rgba(139,92,246,0.25)';
  if (project === 'Render Deploy') return 'rgba(14,165,233,0.25)';
  if (project === 'Analytics Engine') return 'rgba(16,185,129,0.25)';
  if (project === 'Design System') return 'rgba(236,72,153,0.25)';
  if (project === 'API Integration') return 'rgba(245,158,11,0.25)';
  return 'var(--glass-line)';
}
