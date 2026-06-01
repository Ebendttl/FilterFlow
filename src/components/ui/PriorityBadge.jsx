import React from 'react';
import { ArrowUp, ArrowDown, Minus, Circle } from 'lucide-react';

const config = {
  urgent: { label: 'Urgent', Icon: ArrowUp,    color: 'text-rose-300',   bg: 'bg-rose-500/10',   border: 'border-rose-400/20'   },
  high:   { label: 'High',   Icon: ArrowUp,    color: 'text-amber-300',  bg: 'bg-amber-500/10',  border: 'border-amber-400/20'  },
  medium: { label: 'Medium', Icon: Minus,      color: 'text-yellow-300', bg: 'bg-yellow-500/10', border: 'border-yellow-400/20' },
  low:    { label: 'Low',    Icon: ArrowDown,  color: 'text-sky-300',    bg: 'bg-sky-500/10',    border: 'border-sky-400/20'    },
  none:   { label: 'No Priority', Icon: Circle, color: 'text-zinc-500',  bg: 'bg-white/0',       border: 'border-white/10'       },
};

export default function PriorityBadge({ priority }) {
  const c = config[priority] || config.none;
  const Icon = c.Icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-bold ${c.color} ${c.bg} ${c.border} whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`}>
      <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
      {c.label}
    </span>
  );
}

export { config as priorityConfig };
