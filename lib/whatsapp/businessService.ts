/**
 * WD Group - Official WhatsApp Business Service Messaging System
 * Supports multi-audience service notifications for Clients, Website Users, and Employees.
 */

export type WhatsAppAudience = 'clients' | 'users' | 'employees';

export interface WhatsAppServiceTemplate {
  id: string;
  audience: WhatsAppAudience;
  titleAr: string;
  titleEn: string;
  badgeAr: string;
  badgeEn: string;
  badgeColor: 'emerald' | 'blue' | 'amber' | 'purple' | 'rose';
  descriptionAr: string;
  descriptionEn: string;
  suggestedVariables: string[];
  generateTextAr: (vars: Record<string, string>) => string;
  generateTextEn: (vars: Record<string, string>) => string;
}

export const OFFICIAL_WHATSAPP_NUMBER = '966505725070';
export const CANONICAL_PREVIEW_URL = 'https://test.wdgroup.online';
export const CANONICAL_LIVE_URL = 'https://wdgroup.online';

export const WHATSAPP_SERVICE_TEMPLATES: WhatsAppServiceTemplate[] = [
  // ─── 1. CLIENTS (العملاء) ───
  {
    id: 'client_order_confirmed',
    audience: 'clients',
    titleAr: 'تأكيد الطلب وبدء التصنيع بالمصنع',
    titleEn: 'Order Confirmation & Manufacturing Start',
    badgeAr: 'المبيعات والمتجر',
    badgeEn: 'Sales & Store',
    badgeColor: 'emerald',
    descriptionAr: 'إشعار العميل بتأكيد استلام الطلب وبدء أعمال التصنيع في المصانع المختصة.',
    descriptionEn: 'Notify client of order confirmation and the start of production in dedicated factories.',
    suggestedVariables: ['customerName', 'orderRef', 'totalAmount', 'factoryName'],
    generateTextAr: (v) => 
`مرحباً ${v.customerName || 'عزيزنا العميل'}،

نشكركم لاختياركم **مجموعة دبليو دي للأعمال (جرين وود للأثاث والتصنيع)**.

✅ **تم تأكيد طلبكم بنجاح وبدء جدول التصنيع:**
• رقم الطلب: ${v.orderRef || 'WD-ORD-2026'}
• إجمالي الفاتورة: ${v.totalAmount || '—'} ر.س (شامل 15% ضريبة)
• المصنع المسؤول: ${v.factoryName || 'مصنع الأخشاب الخضراء بالرياض'}

🔗 لمتابعة البث الحي ومراحل التنفيذ لحظة بلحظة:
${CANONICAL_PREVIEW_URL}/furniture/track?ref=${encodeURIComponent(v.orderRef || '')}

فريق خدمة كبار العملاء في خدمتكم دائماً.`,
    generateTextEn: (v) =>
`Dear ${v.customerName || 'Valued Client'},

Thank you for choosing **WD Group (GreenWood Furniture & Manufacturing)**.

✅ **Your order has been confirmed & queued for fabrication:**
• Order Ref: ${v.orderRef || 'WD-ORD-2026'}
• Total Value: ${v.totalAmount || '—'} SAR (incl. 15% VAT)
• Assigned Facility: ${v.factoryName || 'Green Wood Factory (Riyadh)'}

🔗 Track your live manufacturing progress here:
${CANONICAL_PREVIEW_URL}/furniture/track?ref=${encodeURIComponent(v.orderRef || '')}

WD Group Executive Client Care is at your service.`,
  },

  {
    id: 'client_production_stage',
    audience: 'clients',
    titleAr: 'تحديث مرحلة تصنيع نشطة بالمصنع',
    titleEn: 'Live Manufacturing Stage Progress',
    badgeAr: 'المصانع والإنتاج',
    badgeEn: 'Factory Progress',
    badgeColor: 'blue',
    descriptionAr: 'تحديث لحظي للعميل عند انتقال طلبه لمرحلة جديدة (CNC، النجارة، التنجيد، الفحص).',
    descriptionEn: 'Real-time alert when client order advances to the next factory stage.',
    suggestedVariables: ['customerName', 'orderRef', 'currentStage', 'factoryLocation'],
    generateTextAr: (v) =>
`مرحباً ${v.customerName || 'عزيزنا العميل'}،

تحديث جديد من خطوط إنتاج **مجموعة دبليو دي**:

⚙️ انتقل طلبكم رقم (${v.orderRef || 'WD-ORD-2026'}) إلى مرحلة:
**${v.currentStage || 'التشكيل والقص الآلي بـ CNC والنجارة الهيكلية'}**

🏭 موقع العمل الحالي: ${v.factoryLocation || 'مصنع الأخشاب الخضراء بالرياض'}
📅 التسليم المجدول: وفق الجدول المعتمد

يمكنكم متابعة التحديثات المصورة عبر الرابط المباشر:
${CANONICAL_PREVIEW_URL}/furniture/track?ref=${encodeURIComponent(v.orderRef || '')}`,
    generateTextEn: (v) =>
`Hello ${v.customerName || 'Valued Client'},

Production milestone update from **WD Group Fabrication Lines**:

⚙️ Your order (${v.orderRef || 'WD-ORD-2026'}) has progressed to:
**${v.currentStage || 'Precision CNC Routing & Structural Joinery'}**

🏭 Current Workcenter: ${v.factoryLocation || 'Green Wood Factory (Riyadh)'}
📅 Estimated Handover: Synchronized per schedule

Inspect live progress and technical logs:
${CANONICAL_PREVIEW_URL}/furniture/track?ref=${encodeURIComponent(v.orderRef || '')}`,
  },

  {
    id: 'client_dispatch_delivery',
    audience: 'clients',
    titleAr: 'انطلاق أسطول التسليم والتركيب الفندقي',
    titleEn: 'White-Glove Fleet Dispatch & Installation',
    badgeAr: 'الخدمات اللوجستية',
    badgeEn: 'White-Glove Logistics',
    badgeColor: 'amber',
    descriptionAr: 'إشعار بانطلاق شاحنة التسليم والتركيب مع بيانات قائد الفريق وموعد الوصول.',
    descriptionEn: 'Notification of delivery fleet dispatch with lead technician details and ETA.',
    suggestedVariables: ['customerName', 'orderRef', 'leadTechnician', 'deliveryDate', 'deliverySlot'],
    generateTextAr: (v) =>
`عزيزنا ${v.customerName || 'العميل الكريم'}،

يسعدنا إفادتكم بأن أسطول الدعم اللوجستي لمجموعة دبليو دي قد انطلق لتسليم وتركيب طلبكم رقم (${v.orderRef || 'WD-ORD-2026'}).

🚚 **تفاصيل موعد التسليم والتركيب:**
• التاريخ المحدد: ${v.deliveryDate || 'اليوم'}
• الفترة: ${v.deliverySlot || 'الفترة الصباحية (9:00 ص – 1:00 م)'}
• قائد فريق التركيبات: ${v.leadTechnician || 'م. فهد الغامدي'}

يرجى التكرم بتأكيد جاهزية الموقع لاستقبال فريق التركيب الفندقي المعتمد.`,
    generateTextEn: (v) =>
`Dear ${v.customerName || 'Valued Client'},

Great news! The WD Group white-glove logistics fleet has departed to deliver and install your bespoke order (${v.orderRef || 'WD-ORD-2026'}).

🚚 **Delivery & Handover Details:**
• Date: ${v.deliveryDate || 'Today'}
• Slot: ${v.deliverySlot || 'Morning Slot (9:00 AM – 1:00 PM)'}
• Lead Field Engineer: ${v.leadTechnician || 'Eng. Fahad Al-Ghamdi'}

Please confirm site readiness for seamless white-glove installation.`,
  },

  {
    id: 'client_b2b_rfp_quote',
    audience: 'clients',
    titleAr: 'تجهيز عرض سعر تجاري للمشاريع (RFP)',
    titleEn: 'B2B Commercial Quotation Ready',
    badgeAr: 'العقود والمناقصات',
    badgeEn: 'B2B Contracts',
    badgeColor: 'purple',
    descriptionAr: 'إرسال عرض السعر الفني والمالي المعتمد لمشاريع الفنادق والمقاولات والتوريد.',
    descriptionEn: 'Dispatch approved technical & financial proposal for B2B/FF&E projects.',
    suggestedVariables: ['clientName', 'projectName', 'proposalNumber', 'quotationUrl'],
    generateTextAr: (v) =>
`سعادة ${v.clientName || 'العميل الكريم'}،

تحية طيبة من **مجموعة دبليو دي للأعمال**،

يسرنا إحاطتكم باكتمال دراسة المواصفات وجداول الكميات الخاصة بمشروع:
**${v.projectName || 'مشروع التجهيز الفندقي والمكتبي'}**

📄 تم اعتماد عرض السعر الفني والمالي برقم: (${v.proposalNumber || 'WD-RFP-2026'})
يشمل العرض الحلول الهندسية، مواصفات خامات المصانع (الأخشاب والمعادن)، وجداول التوريد.

يسعد مستشار المشاريع التنسيق معكم لمناقشة التفاصيل وتحديد موعد لزيارة المعرض أو المصانع.`,
    generateTextEn: (v) =>
`Dear ${v.clientName || 'Valued Partner'},

Greetings from **WD Group for Business**,

We are pleased to inform you that our technical and quantity survey team has finalized the commercial proposal for:
**${v.projectName || 'Hospitality & Commercial Procurement Project'}**

📄 Approved Proposal Ref: (${v.proposalNumber || 'WD-RFP-2026'})
Includes comprehensive factory manufacturing specifications, timber & metal finishes, and delivery milestones.

Our corporate project consultant is available to review details or coordinate a factory tour.`,
  },

  // ─── 2. WEBSITE USERS & LEADS (مستخدمو وزوار الموقع والمهتمين) ───
  {
    id: 'user_welcome_consultation',
    audience: 'users',
    titleAr: 'الترحيب الفوري وتعيين مستشار أثاث وديكور',
    titleEn: 'Instant Welcome & Design Consultant',
    badgeAr: 'خدمة العملاء',
    badgeEn: 'Client Care',
    badgeColor: 'emerald',
    descriptionAr: 'ترحيب فوري بالزائر الذي طلب استفساراً عبر الموقع مع ربطه بمستشار متخصص.',
    descriptionEn: 'Instant greeting for visitors submitting inquiries, connecting them with a specialist.',
    suggestedVariables: ['userName', 'interestArea', 'consultantName'],
    generateTextAr: (v) =>
`أهلاً وسهلاً بك ${v.userName || 'كريمنا'}،

معك **${v.consultantName || 'سلطان'}** من مركز رعاية العملاء في **مجموعة دبليو دي القابضة**.

لقد استلمنا باهتمام استفسارك عبر بوابتنا الإلكترونية بخصوص:
**${v.interestArea || 'تصنيع وتفصيل الأثاث والمشاريع الفاخرة'}**

يسعدني جداً إجابة أي سؤال لديك، وتزويدك بالكتالوجات الرقمية، أو ترتيب موعد استشارة وتحديد المقاسات. 
كيف أستطيع مساعدتك اليوم؟`,
    generateTextEn: (v) =>
`Welcome ${v.userName || 'Guest'},

This is **${v.consultantName || 'Sultan'}** from **WD Group Client Concierge**.

We have received your inquiry on our digital portal regarding:
**${v.interestArea || 'Bespoke Luxury Furniture & Manufacturing'}**

I am at your service to answer technical questions, share digital catalogs, or coordinate custom dimensions with our engineering team.
How may I assist you today?`,
  },

  {
    id: 'user_catalog_request',
    audience: 'users',
    titleAr: 'إرسال الكتالوج الرقمي الفاخر وقوائم الأسعار',
    titleEn: 'Digital Product Catalog & Price Guide',
    badgeAr: 'التسويق والمبيعات',
    badgeEn: 'Sales & Marketing',
    badgeColor: 'blue',
    descriptionAr: 'إرسال رابط كتالوج أثاث وتصنيع جرين وود ومجموعة دبليو دي الفاخرة مباشرة عبر الواتساب.',
    descriptionEn: 'Deliver direct PDF link to WD Group luxury furniture catalog via WhatsApp.',
    suggestedVariables: ['userName', 'catalogLink'],
    generateTextAr: (v) =>
`مرحباً ${v.userName || 'عزيزنا'}،

بناءً على طلبكم عبر موقع **مجموعة دبليو دي**، نرفق لكم أحدث كتالوجات قطع الأثاث الفاخر والأعمال الخشبية المعمارية (جرين وود 2026):

📖 تصفح الكتالوج الرقمي والقطع الحصرية:
${v.catalogLink || 'https://wdgroup.online/furniture'}

تتميز جميع القطع بأنها مُصنعة بنسبة 100% في مصانعنا الوطنية بالرياض ونجران وتخضع لضمان فندقي معتمد حتى 10 سنوات.

يسعدنا استقبال استفساراتكم وتفصيل المقاسات الخاصة في أي وقت.`,
    generateTextEn: (v) =>
`Hello ${v.userName || 'Friend'},

As requested through the **WD Group** website, here is the official 2026 GreenWood Luxury Furniture & Architectural Collection:

📖 Browse the interactive catalog & signature pieces:
${v.catalogLink || 'https://wdgroup.online/furniture'}

All pieces are manufactured in our specialized industrial facilities in Riyadh and Najran with up to 10 years structural warranty.

Feel free to reply with any custom dimensions or fabric finish requests.`,
  },

  {
    id: 'user_factory_visit_invite',
    audience: 'users',
    titleAr: 'دعوة VIP لزيارة مصانعنا بالرياض ونجران',
    titleEn: 'VIP Factory & Atelier Visit Invitation',
    badgeAr: 'علاقات الشركاء',
    badgeEn: 'Partner Relations',
    badgeColor: 'amber',
    descriptionAr: 'دعوة المصممين والاستشاريين والمطورين لزيارة خطوط الإنتاج والاطلاع على الخامات.',
    descriptionEn: 'Invite interior designers and developers to tour manufacturing facilities.',
    suggestedVariables: ['guestName', 'factoryChoice', 'visitDate'],
    generateTextAr: (v) =>
`سعادة ${v.guestName || 'الضيف الكريم'}،

يسر إدارة **مجموعة دبليو دي للأعمال** توجيه دعوة خاصة لسعادتكم لزيارة:
**${v.factoryChoice || 'مصنع الأخشاب الخضراء بالرياض'}**

🎯 للاطلاع ميدانياً على:
• أحدث ماكينات التشكيل الرقمي CNC خماسية المحاور
• مكتبة الخامات من الأخشاب الأوروبية الصلبة والجلود والرخام
• خطوط تجميع وتنجيد الأثاث الفندقي والمكتبي

يسعدنا ترتيب الموعد المناسب لزيارتكم ومرافقة فريق الإدارة الهندسية.`,
    generateTextEn: (v) =>
`Dear ${v.guestName || 'Distinguished Guest'},

The executive management of **WD Group** cordially invites you for a private tour of:
**${v.factoryChoice || 'Green Wood Factory (Riyadh)'}**

🎯 Tour Highlights:
• 5-axis CNC digital timber shaping and joinery lines
• Raw materials library: European solid hardwoods, Italian leathers & natural stone
• Commercial upholstery & architectural fit-out assembly

Our engineering directors look forward to hosting your delegation.`,
  },

  // ─── 3. EMPLOYEES & STAFF (الموظفون وفريق العمل) ───
  {
    id: 'emp_new_job_order',
    audience: 'employees',
    titleAr: 'أمر تصنيع وتشغيل جديد لخطوط الإنتاج',
    titleEn: 'New Production Job Sheet Assignment',
    badgeAr: 'التشغيل المصنعي',
    badgeEn: 'Plant Operations',
    badgeColor: 'purple',
    descriptionAr: 'إشعار فوري لمديري المصانع ورؤساء الورش بصدور أمر تشغيل جديد.',
    descriptionEn: 'Instant dispatch of new manufacturing job sheet to plant supervisors.',
    suggestedVariables: ['employeeName', 'orderRef', 'factoryTarget', 'deadline', 'itemsSummary'],
    generateTextAr: (v) =>
`تنبيه تشغيلي — **أمر تصنيع معتمد**:

إلى المهندس / المشرف: ${v.employeeName || 'مدير الإنتاج'}
المصنع المعني: **${v.factoryTarget || 'مصنع الأخشاب الخضراء بالرياض'}**

📋 **بيانات أمر العمل:**
• رقم أمر التشغيل: ${v.orderRef || 'WD-JOB-2026'}
• موعد التسليم النهائي للمستودع: ${v.deadline || 'خلال 10 أيام'}
• بيان القطع: ${v.itemsSummary || 'طقم كنب الدرعية + طاولتي كوفي نجران'}

يرجى مراجعة نظام أودو (Odoo MRP) والتأكد من توافر الخامات ومطابقة الرسومات الهندسية والبدء فوراً.`,
    generateTextEn: (v) =>
`Operational Directive — **New Job Order**:

Attention: ${v.employeeName || 'Plant Supervisor'}
Assigned Facility: **${v.factoryTarget || 'Green Wood Factory (Riyadh)'}**

📋 **Work Order Details:**
• Job Order Ref: ${v.orderRef || 'WD-JOB-2026'}
• Production Deadline: ${v.deadline || 'Within 10 Days'}
• Summary: ${v.itemsSummary || 'Al-Diriyah Curved Sofa + Najran Travertine Tables'}

Please cross-check Odoo MRP bills of materials, confirm CAD shop drawings, and initiate cutting.`,
  },

  {
    id: 'emp_urgent_site_dispatch',
    audience: 'employees',
    titleAr: 'مهمة تسليم وتركيب ميداني عاجلة',
    titleEn: 'Urgent Site Installation & Delivery Mission',
    badgeAr: 'الفرق الميدانية',
    badgeEn: 'Field Installation',
    badgeColor: 'rose',
    descriptionAr: 'تكليف فنيي التركيب والمهندسين بمهمة تسليم وتركيب بالموقع.',
    descriptionEn: 'Assign site technicians and installation supervisors to a client mission.',
    suggestedVariables: ['technicianName', 'clientName', 'siteCity', 'siteDistrict', 'missionTime'],
    generateTextAr: (v) =>
`إشعار مهمة ميدانية — **تسليم وتركيب فندقي**:

الفني / المهندس المكلف: **${v.technicianName || 'فريق التركيبات 1'}**

📍 **بيانات المهمة والموقع:**
• العميل: ${v.clientName || 'عميل كبار الشخصيات'}
• الموقع: ${v.siteCity || 'الرياض'} — ${v.siteDistrict || 'حي النرجس'}
• موعد الوصول للموقع: ${v.missionTime || 'غداً في تمام 9:30 ص'}

⚠️ اشتراطات المهمة:
الالتزام بالزي الرسمي، ارتداء أغطية الأحذية الواقية، واستكمال فحص الجودة الميداني وتوقيع محضر الاستلام.`,
    generateTextEn: (v) =>
`Field Mission Directive — **White-Glove Installation**:

Assigned Lead: **${v.technicianName || 'Installation Team 1'}**

📍 **Site Coordinates & Schedule:**
• Client: ${v.clientName || 'VIP Client'}
• Destination: ${v.siteCity || 'Riyadh'} — ${v.siteDistrict || 'Al Narjis'}
• Site Arrival Time: ${v.missionTime || 'Tomorrow at 9:30 AM'}

⚠️ Protocols:
Mandatory corporate uniform, protective floor runners, and signed client acceptance sign-off.`,
  },

  {
    id: 'emp_hr_interview_alert',
    audience: 'employees',
    titleAr: 'إشعار بموعد مقابلة مرشح جديد (الموارد البشرية)',
    titleEn: 'HR Candidate Interview Schedule Alert',
    badgeAr: 'الموارد البشرية',
    badgeEn: 'Human Capital',
    badgeColor: 'blue',
    descriptionAr: 'تنبيه أعضاء لجنة المقابلات والمديرين بموعد مقابلة توظيف لكفاءة مرشحة.',
    descriptionEn: 'Notify hiring managers of scheduled candidate interview.',
    suggestedVariables: ['interviewerName', 'candidateName', 'roleTitle', 'interviewSlot', 'cvUrl'],
    generateTextAr: (v) =>
`تنبيه الموارد البشرية — **مقابلة توظيف**:

سعادة الأستاذ / المهندس: ${v.interviewerName || 'مدير الإدارة'}

نحيطكم علماً بجدولة مقابلة شخصية لمرشح جديد:
• الاسم: ${v.candidateName || 'مرشح كفاءة'}
• الوظيفة المستهدفة: **${v.roleTitle || 'مهندس إنتاج وأعمال خشبية'}**
• موعد المقابلة: ${v.interviewSlot || 'الأحد القادم · 11:00 ص'}

يرجى مراجعة السيرة الذاتية عبر المنظومة قبل موعد المقابلة.`,
    generateTextEn: (v) =>
`HR Notification — **Candidate Interview Scheduled**:

Dear: ${v.interviewerName || 'Hiring Manager'}

An interview has been coordinated for an applicant:
• Candidate: ${v.candidateName || 'Applicant'}
• Role: **${v.roleTitle || 'Production & Woodwork Engineer'}**
• Date & Time: ${v.interviewSlot || 'Next Sunday · 11:00 AM'}

Please review candidate file in the ATS prior to the session.`,
  },

  {
    id: 'emp_shift_safety_notice',
    audience: 'employees',
    titleAr: 'تعميم السلامة والصحة المهنية بمصانع المجموعة',
    titleEn: 'Factory HSE & Safety Directive Notice',
    badgeAr: 'السلامة والجودة',
    badgeEn: 'HSE & Safety',
    badgeColor: 'amber',
    descriptionAr: 'توجيهات وتعليمات السلامة الدورية لفريق الورش والمصانع.',
    descriptionEn: 'HSE safety directives for factory workers and machinery operators.',
    suggestedVariables: ['factoryName', 'directiveTopic', 'effectiveDate'],
    generateTextAr: (v) =>
`تعميم إداري — **السلامة والصحة المهنية بالمصانع**:

إلى كافة منسوبي: **${v.factoryName || 'مصانع مجموعة دبليو دي (الرياض ونجران)'}**

موضوع التعميم: ${v.directiveTopic || 'الالتزام التام بارتداء مهمات الوقاية الشخصية وتشغيل أنظمة شفط النشارة'}
تاريخ السريان: ${v.effectiveDate || 'فوري ونافذ'}

نؤكد على أن سلامة العاملين هي الأولوية القصوى. يرجى من جميع المشرفين متابعة التطبيق الدقيق.`,
    generateTextEn: (v) =>
`Internal Safety Directive — **HSE Compliance**:

To all team members at: **${v.factoryName || 'WD Group Factories (Riyadh & Najran)'}**

Subject: ${v.directiveTopic || 'Mandatory Personal Protective Equipment (PPE) & Dust Extraction Systems'}
Effective: ${v.effectiveDate || 'Immediate'}

Workplace safety is our utmost priority. All supervisors must audit compliance continuously.`,
  },
];

/**
 * Format raw Saudi or international phone number for WhatsApp deep link.
 */
export function formatWhatsAppPhone(rawPhone: string): string {
  const digits = rawPhone.replace(/[^0-9]/g, '');
  if (digits.startsWith('00')) return digits.slice(2);
  if (digits.startsWith('05')) return `966${digits.slice(1)}`;
  if (digits.startsWith('5') && digits.length === 9) return `966${digits}`;
  return digits || OFFICIAL_WHATSAPP_NUMBER;
}

/**
 * Generate a direct click-to-chat URL for WhatsApp.
 */
export function generateWhatsAppChatUrl(phone: string, text: string): string {
  const cleanPhone = formatWhatsAppPhone(phone);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
