"use client";

import React, { useCallback } from "react";
import { useCrashStore } from "@/store/crash.store";
import { useCrashActions } from "@/hooks/crash";

export const PanelButtons = React.memo(() => {
  const hasBet = useCrashStore((state) => !!state.gameState?.myBet?.betId);

  const { handlePlaceBet, handleCashout, isPlacingBet, isCashingOut } =
    useCrashActions();

  const onPlaceBet = useCallback(() => {
    const { betAmount, autoCashoutEnabled, autoCashoutValue } =
      useCrashStore.getState();
    const autoCashout = autoCashoutEnabled ? autoCashoutValue : undefined;
    handlePlaceBet(betAmount, autoCashout);
  }, [handlePlaceBet]);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={onPlaceBet}
        disabled={hasBet || isPlacingBet}
        className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-primary hover:shadow-glow-primary disabled:bg-gradient-primary-disabled disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center gap-2"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 6v12M8 10l4-4 4 4M8 14l4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {isPlacingBet ? "Placing Bet..." : "Place Bet"}
      </button>

      <button
        onClick={handleCashout}
        disabled={!hasBet || isCashingOut}
        className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-secondary hover:shadow-glow-secondary disabled:bg-gradient-secondary-disabled disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center gap-2 text-background-dark"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="6"
            width="20"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M6 12h12" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
        {isCashingOut ? "Cashing Out..." : "Cashout"}
      </button>
    </div>
  );
});

PanelButtons.displayName = "PanelButtons";
