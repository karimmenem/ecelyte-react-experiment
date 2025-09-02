import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useThemeMode } from './Layout';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: background 0.4s ease;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: color 0.4s ease;
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CTAButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MenuButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  cursor: pointer;
  transition: background 0.3s ease;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) { display: none; }
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
  const { mode, toggle, theme } = useThemeMode();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <>
      <HeaderContainer>
        <Nav>
          <Logo>encelyte</Logo>
          <HeaderButtons>
            <ToggleButton onClick={toggle}>{mode === 'light' ? 'Dark' : 'Light'} Mode</ToggleButton>
            <CTAButton onClick={toggleContact}>Let's Build Together!</CTAButton>
            <MenuButton onClick={toggleMenu}>Menu</MenuButton>
          </HeaderButtons>
        </Nav>
      </HeaderContainer>

      {isMenuOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ position:'fixed', top:'1.5rem', right:'2rem', width:'350px', height:'400px', backgroundColor: theme.colors.secondary, color: theme.colors.primary, borderRadius:'30px', zIndex:2000, padding:'2rem', display:'flex', flexDirection:'column', transformOrigin:'top right', boxShadow:'0 20px 40px rgba(0,0,0,0.3)', transition:'background 0.4s ease, color 0.4s ease' }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#1a1a1a',
                borderRadius: '50%'
              }}></div>
            </div>
            
            <button
              onClick={toggleMenu}
              style={{
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Close
            </button>
          </div>

          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <a
              href="#home"
              style={{
                fontSize: '2rem',
                fontWeight: '500',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                marginBottom: '0.5rem'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#a8b7c7')}
              onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
            >
              Home
            </a>
            <a
              href="#services"
              style={{
                fontSize: '2rem',
                fontWeight: '500',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                marginBottom: '2rem'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#a8b7c7')}
              onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
            >
              Services
            </a>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              fontSize: '1rem'
            }}>
              <a
                href="https://www.linkedin.com/company/encelyte"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  opacity: 0.8,
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target.style.color = '#a8b7c7')}
                onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/encelyte/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  opacity: 0.8,
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target.style.color = '#a8b7c7')}
                onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
              >
                Instagram
              </a>
              <a
                href="https://wa.me/35796733800"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  opacity: 0.8,
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target.style.color = '#a8b7c7')}
                onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
              >
                WhatsApp
              </a>
              <a
                href="https://www.facebook.com/encelyte"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  opacity: 0.8,
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target.style.color = '#a8b7c7')}
                onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
              >
                Facebook
              </a>
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