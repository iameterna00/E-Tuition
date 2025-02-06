
  export const webApi = window.location.hostname === "localhost"
  ? "http://localhost:5001"  // Local development
  : "https://kube-backend.onrender.com"; 