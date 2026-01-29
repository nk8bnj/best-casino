"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { crashApi, CRASH_QUERY_KEYS } from "@/lib/api/crash.api";
import { QUERY_KEYS } from "@/lib/api/endpoints";
import {
  CrashGameStatus,
  type CrashBetRequest,
  type CrashCashoutRequest,
  type CrashCurrentGameResponse,
  type HistoryQueryParams,
} from "@/types/crash.types";

export function useCrash(options?: {
  refetchInterval?: number;
  enabled?: boolean;
}) {
  const queryClient = useQueryClient();

  const gameQuery = useQuery<CrashCurrentGameResponse>({
    queryKey: CRASH_QUERY_KEYS.currentGame(),
    queryFn: crashApi.getCurrentGame,
    refetchInterval: options?.refetchInterval,
    enabled: options?.enabled,
    staleTime: 0,
  });

  const placeBetMutation = useMutation({
    mutationFn: (data: CrashBetRequest) => crashApi.placeBet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CRASH_QUERY_KEYS.currentGame(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
      });
    },
  });

  const cashoutMutation = useMutation({
    mutationFn: (data: CrashCashoutRequest) => crashApi.cashout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CRASH_QUERY_KEYS.currentGame(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
      });
    },
  });

  const canPlaceBet =
    !placeBetMutation.isPending &&
    gameQuery.data?.state === CrashGameStatus.WAITING;
  const canCashout =
    !cashoutMutation.isPending &&
    gameQuery.data?.state === CrashGameStatus.RUNNING &&
    !!gameQuery.data?.myBet;
  const hasActiveBet = !!gameQuery.data?.myBet;

  return {
    game: gameQuery.data,
    isLoading: gameQuery.isLoading,
    isError: gameQuery.isError,
    error: gameQuery.error,
    refetch: gameQuery.refetch,

    placeBet: placeBetMutation.mutate,
    isPlacingBet: placeBetMutation.isPending,
    placeBetError: placeBetMutation.error,
    placeBetReset: placeBetMutation.reset,

    cashout: cashoutMutation.mutate,
    isCashingOut: cashoutMutation.isPending,
    cashoutError: cashoutMutation.error,
    cashoutReset: cashoutMutation.reset,

    canPlaceBet,
    canCashout,
    hasActiveBet,
  };
}

export function useBetHistory(params?: HistoryQueryParams) {
  return useQuery({
    queryKey: CRASH_QUERY_KEYS.betHistory(params),
    queryFn: () => crashApi.getBetHistory(params),
    staleTime: 30000,
  });
}

export function useGameHistory(params?: HistoryQueryParams) {
  return useQuery({
    queryKey: CRASH_QUERY_KEYS.gameHistory(params),
    queryFn: () => crashApi.getGameHistory(params),
    staleTime: 30000,
  });
}

export const useCrashGame = useCrash;
