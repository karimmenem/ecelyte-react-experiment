import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

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
const BackLink = styled.a``;

const Privacy = () => {
  const { t } = useLanguage();
  return (
  <Wrapper id="privacy">
    <Title>{t('privacy.title')}</Title>
    <Section>
      <Paragraph>{t('privacy.intro')}</Paragraph>
    </Section>

    <Section>
      <Heading>{t('privacy.infoWeCollect.title')}</Heading>
      <Paragraph>{t('privacy.infoWeCollect.intro')}</Paragraph>
      <List>
        <li><strong>{t('privacy.infoWeCollect.contactInfo')}</strong></li>
        <li><strong>{t('privacy.infoWeCollect.projectInfo')}</strong></li>
        <li><strong>{t('privacy.infoWeCollect.commData')}</strong></li>
        <li><strong>{t('privacy.infoWeCollect.websiteUsage')}</strong></li>
        <li><strong>{t('privacy.infoWeCollect.serviceData')}</strong></li>
      </List>
    </Section>

    <Section>
      <Heading>{t('privacy.howWeUse.title')}</Heading>
      <Paragraph>{t('privacy.howWeUse.intro')}</Paragraph>
      <List>
        <li><strong>{t('privacy.howWeUse.serviceDelivery')}</strong></li>
        <li><strong>{t('privacy.howWeUse.clientComm')}</strong></li>
        <li><strong>{t('privacy.howWeUse.serviceImprovement')}</strong></li>
        <li><strong>{t('privacy.howWeUse.businessOps')}</strong></li>
        <li><strong>{t('privacy.howWeUse.legalCompliance')}</strong></li>
      </List>
    </Section>

    <Section>
      <Heading>{t('privacy.contactInfo.title')}</Heading>
      <Paragraph><strong>{t('privacy.contactInfo.email')}</strong></Paragraph>
      <Paragraph><strong>{t('privacy.contactInfo.website')}</strong></Paragraph>
      <Paragraph>{t('privacy.contactInfo.note')}</Paragraph>
      <Paragraph style={{marginTop:'2rem', fontSize:'.8rem', opacity:.65}}>{t('privacy.lastUpdated')}</Paragraph>
    </Section>
  </Wrapper>
  );
};

export default Privacy;
