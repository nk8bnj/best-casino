"use client";

import React, { useCallback, useMemo } from "react";
import { usePlinkoStore } from "@/store/plinko.store";

export const PlinkoBetInput = React.memo(() => {
  const isDropping = usePlinkoStore((state) => state.isDropping);
  const displayValue = usePlinkoStore((state) => state.displayValue);
  const setDisplayValue = usePlinkoStore((state) => state.setDisplayValue);
  const setBetAmount = usePlinkoStore((state) => state.setBetAmount);
  const handleHalf = usePlinkoStore((state) => state.handleHalf);
  const handleDouble = usePlinkoStore((state) => state.handleDouble);
  const handleMax = usePlinkoStore((state) => state.handleMax);

  const handleChangeBet = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setDisplayValue(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
          setBetAmount(num);
        }
      }
    },
    [setDisplayValue, setBetAmount]
  );

  const handleBlurBet = useCallback(() => {
    const num = parseFloat(displayValue);
    if (!isNaN(num) && num > 0) {
      setDisplayValue(num.toFixed(2));
    } else {
      setDisplayValue("10.00");
      setBetAmount(10);
    }
  }, [displayValue, setDisplayValue, setBetAmount]);

  const betButtons = useMemo(
    () => (
      <div className="flex gap-2">
        <button
          onClick={handleHalf}
          disabled={isDropping}
          className="px-3 py-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ½
        </button>
        <button
          onClick={handleDouble}
          disabled={isDropping}
          className="px-3 py-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          2×
        </button>
        <button
          onClick={handleMax}
          disabled={isDropping}
          className="px-3 py-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Max
        </button>
      </div>
    ),
    [handleHalf, handleDouble, handleMax, isDropping]
  );

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-text-secondary">Bet Amount</label>
      <div className="flex items-center gap-3 bg-background-dark rounded-xl p-3 border border-white/10">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-accent-yellow text-lg">$</span>
          <input
            type="text"
            value={displayValue}
            onChange={handleChangeBet}
            onBlur={handleBlurBet}
            disabled={isDropping}
            placeholder="0.10"
            className="bg-transparent w-full text-white text-lg font-semibold outline-none placeholder:text-text-muted disabled:opacity-50"
          />
        </div>
        {betButtons}
      </div>
    </div>
  );
});

PlinkoBetInput.displayName = "PlinkoBetInput";
