/** @type {import('tailwindcss').Config} */
const colors = require('./src/theme/colors');

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Semantic tokens from design system
        background: colors.background.DEFAULT,
        foreground: colors.foreground.DEFAULT,
        card: colors.card.DEFAULT,
        'card-foreground': colors.card.foreground,
        primary: colors.primary.DEFAULT,
        'primary-foreground': colors.primary.foreground,
        secondary: colors.secondary.DEFAULT,
        'secondary-foreground': colors.secondary.foreground,
        muted: colors.background.muted,
        'muted-foreground': colors.foreground.muted,
        accent: colors.primary.DEFAULT,
        'accent-foreground': colors.primary.foreground,
        destructive: colors.destructive.DEFAULT,
        'destructive-foreground': colors.destructive.foreground,
        border: colors.border.DEFAULT,
        input: colors.border.DEFAULT,
        ring: colors.primary.DEFAULT,
        
        // Feedback colors
        success: colors.success.DEFAULT,
        warning: colors.warning.DEFAULT,
        info: colors.info.DEFAULT,
        
        // Original zinc colors for backward compatibility
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
