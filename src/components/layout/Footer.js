import React from 'react';
import styled from 'styled-components';

const FooterShell = styled.footer`
  background-color: ${({ theme }) => theme.mode === 'dark' ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme }) => theme.mode === 'dark' ? theme.colors.secondary : theme.colors.primary};
  padding: 3rem 2rem 1.5rem; position: relative; transition: background 0.4s ease, color 0.4s ease;
`;
const Link = styled.a`
  color: inherit; text-decoration: none; transition: color 0.3s ease; opacity: 0.85; &:hover { color: ${({ theme }) => theme.mode === 'dark' ? theme.colors.primary : theme.colors.white}; }
`;
const Divider = styled.div`
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 1rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.2);
`;

const Footer = () => {
  return (
    <FooterShell>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Social */}
        <div style={{ display: 'flex', gap: '1.8rem', marginBottom: '2.5rem', fontSize: '1rem' }}>
          {['Linkedin','WhatsApp','Facebook','Instagram'].map(item => (
            <Link key={item} href="#" target="_blank" rel="noopener noreferrer">{item}</Link>
          ))}
        </div>
        {/* CTA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 500, margin: '0 0 1.5rem 0', lineHeight: '1.2', maxWidth: '650px' }}>Curious how Encelyte can help?</h2>
            <Link href="mailto:contact@encelyte.com" style={{ fontSize: 'clamp(1.4rem,3vw,2.6rem)', display: 'flex', alignItems: 'center', gap: '.3rem', opacity: 0.9 }}>
              <span>contact</span><span>@</span><span>encelyte.com</span>
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '1rem', alignItems: 'flex-start', paddingTop: '1.3rem' }}>
            {['Home','Services','Contact'].map(item => (<Link key={item} href={item === 'Home' ? '#home' : item === 'Services' ? '#services' : 'mailto:contact@encelyte.com'}>{item}</Link>))}
          </div>
        </div>
        <Divider>
          <div style={{ fontSize: '.9rem', opacity: .65 }}>Encelyte, Inc. © 2025. All rights reserved.</div>
          <Link href="/terms" style={{ justifySelf: 'center' }}>Terms of Use</Link>
          <Link href="/privacy" style={{ justifySelf: 'end' }}>Privacy Policy</Link>
        </Divider>
      </div>
    </FooterShell>
  );
};

export default Footer;
