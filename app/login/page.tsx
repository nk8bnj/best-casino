"use client";

import { PageWrapper, Container } from "@/components/layout";
import { LoginForm } from "@/components/forms";

export default function LoginPage() {
  return (
    <PageWrapper spacing="lg">
      <Container size="sm" className="flex items-center justify-center">
        <LoginForm />
      </Container>
    </PageWrapper>
  );
}
