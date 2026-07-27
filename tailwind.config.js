/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0b0d12',
          2: '#11141b',
        },
        panel: {
          DEFAULT: '#161a23',
          2: '#1c212c',
        },
        border: '#262b36',
        ink: {
          DEFAULT: '#e6e8ec',
          2: '#9aa3b2',
          3: '#6b7280',
        },
        accent: {
          DEFAULT: '#f89820',
          2: '#ffb84d',
        },
        success: '#22c55e',
        danger: '#ef4444',
        info: '#38bdf8',
        purple: '#a78bfa',
        green: '#34d399',
        pink: '#f472b6',
        code: '#0d1117',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      transitionDuration: {
        fast: '120ms',
        normal: '200ms',
        slow: '360ms',
        page: '480ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      boxShadow: {
        panel: '0 10px 30px rgba(0,0,0,0.35)',
        lift: '0 4px 14px rgba(0,0,0,0.25)',
        emphasis: '0 6px 20px rgba(0,0,0,0.3)',
        glow: '0 0 0 1px rgba(248,152,32,0.4), 0 0 18px rgba(248,152,32,0.25)',
        'glow-strong': '0 0 0 1px rgba(248,152,32,0.7), 0 0 24px rgba(248,152,32,0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};