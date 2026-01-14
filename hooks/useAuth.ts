import { useAuthStore } from "@/store/auth.store";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, logout: logoutStore } = useAuthStore();

  const logout = () => {
    // 1. Clear auth store
    logoutStore();

    // 2. Clear all queries
    queryClient.clear();

    // 3. Navigate to login
    router.push(ROUTES.LOGIN);
  };

  return {
    user,
    isAuthenticated,
    logout,
  };
};
