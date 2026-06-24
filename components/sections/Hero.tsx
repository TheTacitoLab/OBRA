import { GradientSurface } from "../GradientSurface";
import { Container } from "../Container";
import { Button } from "../Button";
import { BillingMarquee } from "../BillingMarquee";
import { briefHref } from "@/lib/siteConfig";

export function Hero() {
  return (
    <section className="relative">
      <GradientSurface className="flex min-h-[100svh] flex-col">
        {/* Left-weighted dark scrim keeps the headline AA-legible over colour. */}
        <div aria-hidden className="absolute inset-0 scrim-hero" />

        <Container className="relative flex flex-1 flex-col justify-center pb-10 pt-28 sm:pt-32">
          <div className="w-full">
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,5rem)] font-black uppercase leading-[0.95] tracking-[-0.01em] text-balance text-white">
              Football jerseys from concept to creation
            </h1>

            <p className="mt-6 font-mono text-base uppercase tracking-[0.2em] text-white sm:text-lg">
              Design <span className="text-yellow">+</span> Concept{" "}
              <span className="text-yellow">+</span> Production
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={briefHref}>Start a brief</Button>
              <Button href="#process" variant="secondary">
                See the process
              </Button>
            </div>
          </div>
        </Container>

        {/* Rolling banner anchored to the bottom of the first viewport. */}
        <BillingMarquee />
      </GradientSurface>
    </section>
  );
}
