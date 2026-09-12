/**
 * Tabby BNPL (Split into 4 monthly payments, 0% interest) Gateway Client
 * Official Tabby API Spec: https://docs.tabby.ai
 */

import { getIntegrationsConfig } from '@/lib/admin/secrets';

export interface TabbyOrderItem {
  title: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  imageUrl?: string;
  productUrl?: string;
}

export interface TabbyBuyer {
  phone: string;
  email: string;
  name: string;
}

export interface CreateTabbySessionParams {
  orderRef: string;
  totalAmount: number;
  buyer: TabbyBuyer;
  city: string;
  address: string;
  items: TabbyOrderItem[];
  lang?: 'ar' | 'en';
  successUrl: string;
  cancelUrl: string;
  failureUrl: string;
}

export interface TabbySessionResult {
  success: boolean;
  checkoutUrl?: string;
  paymentId?: string;
  error?: string;
  isSimulated?: boolean;
}

/**
 * Initiates a Tabby checkout session and extracts the 4-installments redirect URL
 */
export async function createTabbyCheckoutSession(
  params: CreateTabbySessionParams
): Promise<TabbySessionResult> {
  const integrations = await getIntegrationsConfig().catch(() => null);
  const secretKey = integrations?.tabby_secret_key || process.env.TABBY_SECRET_KEY;
  const publicKey = integrations?.tabby_public_key || process.env.TABBY_PUBLIC_KEY;

  // Format Saudi phone (+966...)
  let cleanPhone = params.buyer.phone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('05')) {
    cleanPhone = '+966' + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith('+')) {
    cleanPhone = '+' + cleanPhone;
  }

  // Fallback / Sandbox Simulation Mode when no production API token is configured
  if (!secretKey && !publicKey) {
    console.warn(`[Tabby BNPL Sandbox Mode] No TABBY_SECRET_KEY set. Simulating checkout for order ${params.orderRef}.`);
    const simulatedCheckoutUrl = `/api/ecommerce/payments/bnpl/callback?payment=tabby&paymentStatus=approved&orderRef=${encodeURIComponent(
      params.orderRef
    )}&tabbyPaymentId=tabby_sim_${Date.now()}`;

    return {
      success: true,
      checkoutUrl: simulatedCheckoutUrl,
      paymentId: `tabby_sim_${Date.now()}`,
      isSimulated: true,
    };
  }

  const payload = {
    payment: {
      amount: params.totalAmount.toFixed(2),
      currency: 'SAR',
      description: `GreenWood Luxury Furniture Order #${params.orderRef}`,
      buyer: {
        phone: cleanPhone,
        email: params.buyer.email,
        name: params.buyer.name,
      },
      shipping_address: {
        city: params.city || 'Riyadh',
        address: params.address || 'Kingdom of Saudi Arabia',
        zip: '12345',
      },
      order: {
        reference_id: params.orderRef,
        items: params.items.map((i) => ({
          title: i.title,
          description: i.sku,
          quantity: i.quantity,
          unit_price: i.unitPrice.toFixed(2),
          reference_id: i.sku,
          image_url: i.imageUrl || 'https://wdgroup.online/brand/wd-group-logo-white.png',
          product_url: i.productUrl || `https://test.wdgroup.online/furniture/${encodeURIComponent(i.sku)}`,
        })),
      },
      buyer_history: {
        registered_since: new Date().toISOString(),
        loyalty_level: 0,
      },
    },
    lang: params.lang || 'ar',
    merchant_code: 'wdgroup',
    merchant_urls: {
      success: params.successUrl,
      cancel: params.cancelUrl,
      failure: params.failureUrl,
    },
  };

  try {
    const res = await fetch('https://api.tabby.ai/api/v2/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey || publicKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    // Check available products for installments
    const installmentsProduct = data?.configuration?.available_products?.installments?.[0];
    const webUrl = installmentsProduct?.web_url;

    if (res.ok && webUrl) {
      return {
        success: true,
        checkoutUrl: webUrl,
        paymentId: data?.payment?.id,
      };
    }

    if (data?.status === 'rejected') {
      return {
        success: false,
        error: 'Tabby has declined the installment request for this order amount or customer profile.',
      };
    }

    console.error('[Tabby API Error]:', data);
    return {
      success: false,
      error: data?.error || 'Failed to initiate Tabby installment session.',
    };
  } catch (err: any) {
    console.error('[Tabby Network Error]:', err);
    return {
      success: false,
      error: err?.message || 'Network error connecting to Tabby gateway.',
    };
  }
}
