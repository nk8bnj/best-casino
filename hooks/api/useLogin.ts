import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import type { LoginRequest, AuthResponse } from "@/types/auth.types";
import { handleApiError, getErrorMessage } from "@/lib/utils/errors";
import { ROUTES } from "@/config/routes";
import { QUERY_KEYS } from "@/lib/api/endpoints";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUser, setToken } = useAuthStore();

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: authApi.login,

    onSuccess: (data) => {
      // 1. Store token
      setToken(data.accessToken);

      // 2. Update auth store
      setUser(data.user);

      // 3. Prefetch or set current user query data
      queryClient.setQueryData(QUERY_KEYS.AUTH.CURRENT_USER, {
        user: data.user,
      });

      // 4. Navigate to dashboard - using replace to prevent back navigation to login
      router.replace(ROUTES.DASHBOARD);
    },

    onError: (error) => {
      const apiError = handleApiError(error);
      // Error message will be displayed by the form component
      console.error("Login failed:", getErrorMessage(apiError));
    },
  });
};
