import { Container, PageWrapper } from "@/components/layout";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function Home() {
  return (
    <PageWrapper>
      <Container>
        <h1>Blaze Casino</h1>
        <Link href={ROUTES.LOGIN}>Log in</Link>
      </Container>
    </PageWrapper>
  );
}
