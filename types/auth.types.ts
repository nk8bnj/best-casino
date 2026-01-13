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

// Response types (based on backend structure)
export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
}

export interface CurrentUserResponse {
  user: User;
}
