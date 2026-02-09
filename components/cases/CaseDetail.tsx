"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCaseDetail, useCaseOpening } from "@/hooks/cases";
import { useCasesStore } from "@/store/cases.store";
import { CaseGamePhase } from "@/types/cases.types";
import { CaseHero, OpeningControls, CaseContents } from "./detail";
import { RouletteStrip } from "./roulette";
import { CaseResult } from "./result";
import { CaseHistory } from "./history";

interface CaseDetailProps {
  caseId: string;
}

export function CaseDetail({ caseId }: CaseDetailProps) {
  const { data, isLoading, isError, error } = useCaseDetail(caseId);
  const phase = useCasesStore((s) => s.phase);
  const lastResult = useCasesStore((s) => s.lastResult);
  const reset = useCasesStore((s) => s.reset);

  const { openCase, handleAnimationEnd, handleTryAgain, isOpening } =
    useCaseOpening(caseId, data?.items || []);

  // Reset store on unmount or caseId change
  useEffect(() => {
    return () => {
      reset();
    };
  }, [caseId, reset]);

  if (isLoading) {
    return (
      <section className="w-full h-full">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="w-full h-full">
        <div className="px-4 xl:px-8 pt-4">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-accent-yellow hover:text-accent-yellow/90 transition-colors font-medium"
          >
            <span aria-hidden>←</span>
            Back to cases
          </Link>
        </div>
        <div className="flex flex-col items-center text-center py-20">
          <p className="text-2xl font-bold text-error mb-2">
            Failed to load case
          </p>
          <p className="text-text-secondary">
            {error instanceof Error ? error.message : "Case not found"}
          </p>
        </div>
      </section>
    );
  }

  const handleSell = () => {
    // API already updates balance on open; just reset to IDLE
    handleTryAgain();
  };

  return (
    <section className="w-full h-full">
      <div className="px-4 xl:px-8 pt-4">
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 text-accent-yellow hover:text-accent-yellow/90 transition-colors font-medium"
        >
          <span aria-hidden>←</span>
          Back to cases
        </Link>
      </div>

      <div className="px-4 xl:px-8 mt-6">
        {/* Phase: IDLE */}
        {phase === CaseGamePhase.IDLE && (
          <div className="flex flex-col items-center gap-8">
            <CaseHero name={data.name} image={data.image} />
            <OpeningControls
              price={data.price}
              onOpen={openCase}
              isOpening={isOpening}
            />
            <CaseContents items={data.items} />
          </div>
        )}

        {/* Phase: SPINNING / REVEALING */}
        {(phase === CaseGamePhase.SPINNING ||
          phase === CaseGamePhase.REVEALING) && (
          <RouletteStrip
            caseImage={data.image}
            caseName={data.name}
            onAnimationEnd={handleAnimationEnd}
          />
        )}

        {/* Phase: RESULT */}
        {phase === CaseGamePhase.RESULT && lastResult && (
          <CaseResult
            result={lastResult}
            caseName={data.name}
            onSell={handleSell}
            onTryAgain={handleTryAgain}
          />
        )}

        {/* History always visible */}
        <CaseHistory />
      </div>
    </section>
  );
}
