import React, { useState } from 'react';
import { ChevronDown, Check, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import Dropdown from '../ui/Dropdown';

const SORT_OPTIONS = [
  { value: 'title',     label: 'Task name'     },
  { value: 'status',    label: 'Status'        },
  { value: 'priority',  label: 'Priority'      },
  { value: 'dueDate',   label: 'Due date'      },
  { value: 'createdAt', label: 'Created date'  },
];

export default function SortDropdown({ sortBy, sortDir, onSetSort }) {
  const [open, setOpen] = useState(false);

  const activeLabel = sortBy ? SORT_OPTIONS.find(o => o.value === sortBy)?.label : null;

  return (
    <Dropdown
      isOpen={open}
      onClose={() => setOpen(false)}
      className="w-52"
      align="right"
      trigger={
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap ${
            sortBy
              ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
              : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-400'
          }`}
        >
          <ArrowUpDown className="w-3 h-3" />
          {activeLabel ? `${activeLabel} ${sortDir === 'asc' ? '↑' : '↓'}` : 'Sort'}
        </button>
      }
    >
      <div className="py-1">
        <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-zinc-600 font-medium">Sort by</div>
        {SORT_OPTIONS.map(opt => {
          const isActive = sortBy === opt.value;
          return (
            <div
              key={opt.value}
              onClick={() => { onSetSort(opt.value); setOpen(false); }}
              className={`flex items-center justify-between px-3 py-2.5 mx-1 my-0.5 rounded-lg cursor-pointer transition-colors duration-100 text-sm ${
                isActive ? 'bg-violet-500/10 text-violet-300' : 'text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {opt.label}
              {isActive && (
                sortDir === 'asc'
                  ? <ArrowUp className="w-3 h-3 text-violet-400" />
                  : <ArrowDown className="w-3 h-3 text-violet-400" />
              )}
            </div>
          );
        })}
      </div>
    </Dropdown>
  );
}
