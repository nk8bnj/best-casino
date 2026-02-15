"use client";

import Link from "next/link";
import { PlinkoBoard } from "./game/PlinkoBoard";
import { PlinkoConfig } from "./bet/PlinkoConfig";
import { PlinkoHistory } from "./history/PlinkoHistory";
import { ROUTES } from "@/config/routes";

export const PlinkoGame = () => {
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
      <div className="flex flex-col xl:flex-row gap-6 mt-10 px-4 xl:px-8">
        <div className="w-full xl:w-[66%]">
          <PlinkoBoard />
        </div>
        <PlinkoConfig />
      </div>
      <div className="px-4 xl:px-8">
        <PlinkoHistory />
      </div>
    </section>
  );
};
