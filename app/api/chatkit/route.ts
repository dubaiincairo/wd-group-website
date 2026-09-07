import { NextRequest, NextResponse } from 'next/server';
import { getIntegrationsConfig } from '@/lib/admin/secrets';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `You are Sultan (سلطان), a real, professional, courteous Saudi customer support agent and VIP concierge at "WD Group Holding" (مجموعة دبليو دي القابضة) headquartered in Riyadh, Saudi Arabia.

PERSONAL IDENTITY & HUMAN TONE:
- Your name is Sultan (سلطان).
- You are a proud, courteous, and highly knowledgeable bilingual Saudi professional representing WD Group.
- You talk like a real human customer care representative—warm, polite, respectful, and attentive.
- You introduce yourself naturally as Sultan when greeting: "أهلاً بك! معك سلطان من خدمة عملاء مجموعة WD..." in Arabic, or "Hello! I am Sultan from WD Group Customer Support..." in English.
- You take pride in Saudi Vision 2030, Saudi industrial excellence (صناعة سعودية), and world-class hospitality.

STRICT LANGUAGE DETERMINATION RULE:
- If the client's message is in Arabic (or contains Arabic characters): You MUST respond ONLY and 100% in Arabic.
- If the client's message is in English: You MUST respond ONLY and 100% in English.
- Never mix languages in an inappropriate way. Always match the language the client used to ask the question.

ABOUT WD GROUP & SUBSIDIARIES:
1. Hospitality Sector (SwissBlue Hotels):
   - Upscale, boutique, and luxury hotel asset portfolio across prime locations in Saudi Arabia (Riyadh, Jeddah, Eastern Province).
   - Specialized in premium guest experiences, asset management, and hospitality partnerships.
   - Website page: /sectors/hospitality

2. Industrial Manufacturing Sector (GreenWood Manufacturing):
   - State-of-the-art Riyadh manufacturing facility specializing in bespoke luxury furniture, architectural joinery, 5-star hospitality fit-out furniture, acoustic wood panels, and fire-rated doors.
   - Certified "Saudi Made" (صناعة سعودية) combining European craftsmanship with Saudi industrial excellence.
   - Website page: /sectors/manufacturing

3. General Contracting Sector:
   - Turnkey construction, hospitality interior fit-outs, MEP engineering, and commercial infrastructure.
   - Proven track record delivering complex commercial and luxury residential projects on schedule.
   - Website page: /sectors/contracting

4. E-Commerce & Bespoke Furniture Catalog:
   - Bespoke furniture collection with CAD blueprint customization, luxury fabrics, solid walnut, travertine marble, and brushed brass.
   - Website page: /catalog

5. Corporate Information & Careers:
   - Careers page: /careers
   - Contact & RFP submissions: /contact
   - Direct VIP WhatsApp: +966 50 572 5070
   - Official Email: ceo@wdgroup.online

COMMUNICATION GUIDELINES:
- When the user asks in Arabic, respond in refined, warm Saudi business Arabic (أسلوب راقٍ واحترافي).
- When the user asks in English, respond in polished, executive English.
- Always provide clear, helpful answers with relevant page links when appropriate (e.g., [Explore SwissBlue Hotels](/sectors/hospitality), [GreenWood Manufacturing](/sectors/manufacturing), [Submit an RFP](/contact)).
- Be welcoming, helpful, and proactive in offering next steps (like submitting an RFP or contacting the VIP WhatsApp).`;

/**
 * Intelligent Fallback Generator for offline/demo environments
 */
function generateFallbackResponse(userMessage: string, lang: 'ar' | 'en'): string {
  const isAr = /[\u0600-\u06FF]/.test(userMessage) || (lang === 'ar' && !/[a-zA-Z]/.test(userMessage));
  const q = userMessage.toLowerCase();

  if (isAr) {
    if (q.includes('فندق') || q.includes('سويس') || q.includes('ضيافة')) {
      return `أهلاً بك! معك سلطان من خدمة عملاء مجموعة WD.\n\nيسعدني إفادتك بأن قطاع الضيافة في مجموعتنا تقوده العلامة الفندقية الراقية **SwissBlue Hotels (فنادق سويس بلو)**، حيث ندير ونطور نخبة من الأصول الفندقية الفاخرة في الرياض وجدة والمنطقة الشرقية.\n\n🔹 **خدماتنا الفندقية:** أجنحة بوتيكية راقية، كونسيرج VIP متكامل، وإدارة أصول فندقية بمعايير عالمية.\n\n👉 يمكنك استعراض التفاصيل عبر [صفحة الضيافة](/sectors/hospitality) أو [التواصل المباشر معنا](/contact) لتنسيق طلبك.`;
    }
    if (q.includes('أثاث') || q.includes('تصنيع') || q.includes('مصنع') || q.includes('جرين')) {
      return `مرحباً بك! معك سلطان.\n\nيمثل مصنعنا **GreenWood Manufacturing (جرين وود)** في الرياض ذراعنا الصناعي الرائد لتصنيع الأثاث الفندقي والمكتبي الفاخر:\n\n🔹 **قدراتنا الصناعية:**\n- تصنيع أثاث الفنادق 5 نجوم والمشاريع الكبرى بجودة "صناعة سعودية" معتمدة.\n- أعمال النجارة المعمارية والكسوات الجدارية الخشبية والأبواب المقاومة للحريق.\n- حلول هندسية متكاملة وتصاميم CAD مخصصة لأدق التفاصيل.\n\n👉 يسعدني اطلاعك على [صفحة التصنيع](/sectors/manufacturing) أو استعراض [كتالوج الأثاث](/catalog).`;
    }
    if (q.includes('مقاولات') || q.includes('بناء') || q.includes('تشييد') || q.includes('مشروع')) {
      return `أهلاً وسهلاً بك! معك سلطان.\n\nيقوم **قطاع المقاولات العامة** في مجموعة WD بتنفيذ مشاريع التشييد المتكاملة وأعمال التشطيبات الفندقية والتجهيزات الكهروميكانيكية (MEP) بنظام تسليم المفتاح بأعلى معايير الدقة.\n\n👉 إذا كان لديك كراسة شروط أو مشروع ترغب في تسعيره، تفضل بزيارة [صفحة طلب العروض RFP](/contact) وسيتواصل معك فريقنا الهندسي فوراً.`;
    }
    return `أهلاً وسهلاً بك! معك **سلطان** من خدمة عملاء مجموعة WD القابضة بالرياض.\n\nيسعدني جداً مساعدتك وإجابتك عن أي استفسار حول قطاعاتنا:\n- 🏨 **فنادق سويس بلو** والمشاريع الفندقية\n- 🪵 **مصنع جرين وود** لتصنيع الأثاث الفندقي الفاخر\n- 🏗️ **المقاولات العامة** والتجهيزات المتكاملة\n- 📄 **تقديم طلبات عروض الأسعار (RFP)** والشراكات الاستثمارية\n\nتفضل بطرح استفسارك وسأجيبك بكل سرور!`;
  } else {
    if (q.includes('hotel') || q.includes('swiss') || q.includes('hospitality')) {
      return `Hello! I am Sultan from WD Group Customer Support.\n\nI would be delighted to assist you with our hospitality portfolio led by **SwissBlue Hotels**. We operate and develop upscale boutique hotel assets in prime Saudi destinations including Riyadh, Jeddah, and the Eastern Province.\n\n🔹 **Key Offerings:** Executive suites, VIP concierge, and premier hotel asset management.\n\n👉 You can discover more on our [Hospitality Sector page](/sectors/hospitality) or [contact our office](/contact) for partnership inquiries.`;
    }
    if (q.includes('furniture') || q.includes('manufactur') || q.includes('greenwood') || q.includes('factory')) {
      return `Hello! Sultan here from WD Group Client Care.\n\nOur industrial arm is **GreenWood Manufacturing**, based at our high-tech facility in Riyadh:\n\n🔹 **Capabilities:**\n- Bespoke contract furniture engineered for 5-star hotels and luxury commercial projects.\n- Architectural joinery, acoustic wooden wall paneling, and custom doors.\n- Certified "Saudi Made" with CNC precision and custom CAD blueprint engineering.\n\n👉 Feel free to explore our [Manufacturing Division page](/sectors/manufacturing) or browse our [Furniture Catalog](/catalog).`;
    }
    if (q.includes('contract') || q.includes('construct') || q.includes('build') || q.includes('fitout')) {
      return `Hello! I am Sultan from WD Group.\n\n**WD General Contracting** delivers turnkey construction, MEP engineering, and luxury interior fit-outs throughout Saudi Arabia.\n\n👉 If you have a tender or project requirement, please submit it via our [Contact & RFP Page](/contact), and our engineering team will follow up promptly.`;
    }
    return `Hello! My name is **Sultan**, your dedicated customer care representative at WD Group Holding in Riyadh.\n\nI am here to assist you with any questions regarding our divisions:\n- 🏨 **SwissBlue Hotels** portfolio and hospitality investments\n- 🪵 **GreenWood Manufacturing** bespoke furniture factory\n- 🏗️ **Turnkey Contracting** and commercial fit-outs\n- 📄 **RFP submissions** and commercial inquiries\n\nHow can I help you today?`;
  }
}

/**
 * ChatKit Server Protocol Endpoint
 * Supports both JSON response and streaming Server-Sent Events (SSE).
 */
export async function POST(req: NextRequest) {
  try {
    const integrations = await getIntegrationsConfig();
    const apiKey = integrations.openai_api_key?.trim();
    const model = integrations.openai_model || 'gpt-4o';
    const customPrompt = integrations.chatkit_system_prompt?.trim();

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    // Support various formats sent by ChatKit or custom clients
    const messages = body.messages || [];
    const inputMessage = body.message || body.input?.text || (messages.length > 0 ? messages[messages.length - 1].content : '');
    const threadId = body.thread_id || body.threadId || 'thread_' + Math.random().toString(36).substring(2, 9);
    const acceptHeader = req.headers.get('accept') || '';
    const wantsStream = acceptHeader.includes('text/event-stream') || body.stream === true;
    const isArabic = /[\u0600-\u06FF]/.test(inputMessage || '');

    // 1. If OpenAI API Key is available, invoke OpenAI API
    if (apiKey) {
      const languageInstruction = isArabic
        ? "CRITICAL LANGUAGE DIRECTIVE: The client's message is in Arabic. You MUST respond 100% in Arabic as Sultan. Do not reply in English."
        : "CRITICAL LANGUAGE DIRECTIVE: The client's message is in English. You MUST respond 100% in English as Sultan. Do not reply in Arabic.";

      const systemContent = customPrompt
        ? `${SYSTEM_PROMPT}\n\nADMIN OVERRIDE INSTRUCTIONS:\n${customPrompt}\n\n${languageInstruction}`
        : `${SYSTEM_PROMPT}\n\n${languageInstruction}`;

      const openAiMessages = [
        { role: 'system', content: systemContent },
        ...(messages.length > 0
          ? messages.map((m: any) => ({ role: m.role || 'user', content: m.content || '' }))
          : [{ role: 'user', content: inputMessage || (isArabic ? 'مرحباً، ما هي مجموعة WD؟' : 'Hello, what is WD Group?') }]),
      ];

      if (wantsStream) {
        // Stream response using SSE
        const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: model,
            messages: openAiMessages,
            temperature: 0.7,
            stream: true,
          }),
        });

        if (openAiRes.ok && openAiRes.body) {
          const encoder = new TextEncoder();
          const decoder = new TextDecoder();
          const reader = openAiRes.body.getReader();

          const stream = new ReadableStream({
            async start(controller) {
              // Send ChatKit initial event
              controller.enqueue(
                encoder.encode(`event: chatkit.response.start\ndata: ${JSON.stringify({ thread_id: threadId })}\n\n`)
              );

              let accumulated = '';
              let buffer = '';

              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;

                  buffer += decoder.decode(value, { stream: true });
                  const lines = buffer.split('\n');
                  buffer = lines.pop() || '';

                  for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || trimmed === 'data: [DONE]') continue;
                    if (trimmed.startsWith('data: ')) {
                      try {
                        const parsed = JSON.parse(trimmed.slice(6));
                        const delta = parsed.choices?.[0]?.delta?.content || '';
                        if (delta) {
                          accumulated += delta;
                          // Emit standard SSE delta event
                          controller.enqueue(
                            encoder.encode(
                              `event: thread.item.delta\ndata: ${JSON.stringify({ delta, thread_id: threadId })}\n\n`
                            )
                          );
                        }
                      } catch {}
                    }
                  }
                }
              } catch (err) {
                console.error('[ChatKit SSE Stream error]:', err);
              } finally {
                // Send completed event
                controller.enqueue(
                  encoder.encode(
                    `event: chatkit.response.end\ndata: ${JSON.stringify({
                      thread_id: threadId,
                      text: accumulated,
                    })}\n\n`
                  )
                );
                controller.close();
              }
            },
          });

          return new Response(stream, {
            headers: {
              'Content-Type': 'text/event-stream; charset=utf-8',
              'Cache-Control': 'no-cache, no-transform',
              Connection: 'keep-alive',
            },
          });
        }
      }

      // Non-streaming direct completion fallback
      try {
        const directRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: model,
            messages: openAiMessages,
            temperature: 0.7,
            stream: false,
          }),
        });

        if (directRes.ok) {
          const directData = await directRes.json();
          const replyText = directData.choices?.[0]?.message?.content || '';
          return NextResponse.json({
            thread_id: threadId,
            text: replyText,
            source: 'openai',
            model: model,
          });
        }
      } catch (e) {
        console.warn('[ChatKit Direct Call Failed]:', e);
      }
    }

    // 2. Intelligent Grounded Local Fallback if no OpenAI Key or API down
    const fallbackText = generateFallbackResponse(inputMessage || '', isArabic ? 'ar' : 'en');

    if (wantsStream) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`event: chatkit.response.start\ndata: ${JSON.stringify({ thread_id: threadId })}\n\n`));
          
          // Stream words gradually for realistic fluid ChatKit experience
          const words = fallbackText.split(' ');
          let i = 0;
          const interval = setInterval(() => {
            if (i < words.length) {
              const delta = (i > 0 ? ' ' : '') + words[i];
              controller.enqueue(
                encoder.encode(`event: thread.item.delta\ndata: ${JSON.stringify({ delta, thread_id: threadId })}\n\n`)
              );
              i++;
            } else {
              clearInterval(interval);
              controller.enqueue(
                encoder.encode(`event: chatkit.response.end\ndata: ${JSON.stringify({ thread_id: threadId, text: fallbackText })}\n\n`)
              );
              controller.close();
            }
          }, 25);
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        },
      });
    }

    return NextResponse.json({
      thread_id: threadId,
      text: fallbackText,
      source: 'grounded_knowledge',
    });
  } catch (err: any) {
    console.error('[ChatKit Endpoint Error]:', err);
    return NextResponse.json({ error: err.message || 'Error processing ChatKit request' }, { status: 500 });
  }
}

/**
 * GET Handler for ChatKit metadata inspection & health check
 */
export async function GET() {
  const integrations = await getIntegrationsConfig();
  return NextResponse.json({
    status: 'online',
    protocol: 'chatkit_v1',
    has_openai_key: Boolean(integrations.openai_api_key),
    model: integrations.openai_model || 'gpt-4o',
    has_workflow_id: Boolean(integrations.openai_chatkit_workflow_id),
    enabled: integrations.chatkit_enabled !== false,
  });
}
