import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Header from './Header';
import Footer from './Footer';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.primary};
  overflow-x: hidden;
`;

const MainContent = styled.main`
  width: 100%;
  position: relative;
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;