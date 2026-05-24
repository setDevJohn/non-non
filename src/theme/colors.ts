const colors = {
  // Backgrounds
  background: {
    primary: '#09090b', // zinc-950
    secondary: '#0a0a0a', // neutral-950
    card: '#18181b', // zinc-900
    cardLight: '#27272a', // zinc-800
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
  
  // Text
  text: {
    primary: '#fafafa',
    secondary: '#a1a1aa',
    muted: '#71717a',
  },
  
  // Borders
  border: {
    default: '#27272a',
    light: '#3f3f46',
  },
  
  // Status
  status: {
    success: '#10b981',
    warning: '#facc15',
    error: '#ef4444',
    info: '#3b82f6',
  },
} as const;

export default colors;
