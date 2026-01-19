"use client";

import { useState } from "react";
import Image from "next/image";

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
    <form
      onSubmit={handleSubmit}
      className="flex justify-between items-center gap-3 py-3"
    >
      <div className="flex-1 flex items-center bg-[#7c7ce8]/33 text-white rounded-full px-5 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message..."
          className="w-full flex-1 bg-transparent text-white placeholder-white/50 text-sm focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={!message.trim()}
        aria-label="Send message"
      >
        <Image
          src="/assets/send-message.svg"
          alt="Send"
          width={44}
          height={44}
        />
      </button>
    </form>
  );
}
