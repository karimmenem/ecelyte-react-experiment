import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '../../src/components/layout/Layout';

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
const BackButton = styled.button`background: ${({ theme }) => theme.colors.secondary}; color:${({ theme }) => theme.colors.primary}; border:none; padding:.55rem .95rem; border-radius:.55rem; font-size:.7rem; font-weight:600; letter-spacing:.05em; cursor:pointer; transition:background .3s ease, transform .3s ease; position:fixed; top:1rem; left:1rem; z-index:1100; box-shadow:0 4px 14px -6px rgba(0,0,0,0.25); &:hover{background:${({ theme }) => theme.colors.accent}; transform:translateY(-2px);} &:focus-visible{outline:2px solid ${({ theme }) => theme.colors.accent}; outline-offset:2px;}`;

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Enter credentials.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });
      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => { router.push('/'); };

  return (
    <Layout>
      <Wrapper>
        <BackButton type="button" onClick={handleGoBack}>← Go Back</BackButton>
        <Card onSubmit={handleSubmit}>
          <Title>Admin Access</Title>
          {error && <Error>{error}</Error>}
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@encelyte.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
          </div>
          <Submit type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</Submit>
        </Card>
      </Wrapper>
    </Layout>
  );
}
