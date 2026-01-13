"use client";

import { PageWrapper, Container } from "@/components/layout";
import { RegisterForm } from "@/components/forms";

export default function RegisterPage() {
  return (
    <PageWrapper spacing="lg">
      <Container size="sm" className="flex items-center justify-center">
        <RegisterForm />
      </Container>
    </PageWrapper>
  );
}
