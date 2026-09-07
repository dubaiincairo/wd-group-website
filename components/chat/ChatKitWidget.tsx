'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sparkles,
  Send,
  RotateCcw,
  X,
  ExternalLink,
  MessageCircle,
  Building2,
  Factory,
  HardHat,
  FileText,
  Check,
  Bot,
  User,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatKitWidgetProps {
  onClose: () => void;
  initialConfig?: any;
}

export default function ChatKitWidget({ onClose, initialConfig }: ChatKitWidgetProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [config, setConfig] = useState<any>(initialConfig || null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [threadId, setThreadId] = useState<string>(() => 'thread_' + Math.random().toString(36).substring(2, 9));
  const [useOfficialChatKit, setUseOfficialChatKit] = useState<boolean>(false);
  const [officialFailed, setOfficialFailed] = useState<boolean>(false);

  const officialContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Fetch config if not passed as prop
  useEffect(() => {
    if (!config) {
      fetch('/api/chatkit/config')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setConfig(data.data);
          }
        })
        .catch(() => {});
    }
  }, [config]);

  // Derived persona attributes
  const agentName = isAr ? (config?.agent_name_ar || 'سلطان') : (config?.agent_name_en || 'Sultan');
  const agentTitle = isAr ? (config?.agent_title_ar || 'خدمة العملاء') : (config?.agent_title_en || 'Client Support');
  const agentDept = isAr
    ? (config?.agent_department_ar || 'مستشارك الشخصي في مجموعة WD • الرياض')
    : (config?.agent_department_en || 'WD Group Client Care • Riyadh');
  const statusLabel = isAr ? (config?.status_label_ar || 'متصل الآن') : (config?.status_label_en || 'Online');
  const avatarUrl = config?.avatar_url || '/brand/sultan-avatar.jpg';
  const quickActions = config?.quick_actions || {
    show_rfp: true,
    show_whatsapp: true,
    show_catalog: true,
    whatsapp_number: '+966505725070',
  };

  // Suggested Starter Prompts
  const STARTER_PROMPTS: Array<{ label: string; prompt: string }> = (config?.starter_prompts && config.starter_prompts.length > 0)
    ? config.starter_prompts.map((p: any) => ({
        label: isAr ? p.label_ar : p.label_en,
        prompt: isAr ? p.prompt_ar : p.prompt_en,
      }))
    : (isAr
      ? [
          { label: '🏢 ما هي مجموعة WD وشركاتها؟', prompt: 'ما هي شركات وأنشطة مجموعة WD القابضة؟' },
          { label: '🏨 فنادق سويس بلو (SwissBlue)', prompt: 'أخبرني عن فنادق سويس بلو وتفاصيل قطاع الضيافة' },
          { label: '🪵 مصنع جرين وود للأثاث', prompt: 'ما هي قدرات مصنع جرين وود لتصنيع الأثاث الفندقي؟' },
          { label: '📄 طلب عرض سعر لمشروع (RFP)', prompt: 'كيف أقدم طلب عرض سعر أو منافسة لمشروع مقاولات وتأثيث؟' },
        ]
      : [
          { label: '🏢 What is WD Group?', prompt: 'Tell me about WD Group and its subsidiary sectors.' },
          { label: '🏨 SwissBlue Hotels Portfolio', prompt: 'Tell me about SwissBlue Hotels and your hospitality division.' },
          { label: '🪵 GreenWood Furniture Factory', prompt: 'What are the manufacturing capabilities of GreenWood in Riyadh?' },
          { label: '📄 Submit an RFP / Quotation', prompt: 'How can I submit an RFP or project quotation request?' },
        ]);

  // Auto-scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const defaultWelcome = isAr
        ? (config?.welcome_message_ar || `أهلاً وسهلاً بك! معك **${agentName}** من خدمة عملاء مجموعة WD القابضة بالرياض.\n\nيسعدني جداً خدمتك والإجابة عن أي استفسار يخص قطاعاتنا في **الضيافة (فنادق سويس بلو)**، **التصنيع الصناعي (مصنع جرين وود للأثاث الفاخر)**، و**المقاولات العامة والتجهيزات الفندقية**.\n\nكيف يمكنني مساعدتك اليوم؟`)
        : (config?.welcome_message_en || `Hello and welcome! I am **${agentName}**, your customer support representative at WD Group Holding in Riyadh.\n\nI am here to assist you with our **Hospitality (SwissBlue Hotels)**, **Precision Manufacturing (GreenWood Furniture)**, and **General Contracting**.\n\nHow can I help you today?`);

      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: defaultWelcome,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [isAr, config, agentName]);

  // Attempt official <openai-chatkit> mounting if script exists
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if customElements has registered openai-chatkit
    const hasWebComponent = typeof window.customElements !== 'undefined' && !!window.customElements.get('openai-chatkit');

    if (hasWebComponent && officialContainerRef.current && !officialFailed) {
      try {
        officialContainerRef.current.innerHTML = '';
        const el = document.createElement('openai-chatkit') as any;
        el.id = 'wd-chatkit-element';
        el.className = 'w-full h-full';

        el.addEventListener('chatkit.error', () => {
          setOfficialFailed(true);
          setUseOfficialChatKit(false);
        });

        if (typeof el.setOptions === 'function') {
          el.setOptions({
            apiURL: '/api/chatkit',
            theme: 'dark',
            header: {
              title: isAr ? 'المساعد الذكي لمجموعة WD' : 'WD Group AI Concierge',
            },
            newThreadView: {
              greeting: isAr ? 'مرحباً بك في مجموعة WD' : 'Welcome to WD Group',
              prompts: STARTER_PROMPTS.map((p) => p.prompt),
            },
            composer: {
              placeholder: isAr ? 'اكتب استفسارك هنا...' : 'Ask anything about WD Group...',
            },
          });
          officialContainerRef.current.appendChild(el);
          setUseOfficialChatKit(true);
        }
      } catch {
        setOfficialFailed(true);
        setUseOfficialChatKit(false);
      }
    }
  }, [officialFailed, isAr]);

  // Reset conversation
  const handleReset = () => {
    setThreadId('thread_' + Math.random().toString(36).substring(2, 9));
    const resetText = isAr
      ? (config?.reset_message_ar || `بدأنا محادثة جديدة! معك **${agentName}** من خدمة العملاء، تفضل بطرح استفسارك وسأجيبك بكل سرور.`)
      : (config?.reset_message_en || `Started a new conversation! **${agentName}** here from WD Group Client Support, feel free to ask anything and I will be glad to help.`);

    setMessages([
      {
        id: 'welcome_' + Date.now(),
        role: 'assistant',
        content: resetText,
        timestamp: Date.now(),
      },
    ]);
  };

  // Send message to /api/chatkit with SSE Streaming
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isStreaming) return;

    setInputValue('');
    const userMsgId = 'msg_' + Date.now();
    const assistantMsgId = 'msg_' + (Date.now() + 1);

    const updatedHistory: ChatMessage[] = [
      ...messages,
      { id: userMsgId, role: 'user', content: query, timestamp: Date.now() },
    ];

    setMessages(updatedHistory);
    setIsStreaming(true);

    // Placeholder assistant message
    setMessages((prev) => [
      ...prev,
      { id: assistantMsgId, role: 'assistant', content: '', timestamp: Date.now() },
    ]);

    try {
      const response = await fetch('/api/chatkit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream, application/json',
        },
        body: JSON.stringify({
          thread_id: threadId,
          message: query,
          messages: updatedHistory.map((m) => ({ role: m.role, content: m.content })),
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`ChatKit server responded with ${response.status}`);
      }

      // Read SSE stream
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/event-stream') && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data: ')) {
              try {
                const data = JSON.parse(trimmed.slice(6));
                if (data.delta) {
                  accumulated += data.delta;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMsgId ? { ...msg, content: accumulated } : msg
                    )
                  );
                } else if (data.text) {
                  accumulated = data.text;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMsgId ? { ...msg, content: accumulated } : msg
                    )
                  );
                }
              } catch {}
            }
          }
        }
      } else {
        // Fallback standard JSON
        const json = await response.json();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? { ...msg, content: json.text || 'Unable to load response' }
              : msg
          )
        );
      }
    } catch (err) {
      console.error('[ChatKit Client Send Error]:', err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: isAr
                  ? 'عذراً، حدث خطأ مؤقت في الاتصال. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب.'
                  : 'Sorry, a temporary network error occurred. Please try again or reach out via WhatsApp.',
              }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Keyboard shortcut: Enter to submit, Shift+Enter for new line
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render markdown with links and formatting
  const renderMessageContent = (content: string) => {
    // Process markdown links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      const label = match[1];
      const url = match[2];
      const isInternal = url.startsWith('/');

      parts.push(
        isInternal ? (
          <Link
            key={match.index}
            href={url}
            onClick={onClose}
            className="inline-flex items-center gap-1 text-[#C9A86A] hover:text-white font-semibold underline underline-offset-2 transition-colors mx-1"
          >
            <span>{label}</span>
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </Link>
        ) : (
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#C9A86A] hover:text-white font-semibold underline underline-offset-2 transition-colors mx-1"
          >
            <span>{label}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    // Line breaks and bolding
    return (
      <div className="space-y-2 leading-relaxed text-sm">
        {parts.map((part, i) => {
          if (typeof part !== 'string') return part;

          // Render paragraphs
          return part.split('\n\n').map((paragraph, pIdx) => {
            const lines = paragraph.split('\n');
            return (
              <p key={`${i}-${pIdx}`} className="leading-relaxed">
                {lines.map((line, lIdx) => {
                  // Bolding **text**
                  const boldRegex = /\*\*([^*]+)\*\*/g;
                  const boldParts = [];
                  let bLastIdx = 0;
                  let bMatch;

                  while ((bMatch = boldRegex.exec(line)) !== null) {
                    if (bMatch.index > bLastIdx) {
                      boldParts.push(line.substring(bLastIdx, bMatch.index));
                    }
                    boldParts.push(
                      <strong key={bMatch.index} className="font-semibold text-white">
                        {bMatch[1]}
                      </strong>
                    );
                    bLastIdx = boldRegex.lastIndex;
                  }
                  if (bLastIdx < line.length) {
                    boldParts.push(line.substring(bLastIdx));
                  }

                  return (
                    <React.Fragment key={lIdx}>
                      {boldParts}
                      {lIdx < lines.length - 1 && <br />}
                    </React.Fragment>
                  );
                })}
              </p>
            );
          });
        })}
      </div>
    );
  };

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      lang={lang}
      className="flex flex-col h-full w-full bg-[#0B0D14]/98 border border-white/15 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-white overflow-hidden"
    >
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-[#121624] via-[#0E111C] to-[#121624] select-none shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl overflow-hidden border-2 border-[#C9A86A]/50 shadow-md shrink-0 bg-black">
            <img
              src={avatarUrl}
              alt={agentName}
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute bottom-0.5 right-0.5 rtl:right-auto rtl:left-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0D14]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">
                {`${agentName} | ${agentTitle}`}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{statusLabel}</span>
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              {agentDept}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleReset}
            title={isAr ? 'محادثة جديدة' : 'New Thread'}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            title={isAr ? 'إغلاق' : 'Close'}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Official ChatKit Mount Point (if loaded) */}
      <div
        ref={officialContainerRef}
        className={`w-full h-full ${useOfficialChatKit ? 'block' : 'hidden'}`}
      />

      {/* 3. Luxury Native ChatKit UI (Always Available & Instant) */}
      {!useOfficialChatKit && (
        <div className="flex flex-col flex-grow min-h-0">
          
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'} animate-in fade-in duration-200`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C9A86A]/50 flex items-center justify-center shrink-0 mt-1 shadow-sm bg-black">
                      <img
                        src={avatarUrl}
                        alt={agentName}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                      isAssistant
                        ? 'bg-[#151926]/90 border border-white/10 text-zinc-200'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white font-normal'
                    }`}
                  >
                    {isAssistant && (
                      <div className="text-[11px] font-semibold text-[#C9A86A] mb-1 flex items-center gap-1.5">
                        <span>{`${agentName} (${agentTitle})`}</span>
                      </div>
                    )}
                    {renderMessageContent(msg.content)}
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0 text-blue-300 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Streaming Animated Pulse */}
            {isStreaming && (
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono px-3 py-1 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#C9A86A]" />
                <span>{isAr ? `${agentName} يكتب الرد الآن...` : `${agentName} is typing a reply...`}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Prompts (Shown when 1 or fewer user messages) */}
          {messages.filter((m) => m.role === 'user').length === 0 && (
            <div className="px-5 pb-3">
              <p className="text-[11px] font-mono text-zinc-400 uppercase mb-2">
                {isAr ? `استفسارات شائعة يمكنك سؤالها لـ ${agentName}:` : `Suggested topics to ask ${agentName}:`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {STARTER_PROMPTS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(item.prompt)}
                    disabled={isStreaming}
                    className="text-start px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C9A86A]/40 text-xs text-zinc-300 hover:text-white transition-all duration-150 flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate">{item.label}</span>
                    <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-[#C9A86A] rtl:rotate-180 shrink-0 ms-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Corporate Action Buttons */}
          {(quickActions.show_rfp !== false || quickActions.show_whatsapp !== false || quickActions.show_catalog !== false) && (
            <div className="px-5 py-2.5 border-t border-white/5 bg-[#0D101A] flex items-center justify-between gap-2 overflow-x-auto text-[11px] font-mono text-zinc-400 scrollbar-none">
              {quickActions.show_rfp !== false && (
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors shrink-0"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>{isAr ? 'طلب عرض سعر (RFP)' : 'Submit RFP'}</span>
                </Link>
              )}

              {quickActions.show_whatsapp !== false && (
                <a
                  href={`https://wa.me/${(quickActions.whatsapp_number || '+966505725070').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{isAr ? 'واتساب الإدارة' : 'VIP WhatsApp'}</span>
                </a>
              )}

              {quickActions.show_catalog !== false && (
                <Link
                  href="/catalog"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors shrink-0"
                >
                  <Factory className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isAr ? 'كتالوج الأثاث' : 'Furniture Catalog'}</span>
                </Link>
              )}
            </div>
          )}

          {/* 4. Composer Input */}
          <div className="p-4 border-t border-white/10 bg-[#0B0D14]">
            <div className="relative flex items-center bg-[#151926] border border-white/15 focus-within:border-[#C9A86A]/60 rounded-2xl p-1.5 transition-all shadow-inner">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={
                  isAr
                    ? (config?.composer_placeholder_ar || `تفضل بكتابة استفسارك لـ ${agentName}...`)
                    : (config?.composer_placeholder_en || `Type your message to ${agentName}...`)
                }
                disabled={isStreaming}
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 px-3 py-2 outline-none resize-none max-h-28"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isStreaming}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C9A86A] to-[#B29255] hover:from-[#d5b577] hover:to-[#be9d5f] disabled:opacity-40 disabled:hover:from-[#C9A86A] text-black font-bold flex items-center justify-center shrink-0 transition-all shadow-md cursor-pointer disabled:cursor-not-allowed"
                title={isAr ? 'إرسال' : 'Send'}
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
            
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-2 px-1">
              <span>{isAr ? `${agentName} • ${agentTitle} لمجموعة WD` : `${agentName} • ${agentTitle} for WD Group`}</span>
              <span>{isAr ? 'اضغط Enter للإرسال' : 'Press Enter to send'}</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
