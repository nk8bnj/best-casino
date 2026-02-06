"use client";

import { useCallback } from "react";
import { useCasesStore } from "@/store/cases.store";
import { useCaseOpen, useInvalidateCaseHistory } from "./useCasesQuery";
import { generateRouletteStrip } from "@/lib/utils/cases";
import { CaseGamePhase, type CaseItem } from "@/types/cases.types";

export function useCaseOpening(caseId: string, caseItems: CaseItem[]) {
  const mutation = useCaseOpen(caseId);
  const invalidateHistory = useInvalidateCaseHistory();

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
        invalidateHistory();
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
    invalidateHistory,
  ]);

  const handleAnimationEnd = useCallback(() => {
    setPhase(CaseGamePhase.REVEALING);
    setTimeout(() => {
      setPhase(CaseGamePhase.RESULT);
      invalidateHistory();
    }, 800);
  }, [setPhase, invalidateHistory]);

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
