export interface Game {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  tag?: "top" | "popular" | "hot" | "new";
}

export interface LeaderboardPlayer {
  username: string;
  avatar?: string;
  gamesPlayed: number;
  totalWagered: number;
  winRate: number;
  rank: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  timestamp: string;
  vipLevel?: number;
}

export interface ChatStats {
  online: number;
  friends: number;
  playing: number;
}

export interface DrawerMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}
