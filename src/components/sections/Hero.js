import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import TechMarquee from '../TechMarquee';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 4rem;
  background-color: ${theme.colors.primary};
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(3.5rem, 7vw, 6rem);
  font-weight: 700;
  line-height: 0.9;
  color: ${theme.colors.secondary};
  margin: 0 0 2rem 0;
  font-family: ${theme.fonts.primary};
  letter-spacing: -0.02em;
  text-align: center;
  width: 100%;
  
  @media (max-width: 767px) {
    font-size: clamp(2.2rem, 7vw, 3.5rem);
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${theme.colors.secondary};
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.8;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const MarqueeSection = styled.div`
  margin-top: 4rem;
  width: 100%;
`;

const DownArrow = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem auto 0;
  cursor: pointer;
  
  &::after {
    content: '↓';
    color: ${theme.colors.primary};
    font-size: 1.5rem;
  }
`;

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <HeroContainer id="home">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <HeroContent>
          <motion.div variants={titleVariants}>
            <MainTitle>BRIDGING TECHNOLOGY<br />ACROSS EUROPE & MEA</MainTitle>
          </motion.div>

          <motion.div variants={titleVariants}>
            <Description>
              Empowering businesses with innovative IT, technology, and AI 
              solutions that bridge European and MEA markets.
            </Description>
          </motion.div>
        </HeroContent>

        <MarqueeSection>
          <TechMarquee />
        </MarqueeSection>

        <DownArrow
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        />
      </motion.div>
    </HeroContainer>
  );
};

export default Hero;