"use client";

import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { casesApi, CASES_QUERY_KEYS } from "@/lib/api/cases.api";
import { QUERY_KEYS } from "@/lib/api/endpoints";
import type {
  CaseOpenRequest,
  CaseHistoryQueryParams,
} from "@/types/cases.types";

export function useCasesList() {
  return useQuery({
    queryKey: CASES_QUERY_KEYS.list(),
    queryFn: casesApi.getAll,
    staleTime: 60000,
  });
}

export function useCaseDetail(id: string) {
  return useQuery({
    queryKey: CASES_QUERY_KEYS.detail(id),
    queryFn: () => casesApi.getById(id),
    enabled: !!id,
    staleTime: 60000,
  });
}

export function useCaseOpen(caseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CaseOpenRequest | void) =>
      casesApi.open(caseId, data || undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
      });
    },
  });
}

export function useInvalidateCaseHistory() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [...CASES_QUERY_KEYS.base, "history"],
    });
  }, [queryClient]);
}

export function useCaseHistory(params?: CaseHistoryQueryParams) {
  return useQuery({
    queryKey: CASES_QUERY_KEYS.history(params),
    queryFn: () => casesApi.getHistory(params),
    staleTime: 30000,
  });
}
