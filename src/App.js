import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { theme } from './styles/theme';
import './styles/globals.css';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import Approach from './components/sections/Approach';
import TextMarquee from './components/TextMarquee';
import Services from './components/sections/Services';
import Recognition from './components/sections/Recognition';
import BrandMarquee from './components/sections/BrandMarquee';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.fonts.primary};
    line-height: 1.6;
    color: ${theme.colors.text};
    background-color: ${theme.colors.primary};
    overflow-x: hidden;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    font-family: inherit;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Hero />
        <Approach />
        <TextMarquee />
        <Services />
        <Recognition />
        <BrandMarquee />
      </Layout>
    </>
  );
}

export default App;