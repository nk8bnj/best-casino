"use client";

import React from "react";
import { useMinesHistory } from "@/hooks/mines";
import { MinesGameStatus } from "@/types/mines.types";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusDisplay = (status: MinesGameStatus) => {
  switch (status) {
    case MinesGameStatus.WON:
      return { label: "Won", className: "bg-success/20 text-success" };
    case MinesGameStatus.CASHED_OUT:
      return { label: "Cashed Out", className: "bg-success/20 text-success" };
    case MinesGameStatus.LOST:
      return { label: "Lost", className: "bg-error/20 text-error" };
    default:
      return {
        label: "Active",
        className: "bg-primary/20 text-primary",
      };
  }
};

const formatCurrency = (value: number | null | undefined) =>
  typeof value === "number" && !Number.isNaN(value) ? value.toFixed(2) : "0.00";

const formatMultiplier = (value: number | null | undefined) =>
  typeof value === "number" && !Number.isNaN(value) ? value.toFixed(2) : "--";

export const MinesHistory = React.memo(() => {
  const { data, isLoading } = useMinesHistory({ limit: 10, offset: 0 });

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

  const games = data?.games || [];

  if (games.length === 0) {
    return (
      <div className="bg-background-card rounded-2xl p-6 mt-6">
        <h3 className="text-xl font-bold text-white mb-4">Game History</h3>
        <p className="text-text-secondary text-center py-8">
          No game history yet. Place your first bet!
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
            {games.map((game, index) => {
              const statusDisplay = getStatusDisplay(game.status);
              const isWin =
                game.status === MinesGameStatus.WON ||
                game.status === MinesGameStatus.CASHED_OUT;

              const key = `${game.gameId}-${game.createdAt}-${index}`;

              return (
                <tr
                  key={key}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-text-secondary">
                    {formatDate(game.createdAt)}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-accent-yellow">
                    ${formatCurrency(game.amount)}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">
                    <span className={isWin ? "text-success" : "text-error"}>
                      {formatMultiplier(game.multiplier)}×
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">
                    <span className={isWin ? "text-success" : "text-error"}>
                      ${formatCurrency(isWin ? game.winAmount : 0)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${statusDisplay.className}`}
                    >
                      {statusDisplay.label}
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

MinesHistory.displayName = "MinesHistory";
