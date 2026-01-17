"use client";

import Image from "next/image";
import type { LeaderboardPlayer } from "@/types/dashboard.types";
import { LeaderboardRow } from "./LeaderboardRow";

interface LeaderboardSectionProps {
  players: LeaderboardPlayer[];
  currentUserId?: string;
}

export function LeaderboardSection({
  players,
  currentUserId,
}: LeaderboardSectionProps) {
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

      {/* Player list */}
      <div className="space-y-2">
        {players.map((player) => (
          <LeaderboardRow
            key={player.id}
            player={player}
            isCurrentUser={player.id === currentUserId}
          />
        ))}
      </div>
    </section>
  );
}
