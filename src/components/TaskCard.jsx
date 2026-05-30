import React from 'react';
import { format, isToday, isTomorrow, isBefore, startOfToday, parseISO } from 'date-fns';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import Avatar from './Avatar';

const projectColors = {
  "Design System": "bg-violet-500",
  "Mobile App": "bg-blue-500",
  "Backend API": "bg-emerald-500",
  "Marketing Site": "bg-orange-500"
};

export default function TaskCard({ task }) {
  const isSelected = false; // Checkbox support could be added, but prompt specifies for Table.

  const formatDueDate = (dateStr) => {
    const date = parseISO(dateStr);
    const today = startOfToday();
    
    if (isToday(date)) return { text: "Today", style: "text-amber-600 font-semibold" };
    if (isTomorrow(date)) return { text: "Tomorrow", style: "text-amber-500 font-medium" };
    if (isBefore(date, today)) return { text: format(date, 'MMM d'), style: "text-red-600 font-semibold" };
    return { text: format(date, 'MMM d'), style: "text-customText-secondary" };
  };

  const due = formatDueDate(task.dueDate);

  return (
    <div 
      className="bg-white border border-customBorder rounded-xl p-4 hover:shadow-md hover:border-indigo-200 transition-all duration-150 ease-out select-none flex flex-col justify-between"
      aria-label={`Task ${task.id}: ${task.title}`}
    >
      <div>
        {/* Row 1: ID and Priority */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-customText-tertiary font-medium">
            {task.id}
          </span>
          <PriorityBadge priority={task.priority} />
        </div>

        {/* Row 2: Title */}
        <h3 className="text-sm font-semibold text-customText-primary mt-2 leading-snug hover:text-indigo-600 hover:underline cursor-pointer transition-colors line-clamp-2">
          {task.title}
        </h3>

        {/* Row 3: Project dot + name */}
        <div className="flex items-center gap-1.5 mt-3">
          <span className={`w-1.5 h-1.5 rounded-full ${projectColors[task.project] || "bg-gray-400"}`} />
          <span className="text-[12px] text-customText-secondary font-medium">
            {task.project}
          </span>
        </div>
      </div>

      {/* Row 4: Status & Assignee/Date */}
      <div className="mt-4 pt-3 border-t border-customBorder flex items-center justify-between">
        <StatusBadge status={task.status} />

        <div className="flex items-center gap-1.5">
          <span className={`text-[11px] ${due.style}`}>
            {due.text}
          </span>
          <Avatar 
            initials={task.assignee.initials} 
            color={task.assignee.color} 
            name={task.assignee.name} 
            size="sm" 
            showTooltip={true}
          />
        </div>
      </div>
    </div>
  );
}
