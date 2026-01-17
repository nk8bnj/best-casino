"use client";

import type { Game } from "@/types/dashboard.types";
import { GameCard } from "./GameCard";

interface GameCarouselProps {
  games: Game[];
}

export function GameCarousel({ games }: GameCarouselProps) {
  return (
    <div className="overflow-x-auto carousel-snap scrollbar-hide -mx-4 px-4">
      <div className="flex gap-4 pb-4">
        {games.map((game) => (
          <div key={game.id} className="carousel-item">
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}
