import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ChevronUp, 
  UserPlus, 
  Sparkles, 
  MoreHorizontal, 
  Loader2 
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { callClaude } from '../../lib/anthropic';
import { TEAM_MEMBERS } from '../../data/tasks';

export default function QuickActionBar({
  taskId,
  task,
  rowRect,
  onUpdateTask,
  onOpenContextMenu,
  onMouseLeaveBar,
  onMouseEnterBar
}) {
  const [showAssigneePicker, setShowAssigneePicker] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const barRef = useRef(null);

  if (!rowRect) return null;

  // Calculate coordinates relative to document body (handles page scroll)
  const topPos = window.scrollY + rowRect.top - 46;
  const leftPos = window.scrollX + rowRect.left + rowRect.width / 2;

  // Mark Done Action
  const handleMarkDone = () => {
    onUpdateTask(taskId, { status: 'done' });
    toast.success(`Task ${taskId} completed`, {
      style: { background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46', borderLeft: '3px solid #10b981', borderRadius: '12px' }
    });
  };

  // Cycle Priority Action
  const handleCyclePriority = () => {
    const priorities = ['none', 'low', 'medium', 'high', 'urgent'];
    const currentIdx = priorities.indexOf(task.priority || 'none');
    const nextPriority = priorities[(currentIdx + 1) % priorities.length];
    onUpdateTask(taskId, { priority: nextPriority });
    toast.success(`Priority elevated to ${nextPriority}`, {
      style: { background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46', borderRadius: '12px' }
    });
  };

  // Assignee Select Action
  const handleSelectAssignee = (member) => {
    onUpdateTask(taskId, { assignee: member });
    setShowAssigneePicker(false);
    toast.success(`Assigned to ${member.name}`, {
      style: { background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46', borderRadius: '12px' }
    });
  };

  // AI Summary Action
  const handleAiSummary = async () => {
    if (loadingAi) return;
    if (aiSummary) {
      // Toggle off if already generated
      setAiSummary('');
      return;
    }
    setLoadingAi(true);
    try {
      const prompt = `In one sentence, summarize what this task involves and its current risk level. Task: ${task.title}, Status: ${task.status}, Priority: ${task.priority}, Assignee: ${task.assignee?.name}, Due: ${task.dueDate}`;
      const res = await callClaude(
        'You are a direct, technical project coordinator assistant. Answer in exactly one short sentence.',
        prompt,
        [],
        200
      );
      setAiSummary(res);
    } catch (err) {
      toast.error('AI summary extraction failed. Check Claude API Key.', {
        style: { background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46' }
      });
    } finally {
      setLoadingAi(false);
    }
  };

  const handleMoreClick = (e) => {
    e.stopPropagation();
    onOpenContextMenu?.(e, task);
  };

  const barContent = (
    <div
      ref={barRef}
      onMouseEnter={onMouseEnterBar}
      onMouseLeave={onMouseLeaveBar}
      style={{
        position: 'absolute',
        top: `${topPos}px`,
        left: `${leftPos}px`,
        transform: 'translateX(-50%)',
      }}
      className="z-30 select-none flex flex-col items-center gap-1.5"
    >
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.12 }}
        className="bg-ff-elevated border border-ff-border rounded-xl shadow-2xl shadow-black/50 px-2 py-1.5 flex items-center gap-1"
      >
        {/* Mark Done Button */}
        <button
          type="button"
          onClick={handleMarkDone}
          title="Mark Done"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-ff-muted hover:text-emerald-400 hover:bg-ff-hover transition-all cursor-pointer active:scale-95"
        >
          <Check size={13} strokeWidth={2.5} />
        </button>

        <div className="w-[1px] h-3 bg-ff-border mx-0.5" />

        {/* Cycle Priority Button */}
        <button
          type="button"
          onClick={handleCyclePriority}
          title="Cycle Priority"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-ff-muted hover:text-ff-primary hover:bg-ff-hover transition-all cursor-pointer active:scale-95"
        >
          <ChevronUp size={13} strokeWidth={2.5} />
        </button>

        {/* Assignee Picker Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAssigneePicker(p => !p)}
            title="Assign Task"
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-ff-muted hover:text-ff-primary hover:bg-ff-hover transition-all cursor-pointer active:scale-95 ${
              showAssigneePicker ? 'bg-ff-hover text-ff-primary' : ''
            }`}
          >
            <UserPlus size={13} />
          </button>

          {/* Mini Assignee Picker Popover */}
          <AnimatePresence>
            {showAssigneePicker && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-ff-elevated border border-ff-border rounded-xl p-1.5 shadow-xl w-40 z-40 space-y-0.5"
              >
                {TEAM_MEMBERS.map(m => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => handleSelectAssignee(m)}
                    className="w-full text-left px-2 py-1.5 hover:bg-ff-hover rounded-lg flex items-center gap-2 text-xs font-semibold text-ff-secondary hover:text-ff-primary transition-colors cursor-pointer"
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] text-white font-bold leading-none ${m.color}`}>
                      {m.initials}
                    </span>
                    <span className="truncate">{m.name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Summary Button */}
        <button
          type="button"
          onClick={handleAiSummary}
          title="AI Task Summary"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-ff-muted hover:text-ff-cyan hover:bg-ff-hover transition-all cursor-pointer active:scale-95"
        >
          {loadingAi ? (
            <Loader2 size={13} className="animate-spin text-ff-cyan" />
          ) : (
            <Sparkles size={13} className={aiSummary ? 'text-ff-cyan' : ''} />
          )}
        </button>

        {/* More Options Button */}
        <button
          type="button"
          onClick={handleMoreClick}
          title="More Actions"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-ff-muted hover:text-ff-primary hover:bg-ff-hover transition-all cursor-pointer active:scale-95"
        >
          <MoreHorizontal size={13} />
        </button>
      </motion.div>

      {/* Tooltip containing AI Summary */}
      <AnimatePresence>
        {aiSummary && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="max-w-64 bg-ff-card border border-ff-cyan/20 rounded-xl p-3 text-xs text-ff-secondary leading-relaxed shadow-lg flex items-start gap-2 text-left relative z-20 border-l-[2px] border-l-ff-cyan"
          >
            <Sparkles className="w-3.5 h-3.5 text-ff-cyan shrink-0 mt-0.5" />
            <p className="m-0 leading-relaxed font-sans">{aiSummary}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return ReactDOM.createPortal(barContent, document.body);
}
