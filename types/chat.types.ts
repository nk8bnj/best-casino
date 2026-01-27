import type { ChatMessage } from "./dashboard.types";

// Backend message format
export interface ServerMessage {
  _id: string;
  roomId: string;
  userId: string;
  username: string;
  text: string;
  time: string;
  createdAt: string;
  type?: "chat" | "join" | "leave";
}

// Extended chat message with type for join/leave events
export interface ChatMessageWithType extends ChatMessage {
  type?: "chat" | "join" | "leave";
}

// Chat store state
export interface ChatState {
  isConnected: boolean;
  isConnecting: boolean;
  connectionError: string | null;
  messages: ChatMessageWithType[];
  messageIds: Set<string>;
  activeRoom: string | null;
  rooms: Room[];
  currentUserId: string | null;
}

// Chat store actions
export interface ChatActions {
  setConnected: (connected: boolean) => void;
  setConnecting: (connecting: boolean) => void;
  setConnectionError: (error: string | null) => void;
  addMessage: (message: ChatMessageWithType) => void;
  setMessages: (messages: ChatMessageWithType[]) => void;
  setActiveRoom: (room: string | null) => void;
  setCurrentUserId: (userId: string | null) => void;
  clearMessages: () => void;
  reset: () => void;
}

// Combined store type
export type ChatStore = ChatState & ChatActions;

// Room definition
export interface Room {
  id: string;
  name: string;
  userCount?: number;
}

// Chat history response from server
export interface ChatHistoryResponse {
  roomId: string;
  messages: ServerMessage[];
}

// Payload for sending messages
export interface SendMessagePayload {
  roomId: string;
  message: string;
}

// Socket event names
export const SocketEvents = {
  // Client -> Server
  CHAT_JOIN: "chat:join",
  CHAT_LEAVE: "chat:leave",
  CHAT_MESSAGE: "chat:message",

  // Server -> Client
  CHAT_ROOMS: "chat:rooms",
  CHAT_HISTORY: "chat:history",
  CHAT_ERROR: "chat:error",
  MESSAGE: "message",
} as const;
