# AI Agent Instructions for NGỌC NHẤT LINH Ecommerce

## Project Overview
Vietnamese luxury gemstone ecommerce platform built with React 19, Vite, Tailwind CSS, and Supabase. Core features: product catalog with destiny/feng shui filtering, admin panel, customer contact management, blog, and wishlist system.

## Tech Stack
- **Frontend**: React 19 + React Router 7 + TypeScript
- **Styling**: Tailwind CSS 4 + Playfair Display (serif) + Public Sans (sans)
- **Build**: Vite 6 with Tailwind Vite plugin
- **Database**: Supabase (PostgreSQL with RLS)
- **Animations**: Motion library (Framer Motion equivalent)
- **State**: Context API for Cart and Wishlist, localStorage persistence
- **UI Components**: Lucide React icons, skeleton loaders

## Architecture Patterns

### Data Flow: Hybrid Local + Cloud
1. **Static seed data** in [src/data/products.ts](src/data/products.ts) - fallback for offline
2. **Supabase products table** - primary source, synced in [src/pages/Products.tsx](src/pages/Products.tsx) via `loadProducts()`
3. **localStorage** for transient state (cart, wishlist) with automatic persistence

### Context Providers (src/context/)
- **WishlistContext**: Item add/remove, persistence, `isInWishlist()` check
- **CartContext**: Cart operations, variant handling (color/size), totals tracking
- Both wrapped in App providers; initialize from localStorage on mount

### Admin System (src/pages/AdminPanel.tsx)
- **Simple localStorage auth**: `localStorage.getItem('adminAuth') === 'authenticated'`
- Two-step: AdminAuth component → AdminDashboard (tab-based UI)
- Components: CustomerManagement for contact pipeline, Admin page for product CRUD
- **No password validation** currently; upgrade needed for production

### Component Organization
- **pages/**: Route handlers (Products, ProductDetail, AdminPanel, Blog, etc.)
- **components/**: Reusable UI (Navbar, CartSidebar, ContactWidget, rating system)
- **Navbar** includes mobile hamburger, search toggle, admin link; use `cn()` utility for classnames
- **ContactWidget**: Sticky footer for messaging (Zalo/Facebook links)

## Key Conventions

### Environment Variables (Vite pattern)
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` - exposed at build time
- `GEMINI_API_KEY` (legacy AI Studio) - defined in vite.config.ts
- `.env.local` for local development, Vercel dashboard for production

### Styling
- **Color palette**: `--color-primary: #D4AF37` (gold), `--color-charcoal: #262626`, `--color-beige-subtle: #fdfbf7`
- **Fonts**: Serif for headings (h1-h6), sans for body. Define in @theme layer, not inline
- **Utility**: `cn()` function combines clsx + tailwind-merge; import from any component for classname composition
- **Animations**: Motion library with `AnimatePresence` for mount/unmount transitions

### Database (Supabase)
- **Products table**: UUID PK, arrays for affinities/colors/sizes, indexes on category/name
- **Customer contacts**: lead pipeline with status enum (new/contacted/converted/closed), contact_source tracking
- **RLS enabled** but permissive policies (allow all for now) - tighten before production
- Triggers auto-update `updated_at` timestamps

### Async Patterns
- Use `useEffect` with `mounted` flag to prevent state updates on unmounted components
- Products page: `loading` state → skeleton UI → data render flow
- Supabase calls wrapped in try/catch; console.warn on missing credentials

## Build & Deployment

### Local Development
```bash
npm install
npm run dev  # Vite on port 3000 (--host for container access)
```

### TypeScript & Linting
```bash
npm run lint  # tsc --noEmit (no build artifacts)
```

### Build for Production
```bash
npm run build      # Creates dist/
npm run preview    # Test production build locally
npm run clean      # rm -rf dist
```

### Deployment Targets
- **Vercel**: Dashboard at https://vercel.com/toanpd292-2055s-projects/ph-m-c-to-n
  - Auto-deploys from main branch
  - Add VITE_SUPABASE_* vars in Environment Variables
- **Database setup**: Run SUPABASE_SETUP.sql in Supabase SQL Editor for initial migration

## Common Development Tasks

### Adding a New Product Field
1. Update Product interface in [src/data/products.ts](src/data/products.ts)
2. Modify Supabase table: `ALTER TABLE products ADD COLUMN ...`
3. Update fetch in [src/pages/Products.tsx](src/pages/Products.tsx) to map response
4. Update admin form in [src/components/AdminDashboard.tsx](src/components/AdminDashboard.tsx)

### Creating a New Page
1. Create `.tsx` in [src/pages/](src/pages/)
2. Add `<Route path="" element={<NewPage />} />` in [src/App.tsx](src/App.tsx)
3. Add link to Navbar if public-facing
4. Use existing page structure: Navbar in layout, responsive grid for content

### Handling Async State
- Always initialize `loading` state before fetch; use mounted flag to avoid cleanup warnings
- Render skeleton/spinner while `loading === true`; catch errors with fallback UI
- Motion animations wrap conditionally on data presence

## Product Catalog Specifics

### Filtering & Search
- **Affinities**: Destiny/feng shui categories (Mệnh Kim, Mệnh Thổ, etc.); stored as array in DB
- **Category**: Product type (Vòng tay phong thủy, etc.)
- **Price range**: Min/max slider with Vietnamese formatted prices (replace /\./g for thousands separator)
- **Search**: Case-insensitive substring match on name

### Product Display
- **Images**: URLs stored in `img` (primary) and `images` array (gallery)
- **Pricing**: Format as string "X.XXX.XXXđ"; parse by removing dots and đ symbol
- **Discount tags**: `oldPrice` field for strikethrough display
- **Variants**: Color/size arrays; cart handles variant combinations via `cartItem.color + cartItem.size` uniqueness

## Admin/CMS Notes
- **Customer contacts**: Captured from ContactWidget → customer_contacts table
- **Product CRUD**: AdminDashboard currently mocked; wire up to Supabase products table
- **Auth upgrade**: Implement OAuth or password hashing before production
- **Role-based access**: Consider adding `admin_users` table with permissions

## Performance & SEO
- **React Helmet** integration exists (import available); use for dynamic meta tags
- **Skeleton loaders**: ProductSkeleton component in Products.tsx; replicate pattern for other async components
- **Image optimization**: URLs are Google Cloud CDN; consider local image imports if available
- **Focus areas**: Route-based code splitting not yet implemented; Vite handles bundling

## Gotchas & Known Issues
1. **HMR disabled in AI Studio**: vite.config.ts checks `DISABLE_HMR` env var; don't remove this
2. **Admin auth is toy-grade**: localStorage string matching; implement real auth system
3. **Price parsing fragile**: Vietnamese format assumes "X.XXX.XXXđ"; validate user input
4. **Supabase RLS too permissive**: Policies allow unauthenticated writes; secure before launch
5. **Cart variants not fully validated**: No server-side check for color/size validity
