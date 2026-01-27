"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChatStatsBar } from "./ChatStatsBar";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import type {
  ChatMessage as ChatMessageType,
  ChatStats,
} from "@/types/dashboard.types";
import type { ChatMessageWithType } from "@/types/chat.types";

interface ChatSidebarProps {
  messages: (ChatMessageType | ChatMessageWithType)[];
  stats: ChatStats;
  isConnected?: boolean;
  isConnecting?: boolean;
  connectionError?: string | null;
  onSendMessage?: (message: string) => void;
}

export function ChatSidebar({
  messages,
  stats,
  isConnected,
  isConnecting,
  connectionError,
  onSendMessage,
}: ChatSidebarProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

      {/* Connection Status */}
      {(isConnecting || connectionError) && (
        <div className="px-4 py-2 text-center">
          {isConnecting && (
            <span className="text-xs text-yellow-400">Connecting...</span>
          )}
          {connectionError && (
            <span className="text-xs text-red-400">{connectionError}</span>
          )}
        </div>
      )}

      {/* Stats */}
      <ChatStatsBar stats={stats} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pl-8 pr-1 pt-4 scrollbar-hide space-y-2">
        {messages.length === 0 && isConnected && (
          <div className="text-center text-white/50 text-sm py-8">
            No messages yet. Be the first to say hello!
          </div>
        )}
        {messages.map((message, index) => (
          <ChatMessage key={message.id || `msg-${index}`} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="mt-4">
        <ChatInput onSend={onSendMessage} disabled={!isConnected} />
      </div>
    </div>
  );
}
