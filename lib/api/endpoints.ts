export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    CURRENT_USER: "/users/current",
  },
  LEADERBOARD: "/leaderboard",
  CRASH: {
    CURRENT: "/crash/current",
    BET: "/crash/bet",
    CASHOUT: "/crash/cashout",
    HISTORY: "/crash/history",
    BET_HISTORY: "/crash/bets/history",
  },
} as const;

// Query keys for TanStack Query
export const QUERY_KEYS = {
  AUTH: {
    CURRENT_USER: ["auth", "currentUser"] as const,
  },
  LEADERBOARD: {
    list: (period: string) => ["leaderboard", period] as const,
  },
  CRASH: {
    base: ["crash"] as const,
    currentGame: () => ["crash", "current"] as const,
    gameHistory: (params?: { limit?: number; offset?: number }) =>
      ["crash", "game-history", params] as const,
    betHistory: (params?: { limit?: number; offset?: number }) =>
      ["crash", "bet-history", params] as const,
  },
} as const;
