import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const ApproachContainer = styled.section`
  padding: 8rem 2rem;
  background-color: ${theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 6rem 2rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  color: ${theme.colors.secondary};
  margin: 0 0 2rem 0;
  font-family: ${theme.fonts.primary};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin: 0 0 1.5rem 0;
  }
`;

const QuoteText = styled(motion.p)`
  font-size: clamp(1.3rem, 2.5vw, 2.2rem);
  line-height: 1.5;
  color: ${theme.colors.secondary};
  font-weight: 400;
  margin: 0;
  opacity: 0.9;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(1.1rem, 4vw, 1.8rem);
    line-height: 1.4;
  }
`;

const AnimatedWord = styled(motion.span)`
  display: inline-block;
  margin-right: 0.3em;
`;

const Approach = () => {
  const text = "Empowering businesses through innovative IT, technology, and AI solutions. As a consulting and development firm operating in Cyprus and Lebanon, we bridge European and MEA markets with tailored technological services — from custom IT consulting to website and application development, all designed to drive sustainable technological growth across regional boundaries.";
  
  const words = text.split(" ");

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: 50
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <ApproachContainer>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={titleVariants}>
          <SectionTitle>Our Approach</SectionTitle>
        </motion.div>

        <QuoteText>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {words.map((word, index) => (
              <AnimatedWord
                key={index}
                variants={wordVariants}
              >
                {word}
              </AnimatedWord>
            ))}
          </motion.div>
        </QuoteText>
      </motion.div>
    </ApproachContainer>
  );
};

export default Approach;