/**
 * WD Group - GreenWood Furniture
 * Official ZATCA Phase-2 Compliant Transactional Email Invoice Dispatcher
 */

import { sendEmailWithBrevo, renderBrandedShell } from '@/lib/email/brevo';
import { EcommerceOrderRecord } from '@/lib/admin/types';
import { generateZatcaQrBase64, generateQrCodeDataUrl } from '@/lib/ecommerce/zatca';
import { getEcommerceSettings } from '@/lib/ecommerce/settings';

export async function sendOrderTaxInvoiceEmail(
  order: EcommerceOrderRecord,
  lang: 'ar' | 'en' = 'ar'
): Promise<{ success: boolean; error?: string }> {
  const isAr = lang === 'ar';
  const settings = await getEcommerceSettings().catch(() => null);

  // If transactional order emails are disabled by admin, return early
  if (settings && settings.enableOrderEmails === false) {
    console.log('[Email Invoice] Transactional emails disabled by admin setting.');
    return { success: true };
  }

  const orderDateIso = order.createdAt ? new Date(order.createdAt).toISOString() : new Date().toISOString();
  const formattedDate = new Date(orderDateIso).toLocaleDateString('en-GB');

  const sellerNameAr = settings?.companyNameAr || 'شركة تصاميم الوطن المحدودة - مجموعة دبليو دي';
  const sellerNameEn = settings?.companyNameEn || 'WD Group for Contracting & Hospitality LLC';
  const vatNumber = settings?.taxNumber || '310492817400003';
  const crNumber = settings?.crNumber || '1010724891';
  const showZatcaQr = settings?.enableZatcaQr !== false && settings?.attachZatcaInvoice !== false;

  // 1. Generate ZATCA Phase-2 Cryptographic TLV Base64 & QR Data URL
  const zatcaTlvBase64 = generateZatcaQrBase64({
    sellerName: sellerNameAr,
    vatRegistrationNumber: vatNumber,
    timestamp: orderDateIso,
    totalWithVat: order.totalAmount,
    vatTotal: order.vatAmount,
  });

  const qrImageUrl = generateQrCodeDataUrl(zatcaTlvBase64, 180);
  const trackingUrl = `https://test.wdgroup.online/furniture/track?ref=${encodeURIComponent(order.orderRef)}`;

  // 2. Build Itemized Rows HTML
  const itemsHtml = (order.items || []).map((item, idx) => `
    <tr style="border-bottom: 1px solid #232736;">
      <td style="padding: 12px 8px; text-align: ${isAr ? 'right' : 'left'}; color: #FFFFFF; font-size: 13px;">
        <strong style="display: block; color: #FFFFFF;">${isAr ? (item.nameAr || item.nameEn) : item.nameEn}</strong>
        <span style="font-family: monospace; font-size: 11px; color: #8F96A9;">SKU: ${item.sku} ${item.finishNameEn ? `· Finish: ${item.finishNameEn}` : ''}</span>
      </td>
      <td style="padding: 12px 8px; text-align: center; color: #FFFFFF; font-family: monospace; font-size: 13px;">
        ${item.quantity}
      </td>
      <td style="padding: 12px 8px; text-align: right; color: #C9A86A; font-family: monospace; font-size: 13px;">
        ${item.unitPrice.toLocaleString('en-US')} SAR
      </td>
      <td style="padding: 12px 8px; text-align: right; color: #FFFFFF; font-family: monospace; font-size: 13px; font-weight: bold;">
        ${(item.unitPrice * item.quantity).toLocaleString('en-US')} SAR
      </td>
    </tr>
  `).join('');

  // 3. Build Body HTML
  const bodyHtml = `
    <!-- Letterhead & ZATCA Header -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom: 2px solid #C9A86A; padding-bottom: 20px; margin-bottom: 24px;">
      <tr>
        <td style="text-align: ${isAr ? 'right' : 'left'}; vertical-align: top;">
          <h2 style="margin: 0 0 6px 0; color: #FFFFFF; font-size: 18px; font-weight: 800;">
            ${isAr ? sellerNameAr : sellerNameEn}
          </h2>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #A0A5B5;">
            ${isAr ? 'مصانع جرين وود للأثاث الفندقي والمكتبي الفاخر · الرياض' : 'GreenWood Luxury Hospitality & Office Furniture Atelier · Riyadh'}
          </p>
          <p style="margin: 0; font-size: 11px; font-family: monospace; color: #8F96A9;">
            CR: ${crNumber} · VAT TRN: ${vatNumber}
          </p>
        </td>
        ${showZatcaQr ? `
        <td style="width: 110px; text-align: center; vertical-align: top;">
          <div style="background: #FFFFFF; padding: 4px; border-radius: 8px; display: inline-block;">
            <img src="${qrImageUrl}" alt="ZATCA Phase-2 QR" width="100" height="100" style="display: block; border: 0;" />
          </div>
          <span style="display: block; font-family: monospace; font-size: 9px; color: #C9A86A; margin-top: 4px;">
            ZATCA Phase-2
          </span>
        </td>
        ` : ''}
      </tr>
    </table>

    <!-- Order & Client Details Grid -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #12151F; border: 1px solid #232736; border-radius: 12px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 16px; width: 50%; vertical-align: top; border-${isAr ? 'left' : 'right'}: 1px solid #232736; text-align: ${isAr ? 'right' : 'left'};">
          <span style="font-family: monospace; font-size: 10px; text-transform: uppercase; color: #8F96A9; font-weight: bold; display: block; margin-bottom: 4px;">
            ${isAr ? 'بيانات الفاتورة والطلب' : 'INVOICE & ORDER METADATA'}
          </span>
          <p style="margin: 0 0 4px 0; font-size: 13px; color: #FFFFFF;">
            <strong>${order.orderRef}</strong>
          </p>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #A0A5B5;">
            ${isAr ? 'التاريخ:' : 'Date:'} <span style="font-family: monospace; color: #FFFFFF;">${formattedDate}</span>
          </p>
          <p style="margin: 0; font-size: 12px; color: #A0A5B5;">
            ${isAr ? 'وسيلة الدفع:' : 'Payment:'} <span style="color: #34D399; font-weight: bold; text-transform: uppercase;">${order.paymentMethod.replace('_', ' ')}</span>
          </p>
        </td>
        <td style="padding: 16px; width: 50%; vertical-align: top; text-align: ${isAr ? 'right' : 'left'};">
          <span style="font-family: monospace; font-size: 10px; text-transform: uppercase; color: #8F96A9; font-weight: bold; display: block; margin-bottom: 4px;">
            ${isAr ? 'بيانات العميل والتسليم' : 'CLIENT & DELIVERY SITE'}
          </span>
          <p style="margin: 0 0 4px 0; font-size: 13px; color: #FFFFFF; font-weight: bold;">
            ${order.customerName}
          </p>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #A0A5B5;">
            ${order.phone} · ${order.city}
          </p>
          <p style="margin: 0; font-size: 11px; color: #8F96A9;">
            ${order.address || (isAr ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia')}
          </p>
        </td>
      </tr>
    </table>

    <!-- Itemized Table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px;">
      <thead>
        <tr style="background-color: #12151F; border-bottom: 2px solid #232736;">
          <th style="padding: 10px 8px; text-align: ${isAr ? 'right' : 'left'}; color: #C9A86A; font-size: 11px; text-transform: uppercase; font-family: monospace;">
            ${isAr ? 'القطعة / الصنف' : 'Item Description'}
          </th>
          <th style="padding: 10px 8px; text-align: center; color: #C9A86A; font-size: 11px; text-transform: uppercase; font-family: monospace;">
            ${isAr ? 'الكمية' : 'Qty'}
          </th>
          <th style="padding: 10px 8px; text-align: right; color: #C9A86A; font-size: 11px; text-transform: uppercase; font-family: monospace;">
            ${isAr ? 'السعر الفردي' : 'Unit Price'}
          </th>
          <th style="padding: 10px 8px; text-align: right; color: #C9A86A; font-size: 11px; text-transform: uppercase; font-family: monospace;">
            ${isAr ? 'المجموع' : 'Total'}
          </th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <!-- Financial Totals Box -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #12151F; border: 1px solid #232736; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
      <tr>
        <td style="text-align: ${isAr ? 'right' : 'left'}; color: #A0A5B5; font-size: 13px; padding-bottom: 8px;">
          ${isAr ? 'المجموع الخاضع للضريبة (قبل الضريبة):' : 'Taxable Subtotal (excl. VAT):'}
        </td>
        <td style="text-align: right; font-family: monospace; color: #FFFFFF; font-size: 13px; padding-bottom: 8px;">
          ${order.subtotal.toLocaleString('en-US')} SAR
        </td>
      </tr>
      ${order.discountAmount && order.discountAmount > 0 ? `
      <tr>
        <td style="text-align: ${isAr ? 'right' : 'left'}; color: #34D399; font-size: 13px; padding-bottom: 8px;">
          ${isAr ? 'الخصم المطبق:' : 'VIP Discount Applied:'}
        </td>
        <td style="text-align: right; font-family: monospace; color: #34D399; font-size: 13px; padding-bottom: 8px;">
          -${order.discountAmount.toLocaleString('en-US')} SAR
        </td>
      </tr>
      ` : ''}
      <tr>
        <td style="text-align: ${isAr ? 'right' : 'left'}; color: #A0A5B5; font-size: 13px; padding-bottom: 8px;">
          ${isAr ? 'ضريبة القيمة المضافة (15%):' : '15% Value Added Tax (VAT):'}
        </td>
        <td style="text-align: right; font-family: monospace; color: #FFFFFF; font-size: 13px; padding-bottom: 8px;">
          ${order.vatAmount.toLocaleString('en-US')} SAR
        </td>
      </tr>
      <tr style="border-top: 1px solid #232736;">
        <td style="text-align: ${isAr ? 'right' : 'left'}; color: #C9A86A; font-size: 15px; font-weight: 800; padding-top: 12px;">
          ${isAr ? 'الإجمالي النهائي المطلوب:' : 'Grand Total Due:'}
        </td>
        <td style="text-align: right; font-family: monospace; color: #C9A86A; font-size: 18px; font-weight: 900; padding-top: 12px;">
          ${order.totalAmount.toLocaleString('en-US')} SAR
        </td>
      </tr>
    </table>

    <!-- Warranty & White Glove Note -->
    <div style="background-color: #0B0E14; border: 1px solid #1E2333; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px; text-align: ${isAr ? 'right' : 'left'};">
      <p style="margin: 0; font-size: 11px; color: #8F96A9; line-height: 1.6;">
        🛡️ <strong style="color: #FFFFFF;">${isAr ? 'ضمان المصنع الفندقي المعتمد:' : 'Certified Factory Guarantee:'}</strong>
        ${isAr 
          ? 'يشمل هذا الطلب التوصيل والتركيب الموقعي المجاني وضمان شامل لمدة 5 سنوات على الهياكل الخشبية والمعدنية والتنجيد.'
          : 'This order includes white-glove site installation and a comprehensive 5-year warranty on timber frameworks and joinery.'}
      </p>
    </div>
  `;

  // 4. Render Shell Template
  const finalHtml = renderBrandedShell({
    title: isAr ? `فاتورة ضريبية رسمية: ${order.orderRef}` : `Official Tax Invoice: ${order.orderRef}`,
    preheader: isAr 
      ? `فاتورتكم الضريبية المعتمدة برقم ${order.orderRef} بمبلغ ${order.totalAmount.toLocaleString('en-US')} ر.س`
      : `Your official tax invoice for order ${order.orderRef} (${order.totalAmount.toLocaleString('en-US')} SAR)`,
    badgeText: isAr ? 'فاتورة ضريبية إلكترونية معتمدة' : 'ZATCA Certified Tax Invoice',
    badgeType: 'gold',
    bodyHtml,
    actionButton: {
      text: isAr ? 'متابعة مراحل التصنيع والشحن المباشر' : 'Track Manufacturing & Dispatch Live',
      url: trackingUrl,
    },
    lang,
  });

  const subject = isAr
    ? `فاتورة ضريبية معتمدة: طلبك رقم ${order.orderRef} - مجموعة دبليو دي (جرين وود)`
    : `Official Tax Invoice: Order #${order.orderRef} — WD Group (GreenWood)`;

  // Dispatch high-ticket leadership alert if threshold is met
  const highTicketThreshold = settings?.highTicketThreshold || 35000;
  const adminAlertEmail = settings?.adminAlertEmail;
  if (adminAlertEmail && order.totalAmount >= highTicketThreshold) {
    sendEmailWithBrevo({
      to: [{ name: 'WD Group Leadership & Finance', email: adminAlertEmail }],
      subject: `🚨 [HIGH-TICKET ORDER] ${order.orderRef} — ${order.totalAmount.toLocaleString('en-US')} SAR`,
      htmlContent: `
        <div style="font-family: sans-serif; background: #0B0E14; color: #FFFFFF; padding: 24px; border-radius: 12px; border: 1px solid #C9A86A;">
          <h2 style="color: #C9A86A; margin: 0 0 12px 0;">New High-Ticket VIP Order Received</h2>
          <p style="font-size: 14px; color: #D1D5DB;">An order exceeding the VIP threshold of ${highTicketThreshold.toLocaleString('en-US')} SAR has been registered in the system:</p>
          <ul style="color: #FFFFFF; font-size: 13px; line-height: 1.8;">
            <li><strong>Order Ref:</strong> ${order.orderRef}</li>
            <li><strong>Total Value:</strong> ${order.totalAmount.toLocaleString('en-US')} SAR (incl. VAT)</li>
            <li><strong>Customer:</strong> ${order.customerName} (${order.phone} / ${order.email})</li>
            <li><strong>City / Site:</strong> ${order.city} ${order.district ? `(${order.district})` : ''}</li>
            <li><strong>Payment Method:</strong> ${order.paymentMethod}</li>
          </ul>
          <p style="margin-top: 16px;">
            <a href="https://test.wdgroup.online/admin/ecommerce?ref=${encodeURIComponent(order.orderRef)}" style="background: #C9A86A; color: #000000; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">View in Admin Operations Hub</a>
          </p>
        </div>
      `,
      tags: ['ecommerce', 'finance-alert', 'high-ticket'],
    }).catch((err) => console.error('[High-Ticket Email Alert Error]:', err));
  }

  return await sendEmailWithBrevo({
    to: [{ name: order.customerName, email: order.email }],
    subject,
    htmlContent: finalHtml,
    tags: ['ecommerce', 'tax-invoice', 'zatca', order.orderType || 'retail'],
  });
}
