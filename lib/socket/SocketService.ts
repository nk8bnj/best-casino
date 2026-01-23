import { io, type Socket } from "socket.io-client";
import { SOCKET_CONFIG } from "./config";
import {
  SocketEvents,
  type ServerMessage,
  type ChatMessageWithType,
  type ChatHistoryResponse,
} from "@/types/chat.types";
import { useChatStore } from "@/store/chat.store";
import { useAuthStore } from "@/store/auth.store";

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  /**
   * Transform server message format to client format
   */
  private transformMessage(serverMsg: ServerMessage): ChatMessageWithType {
    return {
      id: serverMsg._id || `${serverMsg.userId}-${Date.now()}-${Math.random()}`,
      userId: serverMsg.userId,
      username: serverMsg.username,
      content: serverMsg.text,
      timestamp: serverMsg.time,
      type: serverMsg.type || "chat",
    };
  }

  /**
   * Connect to the socket server
   */
  connect(token: string): void {
    if (this.socket?.connected) {
      console.warn("[SocketService] Already connected");
      return;
    }

    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket = null;
    }

    useChatStore.getState().setConnecting(true);

    this.socket = io(SOCKET_CONFIG.URL, {
      auth: { token },
      transports: ["polling", "websocket"],
      reconnection: SOCKET_CONFIG.RECONNECTION,
      reconnectionAttempts: SOCKET_CONFIG.RECONNECTION_ATTEMPTS,
      reconnectionDelay: SOCKET_CONFIG.RECONNECTION_DELAY,
      reconnectionDelayMax: SOCKET_CONFIG.RECONNECTION_DELAY_MAX,
    });

    this.setupEventListeners();
  }

  /**
   * Disconnect from the socket server
   */
  disconnect(): void {
    if (this.socket) {
      const activeRoom = useChatStore.getState().activeRoom;
      if (activeRoom) {
        this.leaveRoom(activeRoom);
      }

      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    useChatStore.getState().reset();
  }

  /**
   * Set up socket event listeners
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on("connect", this.handleConnect);
    this.socket.on("disconnect", this.handleDisconnect);
    this.socket.on("connect_error", this.handleConnectError);
    this.socket.on(SocketEvents.CHAT_HISTORY, this.handleChatHistory);
    this.socket.on(SocketEvents.MESSAGE, this.handleMessage);
    this.socket.on(SocketEvents.CHAT_ERROR, this.handleChatError);
  }

  /**
   * Handle successful connection
   */
  private handleConnect = (): void => {
    const store = useChatStore.getState();
    store.setConnected(true);
    store.setConnecting(false);
    store.setConnectionError(null);

    // Auto-join default room
    const activeRoom = store.activeRoom;
    if (activeRoom) {
      this.joinRoom(activeRoom);
    } else {
      this.joinRoom(SOCKET_CONFIG.DEFAULT_ROOM);
    }
  };

  /**
   * Handle disconnection
   */
  private handleDisconnect = (reason: string): void => {
    const store = useChatStore.getState();
    store.setConnected(false);
    if (reason === "io server disconnect") {
      store.setConnectionError("Disconnected by server");
    }
  };

  /**
   * Handle connection error
   */
  private handleConnectError = (error: Error): void => {
    console.error("[SocketService] Connection error:", error.message);
    const store = useChatStore.getState();
    store.setConnecting(false);
    store.setConnectionError(error.message || "Connection failed");
  };

  /**
   * Handle chat history from server
   */
  private handleChatHistory = (data: ChatHistoryResponse): void => {
    const transformedMessages = data.messages.map((msg) =>
      this.transformMessage(msg)
    );
    useChatStore.getState().setMessages(transformedMessages);
  };

  /**
   * Handle incoming message
   */
  private handleMessage = (serverMsg: ServerMessage): void => {
    const { currentUserId, addMessage } = useChatStore.getState();

    // Skip own join/leave messages
    if (serverMsg.type === "join" || serverMsg.type === "leave") {
      if (serverMsg.userId === currentUserId) {
        return;
      }
    }

    const message = this.transformMessage(serverMsg);
    addMessage(message);
  };

  /**
   * Handle chat error
   */
  private handleChatError = (error: { message: string }): void => {
    console.error("[SocketService] Chat error:", error.message);
    useChatStore.getState().setConnectionError(error.message);
  };

  /**
   * Join a chat room
   */
  joinRoom(roomId: string): void {
    if (!this.socket?.connected) {
      console.warn("[SocketService] Cannot join room: not connected");
      return;
    }

    const currentRoom = useChatStore.getState().activeRoom;

    if (currentRoom && currentRoom !== roomId) {
      this.leaveRoom(currentRoom);
    }

    useChatStore.getState().clearMessages();
    useChatStore.getState().setActiveRoom(roomId);

    this.socket.emit(SocketEvents.CHAT_JOIN, { roomId });
  }

  /**
   * Leave a chat room
   */
  leaveRoom(roomId: string): void {
    if (!this.socket?.connected) {
      return;
    }

    this.socket.emit(SocketEvents.CHAT_LEAVE, { roomId });
  }

  /**
   * Send a chat message
   */
  sendMessage(message: string): void {
    if (!this.socket?.connected) {
      console.warn("[SocketService] Cannot send message: not connected");
      return;
    }

    const activeRoom = useChatStore.getState().activeRoom;

    if (!activeRoom) {
      console.warn("[SocketService] No active room");
      return;
    }

    const authState = useAuthStore.getState();
    const payload = {
      roomId: activeRoom,
      message,
      username: authState.user?.username || "Anonymous",
      userId: authState.user?.id || "",
    };

    this.socket.emit(SocketEvents.CHAT_MESSAGE, payload);
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const socketService = SocketService.getInstance();
