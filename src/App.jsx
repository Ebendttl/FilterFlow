import React, { useState, useRef, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

// Layout components
import Sidebar from './components/layout/Sidebar';
import TopNav from './components/layout/TopNav';
import MobileSidebarDrawer from './components/layout/MobileSidebarDrawer';
import AIChatPanel from './components/layout/AIChatPanel';
import Footer from './components/layout/Footer';

// Filter components
import AICommandBar from './components/filters/AICommandBar';
import FilterToolbar from './components/filters/FilterToolbar';
import ActiveFilterBar from './components/filters/ActiveFilterBar';

// View components
import TaskTable from './components/tasks/TaskTable';
import TaskMobileList from './components/tasks/TaskMobileList';
import BoardView from './components/views/BoardView';
import CalendarView from './components/views/CalendarView';
import TimelineView from './components/views/TimelineView';
import ProjectsView from './components/views/ProjectsView';
import SprintsView from './components/views/SprintsView';
import ReportsView from './components/views/ReportsView';
import InsightsView from './components/views/InsightsView';

// Overlay components
import TaskDetailSheet from './components/tasks/TaskDetailSheet';
import BulkActionsBar from './components/tasks/BulkActionsBar';
import NewTaskModal from './components/modals/NewTaskModal';
import KeyboardShortcutsModal from './components/modals/KeyboardShortcutsModal';
import CommandPalette from './components/modals/CommandPalette';

// Hooks
import { useTaskStore } from './hooks/useTaskStore';
import { useFilters } from './hooks/useFilters';
import { useIsMobile } from './hooks/useMediaQuery';
import { useKeyboard } from './hooks/useKeyboard';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const isMobile = useIsMobile();
  const searchInputRef = useRef(null);
  const commandBarRef = useRef(null);

  // ─── Theme System ────────────────────────────────────────────
  const { theme, themeName, themes, setTheme, isDark, isSystem } = useTheme();

  // ─── Centralized Task Store ──────────────────────────────────
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    duplicateTask,
    moveTasks,
    newTaskId
  } = useTaskStore();

  // ─── Advanced Filters Hook ───────────────────────────────────
  const {
    filters,
    filteredTasks,
    activeFilterCount,
    setSearch,
    toggleStatus,
    togglePriority,
    toggleAssignee,
    toggleProject,
    setDateRange,
    setSort,
    setAllFilters,
    clearFilter,
    clearAllFilters
  } = useFilters(tasks);

  // ─── View & Overlay State ────────────────────────────────────
  const [activeView, setActiveView] = useState('all-tasks');
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // ─── Toast Position — Mobile vs Desktop ─────────────────────
  const [toastPosition, setToastPosition] = useState(
    window.innerWidth < 768 ? 'top-center' : 'bottom-right'
  );

  useEffect(() => {
    const handleResize = () => {
      setToastPosition(window.innerWidth < 768 ? 'top-center' : 'bottom-right');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─── Global Keyboard Shortcuts ───────────────────────────────
  useKeyboard({
    'Meta+k': () => {
      setIsCommandPaletteOpen(true);
    },
    'Control+k': () => {
      setIsCommandPaletteOpen(true);
    },
    'Meta+j': () => {
      setIsAiPanelOpen(o => !o);
    },
    'Control+j': () => {
      setIsAiPanelOpen(o => !o);
    },
    'Meta+n': () => {
      setIsNewTaskOpen(true);
    },
    'Control+n': () => {
      setIsNewTaskOpen(true);
    },
    'escape': () => {
      if (isCommandPaletteOpen) { setIsCommandPaletteOpen(false); return; }
      setIsNewTaskOpen(false);
      setIsShortcutsOpen(false);
      setSelectedTask(null);
      setIsSidebarOpen(false);
    },
    '?': (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (tag !== 'input' && tag !== 'textarea') {
        setIsShortcutsOpen(true);
      }
    }
  });

  // ─── Derived task lists ──────────────────────────────────────
  const displayedTasks = activeView === 'my-tasks'
    ? filteredTasks.filter(t => t.assignee?.name === 'Alex Johnson')
    : filteredTasks;

  // ─── Selection Helpers ───────────────────────────────────────
  const handleSelectId = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const listToSelect = displayedTasks.map(t => t.id);
    if (selectedIds.length === listToSelect.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(listToSelect);
    }
  };

  const handleUpdateTasks = (ids, patch) => {
    ids.forEach(id => updateTask(id, patch));
  };

  const handleDeleteSelected = (ids) => {
    ids.forEach(id => deleteTask(id));
  };

  return (
    <div
      className="flex h-screen w-screen overflow-hidden font-sans antialiased relative"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--bg-border) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-full shrink-0 relative z-10">
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          onToggleAiPanel={() => setIsAiPanelOpen(o => !o)}
          onOpenSettings={() => toast('Settings panel coming soon', {
            style: { background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--bg-border)' }
          })}
          tasks={tasks}
        />
      </div>

      {/* Mobile Drawer */}
      <MobileSidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeView={activeView}
        onViewChange={setActiveView}
        onToggleAiPanel={() => setIsAiPanelOpen(o => !o)}
        onOpenSettings={() => toast('Settings panel coming soon', {
          style: { background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--bg-border)' }
        })}
        tasks={tasks}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10 overflow-hidden">

        {/* Top Navbar */}
        <TopNav
          searchValue={filters.search}
          onSearchChange={setSearch}
          onOpenSidebarDrawer={() => setIsSidebarOpen(true)}
          onOpenNewTaskModal={() => setIsNewTaskOpen(true)}
          onOpenShortcutsModal={() => setIsShortcutsOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          searchInputRef={searchInputRef}
          theme={theme}
          themeName={themeName}
          themes={themes}
          setTheme={setTheme}
          isSystem={isSystem}
          tasks={tasks}
        />

        {/* AI Command Bar */}
        {(activeView === 'all-tasks' || activeView === 'my-tasks' || activeView === 'board') && (
          <AICommandBar
            onFiltersApplied={setAllFilters}
            commandBarRef={commandBarRef}
          />
        )}

        {/* Traditional Dropdown Filters */}
        {(activeView === 'all-tasks' || activeView === 'my-tasks' || activeView === 'board') && (
          <FilterToolbar
            filters={filters}
            toggleStatus={toggleStatus}
            togglePriority={togglePriority}
            toggleAssignee={toggleAssignee}
            toggleProject={toggleProject}
            setDateRange={setDateRange}
            setSort={setSort}
          />
        )}

        {/* Active filters indicator row */}
        {(activeView === 'all-tasks' || activeView === 'my-tasks' || activeView === 'board') && (
          <ActiveFilterBar
            filters={filters}
            activeFilterCount={activeFilterCount}
            clearFilter={clearFilter}
            clearAllFilters={clearAllFilters}
          />
        )}

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-auto flex flex-col min-h-0 relative" style={{ background: 'var(--bg-base)' }}>
          {(() => {
            const viewFiltersShown = activeView === 'all-tasks' || activeView === 'my-tasks';

            if (viewFiltersShown || activeView === 'board') {
              if (activeView === 'board') {
                return (
                  <BoardView
                    tasks={displayedTasks}
                    onMoveTasks={moveTasks}
                    onTaskClick={setSelectedTask}
                  />
                );
              }
              return isMobile ? (
                <TaskMobileList
                  tasks={displayedTasks}
                  onRowClick={setSelectedTask}
                  clearAllFilters={clearAllFilters}
                  onAskAI={() => commandBarRef.current?.focus()}
                />
              ) : (
                <TaskTable
                  tasks={displayedTasks}
                  newTaskId={newTaskId}
                  isLoading={false}
                  selectedIds={selectedIds}
                  onSelectId={handleSelectId}
                  onSelectAll={handleSelectAll}
                  onRowClick={setSelectedTask}
                  onEdit={setSelectedTask}
                  onDuplicate={duplicateTask}
                  onDelete={deleteTask}
                  onStatusChange={updateTask}
                  onUpdateTask={updateTask}
                  onSetSort={setSort}
                  filters={filters}
                  clearAllFilters={clearAllFilters}
                  onAskAI={() => commandBarRef.current?.focus()}
                />
              );
            }
            if (activeView === 'calendar') return <CalendarView tasks={filteredTasks} onTaskClick={setSelectedTask} />;
            if (activeView === 'timeline') return <TimelineView tasks={filteredTasks} onTaskClick={setSelectedTask} />;
            if (activeView === 'projects') return <ProjectsView tasks={tasks} onTaskClick={setSelectedTask} />;
            if (activeView === 'sprints') return <SprintsView tasks={tasks} onTaskClick={setSelectedTask} />;
            if (activeView === 'reports') return <ReportsView tasks={tasks} />;
            if (activeView === 'insights') return <InsightsView tasks={tasks} />;
            return null;
          })()}

          {/* Footer — scrolls naturally with content */}
          <Footer
            tasks={tasks}
            currentTheme={theme}
            onOpenShortcuts={() => setIsShortcutsOpen(true)}
          />
        </main>

      </div>

      {/* AI Chat Panel */}
      <AIChatPanel
        isOpen={isAiPanelOpen}
        onClose={() => setIsAiPanelOpen(false)}
        tasks={tasks}
        onAddTask={addTask}
        isMobile={isMobile}
      />

      {/* Task Detail Slide-over */}
      <TaskDetailSheet
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdate={updateTask}
        onDelete={deleteTask}
        isMobile={isMobile}
      />

      {/* Bulk Actions Float Bar */}
      <BulkActionsBar
        selectedIds={selectedIds}
        tasks={displayedTasks}
        onClearSelection={() => setSelectedIds([])}
        onUpdateTasks={handleUpdateTasks}
        onDeleteSelected={handleDeleteSelected}
      />

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onAddTask={addTask}
      />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onViewChange={(view) => { setActiveView(view); setIsCommandPaletteOpen(false); }}
        onOpenNewTask={() => { setIsNewTaskOpen(true); }}
        onToggleAiPanel={() => { setIsAiPanelOpen(o => !o); }}
        onFocusCommandBar={() => { setTimeout(() => commandBarRef.current?.focus(), 50); }}
        toggleStatus={toggleStatus}
        togglePriority={togglePriority}
        clearAllFilters={clearAllFilters}
        setTheme={setTheme}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Global Toaster */}
      <Toaster
        position={toastPosition}
        toastOptions={{
          style: {
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--bg-border)',
            borderRadius: '12px',
            fontSize: '13px',
            fontFamily: 'DM Sans, system-ui, sans-serif',
          }
        }}
      />
    </div>
  );
}
