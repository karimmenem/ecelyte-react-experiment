import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  position: relative; width:100%;
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(180deg, #031524 0%, #062338 45%, #072c44 100%)'
    : 'linear-gradient(180deg,#ffffff 0%, #f3f7fa 55%, #e9f1f6 100%)'};
  color: ${({ theme }) => theme.mode === 'dark' ? theme.colors.white : theme.colors.secondary};
  padding: clamp(3rem,6vw,5rem) clamp(1.2rem,4vw,3rem) 1.8rem;
  transition: background .6s ease, color .4s ease;
  border-top: 1px solid ${({ theme }) => theme.colors.borderAlt}33;
  overflow:hidden;
  box-shadow: ${({ theme }) => theme.mode === 'dark'
    ? '0 -4px 22px -6px rgba(0,0,0,.5)'
    : '0 -6px 28px -8px rgba(0,0,0,.08), 0 -1px 0 0 rgba(0,0,0,0.04)'};
  &:before { content:''; position:absolute; inset:0; pointer-events:none; mix-blend-mode:overlay; opacity:${({ theme }) => theme.mode==='dark'? .18 : .4}; background:
    radial-gradient(circle at 18% 22%, ${({ theme }) => theme.mode==='dark'? '#0d3d66' : '#ffffff'} 0%, transparent 60%),
    radial-gradient(circle at 82% 78%, ${({ theme }) => theme.mode==='dark'? '#0b2e4b' : '#d9e7f1'} 0%, transparent 65%);
  }
`;

const Inner = styled.div`max-width:1400px; margin:0 auto; display:flex; flex-direction:column; gap:3.5rem;`;

const SocialRow = styled.nav`
  display:flex; flex-wrap:wrap; gap:1.85rem; font-size:.95rem; letter-spacing:.03em; text-transform:capitalize;
`;

const SocialLink = styled.a`
  color:inherit; text-decoration:none; opacity:.85; position:relative; font-weight:500; transition:opacity .35s ease, color .4s ease;
  &:hover{opacity:1; color:${({ theme }) => theme.colors.accent};}
  &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:3px; border-radius:4px;}
`;

const CTACluster = styled.div`
  display:flex; justify-content:space-between; align-items:flex-start; gap:4rem; flex-wrap:wrap;
`;

const CTALeft = styled.div`flex:1 1 460px; min-width:300px;`;

const Headline = styled.h2`
  font-size: clamp(2.3rem,6vw,4.1rem); line-height:1.15; font-weight:600; margin:0 0 1.65rem; letter-spacing:-.02em; max-width:760px;
  background: ${({ theme }) => theme.mode==='dark'
    ? `linear-gradient(90deg, ${theme.colors.white} 0%, ${theme.colors.accent} 80%)`
    : `linear-gradient(90deg, ${theme.colors.secondary} 0%, ${theme.colors.accent} 75%)`};
  -webkit-background-clip: text; color: ${({ theme }) => theme.colors.secondary};
`;

const MailLink = styled.a`
  display:inline-flex; align-items:center; gap:.35rem; font-size: clamp(1.3rem,3.2vw,2.55rem); font-weight:500; text-decoration:none;
  color:${({ theme }) => theme.mode === 'dark' ? theme.colors.white : theme.colors.secondary}; opacity:.92; transition: color .4s ease, opacity .35s ease, text-shadow .5s ease;
  text-shadow: ${({ theme }) => theme.mode==='dark'? '0 2px 10px rgba(0,0,0,.35)' : '0 2px 6px rgba(0,0,0,.08)'};
  span:nth-child(2){opacity:.55;}
  &:hover{color:${({ theme }) => theme.colors.accent}; opacity:1; text-shadow:none;}
  &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:4px; border-radius:6px;}
`;

const QuickLinks = styled.div`
  display:flex; flex-direction:column; gap:.85rem; min-width:160px; padding-top:.4rem;
`;

const QuickLink = styled.a`
  font-size:.95rem; text-decoration:none; color:inherit; opacity:.78; font-weight:500; letter-spacing:.04em; transition:opacity .3s ease, color .35s ease, transform .35s ease;
  position:relative; padding:.15rem 0;
  &:before{content:''; position:absolute; left:0; bottom:0; height:2px; width:0; background:${({ theme }) => theme.colors.accent}; border-radius:2px; transition:width .5s cubic-bezier(.7,.2,.15,1); opacity:.65;}
  &:hover{opacity:1; color:${({ theme }) => theme.colors.accent}; transform:translateX(4px);}
  &:hover:before{width:22px;}
  &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:3px; border-radius:4px;}
`;

const Divider = styled.div`
  display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:1rem; padding-top:2.4rem; margin-top:.6rem; border-top:1px solid ${({ theme }) => theme.colors.borderAlt}33;
`;

const Legal = styled.div`font-size:.78rem; opacity:.65; letter-spacing:.05em;`;

const PolicyLink = styled.a`
  color:inherit; text-decoration:none; font-size:.8rem; opacity:.75; transition:color .35s ease, opacity .35s ease; position:relative;
  &:hover{opacity:1; color:${({ theme }) => theme.colors.accent};}
  &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:3px; border-radius:4px;}
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Inner>
        <SocialRow aria-label="Social media">
          <SocialLink href="https://www.linkedin.com/company/encelyte" target="_blank" rel="noopener noreferrer">LinkedIn</SocialLink>
          <SocialLink href="https://wa.me/35796733800" target="_blank" rel="noopener noreferrer">WhatsApp</SocialLink>
            <SocialLink href="https://www.facebook.com/encelyte" target="_blank" rel="noopener noreferrer">Facebook</SocialLink>
          <SocialLink href="https://www.instagram.com/encelyte/" target="_blank" rel="noopener noreferrer">Instagram</SocialLink>
        </SocialRow>
        <CTACluster>
          <CTALeft>
            <Headline>Curious how Encelyte can help?</Headline>
            <MailLink href="mailto:contact@encelyte.com"><span>contact</span><span style={{opacity:.65}}>@</span><span>encelyte.com</span></MailLink>
          </CTALeft>
          <QuickLinks aria-label="Quick navigation">
            <QuickLink href="#home">Home</QuickLink>
            <QuickLink href="#services">Services</QuickLink>
            <QuickLink href="mailto:contact@encelyte.com">Contact</QuickLink>
            <QuickLink href="#/terms">Terms of Use</QuickLink>
          </QuickLinks>
        </CTACluster>
        <Divider>
          <Legal>Encelyte, LLC © 2025. All rights reserved.</Legal>
          <PolicyLink href="#/terms" style={{justifySelf:'center'}}>Terms of Use</PolicyLink>
          <PolicyLink href="/privacy" style={{justifySelf:'end'}}>Privacy Policy</PolicyLink>
        </Divider>
      </Inner>
    </FooterWrapper>
  );
};

export default Footer;
