import React, { useState } from 'react';
import { ChevronDown, Check, User } from 'lucide-react';
import Dropdown from '../ui/Dropdown';
import Avatar from '../ui/Avatar';
import { TEAM_MEMBERS } from '../../data/tasks';

export default function AssigneeDropdown({ selected, onToggle }) {
  const [open, setOpen] = useState(false);

  const label = selected.length === 0
    ? 'Assignee'
    : selected.length === 1
    ? selected[0].split(' ')[0]
    : `${selected.length} people`;

  const isActive = selected.length > 0;

  return (
    <Dropdown
      isOpen={open}
      onClose={() => setOpen(false)}
      className="w-56"
      trigger={
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-haspopup="true"
          className={`flex h-10 items-center gap-2 px-3.5 rounded-md border text-sm font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap ${
            isActive
              ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
              : 'bg-[#15161b] hover:bg-[#1a1b21] border-[#24252b] text-zinc-300'
          }`}
        >
          <User className="w-4 h-4 text-zinc-500" />
          {label}
          <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      }
    >
      <div className="py-1">
        {TEAM_MEMBERS.map(member => {
          const isSel = selected.includes(member.name);
          return (
            <div
              key={member.name}
              onClick={() => onToggle(member.name)}
              className={`flex items-center justify-between px-3 py-2.5 mx-1 my-0.5 rounded-lg cursor-pointer transition-colors duration-100 text-sm ${
                isSel ? 'bg-violet-500/10 text-zinc-100' : 'text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar initials={member.initials} color={member.color} size="xs" />
                <span className="truncate">{member.name}</span>
              </div>
              {isSel && <Check className="w-3 h-3 text-violet-400 shrink-0 ml-2" />}
            </div>
          );
        })}
      </div>
    </Dropdown>
  );
}
