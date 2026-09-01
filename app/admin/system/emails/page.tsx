'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  Tablet,
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Send,
  UserCheck,
  FileText,
  Key,
  ShoppingBag,
  Bell,
  Code2,
  Eye,
  RefreshCw,
  Globe
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';

interface EmailTemplateMeta {
  id: string;
  titleAr: string;
  titleEn: string;
  badgeAr: string;
  badgeEn: string;
  badgeType: 'gold' | 'blue' | 'emerald' | 'amber';
  icon: any;
  descAr: string;
  descEn: string;
  subjectAr: string;
  subjectEn: string;
  triggerAr: string;
  triggerEn: string;
  iframeDocAr: string;
  iframeDocEn: string;
}

export default function EmailTemplatesAdminPage() {
  const { lang: uiLang } = useLanguage();
  const isArUi = uiLang === 'ar';
  const { showToast } = useToast();

  const [templateLang, setTemplateLang] = useState<'ar' | 'en'>('ar');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewSource, setViewSource] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  const isTemplateAr = templateLang === 'ar';

  const templates: EmailTemplateMeta[] = [
    {
      id: 'client-inquiry',
      titleAr: '1. تأكيد استلام الاستفسار التجاري (للعميل)',
      titleEn: '1. Commercial Inquiry Confirmation (Client)',
      badgeAr: 'استفسارات العملاء',
      badgeEn: 'Client Relations',
      badgeType: 'gold',
      icon: Mail,
      descAr: 'تصل للعميل فور تعبئة نموذج التواصل على الموقع، وتتضمن رقماً مرجعياً رسمياً (WD-INQ) مع التعهد بالرد خلال 24 ساعة.',
      descEn: 'Dispatched to clients upon submitting an inquiry with an official reference ID and 24-hour response commitment.',
      subjectAr: 'شكراً لتواصلكم مع مجموعة دبليو دي للأعمال [مرجع: WD-INQ-849201]',
      subjectEn: 'Thank you for contacting WD Group [Ref: WD-INQ-849201]',
      triggerAr: 'عند إرسال زائر استفساراً من صفحة /contact أو صفحات القطاعات.',
      triggerEn: 'Triggered when a visitor submits an inquiry via /contact or sector pages.',
      iframeDocAr: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:20px;background:#08090C;color:#E4E4E7;font-family:'Cairo',-apple-system,sans-serif;direction:rtl;text-align:right;}</style></head><body><div style="max-width:600px;margin:0 auto;background:#0F1117;border:1px solid #232733;border-radius:20px;overflow:hidden;"><div style="height:4px;background:linear-gradient(90deg,#E3C58A,#C9A86A,#2563EB,#E3C58A);"></div><div style="padding:32px 24px;text-align:center;background:#141722;border-bottom:1px solid #1F2430;"><div style="width:44px;height:44px;margin:0 auto 10px;background:#1E2330;border:1px solid rgba(201,168,106,0.4);border-radius:10px;line-height:44px;font-weight:900;color:#E3C58A;font-family:monospace;font-size:18px;">WD</div><h1 style="margin:0;color:#FFF;font-size:22px;">مجموعة دبليو دي للأعمال</h1><p style="margin:4px 0 0;color:#C9A86A;font-size:11px;font-weight:bold;">قطاع الضيافة · التصنيع · المقاولات العامة</p></div><div style="padding:32px 24px;line-height:1.65;font-size:14px;"><span style="display:inline-block;padding:3px 10px;border-radius:100px;font-size:10px;font-weight:bold;background:rgba(201,168,106,0.15);color:#E3C58A;border:1px solid rgba(201,168,106,0.3);margin-bottom:14px;">استفسار تجاري رسمي</span><h2 style="margin:0 0 16px;color:#FFF;font-size:18px;">تم استلام استفساركم التجاري بنجاح</h2><p style="margin-top:0;">سعادة الأستاذ/ <strong>م. سلطان العتيبي</strong> المحترم،</p><p>نشكركم على تواصلكم مع <strong>مجموعة دبليو دي للأعمال</strong>. نود إحاطتكم بأنه تم استلام استفساركم التجاري بنجاح، وجارٍ توجيهه للفريق التنفيذي المختص.</p><div style="background:#141722;border:1px solid #232733;border-right:4px solid #C9A86A;border-radius:12px;padding:16px;margin:20px 0;"><p style="margin:0 0 8px;font-size:11px;color:#C9A86A;font-weight:bold;font-family:monospace;">الرقم المرجعي للاستفسار: WD-INQ-849201</p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">القطاع المستهدف:</strong> <span style="color:#E3C58A;">قطاع التصنيع والأثاث (GreenWood)</span></p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">الموضوع:</strong> توريد أثاث وتشطيبات خشبية لـ 120 وحدة فندقية بالرياض</p></div><div style="background:rgba(37,99,235,0.08);border:1px solid rgba(37,99,235,0.2);border-radius:12px;padding:12px 16px;margin:20px 0;color:#93C5FD;font-size:12px;">⚡ <strong>التزام مستوى الخدمة:</strong> تم إسناد طلبكم إلى مستشار القطاع المختص وسيتم التواصل معكم رسمياً خلال <strong>24 ساعة عمل</strong>.</div><div style="text-align:center;margin:28px 0;"><a href="https://wdgroup.online/sectors/manufacturing" target="_blank" style="display:inline-block;padding:12px 30px;background:linear-gradient(135deg,#E3C58A,#C9A86A);color:#08090C;text-decoration:none;font-weight:bold;border-radius:10px;font-size:12px;">استكشاف قطاعات المنظومة &larr;</a></div><p style="margin-top:24px;font-size:12px;color:#A1A1AA;">وتفضلوا بقبول وافر الاحترام والتقدير،<br><strong style="color:#FFF;">العلاقات التجارية — مجموعة دبليو دي</strong></p></div><div style="padding:20px;background:#08090C;border-top:1px solid #1A1E27;text-align:center;font-size:10px;color:#71717A;">مجموعة دبليو دي للأعمال © 2026 · الرياض · جدة · نجران · المملكة العربية السعودية</div></div></body></html>`,
      iframeDocEn: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:20px;background:#08090C;color:#E4E4E7;font-family:-apple-system,sans-serif;}</style></head><body><div style="max-width:600px;margin:0 auto;background:#0F1117;border:1px solid #232733;border-radius:20px;overflow:hidden;"><div style="height:4px;background:linear-gradient(90deg,#E3C58A,#C9A86A,#2563EB,#E3C58A);"></div><div style="padding:32px 24px;text-align:center;background:#141722;border-bottom:1px solid #1F2430;"><div style="width:44px;height:44px;margin:0 auto 10px;background:#1E2330;border:1px solid rgba(201,168,106,0.4);border-radius:10px;line-height:44px;font-weight:900;color:#E3C58A;font-family:monospace;font-size:18px;">WD</div><h1 style="margin:0;color:#FFF;font-size:22px;letter-spacing:1px;">WD GROUP</h1><p style="margin:4px 0 0;color:#C9A86A;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;font-family:monospace;">Hospitality · Manufacturing · Contracting</p></div><div style="padding:32px 24px;line-height:1.65;font-size:14px;"><span style="display:inline-block;padding:3px 10px;border-radius:100px;font-size:10px;font-weight:bold;background:rgba(201,168,106,0.15);color:#E3C58A;border:1px solid rgba(201,168,106,0.3);margin-bottom:14px;text-transform:uppercase;font-family:monospace;">Official Commercial Inquiry</span><h2 style="margin:0 0 16px;color:#FFF;font-size:18px;">We Have Received Your Commercial Inquiry</h2><p style="margin-top:0;">Dear <strong>Eng. Sultan Al-Otaibi</strong>,</p><p>Thank you for contacting <strong>WD Group</strong>. We have officially received your commercial inquiry, and our executive sector team has been notified.</p><div style="background:#141722;border:1px solid #232733;border-left:4px solid #C9A86A;border-radius:12px;padding:16px;margin:20px 0;"><p style="margin:0 0 8px;font-size:10px;color:#C9A86A;font-weight:bold;font-family:monospace;">INQUIRY REFERENCE: WD-INQ-849201</p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">Target Sector:</strong> <span style="color:#E3C58A;">GreenWood Manufacturing</span></p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">Subject:</strong> Hotel Furnishing Package & Joinery for 120 Units</p></div><div style="text-align:center;margin:28px 0;"><a href="https://wdgroup.online/sectors/manufacturing" target="_blank" style="display:inline-block;padding:12px 30px;background:linear-gradient(135deg,#E3C58A,#C9A86A);color:#08090C;text-decoration:none;font-weight:bold;border-radius:10px;font-size:12px;text-transform:uppercase;">Explore Corporate Ecosystem &rarr;</a></div></div><div style="padding:20px;background:#08090C;border-top:1px solid #1A1E27;text-align:center;font-size:10px;color:#71717A;">WD Group © 2026 · Riyadh · Jeddah · Najran · Kingdom of Saudi Arabia</div></div></body></html>`,
    },
    {
      id: 'admin-lead',
      titleAr: '2. إشعار فريق المبيعات بعميل جديد (CRM Lead)',
      titleEn: '2. Commercial Lead Alert (Admin CRM)',
      badgeAr: 'تنبيهات الإدارة',
      badgeEn: 'CRM Dispatch',
      badgeType: 'blue',
      icon: Bell,
      descAr: 'تنبيه عاجل للإدارة التنفيذية وفريق الـ CRM يتضمن كافة بيانات العميل والشركة والرسالة للرد المباشر.',
      descEn: 'High-priority commercial lead dispatch to management with one-click CRM access and direct reply.',
      subjectAr: '🚨 [عميل جديد] م. سلطان العتيبي · قطاع التصنيع',
      subjectEn: '🚨 [New Lead] Eng. Sultan Al-Otaibi · MANUFACTURING',
      triggerAr: 'يُرسل فوراً إلى بريد الإدارة (ceo@wdgroup.online) عند وصول أي استفسار تجاري.',
      triggerEn: 'Sent immediately to admin inbox whenever a new business inquiry arrives.',
      iframeDocAr: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:20px;background:#08090C;color:#E4E4E7;font-family:'Cairo',-apple-system,sans-serif;direction:rtl;text-align:right;}</style></head><body><div style="max-width:600px;margin:0 auto;background:#0F1117;border:1px solid #232733;border-radius:20px;overflow:hidden;"><div style="height:4px;background:linear-gradient(90deg,#3B82F6,#2563EB,#60A5FA);"></div><div style="padding:32px 24px;text-align:center;background:#141722;border-bottom:1px solid #1F2430;"><h1 style="margin:0;color:#FFF;font-size:22px;">مجموعة دبليو دي للأعمال</h1><p style="margin:4px 0 0;color:#60A5FA;font-size:11px;font-weight:bold;">إدارة علاقات العملاء وفرص المبيعات (CRM)</p></div><div style="padding:32px 24px;line-height:1.65;font-size:14px;"><span style="display:inline-block;padding:3px 10px;border-radius:100px;font-size:10px;font-weight:bold;background:rgba(37,99,235,0.15);color:#60A5FA;border:1px solid rgba(37,99,235,0.3);margin-bottom:14px;">إشعار CRM فوري</span><h2 style="margin:0 0 16px;color:#FFF;font-size:18px;">استفسار تجاري جديد وارد</h2><div style="background:#141722;border:1px solid #232733;border-right:4px solid #3B82F6;border-radius:12px;padding:16px;margin:20px 0;"><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">اسم العميل:</strong> <span style="color:#FFF;font-weight:bold;">م. سلطان العتيبي</span></p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">البريد الإلكتروني:</strong> <span style="color:#60A5FA;">sultan@otaibigroup.sa</span></p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">الجوال:</strong> <span style="color:#34D399;font-weight:bold;direction:ltr;display:inline-block;">+966 50 123 4567</span></p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">الشركة:</strong> مجموعة العتيبي للتطوير العقاري</p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">القطاع المطلوب:</strong> <span style="color:#E3C58A;font-weight:bold;">قطاع التصنيع والأثاث</span></p><div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06);color:#F4F4F5;font-size:12px;background:#0B0D14;padding:10px;border-radius:6px;">"نقوم حالياً بتطوير فندق بوتيك يضم 120 وحدة بالرياض ونرغب في التعاقد لتوريد الأبواب والأعمال الخشبية والمفروشات."</div></div><div style="text-align:center;margin:28px 0;"><a href="https://wdgroup.online/admin/crm/inquiries" target="_blank" style="display:inline-block;padding:12px 30px;background:linear-gradient(135deg,#3B82F6,#2563EB);color:#FFF;text-decoration:none;font-weight:bold;border-radius:10px;font-size:12px;">فتح الاستفسار في لوحة التحكم &larr;</a></div></div><div style="padding:20px;background:#08090C;border-top:1px solid #1A1E27;text-align:center;font-size:10px;color:#71717A;">مجموعة دبليو دي للأعمال © 2026 · المملكة العربية السعودية</div></div></body></html>`,
      iframeDocEn: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:20px;background:#08090C;color:#E4E4E7;font-family:-apple-system,sans-serif;}</style></head><body><div style="max-width:600px;margin:0 auto;background:#0F1117;border:1px solid #232733;border-radius:20px;overflow:hidden;"><div style="height:4px;background:linear-gradient(90deg,#3B82F6,#2563EB,#60A5FA);"></div><div style="padding:32px 24px;text-align:center;background:#141722;border-bottom:1px solid #1F2430;"><h1 style="margin:0;color:#FFF;font-size:22px;letter-spacing:1px;">WD GROUP</h1><p style="margin:4px 0 0;color:#60A5FA;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;font-family:monospace;">Commercial CRM & Enterprise Leads</p></div><div style="padding:32px 24px;line-height:1.65;font-size:14px;"><h2 style="margin:0 0 16px;color:#FFF;font-size:18px;">New Commercial Inquiry Received</h2><div style="background:#141722;border:1px solid #232733;border-left:4px solid #3B82F6;border-radius:12px;padding:16px;margin:20px 0;"><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">Client:</strong> Sultan Al-Otaibi</p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">Email:</strong> sultan@otaibigroup.sa</p></div><div style="text-align:center;margin:28px 0;"><a href="https://wdgroup.online/admin/crm/inquiries" target="_blank" style="display:inline-block;padding:12px 30px;background:linear-gradient(135deg,#3B82F6,#2563EB);color:#FFF;text-decoration:none;font-weight:bold;border-radius:10px;font-size:12px;text-transform:uppercase;">Open in Admin Console CRM &rarr;</a></div></div></body></html>`,
    },
    {
      id: 'career-candidate',
      titleAr: '3. تأكيد استلام طلب التوظيف (للمرشح)',
      titleEn: '3. Job Application Confirmation (Candidate)',
      badgeAr: 'رأس المال البشري',
      badgeEn: 'Human Capital',
      badgeType: 'emerald',
      icon: UserCheck,
      descAr: 'تأكيد موجه للمتقدم بالوظيفة يتضمن رقم ملف التوظيف وشارة الحالة "قيد المراجعة برأس المال البشري".',
      descEn: 'Dispatched to applicants confirming receipt of CV with an active "Under HR Review" tracking status.',
      subjectAr: 'تم استلام طلب التوظيف: مهندس معماري أول [رقم الملف: WD-APP-592814]',
      subjectEn: 'Application Received: Senior Interior Architect [Ref: WD-APP-592814]',
      triggerAr: 'يُرسل للمرشح عند التقديم على وظيفة شاغرة عبر بوابة /careers.',
      triggerEn: 'Sent to candidates when applying for any job on the /careers portal.',
      iframeDocAr: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:20px;background:#08090C;color:#E4E4E7;font-family:'Cairo',-apple-system,sans-serif;direction:rtl;text-align:right;}</style></head><body><div style="max-width:600px;margin:0 auto;background:#0F1117;border:1px solid #232733;border-radius:20px;overflow:hidden;"><div style="height:4px;background:linear-gradient(90deg,#10B981,#059669,#34D399);"></div><div style="padding:32px 24px;text-align:center;background:#141722;border-bottom:1px solid #1F2430;"><h1 style="margin:0;color:#FFF;font-size:22px;">مجموعة دبليو دي للأعمال</h1><p style="margin:4px 0 0;color:#34D399;font-size:11px;font-weight:bold;">إدارة رأس المال البشري واستقطاب الكفاءات</p></div><div style="padding:32px 24px;line-height:1.65;font-size:14px;"><span style="display:inline-block;padding:3px 10px;border-radius:100px;font-size:10px;font-weight:bold;background:rgba(16,185,129,0.15);color:#34D399;border:1px solid rgba(16,185,129,0.3);margin-bottom:14px;">رأس المال البشري والتوظيف</span><h2 style="margin:0 0 16px;color:#FFF;font-size:18px;">تم استلام طلب توظيفكم بنجاح</h2><p style="margin-top:0;">الأستاذ/ <strong>فهد الحسيني</strong> المحترم،</p><p>نشكركم على رغبتكم في الانضمام إلى فريق <strong>مجموعة دبليو دي</strong>. نود إشعاركم باستلام طلب التقديم لشغل وظيفة <strong style="color:#60A5FA;">مهندس معماري وتصميم داخلي أول</strong>.</p><div style="background:#141722;border:1px solid #232733;border-right:4px solid #10B981;border-radius:12px;padding:16px;margin:20px 0;"><p style="margin:0 0 6px;font-size:11px;color:#34D399;font-weight:bold;font-family:monospace;">رقم ملف التقديم: WD-APP-592814</p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">المسمى الوظيفي:</strong> مهندس معماري أول</p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">حالة الطلب:</strong> <span style="color:#34D399;font-weight:bold;">قيد المراجعة برأس المال البشري</span></p></div><p>يقوم فريق التوظيف بمراجعة مؤهلاتكم وخبراتكم وسيتم التواصل معكم لتنسيق المقابلة الشخصية.</p><div style="text-align:center;margin:28px 0;"><a href="https://wdgroup.online/about" target="_blank" style="display:inline-block;padding:12px 30px;background:linear-gradient(135deg,#E3C58A,#C9A86A);color:#08090C;text-decoration:none;font-weight:bold;border-radius:10px;font-size:12px;">استكشاف رؤية المنظومة &larr;</a></div></div><div style="padding:20px;background:#08090C;border-top:1px solid #1A1E27;text-align:center;font-size:10px;color:#71717A;">مجموعة دبليو دي للأعمال © 2026 · المملكة العربية السعودية</div></div></body></html>`,
      iframeDocEn: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:20px;background:#08090C;color:#E4E4E7;font-family:-apple-system,sans-serif;}</style></head><body><div style="max-width:600px;margin:0 auto;background:#0F1117;border:1px solid #232733;border-radius:20px;overflow:hidden;"><div style="height:4px;background:linear-gradient(90deg,#10B981,#059669,#34D399);"></div><div style="padding:32px 24px;text-align:center;background:#141722;border-bottom:1px solid #1F2430;"><h1 style="margin:0;color:#FFF;font-size:22px;letter-spacing:1px;">WD GROUP</h1><p style="margin:4px 0 0;color:#34D399;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;font-family:monospace;">Human Capital & Talent Acquisition</p></div><div style="padding:32px 24px;line-height:1.65;font-size:14px;"><h2 style="margin:0 0 16px;color:#FFF;font-size:18px;">Your Application Has Been Received</h2><p>Dear <strong>Fahad Al-Husseini</strong>, thank you for applying for <strong style="color:#60A5FA;">Senior Interior Architect</strong>.</p></div></div></body></html>`,
    },
    {
      id: 'hr-ats',
      titleAr: '4. إشعار فريق التوظيف بمرشح جديد (ATS Alert)',
      titleEn: '4. Candidate Dossier Alert (HR ATS)',
      badgeAr: 'نظام التوظيف ATS',
      badgeEn: 'HR ATS System',
      badgeType: 'emerald',
      icon: FileText,
      descAr: 'تنبيه فوري لفريق الموارد البشرية يتضمن ملف المرشح الكامل وزر تحميل السيرة الذاتية ورابط LinkedIn.',
      descEn: 'Full candidate dossier alert to recruitment officers with direct resume download and candidate tracking.',
      subjectAr: '📄 [مرشح جديد] فهد الحسيني · مهندس معماري وتصميم داخلي أول',
      subjectEn: '📄 [New Application] Fahad Al-Husseini · Senior Interior Architect',
      triggerAr: 'يُرسل لفريق التوظيف بمجرد رفع أي مرشح لسيرته الذاتية.',
      triggerEn: 'Sent to the HR department when a new CV is uploaded on the site.',
      iframeDocAr: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:20px;background:#08090C;color:#E4E4E7;font-family:'Cairo',-apple-system,sans-serif;direction:rtl;text-align:right;}</style></head><body><div style="max-width:600px;margin:0 auto;background:#0F1117;border:1px solid #232733;border-radius:20px;overflow:hidden;"><div style="height:4px;background:linear-gradient(90deg,#10B981,#059669,#34D399);"></div><div style="padding:32px 24px;text-align:center;background:#141722;border-bottom:1px solid #1F2430;"><h1 style="margin:0;color:#FFF;font-size:22px;">مجموعة دبليو دي للأعمال</h1><p style="margin:4px 0 0;color:#34D399;font-size:11px;font-weight:bold;">نظام استقطاب وإدارة الكفاءات (ATS)</p></div><div style="padding:32px 24px;line-height:1.65;font-size:14px;"><span style="display:inline-block;padding:3px 10px;border-radius:100px;font-size:10px;font-weight:bold;background:rgba(16,185,129,0.15);color:#34D399;border:1px solid rgba(16,185,129,0.3);margin-bottom:14px;">تنبيه استقطاب الكفاءات</span><h2 style="margin:0 0 16px;color:#FFF;font-size:18px;">ملف مرشح جديد في نظام التوظيف</h2><div style="background:#141722;border:1px solid #232733;border-right:4px solid #10B981;border-radius:12px;padding:16px;margin:20px 0;"><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">الاسم:</strong> <span style="color:#FFF;font-weight:bold;">فهد الحسيني</span></p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">الوظيفة:</strong> <span style="color:#60A5FA;font-weight:bold;">مهندس معماري وتصميم داخلي أول</span></p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">البريد:</strong> fahad@architecture.sa</p><p style="margin:4px 0;font-size:13px;color:#A1A1AA;"><strong style="color:#FFF;">الجوال:</strong> <span style="direction:ltr;display:inline-block;">+966 55 123 4567</span></p><div style="margin-top:12px;"><a href="#" style="display:inline-block;padding:8px 16px;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);color:#34D399;text-decoration:none;font-weight:bold;font-size:12px;border-radius:6px;">📄 تحميل ومطالعة السيرة الذاتية (CV) &larr;</a></div></div><div style="text-align:center;margin:28px 0;"><a href="https://wdgroup.online/admin/hr/applications" target="_blank" style="display:inline-block;padding:12px 30px;background:linear-gradient(135deg,#10B981,#059669);color:#FFF;text-decoration:none;font-weight:bold;border-radius:10px;font-size:12px;">عرض المرشح في لوحة التوظيف &larr;</a></div></div></body></html>`,
      iframeDocEn: `<!DOCTYPE html><html><body style="background:#08090C;color:#FFF;padding:20px;font-family:sans-serif;"><div style="max-width:600px;margin:0 auto;background:#0F1117;padding:30px;border-radius:20px;border:1px solid #232733;"><h2>New Candidate Profile in Talent Pool</h2><p>Candidate: Fahad Al-Husseini (Senior Interior Architect)</p></div></body></html>`,
    },
    {
      id: 'admin-reset',
      titleAr: '5. إعادة تعيين كلمة مرور المسؤول (Security)',
      titleEn: '5. Admin Password Reset (Security)',
      badgeAr: 'الأمان والحماية',
      badgeEn: 'Security & Access',
      badgeType: 'amber',
      icon: ShieldCheck,
      descAr: 'رسالة مصادقة أمنية مشفرة تتضمن رابطاً مخصصاً لتعيين كلمة مرور جديدة صالحاً لمدة 60 دقيقة فقط.',
      descEn: 'High-security credential recovery email with an encrypted single-use link expiring in 60 minutes.',
      subjectAr: '🔐 إعادة تعيين كلمة مرور لوحة تحكم مجموعة دبليو دي',
      subjectEn: '🔐 Reset Your WD Group Admin Console Password',
      triggerAr: 'يُطلب من صفحة تسجيل الدخول عند نسيان كلمة المرور للمسؤول.',
      triggerEn: 'Triggered when an admin requests a password reset from the login screen.',
      iframeDocAr: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:20px;background:#08090C;color:#E4E4E7;font-family:'Cairo',-apple-system,sans-serif;direction:rtl;text-align:right;}</style></head><body><div style="max-width:600px;margin:0 auto;background:#0F1117;border:1px solid #232733;border-radius:20px;overflow:hidden;"><div style="height:4px;background:linear-gradient(90deg,#F59E0B,#D97706,#FBBF24);"></div><div style="padding:32px 24px;text-align:center;background:#141722;border-bottom:1px solid #1F2430;"><h1 style="margin:0;color:#FFF;font-size:22px;">مجموعة دبليو دي للأعمال</h1><p style="margin:4px 0 0;color:#FBBF24;font-size:11px;font-weight:bold;">الأمان والتحكم بصلاحيات المنصة</p></div><div style="padding:32px 24px;line-height:1.65;font-size:14px;"><span style="display:inline-block;padding:3px 10px;border-radius:100px;font-size:10px;font-weight:bold;background:rgba(245,158,11,0.15);color:#FBBF24;border:1px solid rgba(245,158,11,0.3);margin-bottom:14px;">الأمان والتحكم بالنظام</span><h2 style="margin:0 0 16px;color:#FFF;font-size:18px;">طلب إعادة تعيين كلمة المرور</h2><p style="margin-top:0;">مرحباً <strong>محمد علي الشيباني</strong>،</p><p>تم استلام طلب إعادة تعيين كلمة المرور لحسابكم في <strong>لوحة الإدارة التنفيذية لمجموعة دبليو دي</strong> (<code style="background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px;color:#E3C58A;font-family:monospace;">ceo@wdgroup.online</code>).</p><div style="background:#141722;border:1px solid #232733;border-right:4px solid #C9A86A;border-radius:12px;padding:16px;margin:20px 0;"><p style="margin:0 0 6px;font-size:13px;color:#E4E4E7;font-weight:bold;">🔐 تفاصيل رابط الأمان:</p><ul style="margin:0;padding-right:18px;font-size:12px;color:#A1A1AA;line-height:1.6;"><li>هذا الرابط صالح للاستخدام مرة واحدة فقط وينتهي تلقائياً خلال <strong>60 دقيقة</strong>.</li><li>إذا لم تقم بطلب إعادة التعيين، فحسابك محمي تماماً ولا يلزم اتخاذ أي إجراء.</li></ul></div><div style="text-align:center;margin:28px 0;"><a href="#" target="_blank" style="display:inline-block;padding:12px 30px;background:linear-gradient(135deg,#E3C58A,#C9A86A);color:#08090C;text-decoration:none;font-weight:bold;border-radius:10px;font-size:12px;">تعيين كلمة مرور جديدة &larr;</a></div></div></body></html>`,
      iframeDocEn: `<!DOCTYPE html><html><body style="background:#08090C;color:#FFF;padding:20px;font-family:sans-serif;"><div style="max-width:600px;margin:0 auto;background:#0F1117;padding:30px;border-radius:20px;border:1px solid #232733;"><h2>Admin Password Reset Request</h2><p>Hello Mohammed Ali Al-Shaibani, click below to reset your console password.</p></div></body></html>`,
    },
    {
      id: 'magic-link',
      titleAr: '6. الدخول السريع بنقرة واحدة (1-Click Magic Link)',
      titleEn: '6. 1-Click Instant Sign In (Magic Link)',
      badgeAr: 'المصادقة الفورية',
      badgeEn: 'Instant Auth',
      badgeType: 'blue',
      icon: Key,
      descAr: 'تسجيل دخول فوري وآمن للوحة الإدارة التنفيذية برابط مشفر صالح للاستخدام مرة واحدة خلال 15 دقيقة.',
      descEn: 'Passwordless one-click authentication link for executive administrators valid for 15 minutes.',
      subjectAr: '✨ الدخول السريع بنقرة واحدة: لوحة تحكم مجموعة دبليو دي',
      subjectEn: '✨ 1-Click Sign In: WD Group Admin Console',
      triggerAr: 'يُطلب عند اختيار الدخول السريع عبر رابط سحري في صفحة الدخول.',
      triggerEn: 'Dispatched when an admin requests passwordless login via magic link.',
      iframeDocAr: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:20px;background:#08090C;color:#E4E4E7;font-family:'Cairo',-apple-system,sans-serif;direction:rtl;text-align:right;}</style></head><body><div style="max-width:600px;margin:0 auto;background:#0F1117;border:1px solid #232733;border-radius:20px;overflow:hidden;"><div style="height:4px;background:linear-gradient(90deg,#3B82F6,#2563EB,#60A5FA);"></div><div style="padding:32px 24px;text-align:center;background:#141722;border-bottom:1px solid #1F2430;"><h1 style="margin:0;color:#FFF;font-size:22px;">مجموعة دبليو دي للأعمال</h1><p style="margin:4px 0 0;color:#60A5FA;font-size:11px;font-weight:bold;">المصادقة الفورية والدخول الآمن</p></div><div style="padding:32px 24px;line-height:1.65;font-size:14px;"><span style="display:inline-block;padding:3px 10px;border-radius:100px;font-size:10px;font-weight:bold;background:rgba(37,99,235,0.15);color:#60A5FA;border:1px solid rgba(37,99,235,0.3);margin-bottom:14px;">المصادقة الفورية السريعة</span><h2 style="margin:0 0 16px;color:#FFF;font-size:18px;">تسجيل الدخول الفوري للوحة الإدارة</h2><p style="margin-top:0;">مرحباً <strong>محمد علي الشيباني</strong>،</p><p>طلبتم تسجيل دخول سريع وآمن بنقرة واحدة لحسابكم في <strong>لوحة الإدارة لمجموعة دبليو دي</strong> (<code style="background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px;color:#60A5FA;font-family:monospace;">ceo@wdgroup.online</code>).</p><div style="background:#141722;border:1px solid #232733;border-right:4px solid #2563EB;border-radius:12px;padding:16px;margin:20px 0;"><p style="margin:0;font-size:13px;color:#93C5FD;line-height:1.5;">⚡ <strong>المصادقة الفورية:</strong> انقر على الزر أدناه لتسجيل الدخول مباشرة. هذا الرابط صالح للاستخدام مرة واحدة ولمدة <strong>15 دقيقة</strong> فقط.</p></div><div style="text-align:center;margin:28px 0;"><a href="#" target="_blank" style="display:inline-block;padding:12px 30px;background:linear-gradient(135deg,#3B82F6,#2563EB);color:#FFF;text-decoration:none;font-weight:bold;border-radius:10px;font-size:12px;">الدخول الآن للوحة التحكم &larr;</a></div></div></body></html>`,
      iframeDocEn: `<!DOCTYPE html><html><body style="background:#08090C;color:#FFF;padding:20px;font-family:sans-serif;"><div style="max-width:600px;margin:0 auto;background:#0F1117;padding:30px;border-radius:20px;border:1px solid #232733;"><h2>1-Click Executive Console Access</h2><p>Click below to sign in immediately (valid for 15 minutes).</p></div></body></html>`,
    },
    {
      id: 'furniture-order',
      titleAr: '7. تأكيد طلب وفاتورة تصنيع الأثاث (المتجر)',
      titleEn: '7. Furniture Order & Invoice Confirmation',
      badgeAr: 'المتجر والفواتير',
      badgeEn: 'E-Commerce Invoice',
      badgeType: 'gold',
      icon: ShoppingBag,
      descAr: 'فاتورة إلكترونية معتمدة باللغة العربية والريال السعودي (ر.س) تتضمن جدول المنتجات والكميات وضريبة القيمة المضافة.',
      descEn: 'Itemized official store invoice in Arabic and SAR with products, quantities, VAT, and delivery details.',
      subjectAr: 'تأكيد استلام طلب الأثاث [WD-ORD-2026-8819] · مجموعة دبليو دي',
      subjectEn: 'Furniture Order Confirmation [WD-ORD-2026-8819] · WD Group',
      triggerAr: 'تُرسل لمشتري الأثاث فور تأكيد الطلب في صفحة /furniture/checkout.',
      triggerEn: 'Dispatched to furniture store buyers upon successful checkout completion.',
      iframeDocAr: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:20px;background:#08090C;color:#E4E4E7;font-family:'Cairo',-apple-system,sans-serif;direction:rtl;text-align:right;}</style></head><body><div style="max-width:600px;margin:0 auto;background:#0F1117;border:1px solid #232733;border-radius:20px;overflow:hidden;"><div style="height:4px;background:linear-gradient(90deg,#E3C58A,#C9A86A,#2563EB,#E3C58A);"></div><div style="padding:32px 24px;text-align:center;background:#141722;border-bottom:1px solid #1F2430;"><h1 style="margin:0;color:#FFF;font-size:22px;">مجموعة دبليو دي للأعمال</h1><p style="margin:4px 0 0;color:#C9A86A;font-size:11px;font-weight:bold;">قطاع تصنيع الأثاث والمفروشات الفندقية</p></div><div style="padding:32px 24px;line-height:1.65;font-size:14px;"><span style="display:inline-block;padding:3px 10px;border-radius:100px;font-size:10px;font-weight:bold;background:rgba(201,168,106,0.15);color:#E3C58A;border:1px solid rgba(201,168,106,0.3);margin-bottom:14px;">تأكيد الطلب والفاتورة</span><h2 style="margin:0 0 16px;color:#FFF;font-size:18px;">تم تأكيد استلام طلبك بنجاح</h2><p style="margin-top:0;">مرحباً <strong>عبدالله الفولي</strong>،</p><p>شكراً لتسوقكم من <strong>مجموعة دبليو دي — قطاع تصنيع الأثاث والمفروشات</strong>. تم تأكيد طلبكم وجارٍ إعداده للتسليم المباشر.</p><div style="background:#141722;border:1px solid #232733;border-right:4px solid #C9A86A;border-radius:12px;padding:16px;margin:20px 0;"><table width="100%" style="border-collapse:collapse;"><tr><td colspan="2" style="padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.08);font-size:11px;color:#C9A86A;font-weight:bold;font-family:monospace;">رقم الطلب: WD-ORD-2026-8819</td></tr><tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:13px;color:#FFF;"><strong>طقم كنب الضيافة الملكي الفاخر</strong><br><span style="font-size:11px;color:#A1A1AA;">الكمية: 1</span></td><td align="left" style="font-size:13px;font-weight:bold;color:#E3C58A;font-family:monospace;direction:ltr;">14,500 ر.س</td></tr><tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:13px;color:#FFF;"><strong>طاولة طعام خشب الجوز الطبيعي مع 8 كراسي</strong><br><span style="font-size:11px;color:#A1A1AA;">الكمية: 1</span></td><td align="left" style="font-size:13px;font-weight:bold;color:#E3C58A;font-family:monospace;direction:ltr;">8,200 ر.س</td></tr><tr><td style="padding-top:12px;font-size:14px;font-weight:bold;color:#FFF;">الإجمالي النهائي (شامل 15% ضريبة القيمة المضافة):</td><td align="left" style="padding-top:12px;font-size:16px;font-weight:bold;color:#E3C58A;font-family:monospace;direction:ltr;">22,700 ر.س</td></tr></table></div><div style="text-align:center;margin:28px 0;"><a href="https://wdgroup.online/furniture" target="_blank" style="display:inline-block;padding:12px 30px;background:linear-gradient(135deg,#E3C58A,#C9A86A);color:#08090C;text-decoration:none;font-weight:bold;border-radius:10px;font-size:12px;">متابعة الطلب في المتجر &larr;</a></div></div><div style="padding:20px;background:#08090C;border-top:1px solid #1A1E27;text-align:center;font-size:10px;color:#71717A;">مجموعة دبليو دي للأعمال © 2026 · المملكة العربية السعودية</div></div></body></html>`,
      iframeDocEn: `<!DOCTYPE html><html><body style="background:#08090C;color:#FFF;padding:20px;font-family:sans-serif;"><div style="max-width:600px;margin:0 auto;background:#0F1117;padding:30px;border-radius:20px;border:1px solid #232733;"><h2>Furniture Store Order Receipt</h2><p>Order Ref: WD-ORD-2026-8819 · Total: 22,700 SAR</p></div></body></html>`,
    },
  ];

  const currentTemplate = templates[activeTab];
  const activeHtml = isTemplateAr ? currentTemplate.iframeDocAr : currentTemplate.iframeDocEn;

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(activeHtml);
    showToast(isArUi ? `تم نسخ كود الـ HTML للنسخة ${isTemplateAr ? 'العربية' : 'الإنجليزية'} بنجاح!` : 'Email HTML copied to clipboard!', 'success');
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail || !testEmail.includes('@')) {
      showToast(isArUi ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please provide a valid email', 'error');
      return;
    }

    try {
      setIsSendingTest(true);
      const res = await fetch('/api/admin/system/emails/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: currentTemplate.id,
          targetEmail: testEmail.trim(),
          lang: templateLang,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch test email');
      }

      showToast(
        isArUi 
          ? `تم إرسال نموذج البريد (${isTemplateAr ? 'باللغة العربية' : 'باللغة الإنجليزية'}) بنجاح إلى ${testEmail}!`
          : `Test email dispatched successfully in ${isTemplateAr ? 'Arabic' : 'English'} to ${testEmail}!`,
        'success'
      );
      setIsTestModalOpen(false);
    } catch (err: any) {
      showToast(err.message || (isArUi ? 'فشل إرسال الإيميل التجريبي' : 'Failed to send test email'), 'error');
    } finally {
      setIsSendingTest(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/20 text-[#C9A86A] text-xs font-mono font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isArUi ? 'منظومة رسائل البريد الإلكتروني (عربي 100% / English)' : 'TRANSACTIONAL EMAIL SYSTEM'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isArUi ? 'قوالب ونماذج البريد الإلكتروني' : 'Email Templates & Live Previews'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isArUi ? 'معاينة واختبار وتصدير كافة القوالب باللغتين العربية والإنجليزية بتصميم فاخر متوافق مع كافة برامج البريد.' : 'Review, test, and export all 7 branded transactional email templates in Arabic & English.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Language Switcher */}
          <div className="flex items-center bg-black/60 border border-white/15 rounded-xl p-1 shadow-inner">
            <button
              onClick={() => setTemplateLang('ar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                templateLang === 'ar' ? 'bg-[#C9A86A] text-[#08090C] shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🇸🇦 النسخة العربية</span>
            </button>
            <button
              onClick={() => setTemplateLang('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                templateLang === 'en' ? 'bg-[#C9A86A] text-[#08090C] shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🇬🇧 English</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsTestModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-glow-blue cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isArUi ? 'إرسال بريد تجريبي' : 'Send Test Email'}</span>
          </button>

          <a
            href="/email-preview.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span>{isArUi ? 'صفحة المعاينة المستقلة' : 'Open Showcase'}</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Template List & Live Preview Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-mono font-bold text-[#C9A86A] uppercase tracking-wider">
              {isArUi ? 'القوالب المعتمدة (7 قوالب)' : 'TEMPLATES (7 TOTAL)'}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
              {isTemplateAr ? '🇸🇦 عربي (RTL)' : '🇬🇧 English (LTR)'}
            </span>
          </div>

          <div className="space-y-2">
            {templates.map((tpl, idx) => {
              const Icon = tpl.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={tpl.id}
                  onClick={() => {
                    setActiveTab(idx);
                    setViewSource(false);
                  }}
                  className={`w-full text-start p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                    isActive
                      ? 'bg-[#141722] border-[#C9A86A] shadow-glow-camel'
                      : 'bg-[#0F1117] border-white/10 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      tpl.badgeType === 'gold' ? 'bg-[#C9A86A]/15 text-[#E3C58A] border-[#C9A86A]/30' :
                      tpl.badgeType === 'blue' ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' :
                      tpl.badgeType === 'emerald' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
                      'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    }`}>
                      {isArUi ? tpl.badgeAr : tpl.badgeEn}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#C9A86A]' : 'text-zinc-500'}`} />
                  </div>

                  <div className="text-sm font-bold text-white mt-0.5">
                    {isArUi ? tpl.titleAr : tpl.titleEn}
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {isArUi ? tpl.descAr : tpl.descEn}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview Frame & Details Area (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Active Template Meta Card */}
          <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{isArUi ? currentTemplate.titleAr : currentTemplate.titleEn}</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {isArUi ? currentTemplate.descAr : currentTemplate.descEn}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyHtml}
                  className="px-3 py-1.5 rounded-xl bg-[#C9A86A] hover:bg-[#E3C58A] text-[#08090C] text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isArUi ? 'نسخ كود HTML' : 'Copy HTML'}</span>
                </button>

                <button
                  onClick={() => setViewSource(!viewSource)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewSource
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white'
                  }`}
                >
                  {viewSource ? <Eye className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
                  <span>{viewSource ? (isArUi ? 'معاينة بصرية' : 'Visual Preview') : (isArUi ? 'كود المصدر' : 'Source Code')}</span>
                </button>
              </div>
            </div>

            {/* Subject & Trigger info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-0.5">{isArUi ? 'عنوان الرسالة المعتمد (Subject)' : 'Subject Line'}</span>
                <span className="text-white font-mono text-xs">{isTemplateAr ? currentTemplate.subjectAr : currentTemplate.subjectEn}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-0.5">{isArUi ? 'حالة الإرسال التلقائي' : 'Automation Trigger'}</span>
                <span className="text-zinc-300 text-xs">{isArUi ? currentTemplate.triggerAr : currentTemplate.triggerEn}</span>
              </div>
            </div>
          </div>

          {/* Device Controls Bar */}
          <div className="flex items-center justify-between bg-[#0F1117] border border-white/10 rounded-2xl p-3 px-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-zinc-400">
                {isTemplateAr ? '🇸🇦 العرض باللغة العربية (RTL)' : '🇬🇧 English Display (LTR)'} · {viewMode === 'desktop' ? 'Desktop Viewport (600px)' : viewMode === 'tablet' ? 'Tablet Viewport (520px)' : 'Mobile Viewport (375px)'}
              </span>
            </div>

            <div className="flex items-center bg-black/50 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('desktop')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'desktop' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>{isArUi ? 'حاسوب' : 'Desktop'}</span>
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'tablet' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>{isArUi ? 'لوحي' : 'Tablet'}</span>
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'mobile' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{isArUi ? 'هاتف' : 'Mobile'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Live Preview Box */}
          <div className="bg-[#08090C] border border-white/10 rounded-3xl p-4 sm:p-6 flex justify-center items-center overflow-hidden min-h-[640px]">
            {viewSource ? (
              <div className="w-full bg-[#0B0D14] border border-white/10 rounded-2xl p-4 overflow-x-auto max-h-[620px] text-xs font-mono text-zinc-300">
                <pre className="whitespace-pre-wrap">{activeHtml}</pre>
              </div>
            ) : (
              <div 
                className={`w-full transition-all duration-300 ${
                  viewMode === 'mobile'
                    ? 'max-w-[390px] border-4 border-zinc-800 rounded-[36px] overflow-hidden shadow-2xl bg-black p-2'
                    : viewMode === 'tablet'
                    ? 'max-w-[540px] border-2 border-zinc-800 rounded-2xl overflow-hidden shadow-xl bg-black p-2'
                    : 'max-w-[650px]'
                }`}
              >
                <iframe
                  key={`${currentTemplate.id}-${viewMode}-${templateLang}`}
                  srcDoc={activeHtml}
                  className="w-full h-[620px] rounded-xl border-none bg-[#08090C]"
                  title={currentTemplate.titleEn}
                />
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Test Email Dispatch Modal */}
      {isTestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1117] border border-white/15 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Send className="w-5 h-5 text-blue-400" />
                <span>{isArUi ? 'إرسال نموذج بريد تجريبي' : 'Dispatch Live Test Email'}</span>
              </div>
              <button
                onClick={() => setIsTestModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendTestEmail} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#141722] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">{isArUi ? 'القالب المحدد للإرسال:' : 'Selected Template:'}</span>
                <div className="text-xs font-bold text-[#E3C58A]">{isArUi ? currentTemplate.titleAr : currentTemplate.titleEn}</div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 text-[11px] text-zinc-300 font-mono">
                  <span>اللغة:</span>
                  <strong className="text-white">{isTemplateAr ? '🇸🇦 العربية (RTL)' : '🇬🇧 English'}</strong>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">
                  {isArUi ? 'البريد الإلكتروني المستلم' : 'Recipient Email Address'}
                </label>
                <input
                  type="email"
                  required
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTestModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold cursor-pointer"
                >
                  {isArUi ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSendingTest}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-glow-blue flex items-center gap-2 cursor-pointer"
                >
                  {isSendingTest ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{isSendingTest ? (isArUi ? 'جارٍ الإرسال…' : 'Sending…') : (isArUi ? 'إرسال فوري' : 'Send Now')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
