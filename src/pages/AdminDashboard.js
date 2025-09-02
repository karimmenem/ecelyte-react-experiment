import React from 'react';
import styled from 'styled-components';

const Shell = styled.div`min-height:100vh; display:flex; flex-direction:column; background:${({ theme }) => theme.colors.primary}; color:${({ theme }) => theme.colors.text}; transition:background .4s ease, color .4s ease;`;
const TopBar = styled.header`display:flex; align-items:center; justify-content:space-between; padding:1rem 2rem; background:${({ theme }) => theme.colors.panel}; border-bottom:1px solid ${({ theme }) => theme.colors.border};`;
const Brand = styled.div`font-weight:700; font-size:1.1rem; color:${({ theme }) => theme.colors.secondary};`;
const LogoutBtn = styled.button`background:${({ theme }) => theme.colors.accent}; color:${({ theme }) => theme.colors.white}; border:none; padding:.55rem 1rem; font-size:.75rem; border-radius:.55rem; font-weight:600; cursor:pointer; letter-spacing:.05em; transition:background .3s ease, transform .3s ease; &:hover{background:${({ theme }) => theme.colors.secondary}; transform:translateY(-2px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.secondary}; outline-offset:2px;}`;
const Content = styled.main`flex:1; padding:2rem clamp(1rem,4vw,3rem); display:grid; gap:2rem; align-content:start;`;
const CardGrid = styled.div`display:grid; gap:1.5rem; grid-template-columns:repeat(auto-fill,minmax(230px,1fr));`;
const Card = styled.div`background:${({ theme }) => theme.colors.panel}; border:1px solid ${({ theme }) => theme.colors.border}; border-radius:1rem; padding:1.25rem 1.25rem 1.4rem; display:flex; flex-direction:column; gap:.55rem; box-shadow:0 12px 28px -12px rgba(0,0,0,0.15);`;
const CardTitle = styled.h3`margin:0; font-size:.85rem; letter-spacing:.06em; text-transform:uppercase; font-weight:600; color:${({ theme }) => theme.colors.textMedium};`;
const Metric = styled.div`font-size:1.9rem; font-weight:600; color:${({ theme }) => theme.colors.secondary}; line-height:1;`;
const Placeholder = styled.div`font-size:.75rem; opacity:.65;`;

const AdminDashboard = ({ onLogout }) => {
  return (
    <Shell>
      <TopBar>
        <Brand>encelyte admin</Brand>
        <LogoutBtn onClick={onLogout}>Logout</LogoutBtn>
      </TopBar>
      <Content>
        <h1 style={{margin:0, fontSize:'1.6rem', fontWeight:600}}>Dashboard</h1>
        <CardGrid>
          <Card>
            <CardTitle>Active Projects</CardTitle>
            <Metric>6</Metric>
            <Placeholder>Sample metric</Placeholder>
          </Card>
          <Card>
            <CardTitle>Leads This Week</CardTitle>
            <Metric>14</Metric>
            <Placeholder>Sample metric</Placeholder>
          </Card>
          <Card>
            <CardTitle>Open Tickets</CardTitle>
            <Metric>3</Metric>
            <Placeholder>Sample metric</Placeholder>
          </Card>
          <Card>
            <CardTitle>Deploys</CardTitle>
            <Metric>12</Metric>
            <Placeholder>Last 30 days</Placeholder>
          </Card>
        </CardGrid>
        <div style={{background:'transparent', border:'1px dashed ' + 'rgba(0,0,0,0.2)', padding:'2rem', borderRadius:'1rem', textAlign:'center', fontSize:'.85rem', opacity:.6}}>
          Future admin widgets / charts go here.
        </div>
      </Content>
    </Shell>
  );
};

export default AdminDashboard;
