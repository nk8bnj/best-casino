import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  MinesActiveGame,
  MinesCashoutResponse,
} from "@/types/mines.types";

interface MinesStore {
  // Game state
  gameState: MinesActiveGame | null;
  setGameState: (
    state:
      | MinesActiveGame
      | null
      | ((prev: MinesActiveGame | null) => MinesActiveGame | null)
  ) => void;

  // Game over state
  isGameOver: boolean;
  setIsGameOver: (value: boolean) => void;
  revealedMinePosition: number | null;
  setRevealedMinePosition: (position: number | null) => void;

  // Cashout result (shows mine positions after cashout)
  cashoutResult: MinesCashoutResponse | null;
  setCashoutResult: (result: MinesCashoutResponse | null) => void;

  // Betting
  betAmount: number;
  displayValue: string;
  setBetAmount: (amount: number) => void;
  setDisplayValue: (value: string) => void;

  // Mine count
  minesCount: number;
  setMinesCount: (count: number) => void;

  // Grid size
  gridSize: number;
  setGridSize: (size: number) => void;

  // Quick bet actions
  handleHalf: () => void;
  handleDouble: () => void;
  handleMax: () => void;

  // Reset
  reset: () => void;
}

export const useMinesStore = create<MinesStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      gameState: null,
      isGameOver: false,
      revealedMinePosition: null,
      cashoutResult: null,
      betAmount: 10,
      displayValue: "10.00",
      minesCount: 3,
      gridSize: 5,

      // Game state actions
      setGameState: (state) => {
        set((prev) => ({
          gameState:
            typeof state === "function" ? state(prev.gameState) : state,
        }));
      },

      setIsGameOver: (value) => set({ isGameOver: value }),
      setRevealedMinePosition: (position) =>
        set({ revealedMinePosition: position }),
      setCashoutResult: (result) => set({ cashoutResult: result }),

      // Betting actions
      setBetAmount: (amount) => set({ betAmount: amount }),
      setDisplayValue: (value) => set({ displayValue: value }),

      // Mine count
      setMinesCount: (count) => set({ minesCount: count }),

      // Grid size
      setGridSize: (size) => set({ gridSize: size }),

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
          gameState: null,
          isGameOver: false,
          revealedMinePosition: null,
          cashoutResult: null,
          betAmount: 10,
          displayValue: "10.00",
          minesCount: 3,
          gridSize: 5,
        }),
    }),
    { name: "MinesStore" }
  )
);
