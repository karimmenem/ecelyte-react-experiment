import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { getInsights, subscribe } from '../../utils/insightsStore';
import { useLanguage } from '../../contexts/LanguageContext';

const Section = styled.section`
  width:100%; position:relative; padding:clamp(3.2rem,6vw,6rem) 0 clamp(3rem,6vw,5.2rem);
  background:${({ theme }) => theme.mode === 'dark' 
    ? `radial-gradient(circle at 50% 0%, ${'#ffffff08'} 0%, transparent 70%), linear-gradient(180deg, ${theme.colors.backgroundDark} 0%, ${theme.colors.primary} 100%)` 
    : `radial-gradient(circle at 50% 0%, ${'#0a254008'} 0%, transparent 70%), linear-gradient(180deg, ${theme.colors.primary} 0%, ${theme.colors.panel} 100%)`};
  overflow:hidden; isolation:isolate; 
  &:before{content:''; position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size:120px 120px; opacity:${({ theme }) => theme.mode==='dark'? .15 : .08}; pointer-events:none;}
  &:after{content:""; position:absolute; left:50%; top:100%; transform:translate(-50%,-50%); width:480px; height:160px; background:radial-gradient(circle at 50% 50%, ${({ theme }) => theme.colors.accent}33, transparent 70%); filter:blur(60px); opacity:.35; pointer-events:none;}
`;

const Shell = styled.div`width:100%; display:flex; flex-direction:column; gap:3.25rem;`;
const Inner = styled.div`width:min(1280px,92%); margin:0 auto;`;

const Header = styled.div`display:flex; flex-direction:column; gap:.9rem;`;
const Title = styled.h2`margin:0; font-size:clamp(1.8rem,3.4vw,2.9rem); font-weight:650; letter-spacing:-0.035em; color:${({ theme }) => theme.colors.secondary};`;
const Subtitle = styled.p`margin:0; max-width:720px; font-size:clamp(.8rem,1.15vw,1.05rem); line-height:1.55; color:${({ theme }) => theme.colors.textMedium};`;

const Grid = styled.div`
  display:grid; gap:1.75rem; width:100%; padding:0 clamp(1.25rem,3.5vw,3.25rem);
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
`;

const fadeIn = keyframes`from{opacity:0; transform:translateY(12px);} to{opacity:1; transform:translateY(0);} `;

const Card = styled.div`
  position:relative; background: ${({ theme }) => theme.mode==='dark' ? theme.colors.panel : theme.colors.white};
  border:1px solid ${({ theme }) => theme.colors.border};
  border-radius:1.4rem; padding:1.55rem 1.35rem 1.6rem; display:flex; flex-direction:column; gap:.55rem;
  box-shadow:0 22px 55px -25px rgba(0,0,0,.35), 0 2px 6px -1px rgba(0,0,0,.25);
  animation:${fadeIn} .7s cubic-bezier(.4,.18,.2,1) both; animation-delay:${({ index }) => index * .06}s;
  overflow:hidden; isolation:isolate; backdrop-filter:blur(8px);
  transition:box-shadow .7s cubic-bezier(.4,.18,.2,1), transform .7s cubic-bezier(.4,.18,.2,1), border-color .6s ease;
  cursor:pointer; user-select:none;
  &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:3px;}
  &[data-replay='true']{box-shadow:0 0 0 2px ${({ theme }) => theme.colors.accent} inset, 0 30px 70px -28px rgba(0,0,0,.55);} 
  &:before{content:""; position:absolute; inset:0; background:linear-gradient(135deg, ${({ theme }) => theme.colors.accent}22, transparent 55%); opacity:.9; mix-blend-mode:overlay; pointer-events:none;}
  &:after{content:""; position:absolute; inset:0; border-radius:inherit; padding:1px; background:linear-gradient(140deg, ${({ theme }) => theme.colors.accent}55, transparent 40%, ${({ theme }) => theme.colors.secondary}33); -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; opacity:.6; pointer-events:none;}
  &:hover{transform:translateY(-6px); box-shadow:0 30px 70px -28px rgba(0,0,0,.55), 0 4px 10px -2px rgba(0,0,0,.35);} 
`;

const Label = styled.span`font-size:.55rem; letter-spacing:.16em; font-weight:600; text-transform:uppercase; color:${({ theme }) => theme.colors.textMedium};`;

const ValueRow = styled.div`display:flex; align-items:baseline; flex-wrap:wrap; gap:.45rem; position:relative;`;

const shimmer = keyframes`0%{transform:translateX(-60%);} 100%{transform:translateX(140%);}`;

const Value = styled.span`
  font-size:clamp(2rem,4.5vw,3rem); line-height:1; font-weight:650; letter-spacing:-0.04em;
  background:linear-gradient(90deg, ${({ theme }) => theme.colors.secondary}, ${({ theme }) => theme.colors.accent});
  -webkit-background-clip:text; color:transparent;
  position:relative; display:inline-block; min-width:1ch;
  &:after{content:''; position:absolute; inset:0; background:linear-gradient(115deg,transparent 0%,rgba(255,255,255,0.25) 48%,transparent 100%); mix-blend-mode:plus-lighter; opacity:.0; pointer-events:none;}
  [data-inview='true'] &::after{animation:${shimmer} 3.2s linear infinite; opacity:.55;}
`;

const Suffix = styled.span`font-size:clamp(1.2rem,2.2vw,1.9rem); font-weight:600; color:${({ theme }) => theme.colors.accent};`;

const Description = styled.p`margin:.2rem 0 0; font-size:.7rem; letter-spacing:.05em; font-weight:500; color:${({ theme }) => theme.colors.textMedium}; text-transform:uppercase;`;

const Empty = styled.div`padding:2.5rem 1.5rem; text-align:center; border:2px dashed ${({ theme }) => theme.colors.border}; border-radius:1rem; font-size:.85rem; opacity:.65;`;

const Insights = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState(getInsights());
  const [displayValues, setDisplayValues] = useState(() => Object.fromEntries(getInsights().map(i => [i.id, 0])));
  const [inView, setInView] = useState(false);
  const [replaySet, setReplaySet] = useState(new Set());
  const rafRefs = useRef({});
  const sectionRef = useRef(null);
  const prefersReduced = useRef(false);

  useEffect(() => { const mq = window.matchMedia('(prefers-reduced-motion: reduce)'); prefersReduced.current = mq.matches; const handler = (e)=> prefersReduced.current = e.matches; mq.addEventListener('change', handler); return () => mq.removeEventListener('change', handler); }, []);

  useEffect(() => { const unsub = subscribe(setItems); return () => unsub(); }, []);

  useEffect(() => { // intersection observer
    const el = sectionRef.current; if(!el) return; const obs = new IntersectionObserver(([entry]) => { if(entry.isIntersecting){ setInView(true); } }, { threshold: 0.25 }); obs.observe(el); return () => obs.disconnect();
  }, []);

  // Cancel RAFs on unmount
  useEffect(() => () => { Object.values(rafRefs.current).forEach(id => cancelAnimationFrame(id)); }, []);

  const animateValue = (id, from, to, duration = 1400) => {
    if(prefersReduced.current){ setDisplayValues(p => ({ ...p, [id]: to })); return; }
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOut(progress);
      const val = Math.round(from + (to - from) * eased);
      setDisplayValues(prev => prev[id] === val ? prev : { ...prev, [id]: val });
      if(progress < 1) { rafRefs.current[id] = requestAnimationFrame(step); }
    };
    rafRefs.current[id] = requestAnimationFrame(step);
  };

  // When items change & section visible, animate to new values
  useEffect(() => {
    if(!inView) return; // wait until in view
    items.forEach(item => {
      const current = displayValues[item.id] ?? 0;
      if(current !== item.value) animateValue(item.id, current, item.value);
    });
  }, [items, inView]);

  // Initial trigger if items loaded after view
  useEffect(() => {
    if(inView) { items.forEach(item => { if(displayValues[item.id] === 0 && item.value !== 0) animateValue(item.id, 0, item.value); }); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const triggerReplayVisual = (id) => {
    setReplaySet(prev => { const next = new Set(prev); next.add(id); return next; });
    setTimeout(()=>{ setReplaySet(prev => { const next = new Set(prev); next.delete(id); return next; }); }, 900);
  };
  const replay = (id, target) => {
    if(!inView) return; // Only replay once section viewed
    if(rafRefs.current[id]) cancelAnimationFrame(rafRefs.current[id]);
    setDisplayValues(prev => ({ ...prev, [id]: 0 }));
    triggerReplayVisual(id);
    animateValue(id, 0, target);
  };
  const onKey = (e, id, target) => { if(e.key==='Enter' || e.key===' '){ e.preventDefault(); replay(id, target); } };

  return (
    <Section id="insights" ref={sectionRef} data-inview={inView}>
      <Shell>
        <Inner>
          <Header>
            <Title>{t('insights.title')}</Title>
            <Subtitle>{t('insights.subtitle')}</Subtitle>
          </Header>
        </Inner>
        {items.length ? (
          <Grid>
            {items.map((ins, i) => (
              <Card
                key={ins.id}
                index={i}
                role="button"
                tabIndex={0}
                aria-label={`Replay count for ${t(ins.labelKey)}`}
                onClick={() => replay(ins.id, ins.value)}
                onKeyDown={(e)=>onKey(e, ins.id, ins.value)}
                data-replay={replaySet.has(ins.id)}
              >
                <Label>{t(ins.labelKey)}</Label>
                <ValueRow>
                  <Value aria-label={`${displayValues[ins.id]} ${ins.suffix}`}>{displayValues[ins.id] ?? 0}</Value>
                  {ins.suffix && <Suffix>{ins.suffix}</Suffix>}
                </ValueRow>
                <Description>{t(ins.descriptionKey)}</Description>
              </Card>
            ))}
          </Grid>
        ) : (
          <Inner><Empty>No insights defined yet. Add some in admin.</Empty></Inner>
        )}
      </Shell>
    </Section>
  );
};

export default Insights;
