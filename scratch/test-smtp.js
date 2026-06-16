const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.\-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    env[key] = value.trim();
  }
});

async function test() {
  const smtpHost = env.SMTP_HOST;
  const smtpPort = env.SMTP_PORT || 587;
  const smtpUser = env.SMTP_USER;
  const smtpPass = env.SMTP_PASS;
  const smtpFrom = env.SMTP_FROM || 'no-reply@wisdomkwati.com';

  console.log('SMTP Config:', { smtpHost, smtpPort, smtpUser, smtpFrom });

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort),
    secure: parseInt(smtpPort) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  try {
    console.log('Verifying connection...');
    await transporter.verify();
    console.log('Verification successful!');

    console.log('Sending test mail...');
    const result = await transporter.sendMail({
      from: `"${smtpUser} (Test)" <${smtpFrom}>`,
      to: 'hello@wisdomkwatismartcity.com',
      subject: 'Test Email from Wisdom Kwati Smart City Platform',
      text: 'This is a test email to verify SMTP functionality.'
    });
    console.log('Email sent successfully!', result.messageId);
  } catch (err) {
    console.error('SMTP Error:', err);
  }
}

test();
