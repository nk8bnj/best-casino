"use client";

import type { Game } from "@/types/dashboard.types";
import { GameGrid } from "./GameGrid";

interface GamesSectionProps {
  games: Game[];
}

export function GamesSection({ games }: GamesSectionProps) {
  return (
    <section className="py-4">
      {/* Mobile & Desktop: Grid */}
      <GameGrid games={games} />
    </section>
  );
}
