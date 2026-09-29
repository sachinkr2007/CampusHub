// ==========================================
// Centralized API Configuration for CampusHub
// ==========================================
// Supports local development and production deployments (Vercel, Render, Netlify, etc.)

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default API_BASE_URL;
