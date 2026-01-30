"use client";

import Link from "next/link";
import { useCrashWebSocket } from "@/hooks/crash";
import { CrashGameBoard } from "./game";
import { PanelConfig } from "./bet";
import { CrashHistory } from "./history";
import { ROUTES } from "@/config/routes";

export const CrashGame = () => {
  const { isConnected, error } = useCrashWebSocket();

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
        {/* Game Board — fixed aspect ratio so it doesn't stretch on narrow viewports */}
        <div className="w-full xl:w-[66%] aspect-5/3 rounded-2xl bg-background-card overflow-hidden flex justify-center items-center">
          {error ? (
            <div className="flex flex-col text-center p-8">
              <p className="text-2xl font-bold text-error mb-2">
                Connection Error
              </p>
              <p className="text-text-secondary">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-primary rounded-lg hover:bg-primary-dark transition-colors"
              >
                Retry
              </button>
            </div>
          ) : !isConnected ? (
            <div className="flex flex-col text-center">
              <p className="text-2xl text-text-secondary mt-2">
                Connecting to game...
              </p>
              <div className="mt-4 animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            </div>
          ) : (
            <CrashGameBoard />
          )}
        </div>

        {/* Panel Config */}
        <PanelConfig />
      </div>

      {/* Game History */}
      <div className="px-4 xl:px-8">
        <CrashHistory />
      </div>
    </section>
  );
};
