"use client";

import {
  RARITY_COLORS,
  RARITY_BG_COLORS,
  type CaseOpenResponse,
} from "@/types/cases.types";
interface CaseResultProps {
  result: CaseOpenResponse;
  caseName: string;
  onSell: () => void;
  onTryAgain: () => void;
}

export function CaseResult({ result, onSell, onTryAgain }: CaseResultProps) {
  const { item } = result;
  const borderColor = RARITY_COLORS[item.rarity];
  const bgColor = RARITY_BG_COLORS[item.rarity];

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Won item card */}
      <div
        className="rounded-2xl overflow-hidden p-6 flex flex-col items-center gap-4 w-64"
        style={{
          borderWidth: 2,
          borderStyle: "solid",
          borderColor,
          backgroundColor: bgColor,
        }}
      >
        <div className="w-40 h-40 flex items-center justify-center">
          <div className="text-[6rem]">{item.image}</div>
        </div>
        <h2 className="text-white font-bold text-lg text-center">
          {item.name}
        </h2>
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: borderColor }}
          />
          <span
            className="text-sm font-semibold"
            style={{ color: borderColor }}
          >
            {item.rarity}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 w-full max-w-sm">
        <button
          onClick={onSell}
          className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all"
        >
          Sell for ${(item.price ?? 0).toFixed(2)}
        </button>
        <button
          onClick={onTryAgain}
          className="flex-1 py-3 px-4 rounded-xl font-bold text-background-dark bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 transition-all"
        >
          Try again
        </button>
      </div>

      {/* Info text */}
      <p className="text-text-secondary text-xs text-center">
        The item will be displayed in your personal account.
      </p>
    </div>
  );
}
