class TokenStorage {
  private readonly TOKEN_KEY = "accessToken";

  get(): string | null {
    if (typeof window === "undefined") return null;

    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error("Error reading token:", error);
      return null;
    }
  }

  set(token: string): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  }

  remove(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(this.TOKEN_KEY);
    } catch (error) {
      console.error("Error removing token:", error);
    }
  }
}

export const tokenStorageService = new TokenStorage();
