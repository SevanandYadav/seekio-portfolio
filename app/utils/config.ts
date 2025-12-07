// Content source configuration
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/SevanandYadav/seekio-portfolio/data/build/client";

export const CONTENT_BASE_URL = process.env.NODE_ENV === 'production' 
  ? GITHUB_RAW_BASE 
  : '';

export const getContentUrl = (path: string) => {
  return `${CONTENT_BASE_URL}${path}`;
};

export const getImageUrl = (path: string) => {
  return `${CONTENT_BASE_URL}${path}`;
};
