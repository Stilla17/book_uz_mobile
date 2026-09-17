import { showAlert } from "@/store/useAlertStore";
import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";


type ApiErrorResponse = {
  message?: string;
  error?: string;
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
    onError: (error: unknown) => {
      const isAxiosError = axios.isAxiosError<ApiErrorResponse>(error);
      const responseData = isAxiosError ? error.response?.data : undefined;
      const message = isAxiosError
        ? responseData?.message ?? responseData?.error ?? error.message
        : error instanceof Error
          ? error.message
          : "OTP yuborishda xatolik yuz berdi";

      const baseURL = isAxiosError ? error.config?.baseURL : undefined;
      const endpoint = isAxiosError ? error.config?.url : undefined;

      // console.error React Native LogBox oynasini ochadi. console.log esa
      // tafsilotlarni Metro terminalida ko'rsatadi, lekin UI'ni to'smaydi.
      console.log("[OTP yuborish xatosi]", {
        message,
        code: isAxiosError ? error.code : undefined,
        status: isAxiosError ? error.response?.status : undefined,
        baseURL,
        endpoint,
        requestURL: baseURL && endpoint ? `${baseURL}${endpoint}` : endpoint,
        response: responseData,
      });

      showAlert("Xato", message);
    },
  });
};
