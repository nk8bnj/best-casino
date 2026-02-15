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
  const minePositions = useMinesStore((state) => state.minePositions);
  const gridSize = useMinesStore(
    (state) => state.gameState?.gridSize ?? state.gridSize
  );

  const { handleReveal, canReveal, isRevealing } = useMinesActions();

  const totalTiles = gridSize * gridSize;

  const tileStatuses = useMemo(() => {
    const revealedTiles = gameState?.revealedTiles ?? [];
    const allMinePositions =
      minePositions.length > 0
        ? minePositions
        : (cashoutResult?.minePositions ?? []);

    const statuses: TileStatus[] = [];
    for (let i = 0; i < totalTiles; i++) {
      if (i === revealedMinePosition) {
        statuses.push("mine");
      } else if (
        allMinePositions.includes(i) &&
        (isGameOver || cashoutResult)
      ) {
        statuses.push("mine-revealed");
      } else if (revealedTiles.includes(i)) {
        statuses.push("safe");
      } else if (isGameOver || cashoutResult) {
        statuses.push("safe");
      } else {
        statuses.push("hidden");
      }
    }
    return statuses;
  }, [
    totalTiles,
    revealedMinePosition,
    isGameOver,
    cashoutResult,
    gameState,
    minePositions,
  ]);

  const disabled = !canReveal || isRevealing || isGameOver || !!cashoutResult;

  return (
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-6">
      <div
        className="grid gap-2 md:gap-4 w-full max-w-full justify-center [--tile-size:40px] md:[--tile-size:100px]"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, var(--tile-size))`,
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
