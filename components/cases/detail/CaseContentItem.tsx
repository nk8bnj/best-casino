"use client";

import {
  RARITY_COLORS,
  RARITY_BG_COLORS,
  type CaseItem,
} from "@/types/cases.types";

interface CaseContentItemProps {
  item: CaseItem;
}

export function CaseContentItem({ item }: CaseContentItemProps) {
  const borderColor = RARITY_COLORS[item.rarity];
  const bgColor = RARITY_BG_COLORS[item.rarity];

  return (
    <div
      className="flex-shrink-0 w-32 rounded-xl overflow-hidden"
      style={{
        borderWidth: 2,
        borderStyle: "solid",
        borderColor,
        backgroundColor: bgColor,
      }}
    >
      <div className="p-2 flex flex-col items-center gap-2">
        <div className="w-20 h-20 flex items-center justify-center">
          <div className="text-6xl">{item.imageUrl}</div>
        </div>
        <p className="text-white text-lg font-medium text-center truncate w-full">
          {item.name}
        </p>
        <div className="flex items-center gap-1">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: borderColor }}
          />
          <span className="text-md font-medium" style={{ color: borderColor }}>
            {item.rarity}
          </span>
        </div>
      </div>
    </div>
  );
}
