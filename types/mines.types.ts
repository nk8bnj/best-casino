// Mines Game Types

export interface MinesStartRequest {
  amount: number;
  minesCount: number;
  gridSize: number;
  clientSeed?: string;
}

export interface MinesStartResponse {
  gameId: string;
  amount: number;
  minesCount: number;
  gridSize: number;
  totalTiles: number;
  serverSeedHash: string;
  multipliers: number[];
}

export interface MinesRevealRequest {
  gameId: string;
  position: number;
}

export interface MinesRevealResponse {
  position: number;
  isMine: boolean;
  currentMultiplier: number;
  currentValue: number;
  revealedTiles: number[];
  safeTilesLeft: number;
  gridSize: number;
  totalTiles: number;
}

export interface MinesCashoutRequest {
  gameId: string;
}

export interface MinesCashoutResponse {
  winAmount: number;
  multiplier: number;
  serverSeed: string;
  minePositions: number[];
  gridSize: number;
  totalTiles: number;
}

export enum MinesGameStatus {
  ACTIVE = "active",
  WON = "won",
  LOST = "lost",
  CASHED_OUT = "cashed_out",
}

export interface MinesActiveGame {
  gameId: string;
  amount: number;
  minesCount: number;
  gridSize: number;
  totalTiles: number;
  serverSeedHash: string;
  multipliers: number[];
  revealedTiles: number[];
  currentMultiplier: number;
  currentValue: number;
  safeTilesLeft: number;
  status: MinesGameStatus;
}

export interface MinesHistoryGame {
  gameId: string;
  amount: number;
  minesCount: number;
  gridSize: number;
  multiplier: number;
  winAmount: number;
  status: MinesGameStatus;
  createdAt: string;
}

export interface MinesHistoryResponse {
  games: MinesHistoryGame[];
}

export interface MinesHistoryQueryParams {
  limit?: number;
  offset?: number;
}
