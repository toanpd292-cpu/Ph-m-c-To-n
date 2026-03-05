# 📦 HƯỚNG DẪN SETUP DATABASE VÀ ADMIN PANEL

## 🚀 Bước 1: Tạo Table Products trên Supabase

### Cách làm:
1. Đăng nhập vào [Supabase Dashboard](https://app.supabase.com)
2. Chọn project của bạn: **lwshqypvoockvejpwmhk**
3. Vào **SQL Editor** (ở thanh bên trái)
4. Tạo **New File** hoặc **New Query**
5. Copy-paste toàn bộ code dưới đây vào SQL Editor:

```sql
-- Tạo table products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo index để tìm kiếm nhanh
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

-- Bật RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Cho phép mọi người đọc sản phẩm
CREATE POLICY "Allow public read on products" ON products
  FOR SELECT USING (true);

-- Cho phép insert sản phẩm (bạn có thể hạn chế bằng JWT sau)
CREATE POLICY "Allow insert on products" ON products
  FOR INSERT WITH CHECK (true);

-- Cho phép update sản phẩm
CREATE POLICY "Allow update on products" ON products
  FOR UPDATE USING (true);

-- Cho phép delete sản phẩm
CREATE POLICY "Allow delete on products" ON products
  FOR DELETE USING (true);

-- Thêm sample data (tùy chọn)
INSERT INTO products (name, description, price, category, image_url) VALUES
  ('Áo Thun Nam', 'Áo thun cotton 100%, thoáng mát, chất lượng cao', 150000, 'Áo', 'https://via.placeholder.com/300?text=Tshirt'),
  ('Quần Jean Nam', 'Quần jean chất lượng cao, bền đẹp, form chuẩn', 350000, 'Quần', 'https://via.placeholder.com/300?text=Jeans'),
  ('Giày Thể Thao', 'Giày thể thao thoáng khí, êm chân, đi được cả ngày', 450000, 'Giày', 'https://via.placeholder.com/300?text=Shoes');
```

6. Nhấn **Run** (hoặc Ctrl+Enter)
7. ✅ Done! Table `products` đã được tạo thành công

---

## 🌐 Bước 2: Kiểm tra Environment Variables

Chúng tôi đã tạo file `.env.local` tại project root với các biến sau:

```
VITE_SUPABASE_URL=https://lwshqypvoockvejpwmhk.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_dnJfTrrI0l68nbhuN9jgYg_45yTT5zx
```

✅ Không cần thay đổi gì thêm, nó đã sẵn sàng!

---

## 👨‍💼 Bước 3: Truy cập Admin Panel

### Cách vào:
1. **Chạy development server:**
   ```bash
   npm run dev
   ```

2. **Vào trang Admin:**
   ```
   http://localhost:3000/admin
   ```

3. **Hoặc trên Vercel:**
   ```
   https://ph-m-c-to-n.vercel.app/admin
   ```

---

## ➕ Bước 4: Sử dụng Admin Panel

### Thêm sản phẩm mới:
1. Nhấn nút **"Thêm Sản phẩm"** (góc trên phải)
2. Điền thông tin:
   - **Tên sản phẩm**: Ví dụ "Áo Thun Nam"
   - **Mô tả**: Chi tiết sản phẩm
   - **Giá**: Số tiền (VND)
   - **Danh mục**: Ví dụ "Áo", "Quần", "Giày"
   - **URL Ảnh**: Link hình ảnh (https://...)

3. Xem trước ảnh (nếu cung cấp)
4. Nhấn **"Thêm"** để lưu

### Chỉnh sửa sản phẩm:
1. Tìm sản phẩm trong danh sách
2. Nhấn icon **✏️ (Edit)**
3. Sửa thông tin
4. Nhấn **"Cập nhật"**

### Xóa sản phẩm:
1. Tìm sản phẩm
2. Nhấn icon **🗑️ (Delete)**
3. Xác nhận xóa

---

## 🖼️ Cách lấy URL ảnh

### Option 1: Dùng placeholder (miễn phí)
```
https://via.placeholder.com/300?text=Product+Name
```

### Option 2: Upload lên Supabase Storage
1. Vào **Storage** trong Supabase Dashboard
2. Tạo bucket mới `products`
3. Upload ảnh
4. Copy link ảnh

### Option 3: Upload lên cloudinary/imgbb (free)
- [Cloudinary](https://cloudinary.com/) - Free 25,000 ảnh
- [ImgBB](https://imgbb.com/) - Upload ảnh miễn phí
- Copy link ảnh về dùng

---

## 📱 Hiển thị sản phẩm trên trang Products

Trang Products sẽ **tự động lấy dữ liệu từ Supabase** mà không cần config thêm!

- Vào `/products` để xem danh sách
- Các sản phẩm sẽ hiển thị theo thứ tự mới nhất trước
- Có thể tìm kiếm, lọc theo danh mục, giá...

---

## 🚚 Deploy lên Vercel

### 1. Set Environment Variables trên Vercel:
1. Vào [Vercel Dashboard](https://vercel.com)
2. Chọn project: **ph-m-c-to-n**
3. **Settings** → **Environment Variables**
4. Add:
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://lwshqypvoockvejpwmhk.supabase.co`

5. Add:
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: `sb_publishable_dnJfTrrI0l68nbhuN9jgYg_45yTT5zx`

6. Nhấn **Save**
7. Trigger redeploy: **Deployments** → **... (3 chấm)** → **Redeploy**

### 2. Kiểm tra:
```
https://ph-m-c-to-n.vercel.app/admin
```

---

## ✅ Checklist

- [ ] Chạy SQL code trên Supabase ✓
- [ ] Kiểm tra table `products` được tạo ✓
- [ ] Chạy `npm run dev` ✓
- [ ] Vào http://localhost:3000/admin ✓
- [ ] Thêm sample data bằng Admin Panel ✓
- [ ] Vào /products để xem sản phẩm ✓
- [ ] Set Environment Variables trên Vercel ✓
- [ ] Deploy lên Vercel ✓
- [ ] Test trên Vercel ✓

---

## 🐛 Troubleshooting

### Admin page không load sản phẩm?
1. Kiểm tra browser DevTools (F12) → Console xem lỗi gì
2. Kiểm tra Supabase table: **Database** → **Tables** → `products` có tồn tại không
3. Kiểm tra RLS Policies: **Auth** → **Policies** xem policy đã enable không

### Ảnh không hiển thị?
1. Copy đúng URL ảnh
2. Thử dùng placeholder trước: `https://via.placeholder.com/300`
3. Kiểm tra CORS: nên dùng ảnh từ Supabase Storage hoặc external tools được

### Deploy không sync database?
1. Kiểm tra Environment Variables trên Vercel setting
2. Trigger redeploy
3. Xem logs: **Deployments** → **Inspector** (chim công icon)

---

## 📞 Cần giúp?

Nếu có vấn đề:
1. Check DevTools Console (F12)
2. Kiểm tra Supabase logs
3. Xem network tab để debug API calls
4. Liên hệ hỗ trợ Supabase

**Thành công! 🎉 Giờ bạn có admin panel đầy đủ để quản lý sản phẩm!**
