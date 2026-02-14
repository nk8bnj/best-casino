"use client";

import React from "react";
import { usePlinkoHistory } from "@/hooks/plinko";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const PlinkoHistory = React.memo(() => {
  const { data, isLoading } = usePlinkoHistory({ limit: 10, offset: 0 });

  if (isLoading) {
    return (
      <div className="bg-background-card rounded-2xl p-6 mt-6">
        <h3 className="text-xl font-bold text-white mb-4">Game History</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  const drops = data?.drops || [];

  if (drops.length === 0) {
    return (
      <div className="bg-background-card rounded-2xl p-6 mt-6">
        <h3 className="text-xl font-bold text-white mb-4">Game History</h3>
        <p className="text-text-secondary text-center py-8">
          No bet history yet. Place your first bet!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background-card rounded-2xl p-6 mt-6">
      <h3 className="text-xl font-bold text-white mb-4">Game History</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Time
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Bet
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Lines
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Risk
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Multiplier
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Win
              </th>
            </tr>
          </thead>
          <tbody>
            {drops.map((drop) => {
              const isWon = drop.status === "won";

              return (
                <tr
                  key={drop._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-text-secondary">
                    {formatDate(drop.createdAt)}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-accent-yellow">
                    ${Number(drop.betAmount ?? 0).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-secondary">
                    {drop.linesCount}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-secondary capitalize">
                    {drop.riskLevel}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">
                    <span className={isWon ? "text-success" : "text-error"}>
                      {Number(drop.avgMultiplier ?? 0).toFixed(2)}×
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">
                    <span className={isWon ? "text-success" : "text-error"}>
                      ${Number(drop.totalWin ?? 0).toFixed(2)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

PlinkoHistory.displayName = "PlinkoHistory";
