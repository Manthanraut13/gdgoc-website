/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Google Brand DNA */
        'g-blue': '#1a73e8',
        'g-red': '#ea4335',
        'g-yellow': '#fbbc04',
        'g-green': '#34a853',

        /* Extended palette */
        'blue-deep': '#0d47a1',
        'blue-light': '#e8f0fe',
        'red-deep': '#b71c1c',
        'red-light': '#fce8e6',
        'yellow-deep': '#f57f17',
        'yellow-light': '#fff8e1',
        'green-deep': '#1b5e20',
        'green-light': '#e8f5e9',

        /* Ink (Neutral) system */
        'ink-900': '#0a0a0f',
        'ink-800': '#111118',
        'ink-700': '#1e1e2a',
        'ink-600': '#2d2d3d',
        'ink-400': '#6b6b80',
        'ink-300': '#9999aa',
        'ink-200': '#d0d0dc',
        'ink-100': '#f0f0f5',
        'ink-50': '#f8f8fc',

        /* Surface tokens */
        'surface-0': '#ffffff',
        'surface-1': '#f7f7fb',
        'surface-2': '#ededf5',
        'surface-dark': '#0f0f1a',
        'surface-card': '#ffffff',
      },
      fontFamily: {
        'display': ['"Google Sans"', 'sans-serif'],
        'body': ['"Google Sans"', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        /* Blueprint type scale */
        'display-hero': ['clamp(52px, 7vw, 96px)', { lineHeight: '1.0', letterSpacing: '-4px', fontWeight: '700' }],
        'h1': ['56px', { lineHeight: '1.1', letterSpacing: '-2px', fontWeight: '700' }],
        'h2': ['40px', { lineHeight: '1.15', letterSpacing: '-1px', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.25', letterSpacing: '-0.5px', fontWeight: '700' }],
        'h4': ['18px', { lineHeight: '1.35', letterSpacing: '0px', fontWeight: '600' }],
        'body-lg': ['17px', { lineHeight: '1.75', fontWeight: '400' }],
        'body': ['15px', { lineHeight: '1.7', fontWeight: '400' }],
        'label': ['11px', { lineHeight: '1.4', letterSpacing: '3px', fontWeight: '700' }],
      },
      spacing: {
        /* Blueprint 4px base spacing */
        'sp-1': '4px',
        'sp-2': '8px',
        'sp-3': '12px',
        'sp-4': '16px',
        'sp-6': '24px',
        'sp-8': '32px',
        'sp-12': '48px',
        'sp-20': '80px',
        'sp-30': '120px',
      },
      borderRadius: {
        'r-sm': '4px',
        'r-md': '8px',
        'r-lg': '12px',
        'r-xl': '16px',
        'r-2xl': '20px',
        'r-pill': '999px',
      },
      boxShadow: {
        /* Blueprint shadow system */
        's-0': 'none',
        's-1': '0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
        's-2': '0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
        's-3': '0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)',
        's-blue': '0 4px 24px rgba(26,115,232,0.25), 0 0 0 1px rgba(26,115,232,0.1)',
        's-yellow': '0 4px 24px rgba(251,188,4,0.3), 0 0 0 1px rgba(251,188,4,0.15)',
      },
      maxWidth: {
        'page': '1240px',
      },
      height: {
        'nav': '64px',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'marquee': 'marquee 30s linear infinite',
        'scroll-reveal': 'scrollReveal 500ms cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollReveal: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}