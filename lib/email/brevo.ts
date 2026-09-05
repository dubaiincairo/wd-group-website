/**
 * Brevo (Sendinblue) Transactional Email Service
 * High-End Branded Transactional Email Templates (WD Group Luxury Dark Design System)
 * Full Bilingual Support: 100% Arabic RTL & 100% English LTR
 */

import { getIntegrationsConfig } from '@/lib/admin/secrets';

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
  const integrations = await getIntegrationsConfig().catch(() => null);
  const apiKey = integrations?.brevo_api_key || process.env.BREVO_API_KEY || process.env.SENDINBLUE_API_KEY;
  const senderEmail = integrations?.brevo_sender_email || process.env.BREVO_SENDER_EMAIL || process.env.SMTP_FROM || 'noreply@wdgroup.online';
  const senderName = integrations?.brevo_sender_name || process.env.BREVO_SENDER_NAME || 'WD Group';

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
 * Supports 100% Arabic (RTL) and 100% English (LTR)
 * Optimized for cross-client compatibility (Gmail, Apple Mail, Outlook, Mobile)
 */
export function renderBrandedShell({
  title,
  preheader,
  badgeText,
  badgeType = 'gold',
  bodyHtml,
  actionButton,
  secondaryActionButton,
  isAr = false,
}: {
  title: string;
  preheader?: string;
  badgeText?: string;
  badgeType?: 'gold' | 'blue' | 'emerald' | 'amber';
  bodyHtml: string;
  actionButton?: { label: string; url: string; variant?: 'gold' | 'blue' | 'emerald' };
  secondaryActionButton?: { label: string; url: string };
  isAr?: boolean;
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

  const fontFamily = isAr 
    ? "'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Tahoma, Arial, sans-serif"
    : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const brandHeading = isAr ? 'مجموعة دبليو دي للأعمال' : 'WD GROUP';
  const brandSubheading = isAr ? 'قطاع الضيافة · التصنيع · المقاولات العامة' : 'Hospitality · Manufacturing · Contracting';
  const brandCountry = isAr ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia';

  const footerSectors = isAr ? `
    <a href="${siteUrl}/sectors/hospitality" target="_blank" style="color: #A1A1AA; text-decoration: none; margin: 0 8px;">ضيافة سويس بلو</a>
    <span style="color: #3F3F46;">·</span>
    <a href="${siteUrl}/sectors/manufacturing" target="_blank" style="color: #A1A1AA; text-decoration: none; margin: 0 8px;">تصنيع جرين وود</a>
    <span style="color: #3F3F46;">·</span>
    <a href="${siteUrl}/sectors/contracting" target="_blank" style="color: #A1A1AA; text-decoration: none; margin: 0 8px;">مقاولات دبليو دي</a>
  ` : `
    <a href="${siteUrl}/sectors/hospitality" target="_blank" style="color: #A1A1AA; text-decoration: none; margin: 0 8px;">SwissBlue Hospitality</a>
    <span style="color: #3F3F46;">·</span>
    <a href="${siteUrl}/sectors/manufacturing" target="_blank" style="color: #A1A1AA; text-decoration: none; margin: 0 8px;">GreenWood Manufacturing</a>
    <span style="color: #3F3F46;">·</span>
    <a href="${siteUrl}/sectors/contracting" target="_blank" style="color: #A1A1AA; text-decoration: none; margin: 0 8px;">WD Contracting</a>
  `;

  const footerCopyright = isAr 
    ? `مجموعة دبليو دي للأعمال © ${currentYear} · جميع الحقوق محفوظة`
    : `WD Group for Business © ${currentYear} · All Rights Reserved`;

  const footerLocations = isAr
    ? 'الرياض · جدة · نجران · المملكة العربية السعودية'
    : 'Riyadh · Jeddah · Najran · Kingdom of Saudi Arabia';

  const confidentialityNotice = isAr
    ? 'هذه الرسالة ومرفقاتها سرية وموجهة حصرياً للمستلم المعني. إذا وصلتك هذه الرسالة عن طريق الخطأ، يُرجى إشعار المرسل وحذفها فوراً.'
    : 'This message and any attachments are confidential and intended solely for the designated recipient. If you received this email in error, please notify the sender and delete it immediately.';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="${isAr ? 'ar' : 'en'}" dir="${isAr ? 'rtl' : 'ltr'}">
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
      font-family: ${fontFamily};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #E4E4E7;
      direction: ${isAr ? 'rtl' : 'ltr'};
      text-align: ${isAr ? 'right' : 'left'};
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
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #08090C; font-family: ${fontFamily}; direction: ${isAr ? 'rtl' : 'ltr'}; text-align: ${isAr ? 'right' : 'left'};">
  
  ${preheader ? `
  <div style="display: none; font-size: 1px; color: #08090C; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    ${preheader}
    &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>` : ''}

  <!-- Main Outer Wrapper -->
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #08090C; width: 100%; min-height: 100%; direction: ${isAr ? 'rtl' : 'ltr'};">
    <tr>
      <td align="center" style="padding: 30px 12px;">
        
        <!-- Main Card Container -->
        <table role="presentation" class="email-container" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #0F1117; border: 1px solid #232733; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7); direction: ${isAr ? 'rtl' : 'ltr'};">
          
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
                    <h1 style="margin: 0; font-size: 22px; font-weight: 900; color: #FFFFFF; letter-spacing: ${isAr ? '0px' : '1.5px'}; font-family: ${fontFamily};">
                      ${brandHeading}
                    </h1>
                    <p style="margin: 5px 0 0 0; font-size: 11px; font-weight: 700; color: #C9A86A; letter-spacing: 1px; text-transform: uppercase; font-family: ${fontFamily};">
                      ${brandSubheading}
                    </p>
                    <p style="margin: 4px 0 0 0; font-size: 10px; color: #71717A; letter-spacing: 1px; text-transform: uppercase; font-family: ${fontFamily};">
                      ${brandCountry}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td class="content-padding" style="padding: 36px 32px; background-color: #0F1117; color: #D4D4D8; line-height: 1.65; font-size: 14px; text-align: ${isAr ? 'right' : 'left'};">
              
              <!-- Badge Header (Optional) -->
              ${badgeText ? `
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 18px; margin-${isAr ? 'right' : 'left'}: 0;">
                <tr>
                  <td style="padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 800; font-family: ${fontFamily}; letter-spacing: 0.5px; ${badgeStyles[badgeType]}">
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
                          <a href="${actionButton.url}" target="_blank" class="btn-link" style="display: inline-block; padding: 14px 34px; font-size: 13px; font-weight: 800; text-decoration: none; letter-spacing: 0.5px; font-family: ${fontFamily};">
                            ${actionButton.label} ${isAr ? '&larr;' : '&rarr;'}
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
                    ${footerSectors}
                  </td>
                </tr>
              </table>

              <!-- Copyright & Headquarters -->
              <p style="margin: 0 0 6px 0; color: #A1A1AA; font-weight: 600;">
                ${footerCopyright}
              </p>
              <p style="margin: 0 0 12px 0; color: #52525B; font-size: 10px;">
                ${footerLocations}
              </p>

              <!-- Security / Confidentiality Notice -->
              <div style="padding-top: 12px; border-top: 1px solid #151821; font-size: 10px; color: #52525B; line-height: 1.5;">
                ${confidentialityNotice}
              </div>

            </td>
          </tr>

        </table>
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
  lang = 'ar',
}: {
  toName: string;
  toEmail: string;
  subject?: string | null;
  sector?: string | null;
  message?: string;
  lang?: 'ar' | 'en';
}) {
  const referenceId = `WD-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online';
  const isAr = lang === 'ar';

  const sectorLabelsAr: Record<string, string> = {
    hospitality: 'قطاع الضيافة والشقق الفندقية (SwissBlue)',
    manufacturing: 'قطاع التصنيع والأثاث الخشبي والمعدني (GreenWood)',
    contracting: 'قطاع المقاولات العامة والإنشاءات (WD Contracting)',
    general: 'العلاقات التجارية والاستثمارية العامة',
  };

  const sectorLabelsEn: Record<string, string> = {
    hospitality: 'SwissBlue Hospitality & Residences',
    manufacturing: 'GreenWood Modern Manufacturing (Wood & Metal)',
    contracting: 'WD General Contracting & Infrastructure',
    general: 'WD Group Executive Commercial Relations',
  };

  const displaySector = isAr
    ? sectorLabelsAr[sector?.toLowerCase() || 'general'] || (sector || 'استفسار عام')
    : sectorLabelsEn[sector?.toLowerCase() || 'general'] || (sector || 'General Inquiry').toUpperCase();

  const bodyHtml = isAr ? `
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      سعادة الأستاذ/ <strong>${toName}</strong> المحترم،
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      نشكركم على تواصلكم مع <strong>مجموعة دبليو دي للأعمال</strong>. نود إحاطتكم بأنه تم استلام استفساركم التجاري بنجاح، وجارٍ توجيهه للفريق التنفيذي المختص.
    </p>
    
    <!-- Meta Summary Card -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-right: 4px solid #C9A86A; border-radius: 12px; overflow: hidden; text-align: right;">
      <tr>
        <td style="padding: 18px 20px;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-bottom: 10px;">
                <span style="font-size: 11px; font-weight: 800; color: #C9A86A; font-family: monospace;">
                  الرقم المرجعي للاستفسار: ${referenceId}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">القطاع المستهدف:</strong> <span style="color: #E3C58A; font-weight: 600;">${displaySector}</span>
              </td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">موضوع الطلب:</strong> ${subject}
              </td>
            </tr>` : ''}
            ${message ? `
            <tr>
              <td style="padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.06);">
                <span style="font-size: 11px; color: #71717A; font-weight: 700;">ملخص نص الرسالة الموثق:</span>
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
        <strong style="color: #FFFFFF;">⚡ التزام مستوى الخدمة:</strong> تم إسناد طلبكم إلى مستشار القطاع المختص وسيتم التواصل معكم رسمياً خلال <strong>24 ساعة عمل</strong>.
      </p>
    </div>

    <p style="margin-top: 24px; font-size: 13px; color: #A1A1AA; line-height: 1.6;">
      وتفضلوا بقبول وافر الاحترام والتقدير،<br>
      <strong style="color: #FFFFFF; font-size: 14px;">العلاقات التجارية والاستثمارية — مجموعة دبليو دي</strong><br>
      <span style="color: #71717A; font-size: 12px;">المملكة العربية السعودية</span>
    </p>
  ` : `
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      Dear <strong>${toName}</strong>,
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      Thank you for contacting <strong>WD Group</strong>. We have officially received your commercial inquiry, and our executive sector team has been notified.
    </p>
    
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-left: 4px solid #C9A86A; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 18px 20px;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-bottom: 10px;">
                <span style="font-size: 10px; font-weight: 800; color: #C9A86A; text-transform: uppercase; font-family: monospace; letter-spacing: 1.5px;">
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
                <span style="font-size: 11px; color: #71717A; text-transform: uppercase; font-family: monospace; font-weight: 700;">Recorded Message Summary:</span>
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

  const emailSubject = isAr
    ? `شكراً لتواصلكم مع مجموعة دبليو دي للأعمال [مرجع: ${referenceId}]`
    : `Thank you for contacting WD Group [Ref: ${referenceId}]`;

  return sendEmailWithBrevo({
    to: [{ name: toName, email: toEmail }],
    subject: emailSubject,
    htmlContent: renderBrandedShell({
      title: isAr ? 'تم استلام استفساركم التجاري بنجاح' : 'We Have Received Your Commercial Inquiry',
      preheader: isAr 
        ? `شكراً لتواصلكم مع مجموعة دبليو دي (${displaySector}). سيقوم فريقنا بالتواصل معكم خلال 24 ساعة عمل.`
        : `Thank you for reaching out to WD Group (${displaySector}). Our team will connect with you within 24 business hours.`,
      badgeText: isAr ? 'استفسار تجاري رسمي' : 'Official Commercial Inquiry',
      badgeType: 'gold',
      bodyHtml,
      isAr,
      actionButton: {
        label: isAr ? 'استكشاف قطاعات المنظومة' : 'Explore Corporate Ecosystem',
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
  lang = 'ar',
}: {
  fullName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  sector?: string | null;
  subject?: string | null;
  message: string;
  lang?: 'ar' | 'en';
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'ceo@wdgroup.online';
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online';
  const isAr = lang === 'ar';
  const timestamp = new Date().toLocaleString(isAr ? 'ar-SA' : 'en-US', { timeZone: 'Asia/Riyadh', dateStyle: 'medium', timeStyle: 'short' });

  const bodyHtml = isAr ? `
    <p style="margin-top: 0; font-size: 14px; color: #F4F4F5;">
      تم استلام استفسار عميل تجاري عالي الأولوية عبر <strong>بوابة مجموعة دبليو دي</strong>:
    </p>
    
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0; background-color: #141722; border: 1px solid #232733; border-right: 4px solid #3B82F6; border-radius: 12px; overflow: hidden; text-align: right;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                <span style="font-size: 11px; font-weight: 800; color: #60A5FA; font-family: monospace;">
                  عميل تجاري وارد · ${timestamp}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">اسم العميل / المسؤول:</strong> <span style="color: #FFFFFF; font-weight: bold; font-size: 14px;">${fullName}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">البريد الإلكتروني:</strong> <a href="mailto:${email}" style="color: #60A5FA; text-decoration: underline; font-weight: 600;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">الجوال / واتساب:</strong> <a href="tel:${phone}" style="color: #34D399; font-weight: 600; direction: ltr; display: inline-block;">${phone}</a>
              </td>
            </tr>` : ''}
            ${company ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">الشركة / الجهة:</strong> <span style="color: #E4E4E7;">${company}</span>
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">القطاع المطلوب:</strong> <span style="display: inline-block; padding: 2px 8px; border-radius: 6px; background-color: rgba(201, 168, 106, 0.15); color: #E3C58A; font-weight: bold; font-size: 11px;">${(sector || 'عام').toUpperCase()}</span>
              </td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">موضوع الرسالة:</strong> ${subject}
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding-top: 14px; margin-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.06);">
                <span style="font-size: 11px; color: #71717A; font-weight: 700;">نص الرسالة الكامل:</span>
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
      💡 <em>ملاحظة: يمكنك الرد مباشرة على هذه الرسالة للتواصل الفوري مع <strong>${fullName}</strong> (${email}).</em>
    </p>
  ` : `
    <p style="margin-top: 0; font-size: 14px; color: #F4F4F5;">
      A high-priority commercial inquiry has just been submitted via the <strong>WD Group Portal</strong>:
    </p>
    
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0; background-color: #141722; border: 1px solid #232733; border-left: 4px solid #3B82F6; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                <span style="font-size: 10px; font-weight: 800; color: #60A5FA; text-transform: uppercase; font-family: monospace; letter-spacing: 1.5px;">
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
                <span style="font-size: 11px; color: #71717A; text-transform: uppercase; font-family: monospace; font-weight: 700;">Full Client Message:</span>
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
      title: isAr ? 'استفسار تجاري جديد وارد' : 'New Commercial Inquiry Received',
      preheader: `New submission from ${fullName} for ${sector || 'General'}: "${message.substring(0, 80)}"`,
      badgeText: isAr ? 'إشعار الـ CRM والمبيعات' : 'CRM Lead Dispatch',
      badgeType: 'blue',
      bodyHtml,
      isAr,
      actionButton: {
        label: isAr ? 'فتح الاستفسار في لوحة التحكم' : 'Open in Admin Console CRM',
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
  lang = 'ar',
}: {
  candidateName: string;
  candidateEmail: string;
  jobTitle?: string | null;
  lang?: 'ar' | 'en';
}) {
  const position = jobTitle || (lang === 'ar' ? 'بنك الكفاءات العام' : 'General Talent Pool');
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online';
  const referenceId = `WD-APP-${Math.floor(100000 + Math.random() * 900000)}`;
  const isAr = lang === 'ar';

  const bodyHtml = isAr ? `
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      الأستاذ/ <strong>${candidateName}</strong> المحترم،
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      نشكركم على رغبتكم في الانضمام إلى فريق <strong>مجموعة دبليو دي</strong>. نود إشعاركم باستلام طلب التقديم لشغل وظيفة <strong style="color: #60A5FA;">${position}</strong>.
    </p>
    
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-right: 4px solid #10B981; border-radius: 12px; overflow: hidden; text-align: right;">
      <tr>
        <td style="padding: 18px 20px;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-bottom: 8px;">
                <span style="font-size: 11px; font-weight: 800; color: #34D399; font-family: monospace;">
                  رقم ملف التقديم: ${referenceId}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">المسمى الوظيفي:</strong> <span style="color: #FFFFFF; font-weight: 600;">${position}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">حالة الطلب:</strong> <span style="display: inline-block; padding: 2px 8px; border-radius: 6px; background-color: rgba(16, 185, 129, 0.15); color: #34D399; font-weight: bold; font-size: 11px;">قيد المراجعة برأس المال البشري</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color: #D4D4D8; line-height: 1.65;">
      يقوم فريق استقطاب الكفاءات والمواهب بمراجعة مؤهلاتكم وخبراتكم المهنية بعناية، وفي حال توافق ملفكم مع المتطلبات، سيتم التواصل معكم لتنسيق المقابلة الشخصية.
    </p>

    <p style="margin-top: 24px; font-size: 13px; color: #A1A1AA; line-height: 1.6;">
      نتمنى لكم دوام التوفيق والنجاح في مسيرتكم المهنية،<br>
      <strong style="color: #FFFFFF; font-size: 14px;">إدارة رأس المال البشري واستقطاب الكفاءات — مجموعة دبليو دي</strong><br>
      <span style="color: #71717A; font-size: 12px;">المملكة العربية السعودية</span>
    </p>
  ` : `
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      Dear <strong>${candidateName}</strong>,
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      Thank you for your interest in joining <strong>WD Group</strong>. We have officially received your application for the position of <strong style="color: #60A5FA;">${position}</strong>.
    </p>
    
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-left: 4px solid #10B981; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 18px 20px;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-bottom: 8px;">
                <span style="font-size: 10px; font-weight: 800; color: #34D399; text-transform: uppercase; font-family: monospace; letter-spacing: 1.5px;">
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
    subject: isAr ? `تم استلام طلب التوظيف: ${position} [رقم الملف: ${referenceId}]` : `Application Received: ${position} [Ref: ${referenceId}]`,
    htmlContent: renderBrandedShell({
      title: isAr ? 'تم استلام طلب توظيفكم بنجاح' : 'Your Application Has Been Received',
      preheader: isAr 
        ? `شكراً لتقديمكم على وظيفة ${position} في مجموعة دبليو دي. ملفكم قيد المراجعة حالياً.`
        : `Thank you for applying for ${position} at WD Group. Our Human Capital team is reviewing your profile.`,
      badgeText: isAr ? 'رأس المال البشري والتوظيف' : 'Human Capital & Careers',
      badgeType: 'emerald',
      bodyHtml,
      isAr,
      actionButton: {
        label: isAr ? 'استكشاف رؤية مجموعة دبليو دي' : 'Discover WD Group Vision',
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
  lang = 'ar',
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
  lang?: 'ar' | 'en';
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'ceo@wdgroup.online';
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online';
  const isAr = lang === 'ar';
  const timestamp = new Date().toLocaleString(isAr ? 'ar-SA' : 'en-US', { timeZone: 'Asia/Riyadh', dateStyle: 'medium', timeStyle: 'short' });

  const bodyHtml = isAr ? `
    <p style="margin-top: 0; font-size: 14px; color: #F4F4F5;">
      تم استلام سيرة ذاتية وطلب توظيف جديد عبر <strong>بوابة استقطاب الكفاءات لمجموعة دبليو دي</strong>:
    </p>
    
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0; background-color: #141722; border: 1px solid #232733; border-right: 4px solid #10B981; border-radius: 12px; overflow: hidden; text-align: right;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                <span style="font-size: 11px; font-weight: 800; color: #34D399; font-family: monospace;">
                  ملف مرشح جديد · ${timestamp}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">اسم المرشح:</strong> <span style="color: #FFFFFF; font-weight: bold; font-size: 14px;">${candidateName}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">المسمى المتقدم عليه:</strong> <span style="color: #60A5FA; font-weight: bold;">${jobTitle || 'بنك الكفاءات العام'}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">البريد الإلكتروني:</strong> <a href="mailto:${email}" style="color: #60A5FA; text-decoration: underline;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">رقم الجوال:</strong> <a href="tel:${phone}" style="color: #34D399; font-weight: 600; direction: ltr; display: inline-block;">${phone}</a>
              </td>
            </tr>
            ${city ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">المدينة / الإقامة:</strong> ${city}
              </td>
            </tr>` : ''}
            ${resumeUrl ? `
            <tr>
              <td style="padding-top: 14px; margin-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.06);">
                <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="border-radius: 8px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); padding: 8px 16px;">
                      <a href="${resumeUrl}" target="_blank" style="color: #34D399; font-weight: 800; font-size: 12px; text-decoration: none;">
                        📄 تحميل ومطالعة السيرة الذاتية (CV) &larr;
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>` : ''}
          </table>
        </td>
      </tr>
    </table>
  ` : `
    <p style="margin-top: 0; font-size: 14px; color: #F4F4F5;">
      A new candidate has submitted their CV to the <strong>WD Group Talent Acquisition Portal</strong>:
    </p>
    
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0; background-color: #141722; border: 1px solid #232733; border-left: 4px solid #10B981; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                <span style="font-size: 10px; font-weight: 800; color: #34D399; text-transform: uppercase; font-family: monospace; letter-spacing: 1.5px;">
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
          </table>
        </td>
      </tr>
    </table>
  `;

  return sendEmailWithBrevo({
    to: [{ email: adminEmail, name: 'WD Group Human Capital' }],
    subject: isAr ? `📄 [مرشح جديد] ${candidateName} · ${jobTitle || 'بنك الكفاءات'}` : `📄 [New Application] ${candidateName} · ${jobTitle || 'Talent Pool'}`,
    replyTo: { name: candidateName, email },
    htmlContent: renderBrandedShell({
      title: isAr ? 'ملف مرشح جديد في نظام التوظيف' : 'New Candidate Profile in Talent Pool',
      preheader: `New job application from ${candidateName} for ${jobTitle || 'Talent Pool'}`,
      badgeText: isAr ? 'تنبيه استقطاب الكفاءات' : 'Talent Acquisition Alert',
      badgeType: 'emerald',
      bodyHtml,
      isAr,
      actionButton: {
        label: isAr ? 'عرض المرشح في لوحة التوظيف' : 'Open Candidate in ATS Console',
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
  lang = 'ar',
}: {
  adminName: string;
  adminEmail: string;
  resetUrl: string;
  lang?: 'ar' | 'en';
}) {
  const isAr = lang === 'ar';

  const bodyHtml = isAr ? `
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      مرحباً <strong>${adminName}</strong>،
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      تم استلام طلب إعادة تعيين كلمة المرور لحسابكم في <strong>لوحة الإدارة التنفيذية لمجموعة دبليو دي</strong> (<code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #E3C58A; font-family: monospace;">${adminEmail}</code>).
    </p>
    
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-right: 4px solid #C9A86A; border-radius: 12px; overflow: hidden; text-align: right;">
      <tr>
        <td style="padding: 18px 20px;">
          <p style="margin: 0 0 6px 0; font-size: 13px; color: #E4E4E7; font-weight: bold;">
            🔐 تفاصيل رابط الأمان:
          </p>
          <ul style="margin: 0; padding-right: 18px; font-size: 12px; color: #A1A1AA; line-height: 1.6;">
            <li>هذا الرابط صالح للاستخدام مرة واحدة فقط وينتهي تلقائياً خلال <strong>60 دقيقة</strong>.</li>
            <li>إذا لم تقم بطلب إعادة التعيين، فحسابك محمي تماماً ولا يلزم اتخاذ أي إجراء.</li>
          </ul>
        </td>
      </tr>
    </table>
  ` : `
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      Hello <strong>${adminName}</strong>,
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      A password reset request was initiated for your <strong>WD Group Executive Admin Console</strong> account (<code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #E3C58A; font-family: monospace;">${adminEmail}</code>).
    </p>
    
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
    subject: isAr ? `🔐 إعادة تعيين كلمة مرور لوحة تحكم مجموعة دبليو دي` : `🔐 Reset Your WD Group Admin Console Password`,
    htmlContent: renderBrandedShell({
      title: isAr ? 'طلب إعادة تعيين كلمة المرور' : 'Admin Password Reset Request',
      preheader: isAr ? 'رابط آمن لتعيين كلمة مرور جديدة للوحة الإدارة.' : 'Instructions and secure link to reset your WD Group Admin Console password.',
      badgeText: isAr ? 'الأمان والتحكم بالنظام' : 'Security & Access Control',
      badgeType: 'amber',
      bodyHtml,
      isAr,
      actionButton: {
        label: isAr ? 'تعيين كلمة مرور جديدة' : 'Reset Admin Password',
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
  lang = 'ar',
}: {
  adminName: string;
  adminEmail: string;
  magicUrl: string;
  lang?: 'ar' | 'en';
}) {
  const isAr = lang === 'ar';

  const bodyHtml = isAr ? `
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      مرحباً <strong>${adminName}</strong>،
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      طلبتم تسجيل دخول سريع وآمن بنقرة واحدة لحسابكم في <strong>لوحة الإدارة لمجموعة دبليو دي</strong> (<code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #60A5FA; font-family: monospace;">${adminEmail}</code>).
    </p>
    
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-right: 4px solid #2563EB; border-radius: 12px; overflow: hidden; text-align: right;">
      <tr>
        <td style="padding: 18px 20px;">
          <p style="margin: 0; font-size: 13px; color: #93C5FD; line-height: 1.5;">
            ⚡ <strong>المصادقة الفورية:</strong> انقر على الزر أدناه لتسجيل الدخول مباشرة. هذا الرابط صالح للاستخدام مرة واحدة ولمدة <strong>15 دقيقة</strong> فقط.
          </p>
        </td>
      </tr>
    </table>

    <p style="font-size: 12px; color: #71717A; margin-top: 20px;">
      إذا لم تقم بطلب هذا الرابط، يمكنك تجاهل هذه الرسالة بأمان.
    </p>
  ` : `
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      Hello <strong>${adminName}</strong>,
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      You requested a 1-click passwordless sign-in for your <strong>WD Group Executive Console</strong> (<code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #60A5FA; font-family: monospace;">${adminEmail}</code>).
    </p>
    
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
    subject: isAr ? `✨ الدخول السريع بنقرة واحدة: لوحة تحكم مجموعة دبليو دي` : `✨ 1-Click Sign In: WD Group Admin Console`,
    htmlContent: renderBrandedShell({
      title: isAr ? 'تسجيل الدخول الفوري للوحة الإدارة' : '1-Click Executive Console Access',
      preheader: isAr ? 'رابط الدخول السريع الفوري للوحة إدارة مجموعة دبليو دي.' : 'Your secure 1-click login link for WD Group Admin Console.',
      badgeText: isAr ? 'المصادقة الفورية السريعة' : 'Instant Authentication',
      badgeType: 'blue',
      bodyHtml,
      isAr,
      actionButton: {
        label: isAr ? 'الدخول الآن للوحة التحكم' : 'Sign In to Admin Console',
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
  lang = 'ar',
}: {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  items: { title: string; quantity: number; price: number }[];
  totalAmount: number;
  currency?: string;
  shippingAddress?: string;
  lang?: 'ar' | 'en';
}) {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online';
  const isAr = lang === 'ar';
  const timestamp = new Date().toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { dateStyle: 'full' });

  const itemsRows = items.map((item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; color: #FFFFFF;">
        <strong>${item.title}</strong>
        <span style="display: block; font-size: 11px; color: #A1A1AA;">${isAr ? 'الكمية' : 'Quantity'}: ${item.quantity}</span>
      </td>
      <td align="${isAr ? 'left' : 'right'}" style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; font-weight: bold; color: #E3C58A; font-family: monospace; direction: ltr;">
        ${(item.price * item.quantity).toLocaleString()} ${currency}
      </td>
    </tr>
  `).join('');

  const bodyHtml = isAr ? `
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      مرحباً <strong>${customerName}</strong>،
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      شكراً لتسوقكم من <strong>مجموعة دبليو دي — قطاع تصنيع الأثاث والمفروشات الفندقية</strong>. تم تأكيد استلام طلبكم بنجاح وجارٍ إعداده للتسليم المباشر.
    </p>

    <!-- Order Receipt Card -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-right: 4px solid #C9A86A; border-radius: 12px; overflow: hidden; text-align: right;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td colspan="2" style="padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08);">
                <span style="font-size: 11px; font-weight: 800; color: #C9A86A; font-family: monospace;">
                  رقم الطلب: ${orderNumber} · ${timestamp}
                </span>
              </td>
            </tr>
            
            ${itemsRows}

            <!-- Total Row -->
            <tr>
              <td style="padding-top: 14px; font-size: 14px; font-weight: bold; color: #FFFFFF;">
                الإجمالي النهائي (شامل 15% ضريبة القيمة المضافة):
              </td>
              <td align="left" style="padding-top: 14px; font-size: 16px; font-weight: 900; color: #E3C58A; font-family: monospace; direction: ltr;">
                ${totalAmount.toLocaleString()} ${currency}
              </td>
            </tr>
            ${shippingAddress ? `
            <tr>
              <td colspan="2" style="padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">عنوان التوصيل المعتمد:</strong> ${shippingAddress}
              </td>
            </tr>` : ''}
          </table>
        </td>
      </tr>
    </table>

    <p style="margin-top: 24px; font-size: 13px; color: #A1A1AA; line-height: 1.6;">
      مع خالص التحية والتقدير،<br>
      <strong style="color: #FFFFFF; font-size: 14px;">فريق تصنيع وخدمات الأثاث — مجموعة دبليو دي</strong><br>
      <span style="color: #71717A; font-size: 12px;">المملكة العربية السعودية</span>
    </p>
  ` : `
    <p style="margin-top: 0; font-size: 15px; color: #F4F4F5;">
      Dear <strong>${customerName}</strong>,
    </p>
    <p style="color: #D4D4D8; line-height: 1.65;">
      Thank you for your order with <strong>WD Group — Modern Furniture & Manufacturing Division</strong>. Your order has been officially confirmed and scheduled for production.
    </p>

    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-left: 4px solid #C9A86A; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td colspan="2" style="padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08);">
                <span style="font-size: 10px; font-weight: 800; color: #C9A86A; text-transform: uppercase; font-family: monospace;">
                  ORDER NUMBER: ${orderNumber} · ${timestamp}
                </span>
              </td>
            </tr>
            
            ${itemsRows}

            <tr>
              <td style="padding-top: 14px; font-size: 14px; font-weight: bold; color: #FFFFFF;">
                Total Amount (Incl. 15% VAT & Delivery):
              </td>
              <td align="right" style="padding-top: 14px; font-size: 16px; font-weight: 900; color: #E3C58A; font-family: monospace;">
                ${totalAmount.toLocaleString()} ${currency}
              </td>
            </tr>
            ${shippingAddress ? `
            <tr>
              <td colspan="2" style="padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #A1A1AA;">
                <strong style="color: #FFFFFF;">Delivery Address:</strong> ${shippingAddress}
              </td>
            </tr>` : ''}
          </table>
        </td>
      </tr>
    </table>

    <p style="margin-top: 24px; font-size: 13px; color: #A1A1AA; line-height: 1.6;">
      Warm regards,<br>
      <strong style="color: #FFFFFF; font-size: 14px;">WD Group Furniture Manufacturing Division</strong><br>
      <span style="color: #71717A; font-size: 12px;">Kingdom of Saudi Arabia</span>
    </p>
  `;

  return sendEmailWithBrevo({
    to: [{ name: customerName, email: customerEmail }],
    subject: isAr ? `تأكيد استلام طلب الأثاث [${orderNumber}] · مجموعة دبليو دي` : `Furniture Order Confirmation [${orderNumber}] · WD Group`,
    htmlContent: renderBrandedShell({
      title: isAr ? 'تم تأكيد استلام طلبك بنجاح' : 'Order Received & Confirmed',
      preheader: isAr ? `تم تأكيد طلبك رقم ${orderNumber} بمبلغ ${totalAmount} ${currency}.` : `Your order ${orderNumber} for ${totalAmount} ${currency} has been received.`,
      badgeText: isAr ? 'تأكيد الطلب والفاتورة' : 'Order & Invoice Receipt',
      badgeType: 'gold',
      bodyHtml,
      isAr,
      actionButton: {
        label: isAr ? 'متابعة الطلب في المتجر' : 'Track Order Status',
        url: `${siteUrl}/furniture`,
        variant: 'gold',
      },
    }),
    tags: ['ecommerce-order-confirmation'],
  });
}

export interface SyncSubsystemResult {
  name: string;
  nameAr?: string;
  service: string;
  status: 'success' | 'warning' | 'failed';
  latencyMs: number;
  recordsProcessed?: number;
  failureReason?: string | null;
  errorCode?: string | null;
  actionNeeded?: string | null;
  actionNeededAr?: string | null;
}

/**
 * 8. Daily Automated Sync & Failure Diagnostic Report Email
 * Dispatched automatically to System Administrators & Executives upon cron sync execution,
 * with exact failure reasons, root-cause diagnostics, latency benchmarks, and a high-end responsive table.
 */
export async function sendDailySyncReportEmail({
  targetEmail,
  tasks,
  totalLatencyMs = 0,
  syncEnvironment = 'production',
  lang = 'ar',
}: {
  targetEmail?: string;
  tasks: SyncSubsystemResult[];
  totalLatencyMs?: number;
  syncEnvironment?: string;
  lang?: 'ar' | 'en';
}) {
  const adminEmail = targetEmail || process.env.ADMIN_ALERT_EMAIL || 'ceo@wdgroup.online';
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online';
  const isAr = lang === 'ar';
  const timestamp = new Date().toLocaleString(isAr ? 'ar-SA' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Riyadh',
  });

  const successCount = tasks.filter(t => t.status === 'success').length;
  const warningCount = tasks.filter(t => t.status === 'warning').length;
  const failureCount = tasks.filter(t => t.status === 'failed').length;
  const hasFailures = failureCount > 0;
  const hasWarnings = warningCount > 0;

  const statusTitle = hasFailures 
    ? (isAr ? `🚨 تنبيه عاجل: تعثر المزامنة اليومية (${failureCount} خدمات متعثرة)` : `🚨 Critical Alert: Daily Automated Sync Failures (${failureCount} Failed)`)
    : hasWarnings
    ? (isAr ? `⚠️ تقرير المزامنة اليومية: اكتملت مع وجود (${warningCount}) تحذيرات` : `⚠️ Daily Sync Report: Completed with (${warningCount}) Warnings`)
    : (isAr ? `✅ تقرير المزامنة اليومية: كافة الأنظمة والبيانات متطابقة بنسبة 100%` : `✅ Daily Sync Report: All 100% Systems Operational`);

  // Build Table Rows
  const tableRowsHtml = tasks.map((task) => {
    const isFailed = task.status === 'failed';
    const isWarning = task.status === 'warning';
    const rowBg = isFailed ? 'rgba(239, 68, 68, 0.08)' : isWarning ? 'rgba(245, 158, 11, 0.05)' : 'rgba(255, 255, 255, 0.01)';
    const borderColor = isFailed ? 'rgba(239, 68, 68, 0.3)' : isWarning ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.06)';
    const statusPill = isFailed
      ? `<span style="display:inline-block; padding:3px 8px; border-radius:6px; font-size:10px; font-weight:800; background:rgba(239,68,68,0.2); color:#FCA5A5; border:1px solid rgba(239,68,68,0.4); font-family:monospace;">❌ ${isAr ? 'فشل' : 'FAILED'}</span>`
      : isWarning
      ? `<span style="display:inline-block; padding:3px 8px; border-radius:6px; font-size:10px; font-weight:800; background:rgba(245,158,11,0.2); color:#FCD34D; border:1px solid rgba(245,158,11,0.4); font-family:monospace;">⚠️ ${isAr ? 'تحذير' : 'WARNING'}</span>`
      : `<span style="display:inline-block; padding:3px 8px; border-radius:6px; font-size:10px; font-weight:800; background:rgba(16,185,129,0.15); color:#6EE7B7; border:1px solid rgba(16,185,129,0.3); font-family:monospace;">✅ ${isAr ? 'ناجح' : 'SUCCESS'}</span>`;

    const displayName = isAr && task.nameAr ? task.nameAr : task.name;
    const actionText = isAr && task.actionNeededAr ? task.actionNeededAr : task.actionNeeded;

    return `
      <tr style="background-color: ${rowBg}; border-bottom: 1px solid ${borderColor};">
        <td style="padding: 14px 12px; vertical-align: top; text-align: ${isAr ? 'right' : 'left'};">
          <strong style="color: #FFFFFF; font-size: 13px; display: block;">${displayName}</strong>
          <span style="font-size: 10px; color: #9CA3AF; font-family: monospace; text-transform: uppercase;">${task.service}</span>
        </td>
        <td align="center" style="padding: 14px 8px; vertical-align: top;">
          ${statusPill}
          <div style="font-size: 10px; color: #71717A; font-family: monospace; margin-top: 4px;">${task.latencyMs}ms</div>
        </td>
        <td style="padding: 14px 12px; vertical-align: top; text-align: ${isAr ? 'right' : 'left'}; font-size: 12px; line-height: 1.5;">
          ${task.failureReason ? `
            <div style="background: #0B0D14; border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 6px; padding: 8px 10px; margin-bottom: 6px;">
              <span style="color: #EF4444; font-weight: bold; font-family: monospace; font-size: 11px; display: block; margin-bottom: 2px;">
                ${task.errorCode ? `[${task.errorCode}] ` : ''}${isAr ? 'سبب الفشل الدقيق:' : 'Exact Failure Reason:'}
              </span>
              <code style="color: #FCA5A5; font-size: 11px; font-family: monospace; word-break: break-all;">
                ${task.failureReason}
              </code>
            </div>
          ` : `
            <span style="color: #A1A1AA; font-size: 11px;">
              ${task.recordsProcessed ? (isAr ? `تمت معالجة ومطابقة ${task.recordsProcessed} سجل بنجاح` : `Synchronized ${task.recordsProcessed} items with zero anomalies`) : (isAr ? 'الاتصال والتشغيل مستقر بنسبة 100%' : 'All health and data checks passed')}
            </span>
          `}
          ${actionText ? `
            <div style="margin-top: 4px; font-size: 11px; color: #C9A86A; background: rgba(201, 168, 106, 0.08); padding: 4px 8px; border-radius: 4px; border-left: 2px solid #C9A86A;">
              <strong>${isAr ? 'الإجراء الموصى به:' : 'Remediation:'}</strong> ${actionText}
            </div>
          ` : ''}
        </td>
      </tr>
    `;
  }).join('');

  const bodyHtml = isAr ? `
    <p style="margin-top: 0; font-size: 14px; color: #F4F4F5;">
      سعادة الإدارة التنفيذية وفريق العمليات التقنية،
    </p>
    <p style="color: #D4D4D8; line-height: 1.65; font-size: 13px;">
      نرفع لسعادتكم التقرير الفني والتشخيصي المفصل لعملية <strong>المزامنة الآلية اليومية الشاملة</strong> لمجموعة دبليو دي للأعمال، المنفذة بتاريخ <strong>${timestamp}</strong> على بيئة <code>${syncEnvironment}</code>.
    </p>

    <!-- Executive KPI Metrics Summary Cards -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0;">
      <tr>
        <td style="padding: 10px 6px; width: 25%;">
          <div style="background: #141722; border: 1px solid #232733; border-radius: 10px; padding: 12px 8px; text-align: center;">
            <span style="font-size: 10px; color: #A1A1AA; text-transform: uppercase; font-weight: bold; display: block;">المهام المفحوصة</span>
            <strong style="font-size: 20px; color: #FFFFFF; font-family: monospace;">${tasks.length}</strong>
          </div>
        </td>
        <td style="padding: 10px 6px; width: 25%;">
          <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 10px; padding: 12px 8px; text-align: center;">
            <span style="font-size: 10px; color: #34D399; text-transform: uppercase; font-weight: bold; display: block;">الناجحة</span>
            <strong style="font-size: 20px; color: #34D399; font-family: monospace;">${successCount}</strong>
          </div>
        </td>
        <td style="padding: 10px 6px; width: 25%;">
          <div style="background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.3); border-radius: 10px; padding: 12px 8px; text-align: center;">
            <span style="font-size: 10px; color: #FBBF24; text-transform: uppercase; font-weight: bold; display: block;">التحذيرات</span>
            <strong style="font-size: 20px; color: #FBBF24; font-family: monospace;">${warningCount}</strong>
          </div>
        </td>
        <td style="padding: 10px 6px; width: 25%;">
          <div style="background: ${hasFailures ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.02)'}; border: 1px solid ${hasFailures ? 'rgba(239,68,68,0.5)' : '#232733'}; border-radius: 10px; padding: 12px 8px; text-align: center;">
            <span style="font-size: 10px; color: ${hasFailures ? '#F87171' : '#71717A'}; text-transform: uppercase; font-weight: bold; display: block;">المتعثرة (فشل)</span>
            <strong style="font-size: 20px; color: ${hasFailures ? '#EF4444' : '#71717A'}; font-family: monospace;">${failureCount}</strong>
          </div>
        </td>
      </tr>
    </table>

    <!-- Detailed Subsystems Diagnostics Table -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 16px 0; background-color: #0F1117; border: 1px solid #232733; border-radius: 12px; overflow: hidden; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #141722; border-bottom: 2px solid #232733;">
          <th style="padding: 12px; font-size: 11px; font-weight: 800; color: #C9A86A; text-align: right; text-transform: uppercase; width: 32%;">الخدمة / المنظومة</th>
          <th style="padding: 12px; font-size: 11px; font-weight: 800; color: #C9A86A; text-align: center; text-transform: uppercase; width: 18%;">الحالة والزمن</th>
          <th style="padding: 12px; font-size: 11px; font-weight: 800; color: #C9A86A; text-align: right; text-transform: uppercase; width: 50%;">سبب الفشل الدقيق / التفاصيل الفنية</th>
        </tr>
      </thead>
      <tbody>
        ${tableRowsHtml}
      </tbody>
    </table>

    ${hasFailures ? `
      <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 10px; padding: 14px 18px; margin: 20px 0;">
        <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #EF4444;">🚨 إجراءات المعالجة الفورية الموصى بها:</h4>
        <p style="margin: 0; font-size: 12px; color: #FCA5A5; line-height: 1.6;">
          يرجى من المهندس المناوب مراجعة السجلات الفنية (Logs) في لوحة التحكم وتحديث مفاتيح الربط أو إعادة تشغيل المزامنة اليدوية.
        </p>
      </div>
    ` : ''}

    <p style="margin-top: 24px; font-size: 12px; color: #A1A1AA; line-height: 1.6;">
      صدر آلياً عن <strong>منظومة المراقبة والاستقرار السحابي — مجموعة دبليو دي</strong><br>
      <span style="color: #71717A; font-size: 11px;">الرياض · المملكة العربية السعودية</span>
    </p>
  ` : `
    <p style="margin-top: 0; font-size: 14px; color: #F4F4F5;">
      Dear Executive Team & Technical Operations,
    </p>
    <p style="color: #D4D4D8; line-height: 1.65; font-size: 13px;">
      Here is the comprehensive diagnostic report for the <strong>Daily Automated System Sync</strong> executed on <strong>${timestamp}</strong> across the <code>${syncEnvironment}</code> environment.
    </p>

    <!-- Executive KPI Metrics Summary Cards -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0;">
      <tr>
        <td style="padding: 10px 6px; width: 25%;">
          <div style="background: #141722; border: 1px solid #232733; border-radius: 10px; padding: 12px 8px; text-align: center;">
            <span style="font-size: 10px; color: #A1A1AA; text-transform: uppercase; font-weight: bold; display: block;">Total Tasks</span>
            <strong style="font-size: 20px; color: #FFFFFF; font-family: monospace;">${tasks.length}</strong>
          </div>
        </td>
        <td style="padding: 10px 6px; width: 25%;">
          <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 10px; padding: 12px 8px; text-align: center;">
            <span style="font-size: 10px; color: #34D399; text-transform: uppercase; font-weight: bold; display: block;">Successful</span>
            <strong style="font-size: 20px; color: #34D399; font-family: monospace;">${successCount}</strong>
          </div>
        </td>
        <td style="padding: 10px 6px; width: 25%;">
          <div style="background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.3); border-radius: 10px; padding: 12px 8px; text-align: center;">
            <span style="font-size: 10px; color: #FBBF24; text-transform: uppercase; font-weight: bold; display: block;">Warnings</span>
            <strong style="font-size: 20px; color: #FBBF24; font-family: monospace;">${warningCount}</strong>
          </div>
        </td>
        <td style="padding: 10px 6px; width: 25%;">
          <div style="background: ${hasFailures ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.02)'}; border: 1px solid ${hasFailures ? 'rgba(239,68,68,0.5)' : '#232733'}; border-radius: 10px; padding: 12px 8px; text-align: center;">
            <span style="font-size: 10px; color: ${hasFailures ? '#F87171' : '#71717A'}; text-transform: uppercase; font-weight: bold; display: block;">Failed</span>
            <strong style="font-size: 20px; color: ${hasFailures ? '#EF4444' : '#71717A'}; font-family: monospace;">${failureCount}</strong>
          </div>
        </td>
      </tr>
    </table>

    <!-- Detailed Subsystems Diagnostics Table -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 16px 0; background-color: #0F1117; border: 1px solid #232733; border-radius: 12px; overflow: hidden; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #141722; border-bottom: 2px solid #232733;">
          <th style="padding: 12px; font-size: 11px; font-weight: 800; color: #C9A86A; text-align: left; text-transform: uppercase; width: 32%;">Subsystem / Service</th>
          <th style="padding: 12px; font-size: 11px; font-weight: 800; color: #C9A86A; text-align: center; text-transform: uppercase; width: 18%;">Status & Latency</th>
          <th style="padding: 12px; font-size: 11px; font-weight: 800; color: #C9A86A; text-align: left; text-transform: uppercase; width: 50%;">Exact Failure Reason / Technical Diagnostics</th>
        </tr>
      </thead>
      <tbody>
        ${tableRowsHtml}
      </tbody>
    </table>

    ${hasFailures ? `
      <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 10px; padding: 14px 18px; margin: 20px 0;">
        <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #EF4444;">🚨 Urgent Remediation Needed:</h4>
        <p style="margin: 0; font-size: 12px; color: #FCA5A5; line-height: 1.6;">
          One or more mission-critical services encountered synchronization errors. Please review the diagnostic reasons above and trigger an immediate re-sync from the System Health console.
        </p>
      </div>
    ` : ''}

    <p style="margin-top: 24px; font-size: 12px; color: #A1A1AA; line-height: 1.6;">
      Automated dispatch from <strong>WD Group System Reliability & Health Engine</strong><br>
      <span style="color: #71717A; font-size: 11px;">Riyadh · Kingdom of Saudi Arabia</span>
    </p>
  `;

  return sendEmailWithBrevo({
    to: [{ name: 'WD Group DevOps & Executive Team', email: adminEmail }],
    subject: statusTitle,
    htmlContent: renderBrandedShell({
      title: isAr ? 'تقرير المزامنة وتشخيص الأعطال' : 'Daily Automated Sync Report',
      preheader: isAr ? `نتائج فحص ${tasks.length} خدمات: ${successCount} ناجحة، ${failureCount} متعثرة.` : `Checked ${tasks.length} services: ${successCount} Passed, ${failureCount} Failed.`,
      badgeText: hasFailures 
        ? (isAr ? 'تنبيه أعطال فوري' : 'Critical Failure Alert') 
        : (isAr ? 'تقرير المزامنة اليومي' : 'Daily Sync Health'),
      badgeType: hasFailures ? 'amber' : 'emerald',
      bodyHtml,
      isAr,
      actionButton: {
        label: isAr ? 'فتح لوحة فحص استقرار النظام' : 'Open System Health Console',
        url: `${siteUrl}/admin/system/health`,
        variant: hasFailures ? 'gold' : 'blue',
      },
    }),
    tags: ['daily-sync-report', hasFailures ? 'sync-failure' : 'sync-success'],
  });
}
