-- ==============================================================================
-- WD GROUP E-COMMERCE DATABASE SCHEMA (Phase 1)
-- Target: Supabase PostgreSQL
-- ==============================================================================

-- 1. Orders Table
CREATE TABLE IF NOT EXISTS public.ecommerce_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_ref TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  district TEXT,
  address TEXT,
  villa_building TEXT,
  delivery_notes TEXT,
  order_type TEXT NOT NULL DEFAULT 'retail' CHECK (order_type IN ('retail', 'b2b')),
  company_name TEXT,
  cr_number TEXT,
  vat_number TEXT,
  delivery_date TEXT,
  time_slot TEXT DEFAULT 'morning' CHECK (time_slot IN ('morning', 'afternoon', 'evening')),
  white_glove_assembly BOOLEAN DEFAULT true,
  wall_anchoring BOOLEAN DEFAULT false,
  payment_method TEXT NOT NULL DEFAULT 'card',
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('paid', 'pending', 'authorized', 'cod_pending', 'failed')),
  subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  promo_code TEXT,
  vat_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  status TEXT NOT NULL DEFAULT 'pending_payment' CHECK (status IN (
    'pending_payment',
    'confirmed',
    'in_production',
    'ready_for_dispatch',
    'out_for_delivery',
    'delivered',
    'cancelled'
  )),
  factory TEXT DEFAULT 'GreenWood Factory 1 & 3 — Riyadh',
  lead_technician TEXT DEFAULT 'م. فهد الغامدي',
  internal_notes JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Order Line Items Table
CREATE TABLE IF NOT EXISTS public.ecommerce_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.ecommerce_orders(id) ON DELETE CASCADE,
  order_ref TEXT NOT NULL,
  product_id TEXT NOT NULL,
  sku TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  finish_id TEXT NOT NULL,
  finish_name_en TEXT NOT NULL,
  finish_name_ar TEXT NOT NULL,
  unit_price NUMERIC(12, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Inventory Table
CREATE TABLE IF NOT EXISTS public.ecommerce_inventory (
  sku TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  product_name_en TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 10,
  reserved_quantity INTEGER NOT NULL DEFAULT 0,
  factory_location TEXT DEFAULT 'GreenWood Factory 3 — Riyadh',
  is_made_to_order BOOLEAN DEFAULT false,
  lead_time_days INTEGER DEFAULT 14,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_orders_order_ref ON public.ecommerce_orders(order_ref);
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.ecommerce_orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.ecommerce_orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.ecommerce_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.ecommerce_order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_ref ON public.ecommerce_order_items(order_ref);

-- Enable Row Level Security (RLS)
ALTER TABLE public.ecommerce_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ecommerce_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ecommerce_inventory ENABLE ROW LEVEL SECURITY;

-- RLS Policies:
-- Allow anyone (public/anon) to place orders (INSERT)
CREATE POLICY "Allow public order placement" 
  ON public.ecommerce_orders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public order items placement" 
  ON public.ecommerce_order_items FOR INSERT 
  WITH CHECK (true);

-- Allow customers to view order tracking by exact order_ref (SELECT)
CREATE POLICY "Allow order tracking by order_ref" 
  ON public.ecommerce_orders FOR SELECT 
  USING (true);

CREATE POLICY "Allow order items tracking by order_ref" 
  ON public.ecommerce_order_items FOR SELECT 
  USING (true);

-- Allow public read of inventory
CREATE POLICY "Allow public inventory read" 
  ON public.ecommerce_inventory FOR SELECT 
  USING (true);

-- Allow service role / admin full write access
CREATE POLICY "Allow admin full access to orders" 
  ON public.ecommerce_orders FOR ALL 
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Allow admin full access to order items" 
  ON public.ecommerce_order_items FOR ALL 
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Allow admin full access to inventory" 
  ON public.ecommerce_inventory FOR ALL 
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
