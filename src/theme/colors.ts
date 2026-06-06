const colors = {
  // Primary
  primary: {
    DEFAULT: '#10b981', // emerald-500
    foreground: '#ffffff',
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },

  // Secondary
  secondary: {
    DEFAULT: '#3f3f46', // zinc-700 (lighter for better contrast)
    foreground: '#fafafa',
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },

  // Background
  background: {
    DEFAULT: '#18181b', // zinc-900 (lighter for better contrast)
    foreground: '#fafafa',
    secondary: '#27272a', // zinc-800
    secondaryForeground: '#fafafa',
    muted: '#27272a', // zinc-800
    mutedForeground: '#a1a1aa',
  },

  // Card
  card: {
    DEFAULT: '#27272a', // zinc-800 (lighter for better contrast)
    foreground: '#fafafa',
    elevated: '#3f3f46', // zinc-700
  },

  // Border
  border: {
    DEFAULT: '#3f3f46', // zinc-700 (lighter for better contrast)
    muted: '#52525b', // zinc-600
  },

  // Text
  foreground: {
    DEFAULT: '#fafafa',
    muted: '#a1a1aa',
    placeholder: '#71717a',
  },

  // Feedback
  success: {
    DEFAULT: '#10b981', // emerald-500
    foreground: '#ffffff',
  },
  warning: {
    DEFAULT: '#facc15', // yellow-400
    foreground: '#000000',
  },
  destructive: {
    DEFAULT: '#ef4444', // red-500
    foreground: '#ffffff',
  },
  info: {
    DEFAULT: '#3b82f6', // blue-500
    foreground: '#ffffff',
  },

  // Accents
  accent: {
    emerald: '#10b981',
    emeraldDark: '#059669',
    blue: '#3b82f6',
    yellow: '#facc15',
    yellowLight: '#fde047',
    red: '#ef4444',
  },

  // Badges
  badge: {
    bronze: '#b45309', // amber-700
    silver: '#cbd5e1', // slate-300
    gold: '#fde047', // yellow-300
    locked: '#3f3f46', // zinc-700
  },
} as const;

// Light mode colors
export const lightColors = {
  ...colors,
  background: {
    DEFAULT: '#ffffff',
    foreground: '#09090b',
    secondary: '#f4f4f5',
    secondaryForeground: '#09090b',
    muted: '#f4f4f5',
    mutedForeground: '#71717a',
  },
  card: {
    DEFAULT: '#ffffff',
    foreground: '#09090b',
    elevated: '#fafafa',
  },
  border: {
    DEFAULT: '#e4e4e7',
    muted: '#d4d4d8',
  },
  foreground: {
    DEFAULT: '#09090b',
    muted: '#71717a',
    placeholder: '#a1a1aa',
  },
} as const;

// Dark mode colors (default)
export const darkColors = colors;

export default colors;
