import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ImageContainer = styled(motion.div)`
  contain: paint;
  display: block;
  width: fit-content;
  height: auto;
  overflow: hidden;
`;

const ImageWrapper = styled(motion.div)`
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Image = styled(motion.img)`
  height: 100%;
  width: 100%;
  object-fit: cover;
  transform-origin: center;
`;

const ImageReveal = ({ 
  src, 
  alt, 
  direction = 'bottom', 
  scale = 1.3,
  duration = 0.8,
  className 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef();

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation variants based on direction
  const getAnimationVariants = () => {
    const transforms = {
      top: { wrapper: 'translateY(-100%)', image: 'translateY(100%)' },
      bottom: { wrapper: 'translateY(100%)', image: 'translateY(-100%)' },
      left: { wrapper: 'translateX(-100%)', image: 'translateX(100%)' },
      right: { wrapper: 'translateX(100%)', image: 'translateX(-100%)' }
    };

    return {
      wrapper: {
        hidden: { transform: transforms[direction].wrapper },
        visible: { 
          transform: 'translate(0, 0)',
          transition: { duration, ease: [0.25, 0.1, 0.25, 1] }
        }
      },
      image: {
        hidden: { 
          transform: `${transforms[direction].image} scale(${scale})` 
        },
        visible: { 
          transform: 'translate(0, 0) scale(1)',
          transition: { duration, ease: [0.25, 0.1, 0.25, 1] }
        }
      }
    };
  };

  const variants = getAnimationVariants();

  return (
    <ImageContainer 
      ref={containerRef}
      className={className}
    >
      <ImageWrapper
        isVisible={isVisible}
        variants={variants.wrapper}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <Image
          src={src}
          alt={alt}
          variants={variants.image}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        />
      </ImageWrapper>
    </ImageContainer>
  );
};

export default ImageReveal;