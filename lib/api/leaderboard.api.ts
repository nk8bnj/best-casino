import { apiClient } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type {
  LeaderboardPeriod,
  LeaderboardResponse,
} from "@/types/leaderboard.types";

class LeaderboardApi {
  async getLeaderboard(
    period: LeaderboardPeriod = "all"
  ): Promise<LeaderboardResponse> {
    return apiClient.get<LeaderboardResponse>(
      `${API_ENDPOINTS.LEADERBOARD}?period=${period}`,
      {
        requiresAuth: true,
      }
    );
  }
}

export const leaderboardApi = new LeaderboardApi();
