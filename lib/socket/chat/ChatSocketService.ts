import { socketService } from "../SocketService";
import { SOCKET_CONFIG } from "../config";
import {
  SocketEvents,
  type ServerMessage,
  type ChatMessageWithType,
  type ChatHistoryResponse,
} from "@/types/chat.types";
import { useChatStore } from "@/store/chat.store";
import { useAuthStore } from "@/store/auth.store";

/**
 * Chat-specific socket service that uses the generic SocketService.
 * All chat domain logic lives here.
 */
class ChatSocketService {
  private static instance: ChatSocketService;
  private unsubscribers: (() => void)[] = [];
  private isInitialized = false;

  private constructor() {}

  static getInstance(): ChatSocketService {
    if (!ChatSocketService.instance) {
      ChatSocketService.instance = new ChatSocketService();
    }
    return ChatSocketService.instance;
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
   * Initialize the chat socket - configure and set up listeners
   */
  private initialize(): void {
    if (this.isInitialized) return;

    // Configure the generic socket service
    socketService.configure({
      url: SOCKET_CONFIG.URL,
      reconnection: SOCKET_CONFIG.RECONNECTION,
      reconnectionAttempts: SOCKET_CONFIG.RECONNECTION_ATTEMPTS,
      reconnectionDelay: SOCKET_CONFIG.RECONNECTION_DELAY,
      reconnectionDelayMax: SOCKET_CONFIG.RECONNECTION_DELAY_MAX,
    });

    this.isInitialized = true;
  }

  /**
   * Connect to chat
   */
  connect(token: string): void {
    this.initialize();

    const store = useChatStore.getState();
    store.setConnecting(true);

    // Subscribe to internal socket events
    this.unsubscribers.push(
      socketService.on("connected", this.handleConnect),
      socketService.on("disconnected", this.handleDisconnect),
      socketService.on("error", this.handleError)
    );

    socketService.connect(token);

    // Subscribe to server events after connection attempt
    // These will be set up when we actually connect
  }

  /**
   * Set up server event listeners (called after connect)
   */
  private setupServerListeners(): void {
    this.unsubscribers.push(
      socketService.onServer<ChatHistoryResponse>(
        SocketEvents.CHAT_HISTORY,
        this.handleChatHistory
      ),
      socketService.onServer<ServerMessage>(
        SocketEvents.MESSAGE,
        this.handleMessage
      ),
      socketService.onServer<{ message: string }>(
        SocketEvents.CHAT_ERROR,
        this.handleChatError
      )
    );
  }

  /**
   * Disconnect from chat
   */
  disconnect(): void {
    const activeRoom = useChatStore.getState().activeRoom;
    if (activeRoom) {
      this.leaveRoom(activeRoom);
    }

    // Cleanup all subscriptions
    this.unsubscribers.forEach((unsub) => unsub());
    this.unsubscribers = [];

    socketService.disconnect();
    useChatStore.getState().reset();
  }

  /**
   * Handle successful connection
   */
  private handleConnect = (): void => {
    const store = useChatStore.getState();
    store.setConnected(true);
    store.setConnecting(false);
    store.setConnectionError(null);

    // Set up server listeners now that we're connected
    this.setupServerListeners();

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
  private handleDisconnect = (data: { reason?: string } | undefined): void => {
    const store = useChatStore.getState();
    store.setConnected(false);
    if (data?.reason === "io server disconnect") {
      store.setConnectionError("Disconnected by server");
    }
  };

  /**
   * Handle connection error
   */
  private handleError = (data: { message: string }): void => {
    console.error("[ChatSocketService] Connection error:", data.message);
    const store = useChatStore.getState();
    store.setConnecting(false);
    store.setConnectionError(data.message || "Connection failed");
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
    console.error("[ChatSocketService] Chat error:", error.message);
    useChatStore.getState().setConnectionError(error.message);
  };

  /**
   * Join a chat room
   */
  joinRoom(roomId: string): void {
    if (!socketService.isConnected()) {
      console.warn("[ChatSocketService] Cannot join room: not connected");
      return;
    }

    const currentRoom = useChatStore.getState().activeRoom;

    if (currentRoom && currentRoom !== roomId) {
      this.leaveRoom(currentRoom);
    }

    useChatStore.getState().clearMessages();
    useChatStore.getState().setActiveRoom(roomId);

    socketService.emitToServer(SocketEvents.CHAT_JOIN, { roomId });
  }

  /**
   * Leave a chat room
   */
  leaveRoom(roomId: string): void {
    if (!socketService.isConnected()) {
      return;
    }

    socketService.emitToServer(SocketEvents.CHAT_LEAVE, { roomId });
  }

  /**
   * Send a chat message
   */
  sendMessage(message: string): void {
    if (!socketService.isConnected()) {
      console.warn("[ChatSocketService] Cannot send message: not connected");
      return;
    }

    const activeRoom = useChatStore.getState().activeRoom;

    if (!activeRoom) {
      console.warn("[ChatSocketService] No active room");
      return;
    }

    const authState = useAuthStore.getState();
    const payload = {
      roomId: activeRoom,
      message,
      username: authState.user?.username || "Anonymous",
      userId: authState.user?.id || "",
    };

    socketService.emitToServer(SocketEvents.CHAT_MESSAGE, payload);
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return socketService.isConnected();
  }
}

export const chatSocketService = ChatSocketService.getInstance();
