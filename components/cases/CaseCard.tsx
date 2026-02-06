"use client";

import Link from "next/link";
import { CoinIcon } from "@/components/icons/Coin";
import type { CaseSummary } from "@/types/cases.types";
import { getCaseStarRating } from "@/lib/utils/cases";

interface CaseCardProps {
  caseData: CaseSummary;
  index: number;
}

export function CaseCard({ caseData, index }: CaseCardProps) {
  const stars = getCaseStarRating(index);

  return (
    <Link href={`/cases/${caseData.id}`}>
      <div className="group relative rounded-2xl overflow-hidden bg-background-card border border-white/5 hover:border-white/15 transition-all cursor-pointer">
        <div className="p-4 flex flex-col items-center gap-3">
          {/* Star rating */}
          <div className="flex gap-0.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${i < stars ? "text-accent-yellow" : "text-white/20"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Case name */}
          <h3 className="text-white font-bold text-xl text-center truncate w-full">
            {caseData.name}
          </h3>

          {/* Case image */}
          <div className="relative w-full aspect-square flex items-center justify-center">
            <div className="text-[10rem]">{caseData.image}</div>
          </div>

          {/* Price badge */}
          <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
            <CoinIcon className="w-4 h-4" />
            <span className="text-white font-semibold text-md">
              ${caseData.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
