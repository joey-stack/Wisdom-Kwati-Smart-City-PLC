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

    } else if (type === 'brochure') {
      leadData.type = 'brochure';

      emailTo = customerExperienceEmail;
      emailSubject = `New Brochure Request: ${name}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #d8dde6; border-radius: 8px; background-color: #fcfff2;">
          <h2 style="color: #0f4b94; border-bottom: 2px solid #0f4b94; padding-bottom: 10px; margin-top: 0;">New Brochure Download Request</h2>
          <p>A client has requested the smart city brochure:</p>
          <hr style="border: none; border-top: 1px solid #d8dde6; margin: 15px 0;" />
          <p><strong>Client Name:</strong> ${name}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
          
          <hr style="border: none; border-top: 1px solid #d8dde6; margin-top: 30px;" />
          <p style="font-size: 11px; color: #6b7585; text-align: center;">This request was submitted directly on the Wisdom Kwati Smart City portal and recorded in the administration dashboard.</p>
        </div>
      `;
    } else {
      // General / FAQ / Property inquiry type
      if (!message) {
        return NextResponse.json({ error: 'Message / inquiry text is required.' }, { status: 400 });
      }

      if (estate) {
        leadData.estate = estate;
        leadData.type = 'property-inquiry';

        emailTo = customerExperienceEmail;
        emailSubject = `New Property Inquiry: ${name} - ${estate}`;
        emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #0284c7; padding-bottom: 10px; margin-top: 0;">New Property Inquiry</h2>
            <p>A client has submitted an inquiry for the property <strong>${estate}</strong>:</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
            <p><strong>Client Name:</strong> ${name}</p>
            <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone Number:</strong> ${phone ? `<a href="tel:${phone}">${phone}</a>` : 'Not provided'}</p>
            <p><strong>Property of Interest:</strong> <span style="color: #0284c7; font-weight: bold;">${estate}</span></p>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border-radius: 4px; border: 1px solid #e2e8f0;">
              <h4 style="margin-top: 0; color: #334155;">Client Message:</h4>
              <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #0f172a; margin: 0;">${message}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin-top: 30px;" />
            <p style="font-size: 11px; color: #64748b; text-align: center;">This inquiry was submitted directly on the Wisdom Kwati Smart City portal and recorded in the administration dashboard.</p>
          </div>
        `;
      } else {
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

    // 4. Send client auto-responder confirmation email
    // Call it asynchronously so we don't block the HTTP response
    sendClientAutoResponder({
      name,
      email,
      type,
      estate: estate || '',
      preferredDate: preferredDate || '',
      budget: budget || '',
      serviceInterest: serviceInterest || '',
      consultationMethod: consultationMethod || '',
      preferredTime: preferredTime || '',
      advisorName: advisorName || ''
    }).catch(err => console.error('[API Inquiry] Error sending client auto-responder:', err));

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err) {
    console.error('[API Inquiry] Error processing inquiry:', err);
    return NextResponse.json({ error: 'Internal server error processing inquiry.' }, { status: 500 });
  }
}

async function sendClientAutoResponder({ name, email, type, estate, preferredDate, budget, serviceInterest, consultationMethod, preferredTime, advisorName }) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || 'no-reply@wisdomkwati.com';

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn('[Auto-Responder] SMTP configuration missing, skipping auto-responder email.');
    return;
  }

  let subject = '';
  let bodyHtml = '';

  if (type === 'brochure') {
    subject = 'Your Brochure Request - Wisdom Kwati Smart City';
    bodyHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #faffe8; border: 1px solid #d8dde6; border-radius: 8px; color: #1a1a1a;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0f4b94; font-size: 28px; margin: 0; font-family: 'Outfit', sans-serif;">Wisdom Kwati Smart City</h1>
          <p style="color: #4e5a69; font-size: 14px; margin: 5px 0 0; text-transform: uppercase; letter-spacing: 2px;">Dream Large. Live Smart.</p>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <h2 style="color: #0f4b94; font-size: 20px; margin-top: 0; margin-bottom: 20px;">Thank You, ${name}!</h2>
          <p style="font-size: 15px; line-height: 1.6; color: #4e5a69; margin-bottom: 20px;">
            Thank you for requesting the Wisdom Kwati Smart City brochure.
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #4e5a69; margin-bottom: 20px;">
            One of our premium luxury advisors has been notified and will send the official corporate brochure package directly to your email shortly.
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #4e5a69; margin-bottom: 30px;">
            In the meantime, feel free to explore our website to check active construction updates and available house types.
          </p>
          <div style="text-align: center;">
            <a href="https://wisdomkwatismartcityplc.com/house-types" style="background-color: #0f4b94; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 4px; font-weight: bold; font-size: 14px; display: inline-block;">Explore Villa Models</a>
          </div>
        </div>
        <div style="text-align: center; margin-top: 35px; color: #6b7585; font-size: 12px; line-height: 1.5;">
          <p style="margin: 0 0 10px;">If you have any questions, you can contact us at <a href="mailto:hello@wisdomkwatismartcity.com" style="color: #0f4b94; text-decoration: none;">hello@wisdomkwatismartcity.com</a></p>
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Wisdom Kwati Smart City PLC. All rights reserved.</p>
        </div>
      </div>
    `;
  } else if (type === 'site-visit') {
    subject = 'Your Site Visit Request Received - Wisdom Kwati Smart City';
    bodyHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #faffe8; border: 1px solid #d8dde6; border-radius: 8px; color: #1a1a1a;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0f4b94; font-size: 28px; margin: 0; font-family: 'Outfit', sans-serif;">Wisdom Kwati Smart City</h1>
          <p style="color: #4e5a69; font-size: 14px; margin: 5px 0 0; text-transform: uppercase; letter-spacing: 2px;">Dream Large. Live Smart.</p>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <h2 style="color: #0f4b94; font-size: 20px; margin-top: 0; margin-bottom: 20px;">Site Visit Request Secured</h2>
          <p style="font-size: 15px; line-height: 1.6; color: #4e5a69; margin-bottom: 20px;">
            Hello ${name},
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #4e5a69; margin-bottom: 20px;">
            We have successfully received your request to book a site visit to <strong>${estate}</strong> on <strong>${preferredDate ? new Date(preferredDate).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</strong>.
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #4e5a69; margin-bottom: 20px;">
            A luxury advisor will call or email you within the next 24 hours to finalize transportation and security arrangements for your private tour.
          </p>
          <div style="background-color: #fcfff2; border: 1px solid #d8dde6; border-radius: 4px; padding: 20px; margin-bottom: 30px;">
            <h4 style="margin: 0 0 10px; color: #0f4b94; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Request Snapshot</h4>
            <p style="margin: 0 0 8px; font-size: 13px;"><strong>Estate:</strong> ${estate}</p>
            <p style="margin: 0 0 8px; font-size: 13px;"><strong>Preferred Date:</strong> ${preferredDate ? new Date(preferredDate).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
            <p style="margin: 0; font-size: 13px;"><strong>Budget Range:</strong> ${budget}</p>
          </div>
          <div style="text-align: center;">
            <a href="https://wisdomkwatismartcityplc.com" style="background-color: #0f4b94; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 4px; font-weight: bold; font-size: 14px; display: inline-block;">Go To Portal</a>
          </div>
        </div>
        <div style="text-align: center; margin-top: 35px; color: #6b7585; font-size: 12px; line-height: 1.5;">
          <p style="margin: 0 0 10px;">If you have any questions, you can contact us at <a href="mailto:hello@wisdomkwatismartcity.com" style="color: #0f4b94; text-decoration: none;">hello@wisdomkwatismartcity.com</a></p>
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Wisdom Kwati Smart City PLC. All rights reserved.</p>
        </div>
      </div>
    `;
  } else if (type === 'consultation') {
    subject = 'Your Consultation Session Details - Wisdom Kwati Smart City';
    bodyHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #faffe8; border: 1px solid #d8dde6; border-radius: 8px; color: #1a1a1a;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0f4b94; font-size: 28px; margin: 0; font-family: 'Outfit', sans-serif;">Wisdom Kwati Smart City</h1>
          <p style="color: #4e5a69; font-size: 14px; margin: 5px 0 0; text-transform: uppercase; letter-spacing: 2px;">Dream Large. Live Smart.</p>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <h2 style="color: #0f4b94; font-size: 20px; margin-top: 0; margin-bottom: 20px;">Consultation Successfully Booked</h2>
          <p style="font-size: 15px; line-height: 1.6; color: #4e5a69; margin-bottom: 20px;">
            Hello ${name},
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #4e5a69; margin-bottom: 20px;">
            Your professional real estate consultation session has been successfully logged.
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #4e5a69; margin-bottom: 20px;">
            An advisor will reach out to confirm the calendar invitation and video link / meeting location details shortly.
          </p>
          <div style="background-color: #fcfff2; border: 1px solid #d8dde6; border-radius: 4px; padding: 20px; margin-bottom: 30px;">
            <h4 style="margin: 0 0 10px; color: #0f4b94; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Meeting Details</h4>
            <p style="margin: 0 0 8px; font-size: 13px;"><strong>Topic:</strong> ${serviceInterest}</p>
            <p style="margin: 0 0 8px; font-size: 13px;"><strong>Method:</strong> ${consultationMethod}</p>
            <p style="margin: 0 0 8px; font-size: 13px;"><strong>Date:</strong> ${preferredDate ? new Date(preferredDate).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
            <p style="margin: 0 0 8px; font-size: 13px;"><strong>Time:</strong> ${preferredTime}</p>
            <p style="margin: 0; font-size: 13px;"><strong>Assigned Advisor:</strong> ${advisorName || 'Wisdom Kwati Advisor'}</p>
          </div>
          <div style="text-align: center;">
            <a href="https://wisdomkwatismartcityplc.com" style="background-color: #0f4b94; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 4px; font-weight: bold; font-size: 14px; display: inline-block;">Access Portal</a>
          </div>
        </div>
        <div style="text-align: center; margin-top: 35px; color: #6b7585; font-size: 12px; line-height: 1.5;">
          <p style="margin: 0 0 10px;">If you have any questions, you can contact us at <a href="mailto:hello@wisdomkwatismartcity.com" style="color: #0f4b94; text-decoration: none;">hello@wisdomkwatismartcity.com</a></p>
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Wisdom Kwati Smart City PLC. All rights reserved.</p>
        </div>
      </div>
    `;
  } else {
    // General or property-inquiry auto-responder
    subject = 'Inquiry Received - Wisdom Kwati Smart City';
    bodyHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #faffe8; border: 1px solid #d8dde6; border-radius: 8px; color: #1a1a1a;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0f4b94; font-size: 28px; margin: 0; font-family: 'Outfit', sans-serif;">Wisdom Kwati Smart City</h1>
          <p style="color: #4e5a69; font-size: 14px; margin: 5px 0 0; text-transform: uppercase; letter-spacing: 2px;">Dream Large. Live Smart.</p>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <h2 style="color: #0f4b94; font-size: 20px; margin-top: 0; margin-bottom: 20px;">We've Received Your Inquiry</h2>
          <p style="font-size: 15px; line-height: 1.6; color: #4e5a69; margin-bottom: 20px;">
            Hello ${name},
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #4e5a69; margin-bottom: 20px;">
            Thank you for reaching out to us. We have received your message regarding ${estate ? `<strong>${estate}</strong>` : 'our properties / services'}.
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #4e5a69; margin-bottom: 30px;">
            One of our premium luxury advisors will review your inquiry and get back to you within the next 24 hours.
          </p>
          <div style="text-align: center;">
            <a href="https://wisdomkwatismartcityplc.com" style="background-color: #0f4b94; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 4px; font-weight: bold; font-size: 14px; display: inline-block;">Visit Our Website</a>
          </div>
        </div>
        <div style="text-align: center; margin-top: 35px; color: #6b7585; font-size: 12px; line-height: 1.5;">
          <p style="margin: 0 0 10px;">If you have any questions, you can contact us at <a href="mailto:hello@wisdomkwatismartcity.com" style="color: #0f4b94; text-decoration: none;">hello@wisdomkwatismartcity.com</a></p>
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Wisdom Kwati Smart City PLC. All rights reserved.</p>
        </div>
      </div>
    `;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: parseInt(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 8000
    });

    const clientMailOptions = {
      from: `"Wisdom Kwati Smart City" <${smtpFrom}>`,
      to: email,
      subject: subject,
      html: bodyHtml
    };

    await transporter.sendMail(clientMailOptions);
    console.log(`[Auto-Responder] Sent confirmation email to client: ${email}`);
  } catch (err) {
    console.error('[Auto-Responder] Failed to send confirmation email to client (non-fatal):', err);
  }
}
