import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const MarqueeSection = styled.section`
  width: 100vw;
  overflow: hidden;
  position: relative;
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 3rem 0; /* Reduced padding */
  background-color: ${theme.colors.primary};
`;

// Right-moving animation
const scrollRight = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

// Left-moving animation  
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
  margin-bottom: 0.5rem; /* Much closer together */
  
  &.right {
    animation: ${scrollRight} 25s linear infinite;
  }
  
  &.left {
    animation: ${scrollLeft} 25s linear infinite;
  }
`;

const MarqueeText = styled.span`
  font-size: clamp(2.25rem, 6vw, 6rem); /* 75% of original size */
  font-weight: 700;
  color: ${theme.colors.secondary};
  font-family: ${theme.fonts.primary};
  margin-right: 2.25rem; /* 75% of original spacing */
  text-transform: uppercase;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(1.5rem, 4.5vw, 3.75rem); /* 75% of mobile size */
    margin-right: 1.5rem;
  }
`;

const Separator = styled.span`
  font-size: clamp(1.5rem, 4.5vw, 4.5rem); /* 75% of original size */
  color: #8B7355;
  margin-right: 2.25rem; /* 75% of original spacing */
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(1.125rem, 3vw, 3rem); /* 75% of mobile size */
    margin-right: 1.5rem;
  }
`;

const ServicesLabel = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  font-size: 1.2rem;
  color: ${theme.colors.secondary};
  opacity: 0.6;
  font-weight: 500;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1rem;
    left: 1rem;
    bottom: 1rem;
  }
`;

const TextMarquee = () => {
  // Repeat text multiple times for seamless loop
  const rightTextArray = Array(8).fill("LET'S DIVE IN");
  const leftTextArray = Array(8).fill("WILD IDEAS!");

  return (
    <MarqueeSection>
      {/* Right-moving text */}
      <MarqueeTrack className="right">
        {rightTextArray.map((text, index) => (
          <React.Fragment key={`right-${index}`}>
            <MarqueeText>{text}</MarqueeText>
            <Separator>—</Separator>
          </React.Fragment>
        ))}
      </MarqueeTrack>

      {/* Left-moving text */}
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