import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '../src/components/layout/Layout';

const Wrap = styled.div`min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:4rem 2rem; background:${({ theme }) => theme.colors.primary}; color:${({ theme }) => theme.colors.secondary}; font-family:${({ theme }) => theme.fonts.primary}; transition:background .4s ease, color .4s ease;`;
const Card = styled.div`max-width:720px; width:100%; background:${({ theme }) => theme.mode==='dark'? theme.colors.panel: theme.colors.panel}; border:1px solid ${({ theme }) => theme.colors.borderAlt}44; border-radius:32px; padding:3.2rem clamp(1.5rem,4vw,3.5rem); box-shadow:0 18px 42px -18px rgba(0,0,0,.3), 0 0 0 1px ${({ theme }) => theme.colors.borderAlt}33 inset; backdrop-filter:blur(10px) saturate(140%); text-align:center;`;
const Title = styled.h1`margin:0 0 1.25rem; font-size:clamp(2rem,6vw,3.2rem); letter-spacing:-0.03em; font-weight:700;`;
const Subtitle = styled.p`margin:0 0 2.2rem; font-size:clamp(1rem,2.1vw,1.25rem); line-height:1.55; color:${({ theme }) => theme.colors.textLight};`;
const Pill = styled.span`display:inline-flex; align-items:center; gap:.5rem; background:${({ theme }) => theme.colors.accent}; color:${({ theme }) => theme.colors.primary}; padding:.55rem 1.05rem; border-radius:999px; font-size:.7rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; margin-bottom:2rem;`; 
const EmptyState = styled.div`display:flex; flex-direction:column; gap:1.4rem; align-items:center;`;
const Bubble = styled.div`width:76px; height:76px; border-radius:22px; background:linear-gradient(145deg, ${({ theme }) => theme.colors.accent} 0%, ${({ theme }) => theme.colors.secondary} 100%); box-shadow:0 10px 24px -8px rgba(0,0,0,.4); display:flex; align-items:center; justify-content:center; color:${({ theme }) => theme.colors.primary}; font-weight:600; font-size:1.4rem; letter-spacing:-0.02em;`;
const Message = styled.p`margin:0; font-size:1rem; color:${({ theme }) => theme.colors.textMedium};`;
const BackLink = styled.button`margin-top:2.4rem; text-decoration:none; font-size:.85rem; font-weight:600; letter-spacing:.05em; color:${({ theme }) => theme.colors.accent}; display:inline-flex; align-items:center; gap:.55rem; position:relative; padding:.65rem 1.1rem; border-radius:14px; background:${({ theme }) => theme.mode==='dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,45,75,0.08)'}; border:1px solid ${({ theme }) => theme.colors.borderAlt}55; transition:background .35s ease, color .35s ease, transform .35s ease; cursor:pointer; &:hover{background:${({ theme }) => theme.colors.accent}; color:${({ theme }) => theme.colors.primary}; transform:translateY(-2px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:3px;}`;

export default function CareersPage() {
  const router = useRouter();
  
  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <Layout>
      <Wrap>
        <Card>
          <Pill>Careers</Pill>
          <Title>Work with us</Title>
          <Subtitle>We are not hiring right now — but we love meeting talented people. Leave us a note through the contact panel and we will reach out when roles open.</Subtitle>
          <EmptyState>
            <Bubble>∅</Bubble>
            <Message>No open positions currently.</Message>
          </EmptyState>
          <BackLink onClick={handleBackClick}>← Back to site</BackLink>
        </Card>
      </Wrap>
    </Layout>
  );
}
