"use client";

import { useCasesStore } from "@/store/cases.store";
import type { OpeningCount } from "@/types/cases.types";

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
            <svg
              className="w-5 h-5 text-accent-yellow"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a5.35 5.35 0 01-.491-.521h.764a1 1 0 000-2H8.017a7.36 7.36 0 010-1h1.234a1 1 0 000-2h-.764c.163-.18.33-.364.491-.521h.258z" />
            </svg>
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
