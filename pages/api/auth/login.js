import { findAdminUser } from '../../../lib/db';
import { signSession, makeSessionCookie } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  try {
    const { username, password } = req.body || {};
    // Demo: single hardcoded admin (since db.admin_users is empty by default)
    const valid = (username === 'admin@encelyte.com' && password === 'admin');
    // Optionally support db users
    const user = valid ? { username } : await findAdminUser(username);

    if (!valid && !user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signSession({ sub: user?.username || username, role: 'admin' });
    res.setHeader('Set-Cookie', makeSessionCookie(token));
    return res.status(200).json({ message: 'Logged in' });
  } catch (e) {
    console.error('Login error', e);
    return res.status(500).json({ message: 'Server error' });
  }
}
