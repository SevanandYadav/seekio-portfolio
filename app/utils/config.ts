// Content source configuration
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/SevanandYadav/seekio-portfolio/data";

export const CONTENT_BASE_URL = process.env.NODE_ENV === 'production' 
  ? GITHUB_RAW_BASE 
  : '';

export const getContentUrl = (path: string) => {
  return `${CONTENT_BASE_URL}/content${path}`;
};

export const getImageUrl = (path: string) => {
  return `${CONTENT_BASE_URL}${path}`;
};

// Asset URLs
export const ASSETS = {
  logo: `${GITHUB_RAW_BASE}/images/projects/seekiologo.png`,
  whatsappIcon: `${GITHUB_RAW_BASE}/images/projects/whtsapp-logo.png`,
  favicon: `${GITHUB_RAW_BASE}/images/projects/seekiologo.png`,
};
