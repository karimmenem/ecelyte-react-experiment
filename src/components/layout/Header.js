import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useThemeMode } from './Layout';

const HeaderContainer = styled.header`
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: ${({ $scrolled }) => ($scrolled ? '0.7rem 2rem' : '1.15rem 2rem')};
  display: flex; justify-content: center; transition: background .4s ease, padding .35s ease, box-shadow .4s ease, backdrop-filter .4s ease, border-color .4s ease, transform .5s ease;
  background: ${({ theme, $scrolled }) => $scrolled
    ? (theme.mode === 'dark' ? 'rgba(0,18,32,0.76)' : 'rgba(255,255,255,0.86)')
    : (theme.mode === 'dark' ? 'rgba(0,18,32,0.4)' : 'rgba(255,255,255,0.5)')};
  backdrop-filter: blur(${({ $scrolled }) => ($scrolled ? 18 : 10)}px) saturate(170%);
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderAlt}33;
  box-shadow: ${({ $scrolled }) => $scrolled ? '0 4px 26px -8px rgba(0,0,0,0.35)' : '0 1px 5px -2px rgba(0,0,0,0.15)'};
  transform: translateY(${({ $hidden }) => $hidden ? '-110%' : '0'});
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) { padding: .9rem 1rem; }
`;

const Nav = styled.nav`
  display: flex; justify-content: space-between; align-items: center; max-width:1400px; width:100%; margin:0 auto; padding:0 .5rem;
`;

const orbSpin = keyframes`0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}`;
const orbPulse = keyframes`0%,100%{transform:scale(1);opacity:.9;}50%{transform:scale(1.15);opacity:.55;}`;
const gradientShift = keyframes`0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}`;

// Moved above SimpleLogo to avoid ReferenceError
const LogoLink = styled.a`
  display:inline-flex; text-decoration:none; margin-right:auto; padding:.4rem .4rem .55rem .2rem; position:relative; cursor:pointer;
  &:focus-visible { outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:4px; border-radius:6px; }
`;

const LogoImg = styled.img`height:48px; width:auto; display:block; object-fit:contain; @media (max-width:${({ theme }) => theme.breakpoints.tablet}){height:42px;}`;

const SimpleLogo = styled.span`
  position:relative; font-family:${({ theme }) => theme.fonts.primary};
  font-size:1.95rem; font-weight:700; letter-spacing:-0.028em; line-height:1; display:inline-flex; align-items:flex-end; gap:.4rem; color:${({ theme }) => theme.colors.secondary};
  .accent { color:${({ theme }) => theme.colors.accent}; letter-spacing:-0.01em; }
  .splitDot { width:6px; height:6px; border-radius:50%; background:${({ theme }) => theme.colors.accent}; align-self:center; box-shadow:0 0 0 4px ${({ theme }) => theme.colors.accent}22; }
  &:after { content:''; position:absolute; left:0; bottom:-6px; height:3px; width:100%; background:linear-gradient(90deg, ${({ theme }) => theme.colors.accent} 0%, ${({ theme }) => theme.colors.secondary} 70%); border-radius:3px; transform:scaleX(.35) translateY(0); transform-origin:left center; opacity:.4; transition:transform .6s cubic-bezier(.19,1,.22,1), opacity .6s ease; }
  ${LogoLink}:hover &::after { transform:scaleX(1); opacity:.75; }
  @media (max-width:${({ theme }) => theme.breakpoints.tablet}) { font-size:1.7rem; }
`;

const HeaderButtons = styled.div`
  display:flex; align-items:center; gap:2.2rem; margin-left:3.5rem;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.secondary} 0%, ${({ theme }) => theme.colors.accent} 100%);
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: .85rem 1.6rem;
  border-radius: 14px;
  font-size: .8rem;
  font-weight: 600;
  cursor:pointer;
  letter-spacing:.06em;
  text-transform:uppercase;
  position:relative;
  overflow:hidden;
  isolation:isolate;
  display:inline-flex;
  align-items:center;
  gap:.55rem;
  transition: background .4s ease, transform .35s ease, box-shadow .4s ease;
  box-shadow: 0 6px 18px -6px rgba(0,0,0,0.35), 0 0 0 1px ${({ theme }) => theme.colors.borderAlt}44 inset;
  &:before {
    content:'';
    position:absolute;
    inset:0;
    background: radial-gradient(circle at 30% 20%, ${({ theme }) => theme.colors.white}33, transparent 60%);
    opacity:0;
    transition:opacity .4s ease;
  }
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 26px -6px rgba(0,0,0,0.4), 0 0 0 1px ${({ theme }) => theme.colors.borderAlt}66 inset;
  }
  &:hover:before {
    opacity:1;
  }
  &:focus-visible {
    outline:2px solid ${({ theme }) => theme.colors.accent};
    outline-offset:3px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display:none;
  }
`;

const MenuButton = styled.button`
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,45,75,0.08)'}; 
  color: ${({ theme }) => theme.colors.secondary}; 
  backdrop-filter: blur(6px); 
  border:1px solid ${({ theme }) => theme.colors.borderAlt}55; 
  padding:.75rem 1.15rem; 
  border-radius:12px; 
  font-size:.75rem; 
  font-weight:600; 
  letter-spacing:.05em; 
  cursor:pointer; 
  display:inline-flex; 
  align-items:center; 
  gap:.45rem; 
  transition: background .35s ease, border-color .35s ease, transform .35s ease;
  &:hover {
    background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(0,45,75,0.14)'};
    transform: translateY(-2px);
  }
  &:focus-visible {
    outline:2px solid ${({ theme }) => theme.colors.accent};
    outline-offset:3px;
  }
`;

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,45,75,0.08)'}; 
  color: ${({ theme }) => theme.colors.secondary}; 
  border:1px solid ${({ theme }) => theme.colors.borderAlt}55; 
  padding:.6rem .65rem; /* tightened for icon */
  border-radius:12px; 
  font-size:.7rem; 
  font-weight:600; 
  letter-spacing:.05em; 
  cursor:pointer; 
  transition: background .35s ease, transform .35s ease, border-color .35s ease; 
  display:inline-flex; 
  align-items:center; 
  justify-content:center;
  gap:.4rem;
  &:hover { background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.16)' : 'rgba(0,45,75,0.14)'}; transform: translateY(-2px); }
  &:focus-visible { outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:3px; }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) { display:none; }
`;

// New theme toggle switch styles
const ThemeToggle = styled.button`
  position:relative; width:60px; height:32px; border-radius:22px; cursor:pointer; display:inline-flex; align-items:center; justify-content:space-between; padding:0 8px; overflow:hidden; border:1px solid ${({ theme }) => theme.colors.borderAlt}55; background:${({ theme }) => theme.mode==='dark' ? 'linear-gradient(135deg,#071725,#0f2c42)' : 'linear-gradient(135deg,#e8f1f8,#ffffff)'}; transition:background .5s ease, border-color .5s ease, box-shadow .5s ease; box-shadow:0 4px 10px -4px rgba(0,0,0,.25), 0 0 0 1px ${({ theme }) => theme.colors.borderAlt}33 inset; isolation:isolate;
  &:hover { box-shadow:0 6px 16px -4px rgba(0,0,0,.35), 0 0 0 1px ${({ theme }) => theme.colors.borderAlt}55 inset; }
  &:focus-visible { outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:3px; }
`;
const ToggleThumb = styled.span`
  position:absolute; top:3px; left:3px; width:26px; height:26px; border-radius:50%; background:${({ theme }) => theme.mode==='dark' ? 'linear-gradient(135deg,#16374f,#255d83)' : 'linear-gradient(135deg,#ffffff,#dbe9f3)'}; box-shadow:0 4px 10px -4px rgba(0,0,0,.4), 0 0 0 1px ${({ theme }) => theme.colors.borderAlt}44 inset; transform:translateX(${({ theme }) => theme.mode==='dark' ? '28px' : '0'}); transition:transform .45s cubic-bezier(.55,.15,.25,1.2), background .5s ease, box-shadow .5s ease; display:flex; align-items:center; justify-content:center; color:${({ theme }) => theme.mode==='dark' ? theme.colors.white : theme.colors.secondary};
`;
const TinyIcon = styled.span`
  width:14px; height:14px; display:inline-flex; align-items:center; justify-content:center; color:${({ theme }) => theme.mode==='dark'? theme.colors.white : theme.colors.secondary}; opacity:${({ $active }) => $active ? 1 : .35}; transform:scale(${({ $active }) => $active ? 1 : .82}); transition:opacity .45s ease, transform .45s ease; pointer-events:none; svg{display:block;}
`;

// Re-added icon components
const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
  </svg>
);

/* Restored / (re)defined styled components for menus & contact drawer */
const MenuPanel = styled(motion.div)`
  position:fixed; top:1.5rem; right:2rem; width:350px; height:440px; z-index:2000;
  display:flex; flex-direction:column; padding:2rem; border-radius:30px;
  background: ${({ theme }) => theme.mode === 'dark'
    ? `linear-gradient(145deg, ${theme.colors.panelAlt} 0%, ${theme.colors.panel} 85%)`
    : `linear-gradient(145deg, ${theme.colors.secondary} 0%, ${theme.colors.blueMid || '#014572'} 85%)`};
  color:${({ theme }) => theme.mode === 'dark' ? theme.colors.white : theme.colors.primary};
  box-shadow:0 20px 44px -8px rgba(0,0,0,.5), 0 0 0 1px ${({ theme }) => theme.colors.borderAlt}40 inset;
  backdrop-filter: blur(18px) saturate(160%);
  border:1px solid ${({ theme }) => theme.colors.borderAlt}40; overflow:hidden;
`;
const MenuTop = styled.div`display:flex; justify-content:space-between; align-items:center; margin-bottom:1.6rem;`;
const MenuLogo = styled.img`width:46px; height:46px; border-radius:16px; object-fit:contain; background:${({ theme }) => theme.colors.white}; padding:6px; box-shadow:0 6px 16px -4px rgba(0,0,0,.4);`;
const MenuClose = styled.button`background:${({ theme }) => theme.mode==='dark'? theme.colors.panel : theme.colors.white}; color:${({ theme }) => theme.mode==='dark'? theme.colors.white : theme.colors.secondary}; border:1px solid ${({ theme }) => theme.colors.borderAlt}55; padding:.55rem 1.15rem; border-radius:18px; font-size:.75rem; font-weight:600; letter-spacing:.05em; cursor:pointer; transition:background .35s ease, color .35s ease, transform .35s ease; &:hover{background:${({ theme }) => theme.colors.accent}; color:${({ theme }) => theme.colors.primary}; transform:translateY(-2px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:3px;}`;
const MenuLinks = styled.div`flex:1; display:flex; flex-direction:column; gap:1rem;`;
const MenuLink = styled.a`font-size:1.3rem; font-weight:500; text-decoration:none; color:${({ theme }) => theme.mode==='dark'? theme.colors.white : theme.colors.white}; position:relative; transition:color .35s ease, opacity .35s ease; opacity:.95; &:hover{color:${({ theme }) => theme.colors.borderAlt};} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:3px;} &.small{font-size:1rem; opacity:.75;}`;
const SocialGrid = styled.div`display:grid; grid-template-columns:1fr 1fr; gap:.65rem; font-size:.88rem;`;
const SocialLink = styled.a`text-decoration:none; color:${({ theme }) => theme.mode==='dark'? theme.colors.textLight : theme.colors.white}; opacity:.85; transition:color .35s ease, opacity .35s ease; &:hover{color:${({ theme }) => theme.colors.borderAlt}; opacity:1;}`;

const ContactPanel = styled(motion.div)`
  position: fixed; top: 0; right: 0; height: 100vh; width: 38%; z-index: 2000; display: flex; flex-direction: column; overflow-y: auto; padding: 2rem; background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.panelAlt : theme.colors.panel}; color: ${({ theme }) => theme.mode === 'dark' ? theme.colors.white : theme.colors.secondary}; box-shadow: -8px 0 28px -8px rgba(0,0,0,0.35); transition: background .4s ease, color .4s ease; @media (max-width: 1024px) { width: 60%; } @media (max-width: 720px) { width: 100%; }
`;
const ContactHeader = styled.div`display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; h2{margin:0; font-size:1.55rem; font-weight:600;}`;
const PillButton = styled.button`background:${({ theme }) => theme.mode === 'dark' ? theme.colors.secondary : theme.colors.secondary}; color:${({ theme }) => theme.mode === 'dark' ? theme.colors.primary : theme.colors.primary}; border:none; padding:.6rem 1.2rem; border-radius:20px; font-size:.85rem; font-weight:500; cursor:pointer; transition:background .3s ease, color .3s ease, transform .3s ease; &:hover{background:${({ theme }) => theme.colors.accent}; transform:translateY(-2px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:2px;}`;
const CTAAction = styled.a`background:${({ theme }) => theme.colors.secondary}; color:${({ theme }) => theme.colors.primary}; text-decoration:none; padding:.8rem 1.5rem; border-radius:25px; font-size:.9rem; font-weight:500; transition:background .35s ease, transform .35s ease; display:inline-flex; align-items:center; gap:.5rem; &:hover{background:${({ theme }) => theme.colors.accent}; transform:translateY(-2px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:3px;}`;
const CTASecondary = styled.button`background:${({ theme }) => theme.mode === 'dark' ? theme.colors.accent : theme.colors.secondary}; color:${({ theme }) => theme.colors.primary}; border:none; padding:.8rem 1.5rem; border-radius:25px; font-size:.9rem; font-weight:500; cursor:pointer; transition:background .35s ease, transform .35s ease; &:hover{background:${({ theme }) => theme.colors.accent}; transform:translateY(-2px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:3px;}`;
const MetaBlock = styled.div`font-size:.9rem; color:${({ theme }) => theme.colors.textLight}; margin-bottom:2rem; display:flex; flex-direction:column; gap:.25rem;`;
const EmailRow = styled.div`font-size:1.1rem; margin-bottom:2rem; display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; span{color:${({ theme }) => theme.colors.textMedium};} span.symbol{color:${({ theme }) => theme.colors.accent};}`;
const Label = styled.label`display:block; font-size:.8rem; font-weight:500; letter-spacing:.05em; text-transform:uppercase; color:${({ theme }) => theme.colors.textLight}; margin:0 0 .4rem;`;
const Input = styled.input`width:100%; padding:.75rem .85rem; border:1px solid ${({ theme }) => theme.colors.border}; border-radius:8px; font-size:.85rem; background:${({ theme }) => theme.mode === 'dark' ? theme.colors.panel : theme.colors.white}; color:${({ theme }) => theme.colors.text}; transition:border-color .3s ease, background .4s ease, color .4s ease; &:focus{outline:none; border-color:${({ theme }) => theme.colors.accent}; box-shadow:0 0 0 2px ${({ theme }) => theme.colors.accent}33;}`;
const TextArea = styled.textarea`width:100%; padding:.75rem .85rem; border:1px solid ${({ theme }) => theme.colors.border}; border-radius:8px; font-size:.85rem; background:${({ theme }) => theme.mode === 'dark' ? theme.colors.panel : theme.colors.white}; color:${({ theme }) => theme.colors.text}; resize:vertical; transition:border-color .3s ease, background .4s ease, color .4s ease; &:focus{outline:none; border-color:${({ theme }) => theme.colors.accent}; box-shadow:0 0 0 2px ${({ theme }) => theme.colors.accent}33;}`;
const SubmitButton = styled.button`background:${({ theme }) => theme.colors.accent}; color:${({ theme }) => theme.colors.white}; border:none; padding:1rem 2rem; border-radius:25px; font-size:.9rem; font-weight:500; cursor:pointer; transition:background .35s ease, transform .35s ease; align-self:flex-start; margin-top:auto; &:hover{background:${({ theme }) => theme.colors.secondary}; transform:translateY(-3px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.secondary}; outline-offset:3px;}`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = React.useRef(0);
  const ticking = React.useRef(false);
  const { mode, toggle, theme } = useThemeMode();

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrolled(y > 12);
          const delta = y - lastY.current;
            if (y < 120) {
              // always show near top
              setHidden(false);
            } else if (delta > 10) {
              // scrolled down
              setHidden(true);
            } else if (delta < -10) {
              // scrolled up
              setHidden(false);
            }
          lastY.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
   }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <>
      <HeaderContainer $scrolled={scrolled} $hidden={hidden}>
        <Nav>
          <LogoLink href="#home" aria-label="Encelyte home">
            {/* Replaced text logo with image */}
            <LogoImg src="/encelyte_logo.png" alt="Encelyte" loading="lazy" />
          </LogoLink>
          <HeaderButtons>
            <ThemeToggle onClick={toggle} aria-label="Toggle color mode" aria-pressed={mode==='dark'}>
              <TinyIcon $active={mode !== 'dark'}><SunIcon /></TinyIcon>
              <TinyIcon $active={mode === 'dark'}><MoonIcon /></TinyIcon>
              <ToggleThumb>{mode==='dark'? <MoonIcon /> : <SunIcon />}</ToggleThumb>
            </ThemeToggle>
            <CTAButton onClick={() => setIsContactOpen(true)}>Let's Build Together!</CTAButton>
            <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</MenuButton>
          </HeaderButtons>
        </Nav>
      </HeaderContainer>

      {isMenuOpen && (
        <MenuPanel
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
        >
          <MenuTop>
            <div style={{display:'flex', alignItems:'center', gap:'0.9rem'}}>
              <MenuLogo src="/logo.png" alt="Encelyte logo" loading="lazy" />
              <div style={{display:'flex', flexDirection:'column', lineHeight:1}}>
                <span style={{fontSize:'.7rem', letterSpacing:'.18em', textTransform:'uppercase', opacity:.55}}>Encelyte</span>
                <span style={{fontSize:'.85rem', fontWeight:500, opacity:.85}}>Technology & AI</span>
              </div>
            </div>
            <MenuClose onClick={toggleMenu}>Close</MenuClose>
          </MenuTop>
          <MenuLinks>
            <MenuLink href="#home" onClick={toggleMenu}>Home</MenuLink>
            <MenuLink href="#services" onClick={toggleMenu}>Services</MenuLink>
            <MenuLink href="#/admin/login" className="small" onClick={toggleMenu}>Admin</MenuLink>
            <MenuLink href="#/careers" className="small" onClick={toggleMenu}>Careers</MenuLink>
            <div style={{marginTop:'auto', paddingTop:'1.1rem', borderTop:`1px solid ${theme.colors.borderAlt}33`}}>
              <div style={{fontSize:'.58rem', letterSpacing:'.18em', textTransform:'uppercase', opacity:.45, marginBottom:'.55rem'}}>Connect</div>
              <SocialGrid style={{gap:'.65rem'}}>
                <SocialLink href="https://www.linkedin.com/company/encelyte" target="_blank" rel="noopener noreferrer">LinkedIn</SocialLink>
                <SocialLink href="https://www.instagram.com/encelyte/" target="_blank" rel="noopener noreferrer">Instagram</SocialLink>
                <SocialLink href="https://wa.me/35796733800" target="_blank" rel="noopener noreferrer">WhatsApp</SocialLink>
                <SocialLink href="https://www.facebook.com/encelyte" target="_blank" rel="noopener noreferrer">Facebook</SocialLink>
              </SocialGrid>
            </div>
          </MenuLinks>
        </MenuPanel>
      )}

      {isContactOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.5)', zIndex:1500, backdropFilter:'blur(4px)' }}
            onClick={toggleContact}
          />
          <ContactPanel
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <ContactHeader>
              <h2>Contact</h2>
              <PillButton onClick={toggleContact}>Close</PillButton>
            </ContactHeader>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize:'1.55rem', fontWeight:500, margin:0, lineHeight:1.25 }}>{"Have a project you'd like to talk about?"}</h3>
            </div>
            <EmailRow>
              <span>contact</span><span className="symbol">@</span><span>encelyte.com</span>
            </EmailRow>
            <div style={{ display:'flex', gap:'1rem', marginBottom:'2rem', flexWrap:'wrap' }}>
              <CTAAction href="https://wa.me/35796733800" target="_blank" rel="noopener noreferrer">WhatsApp</CTAAction>
              <CTASecondary>Book a call</CTASecondary>
            </div>
            <MetaBlock>
              <div>Nicosia, Cyprus</div>
              <div>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Local</div>
            </MetaBlock>
            <form style={{ display:'flex', flexDirection:'column', gap:'1.25rem', flex:1 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                <div>
                  <Label htmlFor="contact-name">What is your name?</Label>
                  <Input id="contact-name" type="text" placeholder="Your Name" />
                </div>
                <div>
                  <Label htmlFor="contact-email">What is your email?</Label>
                  <Input id="contact-email" type="email" placeholder="Email" />
                </div>
              </div>
              <div>
                <Label htmlFor="contact-company">What is the name of your company/organisation?</Label>
                <Input id="contact-company" type="text" placeholder="Company / Organisation" />
              </div>
              <div>
                <Label htmlFor="contact-message">Tell us a bit more about your project</Label>
                <TextArea id="contact-message" rows={4} placeholder="Briefly describe the chosen service" />
              </div>
              <SubmitButton type="submit">Send message</SubmitButton>
            </form>
          </ContactPanel>
        </>
      )}
    </>
  );
};

export default Header;