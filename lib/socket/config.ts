export const SOCKET_CONFIG = {
  // Backend URL
  URL: "https://backend-internship-js-hw-03-blaze-casino.onrender.com",

  // Default room to join on connect
  DEFAULT_ROOM: "general",

  // Maximum messages to keep in memory
  MAX_MESSAGES: 100,

  // Reconnection settings
  RECONNECTION: true,
  RECONNECTION_ATTEMPTS: 5,
  RECONNECTION_DELAY: 1000,
  RECONNECTION_DELAY_MAX: 5000,
} as const;
