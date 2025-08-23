import React from 'react';

const Footer = () => {

  return (
    <footer
      style={{
        backgroundColor: '#0b161b',
        color: '#ffffff',
        padding: '3rem 2rem 1.5rem',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            gap: '1.8rem',
            marginBottom: '2.5rem',
            fontSize: '1rem',
            opacity: 0.85
          }}
        >
          <a
            href="https://www.linkedin.com/company/encelyte"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => (e.target.style.color = '#a8b7c7')}
            onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
          >
            Linkedin
          </a>
          <a
            href="https://wa.me/35796733800"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
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
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => (e.target.style.color = '#a8b7c7')}
            onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/encelyte/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => (e.target.style.color = '#a8b7c7')}
            onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
          >
            Instagram
          </a>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '2rem'
          }}
        >
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
                fontWeight: '500',
                margin: '0 0 1.5rem 0',
                lineHeight: '1.2',
                maxWidth: '650px'
              }}
            >
              Curious how Encelyte can help?
            </h2>

            <a
              href="mailto:contact@encelyte.com"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.6rem)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#a8b7c7')}
              onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
            >
              <span style={{ opacity: 0.9, fontWeight: '400' }}>contact</span>
              <span
                style={{
                  color: '#7da7c7',
                  fontWeight: '400'
                }}
              >
                @
              </span>
              <span style={{ opacity: 0.9, fontWeight: '400' }}>encelyte.com</span>
            </a>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '2rem',
              fontSize: '1rem',
              alignItems: 'flex-start',
              paddingTop: '1.3rem'
            }}
          >
            <a
              href="#home"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                opacity: 0.85,
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#a8b7c7')}
              onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
            >
              Home
            </a>
            <a
              href="#services"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                opacity: 0.85,
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#a8b7c7')}
              onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
            >
              Services
            </a>
            <a
              href="mailto:contact@encelyte.com"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                opacity: 0.85,
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#a8b7c7')}
              onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
            >
              Contact
            </a>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: '1rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <div
            style={{ fontSize: '0.9rem', opacity: 0.65 }}
          >
            <p style={{ margin: 0 }}>
              Encelyte, Inc. © 2025. All rights reserved.
            </p>
          </div>

          <a
            href="/terms"
            style={{
              justifySelf: 'center',
              fontSize: '0.9rem',
              color: '#ffffff',
              textDecoration: 'none',
              opacity: 0.65,
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#a8b7c7')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
          >
            Terms of Use
          </a>

          <a
            href="/privacy"
            style={{
              justifySelf: 'end',
              fontSize: '0.9rem',
              color: '#ffffff',
              textDecoration: 'none',
              opacity: 0.65,
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#a8b7c7')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
