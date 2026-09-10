import { authService } from "@/services/auth.service";
import { ApiErrorResponse } from "@/types/auth.types";
import { handleAuthResult } from "@/utils/handleAuthResult";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Alert } from "react-native";

export const useCheckOtp = () => {
  return useMutation({
    mutationFn: authService.verifyOtp,
    onSuccess: async (result) => {
      await handleAuthResult(result);
    },
    onError: (error: unknown) => {
      const message = axios.isAxiosError<ApiErrorResponse>(error)
        ? (error.response?.data?.message ?? error.message)
        : error instanceof Error
          ? error.message
          : "OTP tekshirishda xatolik yuz berdi";

      Alert.alert("Xato", message);
    },
  });
};
