// Theme with light / dark mode support + status colors
// Usage: import { theme, createTheme } from './styles/theme';
// Access current mode via context (see Layout) or create manually: createTheme('dark')

const statusPairs = {
  info: { text: '#00b0f4', bgLight: '#e5f3ff', bgDark: '#06364a' },
  success: { text: '#11b76b', bgLight: '#e6f6ed', bgDark: '#0b3a28' },
  warning: { text: '#ffa100', bgLight: '#fff2d7', bgDark: '#4a3200' },
  danger: { text: '#fa4362', bgLight: '#ffe6ec', bgDark: '#4a0f18' },
};

const palette = {
  navy: '#002d4b',
  blueMid: '#014572',
  darkAlt: '#1f2b32',
  neutralLight: '#f0f4f9',
  neutralMid: '#ecebe4',
  neutralDark: '#0c1015',
  white: '#ffffff',
  sand: '#aca48b',
  success: '#1cb39b',
  successAlt: '#35c36b',
  tealBorder: '#77d7c8'
};

// Replace previous lightColors / darkColors with refined brand palette
const lightColors = {
  primary: palette.neutralLight,        // page background
  secondary: palette.navy,              // headings / primary text
  accent: palette.blueMid,              // accent / CTAs
  text: palette.navy,
  textDark: palette.navy,
  textMedium: '#375a6d',
  textLight: '#6b8590',
  // Semantic success (others could be added similarly)
  success: palette.success,
  successAlt: palette.successAlt,
  // Surfaces
  panel: palette.white,
  panelAlt: palette.neutralMid,
  backgroundLight: palette.neutralLight,
  backgroundDark: palette.navy,
  border: palette.sand,
  borderAlt: palette.tealBorder,
  // Selection / focus
  selectionBg: palette.darkAlt,
  selectionText: palette.neutralMid,
  focus: palette.blueMid,
  // Tooltip
  tooltipBg: palette.navy,
  tooltipText: palette.white,
  // Utilities
  white: palette.white,
};

const darkColors = {
  primary: palette.navy,                // page background (inverted)
  secondary: palette.white,             // headings / primary text
  accent: palette.blueMid,
  text: palette.white,
  textDark: palette.white,
  textMedium: '#d4dde2',
  textLight: '#aebcc3',
  success: palette.success,
  successAlt: palette.successAlt,
  panel: palette.darkAlt,               // elevated surface
  panelAlt: palette.neutralDark,
  backgroundLight: palette.darkAlt,
  backgroundDark: palette.neutralDark,
  border: '#133449',
  borderAlt: palette.tealBorder,
  selectionBg: palette.neutralMid,
  selectionText: palette.navy,
  focus: palette.blueMid,
  tooltipBg: palette.white,
  tooltipText: palette.navy,
  white: palette.white,
};

const base = {
  fonts: {
    primary: '"Aeonik", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    weights: { regular: 400, medium: 500, bold: 700 }
  },
  breakpoints: { mobile: '478px', tablet: '767px', desktop: '1100px', large: '1440px' },
  spacing: { xs: '0.5rem', sm: '1rem', md: '2rem', lg: '3rem', xl: '4rem', xxl: '6rem' },
  animations: {
    duration: { fast: '0.3s', normal: '0.6s', slow: '1.2s' },
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
  },
  status: {
    info: mode => ({ text: statusPairs.info.text, bg: mode === 'dark' ? statusPairs.info.bgDark : statusPairs.info.bgLight }),
    success: mode => ({ text: statusPairs.success.text, bg: mode === 'dark' ? statusPairs.success.bgDark : statusPairs.success.bgLight }),
    warning: mode => ({ text: statusPairs.warning.text, bg: mode === 'dark' ? statusPairs.warning.bgDark : statusPairs.warning.bgLight }),
    danger: mode => ({ text: statusPairs.danger.text, bg: mode === 'dark' ? statusPairs.danger.bgDark : statusPairs.danger.bgLight }),
  }
};

export const createTheme = (mode = 'light') => ({
  mode,
  palette,
  colors: mode === 'dark' ? darkColors : lightColors,
  modes: { light: lightColors, dark: darkColors },
  ...base,
});

// Default export (light mode) for backward compatibility
export const theme = createTheme('light');