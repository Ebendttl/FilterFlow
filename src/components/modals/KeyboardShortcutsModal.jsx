import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SHORTCUTS = [
  { keys: ['⌘', 'K'], label: 'Focus AI command bar' },
  { keys: ['⌘', 'J'], label: 'Toggle AI chat assistant panel' },
  { keys: ['⌘', 'N'], label: 'Open Create Task modal' },
  { keys: ['Esc'],     label: 'Close active overlay / dismiss dropdowns' },
  { keys: ['?'],       label: 'Open this shortcuts helper guide' },
];

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
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
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Centered Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden select-none"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Keyboard Shortcuts
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="w-7 h-7 rounded-lg hover:bg-zinc-850 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Grid content */}
              <div className="p-6 space-y-4 font-sans text-xs">
                <p className="text-zinc-500 mb-4">
                  Boost your workspace efficiency with these system-wide hotkeys:
                </p>
                <div className="space-y-3">
                  {SHORTCUTS.map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-zinc-800/40 pb-2">
                      <span className="text-zinc-300 font-medium">
                        {s.label}
                      </span>
                      <div className="flex gap-1">
                        {s.keys.map((k, ki) => (
                          <kbd
                            key={ki}
                            className="bg-zinc-950 border border-zinc-850 text-[10px] font-bold font-mono text-zinc-400 px-2 py-0.5 rounded shadow-sm min-w-5 text-center"
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3.5 border-t border-zinc-800 text-[10px] text-zinc-600 text-center uppercase tracking-widest font-mono bg-zinc-950 select-none">
                Press ? anytime to open guide
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
