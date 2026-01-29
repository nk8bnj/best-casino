"use client";

import { useCallback } from "react";
import { crashApi } from "@/lib/api/crash.api";
import { crashSocketService } from "@/lib/socket/crash";
import { useCrashStore } from "@/store/crash.store";
import { useCurrentUser } from "@/hooks/api/useCurrentUser";
import { useCrash } from "./useCrashGame";

export function useCrashActions() {
  const crash = useCrash();
  const gameState = useCrashStore((state) => state.gameState);
  const setGameState = useCrashStore((state) => state.setGameState);
  const setLastCashout = useCrashStore((state) => state.setLastCashout);
  const { data: userData } = useCurrentUser();

  const handlePlaceBet = useCallback(
    async (betAmount: number, autoCashoutValue?: number) => {
      // userData is now BackendUser directly
      if (userData && userData.balance < betAmount) {
        console.error("Insufficient balance");
        return;
      }

      const betData = {
        amount: betAmount,
        ...(autoCashoutValue && { autoCashout: autoCashoutValue }),
      };

      crash.placeBet(betData, {
        onSuccess: async () => {
          try {
            // Wait a bit for the server to process
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const updatedState = await crashApi.getCurrentGame();

            const currentGameId = useCrashStore.getState().gameState?.gameId;

            if (currentGameId !== updatedState.gameId) {
              crashSocketService.subscribeToGame(updatedState.gameId);
            }

            setGameState(updatedState);
          } catch (error) {
            console.error("[CrashActions] Failed to update state:", error);
          }
        },
        onError: (error) => {
          console.error("[CrashActions] Bet error:", error);
        },
      });
    },
    [crash, setGameState, userData]
  );

  const handleCashout = useCallback(() => {
    if (!gameState?.myBet?.betId || crash.isCashingOut) {
      return;
    }

    const cashoutAmount = gameState.myBet.amount;

    crash.cashout(
      { betId: gameState.myBet.betId },
      {
        onSuccess: (data) => {
          setLastCashout({
            multiplier: data.multiplier,
            amount: cashoutAmount,
            winAmount: data.winAmount,
          });

          setGameState((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              myBet: undefined,
            };
          });
        },
        onError: (error) => {
          console.error("[CrashActions] Cashout error:", error);
        },
      }
    );
  }, [gameState, crash, setGameState, setLastCashout]);

  const canPlaceBet =
    !crash.isPlacingBet &&
    gameState?.state === "waiting" &&
    !gameState?.myBet?.betId;

  const canCashout =
    !crash.isCashingOut &&
    gameState?.state === "running" &&
    !!gameState?.myBet?.betId;

  return {
    handlePlaceBet,
    handleCashout,
    canPlaceBet,
    canCashout,
    isPlacingBet: crash.isPlacingBet,
    isCashingOut: crash.isCashingOut,
  };
}
