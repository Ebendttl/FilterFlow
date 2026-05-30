import React from 'react';
import StatusBadge from '../ui/StatusBadge';
import PriorityBadge from '../ui/PriorityBadge';
import Avatar from '../ui/Avatar';
import { formatDueDate, PROJECT_COLORS } from './taskUtils';

export default function TaskMobileList({ tasks, onRowClick, clearAllFilters, onAskAI }) {
  if (!tasks.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <p className="text-zinc-400 font-medium mb-1">No tasks found</p>
        <p className="text-sm text-zinc-600 mb-4">Try adjusting your filters</p>
        <button onClick={clearAllFilters} className="px-4 py-2 bg-zinc-800 text-zinc-300 text-sm rounded-lg hover:bg-zinc-700 cursor-pointer transition-colors">
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {tasks.map(task => {
        const due = formatDueDate(task.dueDate);
        return (
          <div
            key={task.id}
            onClick={() => onRowClick(task)}
            className="px-4 py-3 border-b border-zinc-800 hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[10px] text-zinc-600">{task.id}</span>
              <StatusBadge status={task.status} />
              <PriorityBadge priority={task.priority} />
            </div>
            <p className="text-sm font-medium text-zinc-100 line-clamp-2 mb-2">{task.title}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar initials={task.assignee.initials} color={task.assignee.color} size="xs" />
                <span className="text-xs text-zinc-500">{task.assignee.name}</span>
              </div>
              <span className={`text-xs ${due.cls}`}>{due.text}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`w-1.5 h-1.5 rounded-full ${PROJECT_COLORS[task.project]}`} />
              <span className="text-xs text-zinc-500">{task.project}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
