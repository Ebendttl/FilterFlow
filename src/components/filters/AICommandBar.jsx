import React, { useRef, useState } from 'react';
import { Sparkles, ArrowRight, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { callClaude, parseClaudeJSON } from '../../lib/anthropic';

const SYSTEM_PROMPT = `You are a task filter assistant. The user describes what tasks they want to see. Extract filter parameters from their request and return ONLY valid JSON with this exact shape:
{
  "search": string or null,
  "statuses": array of: "todo"|"in_progress"|"in_review"|"done"|"blocked",
  "priorities": array of: "urgent"|"high"|"medium"|"low"|"none",
  "assignees": array of names from: Joan Akinseinde, Maya Chen, Iris Morgan, Theo Banks, Nora Patel, Leo Okafor,
  "projects": array of: "Core App"|"Render Deploy"|"Analytics Engine"|"Design System"|"API Integration",
  "dateRange": { "start": ISO date string or null, "end": ISO date string or null },
  "explanation": "a one-sentence plain-English explanation of what you filtered"
}
Return ONLY the JSON object. No markdown. No explanation outside JSON. Today's date is ${new Date().toISOString().split('T')[0]}.`;

export default function AICommandBar({ onFiltersApplied, commandBarRef }) {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  // Expose focus method via ref
  if (commandBarRef) {
    commandBarRef.current = {
      focus: () => { inputRef.current?.focus(); inputRef.current?.select(); }
    };
  }

  const handleSubmit = async () => {
    const query = value.trim();
    if (!query || loading) return;

    setLoading(true);
    try {
      const responseText = await callClaude(SYSTEM_PROMPT, query, [], 500);
      const parsed = parseClaudeJSON(responseText);

      // Apply filters
      const filterObj = {
        search: parsed.search || '',
        statuses: parsed.statuses || [],
        priorities: parsed.priorities || [],
        assignees: parsed.assignees || [],
        projects: parsed.projects || [],
        dateRange: {
          start: parsed.dateRange?.start || null,
          end: parsed.dateRange?.end || null,
        },
      };
      onFiltersApplied(filterObj);

      // Show AI toast
      toast.custom((t) => (
        <div className={`flex items-start gap-3 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl max-w-sm ${t.visible ? 'animate-enter' : 'animate-leave'}`}
          style={{ borderLeft: '3px solid #06b6d4' }}>
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-200">{parsed.explanation || 'Filters applied'}</p>
        </div>
      ), { duration: 4000, position: 'bottom-right' });

      setValue('');
    } catch (err) {
      if (err.message === 'MISSING_KEY') {
        toast.error('Add VITE_ANTHROPIC_API_KEY to your .env file', { style: { background:'#18181b', color:'#fafafa', border:'1px solid #3f3f46' } });
      } else {
        toast.error('AI filter failed — try manual filters', { style: { background:'#18181b', color:'#fafafa', border:'1px solid #3f3f46' } });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className="backdrop-blur-sm border-b px-4 sm:px-6 py-3 flex items-center gap-3 shrink-0 ai-glow"
      style={{
        background: 'linear-gradient(90deg, rgba(34,211,238,0.075), rgba(155,92,255,0.04), rgba(255,255,255,0.018))',
        borderColor: 'var(--glass-line)'
      }}
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{
          color: 'var(--accent-cyan)',
          background: 'color-mix(in srgb, var(--accent-cyan) 12%, transparent)',
          border: '1px solid color-mix(in srgb, var(--accent-cyan) 24%, transparent)'
        }}
      >
        <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin-slow' : ''}`} />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        placeholder='Ask AI to filter... e.g. "Show blocked urgent tasks assigned to Sarah"'
        className="flex-1 bg-transparent border-none outline-none text-sm text-ff-primary placeholder:text-ff-muted font-sans disabled:opacity-60"
        aria-label="AI natural language filter"
      />
      {loading ? (
        <span className="text-xs font-mono shrink-0 animate-pulse" style={{ color: 'var(--accent-cyan)' }}>Thinking...</span>
      ) : value.trim() ? (
        <button
          type="button"
          onClick={handleSubmit}
          className="p-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg transition-colors cursor-pointer shrink-0"
          aria-label="Submit AI filter"
        >
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      ) : (
        <span
          className="text-xs font-mono px-2 py-1 rounded-md shrink-0 hidden sm:inline border"
          style={{
            color: 'var(--accent-cyan)',
            background: 'color-mix(in srgb, var(--accent-cyan) 10%, transparent)',
            borderColor: 'color-mix(in srgb, var(--accent-cyan) 20%, transparent)'
          }}
        >
          AI Search
        </span>
      )}
    </div>
  );
}
