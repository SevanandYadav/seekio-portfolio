// Content source configuration
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/SevanandYadav/seekio-portfolio/data";

export const CONTENT_BASE_URL = GITHUB_RAW_BASE;

export const getContentUrl = (path: string) => {
  return `${CONTENT_BASE_URL}/content${path}`;
};

export const getImageUrl = (path: string) => {
  return `${CONTENT_BASE_URL}${path}`;
};

// Asset URLs with preload hints
export const ASSETS = {
  logo: `${GITHUB_RAW_BASE}/images/projects/seekiologo.png`,
  whatsappIcon: `${GITHUB_RAW_BASE}/images/projects/whtsapp-logo.png`,
  favicon: `${GITHUB_RAW_BASE}/images/projects/seekiologo.png`,
};

// Preload critical assets
if (typeof window !== 'undefined') {
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'image';
  preloadLink.href = ASSETS.logo;
  document.head.appendChild(preloadLink);
}

// Contact info cache
let contactInfoCache: any = null;

export const getContactInfo = async () => {
  if (contactInfoCache) return contactInfoCache;
  
  try {
    const response = await fetch(getContentUrl('/contact.json'));
    const data = await response.json();
    contactInfoCache = {
      email: data.email,
      phone: data.phone,
      phoneRaw: data.phoneRaw,
      whatsappUrl: data.whatsappUrl
    };
    return contactInfoCache;
  } catch (error) {
    // Failed to load contact info
    return {
      email: 'contact@seekio.com',
      phone: '+1 (234) 567-890',
      phoneRaw: '1234567890',
      whatsappUrl: 'https://wa.me/1234567890'
    };
  }
};
