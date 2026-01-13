"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  PasswordInput,
  AuthFormCard,
  AuthFormHeader,
  AuthFormFooter,
  FormError,
} from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";
import { loginSchema, type LoginFormData } from "@/utils/schemas";
import { useLogin } from "@/hooks/api/useLogin";
import { getErrorMessage, handleApiError } from "@/lib/utils/errors";

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const handleFormSubmit = (data: LoginFormData) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      login(data);
    }
  };

  return (
    <AuthFormCard>
      <AuthFormHeader subtitle="Welcome back!" />

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 text-left"
      >
        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          {...register("email")}
          error={isSubmitted ? errors.email?.message : ""}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter password"
          {...register("password")}
          error={isSubmitted ? errors.password?.message : ""}
        />

        {error && (
          <FormError message={getErrorMessage(handleApiError(error))} />
        )}

        <div className="mt-8">
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            rightIcon={<ArrowRightIcon />}
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Log in"}
          </Button>
        </div>
      </form>

      <AuthFormFooter
        linkText="Don't have an account?"
        linkLabel="Register"
        linkHref="/register"
      />
    </AuthFormCard>
  );
}
