import { apiClient } from "./client";
import type {
  CasesListResponse,
  CaseDetailResponse,
  CaseOpenRequest,
  CaseOpenResponse,
  CaseHistoryResponse,
  CaseHistoryQueryParams,
} from "@/types/cases.types";

const CASES_BASE_PATH = "/cases";

export const casesApi = {
  getAll: async (): Promise<CasesListResponse> => {
    return apiClient.get<CasesListResponse>(CASES_BASE_PATH, {
      requiresAuth: true,
    });
  },

  getById: async (id: string): Promise<CaseDetailResponse> => {
    return apiClient.get<CaseDetailResponse>(`${CASES_BASE_PATH}/${id}`, {
      requiresAuth: true,
    });
  },

  open: async (
    id: string,
    data?: CaseOpenRequest
  ): Promise<CaseOpenResponse> => {
    return apiClient.post<CaseOpenResponse>(
      `${CASES_BASE_PATH}/${id}/open`,
      data,
      { requiresAuth: true }
    );
  },

  getHistory: async (
    params?: CaseHistoryQueryParams
  ): Promise<CaseHistoryResponse> => {
    const queryParams = new URLSearchParams({
      limit: String(params?.limit || 10),
      offset: String(params?.offset || 0),
    });

    return apiClient.get<CaseHistoryResponse>(
      `${CASES_BASE_PATH}/history?${queryParams}`,
      { requiresAuth: true }
    );
  },
};

// Query keys for React Query
export const CASES_QUERY_KEYS = {
  base: ["cases"] as const,
  list: () => [...CASES_QUERY_KEYS.base, "list"] as const,
  detail: (id: string) => [...CASES_QUERY_KEYS.base, "detail", id] as const,
  history: (params?: CaseHistoryQueryParams) =>
    [...CASES_QUERY_KEYS.base, "history", params] as const,
};
