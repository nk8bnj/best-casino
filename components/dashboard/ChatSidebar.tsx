"use client";

import Image from "next/image";
import { ChatStatsBar } from "./ChatStatsBar";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import type {
  ChatMessage as ChatMessageType,
  ChatStats,
} from "@/types/dashboard.types";

interface ChatSidebarProps {
  messages: ChatMessageType[];
  stats: ChatStats;
}

export function ChatSidebar({ messages, stats }: ChatSidebarProps) {
  return (
    <div className="relative h-full flex flex-col px-5 pb-5 pt-5 rounded-[28px] overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#2c2e5a_0%,#202045_35%,#191937_70%,#15152f_100%)] shadow-[0_20px_50px_rgba(8,7,23,0.6)] ring-1 ring-white/5">
      {/* Header */}
      <div className="text-center pb-3 pt-1">
        <Image
          src="/assets/live-chat-logo.svg"
          alt="Live chat"
          width={140}
          height={28}
          className="h-7 mx-auto"
        />
      </div>
      <div className="mx-auto h-px w-[78%] bg-linear-to-r from-transparent via-white/40 to-transparent" />

      {/* Stats */}
      <ChatStatsBar stats={stats} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-1 pt-2 scrollbar-hide space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      {/* Input */}
      <div className="mt-4">
        <ChatInput />
      </div>
    </div>
  );
}
