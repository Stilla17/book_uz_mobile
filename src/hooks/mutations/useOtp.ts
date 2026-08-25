import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";

type ApiErrorResponse = {
  message?: string;
};

export const useOtp = () => {
  return useMutation({
    mutationFn: authService.sendOtp,
    onSuccess: (_, variables) => {
      router.push({
        pathname: "/(auth)/otp",
        params: {
          phone: variables.phone,
        },
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      Alert.alert(
        "Xato",
        error.response?.data?.message ?? "OTP yuborishda xatolik yuz berdi",
      );
    },
  });
};
