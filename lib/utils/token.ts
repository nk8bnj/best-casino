const TOKEN_KEY = "accessToken";

export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === "undefined") return null;

    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error reading token:", error);
      return null;
    }
  },

  set: (token: string): void => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  },

  remove: (): void => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error removing token:", error);
    }
  },
};
