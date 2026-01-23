"use client";

import { useChatSocket } from "@/hooks/chat";

interface ChatProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that initializes the chat socket connection.
 * Wraps children and manages connection lifecycle.
 */
export function ChatProvider({ children }: ChatProviderProps) {
  // Initialize socket connection (waits for user data from persisted auth store)
  useChatSocket();

  return <>{children}</>;
}
