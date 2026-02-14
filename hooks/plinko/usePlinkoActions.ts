"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePlinkoStore } from "@/store/plinko.store";
import { useCurrentUser } from "@/hooks/api/useCurrentUser";
import { plinkoApi, PLINKO_QUERY_KEYS } from "@/lib/api/plinko.api";
import { QUERY_KEYS } from "@/lib/api/endpoints";
import type { AnimatingBall } from "@/types/plinko.types";

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

    let completedAnimations = 0;
    const animDuration = lines * 180 + 500;

    const onAllDone = () => {
      queryClient.invalidateQueries({
        queryKey: PLINKO_QUERY_KEYS.base,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
      });
      usePlinkoStore.getState().setIsDropping(false);
    };

    for (let i = 0; i < balls; i++) {
      setTimeout(() => {
        plinkoApi
          .drop({ amount: betAmount, balls: 1, risk, lines })
          .then((data) => {
            const drop = data.drops[0];
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

            // Wait for this ball's animation to finish before counting it as done
            setTimeout(() => {
              completedAnimations++;
              if (completedAnimations === balls) {
                onAllDone();
              }
            }, animDuration);
          })
          .catch((error) => {
            console.error("[PlinkoActions] Drop error:", error);
            completedAnimations++;
            if (completedAnimations === balls) {
              onAllDone();
            }
          });
      }, i * 250);
    }
  }, [userData, queryClient]);

  return {
    handleDrop,
    isDropping: usePlinkoStore.getState().isDropping,
  };
}
