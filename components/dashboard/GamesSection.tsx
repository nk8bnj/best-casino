"use client";

import type { Game } from "@/types/dashboard.types";
import { GameCarousel } from "./GameCarousel";
import { GameGrid } from "./GameGrid";

interface GamesSectionProps {
  games: Game[];
}

export function GamesSection({ games }: GamesSectionProps) {
  // Split games into two rows for mobile carousel
  const topRowGames = games.filter(
    (g) => g.tag === "top" || g.tag === "popular"
  );
  const bottomRowGames = games.filter(
    (g) => g.tag === "hot" || g.tag === "new" || !g.tag
  );

  return (
    <section className="py-4">
      {/* Mobile: Carousel */}
      <div className="lg:hidden">
        {/* Top row */}
        <div className="mb-4">
          <GameCarousel games={topRowGames.length > 0 ? topRowGames : games} />
        </div>

        {/* Bottom row */}
        {bottomRowGames.length > 0 && (
          <div>
            <GameCarousel games={bottomRowGames} />
          </div>
        )}
      </div>

      {/* Desktop: Grid */}
      <div className="hidden lg:block">
        <GameGrid games={games} />
      </div>
    </section>
  );
}
