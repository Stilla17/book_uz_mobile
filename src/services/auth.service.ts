import { api } from "@/api/client";
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  SendOtpPayload,
  VerifyOtpPayload,
} from "@/types/auth.types";

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
  },
  // registratsiyadan otish apisi
  register: async (payload: RegisterPayload) => {
    const { data } = await api.post("/auth/register", payload);
    return data;
  },
  // ilovadan chiqish
  logout: () => api.post("/auth/logout"),
  // refresh token
  refreshToken: (refreshToken: string) =>
    api.post("/auth/refresh", {
      refreshToken,
    }),
  // Telefonga SMS code yuborish
  sendOtp: async (payload: SendOtpPayload) => {
    const response = await api.post("/auth/phone/send-otp", payload);
    return response.data.data;
  },
  // sms code ni tasdiqlash uchun api
  verifyOtp: async (payload: VerifyOtpPayload) => {
    const response = await api.post("/auth/phone/verify-otp", payload);
    return response.data.data;
  },
};
