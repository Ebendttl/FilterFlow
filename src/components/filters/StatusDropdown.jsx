import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import Dropdown from '../ui/Dropdown';

const STATUS_OPTIONS = [
  { value: 'todo',        label: 'Todo',        dot: 'bg-zinc-500'    },
  { value: 'in_progress', label: 'In Progress', dot: 'bg-blue-500'    },
  { value: 'in_review',   label: 'In Review',   dot: 'bg-amber-500'   },
  { value: 'done',        label: 'Done',        dot: 'bg-emerald-500' },
  { value: 'blocked',     label: 'Blocked',     dot: 'bg-red-500'     },
];

export default function StatusDropdown({ selected, onToggle }) {
  const [open, setOpen] = useState(false);

  const label = selected.length === 0
    ? 'Status'
    : selected.length === 1
    ? STATUS_OPTIONS.find(o => o.value === selected[0])?.label
    : `Status (${selected.length})`;

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
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap ${
            isActive
              ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
              : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300'
          }`}
        >
          {isActive && selected.length === 1 && (
            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_OPTIONS.find(o=>o.value===selected[0])?.dot}`} />
          )}
          {label}
          <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      }
    >
      <div className="py-1">
        {STATUS_OPTIONS.map(opt => {
          const isSel = selected.includes(opt.value);
          return (
            <div
              key={opt.value}
              onClick={() => onToggle(opt.value)}
              className={`flex items-center justify-between px-3 py-2.5 mx-1 my-0.5 rounded-lg cursor-pointer transition-colors duration-100 text-sm ${
                isSel ? 'bg-violet-500/10 text-zinc-100' : 'text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full ${opt.dot}`} />
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
