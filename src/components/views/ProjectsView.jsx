import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, ChevronRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import PriorityBadge from '../ui/PriorityBadge';
import Avatar from '../ui/Avatar';
import { formatDueDate, PROJECT_COLORS } from '../tasks/taskUtils';
import { PROJECTS } from '../../data/tasks';

export default function ProjectsView({ tasks, onTaskClick }) {
  const [expandedProj, setExpandedProj] = useState(PROJECTS[0]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface-0 overflow-y-auto p-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-4 shrink-0">
        <FolderOpen className="w-5 h-5 text-zinc-500" />
        <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">
          Project Dashboard
        </h2>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0">
        {PROJECTS.map(proj => {
          const projTasks = tasks.filter(t => t.project === proj);
          const doneTasks = projTasks.filter(t => t.status === 'done');
          const blockedTasks = projTasks.filter(t => t.status === 'blocked');
          const progressPercent = projTasks.length 
            ? Math.round((doneTasks.length / projTasks.length) * 100) 
            : 0;

          const isExp = expandedProj === proj;

          return (
            <div
              key={proj}
              onClick={() => setExpandedProj(isExp ? '' : proj)}
              className={`bg-zinc-900 border rounded-2xl p-5 cursor-pointer hover:border-zinc-700 transition-all ${
                isExp ? 'border-violet-500/35 ring-1 ring-violet-500/10' : 'border-zinc-800/80 shadow-md'
              }`}
            >
              {/* Header: Title + Collapse Arrow */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${PROJECT_COLORS[proj] || 'bg-zinc-500'}`} />
                  <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wide">
                    {proj}
                  </h3>
                </div>
                {isExp ? <ChevronDown className="w-4 h-4 text-zinc-500" /> : <ChevronRight className="w-4 h-4 text-zinc-500" />}
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium">
                  <span>Progress</span>
                  <span className="font-mono text-zinc-300 font-bold">{progressPercent}%</span>
                </div>
                <div className="h-1.5 bg-zinc-950 border border-zinc-800/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full bg-violet-600 rounded-full"
                  />
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-zinc-800/60 text-center">
                <div>
                  <span className="block text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Total</span>
                  <span className="text-sm font-bold text-zinc-200 mt-0.5 block">{projTasks.length}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Completed</span>
                  <span className="text-sm font-bold text-emerald-400 mt-0.5 block">{doneTasks.length}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Blocked</span>
                  <span className="text-sm font-bold text-red-400 mt-0.5 block">{blockedTasks.length}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active project tasks list */}
      <div className="flex-1 flex flex-col min-h-0 bg-zinc-900 border border-zinc-800/80 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4 shrink-0 select-none">
          <CheckCircle2 className="w-4 h-4 text-violet-400" />
          <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
            {expandedProj ? `${expandedProj} Tasks` : 'Select a Project to view tasks'}
          </h4>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {expandedProj ? (
            (() => {
              const activeProjTasks = tasks.filter(t => t.project === expandedProj);
              if (!activeProjTasks.length) {
                return (
                  <div className="py-8 text-center text-xs text-zinc-600 font-medium">
                    No tasks inside this project.
                  </div>
                );
              }
              return activeProjTasks.map(task => {
                const due = formatDueDate(task.dueDate);
                return (
                  <div
                    key={task.id}
                    onClick={() => onTaskClick(task)}
                    className="bg-zinc-950 border border-zinc-850 hover:border-zinc-700/80 rounded-xl px-4 py-3 cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
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
                      <Avatar initials={task.assignee.initials} color={task.assignee.color} image={task.assignee.image} size="xs" />
                      <span className={`text-[10px] font-semibold ${due.cls} min-w-[50px] text-right`}>
                        {due.text}
                      </span>
                    </div>
                  </div>
                );
              });
            })()
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-zinc-600 font-medium py-10">
              Click a project above to inspect tasks
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
