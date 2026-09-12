import type { EcommerceOrderRecord, EcommerceOrderItem, EcommerceOrderStatus, InternalNote } from './types';
import { getSiteContent, updateSiteContent } from './db';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqkbgfdasfwnryekkgqz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxa2JnZmRhc2Z3bnJ5ZWtrZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTAyMDYsImV4cCI6MjEwMzE2NjIwNn0.IRPdvlCIbeTtFNf8TMc353fT-tlLxYq0Mx3P2HHmM3Q';

const defaultHeaders = {
  'apikey': supabaseAnonKey,
  'Authorization': `Bearer ${supabaseAnonKey}`,
  'Content-Type': 'application/json',
};

export interface CreateOrderInput {
  orderRef: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  district?: string;
  address?: string;
  villaBuilding?: string;
  deliveryNotes?: string;
  orderType: 'retail' | 'b2b';
  companyName?: string;
  crNumber?: string;
  vatNumber?: string;
  deliveryDate?: string;
  timeSlot?: 'morning' | 'afternoon' | 'evening';
  whiteGloveAssembly?: boolean;
  wallAnchoring?: boolean;
  paymentMethod: string;
  paymentStatus?: 'paid' | 'pending' | 'authorized' | 'cod_pending';
  subtotal: number;
  discountAmount?: number;
  promoCode?: string;
  vatAmount: number;
  totalAmount: number;
  items: Array<{
    productId: string;
    sku: string;
    nameEn: string;
    nameAr: string;
    finishId: string;
    finishNameEn: string;
    finishNameAr: string;
    unitPrice: number;
    quantity: number;
    image: string;
  }>;
}

/**
 * 1. Create a new e-commerce order with automated dual-layer persistence
 */
export async function createEcommerceOrder(input: CreateOrderInput): Promise<EcommerceOrderRecord> {
  const now = new Date().toISOString();
  const orderId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `ord-${Date.now()}`;

  const orderRecord: EcommerceOrderRecord = {
    id: orderId,
    orderRef: input.orderRef,
    customerName: input.customerName,
    email: input.email.toLowerCase().trim(),
    phone: input.phone.trim(),
    city: input.city,
    district: input.district || '',
    address: input.address || '',
    villaBuilding: input.villaBuilding || '',
    deliveryNotes: input.deliveryNotes || '',
    orderType: input.orderType || 'retail',
    companyName: input.companyName,
    crNumber: input.crNumber,
    vatNumber: input.vatNumber,
    deliveryDate: input.deliveryDate || new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    timeSlot: input.timeSlot || 'morning',
    whiteGloveAssembly: input.whiteGloveAssembly ?? true,
    wallAnchoring: input.wallAnchoring ?? false,
    paymentMethod: input.paymentMethod,
    paymentStatus: input.paymentStatus || 'pending',
    subtotal: input.subtotal,
    discountAmount: input.discountAmount || 0,
    promoCode: input.promoCode || undefined,
    vatAmount: input.vatAmount,
    totalAmount: input.totalAmount,
    status: 'pending_payment',
    factory: 'GreenWood Factory 1 & 3 — Riyadh',
    leadTechnician: 'م. فهد الغامدي',
    items: input.items.map((it) => ({
      productId: it.productId,
      sku: it.sku,
      nameEn: it.nameEn,
      nameAr: it.nameAr,
      finishId: it.finishId,
      finishNameEn: it.finishNameEn,
      finishNameAr: it.finishNameAr,
      unitPrice: it.unitPrice,
      quantity: it.quantity,
      image: it.image,
    })),
    internalNotes: [
      {
        id: `note-${Date.now()}`,
        text: `Order created via online portal (${input.orderType === 'b2b' ? 'B2B Hospitality RFQ' : 'Retail Direct'}).`,
        author: 'System',
        authorEmail: 'system@wdgroup.online',
        createdAt: now,
      },
    ],
    createdAt: now,
    updatedAt: now,
  };

  // Attempt A: Direct insert into dedicated `ecommerce_orders` and `ecommerce_order_items`
  try {
    const orderPayload = {
      id: orderRecord.id,
      order_ref: orderRecord.orderRef,
      customer_name: orderRecord.customerName,
      email: orderRecord.email,
      phone: orderRecord.phone,
      city: orderRecord.city,
      district: orderRecord.district,
      address: orderRecord.address,
      villa_building: orderRecord.villaBuilding,
      delivery_notes: orderRecord.deliveryNotes,
      order_type: orderRecord.orderType,
      company_name: orderRecord.companyName,
      cr_number: orderRecord.crNumber,
      vat_number: orderRecord.vatNumber,
      delivery_date: orderRecord.deliveryDate,
      time_slot: orderRecord.timeSlot,
      white_glove_assembly: orderRecord.whiteGloveAssembly,
      wall_anchoring: orderRecord.wallAnchoring,
      payment_method: orderRecord.paymentMethod,
      payment_status: orderRecord.paymentStatus,
      subtotal: orderRecord.subtotal,
      discount_amount: orderRecord.discountAmount,
      promo_code: orderRecord.promoCode,
      vat_amount: orderRecord.vatAmount,
      total_amount: orderRecord.totalAmount,
      status: orderRecord.status,
      factory: orderRecord.factory,
      lead_technician: orderRecord.leadTechnician,
      internal_notes: orderRecord.internalNotes,
      created_at: now,
      updated_at: now,
    };

    const res = await fetch(`${supabaseUrl}/rest/v1/ecommerce_orders`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(orderPayload),
    });

    if (res.ok) {
      // Insert items
      if (orderRecord.items.length > 0) {
        const itemsPayload = orderRecord.items.map((item) => ({
          order_id: orderRecord.id,
          order_ref: orderRecord.orderRef,
          product_id: item.productId,
          sku: item.sku,
          name_en: item.nameEn,
          name_ar: item.nameAr,
          finish_id: item.finishId,
          finish_name_en: item.finishNameEn,
          finish_name_ar: item.finishNameAr,
          unit_price: item.unitPrice,
          quantity: item.quantity,
          image: item.image,
          created_at: now,
        }));

        await fetch(`${supabaseUrl}/rest/v1/ecommerce_order_items`, {
          method: 'POST',
          headers: {
            ...defaultHeaders,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify(itemsPayload),
        }).catch((e) => console.warn('Failed to insert order items to separate table:', e));
      }

      // Also mirror in backup store asynchronously
      mirrorOrderToCentralContent(orderRecord).catch(() => {});

      return orderRecord;
    }
  } catch (err) {
    console.warn('Dedicated ecommerce_orders table insert failed, falling back to central store:', err);
  }

  // Attempt B: Fallback buffer in `wdgroup_content` table
  await mirrorOrderToCentralContent(orderRecord);
  return orderRecord;
}

/**
 * Mirror order into central wdgroup_content store
 */
async function mirrorOrderToCentralContent(order: EcommerceOrderRecord): Promise<void> {
  try {
    const siteContent = (await getSiteContent()) || {};
    const existingOrders: EcommerceOrderRecord[] = siteContent.ecommerce_orders || [];
    const filtered = existingOrders.filter((o) => o.orderRef !== order.orderRef);
    const updated = [order, ...filtered].slice(0, 100); // keep most recent 100
    await updateSiteContent({ ecommerce_orders: updated } as any);
  } catch (e) {
    console.error('Failed to mirror order in wdgroup_content:', e);
  }
}

/**
 * 2. Fetch order by order_ref for customer tracking
 */
export async function getEcommerceOrderByRef(orderRef: string): Promise<EcommerceOrderRecord | null> {
  if (!orderRef || typeof orderRef !== 'string') return null;
  const cleanRef = orderRef.trim().toUpperCase();

  // 1. Try dedicated table
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/ecommerce_orders?order_ref=eq.${encodeURIComponent(cleanRef)}&select=*`,
      {
        headers: defaultHeaders,
        cache: 'no-store',
      }
    );

    if (res.ok) {
      const rows = await res.json();
      if (rows && rows.length > 0) {
        const o = rows[0];

        // Fetch associated items
        let items: EcommerceOrderItem[] = [];
        try {
          const itemsRes = await fetch(
            `${supabaseUrl}/rest/v1/ecommerce_order_items?order_ref=eq.${encodeURIComponent(cleanRef)}&select=*`,
            { headers: defaultHeaders, cache: 'no-store' }
          );
          if (itemsRes.ok) {
            const itemRows = await itemsRes.json();
            items = itemRows.map((it: any) => ({
              productId: it.product_id,
              sku: it.sku,
              nameEn: it.name_en,
              nameAr: it.name_ar,
              finishId: it.finish_id,
              finishNameEn: it.finish_name_en,
              finishNameAr: it.finish_name_ar,
              unitPrice: Number(it.unit_price) || 0,
              quantity: Number(it.quantity) || 1,
              image: it.image || '',
            }));
          }
        } catch {}

        return {
          id: o.id,
          orderRef: o.order_ref,
          customerName: o.customer_name,
          email: o.email,
          phone: o.phone,
          city: o.city,
          district: o.district || '',
          address: o.address || '',
          villaBuilding: o.villa_building || '',
          deliveryNotes: o.delivery_notes || '',
          orderType: o.order_type || 'retail',
          companyName: o.company_name,
          crNumber: o.cr_number,
          vatNumber: o.vat_number,
          deliveryDate: o.delivery_date,
          timeSlot: o.time_slot || 'morning',
          whiteGloveAssembly: Boolean(o.white_glove_assembly),
          wallAnchoring: Boolean(o.wall_anchoring),
          paymentMethod: o.payment_method,
          paymentStatus: o.payment_status,
          subtotal: Number(o.subtotal) || 0,
          discountAmount: Number(o.discount_amount) || 0,
          promoCode: o.promo_code,
          vatAmount: Number(o.vat_amount) || 0,
          totalAmount: Number(o.total_amount) || 0,
          status: o.status as EcommerceOrderStatus,
          factory: o.factory,
          leadTechnician: o.lead_technician,
          items: items.length > 0 ? items : (o.items || []),
          internalNotes: Array.isArray(o.internal_notes) ? o.internal_notes : [],
          createdAt: o.created_at,
          updatedAt: o.updated_at,
        };
      }
    }
  } catch (err) {
    console.warn('Error reading from ecommerce_orders table:', err);
  }

  // 2. Check central wdgroup_content fallback
  try {
    const siteContent = await getSiteContent();
    const existingOrders: EcommerceOrderRecord[] = siteContent?.ecommerce_orders || [];
    const found = existingOrders.find(
      (o) => o.orderRef.toUpperCase() === cleanRef || o.orderRef.replace(/[^0-9]/g, '') === cleanRef.replace(/[^0-9]/g, '')
    );
    if (found) return found;
  } catch (err) {
    console.error('Error searching in wdgroup_content fallback:', err);
  }

  return null;
}

/**
 * 3. List all orders for Admin Portal
 */
export async function listEcommerceOrders(params?: {
  status?: string;
  orderType?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<{ orders: EcommerceOrderRecord[]; total: number }> {
  // Try dedicated table first
  try {
    let url = `${supabaseUrl}/rest/v1/ecommerce_orders?select=*`;
    if (params?.status && params.status !== 'all') {
      url += `&status=eq.${encodeURIComponent(params.status)}`;
    }
    if (params?.orderType && params.orderType !== 'all') {
      url += `&order_type=eq.${encodeURIComponent(params.orderType)}`;
    }
    if (params?.search) {
      const q = encodeURIComponent(params.search);
      url += `&or=(order_ref.ilike.*${q}*,customer_name.ilike.*${q}*,email.ilike.*${q}*,phone.ilike.*${q}*)`;
    }
    url += `&order=created_at.desc`;
    if (params?.limit) url += `&limit=${params.limit}`;
    if (params?.offset) url += `&offset=${params.offset}`;

    const res = await fetch(url, {
      headers: {
        ...defaultHeaders,
        'Prefer': 'count=exact',
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const contentRange = res.headers.get('content-range');
      const count = contentRange ? parseInt(contentRange.split('/')[1] || '0', 10) : 0;
      const rows = await res.json();

      if (rows && rows.length > 0) {
        const formatted: EcommerceOrderRecord[] = rows.map((o: any) => ({
          id: o.id,
          orderRef: o.order_ref,
          customerName: o.customer_name,
          email: o.email,
          phone: o.phone,
          city: o.city,
          district: o.district || '',
          address: o.address || '',
          villaBuilding: o.villa_building || '',
          deliveryNotes: o.delivery_notes || '',
          orderType: o.order_type || 'retail',
          companyName: o.company_name,
          crNumber: o.cr_number,
          vatNumber: o.vat_number,
          deliveryDate: o.delivery_date,
          timeSlot: o.time_slot || 'morning',
          whiteGloveAssembly: Boolean(o.white_glove_assembly),
          wallAnchoring: Boolean(o.wall_anchoring),
          paymentMethod: o.payment_method,
          paymentStatus: o.payment_status,
          subtotal: Number(o.subtotal) || 0,
          discountAmount: Number(o.discount_amount) || 0,
          promoCode: o.promo_code,
          vatAmount: Number(o.vat_amount) || 0,
          totalAmount: Number(o.total_amount) || 0,
          status: o.status as EcommerceOrderStatus,
          factory: o.factory,
          leadTechnician: o.lead_technician,
          items: Array.isArray(o.items) ? o.items : [],
          internalNotes: Array.isArray(o.internal_notes) ? o.internal_notes : [],
          createdAt: o.created_at,
          updatedAt: o.updated_at,
        }));
        return { orders: formatted, total: isNaN(count) ? formatted.length : count };
      }
    }
  } catch (err) {
    console.warn('Could not query ecommerce_orders table, falling back to central store:', err);
  }

  // Fallback to central store
  try {
    const siteContent = await getSiteContent();
    let list: EcommerceOrderRecord[] = siteContent?.ecommerce_orders || [];

    if (params?.status && params.status !== 'all') {
      list = list.filter((o) => o.status === params.status);
    }
    if (params?.orderType && params.orderType !== 'all') {
      list = list.filter((o) => o.orderType === params.orderType);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (o) =>
          o.orderRef.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.email.toLowerCase().includes(q) ||
          o.phone.includes(q)
      );
    }

    return { orders: list, total: list.length };
  } catch (err) {
    return { orders: [], total: 0 };
  }
}

/**
 * 4. Update order status / stage and technician
 */
export async function updateEcommerceOrderStatus(
  orderRef: string,
  newStatus: EcommerceOrderStatus,
  leadTechnician?: string,
  noteText?: string
): Promise<boolean> {
  const cleanRef = orderRef.trim().toUpperCase();
  const now = new Date().toISOString();

  // Try updating in dedicated table
  try {
    const patchBody: any = {
      status: newStatus,
      updated_at: now,
    };
    if (leadTechnician) patchBody.lead_technician = leadTechnician;

    const res = await fetch(`${supabaseUrl}/rest/v1/ecommerce_orders?order_ref=eq.${encodeURIComponent(cleanRef)}`, {
      method: 'PATCH',
      headers: {
        ...defaultHeaders,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(patchBody),
    });

    if (res.ok) {
      return true;
    }
  } catch (err) {
    console.warn('Error patching ecommerce_orders table:', err);
  }

  // Fallback update in central store
  try {
    const siteContent = (await getSiteContent()) || {};
    const existingOrders: EcommerceOrderRecord[] = siteContent.ecommerce_orders || [];
    const idx = existingOrders.findIndex((o) => o.orderRef.toUpperCase() === cleanRef);

    if (idx > -1) {
      existingOrders[idx].status = newStatus;
      if (leadTechnician) existingOrders[idx].leadTechnician = leadTechnician;
      existingOrders[idx].updatedAt = now;

      if (noteText) {
        existingOrders[idx].internalNotes = existingOrders[idx].internalNotes || [];
        existingOrders[idx].internalNotes.push({
          id: `note-${Date.now()}`,
          text: noteText,
          author: 'Admin',
          authorEmail: 'admin@wdgroup.online',
          createdAt: now,
        });
      }

      await updateSiteContent({ ecommerce_orders: existingOrders } as any);
      return true;
    }
  } catch (err) {
    console.error('Error updating status in central store:', err);
  }

  return false;
}
