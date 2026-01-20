export type LeaderboardPeriod = "daily" | "weekly" | "monthly" | "all";

export interface LeaderboardPlayerResponse {
  rank: number;
  username: string;
  totalWagered: number;
  gamesPlayed: number;
  winRate: number;
}

export interface LeaderboardResponse {
  players: LeaderboardPlayerResponse[];
  currentUser: LeaderboardPlayerResponse | null;
}
