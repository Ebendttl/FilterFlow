import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths,
  startOfToday, parseISO
} from 'date-fns';

const STATUS_CHIP_COLORS = {
  todo:        'bg-zinc-800 border-zinc-700/50 text-zinc-400',
  in_progress: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  in_review:   'bg-amber-500/10 border-amber-500/20 text-amber-400',
  done:        'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  blocked:     'bg-red-500/10 border-red-500/20 text-red-400',
};

export default function CalendarView({ tasks, onTaskClick }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextMonth = () => {
    setDirection(1);
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const prevMonth = () => {
    setDirection(-1);
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const goToToday = () => {
    setDirection(0);
    setCurrentMonth(startOfToday());
  };

  const mStart = startOfMonth(currentMonth);
  const mEnd = endOfMonth(currentMonth);
  const gridStart = startOfWeek(mStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(mEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  // Slide animations for month transitions
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : dir < 0 ? -100 : 0,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : dir < 0 ? 100 : 0,
      opacity: 0
    })
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface-0 select-none">
      {/* Calendar Header Control Row */}
      <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between shrink-0 bg-zinc-950/20">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-zinc-500" />
          <span className="text-sm font-semibold text-zinc-200">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToToday}
            className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:text-zinc-100 rounded-lg text-xs font-semibold text-zinc-400 transition-all active:scale-[0.98] cursor-pointer"
          >
            Today
          </button>
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 shadow-sm">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Weekday Labels Header */}
      <div className="grid grid-cols-7 border-b border-zinc-800 shrink-0 bg-zinc-950/10 text-center py-2 select-none">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-sans">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid Container with Slide Transitions */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentMonth.toISOString()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-0 grid grid-cols-7 grid-rows-6"
          >
            {days.map((day, idx) => {
              const inMonth = isSameMonth(day, currentMonth);
              const isTodayDate = isSameDay(day, startOfToday());
              const dayTasks = tasks.filter(t => isSameDay(parseISO(t.dueDate), day));

              return (
                <div
                  key={idx}
                  className={`border-r border-b border-zinc-800/60 p-1.5 flex flex-col justify-between overflow-hidden relative ${
                    inMonth ? 'bg-zinc-950/20' : 'bg-zinc-950/5'
                  }`}
                >
                  {/* Day Number Row */}
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`text-xs font-semibold font-mono w-5 h-5 flex items-center justify-center rounded-full leading-none ${
                        isTodayDate
                          ? 'bg-violet-600 text-white font-bold'
                          : inMonth
                          ? 'text-zinc-300'
                          : 'text-zinc-700'
                      }`}
                    >
                      {format(day, 'd')}
                    </span>
                    {dayTasks.length > 0 && (
                      <span className="text-[9px] font-bold text-zinc-600 bg-zinc-900 border border-zinc-800/40 px-1.5 py-0.2 rounded-full font-mono shrink-0">
                        {dayTasks.length}
                      </span>
                    )}
                  </div>

                  {/* Tasks inside cell */}
                  <div className="flex-1 overflow-y-auto space-y-1 pr-0.5 select-none no-scrollbar">
                    {dayTasks.map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => onTaskClick(t)}
                        className={`w-full text-[10px] font-medium py-0.5 px-1.5 rounded border text-left truncate cursor-pointer transition-colors block active:scale-98 ${
                          STATUS_CHIP_COLORS[t.status] || STATUS_CHIP_COLORS.todo
                        }`}
                      >
                        <span className="font-mono text-[9px] opacity-75 mr-1 font-semibold">
                          {t.id}
                        </span>
                        {t.title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
