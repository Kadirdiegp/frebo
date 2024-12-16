export const theme = {
  colors: {
    primary: {
      DEFAULT: '#000000', // Schwarz für den Hintergrund
      light: '#1A1A1A',   // Dunkelgraues Blau für Karten und Hover
      dark: '#000000'     // Schwarzes Blau für aktive Zustände
    },
    accent: {
      DEFAULT: '#60A5FA', // Hellblaues Blau für Buttons
      light: '#93C5FD',   // Helleres Hellblaues Blau für Hover
      dark: '#3B82F6'     // Dunkleres Hellblaues Blau für aktive Zustände
    },
    text: {
      primary: '#FFFFFF',   // Weiß für primären Text
      secondary: '#60A5FA', // Hellblaues Blau für sekundären Text
      muted: '#9CA3AF'      // Grau für Akzente
    },
    background: {
      DEFAULT: '#000000', // Schwarz für den Hintergrund
      light: '#1A1A1A',   // Dunkelgraues Blau für Karten und Hover
      dark: '#000000'     // Schwarzes Blau für aktive Zustände
    }
  },
  fonts: {
    sans: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
} as const;

export default theme;
