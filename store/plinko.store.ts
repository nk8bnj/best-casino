import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  PlinkoRisk,
  PlinkoLines,
  PlinkoBalls,
  PlinkoDropResponse,
  AnimatingBall,
} from "@/types/plinko.types";

interface PlinkoStore {
  // Betting inputs
  betAmount: number;
  displayValue: string;
  risk: PlinkoRisk;
  lines: PlinkoLines;
  balls: PlinkoBalls;

  // Game state
  isDropping: boolean;
  activeBalls: AnimatingBall[];
  lastResult: PlinkoDropResponse | null;
  selectedMultiplierIndex: number | null;

  // Betting actions
  setBetAmount: (amount: number) => void;
  setDisplayValue: (value: string) => void;
  setRisk: (risk: PlinkoRisk) => void;
  setLines: (lines: PlinkoLines) => void;
  setBalls: (balls: PlinkoBalls) => void;

  // Quick bet actions
  handleHalf: () => void;
  handleDouble: () => void;
  handleMax: () => void;

  // Game actions
  setIsDropping: (dropping: boolean) => void;
  addActiveBall: (ball: AnimatingBall) => void;
  updateActiveBall: (id: string, updates: Partial<AnimatingBall>) => void;
  removeActiveBall: (id: string) => void;
  setLastResult: (result: PlinkoDropResponse | null) => void;
  setSelectedMultiplierIndex: (index: number | null) => void;

  reset: () => void;
}

export const usePlinkoStore = create<PlinkoStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      betAmount: 10,
      displayValue: "10.00",
      risk: "medium",
      lines: 16,
      balls: 1,
      isDropping: false,
      activeBalls: [],
      lastResult: null,
      selectedMultiplierIndex: null,

      // Betting actions
      setBetAmount: (amount) => set({ betAmount: amount }),
      setDisplayValue: (value) => set({ displayValue: value }),
      setRisk: (risk) => set({ risk }),
      setLines: (lines) => set({ lines }),
      setBalls: (balls) => set({ balls }),

      // Quick bet actions
      handleHalf: () => {
        const { betAmount } = get();
        const newAmount = Math.max(0.1, betAmount / 2);
        set({ betAmount: newAmount, displayValue: newAmount.toFixed(2) });
      },

      handleDouble: () => {
        const { betAmount } = get();
        const newAmount = Math.min(10000, betAmount * 2);
        set({ betAmount: newAmount, displayValue: newAmount.toFixed(2) });
      },

      handleMax: () => {
        set({ betAmount: 10000, displayValue: "10000.00" });
      },

      // Game actions
      setIsDropping: (dropping) => set({ isDropping: dropping }),

      addActiveBall: (ball) =>
        set((state) => ({ activeBalls: [...state.activeBalls, ball] })),

      updateActiveBall: (id, updates) =>
        set((state) => ({
          activeBalls: state.activeBalls.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        })),

      removeActiveBall: (id) =>
        set((state) => ({
          activeBalls: state.activeBalls.filter((b) => b.id !== id),
        })),

      setLastResult: (result) => set({ lastResult: result }),
      setSelectedMultiplierIndex: (index) =>
        set({ selectedMultiplierIndex: index }),

      reset: () =>
        set({
          betAmount: 10,
          displayValue: "10.00",
          risk: "medium",
          lines: 16,
          balls: 1,
          isDropping: false,
          activeBalls: [],
          lastResult: null,
          selectedMultiplierIndex: null,
        }),
    }),
    { name: "PlinkoStore" }
  )
);
