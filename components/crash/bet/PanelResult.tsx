"use client";

import React from "react";
import { useCrashStore } from "@/store/crash.store";
import { CrashGameStatus } from "@/types/crash.types";

const PanelResultContent = React.memo(() => {
  const multiplier = useCrashStore((state) => state.gameState?.multiplier ?? 0);
  const betAmount = useCrashStore((state) => state.betAmount);
  const lastCashout = useCrashStore((state) => state.lastCashout);

  const displayMultiplier = lastCashout ? lastCashout.multiplier : multiplier;
  const displayWinAmount = lastCashout
    ? lastCashout.winAmount
    : betAmount * multiplier;

  return (
    <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
      <div className="flex justify-between items-center">
        <span className="text-text-secondary text-sm">Current Multiplier:</span>
        <span className="text-success font-bold text-lg">
          {displayMultiplier.toFixed(2)}×
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-text-secondary text-sm">Potential Win:</span>
        <span className="text-success font-bold text-lg">
          ${Number(displayWinAmount).toFixed(2)}
        </span>
      </div>
    </div>
  );
});
PanelResultContent.displayName = "PanelResultContent";

export const PanelResult = React.memo(() => {
  const showResult = useCrashStore(
    (state) =>
      state.gameState?.state === CrashGameStatus.RUNNING ||
      state.gameState?.state === CrashGameStatus.CRASHED
  );

  if (!showResult) {
    return null;
  }

  return <PanelResultContent />;
});

PanelResult.displayName = "PanelResult";
