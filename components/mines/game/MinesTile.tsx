"use client";

import Image from "next/image";
import React from "react";

export type TileStatus = "hidden" | "safe" | "mine" | "mine-revealed";

interface MinesTileProps {
  position: number;
  status: TileStatus;
  disabled: boolean;
  onClick: (position: number) => void;
}

export const MinesTile = React.memo(
  ({ position, status, disabled, onClick }: MinesTileProps) => {
    const handleClick = () => {
      if (!disabled && status === "hidden") {
        onClick(position);
      }
    };

    const baseClasses =
      "relative w-[40px] h-[40px] md:w-[100px] md:h-[100px] rounded-[8px] md:rounded-[16px] transition-all duration-200 flex items-center justify-center";

    const statusClasses: Record<TileStatus, string> = {
      hidden:
        "bg-background-dark border border-white/10 hover:border-white/30 hover:bg-white/5 cursor-pointer active:scale-95",
      safe: "bg-gradient-to-b from-[#e8b730] to-[#c99a20] border border-yellow-600/40 rounded-[8px] md:rounded-[16px] shadow-[inset_0_-3px_6px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.3)]",
      mine: "bg-gradient-to-b from-[#f04060] to-[#d42050] border border-red-700/40 rounded-[8px] md:rounded-[16px] shadow-[inset_0_-3px_6px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.2)] animate-pulse",
      "mine-revealed":
        "bg-gradient-to-b from-[#f04060]/70 to-[#d42050]/70 border border-red-700/20 rounded-[8px] md:rounded-[16px] opacity-70",
    };

    const disabledClasses =
      disabled && status === "hidden"
        ? "cursor-not-allowed hover:border-white/10 hover:bg-background-dark active:scale-100"
        : "";

    return (
      <button
        onClick={handleClick}
        disabled={disabled && status === "hidden"}
        className={`${baseClasses} ${statusClasses[status]} ${disabledClasses}`}
      >
        {status === "safe" && (
          <Image
            src="/assets/mines-coin.svg"
            alt="Coin"
            width={48}
            height={48}
            className="w-3/5 h-3/5 object-contain drop-shadow-lg"
          />
        )}
        {(status === "mine" || status === "mine-revealed") && (
          <Image
            src="/assets/mines-bomb.svg"
            alt="Bomb"
            width={48}
            height={48}
            className="w-3/5 h-3/5 object-contain drop-shadow-lg"
          />
        )}
      </button>
    );
  }
);

MinesTile.displayName = "MinesTile";
