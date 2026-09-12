import { NextRequest, NextResponse } from 'next/server';
import { getChatbotConfig, buildChatbotSystemPrompt } from '@/lib/admin/chatbot';

export const dynamic = 'force-dynamic';

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
      return `مرحباً بك! معك سلطان.\n\nيمثل مصنعنا **GreenWood Manufacturing (جرين وود)** في الرياض ذراعنا الصناعي الرائد لتصنيع الأثاث الفندقي والمكتبي الفاخر:\n\n🔹 **قدراتنا الصناعية:**\n- تصنيع أثاث الفنادق 5 نجوم والمشاريع الكبرى بجودة "صناعة سعودية" معتمدة.\n- أعمال النجارة المعمارية والكسوات الجدارية الخشبية والأبواب المقاومة للحريق.\n- حلول هندسية متكاملة وتصاميم CAD مخصصة لأدق التفاصيل.\n\n👉 يسعدني اطلاعك على [صفحة التصنيع](/sectors/manufacturing) أو استعراض [كتالوج الأثاث](/furniture).`;
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
      return `Hello! Sultan here from WD Group Client Care.\n\nOur industrial arm is **GreenWood Manufacturing**, based at our high-tech facility in Riyadh:\n\n🔹 **Capabilities:**\n- Bespoke contract furniture engineered for 5-star hotels and luxury commercial projects.\n- Architectural joinery, acoustic wooden wall paneling, and custom doors.\n- Certified "Saudi Made" with CNC precision and custom CAD blueprint engineering.\n\n👉 Feel free to explore our [Manufacturing Division page](/sectors/manufacturing) or browse our [Furniture Catalog](/furniture).`;
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
    const config = await getChatbotConfig();

    if (!config.enabled) {
      return NextResponse.json({
        thread_id: 'disabled',
        text: 'The AI Concierge is currently unavailable. Please contact us via WhatsApp or submit an inquiry through our Contact page.',
        source: 'system_disabled',
      });
    }

    const apiKey = config.openai_api_key_override?.trim();
    const model = config.openai_model || 'gpt-4o';
    const temperature = typeof config.temperature === 'number' ? config.temperature : 0.7;
    const maxTokens = typeof config.max_tokens === 'number' ? config.max_tokens : 800;
    const systemContent = buildChatbotSystemPrompt(config);

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
      const languageInstruction = config.strict_language_matching
        ? (isArabic
            ? "CRITICAL LANGUAGE DIRECTIVE: The client's message is in Arabic. You MUST respond 100% in Arabic as Sultan. Do not reply in English."
            : "CRITICAL LANGUAGE DIRECTIVE: The client's message is in English. You MUST respond 100% in English as Sultan. Do not reply in Arabic.")
        : "";

      const effectiveSystemContent = languageInstruction
        ? `${systemContent}\n\n${languageInstruction}`
        : systemContent;

      const openAiMessages = [
        { role: 'system', content: effectiveSystemContent },
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
            temperature: temperature,
            max_tokens: maxTokens,
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
            temperature: temperature,
            max_tokens: maxTokens,
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
  const config = await getChatbotConfig();
  return NextResponse.json({
    status: 'online',
    protocol: 'chatkit_v1',
    enabled: config.enabled,
    agent_name_en: config.agent_name_en,
    agent_name_ar: config.agent_name_ar,
    has_openai_key: Boolean(config.openai_api_key_override),
    model: config.openai_model || 'gpt-4o',
    temperature: config.temperature,
    max_tokens: config.max_tokens,
    chatkit_mode: config.chatkit_mode,
    has_workflow_id: Boolean(config.workflow_id),
    strict_language_matching: config.strict_language_matching,
  });
}
