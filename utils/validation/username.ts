import { USERNAME_RULES } from "./constants";

export interface UsernameRequirements {
  minLength: boolean;
  maxLength: boolean;
  validChars: boolean;
}

export const validateUsername = (username: string): UsernameRequirements => {
  return {
    minLength: username.length >= USERNAME_RULES.MIN_LENGTH,
    maxLength: username.length <= USERNAME_RULES.MAX_LENGTH,
    validChars: USERNAME_RULES.REGEX.test(username),
  };
};

export const isUsernameValid = (
  requirements: UsernameRequirements
): boolean => {
  return Object.values(requirements).every(Boolean);
};
