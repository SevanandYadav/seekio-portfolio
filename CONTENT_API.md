# Content Management via JSON

All website content is now stored in JSON files under `public/content/`.

## JSON Files Structure

```
public/content/
├── hero.json          # Homepage hero section
├── services.json      # Services preview section
├── portfolio.json     # Portfolio projects
├── about.json         # About page content
├── contact.json       # Contact page content
└── cta.json          # Call-to-action sections
```

## How It Works

Components fetch content from JSON files on mount:

```typescript
const [content, setContent] = useState(null);

useEffect(() => {
  fetch('/content/hero.json')
    .then(res => res.json())
    .then(data => setContent(data));
}, []);
```

## Editing Content

### Option 1: Edit JSON Files Directly

Edit files in `public/content/` and rebuild:

```bash
# Edit the file
nano public/content/hero.json

# Rebuild
npm run build
```

### Option 2: Replace with API

Change fetch URL to your API:

```typescript
// Before
fetch('/content/hero.json')

// After
fetch('https://api.seekio.in/content/hero')
```

## JSON File Details

### hero.json
```json
{
  "badge": "Badge text",
  "headline": "Main headline",
  "headlineHighlight": "Highlighted part",
  "subheadline": "Description",
  "primaryCTA": "Button text",
  "secondaryCTA": "Button text",
  "stats": [...]
}
```

### services.json
```json
{
  "heading": "Section title",
  "subheading": "Section description",
  "services": [
    {
      "icon": "Globe",
      "title": "Service name",
      "description": "Service description"
    }
  ]
}
```

### portfolio.json
```json
{
  "heading": "Section title",
  "subheading": "Section description",
  "projects": [...],
  "stats": [...]
}
```

### about.json
```json
{
  "heading": "Page title",
  "intro": {...},
  "mission": "Mission statement",
  "vision": "Vision statement",
  "values": [...],
  "whatWeDo": [...]
}
```

### contact.json
```json
{
  "heading": "Page title",
  "contactMethods": [...],
  "whyWorkWithUs": [...]
}
```

### cta.json
```json
{
  "heading": "CTA heading",
  "subheading": "CTA description",
  "primaryCTA": "Button text",
  "secondaryCTA": "Button text",
  "whatsappLink": "WhatsApp URL"
}
```

## Migrating to API

### Step 1: Create API Endpoints

Create endpoints that return same JSON structure:

```
GET /api/content/hero
GET /api/content/services
GET /api/content/portfolio
GET /api/content/about
GET /api/content/contact
GET /api/content/cta
```

### Step 2: Update Fetch URLs

Replace in all components:

```typescript
// Find
fetch('/content/hero.json')

// Replace with
fetch('https://api.seekio.in/api/content/hero')
```

### Step 3: Add Error Handling

```typescript
useEffect(() => {
  fetch('https://api.seekio.in/api/content/hero')
    .then(res => res.json())
    .then(data => setContent(data))
    .catch(err => console.error('Failed to load content:', err));
}, []);
```

## Components Using JSON

- `app/components/sections/hero.tsx` → `hero.json`
- `app/components/sections/services-preview.tsx` → `services.json`
- `app/components/sections/cta.tsx` → `cta.json`
- `app/routes/portfolio.tsx` → `portfolio.json` (needs update)
- `app/routes/about.tsx` → `about.json` (needs update)
- `app/routes/contact.tsx` → `contact.json` (needs update)

## Benefits

✅ Content separated from code
✅ Easy to edit without touching React
✅ Ready for CMS integration
✅ Can be replaced with API calls
✅ Version control for content
✅ Multiple language support ready

## Next Steps

1. Update remaining components (portfolio, about, contact)
2. Create admin panel to edit JSON
3. Or migrate to headless CMS (Strapi, Contentful)
4. Or create custom API backend
