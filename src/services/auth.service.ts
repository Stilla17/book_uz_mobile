import { api } from "@/api/client";
import {
  ApiResponse,
  AuthData,
  AuthFlowData,
  AuthResponse,
  AuthSession,
  CompleteRegistrationPayload,
  LoginPayload,
  RegisterPayload,
  SendOtpPayload,
  SendOtpResponse,
  VerifyOtpPayload,
} from "@/types/auth.types";
import { normalizeAuthResponse } from "@/utils/authResponse";

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthSession> => {
    const response = await api.post<AuthResponse>("/auth/login", payload);
    return normalizeAuthResponse(response.data);
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
  sendOtp: async (payload: SendOtpPayload): Promise<SendOtpResponse> => {
    const response = await api.post<ApiResponse<SendOtpResponse>>(
      "/auth/mobile/phone/send-otp",
      payload,
      { timeout: 30000 },
    );

    if (!response.data.data) {
      throw new Error(response.data.message ?? "OTP yuborilmadi");
    }

    return response.data.data;
  },
  // sms code ni tasdiqlash uchun api
  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthFlowData> => {
    const response = await api.post<ApiResponse<AuthFlowData | AuthData>>(
      "/auth/mobile/phone/verify-otp",
      payload,
    );

    const data = response.data.data;

    if (!data) {
      throw new Error(response.data.message ?? "OTP tekshirilmadi");
    }

    if ("isNewUser" in data) {
      return data;
    }

    return {
      isNewUser: false,
      session: normalizeAuthResponse(response.data as AuthResponse),
    };
  },
  completeRegistration: async (
    payload: CompleteRegistrationPayload,
  ): Promise<AuthSession> => {
    const response = await api.post<AuthResponse>(
      "/auth/mobile/complete-registration",
      payload,
    );

    return normalizeAuthResponse(response.data);
  },
  getProfile: async () => {
    const response = await api.get("/users/profile");

    return (
      response.data?.data?.user ??
      response.data?.data ??
      response.data?.user ??
      response.data
    );
  },
  googleLogin: async (idToken: string): Promise<AuthFlowData> => {
    const response = await api.post<ApiResponse<AuthFlowData>>(
      "/auth/mobile/google",
      { idToken },
      { timeout: 30000 },
    );

    if (!response.data.data) {
      throw new Error(response.data.message ?? "Google login failed");
    }

    return response.data.data;
  },
};
