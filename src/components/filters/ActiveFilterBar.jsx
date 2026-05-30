import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

const STATUS_LABELS = { todo:'Todo', in_progress:'In Progress', in_review:'In Review', done:'Done', blocked:'Blocked' };
const PRIORITY_LABELS = { urgent:'Urgent', high:'High', medium:'Medium', low:'Low', none:'None' };

export default function ActiveFilterBar({ filters, activeFilterCount, clearFilter, clearAllFilters }) {
  const pills = [];

  if (filters.search.trim()) pills.push({ id:'search', label:'Search', value:`"${filters.search}"` });
  if (filters.statuses.length) pills.push({ id:'statuses', label:'Status', value: filters.statuses.map(s=>STATUS_LABELS[s]||s).join(', ') });
  if (filters.priorities.length) pills.push({ id:'priorities', label:'Priority', value: filters.priorities.map(p=>PRIORITY_LABELS[p]||p).join(', ') });
  if (filters.assignees.length) pills.push({ id:'assignees', label:'Assignee', value: filters.assignees.join(', ') });
  if (filters.projects.length) pills.push({ id:'projects', label:'Project', value: filters.projects.join(', ') });
  if (filters.dateRange.start) {
    const start = format(new Date(filters.dateRange.start), 'MMM d');
    const end = filters.dateRange.end ? `–${format(new Date(filters.dateRange.end), 'MMM d')}` : '';
    pills.push({ id:'dateRange', label:'Due', value: `${start}${end}` });
  }

  if (!activeFilterCount) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="overflow-hidden border-b border-violet-500/15 bg-violet-500/5 shrink-0"
      >
        <div className="px-4 sm:px-6 py-2.5 flex items-center gap-2 flex-wrap">
          <span className="text-[10px] uppercase tracking-widest text-violet-400/70 font-medium shrink-0 mr-1">Filters</span>

          {filters.aiApplied && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs rounded-full shrink-0">
              <Sparkles className="w-2.5 h-2.5" />
              AI Applied
            </span>
          )}

          {pills.map(pill => (
            <div
              key={pill.id}
              className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-xs text-zinc-300 rounded-full transition-colors duration-100 group/pill"
            >
              <span className="text-zinc-600">{pill.label}:</span>
              <span className="max-w-[120px] truncate">{pill.value}</span>
              <button
                type="button"
                onClick={() => clearFilter(pill.id)}
                aria-label={`Remove ${pill.label} filter`}
                className="w-3.5 h-3.5 flex items-center justify-center rounded-full hover:bg-zinc-600 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={clearAllFilters}
            className="ml-auto text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer hover:underline underline-offset-2 shrink-0 transition-colors"
          >
            Clear all
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
