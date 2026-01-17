"use client";

import Image from "next/image";
import type { Game } from "@/types/dashboard.types";
import { GameTag } from "./GameTag";

interface GameGridProps {
  games: Game[];
}

const getGameBackground = (gameId: string): string => {
  const imageMap: Record<string, string> = {
    "1": "/assets/game-1.png",
    "2": "/assets/game-2.png",
    "3": "/assets/game-3.png",
    "4": "/assets/game-4.png",
  };
  return imageMap[gameId] || "/assets/game-1.png";
};

export function GameGrid({ games }: GameGridProps) {
  return (
    <div className="grid grid-cols-2 gap-[24px]">
      {games.map((game) => {
        const backgroundImage = getGameBackground(game.id);
        return (
          <div
            key={game.id}
            className="relative rounded-[24px] overflow-hidden bg-gradient-to-b from-[#2a2555] to-[#1a1a2e] shadow-lg aspect-[4/5]"
          >
            {/* Tag */}
            {game.tag && (
              <div className="absolute top-4 left-4 z-10">
                <GameTag tag={game.tag} />
              </div>
            )}

            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={backgroundImage}
                alt={game.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 py-5 px-10 text-center">
              <h3 className="text-white font-black text-[32px] mb-2">
                {game.name}
              </h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {game.description}
              </p>
              <button className="bg-gradient-primary text-white text-md font-semibold py-3 px-12 rounded-full hover:shadow-glow-primary transition-all">
                Free play
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
