"use client";

import { useCallback } from "react";
import { socketService } from "@/lib/socket";

/**
 * Hook providing chat action wrappers.
 */
export function useChatActions() {
  const sendMessage = useCallback((text: string) => {
    socketService.sendMessage(text);
  }, []);

  const joinRoom = useCallback((roomId: string) => {
    socketService.joinRoom(roomId);
  }, []);

  const leaveRoom = useCallback((roomId: string) => {
    socketService.leaveRoom(roomId);
  }, []);

  return {
    sendMessage,
    joinRoom,
    leaveRoom,
  };
}
