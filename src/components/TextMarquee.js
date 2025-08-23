import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const MarqueeSection = styled.section`
  width: 100vw;
  overflow: hidden;
  position: relative;
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 3rem 0;
  background-color: ${theme.colors.primary};
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
  
  &.right {
    animation: ${scrollRight} 25s linear infinite;
  }
  
  &.left {
    animation: ${scrollLeft} 25s linear infinite;
  }
`;

const MarqueeText = styled.span`
  font-size: clamp(2.25rem, 6vw, 6rem);
  font-weight: 700;
  color: ${theme.colors.secondary};
  font-family: ${theme.fonts.primary};
  margin-right: 2.25rem;
  text-transform: uppercase;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(1.5rem, 4.5vw, 3.75rem);
    margin-right: 1.5rem;
  }
`;

const Separator = styled.span`
  font-size: clamp(1.5rem, 4.5vw, 4.5rem);
  color: #8B7355;
  margin-right: 2.25rem;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(1.125rem, 3vw, 3rem);
    margin-right: 1.5rem;
  }
`;

const TextMarquee = () => {
  const rightTextArray = Array(8).fill("LET'S DIVE IN");
  const leftTextArray = Array(8).fill("WILD IDEAS!");

  return (
    <MarqueeSection>
      <MarqueeTrack className="right">
        {rightTextArray.map((text, index) => (
          <React.Fragment key={`right-${index}`}>
            <MarqueeText>{text}</MarqueeText>
            <Separator>—</Separator>
          </React.Fragment>
        ))}
      </MarqueeTrack>

      <MarqueeTrack className="left">
        {leftTextArray.map((text, index) => (
          <React.Fragment key={`left-${index}`}>
            <MarqueeText>{text}</MarqueeText>
            <Separator>—</Separator>
          </React.Fragment>
        ))}
      </MarqueeTrack>
    </MarqueeSection>
  );
};

export default TextMarquee;