"use client";

import type { Game } from "@/types/dashboard.types";
import { GameCard } from "./GameCard";

interface GameGridProps {
  games: Game[];
}

export function GameGrid({ games }: GameGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-[400px] md:max-w-none mx-auto md:gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
