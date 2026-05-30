import React from 'react';
import StatusBadge from '../ui/StatusBadge';
import PriorityBadge from '../ui/PriorityBadge';
import Avatar from '../ui/Avatar';
import { formatDueDate, PROJECT_COLORS } from './taskUtils';

export default function TaskCard({ task, onClick }) {
  const due = formatDueDate(task.dueDate);

  return (
    <div
      onClick={onClick}
      className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/45 rounded-xl p-4 flex flex-col justify-between h-40 cursor-pointer transition-all duration-200 group active:scale-[0.98]"
    >
      <div>
        {/* Row 1: ID, Status, Priority */}
        <div className="flex items-center justify-between gap-2 mb-2 select-none">
          <span className="font-mono text-[10px] text-zinc-600 font-semibold tracking-wider">
            {task.id}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </div>
        </div>

        {/* Row 2: Title */}
        <h4 className="text-[13.5px] font-medium text-zinc-100 line-clamp-2 group-hover:text-violet-400 transition-colors leading-snug">
          {task.title}
        </h4>
      </div>

      {/* Row 3: Project, Assignee, Due Date */}
      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between select-none">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar initials={task.assignee.initials} color={task.assignee.color} name={task.assignee.name} size="xs" showTooltip />
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${PROJECT_COLORS[task.project] || 'bg-zinc-500'}`} />
          <span className="text-[11px] text-zinc-500 truncate max-w-[80px]">
            {task.project}
          </span>
        </div>

        <span className={`text-[11px] font-medium shrink-0 ${due.cls}`}>
          {due.text}
        </span>
      </div>
    </div>
  );
}
