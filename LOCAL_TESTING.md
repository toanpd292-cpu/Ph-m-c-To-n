# Local Testing Guide

## ✅ Checklist Before Testing

- [ ] Supabase database tables created (run `SUPABASE_SETUP.sql`)
- [ ] Supabase URL & API Key in `.env` (check `src/utils/supabase.ts`)
- [ ] Node.js & npm installed
- [ ] Dependencies installed: `npm install`

---

## 🚀 Start Development Server

```bash
npm run dev
```

Server runs at: **http://localhost:5173**

---

## 🧪 Test Scenarios

### 1️⃣ Test Customer Pages

**Home Page**
- [ ] Visit http://localhost:5173/
- [ ] Check: Title, description, hero image load
- [ ] Check: "Khám phá ngay" button links to Products

**Products Page**
- [ ] Visit http://localhost:5173/products
- [ ] [ ] Filters work (search, affinity, category, price)
- [ ] [ ] Product cards display correctly
- [ ] [ ] Click heart icon → wishlist updates
- [ ] [ ] Click "Tư vấn qua Zalo" button
  - Opens Zalo web link
  - Pre-filled message shows product name
  
**Product Detail**
- [ ] Click any product → detail page opens
- [ ] [ ] Product image, name, price display
- [ ] [ ] Heart button works (add/remove wishlist)
- [ ] Image loads without errors

**Navigation**
- [ ] Navbar links work (Home, Products, Tra Cứu, Về, Liên Hệ, Quản Lý (Admin), Xem Gian Hàng)
- [ ] Responsive on mobile (hamburger menu works)
- [ ] Sticky top behavior working

**Contact Widget** (bottom-right)
- [ ] Zalo button opens chat link
- [ ] Phone button triggers call intent
- [ ] Facebook button opens messenger

---

### 2️⃣ Test Admin Dashboard

**Login**
- [ ] Visit http://localhost:5173/admin
- [ ] Enter password: `admin123` (or your configured password)
- [ ] [ ] Should login successfully
- [ ] [ ] Dashboard shows stats

**Dashboard Tab**
- [ ] Views 4 stat cards (Sản phẩm, Liên Hệ, etc.)
- [ ] Recent orders table displays

**Sản Phẩm Tab**
- [ ] Click "Quản Lý Sản Phẩm" → Redirects to `/admin-products`
- [ ] [ ] Can add/edit products
- [ ] [ ] Can upload images

**Liên Hệ Khách Hàng Tab** ⭐ NEW
- [ ] Shows list of all customer inquiries (if data exists in DB)
- [ ] Filter by status: All, Mới, Đã Liên Hệ, Chuyển Đổi
- [ ] Click "Chi tiết" on any contact
  - [ ] Modal opens with full info
  - [ ] Can edit notes
  - [ ] Can change status (new → contacted → converted → closed)
- [ ] Can delete old inquiries

**Logout**
- [ ] Click logout button
- [ ] Returns to login screen
- [ ] localStorage cleared

---

### 3️⃣ Test Wishlist

**Add to Wishlist**
- [ ] Products page: Click heart icon on product
- [ ] Success notification shows
- [ ] Refresh page → Wishlist persists (localStorage)

**Remove from Wishlist**
- [ ] Click filled heart on product
- [ ] Item removed
- [ ] Notification confirms

---

### 4️⃣ Test Browser Console

Open DevTools (F12) → Console tab. Check for:

```javascript
// No red errors
// Warnings are OK, errors are NOT

// Should see Supabase client loaded
console.log(supabase) // Not undefined
```

---

### 5️⃣ Test Mobile Responsiveness

```bash
# In DevTools: Toggle Device Toolbar (Ctrl+Shift+M)
# Test on: iPhone 12, iPad, Galaxy S10
```

Check:
- [ ] Navigation responsive (hamburger on mobile)
- [ ] Product grid adjusts (1 col mobile, 2 tablet, 3 desktop)
- [ ] Contact widget visible
- [ ] Forms are usable on touch

---

## 🐛 Common Issues & Solutions

### Issue: "Supabase is not defined"
**Solution:** Check `src/utils/supabase.ts` has correct URL & API key

### Issue: "Cannot read property 'from' of undefined"
**Solution:** Supabase not initialized. Check `.env` file exists with:
```
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=...
```

### Issue: Admin login page blank
**Solution:** Check admin password in `src/components/AdminAuth.tsx`
- Default password: `admin123`

### Issue: Wishlist/Preferences not persisting
**Solution:** Check browser localStorage is enabled
- DevTools → Application → Local Storage → Check entries

### Issue: Images not loading
**Solution:** Check Supabase Storage bucket exists and is public
- Supabase Dashboard → Storage → Create bucket if missing

---

## 📊 Test Data to Create

### In Supabase SQL Editor, run:

```sql
-- Add sample products
INSERT INTO products (name, price, img, tag, category, affinities) VALUES
('Vòng Tay Phong Thủy Mệnh Kim', '2.500.000đ', 'https://..image-url..', 'Hot', 'Vòng tay phong thủy', '{"Mệnh Kim"}'),
('Trang Sức Đá Thạch Anh Hồng', '5.000.000đ', 'https://..image-url..', '2024', 'Trang sức đá quý', '{"Mệnh Hỏa"}'),
('Linh Vật Chiêu Tài Ngọc Bích', '3.500.000đ', 'https://..image-url..', 'Sale', 'Linh vật chiêu tài', '{"Mệnh Mộc"}');

-- Add sample contacts
INSERT INTO customer_contacts (name, phone, message, contact_source, status) VALUES
('Nguyễn Văn A', '0912345678', 'Tôi muốn tư vấn về vòng tay phong thủy', 'zalo', 'new'),
('Trần Thị B', '0987654321', 'Có sản phẩm nào cho mệnh Thủy không?', 'facebook', 'contacted');
```

---

## ✨ Test Success Criteria

**All tests pass when:**
- ✅ No console errors
- ✅ All pages load without errors
- ✅ Navigation works smoothly
- ✅ Admin dashboard shows data
- ✅ Wishlist persists after refresh
- ✅ Contact widget functional
- ✅ Responsive on mobile
- ✅ Customer contacts display in admin

---

## 📝 Bug Reporting

If you find issues:

1. **Screenshot** the error
2. **Note** the URL you were on
3. **Check** browser console for errors (F12)
4. **Test** another browser if available

The most common issues are:
- Supabase not initialized → Fix env vars
- Old browser cache → Clear (Ctrl+Shift+Del)
- Wrong data types in DB → Check SQL schema
