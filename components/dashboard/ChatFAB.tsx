"use client";

import { ChatIcon } from "@/components/icons";
import { useUIStore } from "@/store/ui.store";

export function ChatFAB() {
  const openChat = useUIStore((state) => state.openChat);

  return (
    <button
      onClick={openChat}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-secondary shadow-lg hover:shadow-glow-secondary transition-all flex items-center justify-center z-30"
      aria-label="Open chat"
    >
      <ChatIcon className="w-6 h-6 text-white" />
    </button>
  );
}
