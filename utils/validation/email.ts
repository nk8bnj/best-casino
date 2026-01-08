import { EMAIL_REGEX, EMAIL_ERROR_MESSAGES } from "./constants";

export const validateEmail = (email: string): string | null => {
  if (!email) return EMAIL_ERROR_MESSAGES.REQUIRED;
  if (!EMAIL_REGEX.test(email)) return EMAIL_ERROR_MESSAGES.INVALID;
  return null;
};
