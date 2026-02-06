import type {
  CaseItem,
  CaseItemOpenResponse,
  RouletteItem,
} from "@/types/cases.types";

const STRIP_LENGTH = 50;
const WINNER_INDEX = 38;

/**
 * Picks a random item weighted by chance from the case items array.
 */
export function getWeightedRandomItem(items: CaseItem[]): CaseItem {
  const totalWeight = items.reduce((sum, item) => sum + item.chance, 0);
  let random = Math.random() * totalWeight;

  for (const item of items) {
    random -= item.chance;
    if (random <= 0) return item;
  }

  return items[items.length - 1];
}

/**
 * Builds a roulette strip of items with the won item placed at the winner index.
 * The rest of the strip is filled with weighted random items.
 */
export function generateRouletteStrip(
  caseItems: CaseItem[],
  wonItem: CaseItemOpenResponse
): RouletteItem[] {
  const strip: RouletteItem[] = [];

  for (let i = 0; i < STRIP_LENGTH; i++) {
    if (i === WINNER_INDEX) {
      strip.push({
        id: wonItem.id,
        name: wonItem.name,
        imageUrl: wonItem.image,
        rarity: wonItem.rarity,
        price: wonItem.price,
      });
    } else {
      const filler = getWeightedRandomItem(caseItems);
      strip.push({
        id: `${filler.id}-${i}`,
        name: filler.name,
        imageUrl: filler.imageUrl,
        rarity: filler.rarity,
        price: filler.price,
      });
    }
  }

  return strip;
}

/**
 * Formats a date string for display in the history table.
 */
export function formatCaseDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Maps a case index (0-based) to a star rating (1-4).
 */
export function getCaseStarRating(index: number): number {
  return (index % 4) + 1;
}
