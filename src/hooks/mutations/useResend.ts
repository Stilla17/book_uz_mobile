import { authService } from "@/services/auth.service";
import { ApiErrorResponse } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Alert } from "react-native";

export const useResend = () => {
  return useMutation({
    mutationFn: authService.sendOtp,
    onSuccess: () => {
      Alert.alert("Yuborildi", "Yangi tasdiqlash kodi yuborildi");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      Alert.alert(
        "Xato",
        error.response?.data?.message ?? "OTP qayta yuborilmadi",
      );
    },
  });
};
