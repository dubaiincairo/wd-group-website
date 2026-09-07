import type { ChatbotConfig, SiteContentPayload } from './types';
import { getSiteContent } from './db';

export const DEFAULT_CHATBOT_CONFIG: ChatbotConfig = {
  enabled: true,

  // Persona & Identity
  agent_name_en: 'Sultan',
  agent_name_ar: 'سلطان',
  agent_title_en: 'Customer Support & Concierge',
  agent_title_ar: 'مستشار خدمة العملاء والكونسيرج',
  agent_department_en: 'Client Care & Corporate Communications',
  agent_department_ar: 'خدمة العملاء والاتصال المؤسسي',
  status_label_en: 'Online',
  status_label_ar: 'متصل الآن',
  avatar_url: '/brand/sultan-avatar.jpg',

  // Greetings & Messaging
  welcome_message_ar:
    'أهلاً وسهلاً بك! معك **سلطان** من خدمة عملاء مجموعة WD القابضة بالرياض.\n\nيسعدني جداً خدمتك والإجابة عن أي استفسار يخص قطاعاتنا في **الضيافة (فنادق سويس بلو)**، **التصنيع الصناعي (مصنع جرين وود للأثاث الفاخر)**، و**المقاولات العامة والتجهيزات الفندقية**.\n\nكيف يمكنني مساعدتك اليوم؟',
  welcome_message_en:
    'Hello and welcome! I am **Sultan**, your customer support representative at WD Group Holding in Riyadh.\n\nI am here to assist you with our **Hospitality (SwissBlue Hotels)**, **Precision Manufacturing (GreenWood Furniture)**, and **General Contracting**.\n\nHow can I help you today?',

  reset_message_ar:
    'بدأنا محادثة جديدة! معك **سلطان** من خدمة العملاء، تفضل بطرح استفسارك وسأجيبك بكل سرور.',
  reset_message_en:
    'Started a new conversation! **Sultan** here from WD Group Client Support, feel free to ask anything and I will be glad to help.',

  composer_placeholder_ar: 'تفضل بكتابة استفسارك لسلطان...',
  composer_placeholder_en: 'Type your message to Sultan...',

  // Hint Bubble
  hint_bubble_enabled: true,
  hint_bubble_ar: 'تحدث مع سلطان (خدمة العملاء)',
  hint_bubble_en: 'Chat with Sultan (Support)',

  // Quick Action Buttons
  quick_actions: {
    show_rfp: true,
    show_whatsapp: true,
    show_catalog: true,
    whatsapp_number: '+966505725070',
  },

  // Starter Prompts
  starter_prompts: [
    {
      id: 'prompt_1',
      label_ar: '🏢 ما هي مجموعة WD وشركاتها؟',
      label_en: '🏢 What is WD Group?',
      prompt_ar: 'ما هي شركات وأنشطة مجموعة WD القابضة؟',
      prompt_en: 'Tell me about WD Group and its subsidiary sectors.',
    },
    {
      id: 'prompt_2',
      label_ar: '🏨 فنادق سويس بلو (SwissBlue)',
      label_en: '🏨 SwissBlue Hotels Portfolio',
      prompt_ar: 'أخبرني عن فنادق سويس بلو وتفاصيل قطاع الضيافة',
      prompt_en: 'Tell me about SwissBlue Hotels and your hospitality division.',
    },
    {
      id: 'prompt_3',
      label_ar: '🪵 مصنع جرين وود للأثاث',
      label_en: '🪵 GreenWood Furniture Factory',
      prompt_ar: 'ما هي قدرات مصنع جرين وود لتصنيع الأثاث الفندقي؟',
      prompt_en: 'What are the manufacturing capabilities of GreenWood in Riyadh?',
    },
    {
      id: 'prompt_4',
      label_ar: '📄 طلب عرض سعر لمشروع (RFP)',
      label_en: '📄 Submit an RFP / Quotation',
      prompt_ar: 'كيف أقدم طلب عرض سعر أو منافسة لمشروع مقاولات وتأثيث؟',
      prompt_en: 'How can I submit an RFP or project quotation request?',
    },
  ],

  // Layout & Theme
  theme_color: '#C9A86A',
  position: 'bottom-right',

  // Tech / Backend AI controls
  openai_api_key_override: '',
  openai_model: 'gpt-4o',
  temperature: 0.7,
  max_tokens: 800,
  chatkit_mode: 'hybrid',
  workflow_id: '',
  system_prompt_override: '',
  strict_language_matching: true,
  sector_knowledge: {
    hospitality: true,
    manufacturing: true,
    contracting: true,
    ecommerce: true,
    corporate: true,
  },
};

/**
 * Resolve full chatbot configuration merging database settings, integrations fallbacks, and defaults.
 */
export async function getChatbotConfig(): Promise<ChatbotConfig> {
  let dbChatbot: Partial<ChatbotConfig> = {};
  let integrationsApiKey = '';
  let integrationsModel = '';
  let integrationsWorkflowId = '';
  let integrationsChatkitEnabled = true;

  try {
    const content = await getSiteContent();
    if (content?.settings) {
      if (content.settings.chatbot) {
        dbChatbot = content.settings.chatbot;
      }
      if (content.settings.integrations) {
        integrationsApiKey = content.settings.integrations.openai_api_key || '';
        integrationsModel = content.settings.integrations.openai_model || '';
        integrationsWorkflowId = content.settings.integrations.openai_chatkit_workflow_id || '';
        if (content.settings.integrations.chatkit_enabled !== undefined) {
          integrationsChatkitEnabled = Boolean(content.settings.integrations.chatkit_enabled);
        }
      }
    }
  } catch (err) {
    console.warn('[Chatbot Config Resolver] Failed to read database content:', err);
  }

  // Merge starter prompts carefully (default if empty array)
  const starterPrompts = Array.isArray(dbChatbot.starter_prompts) && dbChatbot.starter_prompts.length > 0
    ? dbChatbot.starter_prompts
    : DEFAULT_CHATBOT_CONFIG.starter_prompts;

  const quickActions = {
    ...DEFAULT_CHATBOT_CONFIG.quick_actions,
    ...(dbChatbot.quick_actions || {}),
  };

  const sectorKnowledge = {
    ...DEFAULT_CHATBOT_CONFIG.sector_knowledge,
    ...(dbChatbot.sector_knowledge || {}),
  };

  const enabled = dbChatbot.enabled !== undefined
    ? Boolean(dbChatbot.enabled)
    : (integrationsChatkitEnabled !== undefined ? integrationsChatkitEnabled : DEFAULT_CHATBOT_CONFIG.enabled);

  const openaiApiKey = dbChatbot.openai_api_key_override?.trim()
    || integrationsApiKey?.trim()
    || process.env.OPENAI_API_KEY
    || '';

  const openaiModel = dbChatbot.openai_model?.trim()
    || integrationsModel?.trim()
    || process.env.OPENAI_MODEL
    || DEFAULT_CHATBOT_CONFIG.openai_model;

  return {
    ...DEFAULT_CHATBOT_CONFIG,
    ...dbChatbot,
    enabled,
    starter_prompts: starterPrompts,
    quick_actions: quickActions,
    sector_knowledge: sectorKnowledge,
    openai_api_key_override: openaiApiKey,
    openai_model: openaiModel,
    workflow_id: dbChatbot.workflow_id?.trim() || integrationsWorkflowId?.trim() || '',
    temperature: typeof dbChatbot.temperature === 'number' ? dbChatbot.temperature : DEFAULT_CHATBOT_CONFIG.temperature,
    max_tokens: typeof dbChatbot.max_tokens === 'number' ? dbChatbot.max_tokens : DEFAULT_CHATBOT_CONFIG.max_tokens,
    chatkit_mode: dbChatbot.chatkit_mode || DEFAULT_CHATBOT_CONFIG.chatkit_mode,
    strict_language_matching: dbChatbot.strict_language_matching !== undefined
      ? Boolean(dbChatbot.strict_language_matching)
      : DEFAULT_CHATBOT_CONFIG.strict_language_matching,
  };
}

/**
 * Strips confidential keys and system prompts, returning only public client-safe fields.
 */
export function sanitizePublicChatbotConfig(config: ChatbotConfig) {
  return {
    enabled: config.enabled,
    agent_name_en: config.agent_name_en,
    agent_name_ar: config.agent_name_ar,
    agent_title_en: config.agent_title_en,
    agent_title_ar: config.agent_title_ar,
    agent_department_en: config.agent_department_en,
    agent_department_ar: config.agent_department_ar,
    status_label_en: config.status_label_en,
    status_label_ar: config.status_label_ar,
    avatar_url: config.avatar_url || '/brand/sultan-avatar.jpg',
    welcome_message_en: config.welcome_message_en,
    welcome_message_ar: config.welcome_message_ar,
    reset_message_en: config.reset_message_en,
    reset_message_ar: config.reset_message_ar,
    composer_placeholder_en: config.composer_placeholder_en,
    composer_placeholder_ar: config.composer_placeholder_ar,
    hint_bubble_enabled: config.hint_bubble_enabled,
    hint_bubble_en: config.hint_bubble_en,
    hint_bubble_ar: config.hint_bubble_ar,
    starter_prompts: config.starter_prompts,
    quick_actions: config.quick_actions,
    theme_color: config.theme_color || '#C9A86A',
    position: config.position || 'bottom-right',
    chatkit_mode: config.chatkit_mode,
  };
}

/**
 * Dynamically builds the system prompt based on active persona and sector modules.
 */
export function buildChatbotSystemPrompt(config: ChatbotConfig): string {
  // If administrator provided a comprehensive system prompt override, respect it
  if (config.system_prompt_override?.trim()) {
    return config.system_prompt_override.trim();
  }

  const nameAr = config.agent_name_ar || 'سلطان';
  const nameEn = config.agent_name_en || 'Sultan';
  const titleAr = config.agent_title_ar || 'مستشار خدمة العملاء والكونسيرج';
  const titleEn = config.agent_title_en || 'Customer Support & Concierge';
  const deptAr = config.agent_department_ar || 'خدمة العملاء والاتصال المؤسسي';
  const deptEn = config.agent_department_en || 'Client Care';

  const languageRule = config.strict_language_matching
    ? `STRICT LANGUAGE DETERMINATION RULE:
- If the client's message is in Arabic (or contains Arabic script): You MUST respond ONLY and 100% in Arabic.
- If the client's message is in English: You MUST respond ONLY and 100% in English.
- Never mix languages in an inappropriate way. Always match the language the client used to ask the question.`
    : `BILINGUAL SUPPORT RULE:
- You are fluent in Arabic and English. Default to the language used by the client, and switch smoothly whenever requested.`;

  const sectors: string[] = [];

  if (config.sector_knowledge?.hospitality) {
    sectors.push(`1. Hospitality Sector (SwissBlue Hotels):
   - Upscale, boutique, and luxury hotel asset portfolio across prime locations in Saudi Arabia (Riyadh, Jeddah, Eastern Province).
   - Specialized in premium guest experiences, asset management, and hospitality partnerships.
   - Website page: /sectors/hospitality`);
  }

  if (config.sector_knowledge?.manufacturing) {
    sectors.push(`2. Industrial Manufacturing Sector (GreenWood Manufacturing):
   - State-of-the-art Riyadh manufacturing facility specializing in bespoke luxury furniture, architectural joinery, 5-star hospitality fit-out furniture, acoustic wood panels, and fire-rated doors.
   - Certified "Saudi Made" (صناعة سعودية) combining European craftsmanship with Saudi industrial excellence.
   - Website page: /sectors/manufacturing`);
  }

  if (config.sector_knowledge?.contracting) {
    sectors.push(`3. General Contracting Sector:
   - Turnkey construction, hospitality interior fit-outs, MEP engineering, and commercial infrastructure.
   - Proven track record delivering complex commercial and luxury residential projects on schedule.
   - Website page: /sectors/contracting`);
  }

  if (config.sector_knowledge?.ecommerce) {
    sectors.push(`4. E-Commerce & Bespoke Furniture Catalog:
   - Bespoke furniture collection with CAD blueprint customization, luxury fabrics, solid walnut, travertine marble, and brushed brass.
   - Website page: /catalog`);
  }

  if (config.sector_knowledge?.corporate) {
    sectors.push(`5. Corporate Information & Careers:
   - Careers page: /careers
   - Contact & RFP submissions: /contact
   - Direct VIP WhatsApp: ${config.quick_actions?.whatsapp_number || '+966 50 572 5070'}
   - Official Email: ceo@wdgroup.online`);
  }

  return `You are ${nameEn} (${nameAr}), a real, professional, courteous Saudi customer support agent and VIP concierge at "WD Group Holding" (مجموعة دبليو دي القابضة) headquartered in Riyadh, Saudi Arabia.

PERSONAL IDENTITY & HUMAN TONE:
- Your name is ${nameEn} (${nameAr}).
- Your title is ${titleEn} (${titleAr}), in the ${deptEn} (${deptAr}) department.
- You talk like a real human customer care representative—warm, polite, respectful, and attentive.
- You introduce yourself naturally as ${nameAr} when greeting in Arabic: "أهلاً بك! معك ${nameAr} من خدمة عملاء مجموعة WD..." or as ${nameEn} in English: "Hello! I am ${nameEn} from WD Group Customer Support...".
- You take pride in Saudi Vision 2030, Saudi industrial excellence (صناعة سعودية), and world-class hospitality.

${languageRule}

ABOUT WD GROUP & SUBSIDIARIES:
${sectors.join('\n\n')}

COMMUNICATION GUIDELINES:
- When the user asks in Arabic, respond in refined, warm Saudi business Arabic (أسلوب راقٍ واحترافي).
- When the user asks in English, respond in polished, executive English.
- Always provide clear, helpful answers with relevant page links when appropriate (e.g., [Explore SwissBlue Hotels](/sectors/hospitality), [GreenWood Manufacturing](/sectors/manufacturing), [Submit an RFP](/contact)).
- Be welcoming, helpful, and proactive in offering next steps (like submitting an RFP or contacting the VIP WhatsApp).`;
}
