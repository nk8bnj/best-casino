import { io, type Socket } from "socket.io-client";
import { SOCKET_CONFIG } from "../config";
import type { GameTickData, GameCrashData } from "@/types/crash.types";

type GameTickCallback = (data: GameTickData) => void;
type GameCrashCallback = (data: GameCrashData) => void;

/**
 * Crash Game Socket Service
 * Handles WebSocket connection for the Crash game
 */
class CrashSocketService {
  private static instance: CrashSocketService;
  private socket: Socket | null = null;
  private tickCallbacks: Set<GameTickCallback> = new Set();
  private crashCallbacks: Set<GameCrashCallback> = new Set();

  private constructor() {}

  static getInstance(): CrashSocketService {
    if (!CrashSocketService.instance) {
      CrashSocketService.instance = new CrashSocketService();
    }
    return CrashSocketService.instance;
  }

  /**
   * Connect to the crash game socket namespace
   */
  connect(): Socket {
    if (this.socket?.connected) {
      return this.socket;
    }

    // Clean up existing socket if any
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket = null;
    }

    const baseUrl = SOCKET_CONFIG.URL;
    this.socket = io(`${baseUrl}/crash`, {
      transports: ["websocket", "polling"],
      reconnection: SOCKET_CONFIG.RECONNECTION,
      reconnectionAttempts: SOCKET_CONFIG.RECONNECTION_ATTEMPTS,
      reconnectionDelay: SOCKET_CONFIG.RECONNECTION_DELAY,
      reconnectionDelayMax: SOCKET_CONFIG.RECONNECTION_DELAY_MAX,
    });

    this.setupListeners();

    return this.socket;
  }

  /**
   * Setup socket event listeners
   */
  private setupListeners(): void {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.warn("[CrashSocket] Connected:", this.socket?.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.warn("[CrashSocket] Disconnected:", reason);
    });

    this.socket.on("connect_error", (error) => {
      console.error("[CrashSocket] Connection error:", error.message);
    });

    // Game tick event
    this.socket.on("game:tick", (data: GameTickData) => {
      this.tickCallbacks.forEach((callback) => callback(data));
    });

    // Game crash event
    this.socket.on("game:crash", (data: GameCrashData) => {
      this.crashCallbacks.forEach((callback) => callback(data));
    });
  }

  /**
   * Subscribe to a specific game
   */
  subscribeToGame(gameId: string): void {
    if (!this.socket?.connected) {
      console.warn("[CrashSocket] Cannot subscribe: not connected");
      return;
    }
    this.socket.emit("subscribe:game", { gameId });
  }

  /**
   * Register callback for game tick events
   */
  onGameTick(callback: GameTickCallback): () => void {
    this.tickCallbacks.add(callback);
    return () => {
      this.tickCallbacks.delete(callback);
    };
  }

  /**
   * Register callback for game crash events
   */
  onGameCrash(callback: GameCrashCallback): () => void {
    this.crashCallbacks.add(callback);
    return () => {
      this.crashCallbacks.delete(callback);
    };
  }

  /**
   * Remove all crash event listeners
   */
  offCrashEvents(): void {
    this.socket?.off("game:tick");
    this.socket?.off("game:crash");
    this.tickCallbacks.clear();
    this.crashCallbacks.clear();
  }

  /**
   * Disconnect from the crash socket
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    this.tickCallbacks.clear();
    this.crashCallbacks.clear();
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Get the socket instance
   */
  getSocket(): Socket | null {
    return this.socket;
  }
}

export const crashSocketService = CrashSocketService.getInstance();
