# Website Setup Guide - Consultation Model

## 📋 Overview

Website đã được tái cấu trúc để hoạt động theo mô hình **tư vấn phong thủy** thay vì bán hàng online:

- ✅ Không có giỏ hàng, thanh toán
- ✅ Khách hàng xem sản phẩm và liên hệ qua Zalo
- ✅ Admin quản lý sản phẩm + khách liên hệ
- ✅ Tối ưu SEO để tăng traffic từ tìm kiếm

---

## 🗄️ Database Setup

### 1. Tạo bảng `customer_contacts` (Supabase)

Chạy SQL trong Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS customer_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  message TEXT NOT NULL,
  contact_source VARCHAR(50) NOT NULL CHECK (contact_source IN ('zalo', 'facebook', 'phone', 'contact_form')),
  status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  interested_products TEXT[],
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo index để tìm kiếm nhanh
CREATE INDEX idx_customer_status ON customer_contacts(status);
CREATE INDEX idx_customer_created ON customer_contacts(created_at DESC);
CREATE INDEX idx_customer_phone ON customer_contacts(phone);
```

### 2. Cấp quyền Supabase
- Bật **RLS (Row Level Security)** trên bảng
- Chỉ cho phép admin (authenticated users) truy cập

---

## 🎨 Features

### Customer Pages (Public)
- ✅ `Home` - Trang chủ xinh đẹp với hình ảnh
- ✅ `Products` - Danh sách sản phẩm lọc theo mệnh
- ✅ `ProductDetail` - Chi tiết sản phẩm, CTA "Tư vấn qua Zalo"
- ✅ `About` - Giới thiệu công ty
- ✅ `Contact` - Form liên hệ
- ✅ `Destiny` - Tra cứu bản mệnh
- ✅ `Blog` - Blog phong thủy

### Contact Widget
- Floating button (bottom-right)
- Links: Zalo, Facebook Messenger, Điện thoại
- Quick message templates

### Admin Dashboard (`/admin`)
**Tab Quản Lý:**
1. **Dashboard** - Thống kê sản phẩm, views, liên hệ
2. **Sản Phẩm** - Link tới `/admin-products` để quản lý
3. **Liên Hệ Khách Hàng** - View tất cả inquiries
4. **Người Dùng** - Quản lý admin users (TBA)

### Customer Management Features
- Hiển thị tất cả liên hệ từ khách hàng
- Filter theo status: `new` → `contacted` → `converted` → `closed`
- Xem chi tiết liên hệ
- Thêm ghi chú về cuộc trao đổi
- Xóa liên hệ cũ

---

## 📝 Liên Hệ Khách Hàng - Workflow

**Khi khách click "Tư vấn qua Zalo":**
1. Mở Zalo (app hoặc web)
2. Pre-filled message: "Tôi muốn tư vấn về [tên sản phẩm]"
3. (Optional) Admin có thể track inquiry này trong `Customer Contacts`

**Admin Dashboard Workflow:**
1. Vào /admin → Lịch sử Khác Hàng tab
2. Xem tất cả inquiry (Zalo, Facebook, form, phone)
3. Click "Chi tiết" để xem đủ thông tin
4. Cập nhật trạng thái: Mới → Đã Liên Hệ → Chuyển Đổi → Đóng
5. Thêm ghi chú về cuộc trao đổi

---

## 🔍 SEO Setup

### Files được tạo:
- ✅ `public/robots.txt` - Chỉ dẫn search engines
- ✅ `public/sitemap.xml` - Danh sách URL để index
- ✅ `src/utils/seo.ts` - Hàm cập nhật meta tags

### Meta Tags trên từng trang:
```
Home: "Ngọc Nhất Linh - Trang Sức Đá Quý Phong Thủy"
Products: "Sản Phẩm Đá Quý Phong Thủy | Ngọc Nhất Linh"
Destiny: "Tra Cứu Bản Mệnh | Ngọc Nhất Linh"
Về Chúng Tôi, Liên Hệ, Blog (customized per page)
```

### Cải thiện SEO:
- ✅ Structured Data (Schema.org)
- ✅ Open Graph tags (chia sẻ mạng xã hội)
- ✅ Twitter Card
- ✅ Keywords tối ưu cho từng trang
- ⏳ Alt text trên hình ảnh (cần thêm)
- ⏳ Internal linking strategy

---

## 🚀 Triển khai

### Local Development:
```bash
npm install
npm run dev
# Mở http://localhost:5173
```

### Deploy (không dùng Vercel):
- Có thể dùng: Netlify, GitHub Pages, VPS, Hosting provider khác
- Build: `npm run build` → deploy folder `dist/`

### Chuẩn bị trước khi deploy:
1. ✅ Thay URL trong `src/utils/seo.ts` (ngocnhatlinh.com)
2. ✅ Cập nhật Supabase URL & API key
3. ✅ Thêm Zalo Business ID vào Contact Widget
4. ✅ Setup Facebook Messenger webhook (nếu muốn)
5. ✅ Gửi sitemap.xml tới Google Search Console

---

## 📱 Contact Widget Configuration

File: `src/components/ContactWidget.tsx`

Thay đổi các thông tin liên hệ:
```typescript
ZALO_PHONE = "+84902111626"        // Số Zalo
FACEBOOK_URL = "https://m.me/..."  // Facebook Messenger
PHONE_NUMBER = "0902111626"        // Điện thoại
```

---

## 🎯 Next Steps (Tuần tới)

- [ ] Thêm tracking khi khách click Zalo (analytics)
- [ ] Gửi email notification cho admin khi có inquiry mới
- [ ] Tích hợp Facebook Messenger webhook
- [ ] Coll Google Search Console & Monitor ranking
- [ ] Tạo schema markup chi tiết cho sản phẩm
- [ ] A/B test CTA text để tăng click

---

## ❓ FAQ

**Q: Khách hàng có thể đặt hàng trực tuyến không?**
A: Không. Mô hình này dành cho tư vấn. Giao dịch sau qua Zalo/Chuyển Khoản.

**Q: Làm sao quản lý đơn hàng từ Zalo?**
A: Dùng Customer Contacts form để track. Có thể backup vào Excel để quản lý order.

**Q: Có thể thêm payment sau không?**
A: Có thể. Mô hình này là v1. Nếu muốn thêm checkout + payment, có thể thêm sau.

**Q: Làm sao để khách tìm thấy website trên Google?**
A: SEO optimization + Google Search Console + Backlinks từ mạng xã hội.

---

## 📞 Support

Liên hệ để hỗ trợ thêm hoặc tùy chỉnh theo nhu cầu.
