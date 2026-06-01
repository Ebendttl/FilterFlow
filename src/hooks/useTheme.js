import { useState, useEffect } from 'react';

const THEMES = {
  obsidian: {
    name: 'Obsidian',
    vars: {
      '--bg-base':        '#07070a',
      '--bg-elevated':    '#0b0b0f',
      '--bg-card':        '#15151b',
      '--bg-hover':       '#202027',
      '--bg-border':      '#24242b',
      '--text-primary':   '#f4f4f5',
      '--text-secondary': '#a5a5ad',
      '--text-muted':     '#6f6f78',
      '--accent':         '#9b5cff',
      '--accent-cyan':    '#22d3ee',
      '--accent-pink':    '#f25caf',
      '--accent-amber':   '#fbbf24',
      '--accent-glow':    'rgba(155, 92, 255, 0.18)',
      '--cyan-glow':      'rgba(34, 211, 238, 0.13)',
      '--glass-line':     'rgba(255, 255, 255, 0.075)',
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
