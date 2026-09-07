'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import type { SiteContentPayload, ChatbotConfig, StarterPromptItem } from '@/lib/admin/types';
import { DEFAULT_CHATBOT_CONFIG, buildChatbotSystemPrompt } from '@/lib/admin/chatbot';
import BilingualInput from '@/components/admin/BilingualInput';
import {
  Bot,
  User,
  Sparkles,
  Sliders,
  MessageSquare,
  FileText,
  Phone,
  ShieldCheck,
  Send,
  RefreshCw,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Check,
  Building2,
  Factory,
  ArrowRight,
  ExternalLink,
  Cpu,
  Zap,
  Globe,
  Lock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  MoveUp,
  MoveDown
} from 'lucide-react';

interface ChatbotControlCenterProps {
  content: SiteContentPayload;
  setContent: React.Dispatch<React.SetStateAction<SiteContentPayload | null>>;
}

export default function ChatbotControlCenter({ content, setContent }: ChatbotControlCenterProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'persona' | 'messages' | 'actions' | 'backend' | 'playground'>('persona');
  const [showApiKey, setShowApiKey] = useState(false);

  // Playground state
  const [testInput, setTestInput] = useState('مرحباً سلطان، ما هي شركات وأنشطة مجموعة WD القابضة؟');
  const [testResult, setTestResult] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  // New Starter Prompt Modal/Inline form state
  const [newPromptLabelAr, setNewPromptLabelAr] = useState('');
  const [newPromptLabelEn, setNewPromptLabelEn] = useState('');
  const [newPromptMsgAr, setNewPromptMsgAr] = useState('');
  const [newPromptMsgEn, setNewPromptMsgEn] = useState('');

  const s = content.settings;
  const chatbot: ChatbotConfig = {
    ...DEFAULT_CHATBOT_CONFIG,
    ...(s.chatbot || {}),
    starter_prompts: Array.isArray(s.chatbot?.starter_prompts) && s.chatbot.starter_prompts.length > 0
      ? s.chatbot.starter_prompts
      : DEFAULT_CHATBOT_CONFIG.starter_prompts,
    quick_actions: {
      ...DEFAULT_CHATBOT_CONFIG.quick_actions,
      ...(s.chatbot?.quick_actions || {}),
    },
    sector_knowledge: {
      ...DEFAULT_CHATBOT_CONFIG.sector_knowledge,
      ...(s.chatbot?.sector_knowledge || {}),
    },
  };

  const updateChatbot = (patch: Partial<ChatbotConfig>) => {
    const updated = { ...chatbot, ...patch };
    setContent({
      ...content,
      settings: {
        ...s,
        chatbot: updated,
      },
    });
  };

  // Starter Prompts Operations
  const handleAddPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromptLabelAr.trim() && !newPromptLabelEn.trim()) {
      showToast(isAr ? 'يرجى إدخال عنوان السؤال' : 'Please provide prompt label', 'error');
      return;
    }

    const newPrompt: StarterPromptItem = {
      id: `prompt_${Date.now()}`,
      label_ar: newPromptLabelAr.trim() || newPromptLabelEn.trim(),
      label_en: newPromptLabelEn.trim() || newPromptLabelAr.trim(),
      prompt_ar: newPromptMsgAr.trim() || newPromptMsgEn.trim() || newPromptLabelAr.trim(),
      prompt_en: newPromptMsgEn.trim() || newPromptMsgAr.trim() || newPromptLabelEn.trim(),
    };

    updateChatbot({
      starter_prompts: [...chatbot.starter_prompts, newPrompt],
    });

    setNewPromptLabelAr('');
    setNewPromptLabelEn('');
    setNewPromptMsgAr('');
    setNewPromptMsgEn('');
    showToast(isAr ? 'تمت إضافة السؤال المقترح بنجاح' : 'Starter prompt added', 'success');
  };

  const handleRemovePrompt = (id: string) => {
    const filtered = chatbot.starter_prompts.filter((p) => p.id !== id);
    updateChatbot({ starter_prompts: filtered });
    showToast(isAr ? 'تم حذف السؤال المقترح' : 'Prompt removed', 'success');
  };

  const handleMovePrompt = (index: number, direction: 'up' | 'down') => {
    const list = [...chatbot.starter_prompts];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    updateChatbot({ starter_prompts: list });
  };

  // Run Test in Playground
  const handleRunTest = async () => {
    if (!testInput.trim() || testing) return;
    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/admin/chatkit/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: testInput,
          model: chatbot.openai_model,
          temperature: chatbot.temperature,
          max_tokens: chatbot.max_tokens,
          apiKey: chatbot.openai_api_key_override || undefined,
          systemPrompt: chatbot.system_prompt_override || undefined,
        }),
      });

      const data = await res.json();
      setTestResult(data);
      if (data.success) {
        showToast(
          isAr
            ? `اكتمل الفحص بنجاح (${data.latencyMs}ms)`
            : `Test completed successfully (${data.latencyMs}ms)`,
          'success'
        );
      } else {
        showToast(data.error || (isAr ? 'فشل الفحص' : 'Test failed'), 'error');
      }
    } catch (err: any) {
      showToast(err.message || (isAr ? 'خطأ في الاتصال' : 'Connection error'), 'error');
    } finally {
      setTesting(false);
    }
  };

  const defaultPromptSample = buildChatbotSystemPrompt(DEFAULT_CHATBOT_CONFIG);

  return (
    <div className="space-y-6">

      {/* 1. Master Switch & Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#08090C] border border-white/10 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#C9A86A]/60 shrink-0 bg-black shadow-md">
            <img
              src={chatbot.avatar_url || '/brand/sultan-avatar.jpg'}
              alt={isAr ? chatbot.agent_name_ar : chatbot.agent_name_en}
              className="w-full h-full object-cover object-top"
            />
            {chatbot.enabled && (
              <span className="absolute bottom-1 right-1 rtl:right-auto rtl:left-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-black" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-extrabold text-white">
                {isAr ? chatbot.agent_name_ar : chatbot.agent_name_en}
              </h3>
              <span className="text-xs text-[#C9A86A] font-mono">
                {isAr ? chatbot.agent_title_ar : chatbot.agent_title_en}
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                  chatbot.enabled
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${chatbot.enabled ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'}`} />
                <span>{chatbot.enabled ? (isAr ? 'المساعد نشط بالموقع' : 'Active Live') : (isAr ? 'المساعد معطل' : 'Disabled')}</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 mt-0.5">
              {isAr
                ? 'التحكم الشامل في شخصية المساعد الذكي، الواجهة، الكونسيرج، والمحرك البرمجي والذكاء الاصطناعي.'
                : 'Complete control over the AI agent persona, frontend concierge UI, and backend AI model parameters.'}
            </p>
          </div>
        </div>

        {/* Master On/Off Toggle */}
        <div className="flex items-center gap-3 self-end sm:self-auto bg-[#141721] px-4 py-2.5 rounded-xl border border-white/10">
          <span className="text-xs font-bold text-zinc-200">
            {chatbot.enabled ? (isAr ? 'تشغيل المساعد' : 'Chatbot Enabled') : (isAr ? 'إيقاف المساعد' : 'Chatbot Disabled')}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={chatbot.enabled}
              onChange={(e) => updateChatbot({ enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A86A]"></div>
          </label>
        </div>
      </div>

      {/* 2. Control Tabs Navigation */}
      <div className="flex items-center gap-1.5 bg-[#08090C] p-1 rounded-2xl border border-white/10 overflow-x-auto text-xs font-mono">
        {[
          { id: 'persona', icon: Bot, labelAr: 'الهوية والشخصية', labelEn: 'Persona & Identity' },
          { id: 'messages', icon: MessageSquare, labelAr: 'الرسائل والأسئلة المقترحة', labelEn: 'Greetings & Prompts' },
          { id: 'actions', icon: Zap, labelAr: 'أزرار التحويل المباشر', labelEn: 'Quick Action Buttons' },
          { id: 'backend', icon: Cpu, labelAr: 'المحرك التقني والـ AI', labelEn: 'AI Engine & Backend' },
          { id: 'playground', icon: Sparkles, labelAr: 'مختبر الفحص المباشر', labelEn: 'Live Diagnostics' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#C9A86A] to-[#B29255] text-black font-extrabold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{isAr ? tab.labelAr : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PERSONA & IDENTITY */}
      {/* ========================================================================= */}
      {activeTab === 'persona' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Avatar Selector Card */}
          <div className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-4">
            <h4 className="text-xs font-bold text-white font-mono uppercase flex items-center gap-2">
              <User className="w-4 h-4 text-[#C9A86A]" />
              <span>{isAr ? 'صورة الوكيل الحقيقية (Avatar Portrait)' : 'Agent Portrait & Avatar'}</span>
            </h4>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#C9A86A] shadow-xl shrink-0 bg-black">
                <img
                  src={chatbot.avatar_url || '/brand/sultan-avatar.jpg'}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-300">
                    {isAr ? 'مسار أو رابط صورة الأفاتار' : 'Avatar URL / Asset Path'}
                  </label>
                  <button
                    type="button"
                    onClick={() => updateChatbot({ avatar_url: '/brand/sultan-avatar.jpg' })}
                    className="text-[11px] font-mono text-[#C9A86A] hover:underline cursor-pointer"
                  >
                    {isAr ? 'استعادة صورة سلطان الرسمية' : 'Use Official Sultan Portrait'}
                  </button>
                </div>
                <input
                  type="text"
                  value={chatbot.avatar_url}
                  onChange={(e) => updateChatbot({ avatar_url: e.target.value })}
                  placeholder="/brand/sultan-avatar.jpg"
                  className="w-full bg-[#141721] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#C9A86A]"
                  dir="ltr"
                />
                <p className="text-[11px] text-zinc-500">
                  {isAr
                    ? 'يمكنك استخدام الصورة المعتمدة لسلطان (/brand/sultan-avatar.jpg) أو وضع رابط مباشر لصورة موظف حقيقي.'
                    : 'Use Sultan’s authentic corporate Saudi portrait (/brand/sultan-avatar.jpg) or input a direct URL.'}
                </p>
              </div>
            </div>
          </div>

          {/* Persona Bilingual Names & Titles */}
          <div className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-4">
            <BilingualInput
              label={isAr ? 'اسم المساعد / الوكيل' : 'Agent Persona Name'}
              description={isAr ? 'يظهر في ترويسة نافذة المحادثة وفي رسالة الترحيب' : 'Displayed in the chat header and greeting'}
              valueEn={chatbot.agent_name_en}
              valueAr={chatbot.agent_name_ar}
              onChangeEn={(v) => updateChatbot({ agent_name_en: v })}
              onChangeAr={(v) => updateChatbot({ agent_name_ar: v })}
            />

            <BilingualInput
              label={isAr ? 'المسمى الوظيفي' : 'Job Title'}
              description={isAr ? 'مثال: مستشار خدمة العملاء والكونسيرج' : 'e.g. Customer Support & VIP Concierge'}
              valueEn={chatbot.agent_title_en}
              valueAr={chatbot.agent_title_ar}
              onChangeEn={(v) => updateChatbot({ agent_title_en: v })}
              onChangeAr={(v) => updateChatbot({ agent_title_ar: v })}
            />

            <BilingualInput
              label={isAr ? 'الإدارة / القسم' : 'Department'}
              description={isAr ? 'مثال: خدمة العملاء والاتصال المؤسسي' : 'e.g. Client Care & Corporate Communications'}
              valueEn={chatbot.agent_department_en}
              valueAr={chatbot.agent_department_ar}
              onChangeEn={(v) => updateChatbot({ agent_department_en: v })}
              onChangeAr={(v) => updateChatbot({ agent_department_ar: v })}
            />

            <BilingualInput
              label={isAr ? 'شارة الحالة' : 'Status Badge Label'}
              description={isAr ? 'مثال: متصل الآن' : 'e.g. Online'}
              valueEn={chatbot.status_label_en}
              valueAr={chatbot.status_label_ar}
              onChangeEn={(v) => updateChatbot({ status_label_en: v })}
              onChangeAr={(v) => updateChatbot({ status_label_ar: v })}
            />
          </div>

          {/* Positioning & Visual Theme */}
          <div className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-4">
            <h4 className="text-xs font-bold text-white font-mono uppercase flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#C9A86A]" />
              <span>{isAr ? 'موقع الزر واللون المميز' : 'Positioning & Theme Accent'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">
                  {isAr ? 'موقع الأيقونة العائمة بالشاشة' : 'Floating Launcher Position'}
                </label>
                <select
                  value={chatbot.position || 'bottom-right'}
                  onChange={(e) => updateChatbot({ position: e.target.value as any })}
                  className="w-full bg-[#141721] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#C9A86A]"
                >
                  <option value="bottom-right">Bottom Right (أسفل اليمين - الافتراضي)</option>
                  <option value="bottom-left">Bottom Left (أسفل اليسار)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">
                  {isAr ? 'اللون التزييني للمساعد (Hex Color)' : 'Theme Accent Color'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={chatbot.theme_color || '#C9A86A'}
                    onChange={(e) => updateChatbot({ theme_color: e.target.value })}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={chatbot.theme_color || '#C9A86A'}
                    onChange={(e) => updateChatbot({ theme_color: e.target.value })}
                    className="flex-1 bg-[#141721] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#C9A86A]"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: GREETINGS & STARTER PROMPTS */}
      {/* ========================================================================= */}
      {activeTab === 'messages' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Welcome Messages */}
          <div className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-4">
            <BilingualInput
              label={isAr ? 'رسالة الترحيب الأولى عند فتح المحادثة' : 'Welcome Message'}
              description={isAr ? 'تدعم التنسيق بالماركداون (**نص عريض** والروابط)' : 'Supports Markdown bolding and links'}
              isTextarea
              rows={3}
              valueEn={chatbot.welcome_message_en}
              valueAr={chatbot.welcome_message_ar}
              onChangeEn={(v) => updateChatbot({ welcome_message_en: v })}
              onChangeAr={(v) => updateChatbot({ welcome_message_ar: v })}
            />

            <BilingualInput
              label={isAr ? 'رسالة بدء محادثة جديدة (Reset)' : 'New Thread Reset Message'}
              description={isAr ? 'تظهر عند ضغط زر إعادة التهيئة والمحادثة الجديدة' : 'Displayed after resetting conversation'}
              isTextarea
              rows={2}
              valueEn={chatbot.reset_message_en}
              valueAr={chatbot.reset_message_ar}
              onChangeEn={(v) => updateChatbot({ reset_message_en: v })}
              onChangeAr={(v) => updateChatbot({ reset_message_ar: v })}
            />

            <BilingualInput
              label={isAr ? 'نص تلميح حقل الإدخال (Placeholder)' : 'Composer Placeholder'}
              description={isAr ? 'يظهر داخل مربع كتابة الرسالة قبل البدء بالكتابة' : 'Input placeholder text'}
              valueEn={chatbot.composer_placeholder_en}
              valueAr={chatbot.composer_placeholder_ar}
              onChangeEn={(v) => updateChatbot({ composer_placeholder_en: v })}
              onChangeAr={(v) => updateChatbot({ composer_placeholder_ar: v })}
            />
          </div>

          {/* Hint Bubble Near Floating Button */}
          <div className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C9A86A]" />
                  <span>{isAr ? 'فقاعة التلميح التفاعلية بجانب الزر العائم' : 'Floating Hint Bubble'}</span>
                </h4>
                <p className="text-[11px] text-zinc-400">
                  {isAr ? 'تظهر بجانب الأيقونة لتشجيع الزائر على التحدث مع سلطان' : 'Shown next to the floating button to attract visitors'}
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={chatbot.hint_bubble_enabled}
                  onChange={(e) => updateChatbot({ hint_bubble_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9A86A]"></div>
              </label>
            </div>

            {chatbot.hint_bubble_enabled && (
              <BilingualInput
                label={isAr ? 'نص فقاعة التلميح' : 'Hint Bubble Text'}
                valueEn={chatbot.hint_bubble_en}
                valueAr={chatbot.hint_bubble_ar}
                onChangeEn={(v) => updateChatbot({ hint_bubble_en: v })}
                onChangeAr={(v) => updateChatbot({ hint_bubble_ar: v })}
              />
            )}
          </div>

          {/* Starter Prompts Manager */}
          <div className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#C9A86A]" />
                  <span>{isAr ? 'الأسئلة الشائعة المقترحة (Starter Prompt Chips)' : 'Starter Prompt Chips'}</span>
                </h4>
                <p className="text-[11px] text-zinc-400">
                  {isAr ? 'تظهر كأزرار سريعة ينقر عليها العميل لإرسال السؤال مباشرة لسلطان' : 'Clickable topic chips for one-tap client queries'}
                </p>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10">
                {chatbot.starter_prompts.length} {isAr ? 'أسئلة مفعلة' : 'Prompts'}
              </span>
            </div>

            {/* List of prompts */}
            <div className="space-y-3">
              {chatbot.starter_prompts.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-4 rounded-xl bg-[#141721] border border-white/10 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#C9A86A]/20 text-[#C9A86A] text-xs font-mono font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {isAr ? item.label_ar : item.label_en}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMovePrompt(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title={isAr ? 'تحريك للأعلى' : 'Move Up'}
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMovePrompt(idx, 'down')}
                        disabled={idx === chatbot.starter_prompts.length - 1}
                        className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title={isAr ? 'تحريك للأسفل' : 'Move Down'}
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemovePrompt(item.id)}
                        className="p-1 rounded text-zinc-400 hover:text-rose-400 cursor-pointer transition-colors"
                        title={isAr ? 'حذف السؤال' : 'Remove Prompt'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400">{isAr ? 'عنوان الزر (بالعربية)' : 'Button Label (AR)'}</label>
                      <input
                        type="text"
                        value={item.label_ar}
                        onChange={(e) => {
                          const updated = [...chatbot.starter_prompts];
                          updated[idx] = { ...updated[idx], label_ar: e.target.value };
                          updateChatbot({ starter_prompts: updated });
                        }}
                        className="w-full bg-[#08090C] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400">{isAr ? 'عنوان الزر (بالإنجليزية)' : 'Button Label (EN)'}</label>
                      <input
                        type="text"
                        value={item.label_en}
                        onChange={(e) => {
                          const updated = [...chatbot.starter_prompts];
                          updated[idx] = { ...updated[idx], label_en: e.target.value };
                          updateChatbot({ starter_prompts: updated });
                        }}
                        className="w-full bg-[#08090C] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400">{isAr ? 'النص المرسل لسلطان (بالعربية)' : 'Prompt Message Sent (AR)'}</label>
                      <input
                        type="text"
                        value={item.prompt_ar}
                        onChange={(e) => {
                          const updated = [...chatbot.starter_prompts];
                          updated[idx] = { ...updated[idx], prompt_ar: e.target.value };
                          updateChatbot({ starter_prompts: updated });
                        }}
                        className="w-full bg-[#08090C] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400">{isAr ? 'النص المرسل لسلطان (بالإنجليزية)' : 'Prompt Message Sent (EN)'}</label>
                      <input
                        type="text"
                        value={item.prompt_en}
                        onChange={(e) => {
                          const updated = [...chatbot.starter_prompts];
                          updated[idx] = { ...updated[idx], prompt_en: e.target.value };
                          updateChatbot({ starter_prompts: updated });
                        }}
                        className="w-full bg-[#08090C] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Prompt Form */}
            <form onSubmit={handleAddPrompt} className="p-4 rounded-xl bg-[#08090C] border border-dashed border-white/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C9A86A]">
                <Plus className="w-4 h-4" />
                <span>{isAr ? 'إضافة سؤال مقترح جديد' : 'Add New Starter Prompt'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={isAr ? 'عنوان الزر بالعربية (مثال: 🏨 فنادق سويس بلو)' : 'Button Label AR'}
                  value={newPromptLabelAr}
                  onChange={(e) => setNewPromptLabelAr(e.target.value)}
                  className="bg-[#141721] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder={isAr ? 'عنوان الزر بالإنجليزية (مثال: 🏨 SwissBlue Hotels)' : 'Button Label EN'}
                  value={newPromptLabelEn}
                  onChange={(e) => setNewPromptLabelEn(e.target.value)}
                  className="bg-[#141721] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={isAr ? 'نص السؤال المرسل لسلطان (AR)' : 'Prompt Text AR'}
                  value={newPromptMsgAr}
                  onChange={(e) => setNewPromptMsgAr(e.target.value)}
                  className="bg-[#141721] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder={isAr ? 'نص السؤال المرسل لسلطان (EN)' : 'Prompt Text EN'}
                  value={newPromptMsgEn}
                  onChange={(e) => setNewPromptMsgEn(e.target.value)}
                  className="bg-[#141721] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C9A86A] hover:bg-[#d5b577] text-black font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إدراج السؤال' : 'Add Prompt'}</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: QUICK ACTIONS & CONVERSION */}
      {/* ========================================================================= */}
      {activeTab === 'actions' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-4">
            <h4 className="text-xs font-bold text-white font-mono uppercase flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#C9A86A]" />
              <span>{isAr ? 'أزرار التحويل المباشر في أسفل الشات' : 'Direct Action Conversion Bar'}</span>
            </h4>
            <p className="text-[11px] text-zinc-400">
              {isAr
                ? 'أزرار سريعة تظهر فوق حقل كتابة الرسالة لتسهيل تحويل الزائر إلى عميل حقيقي (طلب تسعير، واتساب، أو كتالوج)'
                : 'Conversion buttons pinned above the chat composer for direct lead generation.'}
            </p>

            <div className="space-y-3 pt-2">
              {/* RFP Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#141721] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/20 text-[#C9A86A] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {isAr ? 'زر طلب عرض سعر لمشروع (Submit RFP)' : 'Submit RFP Button'}
                    </span>
                    <span className="text-[10px] text-zinc-400 block">
                      {isAr ? 'يوجه الزائر مباشرة لصفحة تقديم المناقصات /contact' : 'Redirects visitor directly to /contact RFP modal'}
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chatbot.quick_actions.show_rfp}
                    onChange={(e) => updateChatbot({
                      quick_actions: { ...chatbot.quick_actions, show_rfp: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9A86A]"></div>
                </label>
              </div>

              {/* WhatsApp Toggle */}
              <div className="p-3.5 rounded-xl bg-[#141721] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {isAr ? 'زر محادثة الواتساب المباشرة (VIP WhatsApp)' : 'VIP WhatsApp Direct Button'}
                      </span>
                      <span className="text-[10px] text-zinc-400 block">
                        {isAr ? 'يفتح محادثة واتساب مشفرة مباشرة مع كونسيرج الإدارة' : 'Opens encrypted WhatsApp chat with executive concierge'}
                      </span>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={chatbot.quick_actions.show_whatsapp}
                      onChange={(e) => updateChatbot({
                        quick_actions: { ...chatbot.quick_actions, show_whatsapp: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                {chatbot.quick_actions.show_whatsapp && (
                  <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="text-xs font-bold text-zinc-300 whitespace-nowrap">
                      {isAr ? 'رقم هاتف الواتساب:' : 'WhatsApp Phone Number:'}
                    </label>
                    <input
                      type="text"
                      value={chatbot.quick_actions.whatsapp_number || '+966505725070'}
                      onChange={(e) => updateChatbot({
                        quick_actions: { ...chatbot.quick_actions, whatsapp_number: e.target.value }
                      })}
                      placeholder="+966505725070"
                      className="w-full sm:w-64 bg-[#08090C] border border-white/15 rounded-xl px-3 py-1.5 text-xs font-mono text-emerald-400"
                      dir="ltr"
                    />
                  </div>
                )}
              </div>

              {/* Catalog Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#141721] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Factory className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {isAr ? 'زر استعراض كتالوج الأثاث الفندقي (/catalog)' : 'Furniture Showroom / Catalog Button'}
                    </span>
                    <span className="text-[10px] text-zinc-400 block">
                      {isAr ? 'يوجه الزائر مباشرة لكتالوج أثاث مصنع جرين وود الفاخر' : 'Direct link to /catalog & bespoke furniture'}
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chatbot.quick_actions.show_catalog}
                    onChange={(e) => updateChatbot({
                      quick_actions: { ...chatbot.quick_actions, show_catalog: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: AI ENGINE & TECH BACKEND */}
      {/* ========================================================================= */}
      {activeTab === 'backend' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* OpenAI API Key & Model Configuration */}
          <div className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-4">
            <h4 className="text-xs font-bold text-white font-mono uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#C9A86A]" />
              <span>{isAr ? 'إعدادات محرك الذكاء الاصطناعي (OpenAI & ChatKit Engine)' : 'OpenAI & ChatKit Engine Settings'}</span>
            </h4>

            {/* Custom API Key Override */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-zinc-300 font-mono">
                  OPENAI_API_KEY_OVERRIDE (Optional)
                </label>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {chatbot.openai_api_key_override
                    ? (isAr ? 'مفتاح مخصص للشات بوت' : 'Custom key active')
                    : (isAr ? 'قيد استخدام مفتاح لوحة التحكم / البيئة' : 'Inheriting global system key')}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={chatbot.openai_api_key_override || ''}
                  onChange={(e) => updateChatbot({ openai_api_key_override: e.target.value })}
                  placeholder="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-[#141721] border border-white/15 rounded-xl px-3.5 py-2.5 pr-10 rtl:pr-3.5 rtl:pl-10 text-xs font-mono text-white focus:outline-none focus:border-[#C9A86A]"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2.5 rtl:right-auto rtl:left-2.5 top-2.5 text-zinc-400 hover:text-white"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-zinc-500">
                {isAr
                  ? 'إذا تركته فارغاً، سيستخدم المساعد تلقائياً المفتاح العام المسجل في قسم مفاتيح الربط (OPENAI_API_KEY).'
                  : 'Leave empty to inherit the global API key configured in Integrations & Secrets.'}
              </p>
            </div>

            {/* Model & Mode Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 font-mono">
                  OPENAI_MODEL
                </label>
                <select
                  value={chatbot.openai_model || 'gpt-4o'}
                  onChange={(e) => updateChatbot({ openai_model: e.target.value })}
                  className="w-full bg-[#141721] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#C9A86A]"
                >
                  <option value="gpt-4o">gpt-4o (High-Precision Bilingual Omni — Recommended)</option>
                  <option value="gpt-4o-mini">gpt-4o-mini (Lightweight & Cost-Frugal)</option>
                  <option value="gpt-4-turbo">gpt-4-turbo</option>
                  <option value="gpt-3.5-turbo">gpt-3.5-turbo (Legacy)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 font-mono">
                  CHATKIT_MODE
                </label>
                <select
                  value={chatbot.chatkit_mode || 'hybrid'}
                  onChange={(e) => updateChatbot({ chatkit_mode: e.target.value as any })}
                  className="w-full bg-[#141721] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#C9A86A]"
                >
                  <option value="hybrid">Hybrid SSE Streaming + Offline Fallback (Recommended)</option>
                  <option value="custom_server">Custom Self-Hosted (/api/chatkit)</option>
                  <option value="official_cdn">Official OpenAI Web Component (CDN)</option>
                </select>
              </div>
            </div>

            {/* Sliders: Temperature & Max Tokens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-zinc-300 font-mono">TEMPERATURE</label>
                  <span className="font-mono text-[#C9A86A] font-bold">{chatbot.temperature ?? 0.7}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={chatbot.temperature ?? 0.7}
                  onChange={(e) => updateChatbot({ temperature: parseFloat(e.target.value) })}
                  className="w-full accent-[#C9A86A] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>0.0 (دقيق وحرفي)</span>
                  <span>0.7 (متوازن)</span>
                  <span>1.0 (إبداعي)</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-zinc-300 font-mono">MAX_TOKENS</label>
                  <span className="font-mono text-[#C9A86A] font-bold">{chatbot.max_tokens ?? 800}</span>
                </div>
                <input
                  type="number"
                  min={100}
                  max={4000}
                  step={50}
                  value={chatbot.max_tokens ?? 800}
                  onChange={(e) => updateChatbot({ max_tokens: parseInt(e.target.value, 10) || 800 })}
                  className="w-full bg-[#141721] border border-white/15 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#C9A86A]"
                />
                <p className="text-[10px] text-zinc-500">
                  {isAr ? 'الحد الأقصى لطول إجابة سلطان (موصى به: 600 - 1200 رمز)' : 'Token output limit per response (Recommended: 600 - 1200 tokens)'}
                </p>
              </div>
            </div>

            {/* Strict Language Directive Toggle */}
            <div className="p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-white block">
                  {isAr ? 'فرض مطابقة لغة العميل الصارمة (Strict Language Matching)' : 'Strict Client Language Matching'}
                </span>
                <span className="text-[11px] text-zinc-400 block">
                  {isAr
                    ? 'عند التفعيل: إذا كتب العميل بالعربية يجيبه سلطان بالعربية فقط، وإذا كتب بالإنجليزية يجيبه بالإنجليزية فقط بدون أي خلط.'
                    : 'When client asks in Arabic -> 100% Arabic reply. When client asks in English -> 100% English reply.'}
                </span>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={chatbot.strict_language_matching}
                  onChange={(e) => updateChatbot({ strict_language_matching: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A86A]"></div>
              </label>
            </div>
          </div>

          {/* Sector Knowledge Base Toggles */}
          <div className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-4">
            <h4 className="text-xs font-bold text-white font-mono uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C9A86A]" />
              <span>{isAr ? 'وحدات المعرفة القطاعية المضمنة في ذهن سلطان' : 'Sector Knowledge Base Modules'}</span>
            </h4>
            <p className="text-[11px] text-zinc-400">
              {isAr
                ? 'حدد القطاعات التي يمتلك سلطان معرفة متعمقة عنها وروابط لصفحاتها الرسمية'
                : 'Select sectors and subsidiaries injected into Sultan’s prompt and grounded memory.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                {
                  key: 'hospitality',
                  labelAr: 'قطاع الضيافة (فنادق سويس بلو SwissBlue)',
                  labelEn: 'Hospitality Sector (SwissBlue Hotels)',
                  icon: Building2,
                },
                {
                  key: 'manufacturing',
                  labelAr: 'التصنيع الصناعي (مصنع جرين وود للأثاث)',
                  labelEn: 'Manufacturing Sector (GreenWood Furniture)',
                  icon: Factory,
                },
                {
                  key: 'contracting',
                  labelAr: 'المقاولات العامة والتجهيزات الفندقية',
                  labelEn: 'General Contracting & Interior Fit-out',
                  icon: ShieldCheck,
                },
                {
                  key: 'ecommerce',
                  labelAr: 'متجر وكتالوج الأثاث الفاخر (/catalog)',
                  labelEn: 'E-Commerce & Furniture Catalog',
                  icon: Sparkles,
                },
                {
                  key: 'corporate',
                  labelAr: 'الهوية القابضة، الوظائف، وواتساب الإدارة',
                  labelEn: 'Corporate Holding, Careers & VIP WhatsApp',
                  icon: Globe,
                },
              ].map((sec) => {
                const Icon = sec.icon;
                const isChecked = Boolean((chatbot.sector_knowledge as any)[sec.key]);
                return (
                  <label
                    key={sec.key}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-[#141721] border-[#C9A86A]/40 text-white'
                        : 'bg-[#08090C] border-white/5 text-zinc-500 hover:border-white/10'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        updateChatbot({
                          sector_knowledge: {
                            ...chatbot.sector_knowledge,
                            [sec.key]: e.target.checked,
                          },
                        });
                      }}
                      className="rounded text-[#C9A86A] focus:ring-0 w-4 h-4"
                    />
                    <Icon className="w-4 h-4 text-[#C9A86A] shrink-0" />
                    <span className="text-xs font-semibold">{isAr ? sec.labelAr : sec.labelEn}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* System Prompt Override */}
          <div className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#C9A86A]" />
                  <span>{isAr ? 'تخصيص الـ System Prompt بالكامل (تجاوز متقدم)' : 'Custom System Prompt Override'}</span>
                </h4>
                <p className="text-[11px] text-zinc-400">
                  {isAr
                    ? 'اتركه فارغاً ليقوم النظام بتوليد البرومبت آلياً بالاستناد إلى هوية سلطان والقطاعات المفعلة أعلاه.'
                    : 'Leave blank to let the system automatically build the prompt from Sultan’s identity and active sectors.'}
                </p>
              </div>

              {chatbot.system_prompt_override && (
                <button
                  type="button"
                  onClick={() => {
                    updateChatbot({ system_prompt_override: '' });
                    showToast(isAr ? 'تمت استعادة البرومبت الافتراضي' : 'Reset to default prompt', 'success');
                  }}
                  className="text-xs font-mono text-rose-400 hover:text-rose-300 underline cursor-pointer"
                >
                  {isAr ? 'استعادة الافتراضي' : 'Reset to Default'}
                </button>
              )}
            </div>

            <textarea
              rows={8}
              value={chatbot.system_prompt_override || ''}
              onChange={(e) => updateChatbot({ system_prompt_override: e.target.value })}
              placeholder={defaultPromptSample}
              className="w-full bg-[#141721] border border-white/15 rounded-xl p-3.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-[#C9A86A] leading-relaxed"
            />
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>{chatbot.system_prompt_override ? (isAr ? 'قيد استخدام برومبت مخصص' : 'Custom Override Active') : (isAr ? 'البرومبت التلقائي الذكي نشط' : 'Automatic Dynamic Prompt Active')}</span>
              <span>{chatbot.system_prompt_override?.length || 0} chars</span>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: LIVE PLAYGROUND & DIAGNOSTICS */}
      {/* ========================================================================= */}
      {activeTab === 'playground' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C9A86A]" />
                  <span>{isAr ? 'مختبر فحص ردود سلطان ومحاكي الذكاء الاصطناعي' : 'Sultan AI Live Diagnostic Playground'}</span>
                </h4>
                <p className="text-[11px] text-zinc-400">
                  {isAr
                    ? 'اختبر إجابات سلطان مباشرة وتأكد من جودة الرد واللغة والسرعة قبل نشر التعديلات للزوار.'
                    : 'Test Sultan’s responses live with the current configuration, latency, and language compliance.'}
                </p>
              </div>

              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Model: {chatbot.openai_model}
              </span>
            </div>

            {/* Quick Sample Questions */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-zinc-400">
                {isAr ? 'أسئلة تجريبية سريعة:' : 'Quick Presets:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'ما هي شركات وأنشطة مجموعة WD القابضة؟',
                  'أخبرني عن فنادق سويس بلو وتفاصيل قطاع الضيافة',
                  'What are the capabilities of GreenWood factory in Riyadh?',
                  'كيف أقدم طلب عرض سعر أو منافسة لمشروع مقاولات؟',
                  'هل تقدمون خدمات توريد أثاث الفنادق 5 نجوم؟',
                ].map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setTestInput(q)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer text-start"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Composer */}
            <div className="space-y-2">
              <textarea
                rows={3}
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder={isAr ? 'اكتب سؤالاً لسلطان لاختبار استجابته...' : 'Type a question to test Sultan...'}
                className="w-full bg-[#141721] border border-white/15 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#C9A86A]"
              />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500">
                  {isAr ? 'سيتم الفحص باستخدام الإعدادات والمفاتيح الحالية' : 'Tests against currently configured parameters'}
                </span>

                <button
                  type="button"
                  onClick={handleRunTest}
                  disabled={testing || !testInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#B29255] hover:from-[#d5b577] hover:to-[#be9d5f] disabled:opacity-40 text-black font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer disabled:cursor-not-allowed transition-all"
                >
                  {testing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>{isAr ? 'جارٍ توليد الرد من سلطان…' : 'Generating Sultan Reply…'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                      <span>{isAr ? 'تشغيل الفحص المباشر' : 'Send Test Query'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Diagnostic Output Results */}
            {testResult && (
              <div className="pt-4 border-t border-white/10 space-y-4 animate-in fade-in duration-200">
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-[#141721] border border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded ${testResult.success ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {testResult.success ? 'SUCCESS 200' : 'FAILED'}
                    </span>
                    <span className="text-zinc-300">Latency: {testResult.latencyMs}ms</span>
                    {testResult.tokensUsed !== undefined && (
                      <span className="text-zinc-300">Tokens: {testResult.tokensUsed}</span>
                    )}
                    {testResult.detectedLanguage && (
                      <span className="text-zinc-300">Lang: {testResult.detectedLanguage.toUpperCase()}</span>
                    )}
                  </div>
                  <span className="text-[#C9A86A]">{testResult.model || chatbot.openai_model}</span>
                </div>

                {/* Sultan Reply Card */}
                {testResult.success && (
                  <div className="p-4 rounded-xl bg-[#141721]/90 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#C9A86A]">
                      <div className="w-5 h-5 rounded-full overflow-hidden border border-[#C9A86A]">
                        <img src={chatbot.avatar_url} alt="Sultan" className="w-full h-full object-cover" />
                      </div>
                      <span>{isAr ? 'رد سلطان:' : 'Sultan’s Generated Reply:'}</span>
                    </div>
                    <div className="text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed">
                      {testResult.reply}
                    </div>
                  </div>
                )}

                {!testResult.success && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-1">
                    <div className="flex items-center gap-2 font-bold">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{isAr ? 'خطأ أثناء الفحص:' : 'Diagnostic Error:'}</span>
                    </div>
                    <p className="font-mono">{testResult.error}</p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
