"use client";

import { useCallback } from "react";
import { useCasesStore } from "@/store/cases.store";
import { useCaseOpen } from "./useCasesQuery";
import { generateRouletteStrip } from "@/lib/utils/cases";
import { CaseGamePhase, type CaseItem } from "@/types/cases.types";

export function useCaseOpening(caseId: string, caseItems: CaseItem[]) {
  const mutation = useCaseOpen(caseId);

  const setPhase = useCasesStore((s) => s.setPhase);
  const setRouletteItems = useCasesStore((s) => s.setRouletteItems);
  const setWinnerIndex = useCasesStore((s) => s.setWinnerIndex);
  const setLastResult = useCasesStore((s) => s.setLastResult);
  const skipAnimation = useCasesStore((s) => s.skipAnimation);
  const reset = useCasesStore((s) => s.reset);

  const openCase = useCallback(async () => {
    try {
      const result = await mutation.mutateAsync();
      setLastResult(result);

      if (skipAnimation) {
        setPhase(CaseGamePhase.RESULT);
        return;
      }

      const strip = generateRouletteStrip(caseItems, result.item);
      setRouletteItems(strip);
      setWinnerIndex(38);
      setPhase(CaseGamePhase.SPINNING);
    } catch (error) {
      console.error("[CaseOpening] Failed to open case:", error);
    }
  }, [
    mutation,
    caseItems,
    skipAnimation,
    setPhase,
    setRouletteItems,
    setWinnerIndex,
    setLastResult,
  ]);

  const handleAnimationEnd = useCallback(() => {
    setPhase(CaseGamePhase.REVEALING);
    setTimeout(() => {
      setPhase(CaseGamePhase.RESULT);
    }, 800);
  }, [setPhase]);

  const handleTryAgain = useCallback(() => {
    reset();
  }, [reset]);

  return {
    openCase,
    handleAnimationEnd,
    handleTryAgain,
    isOpening: mutation.isPending,
    openError: mutation.error,
  };
}
