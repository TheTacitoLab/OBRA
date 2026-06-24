import { GradientSurface } from "../GradientSurface";
import { Container } from "../Container";
import { Button } from "../Button";
import { Reveal } from "../Reveal";
import { Asterisk } from "../brand/Marks";
import { briefHref } from "@/lib/siteConfig";

export function ClosingCTA() {
  return (
    <section className="border-t border-line">
      <GradientSurface className="flex min-h-[70vh] items-center">
        <div aria-hidden className="absolute inset-0 scrim-hero" />
        <Container className="relative py-28 sm:py-36">
          <Reveal>
            <Asterisk className="h-8 w-8 text-coral" />
            <h2 className="text-display mt-8 max-w-4xl text-white">
              Take your drop from concept to creation.
            </h2>
            <div className="mt-10">
              <Button href={briefHref}>Start a brief</Button>
            </div>
          </Reveal>
        </Container>
      </GradientSurface>
    </section>
  );
}
