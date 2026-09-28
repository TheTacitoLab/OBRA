import Link from "next/link";
import { Container } from "@/components/site/Container";

export default function NotFound() {
  return (
    <section data-tone="bone" className="bg-bg text-fg">
      <Container className="flex min-h-[80svh] flex-col justify-end pb-20 pt-40">
        <h1 className="type-page">Not found.</h1>
        <p className="type-lede mt-8 max-w-[30ch] text-muted">
          That page isn&rsquo;t here. Start again from the homepage.
        </p>
        <Link href="/" className="btn btn-primary mt-10 self-start">
          Back to madebyobra
        </Link>
      </Container>
    </section>
  );
}
