"use client";

import React from "react";
import { usePlinkoStore } from "@/store/plinko.store";
import type { PlinkoLines } from "@/types/plinko.types";

const ROW_OPTIONS: PlinkoLines[] = [8, 10, 12, 14, 16];

export const PlinkoRowSelect = React.memo(() => {
  const lines = usePlinkoStore((state) => state.lines);
  const setLines = usePlinkoStore((state) => state.setLines);
  const isDropping = usePlinkoStore((state) => state.isDropping);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-text-secondary">Rows</label>
      <div className="flex gap-2">
        {ROW_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => setLines(option)}
            disabled={isDropping}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              lines === option
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

PlinkoRowSelect.displayName = "PlinkoRowSelect";
