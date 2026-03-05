-- ⬆️ UPDATE DATABASE SCHEMA - Thêm Màu sắc, Sizes, Stock, Password Admin

-- 1️⃣ Thêm cột "colors" vào products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS colors JSON DEFAULT '[]' COMMENT 'Danh sách màu sắc của sản phẩm';

-- 2️⃣ Thêm cột "sizes" vào products table  
ALTER TABLE products
ADD COLUMN IF NOT EXISTS sizes JSON DEFAULT '[]' COMMENT 'Danh sách kích cỡ';

-- 3️⃣ Thêm cột "stock" vào products table
ALTER TABLE products
ADD COLUMN IF NOT EXISTS stock INT DEFAULT 0 COMMENT 'Số lượng tồn kho';

-- 4️⃣ Tạo bảng admin passwords (để bảo mật)
CREATE TABLE IF NOT EXISTS admin_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_password VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5️⃣ Tạo bucket Storage cho ảnh sản phẩm
-- (Thực hiện này trong Supabase Dashboard: Storage → Create bucket "products")
-- Bucket name: products
-- Public: YES (để ảnh công khai)

-- 6️⃣ Insert default admin password (thay đổi sau!)
INSERT INTO admin_config (admin_password) VALUES ('admin123') ON CONFLICT DO NOTHING;

-- 7️⃣ Cập nhật RLS cho admin_config table
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow select admin config" ON admin_config
  FOR SELECT USING (true);

-- ✅ Done! Bây giờ schema đã sẵn sàng cho colors, sizes, stock!
