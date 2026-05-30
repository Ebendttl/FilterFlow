import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { callClaude, parseClaudeJSON } from '../../lib/anthropic';
import Avatar from '../ui/Avatar';
import { TEAM_MEMBERS } from '../../data/tasks';

export default function BulkActionsBar({
  selectedIds,
  tasks,
  onClearSelection,
  onUpdateTasks,
  onDeleteSelected
}) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showAssigneeMenu, setShowAssigneeMenu] = useState(false);
  const [aiPrioritizing, setAiPrioritizing] = useState(false);

  const selectedTasks = tasks.filter(t => selectedIds.includes(t.id));
  const hasSelection = selectedIds.length > 0;

  const handleStatusChange = (status) => {
    onUpdateTasks(selectedIds, { status });
    toast.success(`Updated status for ${selectedIds.length} tasks`, {
      style: { background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46', borderRadius: '12px' }
    });
    setShowStatusMenu(false);
    onClearSelection();
  };

  const handleAssigneeChange = (assignee) => {
    onUpdateTasks(selectedIds, { assignee });
    toast.success(`Reassigned ${selectedIds.length} tasks to ${assignee.name}`, {
      style: { background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46', borderRadius: '12px' }
    });
    setShowAssigneeMenu(false);
    onClearSelection();
  };

  const handleAiPrioritize = async () => {
    setAiPrioritizing(true);
    try {
      const taskListStr = selectedTasks.map(t => `- ${t.id}: "${t.title}"`).join('\n');
      const prompt = `Analyze these task titles and output a JSON object mapping task IDs to a suggested priority ('urgent', 'high', 'medium', 'low', 'none'). Be highly analytical. Output ONLY valid JSON:
{
  "FF-001": "high",
  ...
}

Tasks:
${taskListStr}`;

      const response = await callClaude(
        'You are an expert sprint planner. Analyze task title complexity and urgency to assign logical priorities.',
        prompt,
        [],
        300
      );
      
      const parsed = parseClaudeJSON(response);
      
      // Update each task's priority
      selectedIds.forEach(id => {
        if (parsed[id]) {
          onUpdateTasks([id], { priority: parsed[id] });
        }
      });

      toast.custom((t) => (
        <div className={`flex items-start gap-3 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl max-w-sm ${t.visible ? 'animate-enter' : 'animate-leave'}`}
          style={{ borderLeft: '3px solid #06b6d4' }}>
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-200">✦ AI Prioritization applied to {selectedIds.length} tasks</p>
        </div>
      ), { duration: 3000, position: 'bottom-right' });

      onClearSelection();
    } catch (err) {
      toast.error('AI Prioritization failed. Check your API key.', {
        style: { background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46', borderRadius: '12px' }
      });
    } finally {
      setAiPrioritizing(false);
    }
  };

  const handleDelete = () => {
    onDeleteSelected(selectedIds);
    toast.error(`Deleted ${selectedIds.length} tasks`, {
      style: { background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46', borderRadius: '12px' }
    });
    onClearSelection();
  };

  return (
    <AnimatePresence>
      {hasSelection && (
        <motion.div
          initial={{ y: 80, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: 80, x: '-50%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-1/2 z-50 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/80 px-5 py-3 flex items-center gap-3 backdrop-blur-md min-w-[360px] sm:min-w-[420px] select-none"
        >
          {/* Selected Count */}
          <span className="text-xs text-zinc-300 font-semibold shrink-0">
            {selectedIds.length} selected
          </span>

          {/* Vertical Separator */}
          <div className="w-px h-4 bg-zinc-800" />

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 flex-1 relative">
            {/* Status Change */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setShowStatusMenu(s => !s); setShowAssigneeMenu(false); }}
                className="text-xs text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Status
              </button>
              {showStatusMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-36 bg-zinc-900 border border-zinc-800 rounded-xl py-1 shadow-xl">
                  {['todo', 'in_progress', 'in_review', 'done', 'blocked'].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleStatusChange(s)}
                      className="w-full text-left px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                      {s === 'todo' ? 'Todo' : s === 'in_progress' ? 'In Progress' : s === 'in_review' ? 'In Review' : s === 'done' ? 'Done' : 'Blocked'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reassign */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setShowAssigneeMenu(s => !s); setShowStatusMenu(false); }}
                className="text-xs text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Assign
              </button>
              {showAssigneeMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl py-1 shadow-xl max-h-40 overflow-y-auto">
                  {TEAM_MEMBERS.map(m => (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => handleAssigneeChange(m)}
                      className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 transition-colors flex items-center gap-2"
                    >
                      <Avatar initials={m.initials} color={m.color} size="xs" />
                      <span>{m.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AI Prioritize */}
            <button
              type="button"
              disabled={aiPrioritizing}
              onClick={handleAiPrioritize}
              className="text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/20 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 font-semibold disabled:opacity-50 select-none"
            >
              <Sparkles className={`w-3.5 h-3.5 ${aiPrioritizing ? 'animate-spin-slow' : ''}`} />
              <span>AI Prioritize</span>
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={handleDelete}
              className="text-xs text-red-500 hover:text-red-400 hover:bg-red-950/10 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ml-auto font-medium"
            >
              Delete
            </button>
          </div>

          {/* Clear Button */}
          <button
            type="button"
            onClick={onClearSelection}
            aria-label="Clear selection"
            className="w-6 h-6 rounded-lg hover:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
