import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/admin/auth';
import { getChatbotConfig, buildChatbotSystemPrompt } from '@/lib/admin/chatbot';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const message = body.message?.trim() || 'مرحباً سلطان، ما هي شركات وأنشطة مجموعة WD؟';
    const testModel = body.model || 'gpt-4o';
    const testTemperature = typeof body.temperature === 'number' ? body.temperature : 0.7;
    const testMaxTokens = typeof body.max_tokens === 'number' ? body.max_tokens : 500;
    const keyOverride = body.apiKey?.trim();
    const systemPromptOverride = body.systemPrompt?.trim();

    const activeConfig = await getChatbotConfig();
    const effectiveApiKey = keyOverride || activeConfig.openai_api_key_override;

    const startTime = Date.now();

    if (!effectiveApiKey) {
      return NextResponse.json({
        success: false,
        error: 'No OpenAI API key found. Please configure OPENAI_API_KEY in the Admin Panel or environment.',
        latencyMs: Date.now() - startTime,
      });
    }

    const isArabic = /[\u0600-\u06FF]/.test(message);
    const systemContent = systemPromptOverride || buildChatbotSystemPrompt(activeConfig);
    const languageDirective = isArabic
      ? "CRITICAL LANGUAGE DIRECTIVE: The client's message is in Arabic. You MUST respond 100% in Arabic as Sultan. Do not reply in English."
      : "CRITICAL LANGUAGE DIRECTIVE: The client's message is in English. You MUST respond 100% in English as Sultan. Do not reply in Arabic.";

    const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${effectiveApiKey}`,
      },
      body: JSON.stringify({
        model: testModel,
        messages: [
          { role: 'system', content: `${systemContent}\n\n${languageDirective}` },
          { role: 'user', content: message },
        ],
        temperature: testTemperature,
        max_tokens: testMaxTokens,
      }),
    });

    const latencyMs = Date.now() - startTime;

    if (!openAiRes.ok) {
      const errText = await openAiRes.text().catch(() => 'OpenAI request failed');
      return NextResponse.json({
        success: false,
        error: `OpenAI API Error (${openAiRes.status}): ${errText}`,
        latencyMs,
      });
    }

    const openAiData = await openAiRes.json();
    const replyText = openAiData.choices?.[0]?.message?.content || '';
    const totalTokens = openAiData.usage?.total_tokens || 0;

    return NextResponse.json({
      success: true,
      reply: replyText,
      model: openAiData.model || testModel,
      latencyMs,
      tokensUsed: totalTokens,
      detectedLanguage: isArabic ? 'ar' : 'en',
    });
  } catch (error: any) {
    console.error('[ChatKit Test API Error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Diagnostic ping failed' },
      { status: 500 }
    );
  }
}
