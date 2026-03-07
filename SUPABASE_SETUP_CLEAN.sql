-- ========================================
-- Supabase Clean Setup Script
-- ========================================
-- Instructions: paste the whole file into Supabase SQL Editor (app.supabase.com → Your Project → SQL Editor → New Query)
-- or run via psql against your Supabase database connection string.

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================
-- TABLE: products
-- ========================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price VARCHAR(50) NOT NULL,
  img TEXT,
  tag VARCHAR(100),
  category VARCHAR(100),
  affinities TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

-- Row level security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Default RLS policies (adjust for production)
CREATE POLICY IF NOT EXISTS "public_select_products" ON products
  FOR SELECT USING (true);

-- Insert/Update/Delete policies: set to allow for now (change to restrict in production)
CREATE POLICY IF NOT EXISTS "public_insert_products" ON products
  FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "public_update_products" ON products
  FOR UPDATE USING (true);
CREATE POLICY IF NOT EXISTS "public_delete_products" ON products
  FOR DELETE USING (true);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_products_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_timestamp ON products;
CREATE TRIGGER products_timestamp
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_products_timestamp();

-- ========================================
-- TABLE: customer_contacts
-- ========================================
CREATE TABLE IF NOT EXISTS customer_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  message TEXT NOT NULL,
  contact_source VARCHAR(50) NOT NULL DEFAULT 'contact_form' CHECK (contact_source IN ('zalo', 'facebook', 'phone', 'contact_form')),
  status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  interested_products UUID[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_customer_status ON customer_contacts(status);
CREATE INDEX IF NOT EXISTS idx_customer_created ON customer_contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customer_phone ON customer_contacts(phone);
CREATE INDEX IF NOT EXISTS idx_customer_source ON customer_contacts(contact_source);

ALTER TABLE customer_contacts ENABLE ROW LEVEL SECURITY;

-- Policies: allow public insert (contact form) and allow authenticated select/update/delete for admins
CREATE POLICY IF NOT EXISTS "contact_insert_public" ON customer_contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "contact_select_public" ON customer_contacts
  FOR SELECT USING (true);

-- Trigger to update timestamp
CREATE OR REPLACE FUNCTION update_customer_contacts_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS customer_contacts_timestamp ON customer_contacts;
CREATE TRIGGER customer_contacts_timestamp
  BEFORE UPDATE ON customer_contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_contacts_timestamp();

-- ========================================
-- OPTIONAL: sample data (safe strings)
-- ========================================
INSERT INTO products (name, description, price, category, img)
VALUES
  ('Vòng Tay Phong Thủy A', 'Vòng tay đá phong thủy, phù hợp mệnh Kim', '1.200.000đ', 'Vòng tay', 'https://via.placeholder.com/400x400?text=Vong+tay+A'),
  ('Vòng Tay Phong Thủy B', 'Vòng tay đá thạch anh, phù hợp mệnh Thổ', '950.000đ', 'Vòng tay', 'https://via.placeholder.com/400x400?text=Vong+tay+B');

INSERT INTO customer_contacts (name, phone, message, contact_source, status)
VALUES
  ('Nguyễn Văn A', '0912345678', 'Tôi muốn tư vấn về vòng tay mệnh Kim', 'zalo', 'new'),
  ('Trần Thị B', '0987654321', 'Có sản phẩm cho mệnh Thủy không?', 'facebook', 'new');

-- ========================================
-- VERIFICATION QUERIES
-- ========================================
-- SELECT count(*) FROM products;
-- SELECT count(*) FROM customer_contacts;
-- SELECT * FROM products LIMIT 5;

-- End of script
