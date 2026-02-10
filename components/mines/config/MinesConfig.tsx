"use client";

import React, { useCallback } from "react";
import { useMinesStore } from "@/store/mines.store";
import { useMinesActions } from "@/hooks/mines";
import { MinesGameStatus } from "@/types/mines.types";

const MINE_PRESETS = [1, 3, 5, 10, 24];
const GRID_SIZES = [5, 6, 7, 8];

export const MinesConfig = React.memo(() => {
  const gameState = useMinesStore((state) => state.gameState);
  const betAmount = useMinesStore((state) => state.betAmount);
  const displayValue = useMinesStore((state) => state.displayValue);
  const setDisplayValue = useMinesStore((state) => state.setDisplayValue);
  const setBetAmount = useMinesStore((state) => state.setBetAmount);
  const minesCount = useMinesStore((state) => state.minesCount);
  const setMinesCount = useMinesStore((state) => state.setMinesCount);
  const gridSize = useMinesStore((state) => state.gridSize);
  const setGridSize = useMinesStore((state) => state.setGridSize);
  const handleHalf = useMinesStore((state) => state.handleHalf);
  const handleDouble = useMinesStore((state) => state.handleDouble);
  const handleMax = useMinesStore((state) => state.handleMax);
  const isGameOver = useMinesStore((state) => state.isGameOver);
  const cashoutResult = useMinesStore((state) => state.cashoutResult);
  const setGameState = useMinesStore((state) => state.setGameState);
  const setIsGameOver = useMinesStore((state) => state.setIsGameOver);
  const setRevealedMinePosition = useMinesStore(
    (state) => state.setRevealedMinePosition
  );
  const setCashoutResult = useMinesStore((state) => state.setCashoutResult);

  const {
    handleStartGame,
    handleCashout,
    canStart,
    canCashout,
    isStarting,
    isCashingOut,
  } = useMinesActions();

  const isActive = gameState?.status === MinesGameStatus.ACTIVE;
  const inputsDisabled = isActive;
  const maxMines = gridSize * gridSize - 1;

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

  const handleSelectMines = useCallback(
    (count: number) => {
      if (count <= maxMines) {
        setMinesCount(count);
      }
    },
    [setMinesCount, maxMines]
  );

  const handleSelectGridSize = useCallback(
    (size: number) => {
      setGridSize(size);
      // Ensure mines count is valid for new grid size
      const newMax = size * size - 1;
      if (minesCount > newMax) {
        setMinesCount(Math.min(minesCount, newMax));
      }
    },
    [setGridSize, setMinesCount, minesCount]
  );

  const onPlaceBet = useCallback(() => {
    handleStartGame(betAmount, minesCount, gridSize);
  }, [handleStartGame, betAmount, minesCount, gridSize]);

  const onNewGame = useCallback(() => {
    setGameState(null);
    setIsGameOver(false);
    setRevealedMinePosition(null);
    setCashoutResult(null);
  }, [setGameState, setIsGameOver, setRevealedMinePosition, setCashoutResult]);

  const showNewGameButton = isGameOver || !!cashoutResult;

  return (
    <div className="bg-background-card rounded-2xl w-full xl:w-[32%] h-fit">
      <div className="flex flex-col p-6 gap-6">
        <h2 className="text-2xl font-bold text-white">Mines Configuration</h2>

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
                disabled={inputsDisabled}
                placeholder="0.10"
                className="bg-transparent w-full text-white text-lg font-semibold outline-none placeholder:text-text-muted disabled:opacity-50"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleHalf}
                disabled={inputsDisabled}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ½
              </button>
              <button
                onClick={handleDouble}
                disabled={inputsDisabled}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                2×
              </button>
              <button
                onClick={handleMax}
                disabled={inputsDisabled}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Max
              </button>
            </div>
          </div>
        </div>

        {/* Mine Count */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-secondary">
            Mines ({minesCount})
          </label>
          <div className="flex gap-2 flex-wrap">
            {MINE_PRESETS.filter((p) => p <= maxMines).map((preset) => (
              <button
                key={preset}
                onClick={() => handleSelectMines(preset)}
                disabled={inputsDisabled}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  minesCount === preset
                    ? "bg-primary text-white"
                    : "bg-white/10 hover:bg-white/20 text-text-secondary"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Size */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-secondary">Grid Size</label>
          <div className="flex gap-2">
            {GRID_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => handleSelectGridSize(size)}
                disabled={inputsDisabled}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  gridSize === size
                    ? "bg-primary text-white"
                    : "bg-white/10 hover:bg-white/20 text-text-secondary"
                }`}
              >
                {size}×{size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {showNewGameButton ? (
            <button
              onClick={onNewGame}
              className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-primary hover:shadow-glow-primary transition-all flex items-center justify-center gap-2"
            >
              New Game
            </button>
          ) : (
            <>
              <button
                onClick={onPlaceBet}
                disabled={!canStart || isStarting}
                className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-primary hover:shadow-glow-primary disabled:bg-gradient-primary-disabled disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center gap-2"
              >
                {isStarting ? "Placing Bet..." : "Place Bet"}
              </button>

              <button
                onClick={handleCashout}
                disabled={!canCashout || isCashingOut}
                className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-secondary hover:shadow-glow-secondary disabled:bg-gradient-secondary-disabled disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center gap-2 text-background-dark"
              >
                {isCashingOut ? "Cashing Out..." : "Cashout"}
              </button>
            </>
          )}
        </div>

        {/* Current Game Info */}
        {isActive && (gameState?.revealedTiles?.length ?? 0) > 0 && (
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">
                Current Multiplier:
              </span>
              <span className="text-success font-bold text-lg">
                {(gameState?.currentMultiplier ?? 1).toFixed(2)}×
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">
                Current Value:
              </span>
              <span className="text-success font-bold text-lg">
                ${(gameState?.currentValue ?? 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">
                Tiles Revealed:
              </span>
              <span className="text-white font-medium">
                {gameState?.revealedTiles?.length ?? 0} /{" "}
                {(gameState?.totalTiles ?? 0) - (gameState?.minesCount ?? 0)}
              </span>
            </div>
          </div>
        )}

        {/* Cashout Result */}
        {cashoutResult && (
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">Win Amount:</span>
              <span className="text-success font-bold text-lg">
                ${cashoutResult.winAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">Multiplier:</span>
              <span className="text-success font-bold text-lg">
                {cashoutResult.multiplier.toFixed(2)}×
              </span>
            </div>
          </div>
        )}

        {/* Game Over */}
        {isGameOver && !cashoutResult && (
          <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
            <p className="text-error font-bold text-center text-lg">
              You hit a mine!
            </p>
            <p className="text-text-secondary text-center text-sm">
              Better luck next time
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

MinesConfig.displayName = "MinesConfig";
