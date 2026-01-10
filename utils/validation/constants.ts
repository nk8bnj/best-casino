// Password validation constants
export const PASSWORD_RULES = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 12,
  REGEX: {
    UPPERCASE: /[A-Z]/,
    LOWERCASE: /[a-z]/,
    NUMBER: /[0-9]/,
    SPECIAL: /[!@#$%^&*(),.?":{}|<>]/,
  },
} as const;

// Error messages - single source of truth
export const PASSWORD_ERROR_MESSAGES = {
  MIN_LENGTH: "Password must be at least 8 characters",
  MAX_LENGTH: "Password must be at most 12 characters",
  UPPERCASE: "At least one uppercase letter (A-Z)",
  LOWERCASE: "At least one lowercase letter (a-z)",
  NUMBER: "At least one number (0-9)",
  SPECIAL: "At least one special character (!@#$%^&*...)",
} as const;

export const EMAIL_ERROR_MESSAGES = {
  REQUIRED: "Email is required",
  INVALID: "This email is not valid",
} as const;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Username validation constants
export const USERNAME_RULES = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 20,
  REGEX: /^[a-zA-Z0-9_-]+$/,
} as const;

export const USERNAME_ERROR_MESSAGES = {
  REQUIRED: "Username is required",
  MIN_LENGTH: "Username must be at least 3 characters",
  MAX_LENGTH: "Username must be at most 20 characters",
  INVALID_CHARS:
    "Username can only contain letters, numbers, underscores, and hyphens",
} as const;

// Confirm password validation constants
export const CONFIRM_PASSWORD_ERROR_MESSAGES = {
  REQUIRED: "Please confirm your password",
  NO_MATCH: "Passwords do not match",
} as const;
