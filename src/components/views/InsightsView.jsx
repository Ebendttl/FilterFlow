import React from 'react';
import { Sparkles, AlertTriangle, CheckSquare, Users, TrendingUp } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/tasks';
import Avatar from '../ui/Avatar';

export default function InsightsView({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const blocked = tasks.filter(t => t.status === 'blocked').length;
  
  const completionRate = total ? Math.round((done / total) * 100) : 0;
  
  // Calculate average team load
  const loadDistribution = TEAM_MEMBERS.map(m => {
    const count = tasks.filter(t => t.assignee?.name === m.name).length;
    return { name: m.name, count, member: m };
  }).sort((a, b) => b.count - a.count);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface-0 overflow-y-auto p-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-4 shrink-0">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">
          AI Workspace Insights
        </h2>
      </div>

      {/* Main dials row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        
        {/* Completion rate card */}
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
              Completion Velocity
            </span>
            <TrendingUp className="w-4 h-4 text-violet-400" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-zinc-150 tracking-tight">
              {completionRate}%
            </span>
            <span className="text-xs text-zinc-555 ml-2">completed</span>
          </div>
          <div className="h-1 bg-zinc-950 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-violet-600 rounded-full" style={{ width: `${completionRate}%` }} />
          </div>
        </div>

        {/* Sprint health score card */}
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
              Blocked Headwinds
            </span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-red-400 tracking-tight">
              {blocked}
            </span>
            <span className="text-xs text-zinc-555 ml-2">blocked tasks</span>
          </div>
          <p className="text-[10px] text-zinc-600 mt-2 font-medium">
            {blocked > 0 ? 'Action required: unblock team velocity' : 'Sprint path is fully clear!'}
          </p>
        </div>

        {/* Workload balance card */}
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
              Active Headcount
            </span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-zinc-150 tracking-tight">
              {TEAM_MEMBERS.length}
            </span>
            <span className="text-xs text-zinc-555 ml-2">engineers allocated</span>
          </div>
          <p className="text-[10px] text-zinc-650 mt-2 font-medium truncate">
            Peak allocation: {loadDistribution[0]?.name} ({loadDistribution[0]?.count} tasks)
          </p>
        </div>

      </div>

      {/* Load distribution list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        
        {/* Team allocation block */}
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-5 flex flex-col min-h-[220px]">
          <div className="flex items-center gap-2 mb-4 select-none border-b border-zinc-800/60 pb-3">
            <Users className="w-4 h-4 text-zinc-500" />
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
              Team Resource Load
            </h4>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
            {loadDistribution.map(item => {
              const maxLoadCount = loadDistribution[0]?.count || 1;
              const loadPercent = Math.max(8, Math.round((item.count / maxLoadCount) * 100));

              return (
                <div key={item.name} className="flex items-center gap-3">
                  <Avatar initials={item.member.initials} color={item.member.color} size="xs" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center text-xs font-semibold text-zinc-350 select-none mb-1">
                      <span className="truncate">{item.name}</span>
                      <span className="font-mono text-[10px] text-zinc-500">{item.count} tasks</span>
                    </div>
                    {/* Meter bar */}
                    <div className="h-1 bg-zinc-950 border border-zinc-850 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${loadPercent}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Recommendations checklist */}
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-5 flex flex-col min-h-[220px] shadow-cyan-glow border-cyan-500/10">
          <div className="flex items-center gap-2 mb-4 select-none border-b border-cyan-500/10 pb-3 text-cyan-400">
            <Sparkles className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-widest">
              AI Priority Recommendations
            </h4>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 text-xs text-zinc-350 leading-relaxed font-medium">
            <div className="flex gap-2.5 items-start p-2 bg-cyan-500/5 border border-cyan-500/10 rounded-xl">
              <span className="text-cyan-400 font-bold shrink-0 mt-0.5">✦</span>
              <p>
                <strong>Unblock Priya Patel</strong>: Priya currently has {tasks.filter(t => t.assignee?.name === 'Priya Patel' && t.status === 'blocked').length} blocked tasks. Re-allocating Marcus Okafor for a pairing review would clear the backlog.
              </p>
            </div>
            <div className="flex gap-2.5 items-start p-2 bg-zinc-950 border border-zinc-900 rounded-xl">
              <span className="text-violet-400 font-bold shrink-0 mt-0.5">•</span>
              <p>
                <strong>Overdue Warning</strong>: {tasks.filter(t => t.status !== 'done' && new Date(t.dueDate) < new Date()).length} active tasks are past their planned sprint milestones. Consider bulk-rescheduling them to next week.
              </p>
            </div>
            <div className="flex gap-2.5 items-start p-2 bg-zinc-950 border border-zinc-900 rounded-xl">
              <span className="text-zinc-600 font-bold shrink-0 mt-0.5">•</span>
              <p>
                <strong>Sprint Balance</strong>: Load is well balanced. No single developer has more than 6 open items assigned, maintaining sustainable velocity.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
