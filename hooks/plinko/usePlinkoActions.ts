"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePlinkoStore } from "@/store/plinko.store";
import { useCurrentUser } from "@/hooks/api/useCurrentUser";
import { plinkoApi, PLINKO_QUERY_KEYS } from "@/lib/api/plinko.api";
import { QUERY_KEYS } from "@/lib/api/endpoints";
import type {
  AnimatingBall,
  PlinkoDropResponse,
  PlinkoHistoryResponse,
} from "@/types/plinko.types";

export function usePlinkoActions() {
  const { data: userData } = useCurrentUser();
  const queryClient = useQueryClient();

  const handleDrop = useCallback(() => {
    const { betAmount, balls, risk, lines, isDropping } =
      usePlinkoStore.getState();

    if (isDropping) return;

    const totalBet = betAmount * balls;
    if (userData && userData.balance < totalBet) {
      console.error("Insufficient balance");
      return;
    }

    usePlinkoStore.getState().setIsDropping(true);
    usePlinkoStore.getState().setLastResult(null);

    const onAllDone = (data?: PlinkoDropResponse) => {
      // Optimistically prepend the new game to history cache
      if (data) {
        const avgMultiplier =
          data.drops.reduce((sum, d) => sum + d.multiplier, 0) /
          data.drops.length;

        const optimisticEntry = {
          _id: "optimistic-" + Date.now(),
          betAmount,
          ballsCount: balls,
          riskLevel: risk,
          linesCount: lines,
          totalWin: data.totalWin,
          avgMultiplier,
          status: (data.totalWin > data.totalBet ? "won" : "lost") as
            | "won"
            | "lost",
          createdAt: new Date().toISOString(),
        };

        queryClient.setQueryData<PlinkoHistoryResponse>(
          PLINKO_QUERY_KEYS.history({ limit: 10, offset: 0 }),
          (old) => ({
            drops: [optimisticEntry, ...(old?.drops ?? [])].slice(0, 10),
          })
        );
      }

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
      });
      usePlinkoStore.getState().setIsDropping(false);

      // Still refetch history from server to replace optimistic data
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: PLINKO_QUERY_KEYS.base,
        });
      }, 10000);
    };

    plinkoApi
      .drop({ amount: betAmount, balls, risk, lines })
      .then((data) => {
        usePlinkoStore.getState().setLastResult(data);

        // Watch for all balls to finish animating
        let ballsAddedCount = 0;
        const unsubscribe = usePlinkoStore.subscribe((state) => {
          if (
            ballsAddedCount === data.drops.length &&
            state.activeBalls.length === 0
          ) {
            unsubscribe();
            onAllDone(data);
          }
        });

        // Stagger adding balls with 250ms delays for visual effect
        data.drops.forEach((drop, i) => {
          setTimeout(() => {
            const ball: AnimatingBall = {
              id: drop.dropId,
              path: drop.path,
              currentRow: 0,
              progress: 0,
              slotIndex: drop.slotIndex,
              multiplier: drop.multiplier,
              winAmount: drop.winAmount,
              done: false,
            };
            usePlinkoStore.getState().addActiveBall(ball);
            ballsAddedCount++;
          }, i * 250);
        });
      })
      .catch((error) => {
        console.error("[PlinkoActions] Drop error:", error);
        onAllDone();
      });
  }, [userData, queryClient]);

  return {
    handleDrop,
    isDropping: usePlinkoStore.getState().isDropping,
  };
}
