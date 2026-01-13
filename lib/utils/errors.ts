import type { ApiError } from "@/types/api.types";

export class ApiException extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiException";
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiException) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      errors: error.errors,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }

  return {
    message: "An unexpected error occurred",
    statusCode: 500,
  };
};

// User-friendly error messages
export const getErrorMessage = (error: ApiError): string => {
  switch (error.statusCode) {
    case 400:
      return error.message || "Invalid request. Please check your input.";
    case 401:
      return "Invalid credentials. Please try again.";
    case 403:
      return "Access denied. Please log in again.";
    case 409:
      return error.message || "This user already exists.";
    case 500:
      return "Server error. Please try again later.";
    default:
      return error.message || "An error occurred. Please try again.";
  }
};
