import { getSiteContent } from '@/lib/admin/db';
import { DEFAULT_ECOMMERCE_SETTINGS, EcommerceSettingsPayload } from '@/app/api/admin/ecommerce/settings/route';

export async function getEcommerceSettings(): Promise<EcommerceSettingsPayload> {
  try {
    const siteContent = await getSiteContent();
    const stored = (siteContent as any)?.ecommerce_settings || {};
    return { ...DEFAULT_ECOMMERCE_SETTINGS, ...stored };
  } catch (err) {
    return DEFAULT_ECOMMERCE_SETTINGS;
  }
}
