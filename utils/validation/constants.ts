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
