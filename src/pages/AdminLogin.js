import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh; display:flex; align-items:center; justify-content:center; padding:2rem; background: ${({ theme }) => theme.colors.primary}; transition: background .4s ease;
`;
const Card = styled.form`
  width:100%; max-width:380px; background: ${({ theme }) => theme.colors.panel}; color:${({ theme }) => theme.colors.secondary}; border:1px solid ${({ theme }) => theme.colors.border}; border-radius: 1.25rem; padding:2.25rem 2.25rem 2.75rem; box-shadow:0 18px 40px -18px rgba(0,0,0,0.25); display:flex; flex-direction:column; gap:1.25rem; transition: background .4s ease, color .4s ease;
`;
const Title = styled.h1`margin:0 0 .5rem; font-size:1.55rem; font-weight:600;`;
const Label = styled.label`font-size:.7rem; letter-spacing:.08em; font-weight:600; text-transform:uppercase; color:${({ theme }) => theme.colors.textMedium}; margin-bottom:.4rem; display:block;`;
const Input = styled.input`width:100%; padding:.75rem .9rem; border:1px solid ${({ theme }) => theme.colors.border}; background:${({ theme }) => theme.colors.white}; color:${({ theme }) => theme.colors.text}; border-radius:.65rem; font-size:.85rem; transition:border-color .3s ease, background .4s ease, color .4s ease; &:focus{outline:none; border-color:${({ theme }) => theme.colors.accent}; box-shadow:0 0 0 2px ${({ theme }) => theme.colors.accent}33;}`;
const Submit = styled.button`background:${({ theme }) => theme.colors.accent}; color:${({ theme }) => theme.colors.white}; border:none; padding:.9rem 1.4rem; border-radius:.7rem; font-size:.85rem; font-weight:600; cursor:pointer; transition:background .35s ease, transform .35s ease; &:hover{background:${({ theme }) => theme.colors.secondary}; transform:translateY(-2px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.secondary}; outline-offset:3px;}`;
const Error = styled.div`background: ${({ theme }) => theme.status.danger(theme.mode).bg}; color:${({ theme }) => theme.status.danger(theme.mode).text}; padding:.6rem .75rem; font-size:.7rem; border-radius:.5rem;`;
const BackButton = styled.button`background: ${({ theme }) => theme.colors.secondary}; color:${({ theme }) => theme.colors.primary}; border:none; padding:.55rem .95rem; border-radius:.55rem; font-size:.7rem; font-weight:600; letter-spacing:.05em; cursor:pointer; transition:background .3s ease, transform .3s ease; position:absolute; top:1rem; left:1rem; box-shadow:0 4px 14px -6px rgba(0,0,0,0.25); &:hover{background:${({ theme }) => theme.colors.accent}; transform:translateY(-2px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:2px;}`;

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Enter credentials.'); return; }
    // placeholder auth logic
    if (email === 'admin@encelyte.com' && password === 'admin') { setError(''); onLogin(); } else { setError('Invalid credentials'); }
  };
  return (
    <Wrapper>
      <BackButton type="button" onClick={() => { window.location.hash = ''; }}>← Go Back</BackButton>
      <Card onSubmit={handleSubmit}>
        <div>
          <Title>Admin Login</Title>
          <p style={{margin:0, fontSize:'.8rem', opacity:.75}}>Restricted access</p>
        </div>
        {error && <Error role="alert">{error}</Error>}
        <div>
          <Label htmlFor="admin-email">Email</Label>
          <Input id="admin-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@encelyte.com" autoComplete="username" />
        </div>
        <div>
          <Label htmlFor="admin-pass">Password</Label>
          <Input id="admin-pass" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
        </div>
        <Submit type="submit">Login</Submit>
      </Card>
    </Wrapper>
  );
};

export default AdminLogin;
