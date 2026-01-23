import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ChatStore, ChatMessageWithType } from "@/types/chat.types";

const MAX_MESSAGES = 100;

const initialState = {
  isConnected: false,
  isConnecting: false,
  connectionError: null as string | null,
  messages: [] as ChatMessageWithType[],
  messageIds: new Set<string>(),
  activeRoom: null as string | null,
  rooms: [],
  currentUserId: null as string | null,
};

export const useChatStore = create<ChatStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setConnected: (connected) =>
        set({ isConnected: connected }, undefined, "setConnected"),

      setConnecting: (connecting) =>
        set({ isConnecting: connecting }, undefined, "setConnecting"),

      setConnectionError: (error) =>
        set({ connectionError: error }, undefined, "setConnectionError"),

      addMessage: (message) => {
        const { messages, messageIds } = get();

        // Deduplicate by message ID
        if (messageIds.has(message.id)) {
          return;
        }

        const newMessageIds = new Set(messageIds);
        newMessageIds.add(message.id);

        // Keep only the last MAX_MESSAGES
        let newMessages = [...messages, message];
        if (newMessages.length > MAX_MESSAGES) {
          const removed = newMessages.slice(
            0,
            newMessages.length - MAX_MESSAGES
          );
          removed.forEach((msg) => newMessageIds.delete(msg.id));
          newMessages = newMessages.slice(-MAX_MESSAGES);
        }

        set(
          { messages: newMessages, messageIds: newMessageIds },
          undefined,
          "addMessage"
        );
      },

      setMessages: (messages) => {
        const newMessageIds = new Set<string>();
        messages.forEach((msg) => newMessageIds.add(msg.id));

        // Keep only the last MAX_MESSAGES
        const trimmedMessages =
          messages.length > MAX_MESSAGES
            ? messages.slice(-MAX_MESSAGES)
            : messages;

        set(
          { messages: trimmedMessages, messageIds: newMessageIds },
          undefined,
          "setMessages"
        );
      },

      setActiveRoom: (room) =>
        set({ activeRoom: room }, undefined, "setActiveRoom"),

      setCurrentUserId: (userId) =>
        set({ currentUserId: userId }, undefined, "setCurrentUserId"),

      clearMessages: () =>
        set(
          { messages: [], messageIds: new Set() },
          undefined,
          "clearMessages"
        ),

      reset: () =>
        set(
          {
            ...initialState,
            messageIds: new Set(),
          },
          undefined,
          "reset"
        ),
    }),
    { name: "ChatStore" }
  )
);
