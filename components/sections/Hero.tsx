import Image from "next/image";
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
            <div className="grid w-full items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <div>
                <Image
                  src="/brand/griffin-yellow.png"
                  alt=""
                  width={320}
                  height={320}
                  className="mb-4 h-[2.7rem] w-[2.7rem] sm:h-[3.6rem] sm:w-[3.6rem]"
                />
                <h1 className="font-display text-[clamp(2.6rem,5.4vw,4.75rem)] font-black uppercase leading-[0.95] tracking-[-0.01em] text-white">
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

              {/* Product flat-lay, sized to sit beside the headline rather than
                  compete with it. Eager: it shares the first screen. */}
              <Image
                src="/jerseys/obra-jersey-flatlay.webp"
                alt="OBRA football jerseys laid flat, including a purple jacquard shirt with the OBRA wordmark and griffin crest"
                width={1440}
                height={1080}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full rounded-sm border border-white/10 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.85)]"
              />
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
