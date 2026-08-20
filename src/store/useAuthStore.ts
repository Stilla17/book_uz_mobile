import { AuthState } from "@/types/auth.types";
import { create } from "zustand";
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (value) => set({ isLoading: value }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),
}));
