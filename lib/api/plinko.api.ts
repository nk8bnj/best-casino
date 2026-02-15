import { apiClient } from "./client";
import type {
  PlinkoDropRequest,
  PlinkoDropResponse,
  PlinkoMultipliersResponse,
  PlinkoHistoryResponse,
  PlinkoRisk,
  PlinkoLines,
  HistoryQueryParams,
} from "@/types/plinko.types";

const PLINKO_BASE_PATH = "/plinko";

export const plinkoApi = {
  drop: async (data: PlinkoDropRequest): Promise<PlinkoDropResponse> => {
    return apiClient.post<PlinkoDropResponse>(
      `${PLINKO_BASE_PATH}/drop`,
      data,
      { requiresAuth: true }
    );
  },

  getMultipliers: async (
    risk: PlinkoRisk,
    lines: PlinkoLines
  ): Promise<PlinkoMultipliersResponse> => {
    const queryParams = new URLSearchParams({
      risk,
      lines: String(lines),
    });
    return apiClient.get<PlinkoMultipliersResponse>(
      `${PLINKO_BASE_PATH}/multipliers?${queryParams}`,
      { requiresAuth: true }
    );
  },

  getHistory: async (
    params?: HistoryQueryParams
  ): Promise<PlinkoHistoryResponse> => {
    const queryParams = new URLSearchParams({
      limit: String(params?.limit || 10),
      offset: String(params?.offset || 0),
    });
    return apiClient.get<PlinkoHistoryResponse>(
      `${PLINKO_BASE_PATH}/history?${queryParams}`,
      { requiresAuth: true }
    );
  },
};

export const PLINKO_QUERY_KEYS = {
  base: ["plinko"] as const,
  multipliers: (risk: PlinkoRisk, lines: PlinkoLines) =>
    [...PLINKO_QUERY_KEYS.base, "multipliers", risk, lines] as const,
  history: (params?: HistoryQueryParams) =>
    [...PLINKO_QUERY_KEYS.base, "history", params] as const,
};
