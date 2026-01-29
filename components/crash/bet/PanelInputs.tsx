"use client";

import React, { useCallback, useMemo } from "react";
import { useCrashStore } from "@/store/crash.store";
import { CrashGameStatus } from "@/types/crash.types";

export const PanelInputs = React.memo(() => {
  const disabled = useCrashStore(
    (state) => state.gameState?.state === CrashGameStatus.RUNNING
  );
  const displayValue = useCrashStore((state) => state.displayValue);
  const setDisplayValue = useCrashStore((state) => state.setDisplayValue);
  const setBetAmount = useCrashStore((state) => state.setBetAmount);

  const autoCashoutDisplay = useCrashStore((state) => state.autoCashoutDisplay);
  const setAutoCashoutDisplay = useCrashStore(
    (state) => state.setAutoCashoutDisplay
  );
  const setAutoCashoutValue = useCrashStore(
    (state) => state.setAutoCashoutValue
  );
  const autoCashoutEnabled = useCrashStore((state) => state.autoCashoutEnabled);
  const toggleAutoCashout = useCrashStore((state) => state.toggleAutoCashout);

  const handleHalf = useCrashStore((state) => state.handleHalf);
  const handleDouble = useCrashStore((state) => state.handleDouble);
  const handleMax = useCrashStore((state) => state.handleMax);

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

  const handleChangeCashout = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "") {
        setAutoCashoutDisplay("");
        setAutoCashoutValue(0);
        return;
      }
      if (/^\d*\.?\d*$/.test(value)) {
        setAutoCashoutDisplay(value);
        const num = parseFloat(value);
        setAutoCashoutValue(isNaN(num) ? 0 : num);
      }
    },
    [setAutoCashoutDisplay, setAutoCashoutValue]
  );

  const handleBlurCashout = useCallback(() => {
    const num = parseFloat(autoCashoutDisplay);
    if (!isNaN(num) && num > 0) {
      setAutoCashoutDisplay(num.toFixed(2));
    }
  }, [autoCashoutDisplay, setAutoCashoutDisplay]);

  const betButtons = useMemo(
    () => (
      <div className="flex gap-2">
        <button
          onClick={handleHalf}
          disabled={disabled}
          className="px-3 py-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ½
        </button>
        <button
          onClick={handleDouble}
          disabled={disabled}
          className="px-3 py-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          2×
        </button>
        <button
          onClick={handleMax}
          disabled={disabled}
          className="px-3 py-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Max
        </button>
      </div>
    ),
    [handleHalf, handleDouble, handleMax, disabled]
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Bet Amount Input */}
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
              disabled={disabled}
              placeholder="0.10"
              className="bg-transparent w-full text-white text-lg font-semibold outline-none placeholder:text-text-muted disabled:opacity-50"
            />
          </div>
          {betButtons}
        </div>
      </div>

      {/* Auto Cashout Input */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-text-secondary">
            Auto Cashout (optional)
          </label>
          <button
            onClick={toggleAutoCashout}
            className={`w-12 h-6 rounded-full transition-colors ${
              autoCashoutEnabled ? "bg-primary" : "bg-white/20"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                autoCashoutEnabled ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
        <div className="flex items-center gap-3 bg-background-dark rounded-xl p-3 border border-white/10">
          <input
            type="text"
            value={autoCashoutDisplay}
            onChange={handleChangeCashout}
            onBlur={handleBlurCashout}
            disabled={disabled || !autoCashoutEnabled}
            placeholder="e.g 2.00"
            className="bg-transparent w-full text-white text-lg font-semibold outline-none placeholder:text-text-muted disabled:opacity-50"
          />
          <span className="text-text-secondary">×</span>
        </div>
      </div>
    </div>
  );
});

PanelInputs.displayName = "PanelInputs";
