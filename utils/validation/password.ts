import { PASSWORD_RULES, PASSWORD_ERROR_MESSAGES } from "./constants";

export interface PasswordRequirements {
  minLength: boolean;
  maxLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export const validatePassword = (password: string): PasswordRequirements => {
  return {
    minLength: password.length >= PASSWORD_RULES.MIN_LENGTH,
    maxLength: password.length <= PASSWORD_RULES.MAX_LENGTH,
    hasUppercase: PASSWORD_RULES.REGEX.UPPERCASE.test(password),
    hasLowercase: PASSWORD_RULES.REGEX.LOWERCASE.test(password),
    hasNumber: PASSWORD_RULES.REGEX.NUMBER.test(password),
    hasSpecial: PASSWORD_RULES.REGEX.SPECIAL.test(password),
  };
};

export const isPasswordValid = (
  requirements: PasswordRequirements
): boolean => {
  return Object.values(requirements).every(Boolean);
};

// Helper to get failed requirements with their error messages
export const getPasswordErrors = (
  requirements: PasswordRequirements
): string[] => {
  const errors: string[] = [];

  if (!requirements.minLength) errors.push(PASSWORD_ERROR_MESSAGES.MIN_LENGTH);
  if (!requirements.maxLength) errors.push(PASSWORD_ERROR_MESSAGES.MAX_LENGTH);
  if (!requirements.hasUppercase)
    errors.push(PASSWORD_ERROR_MESSAGES.UPPERCASE);
  if (!requirements.hasLowercase)
    errors.push(PASSWORD_ERROR_MESSAGES.LOWERCASE);
  if (!requirements.hasNumber) errors.push(PASSWORD_ERROR_MESSAGES.NUMBER);
  if (!requirements.hasSpecial) errors.push(PASSWORD_ERROR_MESSAGES.SPECIAL);

  return errors;
};
