"use client";

import type { ChatStats } from "@/types/dashboard.types";

interface ChatStatsBarProps {
  stats: ChatStats;
}

export function ChatStatsBar({ stats }: ChatStatsBarProps) {
  return (
    <div className="flex items-center justify-center gap-6 py-3 text-[15px]">
      <div className="flex items-center gap-1">
        <span className="text-white font-semibold">{stats.online}</span>
        <span className="text-white/70">online</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[#f4b14a] font-semibold">{stats.friends}</span>
        <span className="text-[#f4b14a]">friends</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-white font-semibold">{stats.playing}</span>
        <span className="text-white/70">playing</span>
      </div>
    </div>
  );
}
