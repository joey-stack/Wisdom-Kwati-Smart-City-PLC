import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      type, // 'general' | 'site-visit' | 'consultation'
      name,
      phone,
      email,
      message,
      
      // Site Visit specifics
      estate,
      preferredDate,
      budget,

      // Consultation specifics
      serviceInterest,
      consultationMethod,
      preferredTime,
      advisorName,
      advisorEmail
    } = body;

    // 1. Validation based on submission type
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and Email are required fields.' }, { status: 400 });
    }

    let leadData = {
      name,
      email,
      phone: phone || '',
      message: message || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    let emailTo = '';
    let emailSubject = '';
    let emailHtml = '';

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || 'no-reply@wisdomkwati.com';

    // Careers email is the default SMTP_TO configuration
    const defaultCareersEmail = process.env.SMTP_TO || 'careers@wisdomkwati.com';
    const customerExperienceEmail = 'hello@wisdomkwatismartcity.com';

    if (type === 'site-visit') {
      if (!estate || !preferredDate || !budget) {
        return NextResponse.json({ error: 'Estate, Preferred Date, and Budget Range are required for site visits.' }, { status: 400 });
      }
      
      leadData.estate = estate;
      leadData.preferredDate = preferredDate;
      leadData.budget = budget;

      emailTo = customerExperienceEmail;
      emailSubject = `New Site Visit Request: ${name} - ${estate}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #d4ebf2; border-radius: 8px; background-color: #f7fcfe;">
          <h2 style="color: #0c4a6e; border-bottom: 2px solid #0284c7; padding-bottom: 10px; margin-top: 0;">New Site Visit Booking</h2>
          <p>A client has requested a site visit. Here are the booking details:</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
          <p><strong>Client Name:</strong> ${name}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone Number:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Preferred Estate:</strong> <span style="color: #0284c7; font-weight: bold;">${estate}</span></p>
          <p><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Budget Range:</strong> ${budget}</p>
          
          ${message ? `
            <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border-radius: 4px; border: 1px solid #e2e8f0;">
              <h4 style="margin-top: 0; color: #0c4a6e;">Client Message / Notes:</h4>
              <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #334155; margin: 0;">${message}</p>
            </div>
          ` : ''}
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin-top: 30px;" />
          <p style="font-size: 11px; color: #64748b; text-align: center;">This booking was submitted directly on the Wisdom Kwati Smart City portal and recorded in the administration dashboard.</p>
        </div>
      `;

    } else if (type === 'consultation') {
      if (!serviceInterest || !consultationMethod || !preferredDate || !preferredTime) {
        return NextResponse.json({ error: 'Service Interest, Method, Date, and Time Slot are required for consultations.' }, { status: 400 });
      }

      leadData.type = 'consultation';
      leadData.serviceInterest = serviceInterest;
      leadData.consultationMethod = consultationMethod;
      leadData.preferredDate = preferredDate;
      leadData.preferredTime = preferredTime;
      leadData.advisorName = advisorName || 'Wisdom Kwati Smart City Advisor';
      leadData.advisorEmail = advisorEmail || customerExperienceEmail;

      // If advisor email is present, route there, otherwise fallback to Customer Experience
      emailTo = advisorEmail ? `${advisorEmail}, ${customerExperienceEmail}` : customerExperienceEmail;
      emailSubject = `New Consultation Booking: ${name} - ${serviceInterest}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #fbcfe8; border-radius: 8px; background-color: #fdf2f8;">
          <h2 style="color: #831843; border-bottom: 2px solid #db2777; padding-bottom: 10px; margin-top: 0;">New Consultation Booked</h2>
          <p>A client has scheduled a professional consultation session:</p>
          <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 15px 0;" />
          <p><strong>Client Name:</strong> ${name}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone Number:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Service Interest:</strong> <span style="color: #db2777; font-weight: bold;">${serviceInterest}</span></p>
          <p><strong>Preferred Method:</strong> ${consultationMethod}</p>
          <p><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Preferred Time Slot:</strong> ${preferredTime}</p>
          <p><strong>Assigned Advisor:</strong> ${advisorName || 'N/A'} (${advisorEmail || 'N/A'})</p>
          
          ${message ? `
            <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border-radius: 4px; border: 1px solid #f1f5f9;">
              <h4 style="margin-top: 0; color: #831843;">Client Notes:</h4>
              <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #334155; margin: 0;">${message}</p>
            </div>
          ` : ''}
          
          <hr style="border: none; border-top: 1px solid #fbcfe8; margin-top: 30px;" />
          <p style="font-size: 11px; color: #64748b; text-align: center;">This booking was submitted directly on the Wisdom Kwati Smart City portal and recorded in the administration dashboard.</p>
        </div>
      `;

    } else {
      // General / FAQ inquiry type
      if (!message) {
        return NextResponse.json({ error: 'Message / inquiry text is required.' }, { status: 400 });
      }

      emailTo = customerExperienceEmail;
      emailSubject = `New FAQ / Client Inquiry: ${name}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #64748b; padding-bottom: 10px; margin-top: 0;">New FAQ / Inquiry Received</h2>
          <p>A client has submitted a query via the website form:</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
          <p><strong>Sender Name:</strong> ${name}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone Number:</strong> ${phone ? `<a href="tel:${phone}">${phone}</a>` : 'Not provided'}</p>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border-radius: 4px; border: 1px solid #e2e8f0;">
            <h4 style="margin-top: 0; color: #334155;">Client Question / Message:</h4>
            <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #0f172a; margin: 0;">${message}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin-top: 30px;" />
          <p style="font-size: 11px; color: #64748b; text-align: center;">This inquiry was submitted directly on the Wisdom Kwati Smart City portal and recorded in the administration dashboard.</p>
        </div>
      `;
    }

    // 2. Save to Firestore collection 'leads'
    const leadsRef = collection(db, 'leads');
    const docRef = await addDoc(leadsRef, leadData);
    console.log(`[API Inquiry] Inquiry saved to Firestore with ID: ${docRef.id} (${type || 'general'})`);

    // 3. Send Email Notification via Nodemailer
    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort),
          secure: parseInt(smtpPort) === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass
          },
          connectionTimeout: 5000, // 5 seconds connection timeout
          greetingTimeout: 5000,   // 5 seconds greeting timeout
          socketTimeout: 8000      // 8 seconds socket timeout
        });

        const mailOptions = {
          from: `"${name} (via Platform)" <${smtpFrom}>`,
          replyTo: email,
          to: emailTo,
          subject: emailSubject,
          html: emailHtml
        };

        await transporter.sendMail(mailOptions);
        console.log(`[API Inquiry] Email notification successfully sent to ${emailTo}`);
      } catch (emailErr) {
        console.error('[API Inquiry] Failed to send email notification (non-fatal):', emailErr);
      }
    } else {
      console.warn('[API Inquiry] SMTP configuration is missing. Skipping email notification. Inquiry saved in database.');
    }

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err) {
    console.error('[API Inquiry] Error processing inquiry:', err);
    return NextResponse.json({ error: 'Internal server error processing inquiry.' }, { status: 500 });
  }
}
