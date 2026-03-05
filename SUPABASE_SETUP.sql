-- ========================================
-- Supabase Setup Script
-- ========================================
-- Copy & paste each section into Supabase SQL Editor
-- https://app.supabase.com → Your Project → SQL Editor → New Query

-- ========================================
-- TABLE 1: Products (Existing)
-- ========================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- ========================================
-- TABLE 2: Customer Contacts (NEW)
-- ========================================
CREATE TABLE IF NOT EXISTS customer_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  message TEXT NOT NULL,
  contact_source VARCHAR(50) NOT NULL DEFAULT 'contact_form' 
    CHECK (contact_source IN ('zalo', 'facebook', 'phone', 'contact_form')),
  status VARCHAR(50) NOT NULL DEFAULT 'new' 
    CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  interested_products TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_customer_status ON customer_contacts(status);
CREATE INDEX IF NOT EXISTS idx_customer_created ON customer_contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customer_phone ON customer_contacts(phone);
CREATE INDEX IF NOT EXISTS idx_customer_source ON customer_contacts(contact_source);

-- Enable RLS
ALTER TABLE customer_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies (Optional: if you want to restrict access)
CREATE POLICY "Enable read access for authenticated users"
  ON customer_contacts
  FOR SELECT
  USING (true);  -- Change to (auth.jwt() ->> 'sub' IS NOT NULL) if you want to restrict

CREATE POLICY "Enable insert for all users"
  ON customer_contacts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
  ON customer_contacts
  FOR UPDATE
  USING (true);  -- Change to (auth.jwt() ->> 'sub' IS NOT NULL) if admin only

CREATE POLICY "Enable delete for authenticated users"
  ON customer_contacts
  FOR DELETE
  USING (true);  -- Change to (auth.jwt() ->> 'sub' IS NOT NULL) if admin only

-- Create trigger for updated_at
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
-- VERIFICATION (Run these to verify)
-- ========================================
-- SELECT count(*) as products_count FROM products;
-- SELECT count(*) as contacts_count FROM customer_contacts;
-- SELECT * FROM customer_contacts LIMIT 5;

-- ========================================
-- TEST DATA (Optional: Insert sample data)
-- ========================================
-- INSERT INTO customer_contacts (name, phone, message, contact_source, status) VALUES
-- ('Nguyễn Văn A', '0912345678', 'Tôi muốn tư vấn về vòng tay phong thủy mệnh Kim', 'zalo', 'new'),
-- ('Trần Thị B', '0987654321', 'Tôi muốn biết sản phẩm nào phù hợp với mệnh của mình', 'facebook', 'contacted'),
-- ('Lê Văn C', '0966666666', 'Bạn có sản phẩm gì cho mệnh Thủy?', 'phone', 'new');


-- Tạo Policy cho phép đọc công khai
CREATE POLICY "Allow public read on products" ON products
  FOR SELECT USING (true);

-- Tạo Policy cho phép insert/update/delete (bạn có thể hạn chế bằng JWT sau)
CREATE POLICY "Allow insert on products" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update on products" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete on products" ON products
  FOR DELETE USING (true);

-- Thêm sample data
INSERT INTO products (name, description, price, category, image_url) VALUES
  ('Áo Thun Nam', 'Áo thun cotton 100%, thoáng mát', 150000, 'Áo', 'https://via.placeholder.com/300x300?text=Tshirt'),
  ('Quần Jean Nam', 'Quần jean chất lượng cao, bền đẹp', 350000, 'Quần', 'https://via.placeholder.com/300x300?text=Jeans'),
  ('Giày Thể Thao', 'Giày thể thao thoáng khí, êm chân', 450000, 'Giày', 'https://via.placeholder.com/300x300?text=Shoes');
