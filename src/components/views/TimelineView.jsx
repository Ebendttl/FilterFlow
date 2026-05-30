import React from 'react';
import { format, differenceInDays, parseISO, startOfToday, addDays, subDays } from 'date-fns';
import { GitBranch, Clock } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { formatDueDate, PROJECT_COLORS } from '../tasks/taskUtils';

export default function TimelineView({ tasks, onTaskClick }) {
  const today = startOfToday();
  // We'll show a 14-day window: today - 2 days to today + 11 days
  const startDate = subDays(today, 2);
  const timeDays = Array.from({ length: 14 }).map((_, i) => addDays(startDate, i));

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface-0 overflow-hidden select-none">
      {/* Header controls info */}
      <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between shrink-0 bg-zinc-950/20">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-zinc-500" />
          <span className="text-sm font-semibold text-zinc-200">
            Sprint Timeline Gantt
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>Showing 14-day execution window</span>
        </div>
      </div>

      {/* Grid wrapper */}
      <div className="flex-1 overflow-auto flex flex-col min-h-0">
        
        {/* Time scale columns header row */}
        <div className="flex shrink-0 border-b border-zinc-800 bg-zinc-950/40">
          <div className="w-64 border-r border-zinc-800 shrink-0 px-4 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            Task Title
          </div>
          <div className="flex-1 grid grid-cols-14 min-w-[700px]">
            {timeDays.map((d, idx) => {
              const isTodayDate = idx === 2;
              return (
                <div
                  key={idx}
                  className={`text-center py-2 border-r border-zinc-800/40 text-[9px] font-bold font-mono ${
                    isTodayDate ? 'bg-violet-600/10 text-violet-400' : 'text-zinc-650'
                  }`}
                >
                  <div>{format(d, 'ccc')}</div>
                  <div className="text-[11px] mt-0.5">{format(d, 'd')}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-y-auto min-w-[964px] divide-y divide-zinc-900">
          {tasks.map(task => {
            const dueParsed = task.dueDate ? parseISO(task.dueDate) : today;
            // Let's assume start date is 2 days before due date for Gantt mapping if no start exists
            const startParsed = subDays(dueParsed, 2);
            
            // Map offset from schedule start
            const offsetDays = differenceInDays(startParsed, startDate);
            const durationDays = Math.max(1, differenceInDays(dueParsed, startParsed) + 1);

            // Columns grid position mapping: 14 columns
            // If offset is outside, cap it or hide it
            const startCol = Math.max(1, offsetDays + 1);
            const colSpan = Math.min(14 - startCol + 1, durationDays);

            const isVisible = offsetDays >= -2 && offsetDays <= 12;

            return (
              <div
                key={task.id}
                onClick={() => onTaskClick(task)}
                className="flex h-12 hover:bg-zinc-900/40 transition-colors cursor-pointer items-center"
              >
                {/* Left Title block */}
                <div className="w-64 border-r border-zinc-800 shrink-0 px-4 flex items-center gap-2 min-w-0">
                  <span className="font-mono text-[9px] text-zinc-600 font-bold shrink-0">{task.id}</span>
                  <span className="text-xs font-medium text-zinc-300 truncate hover:text-violet-400 transition-colors">
                    {task.title}
                  </span>
                </div>

                {/* Right Timeline grid block */}
                <div className="flex-1 h-full grid grid-cols-14 relative items-center">
                  
                  {/* Grid background vertical lines */}
                  {Array.from({ length: 14 }).map((_, gi) => (
                    <div key={gi} className="absolute inset-y-0 border-r border-zinc-900/30 pointer-events-none" style={{ left: `${(gi / 14) * 100}%` }} />
                  ))}

                  {/* Gantt Bar */}
                  {isVisible && colSpan > 0 && (
                    <div
                      className="absolute h-5 bg-gradient-to-r rounded-lg border flex items-center px-2 shadow-sm pointer-events-none"
                      style={{
                        left: `calc(${(offsetDays / 14) * 100}% + 2px)`,
                        width: `calc(${(durationDays / 14) * 100}% - 4px)`,
                        background: task.status === 'done' 
                          ? 'rgba(16,185,129,0.06)' 
                          : task.status === 'blocked'
                          ? 'rgba(239,68,68,0.06)'
                          : 'rgba(139,92,246,0.08)',
                        borderColor: task.status === 'done' 
                          ? 'rgba(16,185,129,0.25)' 
                          : task.status === 'blocked'
                          ? 'rgba(239,68,68,0.25)'
                          : 'rgba(139,92,246,0.25)',
                      }}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 mr-1.5 ${PROJECT_COLORS[task.project]}`} />
                      <span className="text-[10px] text-zinc-400 truncate max-w-full font-sans select-none">
                        {task.project}
                      </span>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
