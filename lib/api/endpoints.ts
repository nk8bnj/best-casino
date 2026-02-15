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
  MINES: {
    START: "/mines/start",
    REVEAL: "/mines/reveal",
    CASHOUT: "/mines/cashout",
    ACTIVE: "/mines/active",
    HISTORY: "/mines/history",
  },
  CASES: {
    LIST: "/cases",
    DETAIL: (id: string) => `/cases/${id}`,
    OPEN: (id: string) => `/cases/${id}/open`,
    HISTORY: "/cases/history",
  },
  PLINKO: {
    DROP: "/plinko/drop",
    MULTIPLIERS: "/plinko/multipliers",
    HISTORY: "/plinko/history",
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
  MINES: {
    base: ["mines"] as const,
    active: () => ["mines", "active"] as const,
    history: (params?: { limit?: number; offset?: number }) =>
      ["mines", "history", params] as const,
  },
  CASES: {
    list: () => ["cases", "list"] as const,
    detail: (id: string) => ["cases", "detail", id] as const,
    history: (params?: { limit?: number; offset?: number }) =>
      ["cases", "history", params] as const,
  },
  PLINKO: {
    base: ["plinko"] as const,
    multipliers: (risk: string, lines: number) =>
      ["plinko", "multipliers", risk, lines] as const,
    history: (params?: { limit?: number; offset?: number }) =>
      ["plinko", "history", params] as const,
  },
} as const;
