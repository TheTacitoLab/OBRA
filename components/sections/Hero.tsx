import { GradientSurface } from "../GradientSurface";
import { Container } from "../Container";
import { Button } from "../Button";
import { Arrow } from "../brand/Marks";
import { briefHref } from "@/lib/siteConfig";

export function Hero() {
  return (
    <section className="relative">
      <GradientSurface className="flex min-h-[100svh] flex-col">
        {/* Left-weighted dark scrim keeps the headline AA-legible over colour. */}
        <div aria-hidden className="absolute inset-0 scrim-hero" />

        <Container className="relative flex min-h-[100svh] flex-col justify-center pb-20 pt-28">
          <div className="w-full">
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,5rem)] font-black uppercase leading-[0.95] tracking-[-0.01em] text-balance text-white">
              Football jerseys from concept to creation
            </h1>

            <p className="text-lede mt-8 max-w-2xl text-ash">
              OBRA creates limited edition football jerseys for festivals,
              artists, creators and culture-led brands. We take your drop from
              concept to creation, covering design, mockups, tech packs, sampling
              and production.
            </p>

            <p className="mt-6 text-label text-flare">
              One process. Start to finish.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={briefHref}>Start a brief</Button>
              <Button href="#process" variant="secondary">
                See the process
              </Button>
            </div>
          </div>
        </Container>

        {/* Scroll cue */}
        <div className="pointer-events-none absolute bottom-7 right-6 hidden flex-col items-center gap-3 sm:flex">
          <span className="text-tag text-white/70 [writing-mode:vertical-rl]">
            Scroll
          </span>
          <Arrow className="h-5 w-5 rotate-90 animate-cue text-white/70" />
        </div>
      </GradientSurface>
    </section>
  );
}
