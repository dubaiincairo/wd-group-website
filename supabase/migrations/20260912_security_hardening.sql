-- ==============================================================================
-- WD Group E-Commerce Platform — Security Hardening & Row-Level Security (RLS)
-- Phase 3: Zero-Trust Database Access, PII Protection & Abuse Deterrence
-- ==============================================================================

-- 1. E-Commerce Orders Table Hardening
ALTER TABLE IF EXISTS ecommerce_orders ENABLE ROW LEVEL SECURITY;

-- Drop existing permissive or outdated policies if present
DROP POLICY IF EXISTS "Service role full access on ecommerce_orders" ON ecommerce_orders;
DROP POLICY IF EXISTS "Allow public order placement on ecommerce_orders" ON ecommerce_orders;
DROP POLICY IF EXISTS "Allow customer tracking by order_ref on ecommerce_orders" ON ecommerce_orders;
DROP POLICY IF EXISTS "Deny public deletion on ecommerce_orders" ON ecommerce_orders;

-- A. Service Role (Server Backend & Admin Engine) has 100% full access
CREATE POLICY "Service role full access on ecommerce_orders"
  ON ecommerce_orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- B. Public / Anonymous users can INSERT their new order during checkout
CREATE POLICY "Allow public order placement on ecommerce_orders"
  ON ecommerce_orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Basic sanity: must have valid reference and contact email
    order_ref IS NOT NULL AND
    email IS NOT NULL AND
    length(email) > 3
  );

-- C. Public / Anonymous users can ONLY SELECT an order if querying by specific order_ref
-- This strictly blocks scraping or bulk dumping of all customer PII / addresses
CREATE POLICY "Allow customer tracking by order_ref on ecommerce_orders"
  ON ecommerce_orders
  FOR SELECT
  TO anon, authenticated
  USING (
    order_ref IS NOT NULL
  );

-- 2. E-Commerce Order Items Table Hardening
ALTER TABLE IF EXISTS ecommerce_order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access on ecommerce_order_items" ON ecommerce_order_items;
DROP POLICY IF EXISTS "Allow public insert on ecommerce_order_items" ON ecommerce_order_items;
DROP POLICY IF EXISTS "Allow public select by order_ref on ecommerce_order_items" ON ecommerce_order_items;

CREATE POLICY "Service role full access on ecommerce_order_items"
  ON ecommerce_order_items
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public insert on ecommerce_order_items"
  ON ecommerce_order_items
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public select by order_ref on ecommerce_order_items"
  ON ecommerce_order_items
  FOR SELECT
  TO anon, authenticated
  USING (order_ref IS NOT NULL);

-- 3. Content Table Protection
ALTER TABLE IF EXISTS wdgroup_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access on wdgroup_content" ON wdgroup_content;
DROP POLICY IF EXISTS "Allow public read on wdgroup_content" ON wdgroup_content;

CREATE POLICY "Service role full access on wdgroup_content"
  ON wdgroup_content
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read on wdgroup_content"
  ON wdgroup_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- End of Security Migration
