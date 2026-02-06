"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useCasesStore } from "@/store/cases.store";
import { CaseGamePhase } from "@/types/cases.types";
import { RouletteItem } from "./RouletteItem";
import Image from "next/image";

const ITEM_WIDTH = 155 + 8; // w-28 + gap
const WINNER_INDEX = 38;

interface RouletteStripProps {
  caseImage: string;
  caseName: string;
  onAnimationEnd: () => void;
}

export function RouletteStrip({
  caseImage,
  caseName,
  onAnimationEnd,
}: RouletteStripProps) {
  const rouletteItems = useCasesStore((s) => s.rouletteItems);
  const phase = useCasesStore((s) => s.phase);
  const setPhase = useCasesStore((s) => s.setPhase);
  const stripRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (
      phase === CaseGamePhase.SPINNING &&
      rouletteItems.length > 0 &&
      containerRef.current
    ) {
      const containerWidth = containerRef.current.offsetWidth;
      const centerOffset = containerWidth / 2;
      const targetX = WINNER_INDEX * ITEM_WIDTH + ITEM_WIDTH / 2 - centerOffset;

      // Small random offset for realism (-20 to +20 px)
      const jitter = (Math.random() - 0.5) * 40;

      requestAnimationFrame(() => {
        setOffset(targetX + jitter);
        setIsAnimating(true);
      });
    }
  }, [phase, rouletteItems]);

  const handleTransitionEnd = useCallback(() => {
    if (isAnimating) {
      setIsAnimating(false);
      onAnimationEnd();
    }
  }, [isAnimating, onAnimationEnd]);

  const handleSkip = useCallback(() => {
    setPhase(CaseGamePhase.RESULT);
  }, [setPhase]);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Roulette container */}
      <div className="relative w-full overflow-hidden" ref={containerRef}>
        {/* Center indicator */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center">
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-accent-yellow" />
          <div className="w-0.5 h-full bg-accent-yellow" />
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-accent-yellow" />
        </div>

        {/* Strip */}
        <div
          ref={stripRef}
          className="flex gap-2 py-4"
          style={{
            transform: `translateX(-${offset}px)`,
            transition: isAnimating
              ? "transform 5s cubic-bezier(0.15, 0.85, 0.35, 1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {rouletteItems.map((item, index) => (
            <RouletteItem key={`${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>

      {/* Skip animation button */}
      {phase === CaseGamePhase.SPINNING && (
        <button
          onClick={handleSkip}
          className="text-text-secondary hover:text-white text-sm transition-colors"
        >
          Skip animation
        </button>
      )}

      {/* Case image below roulette */}
      <div className="w-[368px] h-[212px] opacity-50 flex items-center justify-center">
        <Image
          src={caseImage || "/assets/case.png"}
          alt={caseName}
          width={368}
          height={212}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}
