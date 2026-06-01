import React from 'react';

export default function StatusBadge({ status }) {
  const isLight = !document.documentElement.classList.contains('dark');

  const config = {
    todo: {
      label: 'Todo',
      dot: 'bg-zinc-500',
      bg: isLight ? 'bg-ff-hover/60' : 'bg-zinc-800/80',
      border: isLight ? 'border-zinc-300' : 'border-zinc-700',
      text: isLight ? 'text-zinc-700' : 'text-zinc-400'
    },
    in_progress: {
      label: 'In Progress',
      dot: 'bg-amber-400',
      bg: isLight ? 'bg-amber-500/15' : 'bg-amber-500/10',
      border: isLight ? 'border-amber-500/35' : 'border-amber-500/20',
      text: isLight ? 'text-amber-700 font-bold' : 'text-amber-300'
    },
    in_review: {
      label: 'In Review',
      dot: 'bg-indigo-400',
      bg: isLight ? 'bg-indigo-500/15' : 'bg-indigo-500/10',
      border: isLight ? 'border-indigo-500/35' : 'border-indigo-500/20',
      text: isLight ? 'text-indigo-700 font-bold' : 'text-indigo-300'
    },
    done: {
      label: 'Done',
      dot: 'bg-emerald-500',
      bg: isLight ? 'bg-emerald-500/15' : 'bg-emerald-500/10',
      border: isLight ? 'border-emerald-500/35' : 'border-emerald-500/20',
      text: isLight ? 'text-emerald-700 font-bold' : 'text-emerald-400'
    },
    blocked: {
      label: 'Blocked',
      dot: 'bg-red-500',
      bg: isLight ? 'bg-red-500/15' : 'bg-red-500/10',
      border: isLight ? 'border-red-500/35' : 'border-red-500/20',
      text: isLight ? 'text-red-700 font-bold' : 'text-red-400'
    },
  };

  const c = config[status] || config.todo;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-bold ${c.bg} ${c.border} ${c.text} whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />
      {c.label}
    </span>
  );
}

export const statusConfig = {
  todo:        { label: 'Todo',        dot: 'bg-zinc-500',    bg: 'bg-zinc-800',        border: 'border-zinc-700',    text: 'text-zinc-400'    },
  in_progress: { label: 'In Progress', dot: 'bg-amber-400',   bg: 'bg-amber-500/10',    border: 'border-amber-500/20', text: 'text-amber-300'    },
  in_review:   { label: 'In Review',   dot: 'bg-indigo-400',  bg: 'bg-indigo-500/10',   border: 'border-indigo-500/20',text: 'text-indigo-300'   },
  done:        { label: 'Done',        dot: 'bg-emerald-500', bg: 'bg-emerald-500/10',  border: 'border-emerald-500/20',text:'text-emerald-400' },
  blocked:     { label: 'Blocked',     dot: 'bg-red-500',     bg: 'bg-red-500/10',      border: 'border-red-500/20',  text: 'text-red-400'     },
};
