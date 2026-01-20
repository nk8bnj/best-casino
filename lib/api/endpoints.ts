export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    CURRENT_USER: "/auth/me",
  },
  LEADERBOARD: "/leaderboard",
} as const;

// Query keys for TanStack Query
export const QUERY_KEYS = {
  AUTH: {
    CURRENT_USER: ["auth", "currentUser"] as const,
  },
  LEADERBOARD: {
    list: (period: string) => ["leaderboard", period] as const,
  },
} as const;
