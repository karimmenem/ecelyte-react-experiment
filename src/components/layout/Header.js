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

const SimpleLogo = styled.span`
  position:relative; font-family:${({ theme }) => theme.fonts.primary};
  font-size:1.95rem; font-weight:700; letter-spacing:-0.028em; line-height:1; display:inline-flex; align-items:flex-end; gap:.4rem; color:${({ theme }) => theme.colors.secondary};
  .accent { color:${({ theme }) => theme.colors.accent}; letter-spacing:-0.01em; }
  .splitDot { width:6px; height:6px; border-radius:50%; background:${({ theme }) => theme.colors.accent}; align-self:center; box-shadow:0 0 0 4px ${({ theme }) => theme.colors.accent}22; }
  &:after { content:''; position:absolute; left:0; bottom:-6px; height:3px; width:100%; background:linear-gradient(90deg, ${({ theme }) => theme.colors.accent} 0%, ${({ theme }) => theme.colors.secondary} 70%); border-radius:3px; transform:scaleX(.35) translateY(0); transform-origin:left center; opacity:.4; transition:transform .6s cubic-bezier(.19,1,.22,1), opacity .6s ease; }
  ${LogoLink}:hover &::after { transform:scaleX(1); opacity:.75; }
  @media (max-width:${({ theme }) => theme.breakpoints.tablet}) { font-size:1.7rem; }
`;

const LogoLink = styled.a`
  display:inline-flex; text-decoration:none; margin-right:auto; padding:.4rem .4rem .55rem .2rem; position:relative; cursor:pointer;
  &:focus-visible { outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:4px; border-radius:6px; }
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
  padding:.6rem 1rem; 
  border-radius:12px; 
  font-size:.7rem; 
  font-weight:600; 
  letter-spacing:.05em; 
  cursor:pointer; 
  transition: background .35s ease, transform .35s ease, border-color .35s ease; 
  display:inline-flex; 
  align-items:center; 
  gap:.4rem;
  &:hover {
    background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.16)' : 'rgba(0,45,75,0.14)'};
    transform: translateY(-2px);
  }
  &:focus-visible {
    outline:2px solid ${({ theme }) => theme.colors.accent};
    outline-offset:3px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display:none;
  }
`;

const ContactPanel = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 38%;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 2rem;
  background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.panelAlt : theme.colors.panel};
  color: ${({ theme }) => theme.mode === 'dark' ? theme.colors.white : theme.colors.secondary};
  box-shadow: -8px 0 28px -8px rgba(0,0,0,0.35);
  transition: background .4s ease, color .4s ease;
  @media (max-width: 1024px) { width: 60%; }
  @media (max-width: 720px) { width: 100%; }
`;

const ContactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  h2 {
    margin: 0;
    font-size: 1.55rem;
    font-weight: 600;
    color: inherit;
  }
`;

const PillButton = styled.button`
  background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.secondary : theme.colors.secondary};
  color: ${({ theme }) => theme.mode === 'dark' ? theme.colors.primary : theme.colors.primary};
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background .3s ease, color .3s ease, transform .3s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const CTAAction = styled.a`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  padding: .8rem 1.5rem;
  border-radius: 25px;
  font-size: .9rem;
  font-weight: 500;
  transition: background .35s ease, transform .35s ease;
  display: inline-flex;
  align-items: center;
  gap:.5rem;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }
`;

const CTASecondary = styled.button`
  background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.accent : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: .8rem 1.5rem;
  border-radius: 25px;
  font-size: .9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background .35s ease, transform .35s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }
`;

const MetaBlock = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: .25rem;
`;

const EmailRow = styled.div`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: .5rem;
  flex-wrap: wrap;
  span { color: ${({ theme }) => theme.colors.textMedium}; }
  span.symbol { color: ${({ theme }) => theme.colors.accent}; }
`;

const Label = styled.label`
  display: block;
  font-size: .8rem;
  font-weight: 500;
  letter-spacing: .05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 .4rem;
`;

const Input = styled.input`
  width: 100%;
  padding: .75rem .85rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: .85rem;
  background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.panel : theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color .3s ease, background .4s ease, color .4s ease;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}33;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: .75rem .85rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: .85rem;
  background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.panel : theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  transition: border-color .3s ease, background .4s ease, color .4s ease;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}33;
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: .9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background .35s ease, transform .35s ease;
  align-self: flex-start;
  margin-top: auto;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 3px;
  }
`;

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
            <SimpleLogo><span className="word word--left">ence</span><span className="splitDot" aria-hidden="true" /> <span className="accent">lyte</span></SimpleLogo>
          </LogoLink>
          <HeaderButtons>
            <ToggleButton onClick={toggle}>{mode === 'light' ? 'Dark' : 'Light'} Mode</ToggleButton>
            <CTAButton onClick={() => setIsContactOpen(true)}>Let's Build Together!</CTAButton>
            <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</MenuButton>
          </HeaderButtons>
        </Nav>
      </HeaderContainer>

      {isMenuOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ position:'fixed', top:'1.5rem', right:'2rem', width:'350px', height:'440px', backgroundColor: theme.colors.secondary, color: theme.colors.primary, borderRadius:'30px', zIndex:2000, padding:'2rem', display:'flex', flexDirection:'column', transformOrigin:'top right', boxShadow:'0 20px 40px rgba(0,0,0,0.3)', transition:'background 0.4s ease, color 0.4s ease' }}
        >
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
            <div style={{ width:'40px', height:'40px', backgroundColor: theme.colors.white, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:'20px', height:'20px', backgroundColor: theme.colors.secondary, borderRadius:'50%' }} />
            </div>
            <button onClick={toggleMenu} style={{ backgroundColor: theme.colors.white, color: theme.colors.secondary, border:'none', padding:'0.6rem 1.2rem', borderRadius:'20px', fontSize:'0.85rem', fontWeight:'500', cursor:'pointer', transition:'all 0.3s ease' }}>Close</button>
          </div>
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:'1.25rem' }}>
            <a href="#home" style={{ fontSize:'1.6rem', fontWeight:500, color: theme.colors.white, textDecoration:'none', transition:'color .3s ease' }} onMouseEnter={e=>e.target.style.color=theme.colors.borderAlt} onMouseLeave={e=>e.target.style.color=theme.colors.white}>Home</a>
            <a href="#services" style={{ fontSize:'1.6rem', fontWeight:500, color: theme.colors.white, textDecoration:'none', transition:'color .3s ease', marginBottom:'1rem' }} onMouseEnter={e=>e.target.style.color=theme.colors.borderAlt} onMouseLeave={e=>e.target.style.color=theme.colors.white}>Services</a>
            <a href="#/admin/login" style={{ fontSize:'1.2rem', fontWeight:500, color: theme.colors.white, textDecoration:'none', transition:'color .3s ease', marginTop:'auto', opacity:.85 }} onMouseEnter={e=>e.target.style.color=theme.colors.borderAlt} onMouseLeave={e=>e.target.style.color=theme.colors.white}>Admin</a>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', fontSize:'0.95rem', marginTop:'1rem' }}>
              <a href="https://www.linkedin.com/company/encelyte" target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.white, textDecoration:'none', opacity:.8, transition:'color .3s ease' }} onMouseEnter={e=>e.target.style.color=theme.colors.borderAlt} onMouseLeave={e=>e.target.style.color=theme.colors.white}>LinkedIn</a>
              <a href="https://www.instagram.com/encelyte/" target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.white, textDecoration:'none', opacity:.8, transition:'color .3s ease' }} onMouseEnter={e=>e.target.style.color=theme.colors.borderAlt} onMouseLeave={e=>e.target.style.color=theme.colors.white}>Instagram</a>
              <a href="https://wa.me/35796733800" target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.white, textDecoration:'none', opacity:.8, transition:'color .3s ease' }} onMouseEnter={e=>e.target.style.color=theme.colors.borderAlt} onMouseLeave={e=>e.target.style.color=theme.colors.white}>WhatsApp</a>
              <a href="https://www.facebook.com/encelyte" target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.white, textDecoration:'none', opacity:.8, transition:'color .3s ease' }} onMouseEnter={e=>e.target.style.color=theme.colors.borderAlt} onMouseLeave={e=>e.target.style.color=theme.colors.white}>Facebook</a>
            </div>
          </div>
        </motion.div>
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