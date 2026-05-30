import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isSameDay, isWithinInterval,
  addMonths, subMonths, startOfToday, addDays, isBefore, isAfter
} from 'date-fns';
import Dropdown from '../ui/Dropdown';

function MonthCalendar({ month, tempStart, tempEnd, onDayClick }) {
  const mStart = startOfMonth(month);
  const mEnd = endOfMonth(month);
  const gridStart = startOfWeek(mStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(mEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 mb-1">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} className="text-center text-[10px] text-zinc-600 font-medium py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((day, i) => {
          const inMonth = isSameMonth(day, month);
          const isStart = tempStart && isSameDay(day, tempStart);
          const isEnd = tempEnd && isSameDay(day, tempEnd);
          const inRange = tempStart && tempEnd && isWithinInterval(day, { start: tempStart, end: tempEnd });

          return (
            <button
              key={i}
              type="button"
              onClick={() => onDayClick(day)}
              className={`h-7 w-full flex items-center justify-center text-xs transition-colors duration-100 cursor-pointer ${
                !inMonth ? 'text-zinc-700' : 'text-zinc-300'
              } ${
                isStart || isEnd
                  ? 'bg-violet-600 text-white font-semibold rounded-full'
                  : inRange
                  ? 'bg-violet-500/15 text-violet-300'
                  : 'hover:bg-zinc-800 rounded-full'
              }`}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function DateRangePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(new Date());
  const [tempStart, setTempStart] = useState(null);
  const [tempEnd, setTempEnd] = useState(null);

  useEffect(() => {
    if (open) {
      setTempStart(value.start ? new Date(value.start) : null);
      setTempEnd(value.end ? new Date(value.end) : null);
    }
  }, [open]);

  const handleDayClick = (day) => {
    if (!tempStart || tempEnd) {
      setTempStart(day);
      setTempEnd(null);
    } else {
      if (isBefore(day, tempStart)) { setTempStart(day); setTempEnd(null); }
      else setTempEnd(day);
    }
  };

  const handleQuick = (opt) => {
    const today = startOfToday();
    if (opt === 'today') { setTempStart(today); setTempEnd(today); }
    else if (opt === 'week') { setTempStart(startOfWeek(today,{weekStartsOn:1})); setTempEnd(endOfWeek(today,{weekStartsOn:1})); }
    else if (opt === 'month') { setTempStart(startOfMonth(today)); setTempEnd(endOfMonth(today)); }
    else if (opt === 'next14') { setTempStart(today); setTempEnd(addDays(today,13)); }
    setMonth(today);
  };

  const handleApply = () => { onChange(tempStart, tempEnd); setOpen(false); };

  const label = value.start
    ? `${format(new Date(value.start),'MMM d')}${value.end ? `–${format(new Date(value.end),'MMM d')}` : ''}`
    : 'Due date';

  return (
    <Dropdown
      isOpen={open}
      onClose={() => setOpen(false)}
      className="w-72"
      trigger={
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap ${
            value.start
              ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
              : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300'
          }`}
        >
          <Calendar className="w-3 h-3 text-zinc-500" />
          {label}
          <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      }
    >
      <div className="p-4">
        {/* Quick picks */}
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {[['today','Today'],['week','This week'],['month','This month'],['next14','Next 14 days']].map(([k,l]) => (
            <button key={k} type="button" onClick={() => handleQuick(k)}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full text-xs text-zinc-300 hover:text-zinc-100 transition-colors cursor-pointer">
              {l}
            </button>
          ))}
        </div>
        {/* Month header */}
        <div className="flex items-center justify-between mb-3">
          <button type="button" onClick={() => setMonth(m => subMonths(m,1))} className="p-1 text-zinc-500 hover:text-zinc-300 cursor-pointer"><ChevronLeft className="w-4 h-4"/></button>
          <span className="text-sm font-medium text-zinc-200">{format(month,'MMMM yyyy')}</span>
          <button type="button" onClick={() => setMonth(m => addMonths(m,1))} className="p-1 text-zinc-500 hover:text-zinc-300 cursor-pointer"><ChevronRight className="w-4 h-4"/></button>
        </div>
        <MonthCalendar month={month} tempStart={tempStart} tempEnd={tempEnd} onDayClick={handleDayClick} />
        {/* Footer */}
        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-zinc-800">
          <button type="button" onClick={() => setOpen(false)} className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer">Cancel</button>
          <button type="button" onClick={handleApply} className="px-3 py-1.5 text-xs bg-violet-600 hover:bg-violet-500 text-white rounded-lg cursor-pointer transition-colors">Apply</button>
        </div>
      </div>
    </Dropdown>
  );
}
