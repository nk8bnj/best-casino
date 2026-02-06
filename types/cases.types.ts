// Cases (Lootbox) Game Types

export type ItemRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

export const enum CaseGamePhase {
  IDLE = "idle",
  SPINNING = "spinning",
  REVEALING = "revealing",
  RESULT = "result",
}

export type OpeningCount = 1 | 2 | 3 | 4 | 5 | 10;

// API response types
export interface CaseItem {
  id: string;
  name: string;
  imageUrl: string;
  rarity: ItemRarity;
  price: number;
  chance: number;
}

export interface CaseItemOpenResponse {
  id: string;
  name: string;
  image: string;
  rarity: ItemRarity;
  price: number;
  chance: number;
}

export interface CaseSummary {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
}

export interface CaseDetailResponse {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  items: CaseItem[];
}

export interface CasesListResponse {
  cases: CaseSummary[];
}

export interface CaseOpenRequest {
  clientSeed?: string;
}

export interface CaseOpenResponse {
  id: string;
  item: CaseItemOpenResponse;
  updatedBalance: number;
}

export interface CaseHistoryItem {
  id: string;
  caseId: string;
  caseName: string;
  item: CaseItem;
  openedAt: string;
  cost: number;
}

export interface CaseHistoryResponse {
  history: CaseHistoryItem[];
}

export interface CaseHistoryQueryParams {
  limit?: number;
  offset?: number;
}

// Roulette animation types
export interface RouletteItem {
  id: string;
  name: string;
  imageUrl: string;
  rarity: ItemRarity;
  price: number;
}

// Rarity color maps
export const RARITY_COLORS: Record<ItemRarity, string> = {
  Common: "#b0b0b0",
  Uncommon: "#4fc3f7",
  Rare: "#7c4dff",
  Epic: "#ff4081",
  Legendary: "#ffd740",
};

export const RARITY_BG_COLORS: Record<ItemRarity, string> = {
  Common: "rgba(176, 176, 176, 0.15)",
  Uncommon: "rgba(79, 195, 247, 0.15)",
  Rare: "rgba(124, 77, 255, 0.15)",
  Epic: "rgba(255, 64, 129, 0.15)",
  Legendary: "rgba(255, 215, 64, 0.15)",
};
