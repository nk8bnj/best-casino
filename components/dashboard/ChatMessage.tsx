"use client";

import Image from "next/image";
import type { ChatMessage as ChatMessageType } from "@/types/dashboard.types";
import type { ChatMessageWithType } from "@/types/chat.types";
import { VIPBadge } from "./VIPBadge";

interface ChatMessageProps {
  message: ChatMessageType | ChatMessageWithType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const messageType = (message as ChatMessageWithType).type;

  // System message styling for join/leave events
  if (messageType === "join" || messageType === "leave") {
    return (
      <div className="flex justify-center py-2">
        <div className="px-4 py-2 rounded-full bg-white/5 text-white/50 text-xs">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-3 overflow-visible">
      {/* Avatar - positioned absolute, overlapping top-left */}
      <div className="absolute -top-2 -left-7 flex items-center justify-center z-10 w-14 h-14 shrink-0">
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#f3b24d] bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_8px_4px_rgba(255,184,77,0.7)]">
          {message.avatar ? (
            <Image
              src={message.avatar}
              alt={message.username || "User"}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-base">
              {(message.username || "?").charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Message Card */}
      <div className="rounded-md bg-[#2a2a47]/80 pl-4 pr-4 pb-4 pt-4 shadow-blue border-0">
        <div className="flex items-center gap-3 border-b border-white/50 pb-2">
          <VIPBadge level={message.vipLevel ?? 1} />
          <span className="text-white font-semibold text-base">
            {message.username || "Anonymous"}
          </span>
          <span className="ml-auto text-white/55 text-[14px]">
            {message.timestamp}
          </span>
        </div>
        <p className="text-white/70 text-md leading-relaxed mt-3">
          {message.content}
        </p>
      </div>
    </div>
  );
}
