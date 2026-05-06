import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
};

export const productAPI = {
  getAll: () => api.get("/products"),
};

export const orderAPI = {
  create: (order) => api.post("/orders", order),
};

export default api;