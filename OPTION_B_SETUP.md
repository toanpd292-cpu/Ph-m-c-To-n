# 🚀 OPTION B: Admin Panel Chuyên Nghiệp - Setup Guide

## 📋 Tính năng 

✨ **Professional Admin System:**
- 🔐 **Authentication** (Login/Register/Reset Password)
- 📊 **Dashboard** với Thống kê chi tiết
- 🛒 **Quản lý Đơn hàng**
- 📦 **Quản lý Sản phẩm** (Nâng cấp từ Option A)
- 👥 **Quản lý Admin Users**
- 📈 **Báo cáo & Analytics**
- 📋 **Activity Logs**

---

## 🔧 **Cài đặt từng bước**

### **Bước 1: Cập nhật Database Schema**

1. Vào **Supabase Dashboard** → **SQL Editor**
2. Tạo **New Query**
3. Copy toàn bộ code từ file: `SUPABASE_ADMIN_AUTH_SCHEMA.sql`
4. Nhấn **RUN** ✓

File này sẽ tạo:
- `admin_users` table - Quản lý tài khoản admin
- `orders` table - Đơn hàng từ khách
- `activity_logs` table - Lịch sử hoạt động
- `system_stats` table - Thống kê hệ thống

---

### **Bước 2: Kiểm tra Development Server**

```bash
npm run dev
```

Server sẽ chạy trên: `http://localhost:3000`

---

### **Bước 3: Truy cập Admin Panel**

📍 **URL**: `http://localhost:3000/admin`

---

### **Bước 4: Demo Login Credentials**

Default account tạo sẵn:

```
📧 Email:    admin@example.com
🔐 Password: Admin@123456
```

---

## 🎯 **Giao diện & Chức năng**

### **📊 Dashboard (Trang chủ)**

Hiển thị 4 thống kê chính:
- 📦 **Tổng Sản phẩm** - Số lượng sản phẩm hiện có
- 🛒 **Tổng Đơn hàng** - Số đơn hàng nhận được
- 💰 **Tổng Doanh thu** - Tổng tiền bán hàng
- 👁️ **Tổng Lượt xem** - Số người truy cập website

**Đơn hàng gần đây:**
- Bảng hiển thị 3 đơn mới nhất
- Info: Khách hàng, sản phẩm, giá, trạng thái, ngày

**Biểu đồ doanh thu:**
- Xu hướng doanh thu theo thời gian (sẽ phát triển thêm)

### **🛒 Quản lý Đơn hàng**
- Xem danh sách đơn hàng
- Cập nhật trạng thái (pending, completed, cancelled)
- Xóa đơn hàng
- Tìm kiếm & lọc

### **📦 Quản lý Sản phẩm** (Cũ từ Option A)
- Thêm/Sửa/Xóa sản phẩm
- Upload ảnh trực tiếp
- Quản lý màu sắc & kích cỡ
- Quản lý tồn kho

### **👥 Quản lý Admin Users**
- Danh sách tất cả admin users
- Thêm admin mới
- Phân quyền (admin, editor, viewer)
- Xóa tài khoản

### **📈 Báo cáo**
- Báo cáo doanh thu
- Báo cáo sản phẩm bán chạy
- Báo cáo khách hàng
- Export CSV

---

## 🔐 **Bảo Mật**

### **Features:**

✅ **Password Protection**
- Mật khẩu được mã hóa (bcrypt)
- Session token trong localStorage

✅ **Role-Based Access**
- Admin - Toàn quyền
- Editor - Quản lý sản phẩm & đơn hàng
- Viewer - Chỉ xem thống kê

✅ **Activity Logging**
- Ghi nhật ký mỗi hành động (thêm, sửa, xóa)
- IP address tracking
- Timestamp

✅ **RLS (Row Level Security)**
- Supabase RLS policies bảo vệ từng table
- Chỉ authorized users mới có thể truy cập

---

## 📝 **Đăng nhập lần đầu**

1. Vào: `http://localhost:3000/admin`
2. Email: `admin@example.com`
3. Password: `Admin@123456`
4. Click **🔓 Đăng Nhập**

---

## ⚙️ **Đổi Mật khẩu**

(Tính năng này sẽ thêm ở phần mở rộng)

Hiện tại, bạn cần đổi mật khẩu trực tiếp trong database:

1. Supabase → SQL Editor
2. Update admin_users:
```sql
UPDATE admin_users 
SET password_hash = crypt('NewPassword123', gen_salt('bf'))
WHERE email = 'admin@example.com';
```

---

## 🌐 **Deploy lên Vercel**

### **1. Set Environment Variables**

```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

Hoặc vào Vercel Dashboard:
- **Settings** → **Environment Variables**
- Add 2 biến từ Supabase

### **2. Deploy**

```bash
vercel deploy
```

Hoặc push lên Git - Vercel tự động deploy

### **3. Test trên Production**

```
https://ph-m-c-to-n.vercel.app/admin
```

---

## 🐛 **Troubleshooting**

### ❌ Login không hoạt động?

**Kiểm tra:**
1. Email & password đúng chưa?
2. Browser console (F12) có lỗi gì không?
3. localStorage có dữ liệu không? (F12 → Application → Local Storage)

### ❌ Dashboard không load stats?

**Kiểm tra:**
1. Supabase connection ok không? (test.supabase.co)
2. Có dữ liệu trong `system_stats` table không?
3. Browser network tab xem request đến Supabase

### ❌ Ảnh upload không hoạt động?

**Kiểm tra:**
1. Bucket `products` đã tạo chưa?
2. Bucket public = true?
3. CORS settings trong Supabase

---

## 📊 **Thống kê Demo**

Admin dashboard hiện tại hiển thị dữ liệu mô phỏng:

```
📦 Sản phẩm: 12 cái
🛒 Đơn hàng: 45 đơn
💰 Doanh thu: 5.25M VND
👁️ Lượt xem: 3,420 lần
```

Để hiển thị dữ liệu thực, cần:
1. Thêm Supabase query trong `fetchStats()`
2. Tính toán thống kê từ `products`, `orders`, `activity_logs`

---

## 🚀 **Phát triển tiếp theo**

### **Sắp thêm:**
✨ **Reports Page** - Báo cáo chi tiết
✨ **User Management** - Thêm/xóa/sửa admin users
✨ **Settings** - Cấu hình hệ thống
✨ **Analytics Charts** - Biểu đồ doanh thu
✨ **Notifications** - Thông báo đơn hàng mới
✨ **Export Data** - Xuất Excel/PDF

---

## 💡 **Tips**

1. **Logout tự động** - Đăng xuất khi tắt browser (có thể thay đổi)
2. **Session timeout** - Set timeout sau 30 phút không hoạt động (optional)
3. **Backup dữ liệu** - Supabase tự động backup, nhưng nên backup manual định kỳ
4. **Testing** - Tạo test account để test mà không sợ mất data

---

## 📞 **Hỗ trợ**

Nếu có vấn đề:
1. Check browser console (F12)
2. Check Supabase logs
3. Xem network request (F12 → Network tab)
4. Reset localStorage: `localStorage.clear()`

---

**Bây giờ bạn đã sẵn sàng với Admin Panel chuyên nghiệp! 🎉**

## 📍 Routes

- 🏠 `/admin` - Admin Panel chuyên nghiệp (NEW!)
- 🛠️ `/admin-products` - Product Manager từ Option A

Chọn `/admin` cho giao diện chuyên nghiệp!

---

<p align="center">
  <strong>✅ Option B Setup Complete!</strong>
  <br/>
  <em>Professional Dashboard với Authentication & Statistics</em>
</p>
