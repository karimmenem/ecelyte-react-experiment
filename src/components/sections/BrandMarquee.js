import React from 'react';
import styled, { keyframes } from 'styled-components';

// Continuous scroll keyframes
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Bar = styled.section`
  width: 100vw; margin-left: 50%; transform: translateX(-50%);
  overflow: hidden; position: relative; height: clamp(90px, 12vh, 130px);
  display: flex; align-items: center; user-select: none; -webkit-user-select: none;
  background: ${({ theme }) => theme.mode === 'dark'
    ? `linear-gradient(180deg, ${theme.colors.backgroundDark} 0%, ${theme.colors.panel} 55%, ${theme.colors.backgroundDark} 100%)`
    : `linear-gradient(180deg, ${theme.colors.primary} 0%, ${theme.colors.panel} 55%, ${theme.colors.primary} 100%)`};
  border-top: 1px solid ${({ theme }) => theme.colors.borderAlt}33;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderAlt}33;
  &::before, &::after { content: ''; position: absolute; top:0; width: 160px; height:100%; z-index: 3; pointer-events:none; }
  &::before { left:0; background: linear-gradient(90deg, ${({ theme }) => theme.mode === 'dark'? theme.colors.backgroundDark : theme.colors.primary} 0%, transparent 100%); }
  &::after { right:0; background: linear-gradient(270deg, ${({ theme }) => theme.mode === 'dark'? theme.colors.backgroundDark : theme.colors.primary} 0%, transparent 100%); }
`;

const Track = styled.div`
  display:flex; align-items:center; gap: clamp(2rem,4vw,4rem); width:200%;
  animation: ${scroll} 22s linear infinite;
  will-change: transform; white-space: nowrap; font-weight: 800;
  font-size: clamp(1.5rem, 4.5vw, 3.5rem); /* reduced size */
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.mode === 'dark' ? theme.colors.white : theme.colors.secondary};
  text-transform: lowercase;
  transition: color .4s ease;
  &:hover { animation-play-state: paused; }
  span { display:inline-block; background: linear-gradient(90deg, currentColor 0%, currentColor 100%); -webkit-background-clip: text; color: currentColor; }
`;

const VisuallyHidden = styled.span`
  position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0 0 0 0); border:0; white-space:nowrap;
`;

const words = Array(24).fill('encelyte™');

const BrandMarquee = () => (
  <Bar aria-hidden="true" role="presentation">
    <VisuallyHidden>Encelyte brand repeating marquee decorative</VisuallyHidden>
    <Track>
      {words.map((w,i) => <span key={i}>{w}</span>)}
    </Track>
  </Bar>
);

export default BrandMarquee;
