import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { FormError } from "./FormError";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    containerClassName = "",
    className = "",
    id,
    ...props
  },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  const inputClasses = `w-full px-2.5 py-3 bg-white border rounded-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)] transition-all duration-200 ${
    leftIcon ? "pl-10" : ""
  } ${rightIcon ? "pr-10" : ""} ${className}`;

  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={inputId}
          className="block font-normal text-text-secondary mb-2"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {leftIcon}
          </div>
        )}

        <input ref={ref} id={inputId} className={inputClasses} {...props} />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>

      {error && <FormError message={error} />}

      {helperText && !error && (
        <p className="text-xs text-text-muted mt-1">{helperText}</p>
      )}
    </div>
  );
});
