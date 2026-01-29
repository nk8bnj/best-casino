import { apiClient } from "./client";
import type {
  CrashBetRequest,
  CrashBetResponse,
  CrashCashoutRequest,
  CrashCashoutResponse,
  CrashCurrentGameResponse,
  CrashGameHistoryResponse,
  CrashBetHistoryResponse,
  HistoryQueryParams,
} from "@/types/crash.types";

const CRASH_BASE_PATH = "/crash";

export const crashApi = {
  placeBet: async (data: CrashBetRequest): Promise<CrashBetResponse> => {
    return apiClient.post<CrashBetResponse>(`${CRASH_BASE_PATH}/bet`, data, {
      requiresAuth: true,
    });
  },

  cashout: async (data: CrashCashoutRequest): Promise<CrashCashoutResponse> => {
    return apiClient.post<CrashCashoutResponse>(
      `${CRASH_BASE_PATH}/cashout`,
      data,
      { requiresAuth: true }
    );
  },

  getCurrentGame: async (): Promise<CrashCurrentGameResponse> => {
    return apiClient.get<CrashCurrentGameResponse>(
      `${CRASH_BASE_PATH}/current`,
      { requiresAuth: true }
    );
  },

  getGameHistory: async (
    params?: HistoryQueryParams
  ): Promise<CrashGameHistoryResponse> => {
    const queryParams = new URLSearchParams({
      limit: String(params?.limit || 10),
      offset: String(params?.offset || 0),
    });

    return apiClient.get<CrashGameHistoryResponse>(
      `${CRASH_BASE_PATH}/history?${queryParams}`,
      { requiresAuth: true }
    );
  },

  getBetHistory: async (
    params?: HistoryQueryParams
  ): Promise<CrashBetHistoryResponse> => {
    const queryParams = new URLSearchParams({
      limit: String(params?.limit || 10),
      offset: String(params?.offset || 0),
    });

    try {
      return await apiClient.get<CrashBetHistoryResponse>(
        `${CRASH_BASE_PATH}/bets/history?${queryParams}`,
        { requiresAuth: true }
      );
    } catch (error: unknown) {
      if (error instanceof Error && error.message?.includes("404")) {
        return { bets: [] };
      }
      throw error;
    }
  },
};

// Query keys for React Query
export const CRASH_QUERY_KEYS = {
  base: ["crash"] as const,
  currentGame: () => [...CRASH_QUERY_KEYS.base, "current"] as const,
  gameHistory: (params?: HistoryQueryParams) =>
    [...CRASH_QUERY_KEYS.base, "game-history", params] as const,
  betHistory: (params?: HistoryQueryParams) =>
    [...CRASH_QUERY_KEYS.base, "bet-history", params] as const,
};
