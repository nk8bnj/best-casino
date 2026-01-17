"use client";

import Image from "next/image";
import type { ChatMessage as ChatMessageType } from "@/types/dashboard.types";
import { VIPBadge } from "./VIPBadge";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="relative w-12 h-12 shrink-0">
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#ffd36a] via-[#ff9e6e] to-[#ff6b9a] blur-[6px] opacity-60" />
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#f3b24d] bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_8px_24px_rgba(243,178,77,0.35)]">
          {message.avatar ? (
            <Image
              src={message.avatar}
              alt={message.username}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-sm">
              {message.username.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 rounded-2xl bg-[#2a2a47]/80 px-4 pb-4 pt-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {message.vipLevel && <VIPBadge level={message.vipLevel} />}
          <span className="text-white font-semibold text-base">
            {message.username}
          </span>
          <span className="ml-auto text-white/55 text-sm">
            {message.timestamp}
          </span>
        </div>
        <div className="my-3 h-px bg-white/15" />
        <p className="text-white/70 text-sm leading-relaxed">
          {message.content}
        </p>
      </div>
    </div>
  );
}
