import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import PriorityBadge from '../ui/PriorityBadge';
import Avatar from '../ui/Avatar';
import { formatDueDate } from '../tasks/taskUtils';

const SPRINTS = [
  { id: 'Sprint 4', label: 'Sprint 4', active: true,  dates: 'May 18 – Jun 01' },
  { id: 'Sprint 3', label: 'Sprint 3', active: false, dates: 'May 04 – May 18' },
  { id: 'Sprint 2', label: 'Sprint 2', active: false, dates: 'Apr 20 – May 04' },
];

export default function SprintsView({ tasks, onTaskClick }) {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface-0 overflow-y-auto p-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-4 shrink-0">
        <Zap className="w-5 h-5 text-zinc-500" />
        <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">
          Sprints Planning Board
        </h2>
      </div>

      {/* Sprints listing columns or card rows */}
      <div className="space-y-6">
        {SPRINTS.map(spr => {
          // Tasks in this sprint (fallback to Sprint 4 if not specified)
          const sprTasks = tasks.filter(t => {
            const tSprint = t.sprint || 'Sprint 4';
            return tSprint === spr.id;
          });
          const doneTasks = sprTasks.filter(t => t.status === 'done');
          const percentVal = sprTasks.length 
            ? Math.round((doneTasks.length / sprTasks.length) * 100) 
            : 0;

          return (
            <div
              key={spr.id}
              className={`border rounded-2xl p-5 ${
                spr.active 
                  ? 'bg-violet-500/5 border-violet-500/30' 
                  : 'bg-zinc-900 border-zinc-800/80 shadow-md'
              }`}
            >
              {/* Sprint info header */}
              <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wide">
                      {spr.label}
                    </h3>
                    {spr.active ? (
                      <span className="text-[10px] font-bold text-violet-400 bg-violet-600/10 border border-violet-500/20 px-2 py-0.5 rounded-full select-none">
                        Active Sprint
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 border border-zinc-800/80 px-2 py-0.5 rounded-full flex items-center gap-1 select-none">
                        <ShieldCheck className="w-3 h-3 text-zinc-500" />
                        Completed
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-zinc-500 font-medium block mt-1">
                    {spr.dates}
                  </span>
                </div>

                {/* Progress mini block */}
                <div className="w-48 space-y-1">
                  <div className="flex justify-between text-[10px] text-zinc-500 font-semibold select-none">
                    <span>Sprint progress</span>
                    <span className="font-mono text-zinc-300 font-bold">{percentVal}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-950 border border-zinc-800/40 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-600 rounded-full" style={{ width: `${percentVal}%` }} />
                  </div>
                </div>
              </div>

              {/* Tasks within Sprint */}
              <div className="space-y-2 mt-4 pt-3 border-t border-zinc-800/60 max-h-80 overflow-y-auto pr-1">
                {sprTasks.length === 0 ? (
                  <div className="py-6 text-center text-xs text-zinc-600 font-medium">
                    No tasks planned in this sprint
                  </div>
                ) : (
                  sprTasks.map(task => {
                    const due = formatDueDate(task.dueDate);
                    return (
                      <div
                        key={task.id}
                        onClick={() => onTaskClick(task)}
                        className="bg-zinc-950 border border-zinc-850 hover:border-zinc-700/80 rounded-xl px-4 py-2.5 cursor-pointer hover:shadow transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className="font-mono text-[9px] text-zinc-700 font-bold shrink-0">{task.id}</span>
                          <span className="text-xs font-medium text-zinc-200 truncate hover:text-violet-400 transition-colors">
                            {task.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 select-none">
                          <StatusBadge status={task.status} />
                          <PriorityBadge priority={task.priority} />
                          <Avatar initials={task.assignee.initials} color={task.assignee.color} size="xs" />
                          <span className={`text-[10px] font-semibold ${due.cls} min-w-[50px] text-right`}>
                            {due.text}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
