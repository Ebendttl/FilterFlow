import { useState, useMemo } from 'react';
import { parseISO, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

const initialFilters = {
  search: '',
  statuses: [],
  priorities: [],
  assignees: [],
  projects: [],
  dateRange: { start: null, end: null },
  sortBy: null,
  sortDir: 'asc',
  aiApplied: false,
};

export function useFilters(tasks) {
  const [filters, setFilters] = useState(initialFilters);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceRef = useState(null);

  const setSearch = (search) => {
    setFilters(f => ({ ...f, search, aiApplied: false }));
    clearTimeout(debounceRef[0]);
    debounceRef[0] = setTimeout(() => setDebouncedSearch(search), 200);
  };

  const toggleStatus = (s) => setFilters(f => ({
    ...f, aiApplied: false,
    statuses: f.statuses.includes(s) ? f.statuses.filter(x => x !== s) : [...f.statuses, s]
  }));

  const togglePriority = (p) => setFilters(f => ({
    ...f, aiApplied: false,
    priorities: f.priorities.includes(p) ? f.priorities.filter(x => x !== p) : [...f.priorities, p]
  }));

  const toggleAssignee = (a) => setFilters(f => ({
    ...f, aiApplied: false,
    assignees: f.assignees.includes(a) ? f.assignees.filter(x => x !== a) : [...f.assignees, a]
  }));

  const toggleProject = (p) => setFilters(f => ({
    ...f, aiApplied: false,
    projects: f.projects.includes(p) ? f.projects.filter(x => x !== p) : [...f.projects, p]
  }));

  const setDateRange = (start, end) => setFilters(f => ({
    ...f, aiApplied: false, dateRange: { start, end }
  }));

  const setSort = (col) => setFilters(f => ({
    ...f,
    sortBy: col,
    sortDir: f.sortBy === col ? (f.sortDir === 'asc' ? 'desc' : 'asc') : 'asc'
  }));

  const clearFilter = (key) => setFilters(f => {
    if (key === 'dateRange') return { ...f, dateRange: { start: null, end: null }, aiApplied: false };
    if (key === 'search') { setDebouncedSearch(''); return { ...f, search: '', aiApplied: false }; }
    if (Array.isArray(f[key])) return { ...f, [key]: [], aiApplied: false };
    return { ...f, [key]: '', aiApplied: false };
  });

  const clearAllFilters = () => {
    setDebouncedSearch('');
    setFilters(initialFilters);
  };

  // Used by AI command bar to apply filters in one shot
  const setAllFilters = (filtersObj) => {
    setDebouncedSearch(filtersObj.search || '');
    setFilters(f => ({
      ...f,
      search: filtersObj.search || '',
      statuses: filtersObj.statuses || [],
      priorities: filtersObj.priorities || [],
      assignees: filtersObj.assignees || [],
      projects: filtersObj.projects || [],
      dateRange: filtersObj.dateRange || { start: null, end: null },
      aiApplied: true,
    }));
  };

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Search
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
      );
    }

    // Statuses
    if (filters.statuses.length > 0) {
      result = result.filter(t => filters.statuses.includes(t.status));
    }

    // Priorities
    if (filters.priorities.length > 0) {
      result = result.filter(t => filters.priorities.includes(t.priority));
    }

    // Assignees
    if (filters.assignees.length > 0) {
      result = result.filter(t => filters.assignees.includes(t.assignee.name));
    }

    // Projects
    if (filters.projects.length > 0) {
      result = result.filter(t => filters.projects.includes(t.project));
    }

    // Date range
    if (filters.dateRange.start) {
      const start = startOfDay(new Date(filters.dateRange.start));
      result = result.filter(t => {
        const due = startOfDay(parseISO(t.dueDate));
        if (filters.dateRange.end) {
          const end = endOfDay(new Date(filters.dateRange.end));
          return !isBefore(due, start) && !isAfter(due, end);
        }
        return !isBefore(due, start);
      });
    }

    // Sort
    if (filters.sortBy) {
      const dir = filters.sortDir === 'asc' ? 1 : -1;
      const statusOrder = { todo:1, in_progress:2, in_review:3, done:4, blocked:5 };
      const priorityOrder = { none:1, low:2, medium:3, high:4, urgent:5 };

      result.sort((a, b) => {
        let va, vb;
        switch (filters.sortBy) {
          case 'title': va = a.title; vb = b.title; break;
          case 'status': va = statusOrder[a.status]; vb = statusOrder[b.status]; break;
          case 'priority': va = priorityOrder[a.priority]; vb = priorityOrder[b.priority]; break;
          case 'dueDate': va = a.dueDate; vb = b.dueDate; break;
          case 'createdAt': va = a.createdAt; vb = b.createdAt; break;
          default: return 0;
        }
        if (va < vb) return -1 * dir;
        if (va > vb) return 1 * dir;
        return 0;
      });
    }

    return result;
  }, [tasks, debouncedSearch, filters]);

  const activeFilterCount = useMemo(() => {
    let c = 0;
    if (filters.search.trim()) c++;
    if (filters.statuses.length) c++;
    if (filters.priorities.length) c++;
    if (filters.assignees.length) c++;
    if (filters.projects.length) c++;
    if (filters.dateRange.start) c++;
    return c;
  }, [filters]);

  return {
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
    clearAllFilters,
  };
}
