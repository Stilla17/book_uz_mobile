import { AuthResponse, AuthSession } from "@/types/auth.types";

export const normalizeAuthResponse = (response: AuthResponse): AuthSession => {
  const data = response.data;

  if (!data?.user) {
    throw new Error(response.message ?? "Foydalanuvchi ma'lumoti kelmadi");
  }

  const accessToken = data.accessToken ?? data.token;

  if (!accessToken) {
    throw new Error("Access token kelmadi");
  }

  return { user: data.user, accessToken, refreshToken: data.refreshToken };
};
