// Plinko Game Types

import type { HistoryQueryParams } from "./crash.types";

export type PlinkoRisk = "low" | "medium" | "high";
export type PlinkoLines = 8 | 10 | 12 | 14 | 16;
export type PlinkoBalls = 1 | 2 | 5 | 10;

export interface PlinkoDropRequest {
  amount: number;
  balls: PlinkoBalls;
  risk: PlinkoRisk;
  lines: PlinkoLines;
}

export interface PlinkoDrop {
  dropId: string;
  path: number[];
  slotIndex: number;
  multiplier: number;
  winAmount: number;
  serverSeed: string;
  clientSeed: string;
  nonce: number;
}

export interface PlinkoDropResponse {
  drops: PlinkoDrop[];
  totalBet: number;
  totalWin: number;
  newBalance: number;
}

export interface PlinkoMultipliersResponse {
  multipliers: number[];
}

export interface PlinkoHistoryItem {
  _id: string;
  betAmount: number;
  ballsCount: number;
  riskLevel: PlinkoRisk;
  linesCount: PlinkoLines;
  totalWin: number;
  avgMultiplier: number;
  status: "won" | "lost";
  createdAt: string;
}

export interface PlinkoHistoryResponse {
  drops: PlinkoHistoryItem[];
}

// Animation types
export interface AnimatingBall {
  id: string;
  path: number[];
  currentRow: number;
  progress: number;
  slotIndex: number;
  multiplier: number;
  winAmount: number;
  done: boolean;
}

export type { HistoryQueryParams };
