// Content source configuration
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/YOUR_USERNAME/seekio-portfolio/data";

export const CONTENT_BASE_URL = process.env.NODE_ENV === 'production' 
  ? GITHUB_RAW_BASE 
  : '';

export const getContentUrl = (path: string) => {
  return `${CONTENT_BASE_URL}${path}`;
};
