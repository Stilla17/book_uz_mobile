import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export const useOtp = useMutation({
  mutationFn: authService.sendOtp,
  onSuccess: (_, variables) => {
    router.push({
      pathname: "/(auth)/otp",
      params: {
        phone: variables.phone,
      },
    });
  },
});
