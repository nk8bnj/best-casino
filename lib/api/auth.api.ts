import { apiClient } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  CurrentUserResponse,
} from "@/types/auth.types";

class AuthApi {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  async getCurrentUser(): Promise<CurrentUserResponse> {
    return apiClient.get<CurrentUserResponse>(API_ENDPOINTS.AUTH.CURRENT_USER, {
      requiresAuth: true,
    });
  }
}

export const authApi = new AuthApi();
