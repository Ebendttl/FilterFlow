import React, { useState } from 'react';
import { BarChart2, Sparkles, FileText, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { callClaude } from '../../lib/anthropic';

export default function ReportsView({ tasks }) {
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    setLoading(true);
    setReport('');
    try {
      const prompt = `Analyze this project task list and output a professional, high-fidelity Executive Summary Report in Markdown. Use proper hierarchy, bullet points, and callouts.
Include:
1) Executive Summary (high-level velocity and health)
2) Task Status Analysis (percentages and numbers)
3) Critical Bottlenecks (urgent, blocked, or high priority tasks)
4) Suggested Strategic Next Steps for the Engineering Team

Current tasks state:
${JSON.stringify(tasks.map(t => ({ id: t.id, title: t.title, status: t.status, priority: t.priority, assignee: t.assignee.name, project: t.project })))}`;

      const response = await callClaude(
        'You are a high-fidelity director of engineering. Create stellar executive reports.',
        prompt,
        [],
        600
      );

      // Token rendering effect
      let currentText = '';
      const tokens = response.split(' ');
      for (let i = 0; i < tokens.length; i++) {
        await new Promise(r => setTimeout(r, 12));
        currentText += (i === 0 ? '' : ' ') + tokens[i];
        setReport(currentText);
      }

      toast.success('✦ Project report generated successfully', {
        style: { background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46', borderLeft: '3px solid #06b6d4', borderRadius: '12px' }
      });
    } catch (err) {
      toast.error('Report generation failed. Verify API Key.', {
        style: { background: '#18181b', color: '#fafafa', border: '1px solid #3f3f46', borderRadius: '12px' }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface-0 overflow-y-auto p-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 shrink-0">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-zinc-500" />
          <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">
            AI Sprint Reports
          </h2>
        </div>

        {report && (
          <button
            type="button"
            onClick={() => toast('Sprint Report downloaded', { style: { background:'#18181b', color:'#fafafa', border:'1px solid #3f3f46' } })}
            className="flex items-center gap-1.5 border border-zinc-800 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200 text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer select-none"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        )}
      </div>

      {/* Main card */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 flex flex-col min-h-[300px]">
        {report || loading ? (
          <div className="flex-1 flex flex-col justify-between min-h-0">
            {loading && !report ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <Sparkles className="w-8 h-8 text-cyan-400 animate-spin-slow" />
                <p className="text-xs text-cyan-400 font-mono animate-pulse">
                  Claude is aggregating task metrics and generating report...
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                <div className="flex items-center gap-2 text-cyan-400 mb-2 border-b border-zinc-800/60 pb-3">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Executive Sprint Summary
                  </span>
                </div>
                <div className="prose prose-invert prose-xs text-zinc-200 text-xs max-w-none space-y-4 leading-relaxed font-sans">
                  {report.split('\n').map((line, idx) => {
                    if (line.startsWith('# ')) {
                      return <h3 key={idx} className="text-sm font-bold text-zinc-50 uppercase tracking-widest mt-6 mb-2 border-b border-zinc-800 pb-2">{line.substring(2)}</h3>;
                    }
                    if (line.startsWith('## ')) {
                      return <h4 key={idx} className="text-xs font-bold text-violet-400 uppercase tracking-wider mt-4 mb-2">{line.substring(3)}</h4>;
                    }
                    if (line.startsWith('### ')) {
                      return <h5 key={idx} className="text-[11px] font-bold text-cyan-400 uppercase mt-3 mb-1">{line.substring(4)}</h5>;
                    }
                    if (line.startsWith('- ')) {
                      return (
                        <div key={idx} className="pl-3 relative mt-1.5">
                          <span className="absolute left-0 text-cyan-400">•</span>
                          {line.substring(2)}
                        </div>
                      );
                    }
                    return <p key={idx} className="leading-relaxed mt-2">{line}</p>;
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-5 select-none">
            <div className="w-16 h-16 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 shadow-cyan-glow">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wide">
                Generate executive sprint summary
              </h3>
              <p className="text-xs text-zinc-550 max-w-sm mt-1 mx-auto leading-relaxed">
                Uses Anthropic API to scan all current tasks, analyze status breakdowns, highlight critical bottlenecks, and formulate development velocity summaries.
              </p>
            </div>
            <button
              type="button"
              onClick={handleGenerateReport}
              className="h-10 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold px-5 rounded-xl transition-all duration-150 active:scale-[0.98] shadow-sm cursor-pointer select-none flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Executive Report</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
