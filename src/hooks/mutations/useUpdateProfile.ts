import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: authService.updateProfile,
  });
};
