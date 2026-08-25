/**
 * Brevo (Sendinblue) Transactional Email Service
 * Supports transactional emails via Brevo REST API v3
 */

interface SendEmailParams {
  to: { name?: string; email: string }[];
  subject: string;
  htmlContent: string;
  textContent?: string;
  replyTo?: { name?: string; email: string };
  tags?: string[];
}

export async function sendEmailWithBrevo({
  to,
  subject,
  htmlContent,
  textContent,
  replyTo,
  tags = ['wd-group'],
}: SendEmailParams): Promise<{ success: boolean; messageId?: string; error?: string; simulated?: boolean }> {
  const apiKey = process.env.BREVO_API_KEY || process.env.SENDINBLUE_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.SMTP_FROM || 'info@wdgroup.sa';
  const senderName = process.env.BREVO_SENDER_NAME || 'WD Group';

  if (!apiKey) {
    console.warn(`[Brevo Email Warning] BREVO_API_KEY is not set in environment. Email simulated to: ${to.map(t => t.email).join(', ')} | Subject: "${subject}"`);
    return {
      success: true,
      simulated: true,
      error: 'BREVO_API_KEY not configured. Email logged to server console.',
    };
  }

  try {
    const payload: any = {
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: to.map((recipient) => ({
        email: recipient.email.trim(),
        name: recipient.name?.trim() || recipient.email.split('@')[0],
      })),
      subject,
      htmlContent,
      tags,
    };

    if (textContent) {
      payload.textContent = textContent;
    }

    if (replyTo) {
      payload.replyTo = {
        email: replyTo.email.trim(),
        name: replyTo.name?.trim() || replyTo.email,
      };
    }

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.error('[Brevo Email Error]:', errData);
      return {
        success: false,
        error: errData.message || `Brevo returned status ${res.status}`,
      };
    }

    const data = await res.json();
    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (err: any) {
    console.error('[Brevo Email Network Error]:', err);
    return {
      success: false,
      error: err?.message || 'Network error sending email via Brevo',
    };
  }
}

/**
 * Common Branded Email Shell Template (WD Group Dark/Lux Aesthetics)
 */
function renderBrandedShell({
  title,
  preheader,
  bodyHtml,
  actionButton,
}: {
  title: string;
  preheader?: string;
  bodyHtml: string;
  actionButton?: { label: string; url: string };
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin:0; padding:0; background-color:#08090C; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#E4E4E7; }
    .container { max-width:600px; margin:0 auto; background-color:#0F1117; border:1px solid #27272A; border-radius:16px; overflow:hidden; }
    .header { padding:32px 24px; text-align:center; background:linear-gradient(180deg,#18181B 0%,#0F1117 100%); border-bottom:1px solid #27272A; }
    .content { padding:32px 24px; line-height:1.6; color:#D4D4D8; }
    .btn { display:inline-block; padding:12px 28px; background-color:#2563EB; color:#ffffff !important; text-decoration:none; font-weight:bold; border-radius:10px; margin-top:20px; font-size:14px; }
    .footer { padding:24px; text-align:center; font-size:12px; color:#71717A; border-top:1px solid #1F2937; background-color:#08090C; }
    .meta-box { background-color:#18181B; border:1px solid #27272A; border-radius:12px; padding:16px; margin:20px 0; }
  </style>
</head>
<body>
  <div style="background-color:#08090C; padding:30px 15px;">
    ${preheader ? `<div style="display:none;font-size:1px;color:#08090C;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</div>` : ''}
    <div class="container">
      <div class="header">
        <h1 style="margin:0; font-size:22px; font-weight:800; color:#FFFFFF; letter-spacing:-0.5px;">WD GROUP</h1>
        <p style="margin:4px 0 0 0; font-size:11px; font-family:monospace; color:#60A5FA; text-transform:uppercase; letter-spacing:2px;">Kingdom of Saudi Arabia</p>
      </div>
      <div class="content">
        <h2 style="margin-top:0; font-size:18px; color:#FFFFFF; font-weight:700;">${title}</h2>
        ${bodyHtml}
        ${actionButton ? `<div style="text-align:center; margin:28px 0;"><a href="${actionButton.url}" class="btn" target="_blank">${actionButton.label} &rarr;</a></div>` : ''}
      </div>
      <div class="footer">
        <p style="margin:0;">WD Group © ${new Date().getFullYear()} · Integrated Hospitality, Manufacturing & Contracting</p>
        <p style="margin:6px 0 0 0; color:#52525B;">Riyadh · Jeddah · Najran · Kingdom of Saudi Arabia</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * 1. Contact / Inquiry Confirmation Email (to Client)
 */
export async function sendContactConfirmationEmail({
  toName,
  toEmail,
  subject,
  sector,
  message,
}: {
  toName: string;
  toEmail: string;
  subject?: string | null;
  sector?: string | null;
  message?: string;
}) {
  const bodyHtml = `
    <p>Dear <strong>${toName}</strong>,</p>
    <p>Thank you for contacting <strong>WD Group</strong>. We have successfully received your inquiry and our executive team has been notified.</p>
    
    <div class="meta-box">
      <p style="margin:0 0 8px 0; font-size:12px; color:#9CA3AF; text-transform:uppercase; font-family:monospace; font-weight:bold;">Inquiry Summary</p>
      ${sector ? `<p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Target Sector:</strong> ${sector.toUpperCase()}</p>` : ''}
      ${subject ? `<p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Subject:</strong> ${subject}</p>` : ''}
      ${message ? `<p style="margin:4px 0; font-size:13px; color:#A1A1AA; font-style:italic;">"${message.substring(0, 150)}${message.length > 150 ? '…' : ''}"</p>` : ''}
    </div>

    <p>One of our dedicated sector specialists will review your requirements and reach out within <strong>24 business hours</strong>.</p>
    <p style="margin-top:24px; font-size:13px; color:#A1A1AA;">Best regards,<br><strong style="color:#FFFFFF;">WD Group Executive Relations</strong></p>
  `;

  return sendEmailWithBrevo({
    to: [{ name: toName, email: toEmail }],
    subject: `Thank you for contacting WD Group [${sector ? sector.toUpperCase() : 'Inquiry'}]`,
    htmlContent: renderBrandedShell({
      title: 'We Have Received Your Inquiry',
      preheader: 'Thank you for reaching out to WD Group. Our team will review your message shortly.',
      bodyHtml,
    }),
    tags: ['contact-confirmation', sector || 'general'],
  });
}

/**
 * 2. Contact / Inquiry Notification Email (to Admin / CRM Team)
 */
export async function sendContactAdminNotificationEmail({
  fullName,
  email,
  phone,
  company,
  sector,
  subject,
  message,
}: {
  fullName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  sector?: string | null;
  subject?: string | null;
  message: string;
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@swissblue.sa';
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.sa';

  const bodyHtml = `
    <p>A new customer inquiry has just been submitted on the WD Group platform:</p>
    
    <div class="meta-box">
      <p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Full Name:</strong> ${fullName}</p>
      <p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#60A5FA;">${email}</a></p>
      ${phone ? `<p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Phone / Mobile:</strong> <a href="tel:${phone}" style="color:#60A5FA;">${phone}</a></p>` : ''}
      ${company ? `<p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Company / Entity:</strong> ${company}</p>` : ''}
      <p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Target Sector:</strong> <span style="color:#FBBF24; font-weight:bold;">${(sector || 'General').toUpperCase()}</span></p>
      ${subject ? `<p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Subject:</strong> ${subject}</p>` : ''}
      <div style="margin-top:12px; padding-top:10px; border-top:1px solid #3F3F46;">
        <p style="margin:0 0 4px 0; font-size:11px; color:#9CA3AF; text-transform:uppercase; font-mono;">Message Body:</p>
        <p style="margin:0; font-size:13px; color:#F4F4F5; white-space:pre-wrap;">${message}</p>
      </div>
    </div>
  `;

  return sendEmailWithBrevo({
    to: [{ email: adminEmail, name: 'WD Group Admin' }],
    subject: `🚨 [New Lead] ${fullName} · ${(sector || 'General').toUpperCase()}`,
    replyTo: { name: fullName, email },
    htmlContent: renderBrandedShell({
      title: 'New Client Inquiry Received',
      preheader: `New submission from ${fullName} for ${sector || 'General'}`,
      bodyHtml,
      actionButton: {
        label: 'Open in Admin Console CRM',
        url: `${siteUrl}/admin/crm/inquiries`,
      },
    }),
    tags: ['admin-lead-notification'],
  });
}

/**
 * 3. Careers / Job Application Confirmation Email (to Candidate)
 */
export async function sendJobApplicationConfirmationEmail({
  candidateName,
  candidateEmail,
  jobTitle,
}: {
  candidateName: string;
  candidateEmail: string;
  jobTitle?: string | null;
}) {
  const position = jobTitle || 'Talent Pool';

  const bodyHtml = `
    <p>Dear <strong>${candidateName}</strong>,</p>
    <p>Thank you for submitting your application to <strong>WD Group</strong> for the position of <strong>${position}</strong>.</p>
    
    <div class="meta-box">
      <p style="margin:0 0 8px 0; font-size:12px; color:#9CA3AF; text-transform:uppercase; font-family:monospace; font-weight:bold;">Application Details</p>
      <p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Target Position:</strong> ${position}</p>
      <p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Status:</strong> <span style="color:#34D399; font-weight:bold;">Under HR Review</span></p>
    </div>

    <p>Our Human Capital & Talent Acquisition team will carefully review your qualifications and experience. Should your profile match our requirements, we will contact you directly to schedule an interview.</p>
    <p style="margin-top:24px; font-size:13px; color:#A1A1AA;">We wish you every success in your career journey.<br><strong style="color:#FFFFFF;">WD Group Human Capital</strong></p>
  `;

  return sendEmailWithBrevo({
    to: [{ name: candidateName, email: candidateEmail }],
    subject: `Application Received: ${position} at WD Group`,
    htmlContent: renderBrandedShell({
      title: 'Application Received Successfully',
      preheader: `Your application for ${position} has been received by WD Group HR.`,
      bodyHtml,
    }),
    tags: ['career-confirmation'],
  });
}

/**
 * 4. Careers / Job Application Notification Email (to HR Team)
 */
export async function sendJobApplicationAdminNotificationEmail({
  candidateName,
  email,
  phone,
  city,
  sector,
  jobTitle,
  linkedinUrl,
  resumeUrl,
  coverNote,
}: {
  candidateName: string;
  email: string;
  phone: string;
  city?: string | null;
  sector?: string | null;
  jobTitle?: string | null;
  linkedinUrl?: string | null;
  resumeUrl?: string | null;
  coverNote?: string | null;
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@swissblue.sa';
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.sa';

  const bodyHtml = `
    <p>A new job candidate has submitted their CV to the WD Group Talent Acquisition portal:</p>
    
    <div class="meta-box">
      <p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Candidate Name:</strong> ${candidateName}</p>
      <p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Applied For:</strong> <span style="color:#60A5FA; font-weight:bold;">${jobTitle || 'General Talent Pool'}</span></p>
      <p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#60A5FA;">${email}</a></p>
      <p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Mobile:</strong> <a href="tel:${phone}" style="color:#60A5FA;">${phone}</a></p>
      ${city ? `<p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Location / City:</strong> ${city}</p>` : ''}
      ${sector ? `<p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>Preferred Sector:</strong> ${sector.toUpperCase()}</p>` : ''}
      ${linkedinUrl ? `<p style="margin:4px 0; font-size:13px; color:#E4E4E7;"><strong>LinkedIn Profile:</strong> <a href="${linkedinUrl}" target="_blank" style="color:#60A5FA;">${linkedinUrl}</a></p>` : ''}
      ${resumeUrl ? `<p style="margin:8px 0; font-size:13px;"><a href="${resumeUrl}" target="_blank" style="color:#34D399; font-weight:bold; text-decoration:underline;">📄 Download Candidate Resume / CV</a></p>` : ''}
      ${coverNote ? `<div style="margin-top:10px; padding-top:8px; border-top:1px solid #3F3F46;"><p style="margin:0 0 4px 0; font-size:11px; color:#9CA3AF;">Cover Note:</p><p style="margin:0; font-size:12px; color:#D4D4D8; font-style:italic;">"${coverNote}"</p></div>` : ''}
    </div>
  `;

  return sendEmailWithBrevo({
    to: [{ email: adminEmail, name: 'WD Group HR' }],
    subject: `📄 [New Application] ${candidateName} · ${jobTitle || 'Talent Pool'}`,
    replyTo: { name: candidateName, email },
    htmlContent: renderBrandedShell({
      title: 'New Candidate in Talent Pool',
      preheader: `New application received from ${candidateName} for ${jobTitle || 'Talent Pool'}`,
      bodyHtml,
      actionButton: {
        label: 'Open Candidate in ATS',
        url: `${siteUrl}/admin/hr/applications`,
      },
    }),
    tags: ['admin-ats-notification'],
  });
}

/**
 * 5. Admin Password Reset Email
 */
export async function sendPasswordResetEmail({
  adminName,
  adminEmail,
  resetUrl,
}: {
  adminName: string;
  adminEmail: string;
  resetUrl: string;
}) {
  const bodyHtml = `
    <p>Hello <strong>${adminName}</strong>,</p>
    <p>A password reset request was initiated for your <strong>WD Group Admin Console</strong> account (<code>${adminEmail}</code>).</p>
    <p>Click the button below to establish a new secure password. This reset link is valid for <strong>60 minutes</strong>.</p>
    
    <div style="text-align:center; margin:28px 0;">
      <a href="${resetUrl}" class="btn" style="background-color:#2563EB;">Reset Admin Password &rarr;</a>
    </div>

    <p style="font-size:12px; color:#71717A; margin-top:24px;">If you did not request this password reset, please ignore this email or notify security immediately. Your current password remains unchanged.</p>
  `;

  return sendEmailWithBrevo({
    to: [{ name: adminName, email: adminEmail }],
    subject: `🔐 Reset Your WD Group Admin Console Password`,
    htmlContent: renderBrandedShell({
      title: 'Admin Password Reset Request',
      preheader: 'Instructions to reset your WD Group Admin Console password.',
      bodyHtml,
    }),
    tags: ['admin-password-reset'],
  });
}
