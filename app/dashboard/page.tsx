"use client";

import {
  DashboardHeader,
  SideDrawer,
  GamesSection,
  LeaderboardSection,
  ChatFAB,
  ChatModal,
  ChatSidebar,
} from "@/components/dashboard";
import type {
  Game,
  LeaderboardPlayer,
  ChatMessage,
  ChatStats,
} from "@/types/dashboard.types";

// Mock data for games
const mockGames: Game[] = [
  {
    id: "1",
    name: "Crash",
    slug: "crash",
    description: "Watch the multiplier rise and cash out before it's gone",
    thumbnail: "",
    tag: "top",
  },
  {
    id: "2",
    name: "Case",
    slug: "case",
    description: "Open cases and win random rewards",
    thumbnail: "",
    tag: "popular",
  },
  {
    id: "3",
    name: "Mines",
    slug: "mines",
    description: "Avoid the mines and collect bigger rewards",
    thumbnail: "",
    tag: "hot",
  },
  {
    id: "4",
    name: "Plinko",
    slug: "plinko",
    description: "Drop the ball, watch it bounce, and win prizes",
    thumbnail: "",
    tag: "new",
  },
];

// Mock data for leaderboard (8 players for desktop)
const mockPlayers: LeaderboardPlayer[] = [
  {
    id: "1",
    username: "LuckyStrike",
    gamesPlayed: 250,
    coins: 5000,
    winRate: 53,
    rank: 1,
  },
  {
    id: "2",
    username: "MoonShot",
    gamesPlayed: 180,
    coins: 4200,
    winRate: 58,
    rank: 2,
  },
  {
    id: "3",
    username: "BetBeast",
    gamesPlayed: 150,
    coins: 3800,
    winRate: 65,
    rank: 3,
  },
  {
    id: "4",
    username: "CashMaster",
    gamesPlayed: 100,
    coins: 2900,
    winRate: 56,
    rank: 4,
  },
  {
    id: "5",
    username: "WinStreak",
    gamesPlayed: 90,
    coins: 2500,
    winRate: 57,
    rank: 5,
  },
  {
    id: "6",
    username: "RocketKing",
    gamesPlayed: 80,
    coins: 2100,
    winRate: 58,
    rank: 6,
  },
  {
    id: "7",
    username: "DiamondHand",
    gamesPlayed: 70,
    coins: 1900,
    winRate: 58,
    rank: 7,
  },
  {
    id: "8",
    username: "Max Carter",
    gamesPlayed: 10,
    coins: 1000,
    winRate: 20,
    rank: 8,
  },
];

// Mock data for chat
const mockMessages: ChatMessage[] = [
  {
    id: "1",
    userId: "u1",
    username: "Mia Storm",
    content:
      'Hello! Is the live roulette available right now? It says "connecting"',
    timestamp: "15:35",
    vipLevel: 1,
  },
  {
    id: "2",
    userId: "u2",
    username: "Mia Storm",
    content:
      'Hello! Is the live roulette available right now? It says "connecting"',
    timestamp: "15:35",
    vipLevel: 3,
  },
  {
    id: "3",
    userId: "u3",
    username: "Mia Storm",
    content:
      'Hello! Is the live roulette available right now? It says "connecting"',
    timestamp: "15:35",
    vipLevel: 2,
  },
  {
    id: "4",
    userId: "u4",
    username: "Mia Storm",
    content:
      'Hello! Is the live roulette available right now? It says "connecting"',
    timestamp: "15:35",
    vipLevel: 5,
  },
];

const mockChatStats: ChatStats = {
  online: 250,
  friends: 48,
  playing: 54,
};

// Current user ID for highlighting in leaderboard
const CURRENT_USER_ID = "8";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader balance="10.000" />

      {/* Side Drawer - mobile only */}
      <SideDrawer />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-8 pb-24 xl:pb-8">
        {/* Mobile Layout: Stacked (< 768px) */}
        <div className="md:hidden">
          <GamesSection games={mockGames} />
          <LeaderboardSection
            players={mockPlayers.slice(0, 3)}
            currentUserId={CURRENT_USER_ID}
          />
        </div>

        {/* Tablet Layout: Two Columns (768px - 1280px) */}
        <div className="hidden md:grid md:grid-cols-[240px_1fr] md:gap-6 md:py-6 xl:hidden">
          {/* Left Column: Leaderboard */}
          <aside>
            <LeaderboardSection
              players={mockPlayers.slice(0, 5)}
              currentUserId={CURRENT_USER_ID}
            />
          </aside>

          {/* Right Column: Games */}
          <section>
            <GamesSection games={mockGames} />
          </section>
        </div>

        {/* Desktop Layout: Three Columns (1280px+) */}
        <div className="hidden xl:grid xl:grid-cols-[280px_1fr_300px] xl:gap-12 xl:py-6">
          {/* Left Column: Leaderboard */}
          <aside>
            <LeaderboardSection
              players={mockPlayers}
              currentUserId={CURRENT_USER_ID}
            />
          </aside>

          {/* Center Column: Games */}
          <section>
            <GamesSection games={mockGames} />
          </section>

          {/* Right Column: Chat */}
          <aside className="rounded-[28px] h-[calc(100vh-120px)]">
            <ChatSidebar messages={mockMessages} stats={mockChatStats} />
          </aside>
        </div>
      </main>

      {/* Chat FAB - mobile and tablet */}
      <div className="xl:hidden">
        <ChatFAB />
      </div>

      {/* Chat Modal - mobile and tablet */}
      <div className="xl:hidden">
        <ChatModal messages={mockMessages} stats={mockChatStats} />
      </div>
    </div>
  );
}
