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
    <div className="flex-1 overflow-y-auto px-3 py-3">
      {tasks.map(task => {
        const due = formatDueDate(task.dueDate);
        return (
          <div
            key={task.id}
            onClick={() => onRowClick(task)}
            className="mb-3 rounded-xl border p-3.5 transition-colors cursor-pointer"
            style={{ background: '#0c0c11', borderColor: '#202127' }}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-mono text-[10px] text-zinc-600">{task.id}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${PROJECT_COLORS[task.project]}`} />
                  <span className="truncate text-xs text-zinc-500">{task.project}</span>
                </div>
                <p className="text-[15px] font-semibold leading-6 text-zinc-100 line-clamp-2">{task.title}</p>
              </div>
              {task.assignee?.name !== 'Unassigned' && (
                <Avatar
                  initials={task.assignee.initials}
                  color={task.assignee.color}
                  image={task.assignee.image}
                  size="lg"
                />
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={task.status} />
              <PriorityBadge priority={task.priority} />
              <span className={`text-xs ${due.cls}`}>{due.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
