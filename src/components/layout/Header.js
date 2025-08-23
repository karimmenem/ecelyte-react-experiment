import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 2rem;
  background-color: ${theme.colors.primary};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
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
  font-weight: ${theme.fonts.weights.regular};
  color: ${theme.colors.secondary};
  font-family: ${theme.fonts.primary};
  cursor: pointer;
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CTAButton = styled.button`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.primary};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: ${theme.fonts.weights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.accent};
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MenuButton = styled.button`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.primary};
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: ${theme.fonts.weights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.accent};
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

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
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '2rem',
            width: '350px',
            height: '400px',
            backgroundColor: '#1a1a1a',
            borderRadius: '30px',
            zIndex: 2000,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            transformOrigin: 'top right',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
          }}
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
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1500,
              backdropFilter: 'blur(4px)'
            }}
            onClick={toggleContact}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '38%',
              height: '100vh',
              backgroundColor: '#f5f5f5',
              zIndex: 2000,
              padding: '2rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1a1a1a',
                margin: 0
              }}>
                Contact
              </h2>
              
              <button
                onClick={toggleContact}
                style={{
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
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

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: '500',
                color: '#1a1a1a',
                margin: '0 0 1rem 0',
                lineHeight: '1.3'
              }}>
                Have a project you'd like to talk about?
              </h3>
            </div>

            <div style={{
              fontSize: '1.2rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ color: '#666666' }}>contact</span>
              <span style={{ color: '#7da7c7' }}>@</span>
              <span style={{ color: '#666666' }}>encelyte.com</span>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <a
                href="https://wa.me/35796733800"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                WhatsApp
              </a>
              <button
                style={{
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Book a call
              </button>
            </div>

            <div style={{
              fontSize: '0.9rem',
              color: '#666666',
              marginBottom: '2rem'
            }}>
              <div>Nicosia, Cyprus</div>
              <div>14:52 PM EET</div>
            </div>

            <form style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              flex: 1
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    color: '#666666',
                    marginBottom: '0.5rem'
                  }}>
                    What is your name?
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    color: '#666666',
                    marginBottom: '0.5rem'
                  }}>
                    What is your email?
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  color: '#666666',
                  marginBottom: '0.5rem'
                }}>
                  What is the name of your company/organisation?
                </label>
                <input
                  type="text"
                  placeholder="Company/Organisation"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  color: '#666666',
                  marginBottom: '0.5rem'
                }}>
                  Tell us a bit more about your project
                </label>
                <textarea
                  placeholder="Briefly describe the chosen service"
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  alignSelf: 'flex-start',
                  marginTop: 'auto'
                }}
              >
                Send message
              </button>
            </form>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Header;