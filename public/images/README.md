# Images & Assets Management

All visual assets are centrally managed here.

## Directory Structure

```
public/images/
├── logo.png              # Main logo (light mode)
├── logo-dark.png         # Logo for dark mode
├── icons/                # Service & project icons (SVG)
│   ├── web-solutions.svg
│   ├── business-digitization.svg
│   ├── academic-platforms.svg
│   ├── low-code.svg
│   ├── process-automation.svg
│   ├── digital-presence.svg
│   ├── graduation-cap.svg
│   ├── building.svg
│   ├── globe.svg
│   ├── message-square.svg
│   ├── shopping-cart.svg
│   └── calendar.svg
└── projects/             # Project screenshots
    ├── academic.jpg
    ├── business.jpg
    ├── corporate.jpg
    ├── whatsapp.jpg
    ├── ecommerce.jpg
    └── events.jpg
```

## Configuration

All paths are defined in `public/content/assets.json`:

```json
{
  "logo": "/images/logo.png",
  "projectImages": {...},
  "serviceIcons": {...},
  "projectIcons": {...}
}
```

## Current State

### Logo
- Using CSS gradient (no image file)
- Add `logo.png` to replace

### Icons
- Using Lucide React (SVG components)
- Add custom SVG files to `icons/` to replace

### Project Images
- Using placeholder URLs (placehold.co)
- Add real images to `projects/` to replace

## Adding Real Assets

### 1. Add Logo
```bash
# Place your logo
cp your-logo.png public/images/logo.png
cp your-logo-dark.png public/images/logo-dark.png
```

### 2. Add Icons
```bash
# Add SVG icons
cp your-icons/*.svg public/images/icons/
```

### 3. Add Project Images
```bash
# Add project screenshots
cp your-projects/*.jpg public/images/projects/
```

### 4. Update assets.json
```json
{
  "projectImages": {
    "academic": "/images/projects/academic.jpg"
  }
}
```

### 5. Rebuild
```bash
npm run build
```

## Image Specifications

### Logo
- Format: PNG or SVG
- Size: 200x200px (or scalable SVG)
- Background: Transparent

### Icons
- Format: SVG (preferred)
- Size: 40x40px or scalable
- Color: Single color or gradient

### Project Images
- Format: JPG or PNG
- Size: 800x600px
- Quality: 85%
- Optimized for web

## Free Resources

### Stock Photos
- https://unsplash.com
- https://pexels.com
- https://pixabay.com

### Icons
- https://lucide.dev (current)
- https://heroicons.com
- https://fontawesome.com
- https://iconify.design

### Logo Design
- https://canva.com
- https://figma.com
- https://looka.com

## Optimization

Before adding images, optimize them:

```bash
# Install tools
npm install -g sharp-cli

# Optimize images
sharp -i input.jpg -o output.jpg --quality 85 --resize 800 600
```

## API Integration

To fetch from API instead of local files:

```json
{
  "logo": "https://api.seekio.in/assets/logo.png",
  "projectImages": {
    "academic": "https://api.seekio.in/assets/projects/academic.jpg"
  }
}
```

Components will automatically fetch from the new URLs.
