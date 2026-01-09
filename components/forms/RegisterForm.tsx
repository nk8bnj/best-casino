"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  PasswordInput,
  PasswordRequirements,
  AuthFormCard,
  AuthFormHeader,
  AuthFormFooter,
} from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";
import { registerSchema, type RegisterFormData } from "@/utils/schemas";
import { validatePassword } from "@/utils/validation";

interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const password = watch("password", "");
  const passwordRequirements = validatePassword(password);

  const handleFormSubmit = (data: RegisterFormData) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.log("Register:", data);
    }
  };

  return (
    <AuthFormCard>
      <AuthFormHeader subtitle="Create your account" />

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 text-left"
      >
        <Input
          label="Username"
          type="text"
          placeholder="Username"
          {...register("username")}
          error={isSubmitted ? errors.username?.message : ""}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Email"
          {...register("email")}
          error={isSubmitted ? errors.email?.message : ""}
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          {...register("password")}
          error={isSubmitted ? "Password must contain" : ""}
        />

        <PasswordRequirements
          requirements={passwordRequirements}
          show={isSubmitted}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          error={isSubmitted ? errors.confirmPassword?.message : ""}
        />

        <div className="mt-8">
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            rightIcon={<ArrowRightIcon />}
          >
            Sign up
          </Button>
        </div>
      </form>

      <AuthFormFooter
        linkText="Already have an account?"
        linkLabel="Login"
        linkHref="/login"
      />
    </AuthFormCard>
  );
}
