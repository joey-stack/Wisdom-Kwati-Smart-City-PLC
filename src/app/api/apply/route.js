import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      candidateName,
      candidateEmail,
      candidatePhone,
      linkedinUrl,
      portfolioUrl,
      coverLetter,
      resumeBase64,
      resumeName,
      resumeType,
      jobTitle,
      jobId,
      appliedAt,
      status
    } = body;

    // 1. Validation
    if (!candidateName || !candidateEmail || !candidatePhone || !resumeBase64 || !resumeName || !jobTitle) {
      return NextResponse.json({ error: 'Missing required candidate information.' }, { status: 400 });
    }

    // 2. Save to Cloud Firestore
    let docRef = { id: 'mock-test-id' };
    if (process.env.PLAYWRIGHT_TEST === 'true') {
      console.log('[API Apply] Playwright test mode: skipping Firestore save.');
    } else {
      const applicationsRef = collection(db, 'applications');
      docRef = await addDoc(applicationsRef, {
        candidateName,
        candidateEmail,
        candidatePhone,
        linkedinUrl: linkedinUrl || '',
        portfolioUrl: portfolioUrl || '',
        coverLetter: coverLetter || '',
        resumeBase64,
        resumeName,
        resumeType: resumeType || 'application/pdf',
        jobTitle,
        jobId: jobId || 'general',
        appliedAt: appliedAt || new Date().toISOString(),
        status: status || 'pending'
      });
      console.log(`[API Apply] Application saved to Firestore with ID: ${docRef.id}`);
    }

    // 3. Send Email Notification via Nodemailer (if configured)
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || 'no-reply@wisdomkwati.com';
    const smtpTo = process.env.SMTP_TO || 'careers@wisdomkwati.com';

    if (process.env.PLAYWRIGHT_TEST === 'true') {
      console.log('[API Apply] Playwright test mode: skipping SMTP email notification.');
    } else if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort),
        secure: parseInt(smtpPort) === 465, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const mailOptions = {
        from: `"${candidateName} (via Platform)" <${smtpFrom}>`,
        replyTo: candidateEmail,
        to: smtpTo,
        subject: `New Job Application: ${jobTitle} - ${candidateName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e5c1; border-radius: 8px; background-color: #faffe8;">
            <h2 style="color: #000; border-bottom: 2px solid #bbe339; padding-bottom: 10px;">New Job Application Received</h2>
            <p><strong>Position:</strong> ${jobTitle}</p>
            <p><strong>Candidate Name:</strong> ${candidateName}</p>
            <p><strong>Email Address:</strong> <a href="mailto:${candidateEmail}">${candidateEmail}</a></p>
            <p><strong>Phone Number:</strong> <a href="tel:${candidatePhone}">${candidatePhone}</a></p>
            ${linkedinUrl ? `<p><strong>LinkedIn Profile:</strong> <a href="${linkedinUrl}" target="_blank">${linkedinUrl}</a></p>` : ''}
            ${portfolioUrl ? `<p><strong>Portfolio / Website:</strong> <a href="${portfolioUrl}" target="_blank">${portfolioUrl}</a></p>` : ''}
            
            <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border-radius: 4px; border: 1px solid #e0e5c1;">
              <h4 style="margin-top: 0; color: #333;">Cover Letter:</h4>
              <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #555;">${coverLetter || 'No cover letter provided.'}</p>
            </div>
            
            <p style="margin-top: 15px; font-size: 13px; color: #555;">
              <strong>Note:</strong> The candidate's resume/CV (${resumeName}) is attached directly to this email.
            </p>
            <hr style="border: none; border-top: 1px solid #e0e5c1; margin-top: 30px;" />
            <p style="font-size: 11px; color: #777;">This application was submitted directly on the Wisdom Kwati Smart City platform and recorded in the administrator dashboard.</p>
          </div>
        `,
        attachments: [
          {
            filename: resumeName,
            content: resumeBase64.split('base64,')[1] || resumeBase64,
            encoding: 'base64'
          }
        ]
      };

      await transporter.sendMail(mailOptions);
      console.log(`[API Apply] Email notification sent to ${smtpTo}`);
    } else {
      console.warn('[API Apply] SMTP configuration is missing. Skipping email notification. Application was saved to database.');
    }

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err) {
    console.error('[API Apply] Error processing application:', err);
    return NextResponse.json({ error: 'Internal server error processing application.' }, { status: 500 });
  }
}
