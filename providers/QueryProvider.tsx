"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/query-client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);

  // Hydrate auth state on mount
  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
