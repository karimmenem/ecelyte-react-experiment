export const theme = {
  colors: {
    primary: '#ecebe4',     // Real cream background
    secondary: '#172126',   // Real dark navy
    accent: '#9b9074',      // Real brown accent
    text: '#0c1015',        // Real dark text
    white: '#ffffff',
  },
  
  fonts: {
    primary: '"Aeonik", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    weights: {
      regular: 400,
      medium: 500,
      bold: 700,
    }
  },
  
  breakpoints: {
    mobile: '478px',
    tablet: '767px', 
    desktop: '1100px',
    large: '1440px',
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem', 
    lg: '3rem',
    xl: '4rem',
    xxl: '6rem',
  },
  
  animations: {
    duration: {
      fast: '0.3s',
      normal: '0.6s', 
      slow: '1.2s',
    },
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  }
};