import { authService } from "@/services/auth.service";
import { authStorage } from "@/storage/auth.storage";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authService.register,
    onSuccess: async (data) => {
      await authStorage.saveTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
    },
  });
};
