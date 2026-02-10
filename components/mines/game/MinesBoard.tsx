"use client";

import React, { useMemo } from "react";
import { useMinesStore } from "@/store/mines.store";
import { useMinesActions } from "@/hooks/mines";
import { MinesTile, type TileStatus } from "./MinesTile";

export const MinesBoard = React.memo(() => {
  const gameState = useMinesStore((state) => state.gameState);
  const isGameOver = useMinesStore((state) => state.isGameOver);
  const revealedMinePosition = useMinesStore(
    (state) => state.revealedMinePosition
  );
  const cashoutResult = useMinesStore((state) => state.cashoutResult);
  const gridSize = useMinesStore(
    (state) => state.gameState?.gridSize ?? state.gridSize
  );

  const { handleReveal, canReveal, isRevealing } = useMinesActions();

  const totalTiles = gridSize * gridSize;

  const tileStatuses = useMemo(() => {
    const revealedTiles = gameState?.revealedTiles ?? [];
    const minePositions = cashoutResult?.minePositions ?? [];

    const statuses: TileStatus[] = [];
    for (let i = 0; i < totalTiles; i++) {
      if (i === revealedMinePosition) {
        statuses.push("mine");
      } else if (minePositions.includes(i) && (isGameOver || cashoutResult)) {
        statuses.push("mine-revealed");
      } else if (revealedTiles.includes(i)) {
        statuses.push("safe");
      } else {
        statuses.push("hidden");
      }
    }
    return statuses;
  }, [totalTiles, revealedMinePosition, isGameOver, cashoutResult, gameState]);

  const disabled = !canReveal || isRevealing || isGameOver || !!cashoutResult;

  return (
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-6">
      <div
        className="grid gap-1.5 sm:gap-2 w-full max-w-full justify-center"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 100px)`,
        }}
      >
        {tileStatuses.map((status, index) => (
          <MinesTile
            key={index}
            position={index}
            status={status}
            disabled={disabled}
            onClick={handleReveal}
          />
        ))}
      </div>
    </div>
  );
});

MinesBoard.displayName = "MinesBoard";
