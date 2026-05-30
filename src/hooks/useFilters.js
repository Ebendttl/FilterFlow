import { useState, useMemo, useEffect } from 'react';
import { tasks as initialTasks } from '../data/tasks';
import { parseISO, isAfter, isBefore, isEqual, startOfDay, endOfDay } from 'date-fns';

const initialFilters = {
  search: "",
  statuses: [],
  priorities: [],
  assignees: [],
  projects: [],
  dateRange: { start: null, end: null }
};

export function useFilters() {
  const [filters, setFilters] = useState(initialFilters);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search query changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [filters.search]);

  const setSearch = (search) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const toggleStatus = (status) => {
    setFilters(prev => {
      const statuses = prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status];
      return { ...prev, statuses };
    });
  };

  const togglePriority = (priority) => {
    setFilters(prev => {
      const priorities = prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority];
      return { ...prev, priorities };
    });
  };

  const toggleAssignee = (assigneeName) => {
    setFilters(prev => {
      const assignees = prev.assignees.includes(assigneeName)
        ? prev.assignees.filter(a => a !== assigneeName)
        : [...prev.assignees, assigneeName];
      return { ...prev, assignees };
    });
  };

  const toggleProject = (projectName) => {
    setFilters(prev => {
      const projects = prev.projects.includes(projectName)
        ? prev.projects.filter(p => p !== projectName)
        : [...prev.projects, projectName];
      return { ...prev, projects };
    });
  };

  const setDateRange = (start, end) => {
    setFilters(prev => ({
      ...prev,
      dateRange: { start, end }
    }));
  };

  const clearFilter = (key) => {
    setFilters(prev => {
      if (key === 'dateRange') {
        return { ...prev, dateRange: { start: null, end: null } };
      }
      if (Array.isArray(prev[key])) {
        return { ...prev, [key]: [] };
      }
      return { ...prev, [key]: "" };
    });
  };

  const clearAllFilters = () => {
    setFilters(initialFilters);
  };

  const filteredTasks = useMemo(() => {
    return initialTasks.filter(task => {
      // 1. Search Query filter (matches task title or task id)
      if (debouncedSearch.trim() !== "") {
        const query = debouncedSearch.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesId = task.id.toLowerCase().includes(query);
        if (!matchesTitle && !matchesId) return false;
      }

      // 2. Statuses filter
      if (filters.statuses.length > 0) {
        if (!filters.statuses.includes(task.status)) return false;
      }

      // 3. Priorities filter
      if (filters.priorities.length > 0) {
        if (!filters.priorities.includes(task.priority)) return false;
      }

      // 4. Assignees filter
      if (filters.assignees.length > 0) {
        if (!filters.assignees.includes(task.assignee.name)) return false;
      }

      // 5. Projects filter
      if (filters.projects.length > 0) {
        if (!filters.projects.includes(task.project)) return false;
      }

      // 6. Date Range filter (inclusive)
      if (filters.dateRange.start) {
        const taskDate = startOfDay(parseISO(task.dueDate));
        const startDate = startOfDay(new Date(filters.dateRange.start));
        
        if (filters.dateRange.end) {
          const endDate = endOfDay(new Date(filters.dateRange.end));
          if (isBefore(taskDate, startDate) || isAfter(taskDate, endDate)) {
            return false;
          }
        } else {
          // If only start date is selected, compare on that specific day
          if (!isEqual(taskDate, startDate) && isBefore(taskDate, startDate)) {
            return false;
          }
        }
      }

      return true;
    });
  }, [filters, debouncedSearch]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim() !== "") count += 1;
    if (filters.statuses.length > 0) count += 1;
    if (filters.priorities.length > 0) count += 1;
    if (filters.assignees.length > 0) count += 1;
    if (filters.projects.length > 0) count += 1;
    if (filters.dateRange.start !== null) count += 1;
    return count;
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
    clearFilter,
    clearAllFilters
  };
}
