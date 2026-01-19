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
    <div className="relative h-full flex flex-col rounded-[28px]">
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
      <div className="mx-auto h-px w-[90%] bg-white/50" />

      {/* Stats */}
      <ChatStatsBar stats={stats} />

      {/* Messages */}
      <div className="pr-1 pt-4 scrollbar-hide space-y-2">
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
