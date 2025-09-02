import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { createTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppRouter = () => {
  const [mode] = React.useState('light'); // simple static mode here (main app handles toggle inside)
  const theme = createTheme(mode);
  const [adminAuthed, setAdminAuthed] = React.useState(false);
  const hash = window.location.hash;
  React.useEffect(() => {
    const onHash = () => { /* trigger update */ setTick(Date.now()); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const [tick, setTick] = React.useState(0); // force re-render on hash change
  if (hash.startsWith('#/admin')) {
    if (!adminAuthed && hash !== '#/admin/login') {
      window.location.hash = '#/admin/login';
      return null;
    }
    return (
      <ThemeProvider theme={theme}>
        {hash === '#/admin/login' && !adminAuthed && <AdminLogin onLogin={() => { setAdminAuthed(true); window.location.hash = '#/admin/dashboard'; }} />}
        {hash === '#/admin/dashboard' && adminAuthed && <AdminDashboard onLogout={() => { setAdminAuthed(false); window.location.hash = '#/admin/login'; }} />}
      </ThemeProvider>
    );
  }
  return <App />;
};

root.render(<AppRouter />);