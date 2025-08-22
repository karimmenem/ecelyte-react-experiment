import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const TitleContainer = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const MainTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: ${theme.fonts.weights.bold};
  line-height: 0.9;
  margin: 0;
  overflow: hidden;
`;

const SubTitle = styled.h2`
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: ${theme.fonts.weights.medium};
  line-height: 0.9;
  margin: 1rem 0 0 0;
  color: ${theme.colors.accent};
  overflow: hidden;
`;

const AnimatedLine = styled(motion.div)`
  display: inline-block;
  overflow: hidden;
`;

const AnimatedWord = styled(motion.span)`
  display: inline-block;
  margin-right: 0.3em;
  color: ${theme.colors.secondary};
`;

const BladeTitle = ({ text, subtitle }) => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const lineVariants = {
    hidden: { 
      clipPath: 'inset(0 100% 0 0)' 
    },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.05
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0,
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const renderAnimatedText = (text, isSubtitle = false) => {
    const words = text.split(' ');
    
    return (
      <AnimatedLine
        variants={lineVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {words.map((word, index) => (
          <AnimatedWord
            key={index}
            variants={wordVariants}
            style={isSubtitle ? { color: theme.colors.accent } : {}}
          >
            {word}
          </AnimatedWord>
        ))}
      </AnimatedLine>
    );
  };

  return (
    <TitleContainer ref={titleRef}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <MainTitle>
          {renderAnimatedText(text)}
        </MainTitle>
        {subtitle && (
          <SubTitle>
            {renderAnimatedText(subtitle, true)}
          </SubTitle>
        )}
      </motion.div>
    </TitleContainer>
  );
};

export default BladeTitle;