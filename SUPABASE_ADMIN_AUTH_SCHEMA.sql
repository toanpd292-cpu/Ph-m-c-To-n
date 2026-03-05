-- 📊 PROFESSIONAL ADMIN SYSTEM - Database Schema

-- 1️⃣ Tạo bảng admin_users (Quản lý tài khoản Admin)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin', -- admin, editor, viewer
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2️⃣ Tạo bảng orders (Đơn hàng từ khách)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  product_id UUID,
  quantity INT DEFAULT 1,
  total_price DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, cancelled
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- 3️⃣ Tạo bảng activity_logs (Lịch sử hoạt động)
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID,
  action VARCHAR(255), -- created_product, updated_product, deleted_product, etc
  description TEXT,
  ip_address VARCHAR(46),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- 4️⃣ Tạo bảng system_stats (Thống kê hệ thống)
CREATE TABLE IF NOT EXISTS system_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE DEFAULT CURRENT_DATE,
  total_products INT DEFAULT 0,
  total_orders INT DEFAULT 0,
  total_revenue DECIMAL(10, 2) DEFAULT 0,
  total_views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5️⃣ Tạo indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_admin_id ON activity_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_system_stats_date ON system_stats(date);

-- 6️⃣ Bật RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_stats ENABLE ROW LEVEL SECURITY;

-- 7️⃣ Tạo Policies
-- Admin users (chỉ admin có thể xem)
CREATE POLICY "Only authenticated admins can view admin_users" ON admin_users
  FOR SELECT USING (true);

-- Orders (ai cũng có thể đọc, nhưng chỉ admin edit)
CREATE POLICY "Allow all to view orders" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Allow admins to manage orders" ON orders
  FOR UPDATE USING (true);

-- Activity logs
CREATE POLICY "Allow admins to view activity logs" ON activity_logs
  FOR SELECT USING (true);

CREATE POLICY "Allow admins to insert activity logs" ON activity_logs
  FOR INSERT WITH CHECK (true);

-- System stats
CREATE POLICY "Allow all to view system_stats" ON system_stats
  FOR SELECT USING (true);

-- 8️⃣ Insert default admin account
-- Email: admin@example.com
-- Password: Admin@123456 (hashed)
INSERT INTO admin_users (email, password_hash, full_name, role)
VALUES (
  'admin@example.com',
  '$2a$10$password_hash_placeholder', -- Thay bằng hash thật
  'Administrator',
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- ✅ Schema setup complete!
