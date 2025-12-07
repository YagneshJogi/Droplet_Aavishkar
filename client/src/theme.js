// src/theme.js
export const theme = {
  colors: {
    primary: '#2563eb',
    primaryDark: '#1f4ed8',
    secondary: '#10b981',

    // used by some components, not the actual page background now
    background: '#071122',

    surface: '#ffffff',
    text: {
      primary: 'rgba(255,255,255,0.95)',   // high contrast on dark bg
      secondary: 'rgba(255,255,255,0.78)',
      muted: 'rgba(255,255,255,0.65)',
    },
    status: {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
    },
  },
  ui: {
    // slightly stronger glass so ocean doesn’t overpower content
    glassBg: 'rgba(15,23,42,0.68)',      // deep navy with alpha
    glassBgLight: 'rgba(15,23,42,0.58)',
    cardBorder: 'rgba(148,163,184,0.35)',
    cardShadow: '0 18px 40px rgba(15,23,42,0.55), inset 0 1px 0 rgba(255,255,255,0.03)',
    blur: '14px',

    // accents
    accent: '#60a5fa',
    accentAlt: '#06b6d4',
    accentSoft: '#7c3aed',
    success: '#10b981',
    danger: '#ef4444',
    neutral: '#94a3b8',
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 700 },
    body1: { fontSize: '1rem', fontWeight: 500 },
    body2: { fontSize: '0.95rem', fontWeight: 500 },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
};
