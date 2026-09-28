import { Section } from "@/components/site/Section";
import { Button } from "@/components/site/Button";

export default function NotFound() {
  return (
    <Section tone="bone" size="large" containerClassName="pt-hero">
      <h1 className="type-page">Not found.</h1>
      <p className="type-lede mt-head text-muted">
        That page isn&rsquo;t here. Start again from the homepage.
      </p>
      <Button href="/" className="mt-body">
        Back to madebyobra
      </Button>
    </Section>
  );
}
