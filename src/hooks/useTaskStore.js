import { useState, useCallback } from 'react';
import { generateTasks } from '../data/tasks';

let taskIdCounter = 49;

function generateId() {
  return `FF-${String(taskIdCounter++).padStart(3, '0')}`;
}

export function useTaskStore() {
  const [tasks, setTasks] = useState(() => generateTasks());
  const [newTaskId, setNewTaskId] = useState(null);

  const addTask = useCallback((taskData) => {
    const id = generateId();
    const today = new Date().toISOString().split('T')[0];
    const newTask = {
      id,
      title: taskData.title || 'Untitled Task',
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      project: taskData.project || 'Backend API',
      assignee: taskData.assignee || { name: 'Alex Johnson', initials: 'AJ', color: 'bg-violet-600' },
      dueDate: taskData.dueDate || today,
      createdAt: today,
      tags: taskData.tags || [],
    };
    setTasks(prev => [newTask, ...prev]);
    setNewTaskId(id);
    setTimeout(() => setNewTaskId(null), 2500);
    return id;
  }, []);

  const updateTask = useCallback((id, patch) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const duplicateTask = useCallback((id) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === id);
      if (!task) return prev;
      const newId = generateId();
      const copy = { ...task, id: newId, title: `${task.title} (Copy)` };
      return [copy, ...prev];
    });
  }, []);

  const moveTasks = useCallback((ids, status) => {
    setTasks(prev => prev.map(t => ids.includes(t.id) ? { ...t, status } : t));
  }, []);

  return { tasks, addTask, updateTask, deleteTask, duplicateTask, moveTasks, newTaskId };
}
