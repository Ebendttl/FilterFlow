import React, { useState, useRef, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

// Layout
import Sidebar              from './components/layout/Sidebar';
import TopNav               from './components/layout/TopNav';
import AIChatPanel          from './components/layout/AIChatPanel';
import Footer               from './components/layout/Footer';

// Mobile drawer — graceful fallback if component doesn't exist
let MobileSidebarDrawer;
try { MobileSidebarDrawer = require('./components/layout/MobileSidebarDrawer').default; }
catch { MobileSidebarDrawer = null; }

// Filters
import AICommandBar   from './components/filters/AICommandBar';
import FilterToolbar  from './components/filters/FilterToolbar';
import ActiveFilterBar from './components/filters/ActiveFilterBar';

// Views
import TaskTable      from './components/tasks/TaskTable';
import BoardView      from './components/views/BoardView';
import CalendarView   from './components/views/CalendarView';
import TimelineView   from './components/views/TimelineView';
import ProjectsView   from './components/views/ProjectsView';
import SprintsView    from './components/views/SprintsView';
import ReportsView    from './components/views/ReportsView';
import InsightsView   from './components/views/InsightsView';

// Mobile list — graceful fallback
let TaskMobileList;
try { TaskMobileList = require('./components/tasks/TaskMobileList').default; }
catch { TaskMobileList = null; }

// Overlays / Modals
import TaskDetailSheet       from './components/tasks/TaskDetailSheet';
import BulkActionsBar        from './components/tasks/BulkActionsBar';
import NewTaskModal          from './components/modals/NewTaskModal';
import KeyboardShortcutsModal from './components/modals/KeyboardShortcutsModal';
import CommandPalette        from './components/modals/CommandPalette';

// Hooks
import { useTaskStore }  from './hooks/useTaskStore';
import { useFilters }    from './hooks/useFilters';
import { useIsMobile }   from './hooks/useMediaQuery';
import { useKeyboard }   from './hooks/useKeyboard';
import { useTheme }      from './hooks/useTheme';

export default function App() {
  const isMobile      = useIsMobile();
  const searchInputRef = useRef(null);
  const commandBarRef  = useRef(null);

  // ── Theme ───────────────────────────────────────────────────
  const { theme, isDark, toggleTheme, setTheme } = useTheme();

  // ── Tasks ───────────────────────────────────────────────────
  const { tasks, addTask, updateTask, deleteTask, duplicateTask, moveTasks, newTaskId } = useTaskStore();

  // ── Filters ─────────────────────────────────────────────────
  const {
    filters, filteredTasks, activeFilterCount,
    setSearch, toggleStatus, togglePriority, toggleAssignee, toggleProject,
    setDateRange, setSort, setAllFilters, clearFilter, clearAllFilters
  } = useFilters(tasks);

  // ── UI State ────────────────────────────────────────────────
  const [activeView,            setActiveView]            = useState('all-tasks');
  const [selectedTask,          setSelectedTask]          = useState(null);
  const [selectedIds,           setSelectedIds]           = useState([]);
  const [isSidebarOpen,         setIsSidebarOpen]         = useState(false);
  const [isAiPanelOpen,         setIsAiPanelOpen]         = useState(false);
  const [isNewTaskOpen,         setIsNewTaskOpen]          = useState(false);
  const [isShortcutsOpen,       setIsShortcutsOpen]       = useState(false);
  const [isCommandPaletteOpen,  setIsCommandPaletteOpen]  = useState(false);

  // ── Global Keyboard Shortcuts ───────────────────────────────
  useKeyboard({
    'Meta+k':    () => setIsCommandPaletteOpen(true),
    'Control+k': () => setIsCommandPaletteOpen(true),
    'Meta+j':    () => setIsAiPanelOpen(o => !o),
    'Control+j': () => setIsAiPanelOpen(o => !o),
    'Meta+n':    () => setIsNewTaskOpen(true),
    'Control+n': () => setIsNewTaskOpen(true),
    'escape': () => {
      if (isCommandPaletteOpen) { setIsCommandPaletteOpen(false); return; }
      setIsNewTaskOpen(false);
      setIsShortcutsOpen(false);
      setSelectedTask(null);
      setIsSidebarOpen(false);
    },
    '?': (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag !== 'input' && tag !== 'textarea') setIsShortcutsOpen(true);
    }
  });

  // ── Derived data ────────────────────────────────────────────
  const displayedTasks = activeView === 'my-tasks'
    ? filteredTasks.filter(t => t.assignee?.name === 'Alex Johnson')
    : filteredTasks;

  // ── Selection helpers ───────────────────────────────────────
  const handleSelectId  = (id) => setSelectedIds(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  );
  const handleSelectAll = () => {
    const ids = displayedTasks.map(t => t.id);
    setSelectedIds(selectedIds.length === ids.length ? [] : ids);
  };
  const handleUpdateTasks  = (ids, patch) => ids.forEach(id => updateTask(id, patch));
  const handleDeleteSelected = (ids) => ids.forEach(id => deleteTask(id));

  const showFilters = activeView === 'all-tasks' || activeView === 'my-tasks' || activeView === 'board';

  const toastStyle = {
    style: {
      background:   'var(--bg-elevated)',
      color:        'var(--text-primary)',
      border:       '1px solid var(--bg-border)',
      borderRadius: '12px',
      fontSize:     '13px',
      fontFamily:   'DM Sans, system-ui, sans-serif',
    }
  };

  return (
    <div
      className="flex h-screen w-screen overflow-hidden font-sans antialiased"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage: 'radial-gradient(var(--bg-border) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ── Desktop Sidebar ────────────────────────────────── */}
      <div className="hidden md:block w-64 h-full shrink-0 relative z-10">
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          onToggleAiPanel={() => setIsAiPanelOpen(o => !o)}
          onOpenSettings={() => toast('Settings coming soon', toastStyle)}
          tasks={tasks}
        />
      </div>

      {/* ── Mobile Drawer ──────────────────────────────────── */}
      {MobileSidebarDrawer && (
        <MobileSidebarDrawer
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeView={activeView}
          onViewChange={setActiveView}
          onToggleAiPanel={() => setIsAiPanelOpen(o => !o)}
          onOpenSettings={() => toast('Settings coming soon', toastStyle)}
          tasks={tasks}
        />
      )}

      {/* ── Main workspace ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative z-10">

        <TopNav
          searchValue={filters.search}
          onSearchChange={setSearch}
          onOpenSidebarDrawer={() => setIsSidebarOpen(true)}
          onOpenNewTaskModal={() => setIsNewTaskOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          searchInputRef={searchInputRef}
          isDark={isDark}
          toggleTheme={toggleTheme}
          tasks={tasks}
        />

        {/* Filter bars — only for task list views */}
        {showFilters && (
          <AICommandBar
            onFiltersApplied={setAllFilters}
            commandBarRef={commandBarRef}
          />
        )}
        {showFilters && (
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
        {showFilters && (
          <ActiveFilterBar
            filters={filters}
            activeFilterCount={activeFilterCount}
            clearFilter={clearFilter}
            clearAllFilters={clearAllFilters}
          />
        )}

        {/* ── Scrollable main area ───────────────────────── */}
        <main
          className="flex-1 overflow-auto flex flex-col min-h-0"
          style={{ background: 'var(--bg-base)' }}
        >
          {/* View Router */}
          {(() => {
            if (activeView === 'board')
              return <BoardView tasks={displayedTasks} onMoveTasks={moveTasks} onTaskClick={setSelectedTask} />;

            if (activeView === 'calendar')
              return <CalendarView tasks={filteredTasks} onTaskClick={setSelectedTask} />;

            if (activeView === 'timeline')
              return <TimelineView tasks={filteredTasks} onTaskClick={setSelectedTask} />;

            if (activeView === 'projects')
              return <ProjectsView tasks={tasks} onTaskClick={setSelectedTask} />;

            if (activeView === 'sprints')
              return <SprintsView tasks={tasks} onTaskClick={setSelectedTask} />;

            if (activeView === 'reports')
              return <ReportsView tasks={tasks} />;

            if (activeView === 'insights')
              return <InsightsView tasks={tasks} />;

            // Default: all-tasks / my-tasks list
            if (isMobile && TaskMobileList) {
              return (
                <TaskMobileList
                  tasks={displayedTasks}
                  onRowClick={setSelectedTask}
                  clearAllFilters={clearAllFilters}
                  onAskAI={() => commandBarRef.current?.focus()}
                />
              );
            }
            return (
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
          })()}

          {/* Footer at bottom of scroll area */}
          <Footer
            tasks={tasks}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        </main>
      </div>

      {/* ── AI Chat Panel ──────────────────────────────────── */}
      <AIChatPanel
        isOpen={isAiPanelOpen}
        onClose={() => setIsAiPanelOpen(false)}
        tasks={tasks}
        onAddTask={addTask}
        isMobile={isMobile}
      />

      {/* ── Task Detail Sheet ──────────────────────────────── */}
      <TaskDetailSheet
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdate={updateTask}
        onDelete={deleteTask}
        isMobile={isMobile}
      />

      {/* ── Bulk actions float bar ─────────────────────────── */}
      <BulkActionsBar
        selectedIds={selectedIds}
        tasks={displayedTasks}
        onClearSelection={() => setSelectedIds([])}
        onUpdateTasks={handleUpdateTasks}
        onDeleteSelected={handleDeleteSelected}
      />

      {/* ── Modals ─────────────────────────────────────────── */}
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onAddTask={addTask}
      />
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onViewChange={(v) => { setActiveView(v); setIsCommandPaletteOpen(false); }}
        onOpenNewTask={() => setIsNewTaskOpen(true)}
        onToggleAiPanel={() => setIsAiPanelOpen(o => !o)}
        onFocusCommandBar={() => setTimeout(() => commandBarRef.current?.focus(), 50)}
        toggleStatus={toggleStatus}
        togglePriority={togglePriority}
        clearAllFilters={clearAllFilters}
        setTheme={setTheme}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* ── Toaster ────────────────────────────────────────── */}
      <Toaster
        position={isMobile ? 'top-center' : 'bottom-right'}
        toastOptions={toastStyle}
      />
    </div>
  );
}
