import { useState, useEffect } from 'react';

const THEMES = {
  obsidian: {
    name: 'Obsidian',
    vars: {
      '--bg-base':        '#09090b',
      '--bg-elevated':    '#111113',
      '--bg-card':        '#18181b',
      '--bg-hover':       '#27272a',
      '--bg-border':      '#3f3f46',
      '--text-primary':   '#fafafa',
      '--text-secondary': '#a1a1aa',
      '--text-muted':     '#71717a',
      '--accent':         '#8b5cf6',
      '--accent-cyan':    '#06b6d4',
    }
  },
  arctic: {
    name: 'Light',
    vars: {
      '--bg-base':        '#f8fafc',
      '--bg-elevated':    '#ffffff',
      '--bg-card':        '#f1f5f9',
      '--bg-hover':       '#e2e8f0',
      '--bg-border':      '#cbd5e1',
      '--text-primary':   '#0f172a',
      '--text-secondary': '#475569',
      '--text-muted':     '#94a3b8',
      '--accent':         '#6366f1',
      '--accent-cyan':    '#0891b2',
    }
  },
};

function applyTheme(key) {
  const t = THEMES[key];
  if (!t) return;
  const root = document.documentElement;
  Object.entries(t.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute('data-theme', key);
  root.classList.toggle('dark', key === 'obsidian');
}

export function useTheme() {
  const getSystemPref = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'obsidian' : 'arctic';

  const [theme, setThemeKey] = useState(() => {
    const saved = localStorage.getItem('ff-theme');
    if (saved === 'system') return getSystemPref();
    return (saved && THEMES[saved]) ? saved : 'obsidian';
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('ff-theme', theme);
  }, [theme]);

  const setTheme = (key) => {
    if (THEMES[key]) setThemeKey(key);
  };

  const toggleTheme = () => {
    setThemeKey(prev => prev === 'obsidian' ? 'arctic' : 'obsidian');
  };

  return {
    theme,
    themeName: THEMES[theme]?.name ?? 'Dark',
    isDark: theme === 'obsidian',
    setTheme,
    toggleTheme,
  };
}
