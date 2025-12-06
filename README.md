# Seekio - Digital Transformation Portfolio

A modern, production-ready portfolio and business website for Seekio, showcasing digital transformation services including web development, business digitization, academic platforms, and low-code solutions.

## 🚀 Features

- **Modern UI/UX**: Clean, Apple/Stripe-inspired design with smooth animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Performance Optimized**: Built with React Router 7 and Vite for blazing-fast load times
- **SEO Ready**: Proper meta tags and semantic HTML for search engine optimization
- **Smooth Animations**: Framer Motion for delightful user interactions
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Type-Safe**: Built with TypeScript for robust code quality

## 🛠 Tech Stack

- **Framework**: React Router 7 with SSR
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Deployment**: Netlify-ready

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

Your application will be available at `http://localhost:5173`

## 📁 Project Structure

```
seekio-portfolio/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx       # Navigation component
│   │   │   └── footer.tsx       # Footer component
│   │   ├── sections/
│   │   │   ├── hero.tsx         # Hero section
│   │   │   ├── services-preview.tsx
│   │   │   ├── why-choose.tsx
│   │   │   ├── tech-stack.tsx
│   │   │   └── cta.tsx          # Call-to-action sections
│   │   └── ui/
│   │       ├── button.tsx       # Reusable button component
│   │       └── card.tsx         # Reusable card component
│   ├── routes/
│   │   ├── home.tsx            # Home page
│   │   ├── about.tsx           # About page
│   │   ├── services.tsx        # Services page
│   │   ├── portfolio.tsx       # Portfolio page
│   │   └── contact.tsx         # Contact page
│   ├── app.css                 # Global styles
│   ├── root.tsx                # Root layout
│   └── routes.ts               # Route configuration
├── public/                     # Static assets
├── netlify.toml               # Netlify configuration
├── package.json
└── README.md
```

## 🎨 Pages

### Home Page
- Hero section with compelling value proposition
- Services overview
- Why Choose Seekio section
- Technology stack showcase
- Call-to-action sections

### About Page
- Company introduction and mission
- Core values
- What we do
- Vision statement

### Services Page
Detailed information about three main service categories:
1. **Digital Business Solutions**
   - Website creation
   - Process automation
   - Online presence optimization
   - Business workflow tools

2. **Academic Digitization Platform**
   - Teacher interaction panels
   - Class scheduling
   - Institute showcase pages
   - Online fee payment modules
   - WhatsApp & email integration

3. **Low-Code / No-Code Applications**
   - Custom app development
   - Cross-platform apps
   - Lightweight admin dashboards
   - Fast, affordable, scalable solutions

### Portfolio Page
- Project showcases with categories
- Success metrics
- Feature highlights

### Contact Page
- Contact form
- Multiple contact methods (Email, WhatsApp, Phone)
- Why work with us section

## 🌐 Deployment

### Deploy to Netlify

1. **Connect to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Netlify will auto-detect settings from `netlify.toml`
   - Click "Deploy site"

3. **Environment Variables** (if needed)
   - Go to Site settings → Environment variables
   - Add any required variables

### Manual Deployment

```bash
# Build the project
npm run build

# The build output will be in:
# - build/client/  (static assets)
# - build/server/  (server-side code)
```

## 🎯 Customization

### Update Contact Information

Edit the following files to update contact details:
- `app/components/layout/footer.tsx`
- `app/routes/contact.tsx`

Replace placeholder values:
- Email: `contact@seekio.com`
- WhatsApp: `https://wa.me/1234567890`
- Phone: `+1 (234) 567-890`

### Update Brand Colors

The color scheme uses Tailwind's blue and indigo gradients. To customize:
- Edit gradient classes in components (e.g., `from-blue-600 to-indigo-600`)
- Modify `app/app.css` for global color changes

### Add More Projects

Edit `app/routes/portfolio.tsx` and add items to the `projects` array.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm start` - Preview production build
- `npm run typecheck` - Run TypeScript type checking

### Code Quality

The project uses:
- TypeScript for type safety
- React Router 7 for routing and SSR
- TailwindCSS for styling
- Framer Motion for animations

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ⚡ Performance

- Server-side rendering (SSR) for fast initial load
- Code splitting for optimal bundle sizes
- Optimized images and assets
- Minimal JavaScript for better performance

## 🤝 Support

For questions or issues:
- Email: contact@seekio.com
- WhatsApp: [Start Chat](https://wa.me/1234567890)

## 📄 License

This project is proprietary and confidential.

---

Built with ❤️ by Seekio - Transforming businesses through digital excellence.
