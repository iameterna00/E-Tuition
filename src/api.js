
export const webApi = window.location.hostname === "localhost"
  ? import.meta.env.VITE_API_URL_LOCAL  
  : import.meta.env.VITE_API_URL_PRO;   
