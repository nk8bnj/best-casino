"use client";

import { useCallback } from "react";
import { useMinesStore } from "@/store/mines.store";
import { useCurrentUser } from "@/hooks/api/useCurrentUser";
import { MinesGameStatus } from "@/types/mines.types";
import { minesApi } from "@/lib/api/mines.api";
import {
  useMinesActive,
  useMinesStart,
  useMinesReveal,
  useMinesCashout,
} from "./useMinesGame";

export function useMinesActions() {
  const gameState = useMinesStore((state) => state.gameState);
  const setGameState = useMinesStore((state) => state.setGameState);
  const setIsGameOver = useMinesStore((state) => state.setIsGameOver);
  const setRevealedMinePosition = useMinesStore(
    (state) => state.setRevealedMinePosition
  );
  const setCashoutResult = useMinesStore((state) => state.setCashoutResult);
  const setMinePositions = useMinesStore((state) => state.setMinePositions);
  const setMinesCount = useMinesStore((state) => state.setMinesCount);
  const setGridSize = useMinesStore((state) => state.setGridSize);
  const { data: userData } = useCurrentUser();
  const { data: activeGame, isLoading: isActiveLoading } = useMinesActive();

  const startMutation = useMinesStart();
  const revealMutation = useMinesReveal();
  const cashoutMutation = useMinesCashout();

  const restoreActiveGame = useCallback(async () => {
    try {
      const game = await minesApi.getActive();
      if (game?.gameId) {
        setGameState({
          ...game,
          status: game.status ?? MinesGameStatus.ACTIVE,
        });
        setMinesCount(game.minesCount);
        setGridSize(game.gridSize);
        setIsGameOver(false);
        setRevealedMinePosition(null);
        setCashoutResult(null);
        setMinePositions([]);
      }
    } catch {
      // ignore
    }
  }, [
    setGameState,
    setMinesCount,
    setGridSize,
    setIsGameOver,
    setRevealedMinePosition,
    setCashoutResult,
    setMinePositions,
  ]);

  const handleStartGame = useCallback(
    async (betAmount: number, minesCount: number, gridSize: number) => {
      if (gameState?.status === MinesGameStatus.ACTIVE || activeGame?.gameId) {
        restoreActiveGame();
        return;
      }

      if (userData && userData.balance < betAmount) {
        console.error("Insufficient balance");
        return;
      }

      // Clear previous game state
      setIsGameOver(false);
      setRevealedMinePosition(null);
      setCashoutResult(null);
      setMinePositions([]);

      try {
        const data = await startMutation.mutateAsync({
          amount: betAmount,
          minesCount,
          gridSize,
        });
        setGameState({
          gameId: data.gameId,
          amount: data.amount,
          minesCount: data.minesCount,
          gridSize: data.gridSize,
          totalTiles: data.totalTiles,
          serverSeedHash: data.serverSeedHash,
          multipliers: data.multipliers,
          revealedTiles: [],
          currentMultiplier: 1,
          currentValue: data.amount,
          safeTilesLeft: data.totalTiles - data.minesCount,
          status: MinesGameStatus.ACTIVE,
        });
      } catch {
        // Server says active game exists — fetch and restore it
        restoreActiveGame();
      }
    },
    [
      startMutation,
      setGameState,
      setIsGameOver,
      setRevealedMinePosition,
      setCashoutResult,
      setMinePositions,
      userData,
      gameState?.status,
      activeGame,
      restoreActiveGame,
    ]
  );

  const handleReveal = (position: number) => {
    if (!gameState?.gameId || revealMutation.isPending) return;

    revealMutation.mutate(
      { gameId: gameState.gameId, position },
      {
        onSuccess: (data) => {
          if (data.isMine) {
            setRevealedMinePosition(data.position);
            setIsGameOver(true);
            if (data.minePositions) {
              setMinePositions(data.minePositions);
            }
            setGameState((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                revealedTiles: data.revealedTiles,
                status: MinesGameStatus.LOST,
              };
            });
          } else {
            setGameState((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                revealedTiles: data.revealedTiles,
                currentMultiplier: data.currentMultiplier,
                currentValue: data.currentValue,
                safeTilesLeft: data.safeTilesLeft,
              };
            });
          }
        },
        onError: (error) => {
          console.error("[MinesActions] Reveal error:", error);
        },
      }
    );
  };

  const handleCashout = () => {
    if (!gameState?.gameId || cashoutMutation.isPending) return;

    cashoutMutation.mutate(
      { gameId: gameState.gameId },
      {
        onSuccess: (data) => {
          setCashoutResult(data);
          setMinePositions(data.minePositions);
          setGameState((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              currentMultiplier: data.multiplier,
              currentValue: data.winAmount,
              status: MinesGameStatus.CASHED_OUT,
            };
          });
        },
        onError: (error) => {
          console.error("[MinesActions] Cashout error:", error);
        },
      }
    );
  };

  const isActive = gameState?.status === MinesGameStatus.ACTIVE;
  const hasServerActiveGame = !!activeGame?.gameId;
  const canStart =
    !startMutation.isPending &&
    !isActive &&
    !hasServerActiveGame &&
    !isActiveLoading;
  const canReveal = !revealMutation.isPending && isActive;
  const canCashout =
    !cashoutMutation.isPending &&
    isActive &&
    (gameState?.revealedTiles?.length ?? 0) > 0;

  return {
    handleStartGame,
    handleReveal,
    handleCashout,
    canStart,
    canReveal,
    canCashout,
    isStarting: startMutation.isPending,
    isRevealing: revealMutation.isPending,
    isCashingOut: cashoutMutation.isPending,
  };
}
