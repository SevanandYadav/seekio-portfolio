# 🚀 Quick Start Guide - Seekio Portfolio

Get your Seekio portfolio website running in 5 minutes!

## Prerequisites

- Node.js 20+ installed ([Download](https://nodejs.org))
- Git installed
- Code editor (VS Code recommended)

## Step 1: Install Dependencies

```bash
cd seekio-portfolio
npm install
```

## Step 2: Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Step 3: Customize Content

### Update Contact Information

**File: `app/components/layout/footer.tsx`**
```typescript
// Line 18-19: Update email
<a href="mailto:your-email@seekio.com">

// Line 21-22: Update WhatsApp
<a href="https://wa.me/YOUR_PHONE_NUMBER">
```

**File: `app/routes/contact.tsx`**
```typescript
// Line 52: Update email
<a href="mailto:your-email@seekio.com">

// Line 72: Update WhatsApp
<a href="https://wa.me/YOUR_PHONE_NUMBER">

// Line 92: Update phone
<a href="tel:+YOUR_PHONE_NUMBER">
```

### Update Company Details

**File: `app/routes/about.tsx`**
- Edit company story (lines 50-70)
- Update mission/vision (lines 80-100)

## Step 4: Build for Production

```bash
npm run build
```

Output will be in `build/` directory.

## Step 5: Deploy to Netlify

### Option A: Netlify Dashboard (Easiest)

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Click "Deploy site" (settings auto-detected from `netlify.toml`)

### Option B: Netlify CLI (Fastest)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify init
netlify deploy --prod
```

## 🎉 Done!

Your website is now live!

## Common Tasks

### Add a New Project to Portfolio

**File: `app/routes/portfolio.tsx`**

Add to the `projects` array:
```typescript
{
  icon: YourIcon,
  title: "Project Name",
  category: "Category",
  description: "Project description...",
  features: ["Feature 1", "Feature 2", "Feature 3"],
  gradient: "from-blue-600 to-cyan-600"
}
```

### Change Color Scheme

Search and replace in all files:
- `from-blue-600 to-indigo-600` → Your gradient colors
- `text-blue-600` → Your primary color
- `bg-blue-600` → Your primary background

### Add a New Page

1. Create file: `app/routes/your-page.tsx`
2. Add route in `app/routes.ts`:
   ```typescript
   route("your-page", "routes/your-page.tsx")
   ```
3. Add link in `app/components/layout/navbar.tsx`

## Troubleshooting

### Build Fails
```bash
# Check for TypeScript errors
npm run typecheck

# Clear cache and rebuild
rm -rf build node_modules
npm install
npm run build
```

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Styles Not Updating
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Restart dev server

## Need Help?

- 📖 Full documentation: `README.md`
- 🚀 Deployment guide: `DEPLOYMENT.md`
- ✍️ Content guide: `CONTENT.md`
- 📋 Project overview: `PROJECT_SUMMARY.md`

## File Structure Quick Reference

```
app/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, CTA, etc.
│   └── ui/             # Button, Card
├── routes/             # All pages
│   ├── home.tsx        # Home page
│   ├── about.tsx       # About page
│   ├── services.tsx    # Services page
│   ├── portfolio.tsx   # Portfolio page
│   └── contact.tsx     # Contact page
├── app.css            # Global styles
└── routes.ts          # Route config
```

## Essential Commands

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm start          # Preview production build
npm run typecheck  # Check TypeScript
```

## What's Next?

1. ✅ Customize contact info
2. ✅ Update company details
3. ✅ Add real project images
4. ✅ Deploy to Netlify
5. ✅ Set up custom domain
6. ✅ Enable analytics

---

**Ready to launch? Let's go! 🚀**
