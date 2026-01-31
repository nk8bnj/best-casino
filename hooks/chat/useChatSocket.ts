"use client";

import { useEffect } from "react";
import { chatSocketService } from "@/lib/socket/chat";
import { useChatStore } from "@/store/chat.store";
import { useAuthStore } from "@/store/auth.store";
import { tokenStorageService } from "@/lib/utils/token";

/**
 * Hook to initialize and manage the chat socket connection.
 * Connects when authenticated AND user data is loaded, disconnects on unmount.
 */
export function useChatSocket() {
  const userId = useAuthStore((state) => state.user?.id);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const setCurrentUserId = useChatStore((state) => state.setCurrentUserId);

  useEffect(() => {
    const token = tokenStorageService.get();

    // Wait for both token AND user data to be available
    if (!token || !userId) {
      return;
    }

    setCurrentUserId(userId);
    chatSocketService.connect(token);

    return () => {
      chatSocketService.disconnect();
    };
  }, [userId, setCurrentUserId, isHydrated]);
}
