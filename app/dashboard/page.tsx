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
import { ChatProvider } from "@/components/providers/ChatProvider";
import { useChatMessages, useChatActions } from "@/hooks/chat";
import type { Game, ChatStats } from "@/types/dashboard.types";

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

// Mock data for chat stats (could be dynamic in future)
const mockChatStats: ChatStats = {
  online: 250,
  friends: 48,
  playing: 54,
};

function DashboardContent() {
  const { messages, isConnected, isConnecting, connectionError } =
    useChatMessages();
  const { sendMessage } = useChatActions();

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
          <LeaderboardSection maxPlayers={3} />
        </div>

        {/* Tablet Layout: Two Columns (768px - 1280px) */}
        <div className="hidden md:grid md:grid-cols-[240px_1fr] md:gap-6 md:py-6 xl:hidden">
          {/* Left Column: Leaderboard */}
          <aside>
            <LeaderboardSection maxPlayers={5} />
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
            <LeaderboardSection maxPlayers={8} />
          </aside>

          {/* Center Column: Games */}
          <section>
            <GamesSection games={mockGames} />
          </section>

          {/* Right Column: Chat */}
          <aside className="rounded-[28px] h-[calc(100vh-120px)]">
            <ChatSidebar
              messages={messages}
              stats={mockChatStats}
              isConnected={isConnected}
              isConnecting={isConnecting}
              connectionError={connectionError}
              onSendMessage={sendMessage}
            />
          </aside>
        </div>
      </main>

      {/* Chat FAB - mobile and tablet */}
      <div className="xl:hidden">
        <ChatFAB />
      </div>

      {/* Chat Modal - mobile and tablet */}
      <div className="xl:hidden">
        <ChatModal
          messages={messages}
          stats={mockChatStats}
          isConnected={isConnected}
          isConnecting={isConnecting}
          connectionError={connectionError}
          onSendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ChatProvider>
      <DashboardContent />
    </ChatProvider>
  );
}
