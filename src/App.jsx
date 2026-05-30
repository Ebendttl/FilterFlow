import React, { useState, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';

// Layout components
import Sidebar from './components/layout/Sidebar';
import TopNav from './components/layout/TopNav';
import MobileSidebarDrawer from './components/layout/MobileSidebarDrawer';
import AIChatPanel from './components/layout/AIChatPanel';

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

// Hooks
import { useTaskStore } from './hooks/useTaskStore';
import { useFilters } from './hooks/useFilters';
import { useIsMobile } from './hooks/useMediaQuery';
import { useKeyboard } from './hooks/useKeyboard';

export default function App() {
  const isMobile = useIsMobile();
  const searchInputRef = useRef(null);
  const commandBarRef = useRef(null);

  // Centralized Task Store
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    duplicateTask,
    moveTasks,
    newTaskId
  } = useTaskStore();

  // Advanced Filters Hook
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

  // Views & Overlay state
  const [activeView, setActiveView] = useState('all-tasks'); // 'my-tasks' | 'all-tasks' | 'board' | 'calendar' | 'timeline' | 'projects' | 'sprints' | 'reports' | 'insights'
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Modals & Panels open state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Keyboard Shortcuts Binding
  useKeyboard({
    'Meta+k': () => {
      commandBarRef.current?.focus();
    },
    'Meta+j': () => {
      setIsAiPanelOpen(o => !o);
    },
    'Meta+n': () => {
      setIsNewTaskOpen(true);
    },
    'escape': () => {
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

  // Calculate my tasks or all tasks list
  const displayedTasks = activeView === 'my-tasks'
    ? filteredTasks.filter(t => t.assignee?.name === 'Alex Johnson')
    : filteredTasks;

  // Single ID selection helper
  const handleSelectId = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Select all helper
  const handleSelectAll = () => {
    const listToSelect = displayedTasks.map(t => t.id);
    if (selectedIds.length === listToSelect.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(listToSelect);
    }
  };

  // Batch Update helper used by bulk action bar
  const handleUpdateTasks = (ids, patch) => {
    ids.forEach(id => updateTask(id, patch));
  };

  // Batch Delete helper
  const handleDeleteSelected = (ids) => {
    ids.forEach(id => deleteTask(id));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-150 font-sans antialiased relative">
      
      {/* Background dot grid layout */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:block w-64 h-full border-r border-zinc-800 shrink-0">
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          onToggleAiPanel={() => setIsAiPanelOpen(o => !o)}
          onOpenSettings={() => toast('Settings panel coming soon', { style: { background:'#18181b', color:'#fafafa', border:'1px solid #3f3f46' } })}
          tasks={tasks}
        />
      </div>

      {/* Mobile Drawer (toggled from burger) */}
      <MobileSidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeView={activeView}
        onViewChange={setActiveView}
        onToggleAiPanel={() => setIsAiPanelOpen(o => !o)}
        onOpenSettings={() => toast('Settings panel coming soon', { style: { background:'#18181b', color:'#fafafa', border:'1px solid #3f3f46' } })}
        tasks={tasks}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10">
        
        {/* Top Navbar */}
        <TopNav
          searchValue={filters.search}
          onSearchChange={setSearch}
          onOpenSidebarDrawer={() => setIsSidebarOpen(true)}
          onOpenNewTaskModal={() => setIsNewTaskOpen(true)}
          onOpenShortcutsModal={() => setIsShortcutsOpen(true)}
          searchInputRef={searchInputRef}
        />

        {/* AI Command Bar for natural language searching */}
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

        {/* Active filters summary indicator row */}
        {(activeView === 'all-tasks' || activeView === 'my-tasks' || activeView === 'board') && (
          <ActiveFilterBar
            filters={filters}
            activeFilterCount={activeFilterCount}
            clearFilter={clearFilter}
            clearAllFilters={clearAllFilters}
          />
        )}

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-hidden flex flex-col min-h-0 bg-zinc-950/20">
          {(() => {
            if (activeView === 'all-tasks' || activeView === 'my-tasks') {
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
                  onSetSort={setSort}
                  filters={filters}
                  clearAllFilters={clearAllFilters}
                  onAskAI={() => commandBarRef.current?.focus()}
                />
              );
            }
            if (activeView === 'board') {
              return (
                <BoardView
                  tasks={displayedTasks}
                  onMoveTasks={moveTasks}
                  onTaskClick={setSelectedTask}
                />
              );
            }
            if (activeView === 'calendar') {
              return (
                <CalendarView
                  tasks={filteredTasks}
                  onTaskClick={setSelectedTask}
                />
              );
            }
            if (activeView === 'timeline') {
              return (
                <TimelineView
                  tasks={filteredTasks}
                  onTaskClick={setSelectedTask}
                />
              );
            }
            if (activeView === 'projects') {
              return (
                <ProjectsView
                  tasks={tasks}
                  onTaskClick={setSelectedTask}
                />
              );
            }
            if (activeView === 'sprints') {
              return (
                <SprintsView
                  tasks={tasks}
                  onTaskClick={setSelectedTask}
                />
              );
            }
            if (activeView === 'reports') {
              return (
                <ReportsView
                  tasks={tasks}
                />
              );
            }
            if (activeView === 'insights') {
              return (
                <InsightsView
                  tasks={tasks}
                />
              );
            }
            return null;
          })()}
        </main>

      </div>

      {/* Floating Right AI Chat panel (pushes content on desktop or overlays) */}
      <AIChatPanel
        isOpen={isAiPanelOpen}
        onClose={() => setIsAiPanelOpen(false)}
        tasks={tasks}
        onAddTask={addTask}
        isMobile={isMobile}
      />

      {/* Task Detail Slide-over Panel (from right or bottom) */}
      <TaskDetailSheet
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdate={updateTask}
        onDelete={deleteTask}
        isMobile={isMobile}
      />

      {/* Bulk actions float bar */}
      <BulkActionsBar
        selectedIds={selectedIds}
        tasks={displayedTasks}
        onClearSelection={() => setSelectedIds([])}
        onUpdateTasks={handleUpdateTasks}
        onDeleteSelected={handleDeleteSelected}
      />

      {/* New Task Overlay Modal */}
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onAddTask={addTask}
      />

      {/* Shortcuts Guide Overlay Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Global Hot Notification Toaster with Premium custom styles */}
      <Toaster />

    </div>
  );
}
