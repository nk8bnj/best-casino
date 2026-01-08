import {
  PASSWORD_ERROR_MESSAGES,
  type PasswordRequirements as PasswordReqs,
} from "@/utils/validation";

interface PasswordRequirementsProps {
  requirements: PasswordReqs;
  show?: boolean;
  className?: string;
}

export function PasswordRequirements({
  requirements,
  show = true,
  className = "",
}: PasswordRequirementsProps) {
  if (!show) return null;

  const allRequirementsMet = Object.values(requirements).every(Boolean);
  if (allRequirementsMet) return null;

  return (
    <div className={`text-sm space-y-1 text-error ${className}`}>
      {!requirements.minLength && <p>• {PASSWORD_ERROR_MESSAGES.MIN_LENGTH}</p>}
      {!requirements.maxLength && <p>• {PASSWORD_ERROR_MESSAGES.MAX_LENGTH}</p>}
      {!requirements.hasUppercase && (
        <p>• {PASSWORD_ERROR_MESSAGES.UPPERCASE}</p>
      )}
      {!requirements.hasLowercase && (
        <p>• {PASSWORD_ERROR_MESSAGES.LOWERCASE}</p>
      )}
      {!requirements.hasNumber && <p>• {PASSWORD_ERROR_MESSAGES.NUMBER}</p>}
      {!requirements.hasSpecial && <p>• {PASSWORD_ERROR_MESSAGES.SPECIAL}</p>}
    </div>
  );
}
