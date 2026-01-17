"use client";

import { useState } from "react";
import { SendIcon } from "@/components/icons";

interface ChatInputProps {
  onSend?: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSend) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 px-3 py-3">
      <div className="flex-1 flex items-center bg-[#2a2a4a]/90 rounded-full px-5 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message..."
          className="w-full bg-transparent text-white placeholder-white/50 text-sm focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={!message.trim()}
        className="w-12 h-12 rounded-full bg-linear-to-br from-[#4c55ff] to-[#7a5bff] flex items-center justify-center text-white disabled:opacity-50 shadow-[0_8px_20px_rgba(89,92,255,0.5)] transition-all"
        aria-label="Send message"
      >
        <SendIcon className="w-5 h-5" />
      </button>
    </form>
  );
}
