"use client";

import Link from "next/link";
import { useCasesList } from "@/hooks/cases";
import { CaseCard } from "./CaseCard";
import { ROUTES } from "@/config/routes";

export function CasesList() {
  const { data, isLoading, isError, error } = useCasesList();

  return (
    <section className="w-full h-full">
      <div className="px-4 xl:px-8 pt-4">
        <Link
          href={ROUTES.DASHBOARD}
          className="inline-flex items-center gap-2 text-accent-yellow hover:text-accent-yellow/90 transition-colors font-medium"
        >
          <span aria-hidden>←</span>
          All games
        </Link>
      </div>

      <div className="px-4 xl:px-8 mt-6">
        <h1 className="text-3xl font-bold text-white mb-6">Cases</h1>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center text-center py-20">
            <p className="text-2xl font-bold text-error mb-2">
              Failed to load cases
            </p>
            <p className="text-text-secondary">
              {error instanceof Error ? error.message : "An error occurred"}
            </p>
          </div>
        )}

        {data && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.cases.map((caseItem, index) => (
              <CaseCard key={caseItem.id} caseData={caseItem} index={index} />
            ))}
          </div>
        )}

        {data && data.cases.length === 0 && (
          <p className="text-text-secondary text-center py-20">
            No cases available at the moment.
          </p>
        )}
      </div>
    </section>
  );
}
