/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'oklch(12% .014 220)',
          2: 'oklch(14% .018 220)',
        },
        panel: {
          DEFAULT: 'oklch(19% .022 220)',
          2: 'oklch(22% .025 220)',
        },
        border: {
          DEFAULT: 'oklch(26% .025 220)',
          strong: 'oklch(32% .03 220)',
        },
        ink: {
          DEFAULT: 'oklch(95% .01 90)',
          2: 'oklch(64% .018 215)',
          3: 'oklch(50% .016 215)',
        },
        accent: {
          DEFAULT: 'oklch(80% .15 175)',
          2: 'oklch(85% .10 65)',
        },
        success: 'oklch(80% .13 155)',
        danger: 'oklch(68% .17 30)',
        info: 'oklch(70% .15 240)',
        purple: 'oklch(70% .15 300)',
        green: 'oklch(80% .13 155)',
        pink: 'oklch(70% .18 350)',
        code: 'oklch(9% .012 220)',
        amber: {
          400: 'oklch(75% .15 70)',
          500: 'oklch(68% .17 45)',
        },
        red: {
          400: 'oklch(68% .20 25)',
          500: 'oklch(68% .17 30)',
        },
        violet: {
          300: 'oklch(75% .12 300)',
          400: 'oklch(70% .15 300)',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sub: ['"Spectral"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      fontSize: {
        display: ['60px', { lineHeight: '1.05', fontWeight: '400' }],
        h1: ['44px', { lineHeight: '1.1', fontWeight: '400' }],
        h2: ['30px', { lineHeight: '1.2', fontWeight: '400' }],
        h3: ['22px', { lineHeight: '1.3' }],
        sub: ['22px', { lineHeight: '1.35', fontWeight: '400', fontStyle: 'italic' }],
        'body-lg': ['17px', { lineHeight: '1.65' }],
        'body-md': ['15.5px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.55' }],
      },
      borderRadius: {
        sm: '6px',
        md: '9px',
        lg: '14px',
        xl: '18px',
        '2xl': '18px',
        '3xl': '18px',
      },
      boxShadow: {
        panel: '0 10px 30px rgba(0,0,0,0.35)',
        lift: '0 4px 14px rgba(0,0,0,0.25)',
        glow: '0 0 0 1px rgba(128,230,200,0.4), 0 0 18px rgba(128,230,200,0.25)',
        'glow-strong': '0 0 0 1px rgba(128,230,200,0.7), 0 0 24px rgba(128,230,200,0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit-drift': 'orbitDrift 14s ease-in-out infinite',
        'particle-pop': 'particlePop 1.8s ease-out both',
        'toast-in': 'toastIn 360ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        'achievement-pop': 'achievementPop 600ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        'achievement-shine': 'achievementShine 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-dot': 'pulseDot 1.4s ease-in-out infinite',
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
      keyframes: {
        orbitDrift: {
          '0%, 100%': { transform: 'rotate(0deg) translate(0, 0)' },
          '50%': { transform: 'rotate(12deg) translate(-8px, 6px)' },
        },
        particlePop: {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.4) rotate(0deg)' },
          '18%': { opacity: '0.95' },
          '100%': { opacity: '0', transform: 'translateY(-170px) scale(0.9) rotate(240deg)' },
        },
        toastIn: {
          'from': { opacity: '0', transform: 'translateY(14px) scale(0.97)' },
          'to': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        achievementPop: {
          '0%': { transform: 'scale(0.85)', boxShadow: '0 0 0 0 rgba(128,230,200,0.6)' },
          '35%': { transform: 'scale(1.08)', boxShadow: '0 0 0 4px rgba(128,230,200,0.25)' },
          '70%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        achievementShine: {
          '0%': { transform: 'translateX(-100%)', opacity: '0.9' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};
