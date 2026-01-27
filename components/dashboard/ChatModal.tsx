"use client";

import { useEffect, useRef } from "react";
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
import type { ChatMessageWithType } from "@/types/chat.types";

interface ChatModalProps {
  messages: (ChatMessageType | ChatMessageWithType)[];
  stats: ChatStats;
  isConnected?: boolean;
  isConnecting?: boolean;
  connectionError?: string | null;
  onSendMessage?: (message: string) => void;
}

export function ChatModal({
  messages,
  stats,
  isConnected,
  isConnecting,
  connectionError,
  onSendMessage,
}: ChatModalProps) {
  const { isChatOpen, closeChat } = useUIStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        className="absolute inset-0 bg-black/60"
        onClick={closeChat}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative w-full h-[calc(100dvh-100px)] rounded-t-[16px] flex flex-col animate-slide-up bg-[radial-gradient(120%_120%_at_50%_0%,#2c2e5a_0%,#202045_35%,#191937_70%,#15152f_100%)] shadow-[0_20px_50px_rgba(8,7,23,0.6)]"
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
        <div className="mx-auto h-px w-[100%] bg-linear-to-r from-transparent via-white/40 to-transparent" />

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
        <div className="flex-1 overflow-y-auto pl-10 pr-5 pt-4 scrollbar-hide space-y-2">
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
        <div className="px-2 pb-4">
          <ChatInput onSend={onSendMessage} disabled={!isConnected} />
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
