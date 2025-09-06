import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import styled, { useTheme } from 'styled-components';
import { useLanguage } from '../../contexts/LanguageContext';

const ServicesSection = styled.section`
  /* Shorter section height */
  min-height: auto; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 4rem 1.5rem 4rem; transition: background 0.6s ease, color 0.4s ease;
  color: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(180deg, ' + theme.colors.backgroundDark + ' 0%, ' + theme.colors.backgroundDark + ' 100%)'
    : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem 3rem;
  }
  
  @media (max-width: 480px) {
    padding: 2.5rem 0.75rem 2rem;
  }
  
  @media (max-width: 320px) {
    padding: 2rem 0.5rem 1.5rem;
  }
`;

// Add back a dedicated header and title with proper stacking to ensure visibility
const SectionHeader = styled.div`
  max-width: 1200px; text-align: center; margin-bottom: 1.75rem; position: relative; z-index: 2;
  
  @media (max-width: 768px) { 
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) { 
    margin-bottom: 1.25rem;
    padding: 0 0.5rem;
  }
  
  @media (max-width: 320px) { 
    margin-bottom: 1rem;
    padding: 0 0.25rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; margin: 0; line-height: 1.1; color: ${({ theme }) => theme.colors.secondary};
  
  @media (max-width: 480px) {
    font-size: clamp(2rem, 8vw, 2.8rem);
    line-height: 1.15;
  }
  
  @media (max-width: 320px) {
    font-size: clamp(1.8rem, 9vw, 2.4rem);
  }
`;

const SectionDivider = styled.div`
  width: 100%; height: 1px; background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.borderAlt}, transparent); margin: 0 0 3rem; opacity: .6;
`;

// Updated sizing: 90% width with 5px margins on each side, and reduced height for a more compact section
const CardsContainer = styled.div`
  position: relative; z-index: 1; width: calc(90% - 10px); max-width: none; margin: 0 5px; height: 420px; cursor: pointer; perspective: 1200px; overflow: hidden;
  
  @media (max-width: 768px) {
    width: calc(95% - 10px);
    height: 380px;
  }
  
  @media (max-width: 480px) {
    width: calc(100% - 20px);
    height: auto;
    perspective: none;
    overflow: visible;
    padding-bottom: 100px; /* room for mobile controls */
    margin: 0 10px;
  }
  
  @media (max-width: 320px) {
    width: calc(100% - 10px);
    margin: 0 5px;
    padding-bottom: 90px;
  }
`;

const ServiceCard = styled(motion.div)`
  position: absolute; top: 0; left: 0; right: 0; height: 100%; border-radius: 1.5rem; padding: 2.25rem; display: flex; flex-direction: column; justify-content: flex-start; box-shadow: 0 22px 44px -14px rgba(0,0,0,0.25); transition: background 0.5s ease, color 0.5s ease, transform 0.5s ease, border-color 0.4s ease; border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(6px);
  
  @media (max-width: 768px) { 
    border-radius: 1.25rem; 
    padding: 1.75rem; 
  }
  
  @media (max-width: 480px) { 
    border-radius: 1rem; 
    padding: 1.25rem; 
  }
  
  @media (max-width: 320px) { 
    border-radius: 0.75rem; 
    padding: 1rem; 
  }
`;

// Subtle glow behind active card
const Glow = styled(motion.div)`
  position: absolute; inset: -2rem; border-radius: 2rem; filter: blur(40px); pointer-events: none; opacity: 0.32;
  @media (max-width: 480px) { inset: -1.25rem; filter: blur(28px); opacity: 0.22; }
`;

// Mobile-only card (static layout, auto height)
const MobileCard = styled.div`
  position: relative; 
  width: 100%; 
  border-radius: 1.5rem; 
  padding: 2.5rem; 
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'};
  background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.panel : theme.colors.panel};
  box-shadow: 0 20px 40px -12px rgba(0,0,0,0.15);
  min-height: 380px;
  backdrop-filter: blur(8px);
  
  @media (max-width: 380px) {
    padding: 2rem;
    border-radius: 1.25rem;
    min-height: 340px;
  }
  
  @media (max-width: 320px) {
    padding: 1.75rem;
    border-radius: 1.125rem;
    min-height: 320px;
  }
`;

// Mobile controls overlay
const MobileControls = styled.div`
  position: absolute; left: 0; right: 0; bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 16px; padding: 10px 16px; pointer-events: none;
  
  @media (max-width: 380px) {
    bottom: 10px;
    gap: 14px;
    padding: 8px 12px;
  }
  
  @media (max-width: 320px) {
    bottom: 8px;
    gap: 12px;
    padding: 6px 10px;
  }
`;

const ControlsInner = styled.div`
  display: flex; align-items: center; gap: 14px; background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}; padding: 10px 16px; border-radius: 999px; box-shadow: 0 10px 24px -10px rgba(0,0,0,0.3); backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.2)'};
  
  @media (max-width: 380px) {
    gap: 12px;
    padding: 8px 14px;
  }
  
  @media (max-width: 320px) {
    gap: 10px;
    padding: 6px 12px;
  }
`;

const ControlButton = styled.button`
  pointer-events: all; border: 0; outline: 0; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; font-weight: 700; color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.palette.blueMid} 0%, ${theme.palette.navy} 100%)`}; box-shadow: 0 8px 16px -8px rgba(0,0,0,0.3);
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)}; cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-size: 18px;
  transition: all 0.2s ease;
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  @media (max-width: 380px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
  
  @media (max-width: 320px) {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
`;

const Dots = styled.div`
  display: flex; align-items: center; gap: 8px; margin: 0 6px;
  
  @media (max-width: 380px) {
    gap: 6px;
    margin: 0 4px;
  }
  
  @media (max-width: 320px) {
    gap: 5px;
    margin: 0 3px;
  }
`;

const Dot = styled.button`
  pointer-events: all; width: 10px; height: 10px; border-radius: 50%; border: 0; outline: 0; background: ${({ active, theme }) => (active ? theme.colors.secondary : 'rgba(127,127,127,0.4)')}; transition: transform .2s ease, background .2s ease; transform: ${({ active }) => (active ? 'scale(1.3)' : 'none')};
  cursor: pointer;
  
  &:active {
    transform: ${({ active }) => (active ? 'scale(1.2)' : 'scale(0.9)')};
  }
  
  @media (max-width: 380px) {
    width: 8px;
    height: 8px;
    transform: ${({ active }) => (active ? 'scale(1.25)' : 'none')};
  }
  
  @media (max-width: 320px) {
    width: 7px;
    height: 7px;
    transform: ${({ active }) => (active ? 'scale(1.2)' : 'none')};
  }
`;
const ProgressTrack = styled.div`
  position: absolute; left: 12%; right: 12%; bottom: 72px; height: 4px; border-radius: 4px; background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}; overflow: hidden;
  
  @media (min-width: 481px) { display: none; }
  
  @media (max-width: 380px) {
    bottom: 68px;
    height: 3px;
    left: 10%;
    right: 10%;
  }
  
  @media (max-width: 320px) {
    bottom: 64px;
    left: 8%;
    right: 8%;
  }
`;

const ProgressFill = styled.div`
  height: 100%; width: ${({ pct }) => pct}%; background: ${({ theme }) => theme.colors.secondary}; transition: width .4s ease; border-radius: inherit;
`;

const Services = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const theme = useTheme();

  // Responsive flags
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  // Enable swipe behavior for better mobile experience
  const useSwipeOnMobile = true;
  
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 480px)');
    const smallMobile = window.matchMedia('(max-width: 320px)');
    
    const handleMobileChange = () => setIsMobile(mobile.matches);
    const handleSmallMobileChange = () => setIsSmallMobile(smallMobile.matches);
    
    handleMobileChange();
    handleSmallMobileChange();
    
    mobile.addEventListener ? mobile.addEventListener('change', handleMobileChange) : mobile.addListener(handleMobileChange);
    smallMobile.addEventListener ? smallMobile.addEventListener('change', handleSmallMobileChange) : smallMobile.addListener(handleSmallMobileChange);
    
    return () => { 
      mobile.removeEventListener ? mobile.removeEventListener('change', handleMobileChange) : mobile.removeListener(handleMobileChange);
      smallMobile.removeEventListener ? smallMobile.removeEventListener('change', handleSmallMobileChange) : smallMobile.removeListener(handleSmallMobileChange);
    };
  }, []);
  
  const titleVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } } };

  const cardsData = [
    { id: 1, title: t('services.cards.1.title'), tags: t('services.cards.1.tags'), description: t('services.cards.1.desc') },
    { id: 2, title: t('services.cards.2.title'), tags: t('services.cards.2.tags'), description: t('services.cards.2.desc') },
    { id: 3, title: t('services.cards.3.title'), tags: t('services.cards.3.tags'), description: t('services.cards.3.desc') },
    { id: 4, title: t('services.cards.4.title'), tags: t('services.cards.4.tags'), description: t('services.cards.4.desc') }
  ];

  // Dynamic card color schemes (mode aware)
  const lightSchemes = [
    { bg: theme.colors.panel, text: theme.colors.secondary },
    { bg: theme.palette.navy, text: theme.colors.white },
    { bg: theme.palette.blueMid, text: theme.colors.white },
    { bg: theme.colors.panelAlt, text: theme.colors.secondary }
  ];
  const darkSchemes = [
    { bg: theme.colors.panel, text: theme.colors.white },
    { bg: theme.colors.panelAlt, text: theme.colors.white },
    { bg: theme.palette.blueMid, text: theme.colors.white },
    { bg: theme.palette.navy, text: theme.colors.white }
  ];
  const schemes = theme.mode === 'dark' ? darkSchemes : lightSchemes;

  // keyboard navigation
  const goTo = useCallback((i) => {
    setCurrentCardIndex(prev => {
      if (i < 0) return 0; if (i >= cardsData.length) return cardsData.length - 1; return i;
    });
  }, [cardsData.length]);

  const onKey = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goTo(currentCardIndex + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goTo(currentCardIndex - 1); }
    if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    if (e.key === 'End') { e.preventDefault(); goTo(cardsData.length - 1); }
  }, [currentCardIndex, goTo, cardsData.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [onKey]);

  // wheel interaction (soft lock) — disable on mobile to prevent conflicts
  useEffect(() => {
    if (isMobile) return; // Disable wheel interaction on mobile
    
    const cardsContainer = cardsContainerRef.current;
    if (!cardsContainer) return;
    const handleWheel = (e) => {
      const atStart = currentCardIndex === 0;
      const atEnd = currentCardIndex === cardsData.length - 1;
      const goingNext = e.deltaY > 0;
      const goingPrev = e.deltaY < 0;

      const canNavigate = (goingNext && !atEnd) || (goingPrev && !atStart);
      if (!canNavigate) return; // let page scroll

      if (isScrollLocked) { e.preventDefault(); return; }

      e.preventDefault(); e.stopPropagation();
      if (goingNext) { goTo(currentCardIndex + 1); }
      else if (goingPrev) { goTo(currentCardIndex - 1); }
      setIsScrollLocked(true);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      const t = setTimeout(() => setIsScrollLocked(false), 350);
      setScrollTimeout(t);
    };
    cardsContainer.addEventListener('wheel', handleWheel, { passive: false });
    return () => { cardsContainer.removeEventListener('wheel', handleWheel); if (scrollTimeout) clearTimeout(scrollTimeout); };
  }, [isMobile, currentCardIndex, isScrollLocked, scrollTimeout, goTo, cardsData.length]);

  // Touch swipe navigation for mobile - improved with better gesture detection
  useEffect(() => {
    if (!(isMobile && useSwipeOnMobile)) return;
    const el = cardsContainerRef.current;
    if (!el) return;
    
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let isScrolling = false;
    
    const onStart = (e) => { 
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY; 
      startTime = Date.now();
      isScrolling = false;
    };
    
    const onMove = (e) => {
      if (isScrolling) return;
      
      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;
      const deltaTime = Date.now() - startTime;
      
      // Determine scroll direction - prioritize vertical scrolling for page navigation
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
        isScrolling = true;
        return; // Allow page scroll
      }
      
      // Horizontal swipe detection
      if (Math.abs(deltaX) > 30 && deltaTime < 500) {
        const goingNext = deltaX < 0; // swipe left
        const goingPrev = deltaX > 0;  // swipe right
        const atStart = currentCardIndex === 0;
        const atEnd = currentCardIndex === cardsData.length - 1;
        const canNavigate = (goingNext && !atEnd) || (goingPrev && !atStart);
        
        if (!canNavigate) return;
        if (isScrollLocked) { e.preventDefault(); return; }
        
        e.preventDefault();
        e.stopPropagation();
        
        if (goingNext) goTo(currentCardIndex + 1);
        if (goingPrev) goTo(currentCardIndex - 1);
        
        setIsScrollLocked(true);
        if (scrollTimeout) clearTimeout(scrollTimeout);
        const t = setTimeout(() => setIsScrollLocked(false), 500);
        setScrollTimeout(t);
        
        // Reset to prevent multiple triggers
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = Date.now();
      }
    };
    
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: false });
    
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
    };
  }, [isMobile, useSwipeOnMobile, currentCardIndex, isScrollLocked, scrollTimeout, goTo, cardsData.length]);

  // Active color scheme for dynamic glow
  const activeScheme = schemes[currentCardIndex % schemes.length];

  // Mobile-aware sizes with better responsiveness
  const stackOffset = isMobile ? (isSmallMobile ? 16 : 18) : 28;
  const titleSize = isMobile 
    ? (isSmallMobile ? 'clamp(1.5rem, 7vw, 2.1rem)' : 'clamp(1.75rem, 6vw, 2.4rem)') 
    : 'clamp(2rem, 4vw, 3rem)';
  const chipPadding = isMobile 
    ? (isSmallMobile ? '.5rem 1rem' : '.6rem 1.2rem') 
    : '.6rem 1.2rem';
  const chipFont = isMobile 
    ? (isSmallMobile ? '.8rem' : '.85rem') 
    : '.85rem';
  const descriptionFont = isMobile 
    ? (isSmallMobile ? '.95rem' : '1rem') 
    : '1.05rem';
  const iconSize = isMobile 
    ? (isSmallMobile ? '1.5rem' : '1.6rem') 
    : '1.8rem';

  return (
    <ServicesSection ref={containerRef} tabIndex={0} aria-roledescription="Services carousel" aria-label="Services" id="services">
      <p style={{ textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7, margin: '0 0 0.5rem 0', fontSize: isSmallMobile ? '0.75rem' : '0.85rem' }}>Services</p>
      {/* Header - title only */}
      <SectionHeader>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={titleVariants}>
          <SectionTitle variants={titleVariants}>{t('services.title')}</SectionTitle>
          {isMobile && (
            <p style={{ 
              fontSize: isSmallMobile ? '0.9rem' : '1rem', 
              opacity: 0.8, 
              margin: '0.75rem 0 0 0', 
              lineHeight: 1.5,
              maxWidth: '280px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              {isSmallMobile ? 'Swipe left/right or use controls below' : 'Swipe horizontally or use the controls below to explore'}
            </p>
          )}
        </motion.div>
      </SectionHeader>

      {/* Cards only */}
      <CardsContainer ref={cardsContainerRef} aria-live="polite">
        {/* Subtle animated glow */}
        <Glow
          key={currentCardIndex}
          initial={{ opacity: 0.25 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.5 }}
          style={{ background: `radial-gradient(600px 320px at 50% 30%, ${activeScheme.text}33 0%, transparent 70%)` }}
        />
        {cardsData.map((card, index) => {
          const scheme = schemes[index % schemes.length];
          const isActive = index === currentCardIndex;

          if (isMobile) {
            if (!isActive) return null;
            return (
              <MobileCard key={card.id} style={{ background: scheme.bg, color: scheme.text }}>
                <h3 style={{ 
                  fontSize: titleSize, 
                  fontWeight: 700, 
                  margin: '0 0 1.5rem 0', 
                  lineHeight: 1.25, 
                  color: scheme.text,
                  letterSpacing: '-0.01em'
                }}>{card.title}</h3>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: isSmallMobile ? '.6rem' : '.75rem', 
                  marginBottom: isSmallMobile ? '1.75rem' : '2rem' 
                }}>
                  {card.tags.slice(0, isSmallMobile ? 2 : 3).map((tag, tagIndex) => (
                    <span key={tagIndex} style={{ 
                      background: theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,45,75,0.06)', 
                      color: scheme.text, 
                      border: `1px solid ${scheme.text}20`, 
                      padding: isSmallMobile ? '.4rem .8rem' : '.5rem 1rem', 
                      borderRadius: isSmallMobile ? '1.25rem' : '1.5rem', 
                      fontSize: isSmallMobile ? '.75rem' : '.8rem', 
                      fontWeight: 500,
                      lineHeight: 1.2
                    }}>{tag}</span>
                  ))}
                  {card.tags.length > (isSmallMobile ? 2 : 3) && (
                    <span style={{ 
                      color: scheme.text + '80', 
                      fontSize: isSmallMobile ? '.75rem' : '.8rem',
                      fontWeight: 500,
                      alignSelf: 'center'
                    }}>+{card.tags.length - (isSmallMobile ? 2 : 3)} more</span>
                  )}
                </div>
                <p style={{ 
                  fontSize: descriptionFont, 
                  lineHeight: 1.6, 
                  margin: 0, 
                  color: scheme.text + 'D9'
                }}>
                  {card.description}
                </p>
              </MobileCard>
            );
          }

          // Desktop/tablet stacked behavior
          // Motion & style props per viewport
          const motionProps = {
            initial: { y: index * stackOffset, scale: 1 - index * 0.05, zIndex: cardsData.length - index, rotateX: 0 },
            animate: { y: index <= currentCardIndex ? 0 : (index - currentCardIndex) * stackOffset, scale: index <= currentCardIndex ? 1 : 1 - (index - currentCardIndex) * 0.05, zIndex: index <= currentCardIndex ? cardsData.length + index : cardsData.length - index, rotateX: index < currentCardIndex ? 8 : 0, opacity: index - currentCardIndex > 2 ? 0 : 1 },
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
          };

          return (
            <ServiceCard
              key={card.id}
              id={`service-panel-${card.id}`}
              role="tabpanel"
              aria-hidden={!isActive}
              {...motionProps}
              whileHover={{ y: isActive ? -6 : 0, rotateX: isActive ? 2 : 0 }}
              whileTap={{ scale: isActive ? 0.995 : 1 }}
              style={{ background: scheme.bg, color: scheme.text, borderColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', boxShadow: `0 25px 60px -15px ${scheme.text}33` }}
            >
              <h3 style={{ fontSize: titleSize, fontWeight: 700, margin: '0 0 1.25rem 0', lineHeight: 1.15 }}>{card.title}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.8rem', marginBottom: '2rem' }}>
                {card.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} style={{ background: theme.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,45,75,0.08)', color: scheme.text, border: `1px solid ${scheme.text}33`, padding: chipPadding, borderRadius: '1.25rem', fontSize: chipFont, fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
              <p style={{ fontSize: descriptionFont, lineHeight: 1.55, margin: 0, display: 'flex', alignItems: 'flex-start', gap: '1rem', color: scheme.text + 'CC' }}>
                <span style={{ background: scheme.text + '26', color: scheme.text, width: iconSize, height: iconSize, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '.15rem', fontSize: '0.9rem' }}>✓</span>{card.description}
              </p>
            </ServiceCard>
          );
        })}

        {/* Mobile progress + controls */}
        {isMobile && (
          <>
            <ProgressTrack>
              <ProgressFill pct={((currentCardIndex + 1) / cardsData.length) * 100} />
            </ProgressTrack>
            <MobileControls aria-hidden={!isMobile}>
              <ControlsInner>
                <ControlButton aria-label="Previous service" disabled={currentCardIndex === 0} onClick={() => goTo(currentCardIndex - 1)}>‹</ControlButton>
                <Dots>
                  {cardsData.map((_, i) => (
                    <Dot key={i} active={i === currentCardIndex} aria-label={`Go to service ${i + 1}`} onClick={() => goTo(i)} />
                  ))}
                </Dots>
                <ControlButton aria-label="Next service" disabled={currentCardIndex === cardsData.length - 1} onClick={() => goTo(currentCardIndex + 1)}>›</ControlButton>
              </ControlsInner>
            </MobileControls>
          </>
        )}
      </CardsContainer>
    </ServicesSection>
  );
};

export default Services;