import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { authApi } from "@/lib/api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { QUERY_KEYS } from "@/lib/api/endpoints";
import type { CurrentUserResponse } from "@/types/auth.types";

export const useCurrentUser = () => {
  const { isAuthenticated, setUser, logout } = useAuthStore();

  const query = useQuery<CurrentUserResponse>({
    queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
    queryFn: authApi.getCurrentUser,
    enabled: isAuthenticated, // Only fetch if authenticated
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry if 401
  });

  // Handle success and error in useEffect
  useEffect(() => {
    if (query.data) {
      setUser(query.data.user);
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
