import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const ArrowContainer = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 10;
`;

const ArrowIcon = styled(motion.div)`
  width: 24px;
  height: 24px;
  border: 2px solid ${theme.colors.secondary};
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
  margin: 0 auto;
`;

const ArrowText = styled(motion.p)`
  font-size: 0.8rem;
  color: ${theme.colors.secondary};
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  writing-mode: vertical-lr;
  text-orientation: mixed;
`;

const ScrollArrow = () => {
  const handleScroll = () => {
    const nextSection = document.querySelector('#services') || 
                       document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bounceVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <ArrowContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onClick={handleScroll}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div variants={bounceVariants} animate="animate">
        <ArrowIcon />
        <ArrowText>Scroll</ArrowText>
      </motion.div>
    </ArrowContainer>
  );
};

export default ScrollArrow;