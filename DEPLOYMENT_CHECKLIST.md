# 🚀 Deployment & Launch Checklist

## 📋 Pre-Launch Checklist

### 1. Database Setup ✅
- [ ] Run SQL from `SUPABASE_SETUP.sql` in Supabase
- [ ] Verify tables created:
  - [ ] `products` table exists with data
  - [ ] `customer_contacts` table created & ready
- [ ] Enable RLS policies (if needed for security)

### 2. Environment Variables ✅
- [ ] `.env` file created with:
  ```
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJ...
  ```
- [ ] Test connection: `npm run dev` should not error

### 3. Local Testing ✅
Complete all tests in `LOCAL_TESTING.md`:
- [ ] Customer pages load without errors
- [ ] Admin dashboard functional
- [ ] Wishlist persists
- [ ] Contact widget works
- [ ] Mobile responsive

### 4. Code Review ✅
- [ ] No console errors or warnings
- [ ] Build succeeds: `npm run build` ✓
- [ ] No TypeScript errors

### 5. SEO Setup ✅
- [ ] `public/robots.txt` created
- [ ] `public/sitemap.xml` created
- [ ] Meta tags in `src/utils/seo.ts`

### 6. Configuration ✅
Update before deploying:
- [ ] Change domain in `CONSULTATION_MODEL_SETUP.md`:
  ```
  From: ngocnhatlinh.com
  To: your-actual-domain.com
  ```
- [ ] Update phone numbers in `src/components/ContactWidget.tsx`:
  ```typescript
  ZALO_PHONE = "+84..." // Your Zalo
  FACEBOOK_URL = "..." // Your Facebook
  PHONE_NUMBER = "..." // Your phone
  ```
- [ ] Check `src/utils/seo.ts` keywords match your business

---

## 🌐 Deployment Options

### Option A: Netlify (Recommended - FREE)

**Steps:**
1. Push code to GitHub
2. Go to netlify.com → Connect GitHub
3. Select repo → Deploy
4. Set Build Command: `npm run build`
5. Set Publish Directory: `dist`
6. Add environment variables in Netlify settings

**Advantages:**
- Free, easy setup
- Automatic deploys on GitHub push
- Built-in SEO tools

**Domain Setup:**
- Add custom domain in Netlify settings
- Update DNS records (instructions in Netlify)

---

### Option B: Vercel (Also FREE)

**Steps:**
1. Push code to GitHub
2. Go to vercel.com → Import project
3. Select GitHub repo
4. Configure env vars
5. Deploy

---

### Option C: Traditional Hosting (VPS/cPanel)

**Steps:**
1. `npm run build` → Creates `dist/` folder
2. Upload `dist/` to your hosting via FTP
3. Set document root to `dist/` folder
4. Configure SSL certificate

---

### Option D: Self-hosted (Your Server)

```bash
# On your server:
git clone https://github.com/yourusername/Ph-m-c-To-n.git
cd Ph-m-c-To-n
npm install
npm run build

# Use PM2 or Docker to serve dist/
npx pm2 serve dist/ 5173
```

---

## 📊 Google Search Console Setup

**After deploying:**

1. Go to **Google Search Console**
2. Add property: your domain
3. Verify ownership (DNS, HTML file, or Google Analytics)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`
5. Check for errors in "Coverage" report

**Monitor:**
- Search performance (CTR, impressions)
- Indexing status
- Mobile usability issues

---

## 🔍 SEO Optimization Checklist

- [ ] sitemap.xml submitted to Google
- [ ] robots.txt configured
- [ ] Meta tags added to all pages
- [ ] Images have alt text
- [ ] Internal links structure good
- [ ] Mobile mobile-friendly (test in GSC)
- [ ] Page load speed optimized
- [ ] No 404 errors
- [ ] Schema markup implemented

**Test:**
```
- Google Mobile-Friendly Test
- Google PageSpeed Insights
- Lighthouse (DevTools)
```

---

## 📱 Social Media Integration

### Zalo Business
- [ ] Create Zalo Business account
- [ ] Get Business ID
- [ ] Configure chat widget
- [ ] Test messaging

### Facebook
- [ ] Create Facebook Business Page
- [ ] Set up Messenger
- [ ] Add to Contact Widget
- [ ] Enable notifications

### Google My Business
- [ ] Create GMB listing
- [ ] Add business info
- [ ] Add photos
- [ ] Encourage reviews

---

## 📧 Email Setup (Optional)

For registration/inquiries, consider:
- SendGrid
- Mailgun
- AWS SES

Setup admin email notifications when new customer contacts arrive.

---

## 🔒 Security Checklist

- [ ] HTTPS enabled (automatic on Netlify/Vercel)
- [ ] Supabase RLS policies configured
- [ ] Admin password changed from default
- [ ] No sensitive data in frontend code
- [ ] API keys never committed to Git
- [ ] Rate limiting on contact form (if created)

---

## 📞 Launch Day Checklist

1. **24 hours before:**
   - [ ] Final testing complete
   - [ ] Backups made
   - [ ] Team notified

2. **At launch:**
   - [ ] Deploy code
   - [ ] Test all pages load
   - [ ] Check Google Console
   - [ ] Monitor errors/analytics

3. **After launch:**
   - [ ] Share on social media
   - [ ] Send to email list
   - [ ] Monitor traffic
   - [ ] Check for errors daily for 1 week

---

## 📈 Post-Launch Monitoring

**Daily:**
- Check Google Analytics for traffic
- Monitor error logs
- Check admin contact inbox

**Weekly:**
- Review customer inquiries
- Check search rankings
- Update blog if applicable

**Monthly:**
- Analyze traffic trends
- Update SEO strategy
- Customer satisfaction review

---

## ⚠️ Troubleshooting

### Site not loading after deploy
```
1. Check build logs for errors
2. Verify env variables set in production
3. Check DNS propagation (can take 24hrs)
4. Clear browser cache (Ctrl+Shift+Del)
```

### Admin dashboard not working
```
1. Check Supabase connection
2. Verify admin password
3. Check browser localStorage enabled
4. Look at console errors (F12)
```

### Images not showing
```
1. Check Supabase Storage bucket is public
2. Verify image URLs in database
3. Check CORS settings in Supabase
```

### SEO not improving
```
1. Check sitemap submitted to Google
2. Monitor GSC for crawl errors
3. Add more content/keywords
4. Build backlinks from other sites
5. Can take 3-6 months to see results
```

---

## 📚 Useful Resources

- **Supabase Docs:** https://supabase.com/docs
- **Vite Docs:** https://vitejs.dev/
- **Google Search Console:** https://search.google.com/search-console
- **Netlify Docs:** https://docs.netlify.com
- **React Router:** https://reactrouter.com

---

## 🎉 You're Ready!

Once you've completed this checklist, your website is ready for customers! 

Good luck! 🚀

For questions or issues, refer to:
- `CONSULTATION_MODEL_SETUP.md` - Feature overview
- `LOCAL_TESTING.md` - Testing guide
- `SUPABASE_SETUP.sql` - Database setup
