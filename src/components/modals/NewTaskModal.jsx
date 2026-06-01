import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { callClaude, parseClaudeJSON } from '../../lib/anthropic';
import { TEAM_MEMBERS, PROJECTS } from '../../data/tasks';

export default function NewTaskModal({ isOpen, onClose, onAddTask }) {
  const [quickPrompt, setQuickPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');
  const [project, setProject] = useState('Core App');
  const [assigneeName, setAssigneeName] = useState('Joan Akinseinde');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [showError, setShowError] = useState(false);

  const handleAiQuickCreate = async () => {
    const promptText = quickPrompt.trim();
    if (!promptText || aiLoading) return;

    setAiLoading(true);
    try {
      const systemPrompt = `Extract task fields from the user description and return ONLY JSON:
{
  "title": string,
  "status": "todo"|"in_progress"|"in_review"|"done"|"blocked",
  "priority": "urgent"|"high"|"medium"|"low"|"none",
  "project": "Core App"|"Render Deploy"|"Analytics Engine"|"Design System"|"API Integration",
  "assigneeName": "Joan Akinseinde"|"Maya Chen"|"Iris Morgan"|"Theo Banks"|"Nora Patel"|"Leo Okafor",
  "dueDate": "ISO date string (YYYY-MM-DD)",
  "description": string
}
If not mentioned, use reasonable defaults (status: todo, priority: medium, project: Core App, assigneeName: Joan Akinseinde, dueDate: ${new Date().toISOString().split('T')[0]}).
Return ONLY the JSON. No markdown. No wrap.`;

      const response = await callClaude(systemPrompt, promptText, [], 400);
      const parsed = parseClaudeJSON(response);

      if (parsed.title) setTitle(parsed.title);
      if (parsed.status) setStatus(parsed.status);
      if (parsed.priority) setPriority(parsed.priority);
      if (parsed.project) setProject(parsed.project);
      if (parsed.assigneeName) setAssigneeName(parsed.assigneeName);
      if (parsed.dueDate) setDueDate(parsed.dueDate);
      if (parsed.description) setDescription(parsed.description);

      toast.custom((t) => (
        <div className={`flex items-start gap-3 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl max-w-sm ${t.visible ? 'animate-enter' : 'animate-leave'}`}
          style={{ borderLeft: '3px solid #06b6d4' }}>
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-200">✦ AI filled in your task fields</p>
        </div>
      ), { duration: 3000, position: 'bottom-right' });

      setQuickPrompt('');
    } catch (err) {
      toast.error('AI Quick Create failed. Verify key in .env', {
        style: { background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46', borderRadius: '12px' }
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleCreate = () => {
    if (!title.trim()) {
      setShowError(true);
      toast.error('Task title is required', {
        style: { background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46', borderRadius: '12px' }
      });
      return;
    }

    // Find the assignee object
    const selectedAssignee = TEAM_MEMBERS.find(m => m.name === assigneeName) || {
      name: 'Joan Akinseinde',
      initials: 'JA',
      color: 'bg-violet-600'
    };

    const newId = onAddTask({
      title,
      status,
      priority,
      project,
      assignee: selectedAssignee,
      dueDate,
      description
    });

    toast.success(`Task created · ${newId}`, {
      style: { background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46', borderRadius: '12px' }
    });

    // Reset fields
    setTitle('');
    setStatus('todo');
    setPriority('medium');
    setProject('Core App');
    setAssigneeName('Joan Akinseinde');
    setDueDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    setShowError(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Centered Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden select-none"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">
                  Create Task
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="w-7 h-7 rounded-lg hover:bg-zinc-850 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                
                {/* AI Quick Create (FIRST, prominent) */}
                <div className="bg-cyan-500/5 border border-cyan-500/15 rounded-xl p-4 shadow-cyan-glow space-y-2">
                  <div className="flex items-center gap-1.5 text-cyan-400 select-none">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      AI Quick Create
                    </span>
                  </div>
                  <textarea
                    value={quickPrompt}
                    onChange={e => setQuickPrompt(e.target.value)}
                    placeholder="Describe your task... e.g. 'Setup edge middleware, high priority, assign to Joan'"
                    rows={2}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 p-3 outline-none resize-none focus:border-cyan-500/35 focus:ring-1 focus:ring-cyan-500/10 placeholder:text-zinc-700 font-sans"
                  />
                  <button
                    type="button"
                    onClick={handleAiQuickCreate}
                    disabled={aiLoading || !quickPrompt.trim()}
                    className="h-8 w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 select-none"
                  >
                    {aiLoading ? (
                      <span className="animate-pulse">Claude is crafting fields...</span>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Generate Task ✦</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Thin divider */}
                <div className="flex items-center justify-between text-[10px] text-zinc-700 uppercase tracking-widest font-bold my-2 select-none">
                  <div className="w-1/3 h-px bg-zinc-800" />
                  <span>or manual input</span>
                  <div className="w-1/3 h-px bg-zinc-800" />
                </div>

                {/* Manual Title Input */}
                <div className="space-y-1">
                  <label htmlFor="manual-title" className="block text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                    Task Title *
                  </label>
                  <input
                    id="manual-title"
                    type="text"
                    value={title}
                    onChange={e => { setTitle(e.target.value); setShowError(false); }}
                    placeholder="e.g. Implement refresh tokens flow"
                    className={`w-full bg-zinc-950 border rounded-xl text-xs text-zinc-100 px-3.5 py-2.5 outline-none focus:ring-1 ${
                      showError 
                        ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/10' 
                        : 'border-zinc-800 focus:border-violet-500/50 focus:ring-violet-500/10'
                    }`}
                  />
                </div>

                {/* Status + Priority Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="status-select" className="block text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                      Status
                    </label>
                    <select
                      id="status-select"
                      value={status}
                      onChange={e => setStatus(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-300 px-3 py-2.5 outline-none cursor-pointer focus:border-violet-500/40"
                    >
                      <option value="todo">Todo</option>
                      <option value="in_progress">In Progress</option>
                      <option value="in_review">In Review</option>
                      <option value="done">Done</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="priority-select" className="block text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                      Priority
                    </label>
                    <select
                      id="priority-select"
                      value={priority}
                      onChange={e => setPriority(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-300 px-3 py-2.5 outline-none cursor-pointer focus:border-violet-500/40"
                    >
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>

                {/* Project + Assignee Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="project-select" className="block text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                      Project
                    </label>
                    <select
                      id="project-select"
                      value={project}
                      onChange={e => setProject(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-300 px-3 py-2.5 outline-none cursor-pointer focus:border-violet-500/40"
                    >
                      {PROJECTS.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="assignee-select" className="block text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                      Assignee
                    </label>
                    <select
                      id="assignee-select"
                      value={assigneeName}
                      onChange={e => setAssigneeName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-300 px-3 py-2.5 outline-none cursor-pointer focus:border-violet-500/40"
                    >
                      {TEAM_MEMBERS.map(m => (
                        <option key={m.name} value={m.name}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Due Date Row */}
                <div className="space-y-1">
                  <label htmlFor="due-date-input" className="block text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                    Due Date
                  </label>
                  <input
                    id="due-date-input"
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-300 px-3.5 py-2.5 outline-none cursor-pointer focus:border-violet-500/40"
                  />
                </div>

                {/* Description Textarea */}
                <div className="space-y-1">
                  <label htmlFor="description-input" className="block text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                    Description
                  </label>
                  <textarea
                    id="description-input"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Provide context or specification..."
                    rows={3}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 p-3 outline-none resize-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/10 placeholder:text-zinc-700 font-sans"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-zinc-800 flex gap-2 justify-end shrink-0 bg-zinc-950">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 h-9 border border-zinc-800 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreate}
                  className="px-4 h-9 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Create Task
                </button>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
