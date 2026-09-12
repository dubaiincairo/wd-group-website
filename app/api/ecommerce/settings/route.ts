import { NextResponse } from 'next/server';
import { getEcommerceSettings } from '@/lib/ecommerce/settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getEcommerceSettings();

    // Expose only public store configurations, omitting private API keys
    const publicSettings = {
      enableMadaCards: settings.enableMadaCards,
      enableApplePay: settings.enableApplePay,
      moyasarPublishableKey: settings.moyasarPublishableKey,
      moyasarTestMode: settings.moyasarTestMode,

      enableTamara: settings.enableTamara,
      tamaraTestMode: settings.tamaraTestMode,
      tamaraInstallmentsCount: settings.tamaraInstallmentsCount,

      enableTabby: settings.enableTabby,
      tabbyPublicKey: settings.tabbyPublicKey,
      tabbyTestMode: settings.tabbyTestMode,

      enablePdpBnplWidget: settings.enablePdpBnplWidget,

      vatEnabled: settings.vatEnabled,
      vatRate: settings.vatRate,
      taxNumber: settings.taxNumber,
      crNumber: settings.crNumber,
      companyNameAr: settings.companyNameAr,
      companyNameEn: settings.companyNameEn,
      enableZatcaQr: settings.enableZatcaQr,
      enablePdfQuotation: settings.enablePdfQuotation,

      enableCustomerPortal: settings.enableCustomerPortal,
      supportWhatsappNumber: settings.supportWhatsappNumber,
      freeShippingThreshold: settings.freeShippingThreshold,
      whiteGloveAssemblyDefault: settings.whiteGloveAssemblyDefault,
    };

    return NextResponse.json({ success: true, settings: publicSettings });
  } catch (err: any) {
    console.error('Error serving public ecommerce settings:', err);
    return NextResponse.json({
      success: true,
      settings: {
        enableMadaCards: true,
        enableApplePay: true,
        enableTamara: true,
        enableTabby: true,
        enablePdpBnplWidget: true,
        vatEnabled: true,
        vatRate: 15,
        taxNumber: '310492817400003',
        crNumber: '1010724891',
        enablePdfQuotation: true,
        enableCustomerPortal: true,
        supportWhatsappNumber: '966505725070',
        freeShippingThreshold: 10000,
        whiteGloveAssemblyDefault: true,
      },
    });
  }
}
