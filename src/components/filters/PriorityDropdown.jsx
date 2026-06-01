import React, { useState } from 'react';
import { ChevronDown, Check, ArrowUp, ArrowDown, Minus, Circle, ListFilter } from 'lucide-react';
import Dropdown from '../ui/Dropdown';

const PRIORITY_OPTIONS = [
  { value: 'urgent', label: 'Urgent',      Icon: ArrowUp,   color: 'text-red-400'    },
  { value: 'high',   label: 'High',        Icon: ArrowUp,   color: 'text-orange-400' },
  { value: 'medium', label: 'Medium',      Icon: Minus,     color: 'text-amber-400'  },
  { value: 'low',    label: 'Low',         Icon: ArrowDown, color: 'text-sky-400'    },
  { value: 'none',   label: 'No Priority', Icon: Circle,    color: 'text-zinc-600'   },
];

export default function PriorityDropdown({ selected, onToggle }) {
  const [open, setOpen] = useState(false);

  const label = selected.length === 0
    ? 'Priority'
    : selected.length === 1
    ? PRIORITY_OPTIONS.find(o => o.value === selected[0])?.label
    : `Priority (${selected.length})`;

  const isActive = selected.length > 0;

  return (
    <Dropdown
      isOpen={open}
      onClose={() => setOpen(false)}
      className="w-48"
      trigger={
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-haspopup="true"
          className={`flex h-10 w-full items-center gap-2 px-3.5 rounded-md border text-sm font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap sm:w-auto ${
            isActive
              ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
              : 'bg-[#15161b] hover:bg-[#1a1b21] border-[#24252b] text-zinc-300'
          }`}
        >
          <ListFilter className="h-4 w-4 text-zinc-500" />
          {label}
          <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      }
    >
      <div className="py-1">
        {PRIORITY_OPTIONS.map(opt => {
          const isSel = selected.includes(opt.value);
          const Icon = opt.Icon;
          return (
            <div
              key={opt.value}
              onClick={() => onToggle(opt.value)}
              className={`flex items-center justify-between px-3 py-2.5 mx-1 my-0.5 rounded-lg cursor-pointer transition-colors duration-100 text-sm ${
                isSel ? 'bg-violet-500/10 text-zinc-100' : 'text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-3.5 h-3.5 ${opt.color}`} strokeWidth={2.5} />
                {opt.label}
              </div>
              {isSel && <Check className="w-3 h-3 text-violet-400" />}
            </div>
          );
        })}
      </div>
    </Dropdown>
  );
}
