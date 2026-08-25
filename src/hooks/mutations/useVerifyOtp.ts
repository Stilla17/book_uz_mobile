import { authService } from "@/services/auth.service";
import { authStorage } from "@/storage/auth.storage";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";

type ApiErrorResponse = {
  message?: string;
};

export const useCheckOtp = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authService.verifyOtp,
    onSuccess: async (data) => {
      if (!data.accessToken) {
        throw new Error("Server javobida access token topilmadi");
      }

      await authStorage.saveTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      router.replace("/(tabs)/home");
    },
    onError: (error: unknown) => {
      const message = axios.isAxiosError<ApiErrorResponse>(error)
        ? (error.response?.data?.message ?? error.message)
        : error instanceof Error
          ? error.message
          : "OTP tekshirishda xatolik yuz berdi";

      Alert.alert(
        "Xato",
        message,
      );
    },
  });
};
