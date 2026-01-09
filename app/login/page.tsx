"use client";

import { PageWrapper, Container } from "@/components/layout";
import { LoginForm } from "@/components/forms";
import type { LoginFormData } from "@/utils/schemas";

export default function LoginPage() {
  const handleLogin = (data: LoginFormData) => {
    console.log("Login:", data);
  };

  return (
    <PageWrapper spacing="lg">
      <Container size="sm" className="flex items-center justify-center">
        <LoginForm onSubmit={handleLogin} />
      </Container>
    </PageWrapper>
  );
}
