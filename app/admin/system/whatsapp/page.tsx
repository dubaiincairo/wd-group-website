'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  MessageSquare, 
  Send, 
  Smartphone, 
  Check, 
  Copy, 
  ExternalLink, 
  Users, 
  Globe, 
  Briefcase, 
  ShieldCheck, 
  RefreshCw, 
  Phone, 
  User, 
  FileText, 
  Clock, 
  Sparkles,
  CheckCheck,
  AlertCircle,
  Settings,
  Edit3,
  RotateCcw,
  Save,
  Key,
  CheckCircle2,
  XCircle,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { 
  WHATSAPP_SERVICE_TEMPLATES, 
  OFFICIAL_WHATSAPP_NUMBER, 
  formatWhatsAppPhone,
  generateWhatsAppChatUrl,
  WhatsAppAudience,
  WhatsAppServiceTemplate
} from '@/lib/whatsapp/businessService';

interface DispatchHistoryItem {
  id: string;
  recipientName: string;
  phone: string;
  audience: WhatsAppAudience;
  templateTitle: string;
  timestamp: string;
  preview: string;
  waMeUrl: string;
}

interface TemplateOverride {
  titleAr?: string;
  titleEn?: string;
  textAr?: string;
  textEn?: string;
}

export default function WhatsAppServiceAdminPage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  // Top-level Navigation Mode: 'dispatch' | 'templates' | 'config'
  const [activeMainTab, setActiveMainTab] = useState<'dispatch' | 'templates' | 'config'>('dispatch');

  // ─── TAB 1: DISPATCH & SIMULATOR STATE ───
  const [activeAudience, setActiveAudience] = useState<WhatsAppAudience>('clients');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('client_order_confirmed');
  const [templateLang, setTemplateLang] = useState<'ar' | 'en'>(isAr ? 'ar' : 'en');
  
  // Form fields for dispatch
  const [recipientPhone, setRecipientPhone] = useState('+966 50 572 5070');
  const [recipientName, setRecipientName] = useState('سلطان بن عبدالعزيز آل سعود');
  const [orderRef, setOrderRef] = useState('WD-ORD-2026-8812');
  const [totalAmount, setTotalAmount] = useState('47,662');
  const [customVariable1, setCustomVariable1] = useState('');
  const [customVariable2, setCustomVariable2] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  
  const [isSendingApi, setIsSendingApi] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<DispatchHistoryItem[]>([]);

  // ─── TAB 2: TEMPLATE EDITOR STATE ───
  const [editingTemplateId, setEditingTemplateId] = useState<string>('client_order_confirmed');
  const [templateOverrides, setTemplateOverrides] = useState<Record<string, TemplateOverride>>({});
  const [editTitleAr, setEditTitleAr] = useState('');
  const [editTitleEn, setEditTitleEn] = useState('');
  const [editTextAr, setEditTextAr] = useState('');
  const [editTextEn, setEditTextEn] = useState('');

  // ─── TAB 3: CONFIGURATION STATE ───
  const [configLoading, setConfigLoading] = useState(false);
  const [configSaving, setConfigSaving] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    tested: boolean;
    success?: boolean;
    message?: string;
    latencyMs?: number;
  }>({ tested: false });

  const [integrationsConfig, setIntegrationsConfig] = useState({
    whatsapp_provider: 'cloud_api',
    whatsapp_dispatch_phone: '+966505725070',
    whatsapp_api_key: '',
    whatsapp_phone_number_id: '',
    whatsapp_business_account_id: '',
  });

  // Load custom template overrides from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wd_whatsapp_template_overrides');
      if (saved) {
        setTemplateOverrides(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Load integrations config
  useEffect(() => {
    async function loadConfig() {
      try {
        setConfigLoading(true);
        const res = await fetch('/api/admin/content');
        if (res.ok) {
          const d = await res.json();
          const integ = d.data?.settings?.integrations;
          if (integ) {
            setIntegrationsConfig({
              whatsapp_provider: integ.whatsapp_provider || 'cloud_api',
              whatsapp_dispatch_phone: integ.whatsapp_dispatch_phone || '+966505725070',
              whatsapp_api_key: integ.whatsapp_api_key || '',
              whatsapp_phone_number_id: integ.whatsapp_phone_number_id || '',
              whatsapp_business_account_id: integ.whatsapp_business_account_id || '',
            });
          }
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setConfigLoading(false);
      }
    }
    loadConfig();
  }, []);

  // Filter templates for current audience
  const audienceTemplates = useMemo(() => {
    return WHATSAPP_SERVICE_TEMPLATES.filter(t => t.audience === activeAudience);
  }, [activeAudience]);

  // Set default template when audience changes
  useEffect(() => {
    if (audienceTemplates.length > 0) {
      setSelectedTemplateId(audienceTemplates[0].id);
      if (activeAudience === 'clients') {
        setRecipientName('سلطان بن عبدالعزيز آل سعود');
        setOrderRef('WD-ORD-2026-8812');
        setTotalAmount('47,662');
      } else if (activeAudience === 'users') {
        setRecipientName('م. ريان القحطاني');
        setOrderRef('WD-INQ-2026');
        setTotalAmount('');
      } else if (activeAudience === 'employees') {
        setRecipientName('م. فهد الغامدي');
        setOrderRef('WD-JOB-2026-104');
        setTotalAmount('');
      }
    }
  }, [activeAudience, audienceTemplates]);

  const selectedTemplate = useMemo(() => {
    return WHATSAPP_SERVICE_TEMPLATES.find(t => t.id === selectedTemplateId) || audienceTemplates[0];
  }, [selectedTemplateId, audienceTemplates]);

  // Sync editor fields when editing template changes
  useEffect(() => {
    const tmpl = WHATSAPP_SERVICE_TEMPLATES.find(t => t.id === editingTemplateId);
    if (tmpl) {
      const override = templateOverrides[tmpl.id] || {};
      setEditTitleAr(override.titleAr ?? tmpl.titleAr);
      setEditTitleEn(override.titleEn ?? tmpl.titleEn);
      
      const sampleVars = {
        customerName: '{customerName}',
        userName: '{userName}',
        employeeName: '{employeeName}',
        orderRef: '{orderRef}',
        totalAmount: '{totalAmount}',
        factoryName: '{factoryName}',
        factoryLocation: '{factoryLocation}',
        factoryTarget: '{factoryTarget}',
        factoryChoice: '{factoryChoice}',
        currentStage: '{currentStage}',
        deliveryDate: '{deliveryDate}',
        deliverySlot: '{deliverySlot}',
        leadTechnician: '{leadTechnician}',
        projectName: '{projectName}',
        proposalNumber: '{proposalNumber}',
        interestArea: '{interestArea}',
        consultantName: '{consultantName}',
        catalogLink: '{catalogLink}',
        guestName: '{guestName}',
        deadline: '{deadline}',
        itemsSummary: '{itemsSummary}',
        technicianName: '{technicianName}',
        clientName: '{clientName}',
        siteCity: '{siteCity}',
        siteDistrict: '{siteDistrict}',
        missionTime: '{missionTime}',
        interviewerName: '{interviewerName}',
        candidateName: '{candidateName}',
        roleTitle: '{roleTitle}',
        interviewSlot: '{interviewSlot}',
        directiveTopic: '{directiveTopic}',
        effectiveDate: '{effectiveDate}',
      };

      setEditTextAr(override.textAr ?? tmpl.generateTextAr(sampleVars));
      setEditTextEn(override.textEn ?? tmpl.generateTextEn(sampleVars));
    }
  }, [editingTemplateId, templateOverrides]);

  // Compute live rendered text for Simulator & Dispatch
  const liveMessageText = useMemo(() => {
    if (!selectedTemplate) return '';
    const vars: Record<string, string> = {
      customerName: recipientName,
      userName: recipientName,
      employeeName: recipientName,
      technicianName: recipientName,
      clientName: recipientName,
      interviewerName: recipientName,
      guestName: recipientName,
      orderRef: orderRef,
      proposalNumber: orderRef,
      totalAmount: totalAmount,
      factoryName: isAr ? 'مصنع الأخشاب الخضراء بالرياض' : 'Green Wood Factory (Riyadh)',
      factoryLocation: isAr ? 'مصنع الأخشاب الخضراء بالرياض' : 'Green Wood Factory (Riyadh)',
      factoryTarget: isAr ? 'مصنع الأخشاب الخضراء بالرياض' : 'Green Wood Factory (Riyadh)',
      factoryChoice: isAr ? 'مصنع الأخشاب الخضراء بالرياض' : 'Green Wood Factory (Riyadh)',
      currentStage: isAr ? 'التشكيل والقص الآلي بـ CNC والنجارة الهيكلية' : 'Precision CNC Routing & Structural Joinery',
      deliveryDate: isAr ? 'غداً (الفترة الصباحية)' : 'Tomorrow (Morning Slot)',
      deliverySlot: isAr ? '9:00 ص – 1:00 م' : '9:00 AM – 1:00 PM',
      leadTechnician: isAr ? 'م. فهد الغامدي' : 'Eng. Fahad Al-Ghamdi',
      projectName: isAr ? 'تأثيث وتجهيز أجنحة سويس بلو الفاخرة' : 'SwissBlue Luxury Suites Turnkey Fitout',
      interestArea: isAr ? 'تفصيل الأثاث الفندقي والمكتبي الفاخر' : 'Luxury Hospitality & Corporate Custom Furniture',
      consultantName: isAr ? 'سلطان' : 'Sultan',
      catalogLink: 'https://wdgroup.online/furniture',
      deadline: isAr ? 'خلال 8 أيام عمل' : 'Within 8 Business Days',
      itemsSummary: isAr ? 'طقم كنب الدرعية + طاولتي كوفي نجران' : 'Al-Diriyah Curved Sofa + Najran Travertine Tables',
      siteCity: isAr ? 'الرياض' : 'Riyadh',
      siteDistrict: isAr ? 'حي النرجس' : 'Al Narjis',
      missionTime: isAr ? 'غداً في تمام 9:30 ص' : 'Tomorrow at 9:30 AM',
      candidateName: isAr ? 'م. عبدالله الشريف' : 'Eng. Abdullah Al-Sharif',
      roleTitle: isAr ? 'مهندس إنتاج وأعمال خشبية CNC' : 'CNC Woodwork & Production Engineer',
      interviewSlot: isAr ? 'الأحد القادم · 11:00 ص' : 'Next Sunday · 11:00 AM',
      directiveTopic: isAr ? 'التطبيق الإلزامي لمهمات السلامة الصناعية وفحص أجهزة شفط الغبار' : 'Mandatory PPE protocol and dust extraction equipment audit',
      effectiveDate: isAr ? 'فوري ونافذ' : 'Immediate',
    };

    if (customVariable1) vars.custom1 = customVariable1;
    if (customVariable2) vars.custom2 = customVariable2;

    const override = templateOverrides[selectedTemplate.id];
    let text = '';
    
    if (templateLang === 'en') {
      if (override?.textEn) {
        text = override.textEn;
        Object.entries(vars).forEach(([k, v]) => {
          text = text.split(`{${k}}`).join(v);
        });
      } else {
        text = selectedTemplate.generateTextEn(vars);
      }
    } else {
      if (override?.textAr) {
        text = override.textAr;
        Object.entries(vars).forEach(([k, v]) => {
          text = text.split(`{${k}}`).join(v);
        });
      } else {
        text = selectedTemplate.generateTextAr(vars);
      }
    }

    if (customNotes.trim()) {
      text += `\n\n📌 ${isAr ? 'ملاحظة خاصة' : 'Special Note'}: ${customNotes.trim()}`;
    }

    return text;
  }, [selectedTemplate, templateLang, recipientName, orderRef, totalAmount, customVariable1, customVariable2, customNotes, isAr, templateOverrides]);

  const cleanPhone = useMemo(() => formatWhatsAppPhone(recipientPhone), [recipientPhone]);
  const waMeUrl = useMemo(() => generateWhatsAppChatUrl(cleanPhone, liveMessageText), [cleanPhone, liveMessageText]);

  // ─── ACTIONS ───
  const handleCopy = () => {
    navigator.clipboard.writeText(liveMessageText);
    setCopied(true);
    showToast(isAr ? 'تم نسخ نص الرسالة بنجاح' : 'Message copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    window.open(waMeUrl, '_blank', 'noopener,noreferrer');
    
    const newItem: DispatchHistoryItem = {
      id: `wa_${Date.now()}`,
      recipientName,
      phone: cleanPhone,
      audience: activeAudience,
      templateTitle: isAr ? selectedTemplate.titleAr : selectedTemplate.titleEn,
      timestamp: new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      preview: liveMessageText.slice(0, 75) + '...',
      waMeUrl,
    };
    setHistory(prev => [newItem, ...prev.slice(0, 9)]);
    showToast(isAr ? 'تم فتح تطبيق واتساب للأعمال' : 'WhatsApp Business opened', 'info');
  };

  const handleSendViaApi = async () => {
    try {
      setIsSendingApi(true);
      const res = await fetch('/api/admin/whatsapp/service-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          audience: activeAudience,
          recipientPhone,
          recipientName,
          language: templateLang,
          customText: liveMessageText,
          sendViaApi: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch via API');
      }

      showToast(
        isAr ? 'تم إرسال رسالة الخدمة بنجاح عبر بوابة الواتساب!' : 'WhatsApp service message dispatched successfully!',
        'success'
      );

      const newItem: DispatchHistoryItem = {
        id: `wa_${Date.now()}`,
        recipientName,
        phone: cleanPhone,
        audience: activeAudience,
        templateTitle: isAr ? selectedTemplate.titleAr : selectedTemplate.titleEn,
        timestamp: new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
        preview: liveMessageText.slice(0, 75) + '...',
        waMeUrl,
      };
      setHistory(prev => [newItem, ...prev.slice(0, 9)]);
    } catch (err: any) {
      showToast(err.message || (isAr ? 'فشل الإرسال' : 'Dispatch failed'), 'error');
    } finally {
      setIsSendingApi(false);
    }
  };

  // Save customized template
  const handleSaveTemplateOverride = () => {
    const updated = {
      ...templateOverrides,
      [editingTemplateId]: {
        titleAr: editTitleAr,
        titleEn: editTitleEn,
        textAr: editTextAr,
        textEn: editTextEn,
      },
    };
    setTemplateOverrides(updated);
    try {
      localStorage.setItem('wd_whatsapp_template_overrides', JSON.stringify(updated));
    } catch (e) {}
    showToast(isAr ? 'تم حفظ تعديلات القالب بنجاح!' : 'Template customized & saved successfully!', 'success');
  };

  // Reset template to factory default
  const handleResetTemplate = () => {
    const updated = { ...templateOverrides };
    delete updated[editingTemplateId];
    setTemplateOverrides(updated);
    try {
      localStorage.setItem('wd_whatsapp_template_overrides', JSON.stringify(updated));
    } catch (e) {}
    
    const tmpl = WHATSAPP_SERVICE_TEMPLATES.find(t => t.id === editingTemplateId);
    if (tmpl) {
      setEditTitleAr(tmpl.titleAr);
      setEditTitleEn(tmpl.titleEn);
      const sampleVars = {
        customerName: '{customerName}',
        userName: '{userName}',
        employeeName: '{employeeName}',
        orderRef: '{orderRef}',
        totalAmount: '{totalAmount}',
        factoryName: '{factoryName}',
        factoryLocation: '{factoryLocation}',
        factoryTarget: '{factoryTarget}',
        factoryChoice: '{factoryChoice}',
        currentStage: '{currentStage}',
        deliveryDate: '{deliveryDate}',
        deliverySlot: '{deliverySlot}',
        leadTechnician: '{leadTechnician}',
        projectName: '{projectName}',
        proposalNumber: '{proposalNumber}',
      };
      setEditTextAr(tmpl.generateTextAr(sampleVars));
      setEditTextEn(tmpl.generateTextEn(sampleVars));
    }
    showToast(isAr ? 'تمت استعادة النص الافتراضي للقالب' : 'Template reset to factory default', 'info');
  };

  // Save configurations to DB
  const handleSaveConfig = async () => {
    try {
      setConfigSaving(true);
      const res = await fetch('/api/admin/content');
      if (!res.ok) throw new Error('Failed to load current content');
      const d = await res.json();
      const currentContent = d.data || {};

      const updatedContent = {
        ...currentContent,
        settings: {
          ...(currentContent.settings || {}),
          integrations: {
            ...(currentContent.settings?.integrations || {}),
            whatsapp_provider: integrationsConfig.whatsapp_provider,
            whatsapp_dispatch_phone: integrationsConfig.whatsapp_dispatch_phone,
            whatsapp_api_key: integrationsConfig.whatsapp_api_key,
            whatsapp_phone_number_id: integrationsConfig.whatsapp_phone_number_id,
            whatsapp_business_account_id: integrationsConfig.whatsapp_business_account_id,
          },
        },
      };

      const putRes = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent),
      });

      if (!putRes.ok) throw new Error('Failed to persist WhatsApp configurations');
      showToast(isAr ? 'تم حفظ إعدادات الواتساب بنجاح!' : 'WhatsApp configurations saved & published!', 'success');
    } catch (err: any) {
      showToast(err.message || (isAr ? 'خطأ في الحفظ' : 'Save failed'), 'error');
    } finally {
      setConfigSaving(false);
    }
  };

  // Test WhatsApp API connection
  const handleTestConnection = async () => {
    try {
      setTestingConnection(true);
      setConnectionStatus({ tested: false });
      const res = await fetch('/api/admin/integrations/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'WhatsApp',
          providedKey: integrationsConfig.whatsapp_api_key,
        }),
      });

      const d = await res.json();
      setConnectionStatus({
        tested: true,
        success: d.success,
        message: d.message || d.error,
        latencyMs: d.latencyMs,
      });

      if (d.success) {
        showToast(isAr ? 'الاتصال ببوابة الواتساب سليم 100%' : 'WhatsApp connection verified successfully!', 'success');
      } else {
        showToast(d.error || (isAr ? 'فشل اختبار الاتصال' : 'Connection test failed'), 'error');
      }
    } catch (err: any) {
      setConnectionStatus({
        tested: true,
        success: false,
        message: err.message,
      });
      showToast(err.message, 'error');
    } finally {
      setTestingConnection(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B1510] via-[#0D1B14] to-[#0A120E] border border-emerald-500/30 shadow-[0_15px_45px_rgba(16,185,129,0.1)]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isAr ? 'بوابة واتساب الأعمال الرسمية' : 'Official WhatsApp Business Portal'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isAr ? 'مركز رسائل وتنبيهات الواتساب للأعمال' : 'WhatsApp Business Service Messages Hub'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
            {isAr 
              ? 'إدارة متكاملة لرسائل الخدمة: إرسال فوري مع محاكاة الهاتف، تحرير نصوص القوالب للعملاء والزوار والموظفين، وإعدادات الربط التقني.'
              : 'Complete WhatsApp service suite: Instant dispatch with live phone preview, bilingual template editor (clients, users, employees), and API configurations.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2.5 rounded-2xl bg-[#09100D] border border-emerald-500/20 text-right">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">{isAr ? 'رقم الإرسال المعتمد' : 'Verified Number'}</div>
            <div className="text-xs sm:text-sm font-bold text-emerald-300 font-mono" dir="ltr">
              {integrationsConfig.whatsapp_dispatch_phone || `+${OFFICIAL_WHATSAPP_NUMBER}`}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top-Level Main Tabs: Dispatch vs Template Editor vs Configuration */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0B0D14] border border-white/10 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveMainTab('dispatch')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
            activeMainTab === 'dispatch'
              ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>{isAr ? 'الإرسال الفوري والمحاكي' : 'Live Dispatch & Simulator'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab('templates')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
            activeMainTab === 'templates'
              ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>{isAr ? 'إدارة وتعديل نصوص القوالب' : 'Template Editor & Customizer'}</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/20">
            {WHATSAPP_SERVICE_TEMPLATES.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab('config')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
            activeMainTab === 'config'
              ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>{isAr ? 'إعدادات الخدمة ومفاتيح الربط' : 'Service Settings & API Keys'}</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: LIVE DISPATCH & SMARTPHONE SIMULATOR
      ───────────────────────────────────────────────────────────── */}
      {activeMainTab === 'dispatch' && (
        <div className="space-y-6">
          {/* Target Audience Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0E111A] border border-white/5 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveAudience('clients')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeAudience === 'clients'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{isAr ? 'العملاء وكبار المشترين' : 'Clients & Buyers'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAudience('users')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeAudience === 'users'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isAr ? 'مستخدمو وزوار الموقع' : 'Website Users & Leads'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAudience('employees')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeAudience === 'employees'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{isAr ? 'الموظفون وفريق العمل' : 'Employees & Staff'}</span>
            </button>
          </div>

          {/* Grid Layout: Controls & Live Phone Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Form Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Template Selector Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-zinc-300 uppercase">
                    {isAr ? 'اختر قالب رسالة الخدمة:' : 'Select Service Message Template:'}
                  </label>
                  
                  {/* Language Switcher */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-[#141722] border border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => setTemplateLang('ar')}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        templateLang === 'ar' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      العربية
                    </button>
                    <button
                      type="button"
                      onClick={() => setTemplateLang('en')}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        templateLang === 'en' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {audienceTemplates.map((tmpl) => {
                    const isSelected = tmpl.id === selectedTemplateId;
                    const override = templateOverrides[tmpl.id];
                    return (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => setSelectedTemplateId(tmpl.id)}
                        className={`text-left rtl:text-right p-4 rounded-2xl border transition-all text-xs flex flex-col justify-between gap-2.5 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40'
                            : 'bg-[#0E111A] border-white/10 hover:border-white/20 hover:bg-[#141724]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            tmpl.badgeColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-300' :
                            tmpl.badgeColor === 'blue' ? 'bg-blue-500/20 text-blue-300' :
                            tmpl.badgeColor === 'amber' ? 'bg-amber-500/20 text-amber-300' :
                            tmpl.badgeColor === 'purple' ? 'bg-purple-500/20 text-purple-300' :
                            'bg-rose-500/20 text-rose-300'
                          }`}>
                            {isAr ? tmpl.badgeAr : tmpl.badgeEn}
                          </span>
                          {override && (
                            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                              {isAr ? 'معدل' : 'Custom'}
                            </span>
                          )}
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                          )}
                        </div>

                        <div>
                          <div className="font-bold text-white text-xs sm:text-sm">
                            {isAr ? (override?.titleAr || tmpl.titleAr) : (override?.titleEn || tmpl.titleEn)}
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                            {isAr ? tmpl.descriptionAr : tmpl.descriptionEn}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recipient Details & Dynamic Parameters Form */}
              <div className="p-6 rounded-3xl bg-[#0E111A] border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'بيانات المستلم والمتغيرات الديناميكية:' : 'Recipient & Dynamic Variables:'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                      {isAr ? 'رقم الواتساب المستهدف (مع كود الدولة):' : 'Recipient WhatsApp Phone:'}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-3 rtl:left-auto rtl:right-3 top-3.5" />
                      <input
                        type="text"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        placeholder="+966 50 572 5070"
                        dir="ltr"
                        className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-[#141724] border border-white/10 focus:border-emerald-400 focus:outline-none text-xs font-mono text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                      {isAr ? 'اسم المستلم (العميل / المستخدم / الموظف):' : 'Recipient Name:'}
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder={isAr ? 'سلطان بن عبدالعزيز آل سعود' : 'Sultan Al-Saud'}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-white/10 focus:border-emerald-400 focus:outline-none text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                      {isAr ? 'رقم الطلب / مرجع المعاملة (Ref):' : 'Order / Reference Code:'}
                    </label>
                    <input
                      type="text"
                      value={orderRef}
                      onChange={(e) => setOrderRef(e.target.value)}
                      placeholder="WD-ORD-2026-8812"
                      dir="ltr"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-white/10 focus:border-emerald-400 focus:outline-none text-xs font-mono text-white"
                    />
                  </div>

                  {activeAudience === 'clients' && (
                    <div>
                      <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                        {isAr ? 'قيمة الفاتورة (ر.س):' : 'Invoice Amount (SAR):'}
                      </label>
                      <input
                        type="text"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        placeholder="47,662"
                        dir="ltr"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-white/10 focus:border-emerald-400 focus:outline-none text-xs font-mono text-white"
                      />
                    </div>
                  )}
                </div>

                {/* Custom Notes / Additions */}
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                    {isAr ? 'ملاحظة خاصة إضافية (تُلحق بنهاية الرسالة):' : 'Optional Custom Note (Appended to Message):'}
                  </label>
                  <textarea
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder={isAr ? 'مثال: يرجى التنسيق المسبق مع إدارة أمن البرج قبل الدخول...' : 'e.g. Please coordinate with building security prior to arrival...'}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-white/10 focus:border-emerald-400 focus:outline-none text-xs text-white resize-none"
                  />
                </div>
              </div>

              {/* Action Dispatch Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isAr ? 'فتح وإرسال عبر تطبيق واتساب (wa.me)' : 'Open & Send via WhatsApp (wa.me)'}</span>
                  <ExternalLink className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>

                <button
                  type="button"
                  onClick={handleSendViaApi}
                  disabled={isSendingApi}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#141724] hover:bg-[#1E2337] border border-emerald-500/30 text-emerald-300 font-bold text-xs sm:text-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className={`w-4 h-4 ${isSendingApi ? 'animate-spin' : ''}`} />
                  <span>
                    {isSendingApi 
                      ? (isAr ? 'جاري الإرسال...' : 'Sending...') 
                      : (isAr ? 'إرسال مباشر عبر API' : 'Send via Cloud API')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-bold text-xs transition-all cursor-pointer"
                  title={isAr ? 'نسخ نص الرسالة' : 'Copy message'}
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ النص' : 'Copy')}</span>
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Realistic WhatsApp Phone Simulator */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[380px] rounded-[44px] p-3.5 bg-[#1F232E] border-4 border-[#2D3344] shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative">
                
                {/* Phone Speaker Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-[#1F232E] mr-3" />
                  <span className="w-12 h-1 bg-[#2D3344] rounded-full" />
                </div>

                {/* Screen Inner */}
                <div className="w-full h-[620px] rounded-[36px] overflow-hidden flex flex-col bg-[#0B141A] relative border border-black/40">
                  
                  {/* WhatsApp Header */}
                  <div className="pt-8 pb-3 px-4 bg-[#1F2C34] border-b border-white/5 flex items-center justify-between text-white shrink-0 z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-[#141722] to-[#08090C] border border-[#C9A86A] flex items-center justify-center shrink-0">
                        <span className="font-black text-xs text-[#C9A86A]">WD</span>
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white truncate max-w-[170px]">
                            {isAr ? 'مجموعة دبليو دي للأعمال' : 'WD Group Holding'}
                          </span>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        </div>
                        <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{isAr ? 'حساب تجاري موثق' : 'Verified Business'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-zinc-400">
                      {templateLang === 'ar' ? 'العربية' : 'EN'}
                    </div>
                  </div>

                  {/* Chat Message Stream */}
                  <div 
                    className="flex-1 p-4 overflow-y-auto space-y-3 bg-[radial-gradient(#1A262D_1px,transparent_1px)] [background-size:16px_16px]"
                    dir={templateLang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {/* Official Encryption Notice */}
                    <div className="text-center my-2">
                      <span className="inline-block px-3 py-1 rounded-lg bg-[#182229] border border-white/5 text-[9px] text-amber-200/80 max-w-[280px] leading-tight">
                        🔒 {isAr ? 'الرسائل مشفرة تماماً عبر واتساب الأعمال المعتمد لمجموعة دبليو دي' : 'Messages are end-to-end encrypted with official WD Group verified business desk.'}
                      </span>
                    </div>

                    {/* WhatsApp Outgoing Bubble */}
                    <div className="flex justify-end">
                      <div className="max-w-[92%] rounded-2xl rounded-tr-none rtl:rounded-tr-2xl rtl:rounded-tl-none p-3.5 bg-[#005C4B] text-[#E9EDEF] shadow-lg text-[12px] leading-relaxed relative">
                        <div className="whitespace-pre-wrap font-sans">
                          {liveMessageText}
                        </div>

                        <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-emerald-200/70 font-mono">
                          <span>{new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                          <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Fake Bottom Bar */}
                  <div className="p-2.5 bg-[#1F2C34] border-t border-white/5 flex items-center justify-between text-zinc-400 text-xs shrink-0">
                    <div className="px-3 py-1.5 rounded-full bg-[#2A3942] text-[11px] text-zinc-400 flex-1 truncate">
                      {isAr ? 'الرد متاح عبر محادثة واتساب الرسمية...' : 'Type a message...'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Dispatch History Table */}
          {history.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#0E111A] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'سجل الإرسال الحديث (الجلسة الحالية):' : 'Recent Dispatch Audit Log:'}</span>
                </h3>
                <span className="text-xs font-mono text-zinc-400">{history.length} {isAr ? 'رسالة' : 'messages'}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-400 font-mono text-[11px]">
                      <th className="py-2.5 px-3">{isAr ? 'الوقت' : 'Time'}</th>
                      <th className="py-2.5 px-3">{isAr ? 'المستهدف' : 'Audience'}</th>
                      <th className="py-2.5 px-3">{isAr ? 'اسم المستلم' : 'Recipient'}</th>
                      <th className="py-2.5 px-3">{isAr ? 'الهاتف' : 'Phone'}</th>
                      <th className="py-2.5 px-3">{isAr ? 'نوع الرسالة' : 'Template'}</th>
                      <th className="py-2.5 px-3">{isAr ? 'إجراء' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {history.map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-3 font-mono text-zinc-400">{item.timestamp}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                            item.audience === 'clients' ? 'bg-emerald-500/20 text-emerald-300' :
                            item.audience === 'users' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-purple-500/20 text-purple-300'
                          }`}>
                            {item.audience}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-white">{item.recipientName}</td>
                        <td className="py-2.5 px-3 font-mono text-zinc-300" dir="ltr">{item.phone}</td>
                        <td className="py-2.5 px-3 text-zinc-400">{item.templateTitle}</td>
                        <td className="py-2.5 px-3">
                          <a
                            href={item.waMeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold"
                          >
                            <span>{isAr ? 'إعادة الفتح' : 'Reopen'}</span>
                            <ExternalLink className="w-3 h-3 rtl:rotate-180" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: TEMPLATE EDITOR & MANAGER (FIND & EDIT TEMPLATES)
      ───────────────────────────────────────────────────────────── */}
      {activeMainTab === 'templates' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 4 Cols: All Templates List */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-mono font-bold text-zinc-300 uppercase">
                {isAr ? 'قائمة كافة القوالب المعتمدة:' : 'All Approved Service Templates:'}
              </div>

              <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
                {WHATSAPP_SERVICE_TEMPLATES.map((tmpl) => {
                  const isEditing = tmpl.id === editingTemplateId;
                  const override = templateOverrides[tmpl.id];
                  return (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => setEditingTemplateId(tmpl.id)}
                      className={`w-full text-left rtl:text-right p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isEditing
                          ? 'bg-blue-500/10 border-blue-500/60 ring-1 ring-blue-500/30'
                          : 'bg-[#0E111A] border-white/10 hover:border-white/20 hover:bg-[#141724]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          tmpl.audience === 'clients' ? 'bg-emerald-500/20 text-emerald-300' :
                          tmpl.audience === 'users' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-purple-500/20 text-purple-300'
                        }`}>
                          {tmpl.audience}
                        </span>
                        {override && (
                          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                            {isAr ? 'مُعدل' : 'Customized'}
                          </span>
                        )}
                      </div>

                      <div className="font-bold text-white text-xs">
                        {isAr ? (override?.titleAr || tmpl.titleAr) : (override?.titleEn || tmpl.titleEn)}
                      </div>
                      <div className="text-[10px] text-zinc-400 truncate mt-1">
                        {isAr ? tmpl.descriptionAr : tmpl.descriptionEn}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 8 Cols: Interactive Template Editor */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#0E111A] border border-white/10 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <div className="text-xs font-mono text-blue-400 font-bold uppercase">
                    {isAr ? 'محرر القالب النشط' : 'Active Template Editor'}
                  </div>
                  <h2 className="text-lg font-bold text-white mt-1">
                    {editTitleAr}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetTemplate}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
                    title={isAr ? 'استعادة النص الافتراضي' : 'Reset to default'}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isAr ? 'استعادة الافتراضي' : 'Reset Default'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveTemplateOverride}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isAr ? 'حفظ تعديلات القالب' : 'Save Template'}</span>
                  </button>
                </div>
              </div>

              {/* Title Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                    {isAr ? 'عنوان القالب بالعربية:' : 'Template Title (Arabic):'}
                  </label>
                  <input
                    type="text"
                    value={editTitleAr}
                    onChange={(e) => setEditTitleAr(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-white/10 focus:border-blue-400 focus:outline-none text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                    {isAr ? 'عنوان القالب بالإنجليزية:' : 'Template Title (English):'}
                  </label>
                  <input
                    type="text"
                    value={editTitleEn}
                    onChange={(e) => setEditTitleEn(e.target.value)}
                    dir="ltr"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-white/10 focus:border-blue-400 focus:outline-none text-xs text-white"
                  />
                </div>
              </div>

              {/* Variable Chips Helper */}
              <div className="p-3.5 rounded-2xl bg-[#141724] border border-white/5 space-y-2">
                <div className="text-[11px] font-mono text-zinc-400">
                  {isAr ? 'المتغيرات المتاحة للدمج (انسخ أو انقر للإدراج):' : 'Available Dynamic Variables:'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['{customerName}', '{orderRef}', '{totalAmount}', '{factoryName}', '{currentStage}', '{deliveryDate}', '{deliverySlot}', '{leadTechnician}', '{projectName}', '{catalogLink}'].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setEditTextAr(prev => prev + ' ' + chip);
                        setEditTextEn(prev => prev + ' ' + chip);
                      }}
                      className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-400 font-mono text-[11px] border border-white/5 transition-colors cursor-pointer"
                      title={isAr ? 'انقر للإضافة بنهاية النص' : 'Click to append'}
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea Arabic */}
              <div>
                <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-bold">
                  {isAr ? 'نص رسالة الواتساب (باللغة العربية):' : 'WhatsApp Message Body (Arabic):'}
                </label>
                <textarea
                  value={editTextAr}
                  onChange={(e) => setEditTextAr(e.target.value)}
                  rows={8}
                  dir="rtl"
                  className="w-full p-4 rounded-2xl bg-[#141724] border border-white/10 focus:border-blue-400 focus:outline-none text-xs text-white leading-relaxed font-sans"
                />
              </div>

              {/* Textarea English */}
              <div>
                <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-bold">
                  {isAr ? 'نص رسالة الواتساب (باللغة الإنجليزية):' : 'WhatsApp Message Body (English):'}
                </label>
                <textarea
                  value={editTextEn}
                  onChange={(e) => setEditTextEn(e.target.value)}
                  rows={8}
                  dir="ltr"
                  className="w-full p-4 rounded-2xl bg-[#141724] border border-white/10 focus:border-blue-400 focus:outline-none text-xs text-white leading-relaxed font-sans"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: SERVICE CONFIGURATION & API KEYS
      ───────────────────────────────────────────────────────────── */}
      {activeMainTab === 'config' && (
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0E111A] border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-400" />
                <span>{isAr ? 'إعدادات ربط خدمة الواتساب للأعمال' : 'WhatsApp Business Gateway Configuration'}</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                {isAr 
                  ? 'ضبط بوابة الإرسال ومفاتيح Meta Cloud API ورقم الهاتف الرسمي لمجموعة دبليو دي.' 
                  : 'Configure official Meta Cloud API keys, provider mode, and executive sender phone number.'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleSaveConfig}
              disabled={configSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Save className={`w-4 h-4 ${configSaving ? 'animate-spin' : ''}`} />
              <span>{configSaving ? (isAr ? 'جاري الحفظ...' : 'Saving...') : (isAr ? 'حفظ ونشر الإعدادات' : 'Save Configurations')}</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Dispatch Phone Number */}
            <div>
              <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-bold">
                {isAr ? 'رقم هاتف الواتساب الرسمي المعتمد للإرسال:' : 'Official Dispatch Phone Number:'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-500 absolute left-3 rtl:left-auto rtl:right-3 top-3.5" />
                <input
                  type="text"
                  value={integrationsConfig.whatsapp_dispatch_phone}
                  onChange={(e) => setIntegrationsConfig({ ...integrationsConfig, whatsapp_dispatch_phone: e.target.value })}
                  placeholder="+966505725070"
                  dir="ltr"
                  className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-[#141724] border border-white/10 focus:border-amber-400 focus:outline-none text-xs font-mono text-white"
                />
              </div>
            </div>

            {/* Provider Selector */}
            <div>
              <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-bold">
                {isAr ? 'مزود خدمة الواتساب (WhatsApp Provider):' : 'WhatsApp Gateway Provider:'}
              </label>
              <select
                value={integrationsConfig.whatsapp_provider}
                onChange={(e) => setIntegrationsConfig({ ...integrationsConfig, whatsapp_provider: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-white/10 focus:border-amber-400 focus:outline-none text-xs text-white"
              >
                <option value="cloud_api">Meta WhatsApp Cloud API (Official Free Tier Direct)</option>
                <option value="brevo">Brevo WhatsApp Business API (Shared Account & Billing)</option>
                <option value="deep_link">Click-to-Chat Direct Links (wa.me - 100% Free, No API Keys)</option>
                <option value="twilio">Twilio Programmable WhatsApp (Legacy)</option>
                <option value="ultramsg">UltraMsg Gateway (QR-based Web Session)</option>
                <option value="wasapi">Wasapi Engine (CRM Bridge)</option>
              </select>
            </div>

            {/* API Access Token */}
            <div>
              <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-bold">
                {isAr ? 'مفتاح وصول واجهة ميتا (Meta Access Token / API Key):' : 'Meta API Access Token:'}
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-zinc-500 absolute left-3 rtl:left-auto rtl:right-3 top-3.5" />
                <input
                  type="password"
                  value={integrationsConfig.whatsapp_api_key}
                  onChange={(e) => setIntegrationsConfig({ ...integrationsConfig, whatsapp_api_key: e.target.value })}
                  placeholder="EAABw..."
                  dir="ltr"
                  className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-[#141724] border border-white/10 focus:border-amber-400 focus:outline-none text-xs font-mono text-white"
                />
              </div>
            </div>

            {/* Phone Number ID */}
            <div>
              <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-bold">
                {isAr ? 'معرف رقم الهاتف في ميتا (Phone Number ID):' : 'Meta Phone Number ID:'}
              </label>
              <input
                type="text"
                value={integrationsConfig.whatsapp_phone_number_id}
                onChange={(e) => setIntegrationsConfig({ ...integrationsConfig, whatsapp_phone_number_id: e.target.value })}
                placeholder="104928374928374"
                dir="ltr"
                className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-white/10 focus:border-amber-400 focus:outline-none text-xs font-mono text-white"
              />
            </div>

            {/* Business Account ID */}
            <div>
              <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-bold">
                {isAr ? 'معرف حساب واتساب للأعمال (WABA ID):' : 'WhatsApp Business Account ID (WABA):'}
              </label>
              <input
                type="text"
                value={integrationsConfig.whatsapp_business_account_id}
                onChange={(e) => setIntegrationsConfig({ ...integrationsConfig, whatsapp_business_account_id: e.target.value })}
                placeholder="98234729384729"
                dir="ltr"
                className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-white/10 focus:border-amber-400 focus:outline-none text-xs font-mono text-white"
              />
            </div>
          </div>

          {/* Test Connection Button & Result Box */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testingConnection || !integrationsConfig.whatsapp_api_key}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${testingConnection ? 'animate-spin' : ''}`} />
              <span>{testingConnection ? (isAr ? 'جاري الفحص...' : 'Testing...') : (isAr ? 'اختبار اتصال API' : 'Test API Connection')}</span>
            </button>

            {connectionStatus.tested && (
              <div className={`p-4 rounded-2xl border text-xs flex items-center gap-3 ${
                connectionStatus.success
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}>
                {connectionStatus.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <div>
                  <div className="font-bold">{connectionStatus.message}</div>
                  {connectionStatus.latencyMs !== undefined && (
                    <div className="text-[10px] font-mono opacity-80 mt-0.5">
                      Latency: {connectionStatus.latencyMs}ms
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
