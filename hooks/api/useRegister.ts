import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import type { RegisterRequest, AuthResponse } from "@/types/auth.types";
import { handleApiError, getErrorMessage } from "@/lib/utils/errors";
import { ROUTES } from "@/config/routes";
import { QUERY_KEYS } from "@/lib/api/endpoints";
import { tokenStorageService } from "@/lib/utils/token";

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: authApi.register,

    onSuccess: (data) => {
      // Construct user object from flat response
      const user = {
        id: data.userId,
        username: data.userName,
      };

      // 1. Store token
      tokenStorageService.set(data.accessToken);

      // 2. Update auth store
      setUser(user);

      // 3. Prefetch or set current user query data
      queryClient.setQueryData(QUERY_KEYS.AUTH.CURRENT_USER, { user });

      // 4. Navigate to dashboard
      router.push(ROUTES.DASHBOARD);
    },

    onError: (error) => {
      const apiError = handleApiError(error);
      // Error message will be displayed by the form component
      console.error("Registration failed:", getErrorMessage(apiError));
    },
  });
};
