import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { authApi } from "@/lib/api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { QUERY_KEYS } from "@/lib/api/endpoints";
import { tokenStorageService } from "@/lib/utils/token";
import type { CurrentUserResponse } from "@/types/auth.types";

export const useCurrentUser = () => {
  const { isAuthenticated, setUser, logout } = useAuthStore();

  const query = useQuery<CurrentUserResponse>({
    queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
    queryFn: authApi.getCurrentUser,
    enabled: isAuthenticated && !!tokenStorageService.get(), // Only fetch if authenticated and has token
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry if 401
  });

  // Handle success and error in useEffect
  useEffect(() => {
    // Guard: only update if data matches BackendUser shape (has userId)
    if (query.data && query.data.userId) {
      // Map BackendUser to User
      setUser({
        id: query.data.userId,
        username: query.data.username,
        balance: query.data.balance,
      });
    }
  }, [query.data, setUser]);

  useEffect(() => {
    if (query.error) {
      // Token is invalid or expired
      logout();
    }
  }, [query.error, logout]);

  return query;
};
