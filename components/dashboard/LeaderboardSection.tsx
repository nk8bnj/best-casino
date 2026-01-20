"use client";

import Image from "next/image";
import { useLeaderboard } from "@/hooks/api/useLeaderboard";
import { LeaderboardRow } from "./LeaderboardRow";
import { LeaderboardSkeleton } from "./LeaderboardSkeleton";
import { LeaderboardError } from "./LeaderboardError";
import type { LeaderboardPlayer } from "@/types/dashboard.types";

interface LeaderboardSectionProps {
  maxPlayers?: number;
}

export function LeaderboardSection({
  maxPlayers = 100,
}: LeaderboardSectionProps) {
  const { players, currentUser, isLoading, isError, error, refetch } =
    useLeaderboard({ period: "all" });

  // Limit displayed players based on maxPlayers prop
  const displayedPlayers = players.slice(0, maxPlayers);

  // Check if current user is in the visible list
  const currentUserInList = currentUser
    ? displayedPlayers.some((p) => p.username === currentUser.username)
    : false;

  // Map API response to LeaderboardPlayer type
  const mapToLeaderboardPlayer = (
    player: (typeof players)[0]
  ): LeaderboardPlayer => ({
    username: player.username,
    gamesPlayed: player.gamesPlayed,
    totalWagered: player.totalWagered,
    winRate: player.winRate,
    rank: player.rank,
  });

  return (
    <section className="p-4 bg-(--accent-purple-light) rounded-md">
      {/* Header */}
      <div className="relative flex items-center justify-center gap-3 mb-4">
        <Image
          src="/assets/gold-cup.png"
          alt="Trophy"
          width={120}
          height={120}
          className="absolute top-[-3rem] left-[-3rem]"
        />
        <div className="text-center relative z-10">
          <h2 className="text-white font-bold text-2xl">Leaderboard</h2>
          <p className="text-gray-400 text-md">Top players</p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && <LeaderboardSkeleton count={maxPlayers} />}

      {/* Error State */}
      {isError && <LeaderboardError error={error} onRetry={refetch} />}

      {/* Empty State */}
      {!isLoading && !isError && players.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-gray-400">No players found for this period.</p>
        </div>
      )}

      {/* Player list */}
      {!isLoading && !isError && players.length > 0 && (
        <div className="space-y-2">
          {displayedPlayers.map((player) => (
            <LeaderboardRow
              key={`${player.rank}-${player.username}`}
              player={mapToLeaderboardPlayer(player)}
              isCurrentUser={currentUser?.username === player.username}
            />
          ))}

          {/* Show current user separately if not in visible list */}
          {currentUser && !currentUserInList && (
            <>
              <div className="border-t border-gray-600 my-4" />
              <LeaderboardRow
                player={mapToLeaderboardPlayer(currentUser)}
                isCurrentUser
              />
            </>
          )}
        </div>
      )}
    </section>
  );
}
