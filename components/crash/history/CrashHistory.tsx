"use client";

import React from "react";
import { useBetHistory } from "@/hooks/crash";
import { CrashBetResult } from "@/types/crash.types";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const CrashHistory = React.memo(() => {
  const { data, isLoading } = useBetHistory({ limit: 10, offset: 0 });

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

  const bets = data?.bets || [];

  if (bets.length === 0) {
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
                Date
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Bet Amount
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Multiplier
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Win Amount
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet) => {
              const multiplier = bet.cashoutMultiplier || bet.crashPoint || 0;
              const isWon = bet.status === CrashBetResult.WON;

              return (
                <tr
                  key={bet.betId}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-text-secondary">
                    {formatDate(bet.createdAt)}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-accent-yellow">
                    ${bet.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">
                    <span className={isWon ? "text-success" : "text-error"}>
                      {multiplier.toFixed(2)}×
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">
                    <span className={isWon ? "text-success" : "text-error"}>
                      $
                      {isWon && bet.winAmount
                        ? bet.winAmount.toFixed(2)
                        : "0.00"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        isWon
                          ? "bg-success/20 text-success"
                          : "bg-error/20 text-error"
                      }`}
                    >
                      {isWon ? "Won" : "Lost"}
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

CrashHistory.displayName = "CrashHistory";
