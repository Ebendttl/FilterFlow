import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Trash2, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { callClaude } from '../../lib/anthropic';
import Avatar from '../ui/Avatar';

const SUGGESTIONS = [
  { text: 'Analyze sprint status', q: 'Give me a brief summary of the sprint status: status breakdown, priority distribution, and how many are done/in progress.' },
  { text: 'Redis caching task',    q: 'Write a full JSON task template to set up Redis session caching, ready to copy.' },
  { text: 'Show urgent blocker tasks', q: 'List all urgent or blocked tasks currently in the project.' },
];

export default function AIChatPanel({ isOpen, onClose, tasks, onAddTask, isMobile }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your FilterFlow intelligence assistant. I have live context on your task workspace. What would you like to build or analyze today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const threadEndRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || input.trim();
    if (!textToSend || loading) return;

    if (!queryText) setInput('');

    // Append User message
    const updatedMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const systemPrompt = `You are a helpful project manager assistant. You have full visibility into the workspace tasks list. Help the user query, analyze, or design task workflows.
Current tasks data:
${JSON.stringify(tasks.map(t => ({ id: t.id, title: t.title, status: t.status, priority: t.priority, assignee: t.assignee.name, project: t.project, dueDate: t.dueDate })))}

Be highly technical, direct, and concise. Respond in clean, formatted Markdown.`;

      const response = await callClaude(systemPrompt, textToSend, [], 500);

      // Token streaming simulation
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      let currentText = '';
      const tokens = response.split(' ');
      
      for (let i = 0; i < tokens.length; i++) {
        await new Promise(r => setTimeout(r, 12));
        currentText += (i === 0 ? '' : ' ') + tokens[i];
        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', content: currentText };
          return next;
        });
      }

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '⚠️ **AI Error**: Failed to fetch a response. Check your Anthropic Key in `.env`.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hello! History cleared. What can I do for you now?"
      }
    ]);
  };

  const desktopVariants = {
    closed: { x: '100%', opacity: 0.9 },
    open: { x: 0, opacity: 1 }
  };

  const mobileVariants = {
    closed: { y: '100%' },
    open: { y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={isMobile ? 'closed' : 'closed'}
          animate="open"
          exit="closed"
          variants={isMobile ? mobileVariants : desktopVariants}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className={`bg-zinc-950 border-zinc-800 flex flex-col shadow-2xl z-40 select-none ${
            isMobile 
              ? 'fixed bottom-0 left-0 right-0 h-[65vh] rounded-t-2xl border-t'
              : 'w-80 h-full border-l shrink-0'
          }`}
        >
          {/* Header */}
          <div className="px-4 h-14 border-b border-zinc-800 flex items-center justify-between shrink-0 bg-zinc-950/40 select-none">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Claude AI Assistant
              </span>
            </div>
            
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleClearHistory}
                aria-label="Clear chat history"
                className="w-7 h-7 rounded-lg hover:bg-zinc-900 flex items-center justify-center text-zinc-650 hover:text-zinc-400 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close assistant panel"
                className="w-7 h-7 rounded-lg hover:bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Thread Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {messages.map((m, idx) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-lg bg-cyan-950/40 border border-cyan-800/30 flex items-center justify-center text-cyan-400 shrink-0">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-zinc-800 text-zinc-100 font-medium self-end rounded-tr-none'
                        : 'bg-cyan-500/5 border border-cyan-500/10 text-zinc-200 rounded-tl-none prose prose-invert prose-xs shadow-cyan-glow'
                    }`}
                  >
                    {m.content.split('\n').map((line, lidx) => (
                      <p key={lidx} className="m-0 break-words leading-relaxed">
                        {line.startsWith('- ') ? (
                          <span className="block pl-3 relative">
                            <span className="absolute left-0 text-cyan-400">•</span>
                            {line.substring(2)}
                          </span>
                        ) : line}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* AI loading state bubble */}
            {loading && messages[messages.length - 1].role === 'user' && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-lg bg-cyan-950/40 border border-cyan-800/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Sparkles className="w-3 h-3 animate-spin-slow" />
                </div>
                <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-xl rounded-tl-none px-3.5 py-2.5 text-xs text-cyan-400 font-mono animate-pulse">
                  Claude is formulating analysis...
                </div>
              </div>
            )}

            {/* End reference scroll */}
            <div ref={threadEndRef} />

            {/* Quick Suggestion Prompts */}
            {messages.length === 1 && !loading && (
              <div className="pt-4 space-y-2 border-t border-zinc-900 select-none">
                <span className="block text-[10px] text-zinc-600 uppercase tracking-widest font-semibold mb-1">
                  Quick Prompts
                </span>
                {SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(s.q)}
                    className="w-full text-left p-2.5 bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-850 rounded-xl text-xs text-zinc-400 hover:text-zinc-200 transition-all active:scale-[0.98] select-none block"
                  >
                    {s.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer query input */}
          <div className="p-3 border-t border-zinc-800 bg-zinc-950/40 shrink-0">
            <div className="flex gap-2 items-center bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                disabled={loading}
                placeholder="Ask AI anything..."
                className="flex-1 bg-transparent border-none outline-none text-xs text-zinc-200 focus:ring-0 placeholder:text-zinc-600 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                aria-label="Send query"
                className="w-6.5 h-6.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 disabled:opacity-30 transition-all flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
