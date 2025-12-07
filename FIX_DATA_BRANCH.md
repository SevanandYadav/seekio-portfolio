# Fix Data Branch Structure

## Problem
Images and JSON files are not accessible via GitHub raw URLs.

## Current URLs (NOT WORKING)
```
https://raw.githubusercontent.com/SevanandYadav/seekio-portfolio/data/build/client/images/projects/seekiologo.png
https://raw.githubusercontent.com/SevanandYadav/seekio-portfolio/data/build/client/content/hero.json
```

## Solution: Restructure Data Branch

### Step 1: Switch to Data Branch
```bash
git checkout data
```

### Step 2: Check Current Structure
```bash
ls -la
# Should show: build/
```

### Step 3: Move Files to Root
```bash
# Move content to root
mv build/client/content ./content
mv build/client/images ./images

# Remove build folder
rm -rf build

# Verify structure
ls -la
# Should show: content/ images/
```

### Step 4: Commit Changes
```bash
git add .
git commit -m "Restructure: move files to root"
git push origin data
```

### Step 5: Update Main Branch Config

Switch to main branch:
```bash
git checkout main
```

Edit `app/utils/config.ts`:
```typescript
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/SevanandYadav/seekio-portfolio/data";

export const ASSETS = {
  logo: `${GITHUB_RAW_BASE}/images/projects/seekiologo.png`,
  whatsappIcon: `${GITHUB_RAW_BASE}/images/projects/whtsapp-logo.png`,
  favicon: `${GITHUB_RAW_BASE}/images/projects/seekiologo.png`,
};
```

### Step 6: Test URLs

After restructuring, URLs should be:
```
https://raw.githubusercontent.com/SevanandYadav/seekio-portfolio/data/content/hero.json
https://raw.githubusercontent.com/SevanandYadav/seekio-portfolio/data/images/projects/seekiologo.png
```

Test in browser or:
```bash
curl -I "https://raw.githubusercontent.com/SevanandYadav/seekio-portfolio/data/images/projects/seekiologo.png"
# Should return: HTTP/2 200
```

## Final Data Branch Structure

```
data/
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
    └── projects/
        ├── seekiologo.png
        ├── whtsapp-logo.png
        └── (other project images)
```

## Verification

After fixing, check:
1. GitHub web interface shows files at root level
2. Raw URLs return 200 status
3. Images load in browser
4. JSON files are accessible
