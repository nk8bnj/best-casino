"use client";

import { useCallback } from "react";
import { chatSocketService } from "@/lib/socket/chat";

/**
 * Hook providing chat action wrappers.
 */
export function useChatActions() {
  const sendMessage = useCallback((text: string) => {
    chatSocketService.sendMessage(text);
  }, []);

  const joinRoom = useCallback((roomId: string) => {
    chatSocketService.joinRoom(roomId);
  }, []);

  const leaveRoom = useCallback((roomId: string) => {
    chatSocketService.leaveRoom(roomId);
  }, []);

  return {
    sendMessage,
    joinRoom,
    leaveRoom,
  };
}
