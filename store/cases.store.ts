import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  CaseGamePhase,
  type OpeningCount,
  type RouletteItem,
  type CaseOpenResponse,
} from "@/types/cases.types";

interface CasesStore {
  phase: CaseGamePhase;
  selectedCount: OpeningCount;
  skipAnimation: boolean;
  rouletteItems: RouletteItem[];
  winnerIndex: number;
  lastResult: CaseOpenResponse | null;

  setPhase: (phase: CaseGamePhase) => void;
  setSelectedCount: (count: OpeningCount) => void;
  setSkipAnimation: (skip: boolean) => void;
  setRouletteItems: (items: RouletteItem[]) => void;
  setWinnerIndex: (index: number) => void;
  setLastResult: (result: CaseOpenResponse | null) => void;
  reset: () => void;
}

const initialState = {
  phase: CaseGamePhase.IDLE,
  selectedCount: 1 as OpeningCount,
  skipAnimation: false,
  rouletteItems: [] as RouletteItem[],
  winnerIndex: 38,
  lastResult: null as CaseOpenResponse | null,
};

export const useCasesStore = create<CasesStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setPhase: (phase) => set({ phase }),
      setSelectedCount: (count) => set({ selectedCount: count }),
      setSkipAnimation: (skip) => set({ skipAnimation: skip }),
      setRouletteItems: (items) => set({ rouletteItems: items }),
      setWinnerIndex: (index) => set({ winnerIndex: index }),
      setLastResult: (result) => set({ lastResult: result }),
      reset: () => set(initialState),
    }),
    { name: "CasesStore" }
  )
);
