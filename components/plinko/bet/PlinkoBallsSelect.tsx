"use client";

import React from "react";
import { usePlinkoStore } from "@/store/plinko.store";
import type { PlinkoBalls } from "@/types/plinko.types";

const BALLS_OPTIONS: PlinkoBalls[] = [1, 2, 5, 10];

export const PlinkoBallsSelect = React.memo(() => {
  const balls = usePlinkoStore((state) => state.balls);
  const setBalls = usePlinkoStore((state) => state.setBalls);
  const isDropping = usePlinkoStore((state) => state.isDropping);
  const betAmount = usePlinkoStore((state) => state.betAmount);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm text-text-secondary">Balls</label>
        <span className="text-xs text-text-muted">
          Total: ${(betAmount * balls).toFixed(2)}
        </span>
      </div>
      <div className="flex gap-2">
        {BALLS_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => setBalls(option)}
            disabled={isDropping}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              balls === option
                ? "bg-primary text-white"
                : "bg-white/10 text-text-secondary hover:bg-white/20"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
});

PlinkoBallsSelect.displayName = "PlinkoBallsSelect";
