import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatusBadge from '../ui/StatusBadge';
import PriorityBadge from '../ui/PriorityBadge';
import Avatar from '../ui/Avatar';
import { formatDueDate, PROJECT_COLORS } from '../tasks/taskUtils';

const COLUMNS = [
  { id: 'todo',        label: 'Todo',        dot: 'bg-zinc-500'    },
  { id: 'in_progress', label: 'In Progress', dot: 'bg-blue-500'    },
  { id: 'in_review',   label: 'In Review',   dot: 'bg-amber-500'   },
  { id: 'done',        label: 'Done',        dot: 'bg-emerald-500' },
  { id: 'blocked',     label: 'Blocked',     dot: 'bg-red-500'     },
];

export default function BoardView({ tasks, onMoveTasks, onTaskClick }) {
  const [dragOverCol, setDragOverCol] = useState(null);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    setDragOverCol(colId);
  };

  const handleDragLeave = () => {
    setDragOverCol(null);
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    setDragOverCol(null);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onMoveTasks([taskId], targetStatus);
    }
  };

  // Stagger variants for entry
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const columnVariants = {
    hidden: { y: 15, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 22 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex-1 flex gap-4 p-6 overflow-x-auto no-scrollbar bg-surface-0 min-h-0 select-none"
    >
      {COLUMNS.map(col => {
        const colTasks = tasks.filter(t => t.status === col.id);
        const isDraggingOver = dragOverCol === col.id;

        return (
          <motion.div
            key={col.id}
            variants={columnVariants}
            onDragOver={e => handleDragOver(e, col.id)}
            onDragLeave={handleDragLeave}
            onDrop={e => handleDrop(e, col.id)}
            className={`flex-shrink-0 w-72 sm:w-80 rounded-2xl border flex flex-col max-h-full ${
              isDraggingOver
                ? 'bg-violet-500/5 border-violet-500/40 shadow-inner'
                : 'bg-zinc-900 border-zinc-800/80 shadow-md shadow-black/10'
            } transition-all duration-200`}
          >
            {/* Column Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                <span className="text-xs font-semibold text-zinc-200 uppercase tracking-wider leading-none">
                  {col.label}
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 border border-zinc-800/80 px-2 py-0.5 rounded-full font-bold">
                {colTasks.length}
              </span>
            </div>

            {/* Column Cards Container */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 min-h-[150px]">
              {colTasks.length === 0 ? (
                <div className="h-28 border border-dashed border-zinc-800/50 rounded-xl flex items-center justify-center text-xs text-zinc-600 font-medium">
                  Drop tasks here
                </div>
              ) : (
                colTasks.map(task => {
                  const due = formatDueDate(task.dueDate);
                  return (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={e => handleDragStart(e, task.id)}
                      onClick={() => onTaskClick(task)}
                      className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700/80 rounded-xl p-3.5 hover:shadow-lg hover:shadow-black/30 transition-all duration-200 cursor-grab active:cursor-grabbing group active:scale-[0.98]"
                    >
                      {/* Title */}
                      <h5 className="text-[13px] font-medium text-zinc-200 line-clamp-2 leading-snug group-hover:text-violet-400 transition-colors">
                        {task.title}
                      </h5>

                      {/* Footer Row */}
                      <div className="mt-4 flex items-center justify-between select-none">
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar initials={task.assignee.initials} color={task.assignee.color} name={task.assignee.name} size="xs" showTooltip />
                          <span className={`w-1 h-1 rounded-full ${PROJECT_COLORS[task.project] || 'bg-zinc-500'}`} />
                          <span className="text-[10px] text-zinc-500 truncate max-w-[65px]">
                            {task.project}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <PriorityBadge priority={task.priority} />
                          <span className={`text-[10px] font-semibold ${due.cls}`}>
                            {due.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
