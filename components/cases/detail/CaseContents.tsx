"use client";

import type { CaseItem } from "@/types/cases.types";
import { CaseContentItem } from "./CaseContentItem";

interface CaseContentsProps {
  items: CaseItem[];
}

export function CaseContents({ items }: CaseContentsProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-white mb-4">Case content</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
        {items.map((item) => (
          <CaseContentItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
