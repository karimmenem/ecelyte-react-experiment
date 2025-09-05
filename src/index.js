import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Careers from './pages/Careers';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { createTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import Layout from './components/layout/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppRouter = () => {
  const [mode] = React.useState('light');
  const theme = createTheme(mode);
  const [adminAuthed, setAdminAuthed] = React.useState(false);
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => { const onHash = () => setTick(Date.now()); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash); }, []);
  const hash = window.location.hash;

  // Scroll to top for page-level routes (not in-page section jumps like #services)
  React.useEffect(() => {
    if (['#/terms','#/privacy','#/home','#home','#/',''].includes(hash)) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [hash]);

  if (hash.startsWith('#/admin')) {
    if (!adminAuthed && hash !== '#/admin/login') { window.location.hash = '#/admin/login'; return null; }
    return (
      <ThemeProvider theme={theme}>
        {hash === '#/admin/login' && !adminAuthed && <AdminLogin onLogin={() => { setAdminAuthed(true); window.location.hash = '#/admin/dashboard'; }} />}
        {hash === '#/admin/dashboard' && adminAuthed && <AdminDashboard onLogout={() => { setAdminAuthed(false); window.location.hash = '#/admin/login'; }} />}
      </ThemeProvider>
    );
  }

  return (
    <Layout>
      {hash === '#/terms' && <Terms />}
      {hash === '#/privacy' && <Privacy />}
      {hash === '#/careers' && <Careers />}
      {(!hash || hash === '#home' || hash === '#/' || hash === '#/home') && <App />}
    </Layout>
  );
};

root.render(<AppRouter />);