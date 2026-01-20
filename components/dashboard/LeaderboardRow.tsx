"use client";

import Image from "next/image";
import type { LeaderboardPlayer } from "@/types/dashboard.types";
import { CoinIcon } from "@/components/icons";

interface LeaderboardRowProps {
  player: LeaderboardPlayer;
  isCurrentUser?: boolean;
}

function formatWagered(amount: number): string {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(1)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

export function LeaderboardRow({
  player,
  isCurrentUser = false,
}: LeaderboardRowProps) {
  const placeImages = {
    1: "/assets/place-1.png",
    2: "/assets/place-2.png",
    3: "/assets/place-3.png",
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 mb-4 rounded-sm transition-colors shadow-blue ${
        isCurrentUser ? "bg-[#2E2745] border-gold" : "bg-[#2E2745]"
      }`}
    >
      {/* Rank */}
      <div className="flex-shrink-0 flex items-center justify-center">
        {player.rank <= 3 ? (
          <Image
            src={placeImages[player.rank as keyof typeof placeImages]}
            alt={`${player.rank} place`}
            width={28}
            height={28}
            className="w-7 h-7"
          />
        ) : (
          <span className="text-white font-bold text-xl">{player.rank}</span>
        )}
      </div>

      {/* Name and games */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-bold text-sm">
          {player.username}
          {isCurrentUser && (
            <span className="text-gray-400 font-normal ml-1">(you)</span>
          )}
        </p>
        <p className="text-gray-400 text-xs">{player.gamesPlayed} games</p>
      </div>

      {/* Stats */}
      <div className="flex flex-col items-end gap-1">
        {/* Total Wagered */}
        <div className="flex items-center gap-1">
          <CoinIcon className="w-4 h-4" />
          <span className="text-white font-bold text-sm">
            {formatWagered(player.totalWagered)}
          </span>
        </div>

        {/* Win rate */}
        <span className="text-green-500 text-xs font-medium">
          {player.winRate.toFixed(2)}% win
        </span>
      </div>
    </div>
  );
}
