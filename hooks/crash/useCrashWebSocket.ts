"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { crashSocketService } from "@/lib/socket/crash";
import { crashApi, CRASH_QUERY_KEYS } from "@/lib/api/crash.api";
import { QUERY_KEYS } from "@/lib/api/endpoints";
import { useCrashStore } from "@/store/crash.store";
import { tokenStorageService } from "@/lib/utils/token";
import { useAuthStore } from "@/store/auth.store";
import {
  CrashGameStatus,
  type CrashCurrentGameResponse,
} from "@/types/crash.types";

export function useCrashWebSocket() {
  const setGameState = useCrashStore((state) => state.setGameState);
  const currentGameIdRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth store to hydrate
    if (!isHydrated) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      console.warn("[CrashWebSocket] User not authenticated");
      return;
    }

    const token = tokenStorageService.get();
    if (!token) {
      console.warn("[CrashWebSocket] No access token");
      // Avoid calling setState synchronously within an effect to prevent cascading renders
       
      setTimeout(
        () => setError("No access token found. Please log in again."),
        0
      );
      return;
    }

    let mounted = true;

    const init = async () => {
      try {
        setError(null);

        // Fetch initial game state
        const initialState = await crashApi.getCurrentGame();
        if (!mounted) return;

        setGameState(initialState);
        currentGameIdRef.current = initialState.gameId;

        // Connect to crash socket
        const crashSocket = crashSocketService.connect();

        // Wait for connection
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Socket connection timeout"));
          }, 10000);

          if (crashSocket?.connected) {
            clearTimeout(timeout);
            resolve();
          } else {
            crashSocket?.once("connect", () => {
              clearTimeout(timeout);
              resolve();
            });
            crashSocket?.once("connect_error", (err) => {
              clearTimeout(timeout);
              reject(err);
            });
          }
        });

        if (!mounted) return;

        setIsConnected(true);

        // Subscribe to the current game
        crashSocketService.subscribeToGame(initialState.gameId);

        // Handle game tick events
        crashSocketService.onGameTick((data) => {
          if (!mounted) return;
          currentGameIdRef.current = data.gameId;

          setGameState({
            gameId: data.gameId,
            multiplier: data.multiplier,
            state: CrashGameStatus.RUNNING,
            serverSeedHash: "",
            myBet: useCrashStore.getState().gameState?.myBet,
          } as CrashCurrentGameResponse);
        });

        // Handle game crash events
        crashSocketService.onGameCrash((data) => {
          if (!mounted) return;
          currentGameIdRef.current = data.gameId;

          setGameState({
            gameId: data.gameId,
            state: CrashGameStatus.CRASHED,
            multiplier: data.crashPoint,
            serverSeedHash: data.serverSeed,
            myBet: undefined,
          } as CrashCurrentGameResponse);

          // Invalidate queries
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
          });
          queryClient.invalidateQueries({
            queryKey: CRASH_QUERY_KEYS.gameHistory(),
          });
          queryClient.invalidateQueries({
            queryKey: CRASH_QUERY_KEYS.betHistory(),
          });

          // Subscribe to next game after delay
          setTimeout(async () => {
            if (!mounted) return;
            try {
              const nextGame = await crashApi.getCurrentGame();

              setGameState(nextGame);
              useCrashStore.getState().setLastCashout(null);
              currentGameIdRef.current = nextGame.gameId;
              crashSocketService.subscribeToGame(nextGame.gameId);
            } catch (err) {
              console.error("[CrashWebSocket] Failed to get next game:", err);
            }
          }, 3000);
        });
      } catch (err) {
        console.error("[CrashWebSocket] Failed to initialize:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to connect to game server");
        }
        setIsConnected(false);
      }
    };

    init();

    return () => {
      mounted = false;
      setIsConnected(false);
      crashSocketService.offCrashEvents();
      crashSocketService.disconnect();
    };
  }, [setGameState, queryClient, isAuthenticated, isHydrated]);

  const gameState = useCrashStore((state) => state.gameState);

  return { gameState, isConnected, error };
}
