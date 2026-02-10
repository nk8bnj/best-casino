import { apiClient } from "./client";
import { ApiException } from "@/lib/utils/errors";
import type {
  MinesStartRequest,
  MinesStartResponse,
  MinesRevealRequest,
  MinesRevealResponse,
  MinesCashoutRequest,
  MinesCashoutResponse,
  MinesActiveGame,
  MinesHistoryResponse,
  MinesHistoryQueryParams,
} from "@/types/mines.types";

const MINES_BASE_PATH = "/mines";

export const minesApi = {
  start: async (data: MinesStartRequest): Promise<MinesStartResponse> => {
    return apiClient.post<MinesStartResponse>(
      `${MINES_BASE_PATH}/start`,
      data,
      { requiresAuth: true }
    );
  },

  reveal: async (data: MinesRevealRequest): Promise<MinesRevealResponse> => {
    return apiClient.post<MinesRevealResponse>(
      `${MINES_BASE_PATH}/reveal`,
      data,
      { requiresAuth: true }
    );
  },

  cashout: async (data: MinesCashoutRequest): Promise<MinesCashoutResponse> => {
    return apiClient.post<MinesCashoutResponse>(
      `${MINES_BASE_PATH}/cashout`,
      data,
      { requiresAuth: true }
    );
  },

  getActive: async (): Promise<MinesActiveGame | null> => {
    try {
      return await apiClient.get<MinesActiveGame>(`${MINES_BASE_PATH}/active`, {
        requiresAuth: true,
      });
    } catch (error: unknown) {
      if (
        error instanceof ApiException &&
        (error.statusCode === 404 || error.statusCode === 400)
      ) {
        return null;
      }
      if (error instanceof Error && error.message?.includes("404")) {
        return null;
      }
      throw error;
    }
  },

  getHistory: async (
    params?: MinesHistoryQueryParams
  ): Promise<MinesHistoryResponse> => {
    const queryParams = new URLSearchParams({
      limit: String(params?.limit || 10),
      offset: String(params?.offset || 0),
    });

    try {
      return await apiClient.get<MinesHistoryResponse>(
        `${MINES_BASE_PATH}/history?${queryParams}`,
        { requiresAuth: true }
      );
    } catch (error: unknown) {
      if (
        error instanceof ApiException &&
        (error.statusCode === 404 || error.statusCode === 400)
      ) {
        return { games: [] };
      }
      if (error instanceof Error && error.message?.includes("404")) {
        return { games: [] };
      }
      throw error;
    }
  },
};

export const MINES_QUERY_KEYS = {
  base: ["mines"] as const,
  active: () => [...MINES_QUERY_KEYS.base, "active"] as const,
  history: (params?: MinesHistoryQueryParams) =>
    [...MINES_QUERY_KEYS.base, "history", params] as const,
};
