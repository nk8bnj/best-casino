"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Button,
  Input,
  PasswordInput,
  PasswordRequirements,
  Logo,
} from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";
import { loginSchema, type LoginFormData } from "@/utils/schemas";
import { validatePassword } from "@/utils/validation";

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const password = watch("password", "");
  const passwordRequirements = validatePassword(password);

  const handleFormSubmit = (data: LoginFormData) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.log("Login:", data);
    }
  };

  return (
    <div className="w-full max-w-[440px]">
      <div className="bg-background-card/95 backdrop-blur-sm rounded-3xl shadow-card p-10">
        <div className="text-center space-y-4 mb-10">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl font-black text-text-primary">
            Blaze Casino
          </h1>
          <p className="text-2xl text-text-secondary font-semibold">
            Welcome back!
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4 text-left"
        >
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

          <div className="mt-8">
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              rightIcon={<ArrowRightIcon />}
            >
              Log in
            </Button>
          </div>
        </form>

        <div className="pb-4 border-b border-gray-700">
          <p className="text-center text-sm text-text-secondary mt-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-accent-blue underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>

        <p className="text-xs text-text-muted text-center mt-4">
          Your account data is stored locally in your browser
        </p>
      </div>
    </div>
  );
}
