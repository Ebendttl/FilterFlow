import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Edit3, UserPlus, RefreshCw, Copy, Trash2, Sparkles, MoreHorizontal
} from 'lucide-react';
import toast from 'react-hot-toast';
import { callClaude } from '../../lib/anthropic';
import { useClickOutside } from '../../hooks/useClickOutside';

const STATUS_OPTIONS = ['todo','in_progress','in_review','done','blocked'];
const STATUS_LABELS  = { todo:'Todo', in_progress:'In Progress', in_review:'In Review', done:'Done', blocked:'Blocked' };

export default function TaskContextMenu({ task, onEdit, onDuplicate, onDelete, onStatusChange, containerRef }) {
  const [open, setOpen] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const menuRef = React.useRef(null);

  useClickOutside(menuRef, () => { setOpen(false); setShowStatus(false); }, open);

  const handleAiSummary = async () => {
    setOpen(false);
    setAiLoading(true);
    try {
      const text = await callClaude(
        'You are a task analyst. Summarize this task in exactly 2 sentences: what it involves and its urgency.',
        `Task: ${task.title}\nStatus: ${task.status}\nPriority: ${task.priority}\nAssignee: ${task.assignee.name}`,
        [], 200
      );
      setAiSummary(text.trim());
    } catch {
      toast.error('AI unavailable — check your API key', { style: { background:'#18181b', color:'#fafafa', border:'1px solid #3f3f46' } });
    } finally {
      setAiLoading(false);
    }
  };

  const handleDuplicate = () => {
    onDuplicate(task.id);
    setOpen(false);
    toast.success(`${task.id} duplicated`, { style: { background:'#18181b', color:'#fafafa', border:'1px solid #3f3f46', borderRadius:'12px' } });
  };

  const handleDelete = () => {
    onDelete(task.id);
    setOpen(false);
    toast.error('Task deleted', { style: { background:'#18181b', color:'#fafafa', border:'1px solid #3f3f46', borderRadius:'12px' } });
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        aria-label="Task actions"
        className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {/* AI Summary tooltip */}
      <AnimatePresence>
        {(aiLoading || aiSummary) && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute right-8 top-0 w-64 bg-zinc-900 border border-cyan-500/20 rounded-xl p-3 z-50 shadow-xl"
            style={{ boxShadow: '0 0 20px rgba(6,182,212,0.08)' }}
          >
            {aiLoading ? (
              <div className="flex items-center gap-2 text-xs text-cyan-400">
                <Sparkles className="w-3 h-3 animate-spin-slow" />
                Generating summary...
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span className="text-[11px] font-medium text-cyan-400">AI Summary</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{aiSummary}</p>
                <button onClick={() => setAiSummary('')} className="mt-2 text-[10px] text-zinc-600 hover:text-zinc-400 cursor-pointer">Dismiss</button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            style={{ originX: 1, originY: 0 }}
            className="absolute right-0 mt-1 w-44 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl shadow-black/50 z-50 py-1"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => { onEdit(task); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors cursor-pointer text-left">
              <Edit3 className="w-3.5 h-3.5 text-zinc-500" /> Edit
            </button>

            {/* Status submenu */}
            <div className="relative">
              <button onClick={() => setShowStatus(s => !s)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors cursor-pointer text-left">
                <RefreshCw className="w-3.5 h-3.5 text-zinc-500" /> Change Status
              </button>
              <AnimatePresence>
                {showStatus && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-full top-0 mr-1 w-40 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl py-1"
                  >
                    {STATUS_OPTIONS.map(s => (
                      <button key={s} onClick={() => { onStatusChange(task.id, s); setOpen(false); setShowStatus(false);
                        toast(`${task.id} → ${STATUS_LABELS[s]}`, { style: { background:'#18181b', color:'#fafafa', border:'1px solid #3f3f46', borderRadius:'12px' } }); }}
                        className={`w-full px-3 py-2 text-xs text-left cursor-pointer transition-colors ${task.status === s ? 'text-violet-300 bg-violet-500/10' : 'text-zinc-300 hover:bg-zinc-800'}`}>
                        {STATUS_LABELS[s]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={handleAiSummary}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-cyan-400 hover:bg-zinc-800 transition-colors cursor-pointer text-left">
              <Sparkles className="w-3.5 h-3.5" /> AI Summary
            </button>

            <button onClick={handleDuplicate}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors cursor-pointer text-left">
              <Copy className="w-3.5 h-3.5 text-zinc-500" /> Duplicate
            </button>

            <div className="h-px bg-zinc-800 my-1" />

            <button onClick={handleDelete}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer text-left">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
