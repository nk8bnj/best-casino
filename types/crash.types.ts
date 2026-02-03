// Crash Game Types

export interface CrashBetRequest {
  amount: number;
  autoCashout?: number;
}

export interface CrashBetResponse {
  betId: string;
  amount: number;
  gameId: string;
}

export interface CrashCashoutRequest {
  betId: string;
}

export interface CrashCashoutResponse {
  multiplier: number;
  winAmount: number;
}

export const enum CrashGameStatus {
  WAITING = "waiting",
  RUNNING = "running",
  CRASHED = "crashed",
}

export interface MyBet {
  betId: string;
  amount: number;
}

export interface CrashCurrentGameResponse {
  gameId: string;
  state: CrashGameStatus;
  multiplier?: number;
  serverSeedHash: string;
  myBet?: MyBet;
}

export interface CrashGameHistoryItem {
  gameId: string;
  crashPoint: number;
  hash: string;
  seed: string;
}

export interface CrashGameHistoryResponse {
  games: CrashGameHistoryItem[];
}

export interface CrashBetHistoryItem {
  betId: string;
  gameId: string;
  amount: number;
  cashoutMultiplier?: number;
  winAmount?: number;
  status: "won" | "lost";
  crashPoint: number;
  createdAt: string;
}

export interface CrashBetHistoryResponse {
  bets: CrashBetHistoryItem[];
}

export interface HistoryQueryParams {
  limit?: number;
  offset?: number;
}

export const enum CrashBetResult {
  WON = "won",
  LOST = "lost",
}

// Animation Types
export interface Star {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
  color: string;
}

export interface Sparkle {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
  color: string;
}

export interface Planet {
  x: number;
  y: number;
  radius: number;
  vx: number;
  rot: number;
  rotSpeed: number;
  alpha: number;
  phase: "in" | "stable" | "out";
  life: number;
  maxLife: number;
  type: {
    colors: string[];
    ring: boolean;
    bands: boolean;
  };
}

export interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export const PLANET_TYPES = [
  { colors: ["#4fd1c5", "#319795", "#1a535c"], ring: false, bands: true },
  { colors: ["#f6ad55", "#dd6b20", "#9c4221"], ring: true, bands: false },
  { colors: ["#9f7aea", "#805ad5", "#553c9a"], ring: false, bands: false },
  { colors: ["#fc8181", "#e53e3e", "#9b2c2c"], ring: false, bands: true },
  { colors: ["#68d391", "#38a169", "#276749"], ring: true, bands: true },
  { colors: ["#faf089", "#d69e2e", "#975a16"], ring: false, bands: false },
  { colors: ["#90cdf4", "#4299e1", "#2b6cb0"], ring: true, bands: false },
];

// Socket Event Types
export interface GameTickData {
  gameId: string;
  multiplier: number;
  elapsed: number;
}

export interface GameCrashData {
  gameId: string;
  crashPoint: number;
  serverSeed: string;
  reveal: string;
}
