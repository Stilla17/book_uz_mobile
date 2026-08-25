import { authService } from "@/services/auth.service";
import { authStorage } from "@/storage/auth.storage";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSettled: async () => {
      await authStorage.removeTokens();
      queryClient.clear();
      clearAuth();
    },
  });
};