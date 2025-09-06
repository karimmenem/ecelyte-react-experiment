import { clearSessionCookie } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  try {
    res.setHeader('Set-Cookie', clearSessionCookie());
    return res.status(200).json({ message: 'Logged out' });
  } catch (e) {
    console.error('Logout error', e);
    return res.status(500).json({ message: 'Server error' });
  }
}
