import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const baseClasses =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-[6.25rem] cursor-pointer disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const getVariantClasses = () => {
    if (variant === "primary") {
      return isDisabled
        ? "bg-gradient-primary-disabled text-white shadow-none"
        : "bg-gradient-primary text-white hover:shadow-glow-primary active:bg-gradient-primary-pressed active:shadow-button";
    }

    if (variant === "secondary") {
      return isDisabled
        ? "bg-gradient-secondary-disabled text-white shadow-none"
        : "bg-gradient-secondary text-white shadow-button hover:shadow-glow-secondary hover:scale-105 active:bg-gradient-secondary-pressed active:shadow-button";
    }

    const variantClasses = {
      outline:
        "border-2 border-primary text-primary hover:bg-primary/10 hover:scale-105 disabled:opacity-50",
      ghost:
        "text-text-secondary hover:text-text-primary hover:bg-white/5 disabled:opacity-50",
    };

    return variantClasses[variant];
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${getVariantClasses()} ${widthClass} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      <span className="flex items-center justify-center min-w-5">
        {isLoading ? (
          <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
      </span>
      <span className="flex-1 text-center px-2">{children}</span>
      <span className="flex items-center justify-center min-w-5">
        {!isLoading && rightIcon}
      </span>
    </button>
  );
}
