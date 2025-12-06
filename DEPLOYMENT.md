# Deployment Guide - Seekio Portfolio

## Quick Start

### Prerequisites
- Node.js 20+ installed
- Git installed
- GitHub account
- Netlify account (free tier works)

## Step-by-Step Netlify Deployment

### 1. Prepare Your Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Seekio portfolio website"

# Create main branch
git branch -M main
```

### 2. Push to GitHub

```bash
# Create a new repository on GitHub (github.com/new)
# Then connect and push:

git remote add origin https://github.com/YOUR_USERNAME/seekio-portfolio.git
git push -u origin main
```

### 3. Deploy on Netlify

#### Option A: Netlify Dashboard (Recommended)

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub
5. Select your `seekio-portfolio` repository
6. Netlify will auto-detect settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `build/client`
7. Click **"Deploy site"**

#### Option B: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose your team
# - Site name: seekio-portfolio (or your choice)
# - Build command: npm run build
# - Publish directory: build/client

# Deploy
netlify deploy --prod
```

### 4. Configure Custom Domain (Optional)

1. In Netlify dashboard, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `seekio.com`)
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic with Netlify)

### 5. Environment Variables (If Needed)

If you add any API keys or secrets:

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add key-value pairs
4. Redeploy the site

## Continuous Deployment

Once connected to GitHub, Netlify automatically:
- Deploys on every push to `main` branch
- Creates preview deployments for pull requests
- Runs build checks before deployment

## Build Configuration

The `netlify.toml` file includes:

```toml
[build]
  command = "npm run build"
  publish = "build/client"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures:
- Correct build command
- Proper publish directory
- SPA routing works correctly
- Security headers are set

## Troubleshooting

### Build Fails

```bash
# Test build locally first
npm run build

# Check for errors
npm run typecheck
```

### Routes Not Working

Ensure `netlify.toml` has the redirect rule (already included).

### Slow Build Times

Netlify caches `node_modules`. If issues occur:
1. Go to **Site settings** → **Build & deploy**
2. Click **"Clear cache and retry deploy"**

## Performance Optimization

The site is already optimized with:
- ✅ Server-side rendering (SSR)
- ✅ Code splitting
- ✅ Optimized assets
- ✅ Caching headers

### Additional Optimizations

1. **Enable Asset Optimization** (Netlify dashboard)
   - Go to **Site settings** → **Build & deploy** → **Post processing**
   - Enable: Bundle CSS, Minify CSS, Minify JS, Compress images

2. **Add Analytics** (Optional)
   - Go to **Site settings** → **Analytics**
   - Enable Netlify Analytics

## Monitoring

### Check Deployment Status

```bash
# Using Netlify CLI
netlify status

# View recent deploys
netlify deploy:list
```

### View Logs

1. Go to **Deploys** tab in Netlify dashboard
2. Click on any deployment
3. View build logs and deploy details

## Rollback

If a deployment has issues:

1. Go to **Deploys** tab
2. Find a previous successful deploy
3. Click **"Publish deploy"**

Or via CLI:
```bash
netlify rollback
```

## Custom Build Commands

If you need custom build steps, edit `netlify.toml`:

```toml
[build]
  command = "npm run build && npm run custom-script"
  publish = "build/client"
```

## Preview Deployments

Every pull request gets a preview URL:
- Automatically generated
- Unique URL for testing
- No impact on production

## Security

The site includes security headers in `netlify.toml`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## Support

For deployment issues:
- Netlify Docs: [https://docs.netlify.com](https://docs.netlify.com)
- Netlify Support: [https://answers.netlify.com](https://answers.netlify.com)

---

## Alternative Deployment Options

### Vercel

```bash
npm install -g vercel
vercel login
vercel
```

### Docker

```bash
docker build -t seekio-portfolio .
docker run -p 3000:3000 seekio-portfolio
```

### Traditional Hosting

```bash
npm run build
# Upload build/client/* to your web server
```

---

**Ready to deploy?** Follow the steps above and your Seekio portfolio will be live in minutes! 🚀
