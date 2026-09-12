/**
 * Tamara BNPL (Buy-Now-Pay-Later) Gateway Client
 * Handles 3 / 4 Monthly Installments (0% Interest) in Saudi Arabia (SAR)
 * Official API Spec: https://developer.tamara.co
 */

import { getIntegrationsConfig } from '@/lib/admin/secrets';

export interface TamaraOrderItem {
  name: string;
  referenceId: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  imageUrl?: string;
}

export interface TamaraConsumer {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface TamaraAddress {
  firstName: string;
  lastName: string;
  line1: string;
  city: string;
  countryCode: string; // 'SA'
  phone: string;
}

export interface CreateTamaraSessionParams {
  orderRef: string;
  totalAmount: number;
  consumer: TamaraConsumer;
  shippingAddress: TamaraAddress;
  items: TamaraOrderItem[];
  installmentsCount?: 3 | 4;
  successUrl: string;
  cancelUrl: string;
  failureUrl: string;
}

export interface TamaraSessionResult {
  success: boolean;
  checkoutUrl?: string;
  orderId?: string;
  error?: string;
  isSimulated?: boolean;
}

/**
 * Initiates a Tamara checkout session and returns the hosted checkout URL
 */
export async function createTamaraCheckoutSession(
  params: CreateTamaraSessionParams
): Promise<TamaraSessionResult> {
  const integrations = await getIntegrationsConfig().catch(() => null);
  const apiToken = integrations?.tamara_api_token || process.env.TAMARA_API_TOKEN;
  const isTestMode = integrations?.tamara_test_mode !== false && (process.env.TAMARA_TEST_MODE !== 'false');

  const baseUrl = isTestMode
    ? 'https://api-sandbox.tamara.co'
    : 'https://api.tamara.co';

  // Format Saudi phone (+966...)
  let cleanPhone = params.consumer.phone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('05')) {
    cleanPhone = '966' + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith('966')) {
    cleanPhone = '966' + cleanPhone;
  }

  // Fallback / Sandbox Simulation Mode when no production API token is configured
  if (!apiToken || apiToken === 'test' || apiToken.includes('placeholder')) {
    console.warn(`[Tamara BNPL Sandbox Mode] No live TAMARA_API_TOKEN set. Simulating checkout for order ${params.orderRef}.`);
    const simulatedCheckoutUrl = `/api/ecommerce/payments/bnpl/callback?payment=tamara&paymentStatus=approved&orderRef=${encodeURIComponent(
      params.orderRef
    )}&tamaraOrderId=tamara_sim_${Date.now()}`;

    return {
      success: true,
      checkoutUrl: simulatedCheckoutUrl,
      orderId: `tamara_sim_${Date.now()}`,
      isSimulated: true,
    };
  }

  const payload = {
    order_reference_id: params.orderRef,
    total_amount: {
      amount: Number(params.totalAmount.toFixed(2)),
      currency: 'SAR',
    },
    description: `WD Group GreenWood Furniture Order #${params.orderRef}`,
    country_code: 'SA',
    payment_type: 'PAY_BY_INSTALMENTS',
    instalments: params.installmentsCount || 4,
    consumer: {
      first_name: params.consumer.firstName || 'Valued',
      last_name: params.consumer.lastName || 'Client',
      phone_number: cleanPhone,
      email: params.consumer.email,
    },
    shipping_address: {
      first_name: params.shippingAddress.firstName || params.consumer.firstName,
      last_name: params.shippingAddress.lastName || params.consumer.lastName,
      line1: params.shippingAddress.line1 || 'Riyadh, Saudi Arabia',
      city: params.shippingAddress.city || 'Riyadh',
      country_code: 'SA',
      phone_number: cleanPhone,
    },
    billing_address: {
      first_name: params.shippingAddress.firstName || params.consumer.firstName,
      last_name: params.shippingAddress.lastName || params.consumer.lastName,
      line1: params.shippingAddress.line1 || 'Riyadh, Saudi Arabia',
      city: params.shippingAddress.city || 'Riyadh',
      country_code: 'SA',
      phone_number: cleanPhone,
    },
    items: params.items.map((i) => ({
      name: i.name,
      reference_id: i.referenceId || i.sku,
      sku: i.sku,
      quantity: i.quantity,
      unit_price: {
        amount: Number(i.unitPrice.toFixed(2)),
        currency: 'SAR',
      },
      total_amount: {
        amount: Number(i.totalAmount.toFixed(2)),
        currency: 'SAR',
      },
      type: 'Physical',
      item_url: `https://test.wdgroup.online/furniture/${encodeURIComponent(i.sku)}`,
      image_url: i.imageUrl || 'https://wdgroup.online/brand/wd-group-logo-white.png',
    })),
    merchant_url: {
      success: params.successUrl,
      cancel: params.cancelUrl,
      failure: params.failureUrl,
      notification: 'https://test.wdgroup.online/api/ecommerce/webhooks/bnpl?provider=tamara',
    },
  };

  try {
    const res = await fetch(`${baseUrl}/checkout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.checkout_url) {
      return {
        success: true,
        checkoutUrl: data.checkout_url,
        orderId: data.order_id,
      };
    }

    console.error('[Tamara API Error]:', data);
    return {
      success: false,
      error: data.message || 'Failed to initiate Tamara installment session.',
    };
  } catch (err: any) {
    console.error('[Tamara Network Error]:', err);
    return {
      success: false,
      error: err?.message || 'Network error connecting to Tamara.',
    };
  }
}

/**
 * Authorizes a completed Tamara order upon customer return
 */
export async function authorizeTamaraOrder(orderId: string): Promise<{ success: boolean; status?: string; error?: string }> {
  if (orderId.startsWith('tamara_sim_')) {
    return { success: true, status: 'authorised' };
  }

  const integrations = await getIntegrationsConfig().catch(() => null);
  const apiToken = integrations?.tamara_api_token || process.env.TAMARA_API_TOKEN;
  const isTestMode = integrations?.tamara_test_mode !== false && (process.env.TAMARA_TEST_MODE !== 'false');

  const baseUrl = isTestMode ? 'https://api-sandbox.tamara.co' : 'https://api.tamara.co';

  try {
    const res = await fetch(`${baseUrl}/orders/${encodeURIComponent(orderId)}/authorise`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (res.ok && (data.status === 'authorised' || data.status === 'approved')) {
      return { success: true, status: data.status };
    }

    return { success: false, error: data.message || 'Tamara order authorization failed.' };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
