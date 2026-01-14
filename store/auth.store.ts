import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "@/types/auth.types";
import { tokenStorageService } from "@/lib/utils/token";

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  logout: () => void;
  hydrateAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,

      // Set user and update auth status
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      // Logout: clear user and token
      logout: () => {
        tokenStorageService.remove();
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      // Hydrate auth state on app load
      hydrateAuth: () => {
        const token = tokenStorageService.get();
        if (token) {
          // Token exists, but we need to fetch user data
          // This will be handled by useCurrentUser hook
          set({ isAuthenticated: true });
        }
      },
    }),
    { name: "AuthStore" }
  )
);
