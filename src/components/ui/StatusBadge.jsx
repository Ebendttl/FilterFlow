import React from 'react';

export default function StatusBadge({ status }) {
  const isLight = !document.documentElement.classList.contains('dark');

  const config = {
    todo: {
      label: 'Todo',
      dot: 'bg-zinc-500',
      bg: isLight ? 'bg-ff-hover/60' : 'bg-zinc-800',
      border: isLight ? 'border-zinc-300' : 'border-zinc-700',
      text: isLight ? 'text-zinc-700' : 'text-zinc-400'
    },
    in_progress: {
      label: 'In Progress',
      dot: 'bg-blue-500',
      bg: isLight ? 'bg-blue-500/15' : 'bg-blue-500/10',
      border: isLight ? 'border-blue-500/35' : 'border-blue-500/20',
      text: isLight ? 'text-blue-700 font-bold' : 'text-blue-400'
    },
    in_review: {
      label: 'In Review',
      dot: 'bg-amber-500',
      bg: isLight ? 'bg-amber-500/15' : 'bg-amber-500/10',
      border: isLight ? 'border-amber-500/35' : 'border-amber-500/20',
      text: isLight ? 'text-amber-700 font-bold' : 'text-amber-400'
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
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${c.bg} ${c.border} ${c.text} whitespace-nowrap`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />
      {c.label}
    </span>
  );
}

export const statusConfig = {
  todo:        { label: 'Todo',        dot: 'bg-zinc-500',    bg: 'bg-zinc-800',        border: 'border-zinc-700',    text: 'text-zinc-400'    },
  in_progress: { label: 'In Progress', dot: 'bg-blue-500',    bg: 'bg-blue-500/10',     border: 'border-blue-500/20', text: 'text-blue-400'    },
  in_review:   { label: 'In Review',   dot: 'bg-amber-500',   bg: 'bg-amber-500/10',    border: 'border-amber-500/20',text: 'text-amber-400'   },
  done:        { label: 'Done',        dot: 'bg-emerald-500', bg: 'bg-emerald-500/10',  border: 'border-emerald-500/20',text:'text-emerald-400' },
  blocked:     { label: 'Blocked',     dot: 'bg-red-500',     bg: 'bg-red-500/10',      border: 'border-red-500/20',  text: 'text-red-400'     },
};
