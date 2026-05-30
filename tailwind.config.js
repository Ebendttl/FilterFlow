/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#6366f1',
          hover: '#4f46e5',
        },
        surface: {
          0: '#ffffff',
          1: '#f8f9fa',
          2: '#f1f3f5',
        },
        customBorder: {
          DEFAULT: '#e5e7eb',
          focus: '#6366f1',
        },
        customText: {
          primary: '#111827',
          secondary: '#6b7280',
          tertiary: '#9ca3af',
        }
      },
      animation: { 
        'pulse-once': 'pulse 2s ease-in-out 1',
        'fade-in': 'fadeIn 0.15s ease-out'
      },
      keyframes: {
        fadeIn: { 
          from: { opacity: '0', transform: 'scale(0.95)' }, 
          to:   { opacity: '1', transform: 'scale(1)'    } 
        }
      }
    },
  },
  plugins: [],
}
