import React from 'react';
import styled, { keyframes } from 'styled-components';

const MarqueeContainer = styled.div`
  width: 100vw;
  overflow: hidden;
  position: relative;
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 2.5rem 0; /* breathing room */
  background: ${({ theme }) => theme.mode === 'dark'
    ? `linear-gradient(180deg, ${theme.colors.backgroundDark} 0%, ${theme.colors.panel} 60%, ${theme.colors.backgroundDark} 100%)`
    : `linear-gradient(180deg, ${theme.colors.primary} 0%, ${theme.colors.panel} 55%, ${theme.colors.primary} 100%)`};
  border-top: 1px solid ${({ theme }) => theme.colors.borderAlt}33;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderAlt}33;
  /* edge fades */
  &::before, &::after { content: ''; position: absolute; top: 0; width: 140px; height: 100%; z-index: 2; pointer-events: none; }
  &::before { left: 0; background: linear-gradient(90deg, ${({ theme }) => theme.mode === 'dark' ? theme.colors.backgroundDark : theme.colors.primary} 0%, transparent 100%); }
  &::after { right: 0; background: linear-gradient(270deg, ${({ theme }) => theme.mode === 'dark' ? theme.colors.backgroundDark : theme.colors.primary} 0%, transparent 100%); }
`;

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const MarqueeTrack = styled.div`
  display: flex;
  align-items: center;
  animation: ${scroll} 24s linear infinite; /* slightly slower to match smaller items */
  width: 200%;
  gap: 2.5rem; /* reduced gap */
  
  &:hover {
    animation-play-state: paused;
  }
`;

const TechIcon = styled.div`
  width: 60px; /* reduced size */
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.72;
  transition: all 0.35s ${({ theme }) => theme.animations ? theme.animations.easing : 'ease'};
  filter: drop-shadow(0 3px 8px rgba(0,0,0,0.07));
  border-radius: 14px;
  backdrop-filter: blur(4px);
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))'
    : 'linear-gradient(145deg, rgba(0,45,75,0.07), rgba(0,45,75,0.02))'};
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
  &:hover { opacity: 1; transform: scale(1.1) translateY(-4px); }
  img {
    width: 64%;
    height: 64%;
    object-fit: contain;
    filter: ${({ theme }) => theme.mode === 'dark'
      ? 'grayscale(0) brightness(1.05)'
      : 'grayscale(.25) saturate(.85)'};
    opacity: .95;
    transition: filter .35s ease, transform .35s ease;
  }
  &:hover img { filter: ${({ theme }) => theme.mode === 'dark'
    ? 'grayscale(0) brightness(1.12) drop-shadow(0 4px 12px rgba(0,0,0,0.35))'
    : 'grayscale(0) saturate(1.2) drop-shadow(0 4px 10px rgba(0,0,0,0.15))'}; }
`;

const TechMarquee = () => {
  const techIcons = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  ];

  const duplicatedIcons = [...techIcons, ...techIcons];

  return (
    <MarqueeContainer>
      <MarqueeTrack>
        {duplicatedIcons.map((iconUrl, index) => (
          <TechIcon key={index}>
            <img
              src={iconUrl}
              alt={`Technology ${index + 1}`}
              loading="lazy"
              decoding="async"
            />
          </TechIcon>
        ))}
      </MarqueeTrack>
    </MarqueeContainer>
  );
};

export default TechMarquee;