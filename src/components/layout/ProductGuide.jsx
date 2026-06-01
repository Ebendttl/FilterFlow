import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight, Check, Command, ListFilter, PanelLeft, Search,
  Sparkles, Table2, X, Zap
} from 'lucide-react';

const STEPS = [
  {
    eyebrow: 'Start Here',
    title: 'Your work, already filtered into focus.',
    body: 'FilterFlow opens on the issue list: search, status, priority, assignee, date range, and project filters are all live controls.',
    Icon: Table2,
    accent: '#9b5cff',
  },
  {
    eyebrow: 'Command Center',
    title: 'Jump anywhere without hunting.',
    body: 'Use the command palette for views, themes, filters, shortcuts, and task creation. It is the fastest path through the app.',
    Icon: Command,
    accent: '#22d3ee',
    action: 'Open Command Palette',
  },
  {
    eyebrow: 'Smart Filtering',
    title: 'Turn noisy task lists into clean decisions.',
    body: 'Combine project picks from the sidebar with the top filters to isolate overdue, assigned, blocked, or high-priority work.',
    Icon: ListFilter,
    accent: '#fbbf24',
  },
  {
    eyebrow: 'AI Workflow',
    title: 'Let the assistant draft, sort, and shape tasks.',
    body: 'The AI panel can create task drafts and help you reason through the list without leaving the dashboard.',
    Icon: Sparkles,
    accent: '#34d399',
    action: 'Open AI Assistant',
  },
];

export default function ProductGuide({
  isOpen,
  onClose,
  onOpenCommandPalette,
  onOpenNewTask,
  onAskAI,
}) {
  const [index, setIndex] = useState(0);
  const step = STEPS[index];
  const isLast = index === STEPS.length - 1;
  const Icon = step.Icon;

  const runAction = () => {
    if (step.action === 'Open Command Palette') {
      onClose();
      setTimeout(onOpenCommandPalette, 120);
      return;
    }
    if (step.action === 'Open AI Assistant') {
      onClose();
      setTimeout(onAskAI, 120);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 p-3 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.section
            className="max-h-[calc(100dvh-24px)] w-full max-w-4xl overflow-y-auto rounded-2xl border shadow-2xl"
            style={{
              background: 'linear-gradient(180deg, #111118, #08080d)',
              borderColor: 'rgba(255,255,255,0.10)',
            }}
            initial={{ y: 28, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="grid min-h-[min(520px,calc(100dvh-24px))] grid-cols-1 md:grid-cols-[0.92fr_1.08fr]">
              <div
                className="relative hidden overflow-hidden border-r p-7 md:block"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 30% 20%, ${step.accent}33, transparent 34%)` }} />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-8 flex items-center gap-3">
                      <FilterFlowMark />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Product Guide</div>
                        <div className="text-lg font-bold text-white">FilterFlow</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {STEPS.map((item, itemIndex) => {
                        const StepIcon = item.Icon;
                        const active = itemIndex === index;
                        const complete = itemIndex < index;
                        return (
                          <button
                            key={item.title}
                            type="button"
                            onClick={() => setIndex(itemIndex)}
                            className="flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors"
                            style={{
                              background: active ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.025)',
                              borderColor: active ? `${item.accent}66` : 'rgba(255,255,255,0.07)'
                            }}
                          >
                            <span
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                              style={{ color: item.accent, background: `${item.accent}18` }}
                            >
                              {complete ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-white">{item.eyebrow}</span>
                              <span className="block truncate text-xs" style={{ color: 'var(--text-muted)' }}>{item.title}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-xl border p-4" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.22)' }}>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold" style={{ color: step.accent }}>
                      <Zap className="h-4 w-4" />
                      Mobile first, desktop polished
                    </div>
                    <p className="text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>
                      The dashboard adapts from compact cards on mobile to a full issue table on larger screens.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex min-h-0 flex-col p-5 sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 md:hidden">
                    <FilterFlowMark />
                    <span className="font-bold text-white">FilterFlow</span>
                  </div>
                  <div className="hidden text-xs font-bold uppercase tracking-[0.2em] md:block" style={{ color: step.accent }}>
                    {step.eyebrow}
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border"
                    style={{ color: 'var(--text-muted)', borderColor: 'rgba(255,255,255,0.08)' }}
                    aria-label="Close product guide"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-1 flex-col justify-center">
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div
                      className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border"
                      style={{ color: step.accent, background: `${step.accent}16`, borderColor: `${step.accent}55` }}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] md:hidden" style={{ color: step.accent }}>
                      {step.eyebrow}
                    </p>
                    <h2 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                      {step.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-7" style={{ color: 'var(--text-secondary)' }}>
                      {step.body}
                    </p>

                    <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <GuideChip Icon={Search} label="Search" />
                      <GuideChip Icon={PanelLeft} label="Projects" />
                      <GuideChip Icon={Sparkles} label="AI" />
                    </div>
                  </motion.div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    {STEPS.map((item, itemIndex) => (
                      <span
                        key={item.title}
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: itemIndex === index ? 26 : 8,
                          background: itemIndex === index ? step.accent : 'rgba(255,255,255,0.18)'
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {step.action && (
                      <button
                        type="button"
                        onClick={runAction}
                        className="hidden h-10 items-center gap-2 rounded-lg border px-4 text-sm font-semibold sm:flex"
                        style={{ color: step.accent, borderColor: `${step.accent}55`, background: `${step.accent}12` }}
                      >
                        {step.action}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (isLast) {
                          onClose();
                          setTimeout(onOpenNewTask, 120);
                        } else {
                          setIndex(i => i + 1);
                        }
                      }}
                      className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold text-white sm:flex-none"
                      style={{ background: 'linear-gradient(135deg, var(--accent), #7dd3fc)' }}
                    >
                      {isLast ? 'Create first task' : 'Continue'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GuideChip({ Icon, label }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border p-3" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.035)' }}>
      <Icon className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
      <span className="text-sm font-semibold text-white">{label}</span>
    </div>
  );
}

function FilterFlowMark() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(180deg, #7c3aed, #5b21b6)' }}>
      <svg width="21" height="21" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 2H14V6H8V9H12V13H8V18H4Z" fill="white" />
        <path d="M10 5H18V9H13V12H16V15H13V18H10Z" fill="white" fillOpacity="0.58" />
      </svg>
    </div>
  );
}
