import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const MissionContainer = styled.section`
  padding: 6rem 2rem;
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.primary};
`;

const MissionContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const MissionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: ${theme.fonts.weights.bold};
  line-height: 1.2;
  margin-bottom: 3rem;
  color: ${theme.colors.primary};
`;

const MissionText = styled(motion.p)`
  font-size: 1.3rem;
  line-height: 1.8;
  color: ${theme.colors.primary};
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.1rem;
  }
`;

const Mission = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <MissionContainer id="mission">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <MissionContent>
          <motion.div variants={itemVariants}>
            <MissionTitle>Our Mission</MissionTitle>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <MissionText>
              Our mission is to bridge the gap between cutting-edge technology and business success. 
              We empower organizations to transform their vision into reality through innovative 
              digital solutions that drive growth, efficiency, and competitive advantage in an 
              ever-evolving technological landscape.
            </MissionText>
          </motion.div>
        </MissionContent>
      </motion.div>
    </MissionContainer>
  );
};

export default Mission;