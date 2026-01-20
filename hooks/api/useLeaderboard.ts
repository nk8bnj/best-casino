import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { leaderboardApi } from "@/lib/api/leaderboard.api";
import { useAuthStore } from "@/store/auth.store";
import { QUERY_KEYS } from "@/lib/api/endpoints";
import { ApiException } from "@/lib/utils/errors";
import type {
  LeaderboardPeriod,
  LeaderboardResponse,
} from "@/types/leaderboard.types";

interface UseLeaderboardOptions {
  period?: LeaderboardPeriod;
}

export const useLeaderboard = ({
  period = "all",
}: UseLeaderboardOptions = {}) => {
  const { isHydrated, logout } = useAuthStore();

  const query = useQuery<LeaderboardResponse>({
    queryKey: QUERY_KEYS.LEADERBOARD.list(period),
    queryFn: () => leaderboardApi.getLeaderboard(period),
    enabled: isHydrated,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: false,
  });

  // Handle 401 error - logout user
  useEffect(() => {
    if (query.error instanceof ApiException && query.error.statusCode === 401) {
      logout();
    }
  }, [query.error, logout]);

  // Show loading state if auth hasn't been hydrated yet or if query is loading
  const isLoading = !isHydrated || query.isLoading || query.isFetching;

  return {
    players: query.data?.players ?? [],
    currentUser: query.data?.currentUser ?? null,
    isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
