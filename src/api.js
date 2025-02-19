
export const webApi = window.location.hostname === "localhost"
  ? import.meta.env.VITE_API_URL_LOCAL  // Local development URL
  : import.meta.env.VITE_API_URL_PRO;   // Production URL
