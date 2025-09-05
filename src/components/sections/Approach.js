import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ApproachContainer = styled.section`
  padding: 8rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  transition: background 0.4s ease, color 0.4s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 6rem 2rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0 0 2rem 0;
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: color 0.4s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0 0 1.5rem 0;
  }
`;

const QuoteText = styled.p`
  font-size: clamp(1.3rem, 2.5vw, 2.2rem);
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 400;
  margin: 0;
  opacity: 0.95;
  transition: color 0.4s ease;
  max-width: 1000px;
`;

const AnimatedWord = styled.span`
  display:inline-block; margin-right:0.3em; position:relative; will-change:filter, transform, opacity; filter:blur(6px); opacity:.25; transform:translateY(6px);
  transition:filter .9s cubic-bezier(.19,1,.22,1), opacity .9s cubic-bezier(.19,1,.22,1), transform .9s cubic-bezier(.19,1,.22,1);
  &.visible { filter:blur(0); opacity:1; transform:translateY(0); }
`;

const Approach = () => {
  const text = '"We believe in the power of human-centered design and technological innovation. Based in Cyprus and Lebanon, we blend local expertise with global perspectives to create solutions that drive real business transformation."';
  const words = text.split(' ');
  const wordRefs = useRef([]);
  const sectionRef = useRef(null);
  const wordObserverRef = useRef(null);

  useEffect(() => {
    // Observer to reveal words
    wordObserverRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          wordObserverRef.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

    function observeAll() {
      wordRefs.current.forEach(el => el && wordObserverRef.current.observe(el));
    }
    observeAll();

    // Scroll listener to reset when section fully out of view
    const handleScroll = () => {
      const el = sectionRef.current; if (!el) return; const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const fullyOut = r.bottom < 0 || r.top > vh; // completely above or below viewport
      if (fullyOut) {
        // reset words
        wordRefs.current.forEach(w => { if (w) { w.classList.remove('visible'); } });
        observeAll();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); wordObserverRef.current && wordObserverRef.current.disconnect(); };
  }, []);

  const titleVariants = { hidden:{opacity:0,y:50}, visible:{opacity:1,y:0,transition:{duration:.8,ease:[0.25,0.1,0.25,1]}} };

  return (
    <ApproachContainer ref={sectionRef}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }}>
        <motion.div variants={titleVariants}>
          <SectionTitle>Our Philosophy</SectionTitle>
        </motion.div>
        <QuoteText aria-label="Company philosophy statement">
          {words.map((word, i) => (
            <AnimatedWord key={i} ref={el => wordRefs.current[i] = el}>{word}</AnimatedWord>
          ))}
        </QuoteText>
      </motion.div>
    </ApproachContainer>
  );
};

export default Approach;