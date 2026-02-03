// Request types (matching existing schemas)
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// Response types (based on actual backend structure)
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userName: string;
}

export interface User {
  id: string;
  username: string;
  balance?: number;
}

// Backend user response format
export interface BackendUser {
  userId: string;
  email: string;
  username: string;
  avatarURL: string;
  balance: number;
  gamesPlayed: number;
  totalWagered: number;
  totalWon: number;
}

// The /users/current endpoint returns BackendUser directly
export type CurrentUserResponse = BackendUser;
