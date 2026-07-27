import Link from "next/link";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { festivalHref } from "@/lib/siteConfig";

const audiences = ["Festivals", "Artists", "Creators", "Culture-led brands"];

export function WhoItsFor() {
  return (
    <section id="who" className="py-24 sm:py-32 md:py-40">
      <Container>
        <Reveal>
          <div className="text-center">
            <p className="text-label text-yellow">For</p>
            <ul className="mt-6 space-y-2">
              {audiences.map((audience) => (
                <li key={audience} className="text-display text-white">
                  {audience === "Festivals" ? (
                    <Link
                      href={festivalHref}
                      className="underline decoration-yellow decoration-2 underline-offset-8 transition-colors hover:text-yellow"
                    >
                      {audience}
                    </Link>
                  ) : (
                    audience
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
