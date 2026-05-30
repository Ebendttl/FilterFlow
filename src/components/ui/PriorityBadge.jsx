import React from 'react';
import { ArrowUp, ArrowDown, Minus, Circle } from 'lucide-react';

const config = {
  urgent: { label: 'Urgent', Icon: ArrowUp,    color: 'text-red-400'    },
  high:   { label: 'High',   Icon: ArrowUp,    color: 'text-orange-400' },
  medium: { label: 'Medium', Icon: Minus,      color: 'text-amber-400'  },
  low:    { label: 'Low',    Icon: ArrowDown,  color: 'text-sky-400'    },
  none:   { label: '–',      Icon: Circle,     color: 'text-zinc-700'   },
};

export default function PriorityBadge({ priority }) {
  const c = config[priority] || config.none;
  const Icon = c.Icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${c.color} whitespace-nowrap`}>
      <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
      {c.label}
    </span>
  );
}

export { config as priorityConfig };
