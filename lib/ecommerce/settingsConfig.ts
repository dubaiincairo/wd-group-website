export interface EcommerceSettingsPayload {
  enableMadaCards: boolean;
  enableApplePay: boolean;
  moyasarPublishableKey?: string;
  moyasarSecretKey?: string;
  moyasarWebhookSecret?: string;
  moyasarTestMode: boolean;
  enableTamara: boolean;
  tamaraApiToken?: string;
  tamaraNotificationToken?: string;
  tamaraTestMode: boolean;
  tamaraInstallmentsCount: 3 | 4;
  enableTabby: boolean;
  tabbyPublicKey?: string;
  tabbySecretKey?: string;
  tabbyWebhookSecret?: string;
  tabbyTestMode: boolean;
  enablePdpBnplWidget: boolean;
  vatEnabled: boolean;
  vatRate: number;
  taxNumber: string;
  crNumber: string;
  companyNameAr: string;
  companyNameEn: string;
  enableZatcaQr: boolean;
  enablePdfQuotation: boolean;
  enableSms: boolean;
  smsProvider: 'taqnyat' | 'unifonic' | 'simulator';
  smsApiKey?: string;
  smsSenderName: string;
  notifySmsOrderConfirmation: boolean;
  notifySmsDispatch: boolean;
  enableOrderEmails: boolean;
  brevoApiKey?: string;
  brevoSenderEmail: string;
  brevoSenderName: string;
  adminAlertEmail: string;
  highTicketThreshold: number;
  attachZatcaInvoice: boolean;
  enableCustomerPortal: boolean;
  leadTechnicianDefault: string;
  supportWhatsappNumber: string;
  freeShippingThreshold: number;
  whiteGloveAssemblyDefault: boolean;
}

export const DEFAULT_ECOMMERCE_SETTINGS: EcommerceSettingsPayload = {
  enableMadaCards: true,
  enableApplePay: true,
  moyasarPublishableKey: 'pk_test_demo_wdgroup_pub_2026',
  moyasarSecretKey: 'sk_test_demo_wdgroup_sec_2026',
  moyasarWebhookSecret: '',
  moyasarTestMode: false,
  enableTamara: true,
  tamaraApiToken: '',
  tamaraNotificationToken: '',
  tamaraTestMode: true,
  tamaraInstallmentsCount: 4,
  enableTabby: true,
  tabbyPublicKey: '',
  tabbySecretKey: '',
  tabbyWebhookSecret: '',
  tabbyTestMode: true,
  enablePdpBnplWidget: true,
  vatEnabled: true,
  vatRate: 15,
  taxNumber: '310492817400003',
  crNumber: '1010724891',
  companyNameAr: 'شركة تصاميم الوطن المحدودة - مجموعة دبليو دي',
  companyNameEn: 'WD Group for Contracting & Hospitality LLC',
  enableZatcaQr: true,
  enablePdfQuotation: true,
  enableSms: true,
  smsProvider: 'taqnyat',
  smsApiKey: '',
  smsSenderName: 'WD GROUP',
  notifySmsOrderConfirmation: true,
  notifySmsDispatch: true,
  enableOrderEmails: true,
  brevoApiKey: '',
  brevoSenderEmail: 'ceo@wdgroup.online',
  brevoSenderName: 'WD Group - GreenWood',
  adminAlertEmail: 'ceo@wdgroup.online',
  highTicketThreshold: 35000,
  attachZatcaInvoice: true,
  enableCustomerPortal: true,
  leadTechnicianDefault: 'م. فهد الغامدي',
  supportWhatsappNumber: '966505725070',
  freeShippingThreshold: 10000,
  whiteGloveAssemblyDefault: true,
};
