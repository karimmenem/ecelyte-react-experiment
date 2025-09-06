import crypto from 'crypto';

const base64url = (input) => Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
const base64urlDecode = (input) => Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');

function getSecret() {
  return process.env.AUTH_SECRET || 'dev_secret_change_me';
}

export function signSession(payload, maxAgeSec = 60 * 60 * 2) { // 2 hours
  const exp = Math.floor(Date.now() / 1000) + maxAgeSec;
  const data = { ...payload, exp };
  const json = JSON.stringify(data);
  const encoded = base64url(json);
  const h = crypto.createHmac('sha256', getSecret());
  h.update(encoded);
  const sig = base64url(h.digest());
  return `${encoded}.${sig}`;
}

export function verifySession(token) {
  try {
    if (!token || typeof token !== 'string' || !token.includes('.')) return null;
    const [encoded, sig] = token.split('.');
    const h = crypto.createHmac('sha256', getSecret());
    h.update(encoded);
    const expected = base64url(h.digest());
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    const json = base64urlDecode(encoded);
    const data = JSON.parse(json);
    if (!data.exp || data.exp < Math.floor(Date.now() / 1000)) return null;
    return data;
  } catch {
    return null;
  }
}

export function makeSessionCookie(token, maxAgeSec = 60 * 60 * 2) {
  const parts = [
    `encelyte_session=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAgeSec}`
  ];
  if (process.env.NODE_ENV === 'production') parts.push('Secure');
  return parts.join('; ');
}

export function clearSessionCookie() {
  const parts = [
    'encelyte_session=deleted',
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0'
  ];
  if (process.env.NODE_ENV === 'production') parts.push('Secure');
  return parts.join('; ');
}
