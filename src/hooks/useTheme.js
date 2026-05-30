import { useState, useEffect } from 'react';

const THEMES = {
  obsidian: {
    name: 'Obsidian',
    icon: 'Moon',
    vars: {
      '--bg-base':       '#09090b',
      '--bg-elevated':   '#111113',
      '--bg-card':       '#18181b',
      '--bg-hover':      '#27272a',
      '--bg-border':     '#3f3f46',
      '--text-primary':  '#fafafa',
      '--text-secondary':'#a1a1aa',
      '--text-muted':    '#71717a',
      '--accent':        '#8b5cf6',
      '--accent-cyan':   '#06b6d4',
    }
  },
  arctic: {
    name: 'Arctic',
    icon: 'Sun',
    vars: {
      '--bg-base':       '#ffffff',
      '--bg-elevated':   '#f8fafc',
      '--bg-card':       '#f1f5f9',
      '--bg-hover':      '#e2e8f0',
      '--bg-border':     '#cbd5e1',
      '--text-primary':  '#0f172a',
      '--text-secondary':'#475569',
      '--text-muted':    '#94a3b8',
      '--accent':        '#6366f1',
      '--accent-cyan':   '#0891b2',
    }
  },
  midnight: {
    name: 'Midnight',
    icon: 'Moon',
    vars: {
      '--bg-base':       '#0d1117',
      '--bg-elevated':   '#161b22',
      '--bg-card':       '#1c2128',
      '--bg-hover':      '#262c36',
      '--bg-border':     '#30363d',
      '--text-primary':  '#e6edf3',
      '--text-secondary':'#8b949e',
      '--text-muted':    '#6e7681',
      '--accent':        '#58a6ff',
      '--accent-cyan':   '#39d353',
    }
  },
  ember: {
    name: 'Ember',
    icon: 'Flame',
    vars: {
      '--bg-base':       '#0c0a09',
      '--bg-elevated':   '#1c1917',
      '--bg-card':       '#292524',
      '--bg-hover':      '#3c3836', 
      '--bg-border':     '#57534e',
      '--text-primary':  '#fafaf9',
      '--text-secondary':'#a8a29e',
      '--text-muted':    '#78716c',
      '--accent':        '#f97316',
      '--accent-cyan':   '#fb923c',
    }
  }
};

export function useTheme() {
  const getSystemPref = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'obsidian' : 'arctic';

  const [theme, setThemeKey] = useState(() => {
    const saved = localStorage.getItem('ff-theme');
    if (saved === 'system') return getSystemPref();
    return saved || getSystemPref();
  });

  const [isSystem, setIsSystem] = useState(() => {
    return localStorage.getItem('ff-theme') === 'system';
  });

  useEffect(() => {
    if (isSystem) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemChange = () => {
        setThemeKey(getSystemPref());
      };
      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }
  }, [isSystem]);

  useEffect(() => {
    const activeKey = isSystem ? getSystemPref() : theme;
    const t = THEMES[activeKey];
    if (!t) return;
    const root = document.documentElement;
    Object.entries(t.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    
    if (isSystem) {
      localStorage.setItem('ff-theme', 'system');
      setThemeKey(activeKey);
    } else {
      localStorage.setItem('ff-theme', theme);
    }
    
    root.setAttribute('data-theme', activeKey);
    root.classList.toggle('dark', ['obsidian', 'midnight', 'ember'].includes(activeKey));
  }, [theme, isSystem]);

  const setTheme = (key) => {
    if (key === 'system') {
      setIsSystem(true);
      setThemeKey(getSystemPref());
    } else {
      setIsSystem(false);
      setThemeKey(key);
    }
  };

  return {
    theme,
    themeName: THEMES[theme]?.name || THEMES.obsidian.name,
    themes: Object.keys(THEMES).map(k => ({ 
      key: k, ...THEMES[k] 
    })),
    setTheme,
    isDark: ['obsidian', 'midnight', 'ember'].includes(theme),
    isSystem,
    getSystemPref
  };
}
