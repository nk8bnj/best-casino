"use client";

import { forwardRef, useState } from "react";
import { Input, type InputProps } from "./Input";
import { EyeIcon, EyeOffIcon } from "@/components/icons";

interface PasswordInputProps extends Omit<InputProps, "type" | "rightIcon"> {
  showPasswordStrength?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    { showPasswordStrength: _showPasswordStrength = false, ...props },
    ref
  ) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleButton = (
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Toggle password visibility"
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    );

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        rightIcon={toggleButton}
        {...props}
      />
    );
  }
);
