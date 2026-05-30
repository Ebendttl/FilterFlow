import React from 'react';
import { format, isToday, isYesterday, isTomorrow, isBefore, startOfToday, parseISO } from 'date-fns';

export function formatDueDate(dateStr) {
  if (!dateStr) return { text: '—', cls: 'text-zinc-600' };
  const date = parseISO(dateStr);
  const today = startOfToday();
  if (isToday(date)) return { text: 'Today', cls: 'text-amber-400 font-medium' };
  if (isYesterday(date)) return { text: 'Yesterday', cls: 'text-red-400 font-medium' };
  if (isTomorrow(date)) return { text: 'Tomorrow', cls: 'text-amber-500' };
  if (isBefore(date, today)) return { text: format(date, 'MMM d'), cls: 'text-red-400 font-medium' };
  return { text: format(date, 'MMM d'), cls: 'text-zinc-500' };
}

export const PROJECT_COLORS = {
  'Design System':  'bg-violet-500',
  'Mobile App':     'bg-blue-500',
  'Backend API':    'bg-emerald-500',
  'Marketing Site': 'bg-orange-500',
};
