import React from 'react';

const config = {
  todo:        { label: 'Todo',        dot: 'bg-zinc-500',    bg: 'bg-zinc-800',        border: 'border-zinc-700',    text: 'text-zinc-400'    },
  in_progress: { label: 'In Progress', dot: 'bg-blue-500',    bg: 'bg-blue-500/10',     border: 'border-blue-500/20', text: 'text-blue-400'    },
  in_review:   { label: 'In Review',   dot: 'bg-amber-500',   bg: 'bg-amber-500/10',    border: 'border-amber-500/20',text: 'text-amber-400'   },
  done:        { label: 'Done',        dot: 'bg-emerald-500', bg: 'bg-emerald-500/10',  border: 'border-emerald-500/20',text:'text-emerald-400' },
  blocked:     { label: 'Blocked',     dot: 'bg-red-500',     bg: 'bg-red-500/10',      border: 'border-red-500/20',  text: 'text-red-400'     },
};

export default function StatusBadge({ status }) {
  const c = config[status] || config.todo;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${c.bg} ${c.border} ${c.text} whitespace-nowrap`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />
      {c.label}
    </span>
  );
}

export { config as statusConfig };
