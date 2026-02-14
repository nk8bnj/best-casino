"use client";

import React from "react";
import { usePlinkoStore } from "@/store/plinko.store";

export const PlinkoResult = React.memo(() => {
  const lastResult = usePlinkoStore((state) => state.lastResult);

  if (!lastResult) return null;

  const avgMultiplier =
    lastResult.drops.reduce((sum, d) => sum + d.multiplier, 0) /
    lastResult.drops.length;

  return (
    <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
      <div className="flex justify-between items-center">
        <span className="text-text-secondary text-sm">Avg Multiplier:</span>
        <span className="text-success font-bold text-lg">
          {avgMultiplier.toFixed(2)}×
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-text-secondary text-sm">Total Bet:</span>
        <span className="text-accent-yellow font-bold text-lg">
          ${lastResult.totalBet.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-text-secondary text-sm">Total Win:</span>
        <span
          className={`font-bold text-lg ${
            lastResult.totalWin >= lastResult.totalBet
              ? "text-success"
              : "text-error"
          }`}
        >
          ${lastResult.totalWin.toFixed(2)}
        </span>
      </div>
    </div>
  );
});

PlinkoResult.displayName = "PlinkoResult";
