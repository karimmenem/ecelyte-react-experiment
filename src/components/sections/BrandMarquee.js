import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const BrandMarquee = () => {
  return (
    <section style={{
      backgroundColor: `${theme.colors.primary}`,
      height: '120px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    }}>
      <motion.div
        animate={{
          x: [0, '-50%']
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear"
          }
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          fontSize: 'clamp(2rem, 6vw, 5rem)',
          fontWeight: '900',
          color: '#1a1a1a',
          gap: '6rem',
          position: 'absolute',
          width: '200%',
          left: 0
        }}
      >
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
        <span>encelyte™</span>
      </motion.div>
    </section>
  );
};

export default BrandMarquee;
