/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        zinc: {
          950: '#09090b',
        },
        accent: {
          violet: '#8b5cf6',
          cyan: '#06b6d4',
        },
        'ff-base':      'var(--bg-base)',
        'ff-elevated':  'var(--bg-elevated)',
        'ff-card':      'var(--bg-card)',
        'ff-hover':     'var(--bg-hover)',
        'ff-border':    'var(--bg-border)',
        'ff-primary':   'var(--text-primary)',
        'ff-secondary': 'var(--text-secondary)',
        'ff-muted':     'var(--text-muted)',
        'ff-accent':    'var(--accent)',
        'ff-cyan':      'var(--accent-cyan)',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 1.5s linear infinite',
        'bounce-dot': 'bounceDot 1.2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        bounceDot: {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-6px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        }
      },
      boxShadow: {
        'glow-violet': '0 0 0 2px rgba(139, 92, 246, 0.4)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.08)',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, var(--bg-border) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
      },
    },
  },
  plugins: [],
}
