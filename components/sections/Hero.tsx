import { GradientSurface } from "../GradientSurface";
import { Container } from "../Container";
import { Button } from "../Button";
import { BillingMarquee } from "../BillingMarquee";
import { briefHref } from "@/lib/siteConfig";

export function Hero() {
  return (
    <section className="relative">
      <GradientSurface>
        <div className="relative flex min-h-[100svh] flex-col">
          {/* Left-weighted dark scrim keeps the headline AA-legible over colour. */}
          <div aria-hidden className="absolute inset-0 scrim-hero" />

          {/* Title sits in the lower third, well clear of the header. */}
          <Container className="relative z-10 flex flex-1 flex-col justify-end pb-12 pt-28">
            <div className="w-full">
              <h1 className="font-display text-[clamp(2.6rem,6.3vw,5.75rem)] font-black uppercase leading-[0.95] tracking-[-0.01em] text-white">
                Football jerseys
                <br />
                from concept
                <br />
                to creation
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

          {/* Rolling banner across the bottom of the first screen. */}
          <div className="relative z-10">
            <BillingMarquee />
          </div>
        </div>
      </GradientSurface>
    </section>
  );
}
