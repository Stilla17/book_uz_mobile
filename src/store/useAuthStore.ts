import { AuthState, User } from "@/types/auth.types";
import { create } from "zustand";
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isGuest: false,
  pendingRegistration: null,

  setPendingRegistration: (data) =>
    set({
      pendingRegistration: data,
    }),
  continueAsGuest: () =>
    set({
      isGuest: true,
      isAuthenticated: false,
    }),
  setUser: (user) => set({ user, isAuthenticated: !!user, isGuest: false }),
  setLoading: (value) => set({ isLoading: value }),
  updateUser: (value: Partial<User>) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...value } : null,
    })),
  clearAuth: () =>
    set({
      user: null,
      isGuest: false,
      isAuthenticated: false,
      pendingRegistration: null,
    }),
}));
