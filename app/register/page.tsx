"use client";

import { PageWrapper, Container } from "@/components/layout";
import { RegisterForm } from "@/components/forms";
import type { RegisterFormData } from "@/utils/schemas";

export default function RegisterPage() {
  const handleRegister = (data: RegisterFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = data;
    console.log("Register:", userData);
  };

  return (
    <PageWrapper spacing="lg">
      <Container size="sm" className="flex items-center justify-center">
        <RegisterForm onSubmit={handleRegister} />
      </Container>
    </PageWrapper>
  );
}
