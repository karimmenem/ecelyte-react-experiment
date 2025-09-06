import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Layout from '../src/components/layout/Layout';
import { useLanguage } from '../src/contexts/LanguageContext';

const Wrapper = styled.div`
  min-height:100vh; background:${({ theme }) => theme.colors.primary}; color:${({ theme }) => theme.colors.text};
  padding:6.5rem clamp(1.2rem,4vw,3rem) 4rem; line-height:1.65; transition:background .4s ease, color .4s ease; position:relative;
  max-width: 1100px; margin:0 auto; font-size:clamp(.9rem,1rem + .2vw,1.05rem);
  
  @media (max-width: 768px) {
    padding: 5.5rem clamp(1rem,3vw,2rem) 3rem;
    line-height: 1.6;
    font-size: clamp(.85rem, 1rem + .15vw, 1rem);
  }
  
  @media (max-width: 480px) {
    padding: 4.5rem 1rem 2.5rem;
    line-height: 1.55;
    font-size: .9rem;
  }
`;

const Title = styled.h1`
  margin:0 0 2.5rem; font-size:clamp(2.2rem,4.5vw,3.4rem); font-weight:700; letter-spacing:-.02em; color:${({ theme }) => theme.colors.secondary};
  
  @media (max-width: 768px) {
    margin: 0 0 2rem;
    font-size: clamp(2rem, 5vw, 2.8rem);
    text-align: center;
  }
  
  @media (max-width: 480px) {
    margin: 0 0 1.8rem;
    font-size: clamp(1.8rem, 6vw, 2.4rem);
  }
`;

const Section = styled.section`
  margin:0 0 2.2rem;
  
  @media (max-width: 768px) {
    margin: 0 0 2rem;
  }
  
  @media (max-width: 480px) {
    margin: 0 0 1.8rem;
  }
`;

const Heading = styled.h2`
  margin:0 0 .85rem; font-size:clamp(1.15rem,2.2vw,1.55rem); font-weight:600; letter-spacing:.02em; color:${({ theme }) => theme.colors.secondary};
  
  @media (max-width: 768px) {
    margin: 0 0 .75rem;
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  }
  
  @media (max-width: 480px) {
    margin: 0 0 .65rem;
    font-size: clamp(1rem, 3vw, 1.25rem);
  }
`;

const Paragraph = styled.p`
  margin:.75rem 0;
  
  @media (max-width: 768px) {
    margin: .65rem 0;
  }
  
  @media (max-width: 480px) {
    margin: .6rem 0;
  }
`;

const List = styled.ul`
  margin:.5rem 0 1rem 1.25rem; padding:0; list-style:disc; 
  li{margin:.4rem 0;}
  
  @media (max-width: 768px) {
    margin: .45rem 0 .9rem 1rem;
    li{margin: .35rem 0;}
  }
  
  @media (max-width: 480px) {
    margin: .4rem 0 .8rem .8rem;
    li{margin: .3rem 0; font-size: .85rem;}
  }
`;

const BackLink = styled.button`
  margin-top:2.4rem; text-decoration:none; font-size:.85rem; font-weight:600; letter-spacing:.05em; color:${({ theme }) => theme.colors.accent}; display:inline-flex; align-items:center; gap:.55rem; position:relative; padding:.65rem 1.1rem; border-radius:14px; background:${({ theme }) => theme.mode==='dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,45,75,0.08)'}; border:1px solid ${({ theme }) => theme.colors.borderAlt}55; transition:background .35s ease, color .35s ease, transform .35s ease; cursor:pointer; &:hover{background:${({ theme }) => theme.colors.accent}; color:${({ theme }) => theme.colors.primary}; transform:translateY(-2px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:3px;}
`;

export default function TermsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  
  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <Layout>
      <Wrapper id="terms">
        <Title>{t('terms.title')}</Title>
        
        <Section>
          <Heading>{t('terms.article1.title')}</Heading>
          <Paragraph>{t('terms.article1.p1')}</Paragraph>
          <Paragraph>{t('terms.article1.p2')}</Paragraph>
          <Paragraph>{t('terms.article1.p3')}</Paragraph>
        </Section>

        <Section>
          <Heading>{t('terms.article2.title')}</Heading>
          <Paragraph><strong>{t('terms.article2.encelyte')}</strong></Paragraph>
          <Paragraph><strong>{t('terms.article2.client')}</strong></Paragraph>
          <Paragraph><strong>{t('terms.article2.services')}</strong></Paragraph>
          <List>
            {t('terms.article2.servicesList').map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </List>
          <Paragraph><strong>{t('terms.article2.project')}</strong></Paragraph>
        </Section>

        <Section>
          <Heading>{t('terms.article3.title')}</Heading>
          <Paragraph>{t('terms.article3.p1')}</Paragraph>
          <Paragraph>{t('terms.article3.p2')}</Paragraph>
          <Paragraph>{t('terms.article3.p3')}</Paragraph>
          <Paragraph>{t('terms.article3.p4')}</Paragraph>
        </Section>

        <Section>
          <Heading>{t('terms.article4.title')}</Heading>
          <Paragraph>{t('terms.article4.p1')}</Paragraph>
          <Paragraph>{t('terms.article4.p2')}</Paragraph>
          <List>
            {t('terms.article4.responsibilities').map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </List>
          <Paragraph>{t('terms.article4.p3')}</Paragraph>
        </Section>

        <Section>
          <Heading>{t('terms.article5.title')}</Heading>
          <Paragraph>{t('terms.article5.p1')}</Paragraph>
          <Paragraph>{t('terms.article5.p2')}</Paragraph>
          <Paragraph>{t('terms.article5.p3')}</Paragraph>
          <Paragraph>{t('terms.article5.p4')}</Paragraph>
        </Section>

        <Section>
          <Heading>{t('terms.article6.title')}</Heading>
          <Paragraph>{t('terms.article6.p1')}</Paragraph>
          <Paragraph>{t('terms.article6.p2')}</Paragraph>
          <Paragraph>{t('terms.article6.p3')}</Paragraph>
          <Paragraph>{t('terms.article6.p4')}</Paragraph>
        </Section>

        <Section>
          <Heading>{t('terms.article7.title')}</Heading>
          <Paragraph>{t('terms.article7.p1')}</Paragraph>
          <List>
            {Array.isArray(t('terms.article7.paymentTypes')) && t('terms.article7.paymentTypes').map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </List>
          <Paragraph>{t('terms.article7.p2')}</Paragraph>
          <Paragraph>{t('terms.article7.p3')}</Paragraph>
          <Paragraph>{t('terms.article7.p4')}</Paragraph>
        </Section>

        <Section>
          <Heading>{t('terms.article8.title')}</Heading>
          <Paragraph>{t('terms.article8.p1')}</Paragraph>
          <Paragraph>{t('terms.article8.p2')}</Paragraph>
          <Paragraph>{t('terms.article8.p3')}</Paragraph>
          <Paragraph>{t('terms.article8.p4')}</Paragraph>
        </Section>

        <Section>
          <Heading>{t('terms.article9.title')}</Heading>
          <Paragraph>{t('terms.article9.p1')}</Paragraph>
          <Paragraph>{t('terms.article9.p2')}</Paragraph>
          <Paragraph>{t('terms.article9.p3')}</Paragraph>
        </Section>

        <Section>
          <Heading>{t('terms.article10.title')}</Heading>
          <Paragraph>{t('terms.article10.p1')}</Paragraph>
          <Paragraph>{t('terms.article10.p2')}</Paragraph>
        </Section>

        <Section>
          <Heading>{t('terms.article11.title')}</Heading>
          <Paragraph>{t('terms.article11.p1')}</Paragraph>
          <Paragraph>{t('terms.article11.p2')}</Paragraph>
          <Paragraph>{t('terms.article11.p3')}</Paragraph>
        </Section>

        <Section>
          <Heading>{t('terms.article12.title')}</Heading>
          <Paragraph>{t('terms.article12.p1')}</Paragraph>
          <Paragraph>{t('terms.article12.p2')}</Paragraph>
          <Paragraph>{t('terms.article12.p3')}</Paragraph>
        </Section>

        <Section>
          <Heading>{t('terms.article13.title')}</Heading>
          <Paragraph>{t('terms.article13.intro')}</Paragraph>
          <Paragraph><strong>{t('terms.article13.email')}</strong></Paragraph>
          <Paragraph><strong>{t('terms.article13.website')}</strong></Paragraph>
          <Paragraph style={{marginTop:'2rem', fontSize:'.8rem', opacity:.65}}>{t('terms.lastUpdated')}</Paragraph>
        </Section>

        <BackLink onClick={handleBackClick}>← Back to site</BackLink>
      </Wrapper>
    </Layout>
  );
}