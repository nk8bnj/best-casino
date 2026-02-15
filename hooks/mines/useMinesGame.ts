"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { minesApi, MINES_QUERY_KEYS } from "@/lib/api/mines.api";
import { QUERY_KEYS } from "@/lib/api/endpoints";
import type {
  MinesStartRequest,
  MinesRevealRequest,
  MinesCashoutRequest,
  MinesHistoryQueryParams,
} from "@/types/mines.types";

export function useMinesActive() {
  return useQuery({
    queryKey: MINES_QUERY_KEYS.active(),
    queryFn: minesApi.getActive,
    staleTime: 0,
    retry: 1,
  });
}

export function useMinesStart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MinesStartRequest) => minesApi.start(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MINES_QUERY_KEYS.active(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
      });
    },
  });
}

export function useMinesReveal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MinesRevealRequest) => minesApi.reveal(data),
    onSuccess: (result) => {
      if (result.isMine) {
        queryClient.invalidateQueries({
          queryKey: MINES_QUERY_KEYS.active(),
        });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
        });
        queryClient.invalidateQueries({
          queryKey: MINES_QUERY_KEYS.historyBase(),
        });
      }
    },
  });
}

export function useMinesCashout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MinesCashoutRequest) => minesApi.cashout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MINES_QUERY_KEYS.active(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
      });
      queryClient.invalidateQueries({
        queryKey: MINES_QUERY_KEYS.historyBase(),
      });
    },
  });
}

export function useMinesHistory(params?: MinesHistoryQueryParams) {
  return useQuery({
    queryKey: MINES_QUERY_KEYS.history(params),
    queryFn: () => minesApi.getHistory(params),
    staleTime: 0,
  });
}
