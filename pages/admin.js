import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useLanguage } from '../src/contexts/LanguageContext';
import { verifySession } from '../lib/auth';

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const TopBar = styled.div`
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;
`;

const BackButton = styled.button`
  background: #002d4b; color: #fff; border: none; padding: 0.5rem 0.9rem; border-radius: 6px; cursor: pointer; font-size: 0.9rem;
  box-shadow: 0 6px 16px -6px rgba(0,0,0,0.25);
  &:hover { background: #004080; transform: translateY(-1px); }
  &:focus-visible { outline: 2px solid #0ea5e9; outline-offset: 2px; }
`;

const LogoutButton = styled.button`
  background: #e11d48; color: #fff; border: none; padding: 0.5rem 0.9rem; border-radius: 6px; cursor: pointer; font-size: 0.9rem;
  box-shadow: 0 6px 16px -6px rgba(0,0,0,0.25);
  &:hover { background: #be123c; transform: translateY(-1px); }
  &:focus-visible { outline: 2px solid #0ea5e9; outline-offset: 2px; }
`;

const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #002d4b;
`;

const Section = styled.div`
  margin-bottom: 3rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #002d4b;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const InsightCard = styled.div`
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 6px;
  background: #f9f9f9;
`;

const InsightLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
  color: #002d4b;
`;

const InsightDescription = styled.div`
  font-size: 0.8rem; color: #666; margin-bottom: 0.5rem;
`;

const InsightValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #002d4b;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  background: #002d4b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  
  &:hover {
    background: #004080;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ContactsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const ContactItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const AdminDashboard = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const [insights, setInsights] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [editValues, setEditValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchInsights();
    fetchContacts();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await fetch('/api/insights');
      if (response.ok) {
        const data = await response.json();
        setInsights(data);
        // Initialize edit values
        const values = {};
        data.forEach(insight => {
          values[insight.id] = insight.value;
        });
        setEditValues(values);
      }
    } catch (error) {
      console.error('Error fetching insights:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const updateInsight = async (id, value) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, value }),
      });

      if (response.ok) {
        setMessage('Insight updated successfully!');
        fetchInsights(); // Refresh data
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to update insight');
      }
    } catch (error) {
      console.error('Error updating insight:', error);
      setMessage('Error updating insight');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (id, value) => {
    setEditValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (id) => {
    const value = editValues[id];
    if (value !== undefined && value !== '') {
      updateInsight(id, parseInt(value));
    }
  };

  const goBack = () => {
    router.push('/');
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
    }
  };

  return (
    <AdminContainer>
      <TopBar>
        <BackButton onClick={goBack}>← Back to Home</BackButton>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </TopBar>
      <Header>Encelyte Admin Dashboard</Header>
      
      {message && (
        <div style={{ 
          padding: '1rem', 
          marginBottom: '1rem',
          backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
          color: message.includes('successfully') ? '#155724' : '#721c24',
          border: `1px solid ${message.includes('successfully') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}

      <Section>
        <SectionTitle>Insights Management</SectionTitle>
        <Grid>
          {insights.map((insight) => (
            <InsightCard key={insight.id}>
              <InsightLabel>{t(insight.labelKey) || insight.labelKey}</InsightLabel>
              <InsightDescription>{t(insight.descriptionKey) || ''}</InsightDescription>
              <InsightValue>{insight.value}{insight.suffix}</InsightValue>
              <Input
                type="number"
                value={editValues[insight.id] || ''}
                onChange={(e) => handleInputChange(insight.id, e.target.value)}
                placeholder="New value"
              />
              <Button 
                onClick={() => handleSubmit(insight.id)}
                disabled={isLoading}
              >
                Update
              </Button>
            </InsightCard>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Recent Contacts ({contacts.length})</SectionTitle>
        <ContactsList>
          {contacts.length > 0 ? contacts.map((contact, index) => (
            <ContactItem key={contact._id || index}>
              <div><strong>Name:</strong> {contact.name}</div>
              <div><strong>Email:</strong> {contact.email}</div>
              <div><strong>Company:</strong> {contact.company}</div>
              <div><strong>Message:</strong> {contact.message}</div>
              <div><strong>Date:</strong> {new Date(contact.createdAt).toLocaleString()}</div>
            </ContactItem>
          )) : (
            <div>No contacts yet.</div>
          )}
        </ContactsList>
      </Section>
    </AdminContainer>
  );
};

export default AdminDashboard;

export async function getServerSideProps(context) {
  const cookie = context.req.cookies?.encelyte_session || '';
  const session = verifySession(cookie);
  if (!session) {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }
  return { props: {} };
}
