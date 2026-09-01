/**
 * Brevo (Sendinblue) Transactional Email Service
 * High-End Branded Transactional Email Templates (WD Group Luxury Dark Design System)
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
  const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.SMTP_FROM || 'noreply@wdgroup.online';
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
 * Common Branded Email Shell Template (WD Group Luxury Dark / Gold Aesthetic)
 * Optimized for 100% cross-client compatibility (Gmail, Apple Mail, Outlook, Mobile)
 */
function renderBrandedShell({
  title,
  preheader,
  badgeText,
  badgeType = 'gold',
  bodyHtml,
  actionButton,
  secondaryActionButton,
}: {
  title: string;
  preheader?: string;
  badgeText?: string;
  badgeType?: 'gold' | 'blue' | 'emerald' | 'amber';
  bodyHtml: string;
  actionButton?: { label: string; url: string; variant?: 'gold' | 'blue' | 'emerald' };
  secondaryActionButton?: { label: string; url: string };
}) {
  const currentYear = new Date().getFullYear();
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online';

  const badgeStyles = {
    gold: 'background-color: rgba(201, 168, 106, 0.12); color: #E3C58A; border: 1px solid rgba(201, 168, 106, 0.3);',
    blue: 'background-color: rgba(37, 99, 235, 0.12); color: #60A5FA; border: 1px solid rgba(37, 99, 235, 0.3);',
    emerald: 'background-color: rgba(16, 185, 129, 0.12); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.3);',
    amber: 'background-color: rgba(245, 158, 11, 0.12); color: #FBBF24; border: 1px solid rgba(245, 158, 11, 0.3);',
  };

  const buttonGradients = {
    gold: 'background: linear-gradient(135deg, #E3C58A 0%, #C9A86A 50%, #B8934E 100%); color: #08090C !important; box-shadow: 0 4px 14px rgba(201, 168, 106, 0.35);',
    blue: 'background: linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%); color: #FFFFFF !important; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);',
    emerald: 'background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #FFFFFF !important; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);',
  };

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="format-detection" content="telephone=no" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>${title}</title>
  <style type="text/css">
    body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: #08090C !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #E4E4E7;
    }
    table {
      border-collapse: collapse !important;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    a {
      color: #60A5FA;
      text-decoration: none;
    }
    .btn-link:hover {
      opacity: 0.92;
    }
    @media only screen and (max-width: 620px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 0px !important;
        border-left: none !important;
        border-right: none !important;
      }
      .content-padding {
        padding: 24px 20px !important;
      }
      .header-padding {
        padding: 28px 20px 22px 20px !important;
      }
      .meta-grid-td {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #08090C; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  
  <!-- Preheader preview text hack -->
  ${preheader ? `
  <div style="display: none; font-size: 1px; color: #08090C; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    ${preheader}
    &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>` : ''}

  <!-- Main Outer Wrapper -->
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #08090C; width: 100%; min-height: 100%;">
    <tr>
      <td align="center" style="padding: 30px 12px;">
        
        <!-- Main Card Container -->
        <table role="presentation" class="email-container" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #0F1117; border: 1px solid #232733; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);">
          
          <!-- Top Multi-Tone Luxury Accent Line -->
          <tr>
            <td height="4" style="height: 4px; background: linear-gradient(90deg, #E3C58A 0%, #C9A86A 35%, #2563EB 70%, #E3C58A 100%); font-size: 0px; line-height: 0px;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td align="center" class="header-padding" style="padding: 36px 32px 28px 32px; background: linear-gradient(180deg, #141722 0%, #0F1117 100%); border-bottom: 1px solid #1F2430; text-align: center;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td align="center">
                    <!-- Brand Monogram Crest -->
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 14px;">
                      <tr>
                        <td align="center" style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #1E2330 0%, #12151D 100%); border: 1px solid rgba(201, 168, 106, 0.4); text-align: center; vertical-align: middle;">
                          <span style="font-size: 20px; font-weight: 900; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; letter-spacing: -0.5px; color: #E3C58A;">WD</span>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Brand Title -->
                    <h1 style="margin: 0; font-size: 24px; font-weight: 900; color: #FFFFFF; letter-spacing: 1.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      WD GROUP
                    </h1>
                    <p style="margin: 5px 0 0 0; font-size: 11px; font-weight: 700; color: #C9A86A; letter-spacing: 2px; text-transform: uppercase; font-family: 'SFMono-Regular', Consolas, Monaco, monospace;">
                      Hospitality · Manufacturing · Contracting
                    </p>
                    <p style="margin: 4px 0 0 0; font-size: 10px; color: #71717A; letter-spacing: 1.5px; text-transform: uppercase; font-family: 'SFMono-Regular', Consolas, Monaco, monospace;">
                      Kingdom of Saudi Arabia
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td class="content-padding" style="padding: 36px 32px; background-color: #0F1117; color: #D4D4D8; line-height: 1.65; font-size: 14px;">
              
              <!-- Badge Header (Optional) -->
              ${badgeText ? `
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 18px;">
                <tr>
                  <td style="padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 800; text-transform: uppercase; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; letter-spacing: 1px; ${badgeStyles[badgeType]}">
                    ${badgeText}
                  </td>
                </tr>
              </table>` : ''}

              <!-- Email Subject / Heading Title -->
              <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.3px; line-height: 1.35;">
                ${title}
              </h2>

              <!-- Injected Body Content -->
              ${bodyHtml}

              <!-- Call to Action Buttons -->
              ${actionButton ? `
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 32px 0 12px 0;">
                <tr>
                  <td align="center">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="border-radius: 12px; ${buttonGradients[actionButton.variant || 'gold']}">
                          <a href="${actionButton.url}" target="_blank" class="btn-link" style="display: inline-block; padding: 14px 34px; font-size: 13px; font-weight: 800; text-decoration: none; letter-spacing: 0.5px; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                            ${actionButton.label} &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ${secondaryActionButton ? `
                <tr>
                  <td align="center" style="padding-top: 14px;">
                    <a href="${secondaryActionButton.url}" target="_blank" style="font-size: 12px; color: #9CA3AF; text-decoration: underline; font-weight: 600;">
                      ${secondaryActionButton.label}
                    </a>
                  </td>
                </tr>` : ''}
              </table>` : ''}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 28px 32px; background-color: #08090C; border-top: 1px solid #1A1E27; text-align: center; color: #71717A; font-size: 11px; line-height: 1.7;">
              
              <!-- Sector Navigation Links -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto 16px auto;">
                <tr>
                  <td align="center" style="font-size: 11px; color: #A1A1AA;">
                    <a href="${siteUrl}/sectors/hospitality" target="_blank" style="color: #A1A1AA; text-decoration: none; margin: 0 8px;">SwissBlue Hospitality</a>
                    <span style="color: #3F3F46;">·</span>
                    <a href="${siteUrl}/sectors/manufacturing" target="_blank" style="color: #A1A1AA; text-decoration: none; margin: 0 8px;">GreenWood Manufacturing</a>
                    <span style="color: #3F3F46;">·</span>
                    <a href="${siteUrl}/sectors/contracting" target="_blank" style="color: #A1A1AA; text-decoration: none; margin: 0 8px;">WD Contracting</a>
                  </td>
                </tr>
              </table>

              <!-- Copyright & Headquarters -->
              <p style="margin: 0 0 6px 0; color: #A1A1AA; font-weight: 600;">
                WD Group for Business © ${currentYear} · All Rights Reserved
              </p>
              <p style="margin: 0 0 12px 0; color: #52525B; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; font-size: 10px;">
                Riyadh · Jeddah · Najran · Kingdom of Saudi Arabia
              </p>

              <!-- Security / Confidentiality Notice -->
              <div style="padding-top: 12px; border-top: 1px solid #151821; font-size: 10px; color: #52525B; line-height: 1.5;">
                This message and any attachments are confidential and intended solely for the designated recipient. If you received this email in error, please notify the sender and delete it immediately.
              </div>

            </td>
          </tr>

        </table>
        <!-- End Container -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

/**
 * 1. Contact / Inquiry Confirmation Email (Dispatched to Client)
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
  const referenceId = `WD-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online';

  const sectorLabels: Record<string, string> = {
    hospitality: 'SwissBlue Hospitality & Residences',
    manufacturing: 'GreenWood Modern Manufacturing (Wood & Metal)',
    contracting: 'WD General Contracting & Infrastructure',
    general: 'WD Group Executive Commercial Relations',
  };

  const displaySector = sectorLabels[sector?.toLowerCase() || 'general'] || (sector || 'General Inquiry').toUpperCase();

  const bodyHtml = `
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      Dear <strong>${toName}</strong>,
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      Thank you for contacting <strong>WD Group</strong>. We have officially received your commercial inquiry, and our executive sector team has been notified.
    </p>
    
    <!-- Meta Summary Card -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-left: 4px solid #C9A86A; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 18px 20px;">
          
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-bottom: 10px;">
                <span style="font-size: 10px; font-weight: 800; color: #C9A86A; text-transform: uppercase; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; letter-spacing: 1.5px;">
                  INQUIRY REFERENCE: ${referenceId}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Target Sector:</strong> <span style="color: #E3C58A; font-weight: 600;">${displaySector}</span>
              </td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Subject:</strong> ${subject}
              </td>
            </tr>` : ''}
            ${message ? `
            <tr>
              <td style="padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.06);">
                <span style="font-size: 11px; color: #71717A; text-transform: uppercase; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; font-weight: 700;">Recorded Message Summary:</span>
                <p style="margin: 6px 0 0 0; font-size: 13px; color: #E4E4E7; font-style: italic; line-height: 1.5; background: rgba(0,0,0,0.25); padding: 10px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                  "${message.substring(0, 220)}${message.length > 220 ? '…' : ''}"
                </p>
              </td>
            </tr>` : ''}
          </table>

        </td>
      </tr>
    </table>

    <div style="background: rgba(37, 99, 235, 0.08); border: 1px solid rgba(37, 99, 235, 0.2); border-radius: 12px; padding: 14px 18px; margin: 20px 0;">
      <p style="margin: 0; font-size: 13px; color: #93C5FD; line-height: 1.5;">
        <strong style="color: #FFFFFF;">⚡ Service Commitment:</strong> A dedicated sector specialist has been assigned to your request and will follow up with you within <strong>24 business hours</strong>.
      </p>
    </div>

    <p style="margin-top: 24px; font-size: 13px; color: #A1A1AA; line-height: 1.6;">
      Warm regards,<br>
      <strong style="color: #FFFFFF; font-size: 14px;">WD Group Executive Relations</strong><br>
      <span style="color: #71717A; font-size: 12px;">Kingdom of Saudi Arabia</span>
    </p>
  `;

  return sendEmailWithBrevo({
    to: [{ name: toName, email: toEmail }],
    subject: `Thank you for contacting WD Group [Ref: ${referenceId}]`,
    htmlContent: renderBrandedShell({
      title: 'We Have Received Your Commercial Inquiry',
      preheader: `Thank you for reaching out to WD Group (${displaySector}). Our team will connect with you within 24 business hours.`,
      badgeText: 'Official Commercial Inquiry',
      badgeType: 'gold',
      bodyHtml,
      actionButton: {
        label: 'Explore Corporate Ecosystem',
        url: `${siteUrl}/sectors/hospitality`,
        variant: 'gold',
      },
    }),
    tags: ['contact-confirmation', sector || 'general'],
  });
}

/**
 * 2. Contact / Inquiry Notification Email (Dispatched to Admin / CRM Team)
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
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'ceo@wdgroup.online';
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online';
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Riyadh', dateStyle: 'medium', timeStyle: 'short' });

  const bodyHtml = `
    <p style="margin-top: 0; font-size: 14px; color: #F4F4F5;">
      A high-priority customer inquiry has just been submitted via the <strong>WD Group Portal</strong>:
    </p>
    
    <!-- Client Lead Card -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0; background-color: #141722; border: 1px solid #232733; border-left: 4px solid #3B82F6; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 20px;">
          
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                <span style="font-size: 10px; font-weight: 800; color: #60A5FA; text-transform: uppercase; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; letter-spacing: 1.5px;">
                  INCOMING LEAD · ${timestamp} (AST)
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Client Name:</strong> <span style="color: #FFFFFF; font-weight: bold; font-size: 14px;">${fullName}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Email Address:</strong> <a href="mailto:${email}" style="color: #60A5FA; text-decoration: underline; font-weight: 600;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Phone / WhatsApp:</strong> <a href="tel:${phone}" style="color: #34D399; font-weight: 600;">${phone}</a>
              </td>
            </tr>` : ''}
            ${company ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Company / Entity:</strong> <span style="color: #E4E4E7;">${company}</span>
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Target Sector:</strong> <span style="display: inline-block; padding: 2px 8px; border-radius: 6px; background-color: rgba(201, 168, 106, 0.15); color: #E3C58A; font-weight: bold; font-size: 11px; text-transform: uppercase;">${(sector || 'General').toUpperCase()}</span>
              </td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Subject:</strong> ${subject}
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding-top: 14px; margin-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.06);">
                <span style="font-size: 11px; color: #71717A; text-transform: uppercase; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; font-weight: 700;">Full Client Message:</span>
                <div style="margin-top: 8px; font-size: 13px; color: #F4F4F5; line-height: 1.6; background-color: #0B0D14; padding: 14px; border-radius: 8px; border: 1px solid #1E2330; white-space: pre-wrap;">
${message}
                </div>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

    <p style="font-size: 12px; color: #71717A; margin-top: 20px;">
      💡 <em>Tip: You can reply directly to this email to respond straight to <strong>${fullName}</strong> (${email}).</em>
    </p>
  `;

  return sendEmailWithBrevo({
    to: [{ email: adminEmail, name: 'WD Group CRM Console' }],
    subject: `🚨 [New Lead] ${fullName} · ${(sector || 'General').toUpperCase()}`,
    replyTo: { name: fullName, email },
    htmlContent: renderBrandedShell({
      title: 'New Commercial Inquiry Received',
      preheader: `New submission from ${fullName} for ${sector || 'General'}: "${message.substring(0, 80)}"`,
      badgeText: 'CRM Lead Dispatch',
      badgeType: 'blue',
      bodyHtml,
      actionButton: {
        label: 'Open in Admin Console CRM',
        url: `${siteUrl}/admin/crm/inquiries`,
        variant: 'blue',
      },
    }),
    tags: ['admin-lead-notification'],
  });
}

/**
 * 3. Careers / Job Application Confirmation Email (Dispatched to Candidate)
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
  const position = jobTitle || 'General Talent Pool';
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online';
  const referenceId = `WD-APP-${Math.floor(100000 + Math.random() * 900000)}`;

  const bodyHtml = `
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      Dear <strong>${candidateName}</strong>,
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      Thank you for your interest in joining <strong>WD Group</strong>. We have officially received your application for the position of <strong style="color: #60A5FA;">${position}</strong>.
    </p>
    
    <!-- Application Status Box -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-left: 4px solid #10B981; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 18px 20px;">
          
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-bottom: 8px;">
                <span style="font-size: 10px; font-weight: 800; color: #34D399; text-transform: uppercase; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; letter-spacing: 1.5px;">
                  APPLICATION ID: ${referenceId}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Target Role:</strong> <span style="color: #FFFFFF; font-weight: 600;">${position}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Current Status:</strong> <span style="display: inline-block; padding: 2px 8px; border-radius: 6px; background-color: rgba(16, 185, 129, 0.15); color: #34D399; font-weight: bold; font-size: 11px;">Under Human Capital Review</span>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

    <p style="color: #D4D4D8; line-height: 1.65;">
      Our Talent Acquisition team is carefully reviewing your credentials and professional background. If your profile matches our requirements, a member of our Human Capital division will contact you to coordinate an introductory interview.
    </p>

    <p style="margin-top: 24px; font-size: 13px; color: #A1A1AA; line-height: 1.6;">
      We wish you every success in your career journey,<br>
      <strong style="color: #FFFFFF; font-size: 14px;">WD Group Human Capital & Talent Acquisition</strong><br>
      <span style="color: #71717A; font-size: 12px;">Kingdom of Saudi Arabia</span>
    </p>
  `;

  return sendEmailWithBrevo({
    to: [{ name: candidateName, email: candidateEmail }],
    subject: `Application Received: ${position} [Ref: ${referenceId}]`,
    htmlContent: renderBrandedShell({
      title: 'Your Application Has Been Received',
      preheader: `Thank you for applying for ${position} at WD Group. Our Human Capital team is reviewing your profile.`,
      badgeText: 'Human Capital & Careers',
      badgeType: 'emerald',
      bodyHtml,
      actionButton: {
        label: 'Discover WD Group Vision',
        url: `${siteUrl}/about`,
        variant: 'gold',
      },
    }),
    tags: ['career-confirmation'],
  });
}

/**
 * 4. Careers / Job Application Notification Email (Dispatched to HR Team)
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
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'ceo@wdgroup.online';
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online';
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Riyadh', dateStyle: 'medium', timeStyle: 'short' });

  const bodyHtml = `
    <p style="margin-top: 0; font-size: 14px; color: #F4F4F5;">
      A new candidate has submitted their CV to the <strong>WD Group Talent Acquisition Portal</strong>:
    </p>
    
    <!-- Candidate Dossier Card -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0; background-color: #141722; border: 1px solid #232733; border-left: 4px solid #10B981; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 20px;">
          
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                <span style="font-size: 10px; font-weight: 800; color: #34D399; text-transform: uppercase; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; letter-spacing: 1.5px;">
                  APPLICANT DOSSIER · ${timestamp} (AST)
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Candidate Name:</strong> <span style="color: #FFFFFF; font-weight: bold; font-size: 14px;">${candidateName}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Applied Position:</strong> <span style="color: #60A5FA; font-weight: bold;">${jobTitle || 'General Talent Pool'}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Email Address:</strong> <a href="mailto:${email}" style="color: #60A5FA; text-decoration: underline;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Mobile Phone:</strong> <a href="tel:${phone}" style="color: #34D399; font-weight: 600;">${phone}</a>
              </td>
            </tr>
            ${city ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Location / City:</strong> ${city}
              </td>
            </tr>` : ''}
            ${sector ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Preferred Sector:</strong> <span style="color: #E3C58A; font-weight: 600;">${sector.toUpperCase()}</span>
              </td>
            </tr>` : ''}
            ${linkedinUrl ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">LinkedIn:</strong> <a href="${linkedinUrl}" target="_blank" style="color: #60A5FA; text-decoration: underline;">${linkedinUrl}</a>
              </td>
            </tr>` : ''}
            ${resumeUrl ? `
            <tr>
              <td style="padding-top: 14px; margin-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.06);">
                <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="border-radius: 8px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); padding: 8px 16px;">
                      <a href="${resumeUrl}" target="_blank" style="color: #34D399; font-weight: 800; font-size: 12px; text-decoration: none;">
                        📄 Download Candidate Resume / CV &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>` : ''}
            ${coverNote ? `
            <tr>
              <td style="padding-top: 12px;">
                <span style="font-size: 11px; color: #71717A; text-transform: uppercase; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; font-weight: 700;">Cover Note:</span>
                <p style="margin: 6px 0 0 0; font-size: 13px; color: #D4D4D8; font-style: italic; line-height: 1.5; background: rgba(0,0,0,0.3); padding: 10px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                  "${coverNote}"
                </p>
              </td>
            </tr>` : ''}
          </table>

        </td>
      </tr>
    </table>
  `;

  return sendEmailWithBrevo({
    to: [{ email: adminEmail, name: 'WD Group Human Capital' }],
    subject: `📄 [New Application] ${candidateName} · ${jobTitle || 'Talent Pool'}`,
    replyTo: { name: candidateName, email },
    htmlContent: renderBrandedShell({
      title: 'New Candidate Profile in Talent Pool',
      preheader: `New job application from ${candidateName} for ${jobTitle || 'Talent Pool'}`,
      badgeText: 'Talent Acquisition Alert',
      badgeType: 'emerald',
      bodyHtml,
      actionButton: {
        label: 'Open Candidate in ATS Console',
        url: `${siteUrl}/admin/hr/applications`,
        variant: 'emerald',
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
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      Hello <strong>${adminName}</strong>,
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      A password reset request was initiated for your <strong>WD Group Executive Admin Console</strong> account (<code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #E3C58A; font-family: monospace;">${adminEmail}</code>).
    </p>
    
    <!-- Security Card -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-left: 4px solid #C9A86A; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 18px 20px;">
          <p style="margin: 0 0 6px 0; font-size: 13px; color: #E4E4E7; font-weight: 600;">
            🔐 Secure Reset Link Details:
          </p>
          <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #A1A1AA; line-height: 1.6;">
            <li>This link is single-use and will automatically expire in <strong>60 minutes</strong>.</li>
            <li>If you did not make this request, your account remains secure and no action is required.</li>
          </ul>
        </td>
      </tr>
    </table>
  `;

  return sendEmailWithBrevo({
    to: [{ name: adminName, email: adminEmail }],
    subject: `🔐 Reset Your WD Group Admin Console Password`,
    htmlContent: renderBrandedShell({
      title: 'Admin Password Reset Request',
      preheader: 'Instructions and secure link to reset your WD Group Admin Console password.',
      badgeText: 'Security & Access Control',
      badgeType: 'amber',
      bodyHtml,
      actionButton: {
        label: 'Reset Admin Password',
        url: resetUrl,
        variant: 'gold',
      },
    }),
    tags: ['admin-password-reset'],
  });
}

/**
 * 6. Admin Passwordless Magic Sign-In Email
 */
export async function sendMagicSignInEmail({
  adminName,
  adminEmail,
  magicUrl,
}: {
  adminName: string;
  adminEmail: string;
  magicUrl: string;
}) {
  const bodyHtml = `
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      Hello <strong>${adminName}</strong>,
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      You requested a 1-click passwordless sign-in for your <strong>WD Group Executive Console</strong> (<code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #60A5FA; font-family: monospace;">${adminEmail}</code>).
    </p>
    
    <!-- Magic Link Expiry Notice -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-left: 4px solid #2563EB; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 18px 20px;">
          <p style="margin: 0; font-size: 13px; color: #93C5FD; line-height: 1.5;">
            ⚡ <strong>Instant Authentication:</strong> Click the button below to sign in immediately. This link is single-use and valid for <strong>15 minutes</strong>.
          </p>
        </td>
      </tr>
    </table>

    <p style="font-size: 12px; color: #71717A; margin-top: 20px;">
      If you did not request this login link, you can safely ignore this message. Your console credentials remain strictly protected.
    </p>
  `;

  return sendEmailWithBrevo({
    to: [{ name: adminName, email: adminEmail }],
    subject: `✨ 1-Click Sign In: WD Group Admin Console`,
    htmlContent: renderBrandedShell({
      title: '1-Click Executive Console Access',
      preheader: 'Your secure 1-click login link for WD Group Admin Console.',
      badgeText: 'Instant Authentication',
      badgeType: 'blue',
      bodyHtml,
      actionButton: {
        label: 'Sign In to Admin Console',
        url: magicUrl,
        variant: 'blue',
      },
    }),
    tags: ['admin-magic-link'],
  });
}

/**
 * 7. Store / Furniture Order Confirmation Email (Dispatched to Buyer)
 */
export async function sendOrderConfirmationEmail({
  customerName,
  customerEmail,
  orderNumber,
  items,
  totalAmount,
  currency = 'ر.س',
  shippingAddress,
}: {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  items: { title: string; quantity: number; price: number }[];
  totalAmount: number;
  currency?: string;
  shippingAddress?: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online';
  const timestamp = new Date().toLocaleDateString('ar-SA', { dateStyle: 'full' });

  const itemsRows = items.map((item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; color: #FFFFFF;">
        <strong>${item.title}</strong>
        <span style="display: block; font-size: 11px; color: #A1A1AA;">الكمية: ${item.quantity}</span>
      </td>
      <td align="right" style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; font-weight: bold; color: #E3C58A; font-family: monospace;">
        ${(item.price * item.quantity).toLocaleString()} ${currency}
      </td>
    </tr>
  `).join('');

  const bodyHtml = `
    <div dir="rtl" style="direction: rtl; text-align: right;">
      <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
        مرحباً <strong>${customerName}</strong>،
      </p>
      <p style="color: #D4D4D8; line-height: 1.65;">
        شكراً لتسوقك من <strong>مجموعة دبليو دي — قطاع تصنيع الأثاث والمفروشات</strong>. تم تأكيد استلام طلبك بنجاح وجارٍ إعداده للتسليم المباشر.
      </p>

      <!-- Order Receipt Card -->
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-right: 4px solid #C9A86A; border-radius: 12px; overflow: hidden;">
        <tr>
          <td style="padding: 20px;">
            
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <span style="font-size: 11px; font-weight: 800; color: #C9A86A; text-transform: uppercase; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; letter-spacing: 1px;">
                    رقم الطلب: ${orderNumber} · ${timestamp}
                  </span>
                </td>
              </tr>
              
              <!-- Items Table -->
              ${itemsRows}

              <!-- Total Row -->
              <tr>
                <td style="padding-top: 14px; font-size: 14px; font-weight: bold; color: #FFFFFF;">
                  الإجمالي النهائي (شامل ضريبة القيمة المضافة):
                </td>
                <td align="right" style="padding-top: 14px; font-size: 16px; font-weight: 900; color: #E3C58A; font-family: monospace;">
                  ${totalAmount.toLocaleString()} ${currency}
                </td>
              </tr>
              ${shippingAddress ? `
              <tr>
                <td colspan="2" style="padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #A1A1AA;">
                  <strong style="color: #FFFFFF;">عنوان الشحن والتسليم:</strong> ${shippingAddress}
                </td>
              </tr>` : ''}
            </table>

          </td>
        </tr>
      </table>

      <p style="margin-top: 24px; font-size: 13px; color: #A1A1AA; line-height: 1.6;">
        مع خالص التحية والتقدير،<br>
        <strong style="color: #FFFFFF; font-size: 14px;">فريق خدمات وتصنيع الأثاث — مجموعة دبليو دي</strong><br>
        <span style="color: #71717A; font-size: 12px;">المملكة العربية السعودية</span>
      </p>
    </div>
  `;

  return sendEmailWithBrevo({
    to: [{ name: customerName, email: customerEmail }],
    subject: `تأكيد استلام طلب الأثاث [${orderNumber}] · مجموعة دبليو دي`,
    htmlContent: renderBrandedShell({
      title: 'تم تأكيد استلام طلبك بنجاح',
      preheader: `تم تأكيد طلبك رقم ${orderNumber} بمبلغ ${totalAmount} ${currency}.`,
      badgeText: 'تأكيد الطلب والفاتورة',
      badgeType: 'gold',
      bodyHtml,
      actionButton: {
        label: 'متابعة الطلب والمحادثة',
        url: `${siteUrl}/furniture`,
        variant: 'gold',
      },
    }),
    tags: ['ecommerce-order-confirmation'],
  });
}
