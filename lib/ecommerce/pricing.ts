/**
 * WD Group - Authoritative Server-Side Pricing & Anti-Tampering Engine
 * Prevents client-side price manipulation, validates cart totals against
 * canonical catalog data, and enforces official VAT & promo rates.
 */

import { FURNITURE_CATALOG } from '@/lib/furnitureData';
import { getEcommerceSettings } from '@/lib/ecommerce/settings';

export interface RawOrderItem {
  productId?: string;
  id?: string;
  sku?: string;
  nameEn?: string;
  nameAr?: string;
  finishId?: string;
  finishNameEn?: string;
  finishNameAr?: string;
  unitPrice?: number;
  price?: number;
  quantity?: number;
  qty?: number;
  image?: string;
  images?: string[];
}

export interface VerifiedOrderItem {
  productId: string;
  sku: string;
  nameEn: string;
  nameAr: string;
  finishId: string;
  finishNameEn: string;
  finishNameAr: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  image: string;
}

export interface OrderPricingResult {
  isTampered: boolean;
  tamperReason?: string;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  discountedSubtotal: number;
  vatRate: number;
  vatAmount: number;
  totalAmount: number;
  items: VerifiedOrderItem[];
}

/**
 * Validates promo codes against authoritative rules
 */
export function resolvePromoDiscount(code?: string): number {
  if (!code) return 0;
  const normalized = code.trim().toUpperCase();

  switch (normalized) {
    case 'WDVIP10':
    case 'WD10':
      return 10;
    case 'GREENWOOD5':
    case 'SAUDI2030':
      return 5;
    default:
      return 0;
  }
}

/**
 * Authoritatively calculates order pricing on the server
 */
export async function calculateAuthoritativePricing(params: {
  items: RawOrderItem[];
  promoCode?: string;
  clientSubtotal?: number;
  clientVatAmount?: number;
  clientTotalAmount?: number;
}): Promise<OrderPricingResult> {
  const settings = await getEcommerceSettings().catch(() => null);
  const vatEnabled = settings?.vatEnabled !== false;
  const vatRate = vatEnabled ? (settings?.vatRate ?? 15) : 0;

  const verifiedItems: VerifiedOrderItem[] = [];
  let serverSubtotal = 0;
  let priceTampered = false;
  let tamperReason: string | undefined;

  for (const it of params.items) {
    const requestedId = it.productId || it.id;
    const requestedSku = it.sku;
    const requestedQty = Math.max(1, Math.floor(Number(it.quantity || it.qty || 1)));

    // Look up authoritative item in catalog
    const catalogItem = FURNITURE_CATALOG.find(
      (c) => (requestedId && c.id === requestedId) || (requestedSku && c.sku === requestedSku)
    );

    let authoritativeUnitPrice: number;
    let nameEn = it.nameEn || 'Luxury Furniture Piece';
    let nameAr = it.nameAr || 'قطعة أثاث فاخرة';
    let sku = it.sku || 'GW-BESPOKE';
    let image = it.image || (it.images && it.images[0]) || '';

    if (catalogItem) {
      authoritativeUnitPrice = catalogItem.price;
      nameEn = catalogItem.nameEn;
      nameAr = catalogItem.nameAr;
      sku = catalogItem.sku;
      image = image || catalogItem.images[0] || '';

      // Check if client submitted a tampered lower unit price
      const clientUnitPrice = Number(it.unitPrice || it.price);
      if (clientUnitPrice && Math.abs(clientUnitPrice - authoritativeUnitPrice) > 1) {
        priceTampered = true;
        tamperReason = `Client unitPrice (${clientUnitPrice} SAR) did not match catalog price (${authoritativeUnitPrice} SAR) for SKU ${sku}.`;
      }
    } else {
      // Bespoke piece / custom RFQ piece not in standard catalog
      authoritativeUnitPrice = Math.max(0, Number(it.unitPrice || it.price || 0));
    }

    const itemTotal = authoritativeUnitPrice * requestedQty;
    serverSubtotal += itemTotal;

    verifiedItems.push({
      productId: requestedId || sku,
      sku,
      nameEn,
      nameAr,
      finishId: it.finishId || 'standard',
      finishNameEn: it.finishNameEn || 'Standard Finish',
      finishNameAr: it.finishNameAr || 'التشطيب المعتمد',
      unitPrice: authoritativeUnitPrice,
      quantity: requestedQty,
      totalPrice: itemTotal,
      image,
    });
  }

  // Authoritative discount calculation
  const discountPercent = resolvePromoDiscount(params.promoCode);
  const discountAmount = Math.round(serverSubtotal * (discountPercent / 100));
  const discountedSubtotal = serverSubtotal - discountAmount;

  // Authoritative VAT calculation (Saudi ZATCA 15%)
  const vatAmount = vatEnabled ? Math.round(discountedSubtotal * (vatRate / 100)) : 0;
  const totalAmount = discountedSubtotal + vatAmount;

  // Check client grand total tampering
  if (params.clientTotalAmount !== undefined && params.clientTotalAmount !== null) {
    const diff = Math.abs(Number(params.clientTotalAmount) - totalAmount);
    if (diff > 1.5) {
      priceTampered = true;
      tamperReason = `Client total (${params.clientTotalAmount} SAR) diverges from server total (${totalAmount} SAR).`;
    }
  }

  return {
    isTampered: priceTampered,
    tamperReason,
    subtotal: serverSubtotal,
    discountPercent,
    discountAmount,
    discountedSubtotal,
    vatRate,
    vatAmount,
    totalAmount,
    items: verifiedItems,
  };
}
