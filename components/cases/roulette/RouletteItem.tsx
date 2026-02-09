"use client";

import {
  RARITY_COLORS,
  RARITY_BG_COLORS,
  type RouletteItem as RouletteItemType,
} from "@/types/cases.types";

interface RouletteItemProps {
  item: RouletteItemType;
}

export function RouletteItem({ item }: RouletteItemProps) {
  const borderColor = RARITY_COLORS[item.rarity];
  const bgColor = RARITY_BG_COLORS[item.rarity];

  return (
    <div
      className="flex-shrink-0 w-[155px] h-[192px] rounded-lg overflow-hidden flex flex-col items-center justify-center gap-1 p-2"
      style={{
        borderWidth: 2,
        borderStyle: "solid",
        borderColor,
        backgroundColor: bgColor,
      }}
    >
      <div className="w-16 h-16 flex items-center justify-center">
        <div className="text-[4rem] mb-4">{item.imageUrl}</div>
      </div>
      <p className="text-white text-md font-medium text-center truncate w-full">
        {item.name}
      </p>
    </div>
  );
}
