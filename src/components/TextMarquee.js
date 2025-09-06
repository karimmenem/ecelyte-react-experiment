import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

const MarqueeSection = styled.section`
  width: 100vw;
  overflow: hidden;
  position: relative;
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 3rem 0;
  transition: background 0.4s ease;
  background: ${({ theme }) => theme.mode === 'dark'
    ? `linear-gradient(180deg, ${theme.colors.backgroundDark} 0%, ${theme.colors.panel} 55%, ${theme.colors.backgroundDark} 100%)`
    : `linear-gradient(180deg, ${theme.colors.primary} 0%, ${theme.colors.panel} 55%, ${theme.colors.primary} 100%)`};

  @media (max-width: 768px) {
    padding: 2.5rem 0;
  }

  @media (max-width: 480px) {
    padding: 2rem 0;
  }

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 160px;
    height: 100%;
    z-index: 3;
    pointer-events: none;
    
    @media (max-width: 768px) {
      width: 120px;
    }
    
    @media (max-width: 480px) {
      width: 80px;
    }
  }

  &::before {
    left: 0;
    background: linear-gradient(90deg, ${({ theme }) => theme.mode === 'dark'? theme.colors.backgroundDark : theme.colors.primary} 0%, transparent 100%);
  }

  &::after {
    right: 0;
    background: linear-gradient(270deg, ${({ theme }) => theme.mode === 'dark'? theme.colors.backgroundDark : theme.colors.primary} 0%, transparent 100%);
  }

  /* subtle center glow */
  &:after {
    box-shadow: none;
  }
`;

const scrollRight = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const scrollLeft = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const MarqueeTrack = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  width: 200%;
  margin-bottom: 0.5rem;
  gap: 2.25rem;
  position: relative;

  @media (max-width: 768px) {
    gap: 1.8rem;
    margin-bottom: 0.4rem;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
    margin-bottom: 0.3rem;
  }

  &.right {
    animation: ${scrollRight} 22s linear infinite;
  }

  &.left {
    animation: ${scrollLeft} 22s linear infinite;
  }

  &:hover {
    animation-play-state: paused;
  }
`;

const MarqueeText = styled.span`
  font-size: clamp(1.4rem, 4.2vw, 3.2rem); /* reduced */
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-transform: uppercase;
  transition: color .4s ease;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: clamp(1.1rem, 3.8vw, 2.3rem);
  }

  @media (max-width: 480px) {
    font-size: clamp(1rem, 4.5vw, 2rem);
  }
`;

const Separator = styled.span`
  font-size: clamp(1.2rem, 3.8vw, 2.8rem); /* reduced */
  line-height: 1;
  display: inline-block;
  transform: translateY(-4%);
  color: ${({ theme }) => theme.mode === 'dark' ? theme.colors.borderAlt : theme.colors.accent};
  opacity: .55;
  transition: color .4s ease, opacity .4s ease;

  @media (max-width: 768px) {
    font-size: clamp(.9rem, 2.8vw, 1.9rem);
  }

  @media (max-width: 480px) {
    font-size: clamp(.8rem, 3.5vw, 1.6rem);
  }
`;

const TextMarquee = () => {
  const { t } = useLanguage();
  const rightTextArray = Array(10).fill(t('marquee.rightText'));
  const leftTextArray = Array(10).fill(t('marquee.leftText'));

  return (
    <MarqueeSection>
      <MarqueeTrack className="right">
        {rightTextArray.map((text, index) => (
          <React.Fragment key={`right-${index}`}>
            <MarqueeText>{text}</MarqueeText>
            <Separator aria-hidden="true">—</Separator>
          </React.Fragment>
        ))}
      </MarqueeTrack>

      <MarqueeTrack className="left">
        {leftTextArray.map((text, index) => (
          <React.Fragment key={`left-${index}`}>
            <MarqueeText>{text}</MarqueeText>
            <Separator aria-hidden="true">—</Separator>
          </React.Fragment>
        ))}
      </MarqueeTrack>
    </MarqueeSection>
  );
};

export default TextMarquee;