"use client";

import React from "react";
import { usePlinkoStore } from "@/store/plinko.store";
import { usePlinkoActions } from "@/hooks/plinko";

export const PlinkoDropButton = React.memo(() => {
  const isDropping = usePlinkoStore((state) => state.isDropping);
  const { handleDrop } = usePlinkoActions();

  return (
    <button
      onClick={handleDrop}
      disabled={isDropping}
      className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-primary hover:shadow-glow-primary disabled:bg-gradient-primary-disabled disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center gap-2"
    >
      {isDropping ? "Dropping..." : "Place Bet"}
    </button>
  );
});

PlinkoDropButton.displayName = "PlinkoDropButton";
