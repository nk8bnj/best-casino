"use client";

import { useCasesStore } from "@/store/cases.store";
import type { OpeningCount } from "@/types/cases.types";
import { OpenCaseIcon } from "./OpenCaseIcon";

const COUNTS: OpeningCount[] = [1, 2, 3, 4, 5, 10];

interface OpeningControlsProps {
  price: number;
  onOpen: () => void;
  isOpening: boolean;
}

export function OpeningControls({
  price,
  onOpen,
  isOpening,
}: OpeningControlsProps) {
  const selectedCount = useCasesStore((s) => s.selectedCount);
  const setSelectedCount = useCasesStore((s) => s.setSelectedCount);
  const skipAnimation = useCasesStore((s) => s.skipAnimation);
  const setSkipAnimation = useCasesStore((s) => s.setSkipAnimation);

  const totalPrice = price * selectedCount;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      {/* Count selector */}
      <div className="flex gap-2">
        {COUNTS.map((count) => (
          <button
            key={count}
            onClick={() => setSelectedCount(count)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedCount === count
                ? "bg-primary text-white"
                : "bg-white/10 text-text-secondary hover:bg-white/20"
            }`}
          >
            x{count}
          </button>
        ))}
      </div>

      {/* Open button */}
      <button
        onClick={onOpen}
        disabled={isOpening}
        className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-primary hover:shadow-glow-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isOpening ? (
          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          <>
            <OpenCaseIcon />
            <span>Open case — ${totalPrice.toFixed(2)}</span>
          </>
        )}
      </button>

      {/* Skip animation toggle */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-text-secondary">without animation</span>
        <button
          onClick={() => setSkipAnimation(!skipAnimation)}
          className={`w-10 h-5 rounded-full transition-colors ${
            skipAnimation ? "bg-primary" : "bg-white/20"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform ${
              skipAnimation ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
