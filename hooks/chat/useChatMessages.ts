"use client";

import { useChatStore } from "@/store/chat.store";

/**
 * Hook to select chat messages and connection state from the store.
 */
export function useChatMessages() {
  const messages = useChatStore((state) => state.messages);
  const isConnected = useChatStore((state) => state.isConnected);
  const isConnecting = useChatStore((state) => state.isConnecting);
  const connectionError = useChatStore((state) => state.connectionError);
  const activeRoom = useChatStore((state) => state.activeRoom);
  const currentUserId = useChatStore((state) => state.currentUserId);

  return {
    messages,
    isConnected,
    isConnecting,
    connectionError,
    activeRoom,
    currentUserId,
  };
}
