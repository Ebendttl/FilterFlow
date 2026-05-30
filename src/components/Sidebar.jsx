import React from 'react';
import { 
  CheckSquare, 
  LayoutList, 
  FolderOpen, 
  Zap, 
  Columns, 
  Calendar, 
  GitBranch, 
  BarChart2, 
  TrendingUp, 
  ChevronRight 
} from 'lucide-react';
import Avatar from './Avatar';

export default function Sidebar() {
  return (
    <aside className="w-[240px] h-screen bg-surface-1 border-r border-customBorder flex flex-col justify-between sticky top-0 shrink-0 select-none">
      
      {/* Top Logo Container */}
      <div>
        <div className="h-14 flex items-center justify-between px-5 border-b border-customBorder/60">
          <div className="flex items-center gap-2">
            {/* Geometric logo mark: two overlapping squares */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <rect x="2" y="2" width="11" height="11" rx="2" fill="#6366f1" />
              <rect x="7" y="7" width="11" height="11" rx="2" fill="#4f46e5" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
            <span className="text-[15px] font-bold text-customText-primary tracking-tight">
              FilterFlow
            </span>
          </div>
          <span className="text-[10px] font-semibold text-customText-tertiary bg-surface-2 px-1.5 py-0.5 rounded border border-customBorder/50 font-mono">
            v2.4.1
          </span>
        </div>

        {/* Navigation Lists */}
        <div className="mt-6 space-y-6">
          {/* Group 1: Workspace */}
          <div>
            <div className="section-label px-5 mb-1.5">
              Workspace
            </div>
            <nav className="px-2 space-y-0.5" aria-label="Workspace navigation">
              <a 
                href="#my-tasks" 
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm nav-item-active group premium-transition"
                aria-current="page"
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-indigo-600" />
                  <span>My Tasks</span>
                </div>
                <span className="text-[11px] bg-indigo-200/50 text-indigo-700 px-1.5 py-0.5 rounded font-semibold">
                  12
                </span>
              </a>
              <a 
                href="#all-tasks" 
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm nav-item-inactive premium-transition"
              >
                <LayoutList className="w-4 h-4 text-customText-secondary group-hover:text-customText-primary" />
                <span>All Tasks</span>
              </a>
              <a 
                href="#projects" 
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm nav-item-inactive premium-transition"
              >
                <FolderOpen className="w-4 h-4 text-customText-secondary group-hover:text-customText-primary" />
                <span>Projects</span>
              </a>
              <a 
                href="#sprints" 
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm nav-item-inactive premium-transition"
              >
                <Zap className="w-4 h-4 text-customText-secondary group-hover:text-customText-primary" />
                <span>Sprints</span>
              </a>
            </nav>
          </div>

          {/* Group 2: Views */}
          <div>
            <div className="section-label px-5 mb-1.5">
              Views
            </div>
            <nav className="px-2 space-y-0.5" aria-label="Views navigation">
              <a 
                href="#board" 
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm nav-item-inactive premium-transition"
              >
                <Columns className="w-4 h-4 text-customText-secondary group-hover:text-customText-primary" />
                <span>Board</span>
              </a>
              <a 
                href="#calendar" 
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm nav-item-inactive premium-transition"
              >
                <Calendar className="w-4 h-4 text-customText-secondary group-hover:text-customText-primary" />
                <span>Calendar</span>
              </a>
              <a 
                href="#timeline" 
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm nav-item-inactive premium-transition"
              >
                <GitBranch className="w-4 h-4 text-customText-secondary group-hover:text-customText-primary" />
                <span>Timeline</span>
              </a>
            </nav>
          </div>

          {/* Group 3: Analytics */}
          <div>
            <div className="section-label px-5 mb-1.5">
              Analytics
            </div>
            <nav className="px-2 space-y-0.5" aria-label="Analytics navigation">
              <a 
                href="#reports" 
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm nav-item-inactive premium-transition"
              >
                <BarChart2 className="w-4 h-4 text-customText-secondary group-hover:text-customText-primary" />
                <span>Reports</span>
              </a>
              <a 
                href="#insights" 
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm nav-item-inactive premium-transition"
              >
                <TrendingUp className="w-4 h-4 text-customText-secondary group-hover:text-customText-primary" />
                <span>Insights</span>
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Footer Profile row */}
      <div>
        <div className="h-px bg-customBorder/60" />
        <div className="px-4 py-3 flex items-center justify-between hover:bg-surface-2/65 transition-colors cursor-pointer group active:scale-[0.99] duration-150">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar initials="AJ" color="bg-brand-primary" name="Alex Johnson" size="lg" showTooltip={false} />
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-semibold text-customText-primary leading-tight">
                Alex Johnson
              </span>
              <span className="text-[11px] text-customText-tertiary truncate leading-none mt-0.5">
                alex@acme.co
              </span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-customText-tertiary group-hover:text-customText-secondary transition-colors" />
        </div>
      </div>

    </aside>
  );
}
