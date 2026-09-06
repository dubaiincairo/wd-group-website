import { NextRequest, NextResponse } from 'next/server';
import { getIntegrationsConfig } from '@/lib/admin/secrets';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `You are the official AI Concierge for "WD Group Holding" (مجموعة دبليو دي القابضة), a premier Saudi holding company headquartered in Riyadh, Saudi Arabia, aligned with Saudi Vision 2030.

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
- When the user asks in Arabic, respond in refined, professional Arabic (أسلوب راقٍ واحترافي يليق بمجموعة استثمارية سعودية كبرى).
- When the user asks in English, respond in polished, executive English.
- Always provide clear, helpful answers with relevant page links when appropriate (e.g., [Explore SwissBlue Hotels](/sectors/hospitality), [GreenWood Manufacturing](/sectors/manufacturing), [Submit an RFP](/contact)).
- Be welcoming, knowledgeable, concise, and proactive.`;

/**
 * Intelligent Fallback Generator for offline/demo environments
 */
function generateFallbackResponse(userMessage: string, lang: 'ar' | 'en'): string {
  const isAr = lang === 'ar' || /[\u0600-\u06FF]/.test(userMessage);
  const q = userMessage.toLowerCase();

  if (isAr) {
    if (q.includes('فندق') || q.includes('سويس') || q.includes('ضيافة')) {
      return `أهلاً بك في **مجموعة WD القابضة**.\n\nيقود قطاع الضيافة لدينا العلامة الفندقية الفاخرة **SwissBlue Hotels (فنادق سويس بلو)**، والتي تدير وتطور أصولاً فندقية راقية ومتميزة في مواقع استراتيجية بالمملكة العربية السعودية (الرياض، جدة، والمنطقة الشرقية).\n\n🔹 **المميزات:** أجنحة بوتيكية فاخرة، خدمات كونسيرج VIP، وإدارة تشغيلية وفق أعلى معايير الضيافة العالمية.\n\n👉 يمكنك استعراض تفاصيل القطاع عبر [صفحة الضيافة](/sectors/hospitality) أو [التواصل معنا](/contact) لمناقشة فرص الشراكة والاستثمار.`;
    }
    if (q.includes('أثاث') || q.includes('تصنيع') || q.includes('مصنع') || q.includes('جرين')) {
      return `أهلاً بك! يمثل قطاع التصنيع لدينا ذراعنا الصناعي المتقدم **GreenWood Manufacturing (مصنع جرين وود)** في الرياض.\n\n🔹 **القدرات الصناعية:**\n- تصنيع الأثاث الفندقي الراقي المخصص للمشاريع الكبرى (Bespoke Luxury Furniture).\n- أعمال النجارة المعمارية (Architectural Joinery) والكسوات الخشبية الجدارية.\n- تصنيع معتمد يحمل فخر "صناعة سعودية" بدقة هندسية عالية وتصاميم CAD مخصصة.\n\n👉 ندعوك لزيارة [صفحة قطاع التصنيع](/sectors/manufacturing) أو استعراض [كتالوج الأثاث](/catalog).`;
    }
    if (q.includes('مقاولات') || q.includes('بناء') || q.includes('تشييد') || q.includes('مشروع')) {
      return `مرحباً بك! يتولى **قطاع المقاولات العامة** في مجموعة WD تنفيذ مشاريع التشييد المتكاملة وأعمال التشطيبات الفندقية والإنشائية والتجهيزات الكهروميكانيكية (MEP) بنظام تسليم المفتاح.\n\n🔹 **مجالات التميز:** مشاريع الضيافة الفاخرة، المراكز التجارية، والأبراج السكنية المتميزة.\n\n👉 لتقديم كراسة الشروط أو طلب عرض سعر، تفضل بزيارة [صفحة طلب العروض](/contact).`;
    }
    return `أهلاً بك في **مجموعة WD القابضة** (WD Group Holding) — المجموعة الاستثمارية السعودية الرائدة في قطاعات **الضيافة (SwissBlue Hotels)**، **التصنيع الصناعي للأثاث (GreenWood)**، و**المقاولات العامة والتجهيزات الفندقية**.\n\nكيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن:\n- 🏨 محفظة ومشاريع فنادق سويس بلو\n- 🪵 حلول تصنيع الأثاث الفندقي والمكتبي\n- 🏗️ خدمات المقاولات وإدارة المشاريع\n- 📄 تقديم طلب عرض سعر (RFP) أو التقديم على الوظائف`;
  } else {
    if (q.includes('hotel') || q.includes('swiss') || q.includes('hospitality')) {
      return `Welcome to **WD Group Holding**.\n\nOur hospitality division is spearheaded by **SwissBlue Hotels**, an upscale hospitality brand managing and developing luxury boutique assets across strategic destinations in Saudi Arabia (Riyadh, Jeddah, Eastern Province).\n\n🔹 **Key Offerings:** Executive suites, VIP concierge, and premier hotel asset management.\n\n👉 Discover more on our [Hospitality Sector page](/sectors/hospitality) or [contact our corporate office](/contact) for partnership inquiries.`;
    }
    if (q.includes('furniture') || q.includes('manufactur') || q.includes('greenwood') || q.includes('factory')) {
      return `Welcome! Our industrial arm is powered by **GreenWood Manufacturing** in Riyadh, Saudi Arabia.\n\n🔹 **Capabilities:**\n- Bespoke contract furniture engineered for 5-star hotels and luxury residences.\n- Architectural joinery, acoustic wooden wall paneling, and custom doors.\n- Certified "Saudi Made" with computerized CNC precision and custom CAD blueprint engineering.\n\n👉 Explore our [Industrial Manufacturing page](/sectors/manufacturing) or browse our [Furniture Catalog](/catalog).`;
    }
    if (q.includes('contract') || q.includes('construct') || q.includes('build') || q.includes('fitout')) {
      return `Welcome! **WD General Contracting** delivers turnkey construction, comprehensive MEP solutions, and luxury hospitality interior fit-outs throughout the Kingdom of Saudi Arabia.\n\n🔹 **Specialties:** Turnkey 5-star hotel fit-outs, commercial infrastructure, and premium developments.\n\n👉 You can submit an RFP or project inquiry via our [Contact Page](/contact).`;
    }
    return `Welcome to **WD Group Holding**, a premier Saudi holding company powering strategic investments in **Hospitality (SwissBlue Hotels)**, **Precision Manufacturing (GreenWood)**, and **General Contracting**.\n\nHow can I assist you today? You can inquire about:\n- 🏨 SwissBlue Hotels portfolio & amenities\n- 🪵 Bespoke contract furniture & GreenWood factory\n- 🏗️ Turnkey contracting & fit-out capabilities\n- 📄 Submitting an RFP or exploring career openings`;
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
      const openAiMessages = [
        { role: 'system', content: customPrompt ? `${SYSTEM_PROMPT}\n\nADMIN OVERRIDE INSTRUCTIONS:\n${customPrompt}` : SYSTEM_PROMPT },
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
