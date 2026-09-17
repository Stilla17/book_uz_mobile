import { showAlert } from "@/store/useAlertStore";
import { authService } from "@/services/auth.service";
import { ApiErrorResponse } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export const useResend = () => {
  return useMutation({
    mutationFn: authService.sendOtp,
    onSuccess: () => {
      showAlert("Yuborildi", "Yangi tasdiqlash kodi yuborildi");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      showAlert(
        "Xato",
        error.response?.data?.message ?? "OTP qayta yuborilmadi",
      );
    },
  });
};
