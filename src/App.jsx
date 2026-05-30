import React, { useState, useEffect } from 'react';
import { LayoutList, LayoutGrid, SearchX } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import FilterToolbar from './components/FilterToolbar';
import ActiveFilterBar from './components/ActiveFilterBar';
import TaskTable from './components/TaskTable';
import TaskCard from './components/TaskCard';
import { useFilters } from './hooks/useFilters';

export default function App() {
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
    clearFilter,
    clearAllFilters
  } = useFilters();

  const [viewMode, setViewMode] = useState('table'); // 'table' | 'card'
  const [isLoading, setIsLoading] = useState(true);

  // Synced loading state for initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const isFiltered = filteredTasks.length < 48 || activeFilterCount > 0;

  return (
    <div className="flex h-screen w-full bg-surface-0 overflow-hidden font-sans">
      {/* Fixed Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar */}
        <TopNav />

        {/* Filter Toolbar */}
        <FilterToolbar
          filters={filters}
          setSearch={setSearch}
          toggleStatus={toggleStatus}
          togglePriority={togglePriority}
          toggleAssignee={toggleAssignee}
          toggleProject={toggleProject}
          setDateRange={setDateRange}
        />

        {/* Active Filters Pill Bar (conditional transition) */}
        <ActiveFilterBar
          filters={filters}
          activeFilterCount={activeFilterCount}
          clearFilter={clearFilter}
          clearAllFilters={clearAllFilters}
        />

        {/* Results Counter & View Toggle Bar */}
        <div className="h-8 border-b border-customBorder flex items-center justify-between px-6 shrink-0 bg-surface-1/40 select-none">
          <span className="text-[13px] text-customText-secondary font-medium">
            {isLoading ? (
              <span className="inline-block w-24 h-4 bg-gray-100 rounded animate-pulse" />
            ) : isFiltered ? (
              `${filteredTasks.length} of 48 tasks`
            ) : (
              '48 tasks'
            )}
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              aria-label="Table View"
              className={`w-6 h-6 flex items-center justify-center rounded transition-all duration-150 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-surface-2 text-customText-primary font-bold shadow-sm'
                  : 'text-customText-secondary hover:text-customText-primary'
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('card')}
              aria-label="Card Grid View"
              className={`w-6 h-6 flex items-center justify-center rounded transition-all duration-150 cursor-pointer ${
                viewMode === 'card'
                  ? 'bg-surface-2 text-customText-primary font-bold shadow-sm'
                  : 'text-customText-secondary hover:text-customText-primary'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Task List Workspace Content */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-surface-0">
          {isLoading ? (
            viewMode === 'table' ? (
              <TaskTable 
                filteredTasks={[]} 
                clearAllFilters={clearAllFilters} 
              />
            ) : (
              /* Card View Skeleton Loader */
              <div className="grid grid-cols-3 gap-4 p-6">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-customBorder rounded-xl p-4 animate-pulse flex flex-col justify-between h-40 shadow-sm"
                  >
                    <div>
                      <div className="flex justify-between">
                        <div className="w-12 h-3.5 bg-gray-100 rounded" />
                        <div className="w-14 h-4 bg-gray-100 rounded" />
                      </div>
                      <div className="h-4 bg-gray-100 rounded w-5/6 mt-3" />
                      <div className="h-4 bg-gray-100 rounded w-2/3 mt-2" />
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-customBorder">
                      <div className="w-16 h-5 bg-gray-100 rounded-full" />
                      <div className="w-6 h-6 bg-gray-100 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : filteredTasks.length === 0 ? (
            /* Shared Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-surface-1 flex items-center justify-center border border-customBorder shadow-sm mb-4">
                <SearchX className="w-6 h-6 text-customText-tertiary" />
              </div>
              <h3 className="text-base font-semibold text-customText-primary">
                No tasks match your filters
              </h3>
              <p className="text-sm text-customText-secondary mt-1 max-w-xs">
                Try adjusting or clearing your filters to view active tasks.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-5 h-9 px-4 bg-brand-primary hover:bg-brand-hover text-white font-semibold rounded-lg text-xs transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 active:scale-[0.98] cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          ) : viewMode === 'table' ? (
            <TaskTable 
              filteredTasks={filteredTasks} 
              clearAllFilters={clearAllFilters} 
            />
          ) : (
            /* Card Grid View */
            <div className="grid grid-cols-3 gap-4 p-6 animate-fade-in">
              {filteredTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
