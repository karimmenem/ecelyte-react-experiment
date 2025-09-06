import '../src/styles/globals.css';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </LanguageProvider>
  );
}
