import { z } from "zod";
import {
  PASSWORD_RULES,
  PASSWORD_ERROR_MESSAGES,
  EMAIL_ERROR_MESSAGES,
  USERNAME_RULES,
  USERNAME_ERROR_MESSAGES,
} from "./validation";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, EMAIL_ERROR_MESSAGES.REQUIRED)
    .email(EMAIL_ERROR_MESSAGES.INVALID),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, USERNAME_ERROR_MESSAGES.REQUIRED)
    .min(USERNAME_RULES.MIN_LENGTH, USERNAME_ERROR_MESSAGES.MIN_LENGTH)
    .max(USERNAME_RULES.MAX_LENGTH, USERNAME_ERROR_MESSAGES.MAX_LENGTH)
    .regex(USERNAME_RULES.REGEX, USERNAME_ERROR_MESSAGES.INVALID_CHARS),
  email: z
    .string()
    .min(1, EMAIL_ERROR_MESSAGES.REQUIRED)
    .email(EMAIL_ERROR_MESSAGES.INVALID),
  password: z
    .string()
    .min(PASSWORD_RULES.MIN_LENGTH, PASSWORD_ERROR_MESSAGES.MIN_LENGTH)
    .max(PASSWORD_RULES.MAX_LENGTH, PASSWORD_ERROR_MESSAGES.MAX_LENGTH)
    .regex(PASSWORD_RULES.REGEX.UPPERCASE, PASSWORD_ERROR_MESSAGES.UPPERCASE)
    .regex(PASSWORD_RULES.REGEX.LOWERCASE, PASSWORD_ERROR_MESSAGES.LOWERCASE)
    .regex(PASSWORD_RULES.REGEX.NUMBER, PASSWORD_ERROR_MESSAGES.NUMBER)
    .regex(PASSWORD_RULES.REGEX.SPECIAL, PASSWORD_ERROR_MESSAGES.SPECIAL),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
