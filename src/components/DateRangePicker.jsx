import React, { useState, useRef, useEffect } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isAfter, 
  isBefore, 
  addMonths, 
  subMonths, 
  startOfToday, 
  addDays, 
  isWithinInterval
} from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function DateRangePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Local temporary state before Apply is clicked
  const [tempStart, setTempStart] = useState(null);
  const [tempEnd, setTempEnd] = useState(null);
  
  const containerRef = useRef(null);

  // Sync temp selection with actual value when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTempStart(value.start ? new Date(value.start) : null);
      setTempEnd(value.end ? new Date(value.end) : null);
      setCurrentMonth(value.start ? new Date(value.start) : new Date());
    }
  }, [isOpen, value]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleDayClick = (day) => {
    if (!tempStart || tempEnd) {
      setTempStart(day);
      setTempEnd(null);
    } else {
      if (isBefore(day, tempStart)) {
        setTempStart(day);
        setTempEnd(null);
      } else {
        setTempEnd(day);
      }
    }
  };

  const handleQuickSelect = (option) => {
    const today = startOfToday();
    if (option === 'today') {
      setTempStart(today);
      setTempEnd(today);
      setCurrentMonth(today);
    } else if (option === 'week') {
      const start = startOfWeek(today, { weekStartsOn: 1 });
      const end = endOfWeek(today, { weekStartsOn: 1 });
      setTempStart(start);
      setTempEnd(end);
      setCurrentMonth(today);
    } else if (option === 'month') {
      const start = startOfMonth(today);
      const end = endOfMonth(today);
      setTempStart(start);
      setTempEnd(end);
      setCurrentMonth(today);
    } else if (option === 'next7') {
      setTempStart(today);
      setTempEnd(addDays(today, 6));
      setCurrentMonth(today);
    }
  };

  const handleApply = () => {
    onChange(tempStart, tempEnd);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  // Generate calendar grid
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday start
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  // Formatting display value
  const renderLabel = () => {
    if (value.start) {
      const startFmt = format(new Date(value.start), 'MMM d');
      if (value.end) {
        const endFmt = format(new Date(value.end), 'MMM d');
        return `${startFmt}–${endFmt}`;
      }
      return `${startFmt}`;
    }
    return "Due date";
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Filter by due date range"
        className={`h-8 px-3 border rounded-md flex items-center gap-1.5 text-[13px] font-medium transition-all duration-150 cursor-pointer active:scale-[0.98] select-none ${
          value.start 
            ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold' 
            : 'bg-white border-customBorder text-customText-secondary hover:border-indigo-300 hover:text-indigo-700'
        }`}
      >
        <CalendarIcon className={`w-3.5 h-3.5 ${value.start ? 'text-indigo-600' : 'text-customText-tertiary'}`} />
        <span>{renderLabel()}</span>
        <ChevronDown className="w-3 h-3 text-customText-tertiary" />
      </button>

      {isOpen && (
        <div 
          className="absolute left-0 mt-1.5 w-72 bg-white rounded-xl border border-customBorder shadow-xl z-50 p-4 animate-fade-in origin-top-left"
          role="dialog"
          aria-label="Select date range"
        >
          {/* Quick Select Buttons */}
          <div className="grid grid-cols-4 gap-1 mb-3 pb-3 border-b border-customBorder">
            <button
              type="button"
              onClick={() => handleQuickSelect('today')}
              className="text-[11px] font-medium py-1 px-1.5 rounded bg-surface-2 text-customText-secondary hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('week')}
              className="text-[11px] font-medium py-1 px-1.5 rounded bg-surface-2 text-customText-secondary hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              This week
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('month')}
              className="text-[11px] font-medium py-1 px-1.5 rounded bg-surface-2 text-customText-secondary hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              This month
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('next7')}
              className="text-[11px] font-medium py-1 px-1.5 rounded bg-surface-2 text-customText-secondary hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              Next 7d
            </button>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-3 px-1">
            <button
              type="button"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              aria-label="Previous month"
              className="p-1 rounded-md text-customText-secondary hover:bg-surface-2 hover:text-customText-primary transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[13px] font-semibold text-customText-primary">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <button
              type="button"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              aria-label="Next month"
              className="p-1 rounded-md text-customText-secondary hover:bg-surface-2 hover:text-customText-primary transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day Names Grid */}
          <div className="grid grid-cols-7 gap-y-1 mb-1 text-center">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((dayName, idx) => (
              <span key={idx} className="text-[10px] font-medium text-customText-tertiary uppercase">
                {dayName}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {days.map((day, idx) => {
              const inCurrentMonth = isSameMonth(day, currentMonth);
              const isStart = tempStart && isSameDay(day, tempStart);
              const isEnd = tempEnd && isSameDay(day, tempEnd);
              
              let inRange = false;
              if (tempStart && tempEnd) {
                inRange = isWithinInterval(day, { start: tempStart, end: tempEnd });
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  className={`h-7 w-7 text-xs flex items-center justify-center m-auto transition-colors cursor-pointer relative ${
                    !inCurrentMonth ? 'text-customText-tertiary/40' : 'text-customText-primary'
                  } ${
                    isStart 
                      ? 'bg-brand-primary text-white font-semibold rounded-full z-10'
                      : isEnd
                      ? 'bg-brand-primary text-white font-semibold rounded-full z-10'
                      : inRange
                      ? 'bg-indigo-50 text-indigo-700 rounded-none'
                      : 'hover:bg-surface-2 rounded-full'
                  }`}
                >
                  <span>{format(day, 'd')}</span>
                </button>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-customBorder">
            <button
              type="button"
              onClick={handleCancel}
              className="px-2.5 py-1.5 text-xs text-customText-secondary hover:text-customText-primary font-medium hover:bg-surface-2 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-3 py-1.5 text-xs bg-brand-primary hover:bg-brand-hover text-white font-medium rounded transition-colors shadow-sm"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
