"use client";

import { ApiException, getErrorMessage } from "@/lib/utils/errors";

interface LeaderboardErrorProps {
  error: Error | null;
  onRetry: () => void;
}

export function LeaderboardError({ error, onRetry }: LeaderboardErrorProps) {
  const getDisplayMessage = (): string => {
    if (!error) {
      return "An error occurred";
    }

    if (error instanceof ApiException) {
      // Use getErrorMessage for API errors
      return getErrorMessage({
        statusCode: error.statusCode,
        message: error.message,
      });
    }

    // Network or unexpected errors
    if (error.message.includes("Network")) {
      return "Network error. Please check your connection.";
    }

    return "An error occurred. Please try again.";
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <p className="text-gray-400 mb-4">{getDisplayMessage()}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
