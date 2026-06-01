import React from 'react';
import { format, isToday, isYesterday, isTomorrow, isBefore, startOfToday, parseISO } from 'date-fns';

export function formatDueDate(dateStr) {
  if (!dateStr) return { text: 'Unassigned', cls: 'text-zinc-600' };
  const date = parseISO(dateStr);
  const today = startOfToday();
  if (isBefore(date, today)) return { text: dateStr, cls: 'text-rose-400 font-semibold' };
  return { text: dateStr, cls: 'text-zinc-400' };
}

export const PROJECT_COLORS = {
  'Core App':          'bg-violet-500',
  'Vercel Deploy':     'bg-sky-500',
  'Analytics Engine':  'bg-emerald-500',
  'Design System':     'bg-pink-500',
  'API Integration':   'bg-amber-500',
};
