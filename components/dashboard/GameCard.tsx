"use client";

import Image from "next/image";
import type { Game } from "@/types/dashboard.types";
import { GameTag } from "./GameTag";

interface GameCardProps {
  game: Game;
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

export function GameCard({ game }: GameCardProps) {
  const backgroundImage = getGameBackground(game.id);

  return (
    <div className="relative w-full shrink-0 rounded-2xl overflow-hidden bg-linear-to-b from-[#2a2555] to-[#1a1a2e] shadow-lg h-full">
      {/* Tag */}
      {game.tag && (
        <div className="absolute top-3 left-3 z-10">
          <GameTag tag={game.tag} />
        </div>
      )}

      {/* Background Image */}
      <div className="aspect-4/5 relative overflow-hidden h-full">
        <Image
          src={backgroundImage}
          alt={game.name}
          fill
          className="object-cover"
          sizes="160px"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-bold text-base mb-1 md:text-[32px]">
            {game.name}
          </h3>
          <p className="text-gray-300 text-xs line-clamp-2 mb-3">
            {game.description}
          </p>
          <button className="w-full bg-gradient-primary text-white text-sm font-semibold py-2 px-4 rounded-full hover:shadow-glow-primary transition-all">
            Free play
          </button>
        </div>
      </div>
    </div>
  );
}
