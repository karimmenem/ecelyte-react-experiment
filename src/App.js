import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import Approach from './components/sections/Approach';
import TextMarquee from './components/TextMarquee';
import Services from './components/sections/Services';
import Recognition from './components/sections/Recognition';
import styled from 'styled-components';
import Insights from './components/sections/Insights'; // added

// Single subtle creative separator
const Separator = styled.div`
  position: relative; width: 100%; height: 64px; pointer-events: none; overflow: visible;
  &:before { /* main gradient hairline */
    content: ''; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
    width: min(1180px, 92%); height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.borderAlt}, transparent);
    opacity: .55;
  }
  &:after { /* soft center glow */
    content: ''; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
    width: 140px; height: 28px; border-radius: 999px;
    background: radial-gradient(circle at 50% 50%, ${({ theme }) => theme.colors.panel} 0%, transparent 70%);
    mix-blend-mode: plus-lighter; opacity: .35; filter: blur(4px);
  }
`;

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: ${({ theme }) => theme.fonts.primary}; line-height: 1.6; overflow-x: hidden; background: ${({ theme }) => theme.colors.primary}; color: ${({ theme }) => theme.colors.text}; transition: background 0.4s ease, color 0.4s ease; }
`;

function App() {
  return (
    <Layout>
      <GlobalStyle />
      <Hero />
      <Separator />
      <Approach />
      <Separator />
      <Insights /> {/* new live insights section */}
      <Separator />
      <TextMarquee />
      <Separator />
      <Services />
      <Separator />
      <Recognition />
      {/* Removed brand marquee and trailing separator */}
    </Layout>
  );
}

export default App;