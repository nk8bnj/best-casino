import { io, type Socket } from "socket.io-client";

export interface SocketConfig {
  url: string;
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  reconnectionDelayMax?: number;
}

export type EventCallback<T = unknown> = (data: T) => void;

/**
 * Generic WebSocket service - knows nothing about specific domains (chat, games, etc.)
 * Provides a simple pub/sub interface for event handling.
 */
class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private eventHandlers = new Map<string, Set<EventCallback>>();
  private config: SocketConfig | null = null;

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  /**
   * Configure the socket service (call before connect)
   */
  configure(config: SocketConfig): void {
    this.config = config;
  }

  /**
   * Connect to the socket server
   */
  connect(token: string): void {
    if (!this.config) {
      console.error("[SocketService] Not configured. Call configure() first.");
      return;
    }

    if (this.socket?.connected) {
      console.warn("[SocketService] Already connected");
      return;
    }

    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket = null;
    }

    this.emit("connecting", undefined);

    this.socket = io(this.config.url, {
      auth: { token },
      transports: ["polling", "websocket"],
      reconnection: this.config.reconnection ?? true,
      reconnectionAttempts: this.config.reconnectionAttempts ?? 5,
      reconnectionDelay: this.config.reconnectionDelay ?? 1000,
      reconnectionDelayMax: this.config.reconnectionDelayMax ?? 5000,
    });

    this.setupCoreListeners();
  }

  /**
   * Disconnect from the socket server
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    this.emit("disconnected", undefined);
  }

  /**
   * Setup core socket.io event listeners
   */
  private setupCoreListeners(): void {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      this.emit("connected", undefined);
    });

    this.socket.on("disconnect", (reason: string) => {
      this.emit("disconnected", { reason });
    });

    this.socket.on("connect_error", (error: Error) => {
      this.emit("error", { message: error.message });
    });
  }

  /**
   * Subscribe to a socket event from the server
   */
  onServer<T = unknown>(event: string, callback: EventCallback<T>): () => void {
    if (!this.socket) {
      console.warn(
        `[SocketService] Cannot subscribe to "${event}": not connected`
      );
      return () => {};
    }

    this.socket.on(event, callback as EventCallback);

    return () => {
      this.socket?.off(event, callback as EventCallback);
    };
  }

  /**
   * Emit an event to the server
   */
  emitToServer<T = unknown>(event: string, data: T): void {
    if (!this.socket?.connected) {
      console.warn(`[SocketService] Cannot emit "${event}": not connected`);
      return;
    }
    this.socket.emit(event, data);
  }

  /**
   * Subscribe to internal events (connected, disconnected, error, connecting)
   */
  on<T = unknown>(event: string, callback: EventCallback<T>): () => void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event)!.add(callback as EventCallback);

    return () => {
      this.eventHandlers.get(event)?.delete(callback as EventCallback);
    };
  }

  /**
   * Emit an internal event (for use by the socket service itself)
   */
  private emit<T = unknown>(event: string, data: T): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Get socket ID (useful for debugging)
   */
  getSocketId(): string | undefined {
    return this.socket?.id;
  }
}

export const socketService = SocketService.getInstance();
