# Data Branch Setup Guide

Separate content (JSON/images) from code to avoid triggering pipeline on content updates.

## Step 1: Create Data Branch

```bash
# Create orphan data branch (no history from main)
git checkout --orphan data

# Remove all files
git rm -rf .

# Copy content and images
mkdir -p public/content public/images
cp -r ../main-backup/public/content/* public/content/
cp -r ../main-backup/public/images/* public/images/

# Create README
cat > README.md << 'EOF'
# Seekio Content & Assets

This branch contains all content (JSON) and images for the Seekio website.

## Structure
- `public/content/` - JSON content files
- `public/images/` - Logo, icons, project images

## Editing
Edit JSON files directly and commit to this branch.
Main branch will fetch from GitHub raw URLs.
EOF

# Commit
git add .
git commit -m "Initial data branch"
git push origin data
```

## Step 2: Update Main Branch Config

Edit `app/utils/config.ts`:

```typescript
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/YOUR_USERNAME/seekio-portfolio/data";
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 3: Update Component Fetch Calls

Already done in:
- `app/components/sections/hero.tsx`
- `app/components/sections/services-preview.tsx`
- `app/components/sections/cta.tsx`
- `app/routes/portfolio.tsx`

All use: `fetch(getContentUrl('/content/hero.json'))`

## Step 4: Test Locally

```bash
# Switch to main branch
git checkout main

# Test with local files (development)
npm run dev

# Test with GitHub URLs (production)
NODE_ENV=production npm run build
```

## Step 5: Deploy

```bash
# Commit changes to main
git add .
git commit -m "Configure data branch URLs"
git push origin main

# Deploy to Netlify
# Content changes won't trigger rebuild
```

## Workflow

### Update Content
```bash
# Switch to data branch
git checkout data

# Edit JSON files
nano public/content/hero.json

# Commit and push
git add .
git commit -m "Update hero content"
git push origin data

# Changes live immediately (no rebuild needed)
```

### Update Code
```bash
# Switch to main branch
git checkout main

# Make code changes
# Commit and push
git push origin main

# Triggers Netlify rebuild
```

## Benefits

✅ Content updates don't trigger pipeline
✅ Faster content deployments
✅ Separate version control for content
✅ Non-technical team can edit JSON
✅ Images managed separately

## File Structure

### Data Branch
```
data/
├── README.md
└── public/
    ├── content/
    │   ├── hero.json
    │   ├── services.json
    │   ├── portfolio.json
    │   ├── about.json
    │   ├── contact.json
    │   ├── cta.json
    │   ├── stats.json
    │   └── assets.json
    └── images/
        ├── logo.png
        ├── favicon.png
        ├── icons/
        └── projects/
```

### Main Branch
```
main/
├── app/
├── public/
│   └── (empty - fetches from data branch)
├── package.json
└── ...
```

## GitHub Raw URLs

Content fetched from:
```
https://raw.githubusercontent.com/USERNAME/seekio-portfolio/data/public/content/hero.json
https://raw.githubusercontent.com/USERNAME/seekio-portfolio/data/public/images/logo.png
```

## Netlify Configuration

No changes needed. Netlify builds from `main` branch.
Content loads from GitHub raw URLs at runtime.

## Cache Considerations

GitHub raw URLs are cached. To force refresh:
- Add version query: `?v=2`
- Or wait ~5 minutes for cache to expire

## Alternative: GitHub Pages

Host data branch on GitHub Pages:
```bash
# In data branch
# Enable GitHub Pages in repo settings
# Use: https://USERNAME.github.io/seekio-portfolio/content/hero.json
```

## Security

Content is public (GitHub raw URLs).
Don't store sensitive data in JSON files.
