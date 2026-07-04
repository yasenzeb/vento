// api/admin-auth.js — تسجيل دخول الأدمن
import { setCorsHeaders, safeError } from './_auth.js';

export default async function handler(req, res) {
  setCorsHeaders(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { password } = req.body || {};
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.APIADMIN_PASSWORD;

    if (!ADMIN_PASSWORD) {
      return res.status(500).json({ success: false, error: 'ADMIN_PASSWORD not configured' });
    }

    if (!password || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, error: 'كلمة المرور غير صحيحة' });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('[API /admin-auth]', err);
    return res.status(500).json({ success: false, error: safeError(err) });
  }
}
