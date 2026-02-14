"use client";

import React from "react";
import { usePlinkoStore } from "@/store/plinko.store";
import type { PlinkoRisk } from "@/types/plinko.types";

const RISK_OPTIONS: PlinkoRisk[] = ["low", "medium", "high"];

export const PlinkoRiskSelect = React.memo(() => {
  const risk = usePlinkoStore((state) => state.risk);
  const setRisk = usePlinkoStore((state) => state.setRisk);
  const isDropping = usePlinkoStore((state) => state.isDropping);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-text-secondary">Risk</label>
      <div className="flex gap-2">
        {RISK_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => setRisk(option)}
            disabled={isDropping}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium capitalize transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              risk === option
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

PlinkoRiskSelect.displayName = "PlinkoRiskSelect";
