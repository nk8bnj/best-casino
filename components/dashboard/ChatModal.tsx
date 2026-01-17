"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useUIStore } from "@/store/ui.store";
import { CloseIcon } from "@/components/icons";
import { ChatStatsBar } from "./ChatStatsBar";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import type {
  ChatMessage as ChatMessageType,
  ChatStats,
} from "@/types/dashboard.types";

interface ChatModalProps {
  messages: ChatMessageType[];
  stats: ChatStats;
}

export function ChatModal({ messages, stats }: ChatModalProps) {
  const { isChatOpen, closeChat } = useUIStore();

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isChatOpen) {
        closeChat();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isChatOpen, closeChat]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isChatOpen]);

  if (!isChatOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeChat}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md h-[85vh] rounded-t-[32px] flex flex-col animate-slide-up bg-[radial-gradient(120%_120%_at_50%_0%,#2c2e5a_0%,#202045_35%,#191937_70%,#15152f_100%)] shadow-[0_20px_50px_rgba(8,7,23,0.6)] ring-1 ring-white/5"
        style={{
          animation: "slideUp 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <button
            onClick={closeChat}
            className="touch-target flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
          <Image
            src="/assets/live-chat-logo.svg"
            alt="Live chat"
            width={120}
            height={24}
            className="h-6 mx-auto"
          />
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
        <div className="mx-auto h-px w-[78%] bg-linear-to-r from-transparent via-white/40 to-transparent" />

        {/* Stats */}
        <ChatStatsBar stats={stats} />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 pt-2 scrollbar-hide space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>

        {/* Input */}
        <div className="px-2 pb-4">
          <ChatInput />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
