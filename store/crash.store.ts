import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CrashCurrentGameResponse } from "@/types/crash.types";

export interface LastCashout {
  multiplier: number;
  amount: number;
  winAmount: number;
}

interface CrashStore {
  // Game state
  gameState: CrashCurrentGameResponse | null;
  setGameState: (
    state:
      | CrashCurrentGameResponse
      | null
      | ((
          prev: CrashCurrentGameResponse | null
        ) => CrashCurrentGameResponse | null)
  ) => void;

  // Last cashout
  lastCashout: LastCashout | null;
  setLastCashout: (data: LastCashout | null) => void;

  // Betting
  betAmount: number;
  displayValue: string;
  setBetAmount: (amount: number) => void;
  setDisplayValue: (value: string) => void;

  // Auto cashout
  autoCashoutEnabled: boolean;
  autoCashoutValue: number;
  autoCashoutDisplay: string;
  setAutoCashoutEnabled: (enabled: boolean) => void;
  setAutoCashoutValue: (value: number) => void;
  setAutoCashoutDisplay: (display: string) => void;
  toggleAutoCashout: () => void;

  // Quick bet actions
  handleHalf: () => void;
  handleDouble: () => void;
  handleMax: () => void;
  reset: () => void;
}

export const useCrashStore = create<CrashStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      gameState: null,
      lastCashout: null,
      betAmount: 10,
      displayValue: "10.00",
      autoCashoutEnabled: false,
      autoCashoutValue: 0,
      autoCashoutDisplay: "",

      // Game state actions
      setGameState: (state) => {
        set((prev) => ({
          gameState:
            typeof state === "function" ? state(prev.gameState) : state,
        }));
      },

      setLastCashout: (data) => set({ lastCashout: data }),

      // Betting actions
      setBetAmount: (amount) => set({ betAmount: amount }),
      setDisplayValue: (value) => set({ displayValue: value }),

      // Auto cashout actions
      setAutoCashoutEnabled: (enabled) => set({ autoCashoutEnabled: enabled }),
      setAutoCashoutValue: (value) => set({ autoCashoutValue: value }),
      setAutoCashoutDisplay: (display) => set({ autoCashoutDisplay: display }),

      toggleAutoCashout: () =>
        set((state) => ({
          autoCashoutEnabled: !state.autoCashoutEnabled,
        })),

      // Quick bet actions
      handleHalf: () => {
        const { betAmount } = get();
        const newAmount = Math.max(0.1, betAmount / 2);
        set({
          betAmount: newAmount,
          displayValue: newAmount.toFixed(2),
        });
      },

      handleDouble: () => {
        const { betAmount } = get();
        const newAmount = Math.min(10000, betAmount * 2);
        set({
          betAmount: newAmount,
          displayValue: newAmount.toFixed(2),
        });
      },

      handleMax: () => {
        set({
          betAmount: 10000,
          displayValue: "10000.00",
        });
      },

      reset: () =>
        set({
          betAmount: 10,
          displayValue: "10.00",
          autoCashoutEnabled: false,
          autoCashoutValue: 0,
          autoCashoutDisplay: "",
          lastCashout: null,
        }),
    }),
    { name: "CrashStore" }
  )
);
