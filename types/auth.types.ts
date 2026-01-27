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
}

export interface CurrentUserResponse {
  user: User;
}
