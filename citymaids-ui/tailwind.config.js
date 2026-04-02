/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0fdf6',
          100: '#dcfcec',
          200: '#bbf7d8',
          300: '#86efb8',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        slate: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        sky: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft':    '0 2px 15px rgba(0,0,0,0.06)',
        'medium':  '0 4px 30px rgba(0,0,0,0.10)',
        'strong':  '0 8px 50px rgba(0,0,0,0.14)',
        'brand':   '0 4px 20px rgba(22,163,74,0.25)',
        'brand-lg':'0 8px 40px rgba(22,163,74,0.35)',
      },
    },
  },
  plugins: [],
}
