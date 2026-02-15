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
  MinesHistoryGame,
  MinesHistoryQueryParams,
} from "@/types/mines.types";

const MINES_BASE_PATH = "/mines";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeHistoryGame(raw: any): MinesHistoryGame {
  return {
    gameId: raw.gameId ?? raw.game_id ?? "",
    amount: raw.betAmount ?? raw.bet_amount ?? raw.amount ?? 0,
    minesCount: raw.minesCount ?? raw.mines_count ?? 0,
    gridSize: raw.gridSize ?? raw.grid_size ?? 0,
    multiplier:
      raw.multiplier ?? raw.cashoutMultiplier ?? raw.cashout_multiplier ?? 0,
    winAmount: raw.winAmount ?? raw.win_amount ?? 0,
    status: raw.status ?? "lost",
    createdAt: raw.createdAt ?? raw.created_at ?? "",
  };
}

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
      const raw = await apiClient.get<{ games: unknown[] }>(
        `${MINES_BASE_PATH}/history?${queryParams}`,
        { requiresAuth: true }
      );
      return {
        games: (raw.games || []).map(normalizeHistoryGame),
      };
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
  historyBase: () => [...MINES_QUERY_KEYS.base, "history"] as const,
  history: (params?: MinesHistoryQueryParams) =>
    [...MINES_QUERY_KEYS.base, "history", params] as const,
};
