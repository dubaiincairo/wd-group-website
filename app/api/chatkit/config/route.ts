import { NextResponse } from 'next/server';
import { getChatbotConfig, sanitizePublicChatbotConfig } from '@/lib/admin/chatbot';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const config = await getChatbotConfig();
    const sanitized = sanitizePublicChatbotConfig(config);

    return NextResponse.json(
      {
        success: true,
        data: sanitized,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'CDN-Cache-Control': 'no-store',
          'Vercel-CDN-Cache-Control': 'no-store',
        },
      }
    );
  } catch (error: any) {
    console.error('[ChatKit Config GET error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to retrieve ChatKit configuration' },
      { status: 500 }
    );
  }
}
