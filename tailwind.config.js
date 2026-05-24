/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        zinc: {
          950: '#09090b',
          900: '#18181b',
          800: '#27272a',
          700: '#3f3f46',
        },
        neutral: {
          950: '#0a0a0a',
        },
        emerald: {
          500: '#10b981',
          600: '#059669',
        },
        blue: {
          500: '#3b82f6',
        },
        yellow: {
          400: '#facc15',
          300: '#fde047',
        },
        red: {
          500: '#ef4444',
        },
        amber: {
          700: '#b45309',
        },
        slate: {
          300: '#cbd5e1',
        },
      },
      fontFamily: {
        extrabold: ['System', 'sans-serif'],
        bold: ['System', 'sans-serif'],
        semibold: ['System', 'sans-serif'],
        medium: ['System', 'sans-serif'],
        black: ['System', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
