"use client";

import { CoinIcon } from "@/components/icons";

interface BalanceDisplayProps {
  balance: string;
}

export function BalanceDisplay({ balance }: BalanceDisplayProps) {
  return (
    <div className="flex items-center gap-2 border border-foreground rounded-full px-4 py-2">
      <CoinIcon className="w-5 h-5" />
      <span className="text-white font-semibold text-sm">{balance}</span>
    </div>
  );
}
