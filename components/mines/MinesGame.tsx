"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useMinesStore } from "@/store/mines.store";
import { useMinesActive } from "@/hooks/mines";
import { MinesBoard } from "./game";
import { MinesConfig } from "./config";
import { MinesHistory } from "./history";
import { MinesGameStatus } from "@/types/mines.types";
import { ROUTES } from "@/config/routes";

export const MinesGame = () => {
  const setGameState = useMinesStore((state) => state.setGameState);
  const setMinesCount = useMinesStore((state) => state.setMinesCount);
  const setGridSize = useMinesStore((state) => state.setGridSize);
  const { data: activeGame, isLoading } = useMinesActive();

  // Restore active game on mount
  useEffect(() => {
    if (activeGame?.gameId) {
      setGameState({
        ...activeGame,
        status: activeGame.status ?? MinesGameStatus.ACTIVE,
      });
      setMinesCount(activeGame.minesCount);
      setGridSize(activeGame.gridSize);
    }
  }, [activeGame, setGameState, setMinesCount, setGridSize]);

  return (
    <section className="w-full h-full">
      <div className="px-4 xl:px-8 pt-4">
        <Link
          href={ROUTES.DASHBOARD}
          className="inline-flex items-center gap-2 text-accent-yellow hover:text-accent-yellow/90 transition-colors font-medium"
        >
          <span aria-hidden>←</span>
          All games
        </Link>
      </div>
      <div className="flex flex-col xl:flex-row gap-6 mt-10 px-4 xl:px-8">
        {/* Game Board */}
        <div className="w-full xl:w-[66%] aspect-square xl:aspect-5/3 rounded-2xl bg-[#423E6980] overflow-hidden flex justify-center items-center">
          {isLoading ? (
            <div className="flex flex-col text-center">
              <p className="text-2xl text-text-secondary mt-2">
                Loading game...
              </p>
              <div className="mt-4 animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            </div>
          ) : (
            <MinesBoard />
          )}
        </div>

        {/* Config Panel */}
        <MinesConfig />
      </div>

      {/* Game History */}
      <div className="px-4 xl:px-8">
        <MinesHistory />
      </div>
    </section>
  );
};
