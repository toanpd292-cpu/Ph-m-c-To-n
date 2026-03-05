# Blog & Supabase Setup Guide

## Tổng Quan

Website của bạn hiện có:
- ✅ Trang blog chuẩn SEO (`/blog`)
- ✅ Trang chi tiết bài viết (`/blog/:id`) với meta tags, OpenGraph, JSON-LD
- ✅ Trang admin `/admin` để quản lý sản phẩm và bài viết
- ✅ Supabase database tích hợp

---

## 1. Setup Supabase Database

### 1.1 Tạo Tables

Trên Dashboard Supabase, vào SQL Editor và chạy:

```sql
-- Bảng Products
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng Posts
CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 1.2 Thiết Lập Policies (RLS)

Để cho phép public access (tạm thời):

```sql
-- Allow public to select from products
CREATE POLICY "public_select_products" ON products
FOR SELECT USING (true);

CREATE POLICY "public_insert_products" ON products
FOR INSERT WITH CHECK (true);

-- Allow public to select posts
CREATE POLICY "public_select_posts" ON posts
FOR SELECT USING (true);

CREATE POLICY "public_insert_posts" ON posts
FOR INSERT WITH CHECK (true);
```

> **Lưu ý**: Tắt RLS (Row Level Security) cho bảng hoặc cấu hình policies cụ thể cho production.

---

## 2. Cấu Hình Environment Variables

### 2.1 Local Development

Tạo file `.env` ở root project:

```env
VITE_SUPABASE_URL=https://lwshqypvoockvejpwmhk.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_dnJfTrrI0l68nbhuN9jgYg_45yTT5zx
```

### 2.2 Vercel Production

Thêm vào Vercel → Project Settings → Environment Variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `VITE_SUPABASE_URL` | `https://lwshqypvoockvejpwmhk.supabase.co` | Production, Preview |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_...` | Production, Preview |

Lưu rồi Redeploy.

---

## 3. Sử Dụng Trang Admin

### 3.1 Truy Cập

```
http://localhost:3000/admin
# hoặc
https://your-domain.vercel.app/admin
```

### 3.2 Thêm Sản Phẩm & Bài Viết

- Điền thông tin vào form.
- Click "Thêm" hoặc "Đăng" để lưu vào Supabase.
- Danh sách sẽ tự động cập nhật.

---

## 4. Trang Blog SEO-Optimized

### 4.1 Danh Sách Bài Viết (`/blog`)

- Hiển thị tất cả bài viết từ Supabase
- Responsive design (card layout)
- Link tới từng bài chi tiết
- Meta tags cho SEO

### 4.2 Chi Tiết Bài Viết (`/blog/:id`)

Mỗi bài viết có:

- **Meta Tags**:
  - `og:title`, `og:description`, `og:image`
  - `twitter:card`, `twitter:image`
  - Canonical URL
  - Author & Publication date

- **Structured Data** (JSON-LD):
  ```json
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "...",
    "author": { "@type": "Person", "name": "..." },
    "datePublished": "2024-..."
  }
  ```

- **User Experience**:
  - Breadcrumb navigation
  - Back button
  - Related posts (max 3)
  - Newsletter signup
  - CTA to products

---

## 5. Chạy Local

```bash
# Development
npm run dev
# http://localhost:3000

# Build
npm run build

# Preview production build
npm run preview
```

---

## 6. Deploy lên Vercel

Sau khi thêm environment variables:

```bash
# Push code và Vercel sẽ tự deploy
git add .
git commit -m "Add SEO-optimized blog"
git push origin main
```

---

## 7. Tối Ưu Hóa SEO Tiếp Theo

### Recommendations:

1. **Sitemap & Robots.txt**
   - Tạo `public/robots.txt`
   - Tạo `public/sitemap.xml` hoặc dùng công cụ auto-generate

2. **Image Optimization**
   - Upload ảnh bài viết khi tạo post
   - Dùng format WebP hoặc tối ưu kích thước

3. **Meta Description & Keywords**
   - Thêm `excerpt` vào bảng `posts`
   - Thêm field `keywords` cho mỗi bài

4. **Internal Linking**
   - Tự động gợi ý bài liên quan
   - Link tới sản phẩm phù hợp

5. **Performance**
   - Lazy load hình ảnh
   - Code splitting chunks
   - Caching headers on Vercel

---

## 8. Thêm Bài Viết Thủ Công (Optional)

Ngoài form admin, bạn có thể INSERT trực tiếp trong Supabase Dashboard:

```sql
INSERT INTO posts (title, content, author, excerpt, image_url)
VALUES (
  'Tiêu đề bài viết',
  'Nội dung bài viết chi tiết...',
  'Tên tác giả',
  'Tóm tắt 160 ký tự',
  'https://...'
);
```

---

## 9. API Endpoints (Optional)

Nếu bạn muốn data từ API thay vì trực tiếp Supabase:

- POST `/api/posts` - Tạo bài viết
- GET `/api/posts` - Lấy danh sách
- GET `/api/posts/:id` - Chi tiết bài viết
- PUT `/api/posts/:id` - Cập nhật
- DELETE `/api/posts/:id` - Xóa

_(Hiện tại sử dụng client-side query, có thể thêm backend API sau)_

---

## Hỗ Trợ & Troubleshooting

| Vấn đề | Giải pháp |
|--------|----------|
| `VITE_SUPABASE_URL is undefined` | Thêm `.env` hoặc kiểm tra Vercel env vars |
| Bài viết không hiển thị | Kiểm tra RLS policies trên Supabase |
| Meta tags không work | Validate với Facebook Sharing Debugger / Twitter Card Validator |
| Build lỗi | `npm run lint` & `npm run build` locally |

---

**✨ Happy blogging! 🚀**
