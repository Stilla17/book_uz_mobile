import { showAlert } from "@/store/useAlertStore";
import { authService } from "@/services/auth.service";
import { authStorage } from "@/storage/auth.storage";
import { useAuthStore } from "@/store/useAuthStore";
import { ApiErrorResponse } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";


export const useCompleteRegistration = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setPendingRegistration = useAuthStore(
    (state) => state.setPendingRegistration,
  );

  return useMutation({
    mutationFn: authService.completeRegistration,
    onSuccess: async (session) => {
      await authStorage.saveTokens(
        session.accessToken,
        session.refreshToken,
      );
      setPendingRegistration(null);
      setUser(session.user);
      router.replace("/(tabs)/home");
    },
    onError: (error: unknown) => {
      const message = axios.isAxiosError<ApiErrorResponse>(error)
        ? (error.response?.data?.message ?? error.message)
        : error instanceof Error
          ? error.message
          : "Ro'yxatdan o'tishda xatolik yuz berdi";

      showAlert("Xato", message);
    },
  });
};
