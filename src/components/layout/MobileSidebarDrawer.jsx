import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';

export default function MobileSidebarDrawer({
  isOpen,
  onClose,
  activeView,
  onViewChange,
  onToggleAiPanel,
  onOpenSettings,
  tasks,
  filters,
  toggleProject,
  clearProjectFilter
}) {
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 md:hidden transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed top-0 left-0 h-full w-[min(88vw,300px)] z-50 md:hidden bg-zinc-950 flex flex-col border-r border-zinc-800"
          >
            <Sidebar
              activeView={activeView}
              onViewChange={onViewChange}
              onToggleAiPanel={onToggleAiPanel}
              onOpenSettings={onOpenSettings}
              tasks={tasks}
              filters={filters}
              toggleProject={toggleProject}
              clearProjectFilter={clearProjectFilter}
              isMobileDrawer={true}
              onCloseMobileDrawer={onClose}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
