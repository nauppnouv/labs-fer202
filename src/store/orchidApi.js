// Orchid API service
// Replace BASE_URL with your mockapi.io endpoint

import axios from "axios";

const BASE_URL = import.meta.env.VITE_MOCKAPI_URL || "https://your-mockapi-url.mockapi.io/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("google_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============ Orchids CRUD ============

export const getOrchids = () => api.get("/orchids");

export const getOrchidById = (id) => api.get(`/orchids/${id}`);

export const createOrchid = (data) => api.post("/orchids", data);

export const updateOrchid = (id, data) => api.put(`/orchids/${id}`, data);

export const deleteOrchid = (id) => api.delete(`/orchids/${id}`);

export default api;
