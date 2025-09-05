import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import styled, { useTheme } from 'styled-components';
import { useLanguage } from '../../contexts/LanguageContext';

const ServicesSection = styled.section`
  min-height: 100vh; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 6rem 2rem 8rem; transition: background 0.6s ease, color 0.4s ease;
  color: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(180deg, ' + theme.colors.primary + ' 0%, #061b29 45%, ' + theme.colors.backgroundDark + ' 100%)'
    : 'linear-gradient(180deg, ' + theme.colors.primary + ' 0%, #ffffff 40%, ' + theme.colors.panelAlt + ' 100%)'};
`;

const SectionHeader = styled.div`
  max-width: 1200px; text-align: center; margin-bottom: 4rem; color: ${({ theme }) => theme.colors.secondary}; transition: color 0.4s ease;
`;

const SectionEyebrow = styled(motion.p)`
  font-size: 1.2rem; color: ${({ theme }) => theme.colors.textMedium}; opacity: 0.75; margin: 0 0 1rem 0; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; transition: color 0.4s ease;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; margin: 0 0 4rem 0; line-height: 1.1; color: ${({ theme }) => theme.colors.secondary}; transition: color 0.4s ease;
`;

const SectionDivider = styled.div`
  width: 100%; height: 1px; background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.borderAlt}, transparent); margin: 0 0 4rem; opacity: .6;
`;

const CardsContainer = styled.div`
  position: relative; width: 90%; max-width: 900px; height: 520px; cursor: pointer; perspective: 1200px;
`;

const ServiceCard = styled(motion.div)`
  position: absolute; top: 0; left: 0; right: 0; height: 100%; border-radius: 2rem; padding: 3rem; display: flex; flex-direction: column; justify-content: flex-start; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); transition: background 0.5s ease, color 0.5s ease, transform 0.5s ease, border-color 0.4s ease; border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(6px);
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,45,75,0.08)'};
  color: ${({ theme }) => theme.colors.secondary};
  backdrop-filter: blur(10px); padding: 0.6rem 1.2rem; border-radius: 1.5rem; font-size: 0.85rem; font-weight: 500; border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,45,75,0.15)'}; transition: background 0.4s ease, color 0.4s ease;
`;

const IconBullet = styled.span`
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,45,75,0.15)'}; width: 1.8rem; height: 1.8rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 0.2rem; font-size: 0.9rem; color: ${({ theme }) => theme.colors.secondary};
`;

const Indicators = styled.div`
  position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.5rem;
`;

const IndicatorDot = styled.div`
  width: 8px; height: 8px; border-radius: 50%; background-color: ${({ active, theme }) => active ? theme.colors.secondary : (theme.mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,45,75,0.3)')}; transition: background-color 0.3s ease;
`;

const NavBar = styled.nav`
  display: flex; flex-wrap: wrap; gap: .75rem; justify-content: center; margin: 0 0 2.75rem; max-width: 1180px;
`;

const NavButton = styled.button`
  appearance: none; border: 1px solid ${({ theme }) => theme.colors.borderAlt}; background: ${({ active, theme }) => active ? theme.colors.panel : 'transparent'}; color: ${({ theme }) => theme.colors.secondary};
  padding: .55rem .95rem; font-size: .75rem; letter-spacing: .05em; text-transform: uppercase; font-weight: 600; border-radius: 999px; cursor: pointer; position: relative; transition: background .35s ease, border-color .35s ease, color .35s ease, transform .3s ease;
  opacity: ${({ active }) => active ? 1 : .7};
  &:hover { opacity: 1; }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.secondary}; outline-offset: 2px; }
  &[data-dir='prev'], &[data-dir='next'] { font-size: .7rem; }
`;

const Hint = styled.div`
  position: absolute; top: 0; right: 1rem; display: flex; align-items: center; gap: .4rem; font-size: .65rem; letter-spacing: .08em; text-transform: uppercase; opacity: .55; pointer-events: none;
  @media (max-width: 820px) { position: static; margin: 0 0 1.5rem; }
`;

const ToggleAllButton = styled.button`
  appearance: none; border: none; background: ${({ theme }) => theme.colors.panel}; color: ${({ theme }) => theme.colors.secondary}; padding: .85rem 1.25rem; border-radius: .9rem; font-size: .8rem; font-weight: 600; letter-spacing: .05em; cursor: pointer; margin: 2.5rem auto 0; display: inline-flex; align-items: center; gap: .5rem; border: 1px solid ${({ theme }) => theme.colors.borderAlt}; transition: background .35s ease, color .35s ease, border-color .35s ease, transform .3s ease;
  &:hover { transform: translateY(-2px); }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.secondary}; outline-offset: 3px; }
`;

const AllGrid = styled.div`
  margin-top: 2.75rem; width: 100%; max-width: 1180px; display: grid; gap: 1.75rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const AllGridCard = styled.div`
  background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.panel : theme.colors.panelAlt}; border: 1px solid ${({ theme }) => theme.colors.borderAlt}; padding: 1.4rem 1.5rem 1.7rem; border-radius: 1.2rem; display: flex; flex-direction: column; gap: .75rem; transition: background .35s ease, transform .35s ease;
  h4 { margin: 0; font-size: 1.05rem; line-height: 1.25; }
  p { margin: 0; font-size: .8rem; line-height: 1.45; opacity: .8; }
  &:hover { transform: translateY(-4px); }
`;

const Services = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const theme = useTheme();
  
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
    setShowHint(false);
  }, [cardsData.length]);

  const onKey = useCallback((e) => {
    if (showAll) return; // grid mode
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goTo(currentCardIndex + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goTo(currentCardIndex - 1); }
    if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    if (e.key === 'End') { e.preventDefault(); goTo(cardsData.length - 1); }
  }, [currentCardIndex, goTo, cardsData.length, showAll]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [onKey]);

  // wheel interaction (soft lock shorter) disabled when showAll
  useEffect(() => {
    if (showAll) return; // disable custom wheel in grid mode
    const cardsContainer = cardsContainerRef.current;
    if (!cardsContainer) return;
    const handleWheel = (e) => {
      e.preventDefault(); e.stopPropagation();
      if (isScrollLocked) return;
      setShowHint(false);
      if (e.deltaY > 0) { goTo(currentCardIndex + 1); }
      else if (e.deltaY < 0) { goTo(currentCardIndex - 1); }
      setIsScrollLocked(true);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      const t = setTimeout(() => setIsScrollLocked(false), 350);
      setScrollTimeout(t);
    };
    cardsContainer.addEventListener('wheel', handleWheel, { passive: false });
    return () => { cardsContainer.removeEventListener('wheel', handleWheel); if (scrollTimeout) clearTimeout(scrollTimeout); };
  }, [currentCardIndex, isScrollLocked, scrollTimeout, goTo, showAll]);

  // reduce motion fallback: if user prefers reduce motion, default to grid view
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (m.matches) setShowAll(true);
  }, []);

  return (
    <ServicesSection ref={containerRef} tabIndex={0} aria-roledescription="Services carousel" aria-label="Services" id="services">
      <SectionDivider />
      <SectionHeader>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={titleVariants}>
          <SectionEyebrow variants={titleVariants}>{t('services.eyebrow')}</SectionEyebrow>
          <SectionTitle variants={titleVariants}>{t('services.title')}</SectionTitle>
        </motion.div>
      </SectionHeader>

      <NavBar role="tablist" aria-label="Service navigation">
        {cardsData.map((c, i) => (
          <NavButton
            key={c.id}
            type="button"
            role="tab"
            aria-selected={i === currentCardIndex}
            active={i === currentCardIndex}
            aria-controls={`service-panel-${c.id}`}
            onClick={() => goTo(i)}
          >{c.title}</NavButton>
        ))}
      </NavBar>

      {showHint && !showAll && (
        <Hint><span>SCROLL / ARROWS</span><span style={{ fontSize: '1rem' }}>↕</span></Hint>
      )}

      {!showAll && (
        <CardsContainer ref={cardsContainerRef} aria-live="polite">
          {cardsData.map((card, index) => {
            const scheme = schemes[index % schemes.length];
            return (
              <ServiceCard
                key={card.id}
                id={`service-panel-${card.id}`}
                role="tabpanel"
                aria-hidden={index !== currentCardIndex}
                initial={{ y: index * 28, scale: 1 - (index * 0.05), zIndex: cardsData.length - index, rotateX: 0 }}
                animate={{ y: index <= currentCardIndex ? 0 : (index - currentCardIndex) * 28, scale: index <= currentCardIndex ? 1 : 1 - ((index - currentCardIndex) * 0.05), zIndex: index <= currentCardIndex ? cardsData.length + index : cardsData.length - index, rotateX: index < currentCardIndex ? 8 : 0, opacity: index - currentCardIndex > 2 ? 0 : 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ background: scheme.bg, color: scheme.text, borderColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
              >
                <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, margin: '0 0 2rem 0', lineHeight: 1.1 }}>{card.title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2rem' }}>
                  {card.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex} style={{ color: scheme.text, borderColor: scheme.text + '33', background: theme.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.25)' }}>{tag}</Tag>
                  ))}
                </div>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.55, margin: 0, display: 'flex', alignItems: 'flex-start', gap: '1rem', color: scheme.text + 'CC' }}>
                  <IconBullet style={{ background: scheme.text + '26', color: scheme.text }}>✓</IconBullet>{card.description}
                </p>
              </ServiceCard>
            );
          })}
        </CardsContainer>
      )}

      {showAll && (
        <AllGrid aria-label="All services">
          {cardsData.map(card => (
            <AllGridCard key={card.id}>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
            </AllGridCard>
          ))}
        </AllGrid>
      )}

      <Indicators aria-hidden={showAll} style={{ opacity: showAll ? 0 : 1 }}>
        {cardsData.map((_, index) => (<IndicatorDot key={index} active={index === currentCardIndex} />))}
      </Indicators>

      <ToggleAllButton type="button" onClick={() => { setShowAll(s => !s); setShowHint(false); }} aria-expanded={showAll} aria-controls="all-services-grid">
        {showAll ? t('services.toggleAllClose') : t('services.toggleAllOpen')}
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>↕</span>
      </ToggleAllButton>

      {showAll && <div id="all-services-grid" style={{ height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true" />}

      <SectionDivider style={{ marginTop: '4.5rem' }} />
    </ServicesSection>
  );
};

export default Services;