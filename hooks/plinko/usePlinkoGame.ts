"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { plinkoApi, PLINKO_QUERY_KEYS } from "@/lib/api/plinko.api";
import { QUERY_KEYS } from "@/lib/api/endpoints";
import type {
  PlinkoRisk,
  PlinkoLines,
  PlinkoDropRequest,
  HistoryQueryParams,
} from "@/types/plinko.types";

export function usePlinkoMultipliers(risk: PlinkoRisk, lines: PlinkoLines) {
  return useQuery({
    queryKey: PLINKO_QUERY_KEYS.multipliers(risk, lines),
    queryFn: () => plinkoApi.getMultipliers(risk, lines),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePlinkoHistory(params?: HistoryQueryParams) {
  return useQuery({
    queryKey: PLINKO_QUERY_KEYS.history(params),
    queryFn: () => plinkoApi.getHistory(params),
    staleTime: 0,
  });
}

export function usePlinkoDrop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PlinkoDropRequest) => plinkoApi.drop(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PLINKO_QUERY_KEYS.base,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
      });
    },
  });
}
