import React, { useState, useMemo, createContext, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme as baseTheme, createTheme } from '../../styles/theme';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

export const ThemeModeContext = createContext({ mode: 'light', toggle: () => {}, theme: baseTheme });

const LayoutContainer = styled.div`
  min-height: 100vh;
  font-family: ${baseTheme.fonts.primary};
  overflow-x: hidden;
`;

const MainContent = styled.main`
  width: 100%;
  position: relative;
`;

const Layout = ({ children }) => {
  const [mode, setMode] = useState('light');
  const activeTheme = useMemo(() => (mode === 'dark' ? createTheme('dark') : createTheme('light')), [mode]);
  const toggle = () => setMode(m => m === 'light' ? 'dark' : 'light');
  const router = useRouter();
  const hideHeader = router && (router.pathname === '/admin/login' || router.pathname === '/careers');
  return (
    <ThemeModeContext.Provider value={{ mode, toggle, theme: activeTheme }}>
      <ThemeProvider theme={activeTheme}>
        <LayoutContainer>
          {!hideHeader && <Header />}
          <MainContent>
            {children}
          </MainContent>
          <Footer />
        </LayoutContainer>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
export const useThemeMode = () => useContext(ThemeModeContext);

export default Layout;