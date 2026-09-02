import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("skillswap_auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Centralized response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on 401 unauthorized to prevent loop
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/signup" && currentPath !== "/") {
        localStorage.removeItem("skillswap_auth_token");
        localStorage.removeItem("skillswap_auth_user");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
