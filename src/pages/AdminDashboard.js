import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getInsights, subscribe, updateInsight, addInsight, removeInsight, resetDemo } from '../utils/insightsStore';

const Shell = styled.div`min-height:100vh; display:flex; flex-direction:column; background:${({ theme }) => theme.colors.primary}; color:${({ theme }) => theme.colors.text}; transition:background .4s ease, color .4s ease;`;
const TopBar = styled.header`display:flex; align-items:center; justify-content:space-between; padding:1rem 2rem; background:${({ theme }) => theme.colors.panel}; border-bottom:1px solid ${({ theme }) => theme.colors.border};`;
const Brand = styled.div`font-weight:700; font-size:1.1rem; color:${({ theme }) => theme.colors.secondary};`;
const LogoutBtn = styled.button`background:${({ theme }) => theme.colors.accent}; color:${({ theme }) => theme.colors.white}; border:none; padding:.55rem 1rem; font-size:.75rem; border-radius:.55rem; font-weight:600; cursor:pointer; letter-spacing:.05em; transition:background .3s ease, transform .3s ease; &:hover{background:${({ theme }) => theme.colors.secondary}; transform:translateY(-2px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.secondary}; outline-offset:2px;}`;
const Content = styled.main`flex:1; padding:2rem clamp(1rem,4vw,3rem); display:grid; gap:2rem; align-content:start;`;
const CardGrid = styled.div`display:grid; gap:1.5rem; grid-template-columns:repeat(auto-fill,minmax(230px,1fr));`;
const Card = styled.div`background:${({ theme }) => theme.colors.panel}; border:1px solid ${({ theme }) => theme.colors.border}; border-radius:1rem; padding:1.25rem 1.25rem 1.4rem; display:flex; flex-direction:column; gap:.55rem; box-shadow:0 12px 28px -12px rgba(0,0,0,0.15); position:relative;`;
const CardTitle = styled.h3`margin:0; font-size:.85rem; letter-spacing:.06em; text-transform:uppercase; font-weight:600; color:${({ theme }) => theme.colors.textMedium};`;
const Metric = styled.div`font-size:1.9rem; font-weight:600; color:${({ theme }) => theme.colors.secondary}; line-height:1;`;
const Placeholder = styled.div`font-size:.75rem; opacity:.65;`;
const Actions = styled.div`display:flex; gap:.4rem; margin-top:.25rem;`;
const SmallBtn = styled.button`background:${({ theme }) => theme.colors.accent}; color:${({ theme }) => theme.colors.white}; border:none; padding:.35rem .6rem; font-size:.55rem; letter-spacing:.06em; font-weight:600; border-radius:.45rem; cursor:pointer; transition:background .3s ease, transform .3s ease; &:hover{background:${({ theme }) => theme.colors.secondary}; transform:translateY(-2px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.secondary}; outline-offset:2px;}`;
const AddForm = styled.form`display:grid; gap:.75rem; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); background:${({ theme }) => theme.colors.panel}; border:1px solid ${({ theme }) => theme.colors.border}; padding:1rem 1.1rem 1.3rem; border-radius:1rem;`;
const Input = styled.input`width:100%; padding:.55rem .65rem; border:1px solid ${({ theme }) => theme.colors.border}; background:${({ theme }) => theme.colors.white}; border-radius:.5rem; font-size:.65rem; &:focus{outline:none; border-color:${({ theme }) => theme.colors.accent}; box-shadow:0 0 0 2px ${({ theme }) => theme.colors.accent}33;}`;
const AddButton = styled.button`grid-column:1 / -1; background:${({ theme }) => theme.colors.accent}; color:${({ theme }) => theme.colors.white}; border:none; padding:.7rem 1rem; border-radius:.6rem; font-size:.7rem; font-weight:600; cursor:pointer; letter-spacing:.06em; &:hover{background:${({ theme }) => theme.colors.secondary};}`;
const ResetButton = styled.button`background:transparent; color:${({ theme }) => theme.colors.textMedium}; border:1px solid ${({ theme }) => theme.colors.border}; padding:.55rem .75rem; border-radius:.55rem; font-size:.6rem; font-weight:600; cursor:pointer; letter-spacing:.05em; &:hover{color:${({ theme }) => theme.colors.secondary}; border-color:${({ theme }) => theme.colors.secondary};}`;

const AdminDashboard = ({ onLogout }) => {
  const [items, setItems] = useState(getInsights());
  useEffect(()=>{ const unsub = subscribe(setItems); return ()=>unsub(); },[]);

  const handleQuickInc = (id) => {
    const target = items.find(i=>i.id===id); if(!target) return; updateInsight(id,{ value: target.value + 1 });
  };
  const handleQuickDec = (id) => {
    const target = items.find(i=>i.id===id); if(!target) return; updateInsight(id,{ value: Math.max(0, target.value - 1) });
  };
  const handleRemove = (id) => { if(window.confirm('Remove insight?')) removeInsight(id); };

  const [form, setForm] = useState({ label:'', value:'', suffix:'', description:'' });
  const submitNew = (e) => { e.preventDefault(); if(!form.label || !form.value) return; addInsight({ label:form.label, value:parseFloat(form.value)||0, suffix:form.suffix, description:form.description }); setForm({ label:'', value:'', suffix:'', description:'' }); };

  return (
    <Shell>
      <TopBar>
        <Brand>encelyte admin</Brand>
        <div style={{display:'flex', gap:'.6rem', alignItems:'center'}}>
          <ResetButton type="button" onClick={()=>resetDemo()}>Reset Demo Data</ResetButton>
          <LogoutBtn onClick={onLogout}>Logout</LogoutBtn>
        </div>
      </TopBar>
      <Content>
        <h1 style={{margin:0, fontSize:'1.6rem', fontWeight:600}}>Dashboard</h1>
        <h2 style={{margin:'1rem 0 .25rem', fontSize:'1rem'}}>Live Insights</h2>
        <CardGrid>
          {items.map(ins => (
            <Card key={ins.id}>
              <CardTitle>{ins.label}</CardTitle>
              <Metric>{ins.value}<span style={{fontSize:'.45em', marginLeft:'.15em'}}>{ins.suffix}</span></Metric>
              <Placeholder>{ins.description || '—'}</Placeholder>
              <Actions>
                <SmallBtn type="button" onClick={()=>handleQuickInc(ins.id)}>+1</SmallBtn>
                <SmallBtn type="button" onClick={()=>handleQuickDec(ins.id)}>-1</SmallBtn>
                <SmallBtn type="button" onClick={()=>handleRemove(ins.id)} style={{background:'#444'}}>Del</SmallBtn>
              </Actions>
            </Card>
          ))}
        </CardGrid>
        <div style={{marginTop:'1.5rem'}}>
          <h3 style={{margin:'0 0 .6rem', fontSize:'.85rem', letterSpacing:'.08em', textTransform:'uppercase'}}>Add Insight</h3>
          <AddForm onSubmit={submitNew}>
            <Input placeholder="Label" value={form.label} onChange={e=>setForm({...form,label:e.target.value})} />
            <Input placeholder="Value" value={form.value} onChange={e=>setForm({...form,value:e.target.value})} />
            <Input placeholder="Suffix (%, +, etc)" value={form.suffix} onChange={e=>setForm({...form,suffix:e.target.value})} />
            <Input placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
            <AddButton type="submit">Add Insight</AddButton>
          </AddForm>
        </div>
        <div style={{background:'transparent', border:'1px dashed ' + 'rgba(0,0,0,0.2)', padding:'2rem', borderRadius:'1rem', textAlign:'center', fontSize:'.85rem', opacity:.6}}>
          Future admin widgets / charts go here.
        </div>
      </Content>
    </Shell>
  );
};

export default AdminDashboard;
