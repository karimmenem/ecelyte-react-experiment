import { saveContact, getContacts } from '../../lib/db';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, company, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required' });
      }

      // Persist submission
      await saveContact({ name, email, company, message });

      // Prepare transporter (supports Gmail with SMTP_SERVICE=gmail or SMTP_USER ending with gmail.com)
      const hasCreds = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
      const smtpHost = process.env.SMTP_HOST;
      const smtpService = String(process.env.SMTP_SERVICE || '').toLowerCase();
      let transporter;
      let usingTestAccount = false;

      if (hasCreds) {
        if (smtpService === 'gmail' || (!smtpHost && /@gmail\.com$/i.test(process.env.SMTP_USER))) {
          // Gmail via App Password
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          });
        } else if (smtpHost) {
          const port = Number(process.env.SMTP_PORT || 587);
          const secure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || port === 465;
          transporter = nodemailer.createTransport({
            host: smtpHost,
            port,
            secure,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          });
        }
      }

      if (!transporter) {
        // Fallback to Ethereal test account (no real delivery, preview URL provided)
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: { user: testAccount.user, pass: testAccount.pass },
        });
        usingTestAccount = true;
      }

      // Route to Encelyte inbox by default
      const MAIL_TO = process.env.MAIL_TO || 'contact@encelyte.com';
      // Ensure FROM is a verified/authorized sender (especially for Gmail). If SMTP is configured and MAIL_FROM isn't set, use SMTP_USER.
      const MAIL_FROM = hasCreds
        ? (process.env.MAIL_FROM || process.env.SMTP_USER)
        : (process.env.MAIL_FROM || 'no-reply@encelyte.com');

      const subject = `New contact — ${name} <${email}>`;
      const plain = `New inquiry from Encelyte website\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || '-'}\n\nMessage:\n${message}`;
      const html = `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:14px;line-height:1.6;color:#0a2540">
          <h2 style="margin:0 0 10px">New inquiry from Encelyte website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || '-'}</p>
          <p style="white-space:pre-wrap"><strong>Message:</strong><br/>${message}</p>
        </div>
      `;

      const info = await transporter.sendMail({
        from: { name: `${name} via Encelyte`, address: MAIL_FROM },
        to: MAIL_TO,
        replyTo: `${name} <${email}>`,
        subject,
        text: plain,
        html,
      });

      const previewUrl = usingTestAccount ? nodemailer.getTestMessageUrl(info) : undefined;
      return res.status(200).json({ message: 'Message sent successfully', previewUrl, usingTestAccount });
    } catch (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({ message: 'Failed to send message' });
    }
  } else if (req.method === 'GET') {
    try {
      const contacts = await getContacts();
      return res.status(200).json(contacts);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      return res.status(500).json({ message: 'Failed to fetch contacts' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
