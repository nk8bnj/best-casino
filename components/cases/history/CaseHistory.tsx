"use client";

import React from "react";
import { useCaseHistory } from "@/hooks/cases";
import { RARITY_COLORS } from "@/types/cases.types";
import { formatCaseDate } from "@/lib/utils/cases";

export const CaseHistory = React.memo(() => {
  const { data, isLoading } = useCaseHistory({ limit: 10, offset: 0 });

  if (isLoading) {
    return (
      <div className="bg-background-card rounded-2xl p-6 mt-6">
        <h3 className="text-xl font-bold text-white mb-4">Opening History</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  const history = [...(data?.openings || [])];

  if (history.length === 0) {
    return (
      <div className="bg-background-card rounded-2xl p-6 mt-6">
        <h3 className="text-xl font-bold text-white mb-4">Opening History</h3>
        <p className="text-text-secondary text-center py-8">
          No opening history yet. Open your first case!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background-card rounded-2xl p-6 mt-6">
      <h3 className="text-xl font-bold text-white mb-4">Opening History</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Time
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Case
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Item
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Rarity
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Value
              </th>
              <th className="text-left text-text-secondary text-sm font-medium py-3 px-4">
                Profit
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => {
              const isProfitable = entry.profit >= 0;
              const rarityColor = RARITY_COLORS[entry.itemRarity];

              return (
                <tr
                  key={entry.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-text-secondary">
                    {formatCaseDate(entry.createdAt)}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-white">
                    {entry.caseName}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-white">
                    <span className="mr-2">{entry.itemImage}</span>
                    {entry.itemName}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        color: rarityColor,
                        backgroundColor: `${rarityColor}20`,
                      }}
                    >
                      {entry.itemRarity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-accent-yellow">
                    ${entry.itemValue.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">
                    <span
                      className={isProfitable ? "text-success" : "text-error"}
                    >
                      {isProfitable ? "+" : ""}${entry.profit.toFixed(2)}
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

CaseHistory.displayName = "CaseHistory";
