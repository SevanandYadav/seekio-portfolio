# Content Management Options

Currently, all website content is **hardcoded** in React component files.

## Current Structure (Hardcoded)

```
app/routes/home.tsx          → Hero, stats
app/routes/about.tsx         → Company info, values
app/routes/services.tsx      → Service descriptions
app/routes/portfolio.tsx     → Project showcases
app/routes/contact.tsx       → Contact info
app/components/sections/     → Reusable sections
```

## Where Content Lives:

| Content Type | File Location | Lines |
|-------------|---------------|-------|
| Hero text | `app/components/sections/hero.tsx` | 20-40 |
| Services | `app/components/sections/services-preview.tsx` | 10-50 |
| Projects | `app/routes/portfolio.tsx` | 15-80 |
| About text | `app/routes/about.tsx` | 40-200 |
| Contact info | `app/routes/contact.tsx` | 40-100 |

## To Make Content Dynamic:

### Option 1: JSON Files (Simple)

1. Create `public/content/`:
```bash
mkdir -p public/content
```

2. Create JSON files:
```json
// public/content/services.json
{
  "services": [
    {
      "title": "Web Solutions",
      "description": "Custom websites...",
      "icon": "Globe"
    }
  ]
}
```

3. Fetch in components:
```typescript
const [services, setServices] = useState([]);

useEffect(() => {
  fetch('/content/services.json')
    .then(res => res.json())
    .then(data => setServices(data.services));
}, []);
```

### Option 2: Headless CMS (Advanced)

Popular options:
- **Contentful** - Easy to use
- **Strapi** - Self-hosted, free
- **Sanity** - Developer-friendly
- **Prismic** - Good for marketing

Example with Contentful:
```typescript
import { createClient } from 'contentful';

const client = createClient({
  space: 'YOUR_SPACE_ID',
  accessToken: 'YOUR_ACCESS_TOKEN'
});

export async function loader() {
  const entries = await client.getEntries({
    content_type: 'service'
  });
  return entries.items;
}
```

### Option 3: Markdown Files (Developer-Friendly)

1. Create `content/` folder:
```bash
mkdir content
```

2. Add markdown files:
```markdown
// content/about.md
---
title: About Seekio
---

We are a digital transformation company...
```

3. Use markdown parser:
```bash
npm install gray-matter marked
```

4. Load in routes:
```typescript
import fs from 'fs';
import matter from 'gray-matter';

export async function loader() {
  const file = fs.readFileSync('content/about.md', 'utf8');
  const { data, content } = matter(file);
  return { data, content };
}
```

## Recommendation:

**For now: Keep it hardcoded** ✅
- Faster performance
- No API calls
- Easier to maintain
- Perfect for static content

**Switch to CMS when:**
- Non-technical team needs to edit content
- Content changes frequently
- Multiple languages needed
- Blog/news section added

## Quick Edit Guide:

To change content now:

1. **Hero text**: Edit `app/components/sections/hero.tsx` line 35
2. **Services**: Edit `app/components/sections/services-preview.tsx` lines 10-50
3. **Projects**: Edit `app/routes/portfolio.tsx` lines 15-80
4. **About**: Edit `app/routes/about.tsx` lines 40-200
5. **Contact**: Edit `app/routes/contact.tsx` lines 40-100

All content is in plain text/JSX - just edit and rebuild!
