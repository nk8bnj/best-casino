import { Container, PageWrapper } from "@/components/layout";
import Link from "next/link";

export default function Home() {
  return (
    <PageWrapper>
      <Container>
        <h1>Blaze Casino</h1>
        <Link href="/login">Log in</Link>
      </Container>
    </PageWrapper>
  );
}
