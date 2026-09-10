import { authStorage } from "@/storage/auth.storage";
import axios from "axios";

const rawApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, "");

if (!rawApiUrl) {
  throw new Error("EXPO_PUBLIC_API_URL .env faylida topilmadi");
}

// Eski bundle yoki .env qiymatida /api/v1 yozilmagan bo'lsa ham barcha
// so'rovlar backendning to'g'ri API prefiksiga yuboriladi.
export const API_BASE_URL = rawApiUrl.endsWith("/api/v1")
  ? rawApiUrl
  : `${rawApiUrl}/api/v1`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = await authStorage.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
