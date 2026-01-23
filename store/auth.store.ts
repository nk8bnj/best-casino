import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types/auth.types";
import { tokenStorageService } from "@/lib/utils/token";

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  logout: () => void;
  setHydrated: (hydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        isHydrated: false,

        // Set user and update auth status
        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
            isHydrated: true,
          }),

        // Logout: clear user and token
        logout: () => {
          tokenStorageService.remove();
          set({
            user: null,
            isAuthenticated: false,
          });
        },

        // Set hydrated flag
        setHydrated: (hydrated) => set({ isHydrated: hydrated }),
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      }
    ),
    { name: "AuthStore" }
  )
);
