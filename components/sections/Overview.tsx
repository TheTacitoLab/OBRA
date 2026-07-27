import Link from "next/link";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { festivalHref } from "@/lib/siteConfig";

const paragraphs = [
  "OBRA creates limited edition football jerseys, custom football shirts and white label football jersey drops for festivals, artists, creators, events, agencies and culture-led brands. We work with brands that want something more original than standard merchandise, blank apparel or basic print-on-demand clothing.",
  "Our service is built for anyone looking to create a bespoke football jersey from concept to creation. That could be a music festival football jersey, an artist merch football shirt, a creator merchandise jersey, a tour football shirt, a streetwear football jersey, a brand collaboration shirt, a sponsor-led event jersey, a limited edition fan jersey or a custom football shirt for a product drop.",
  "We handle the full football jersey design and production process in one place. This includes design concept, artwork direction, jersey mockups, football shirt tech packs, sample development, fabric and trim planning, production management, packaging and final delivery. For brands, festivals and artists, this means you can create a retail-ready football jersey without managing factories, suppliers, sampling, sizing or production yourself.",
  "OBRA is a football jersey studio for culture-led projects. We are not a teamwear catalogue, a print-on-demand website or a blank shirt supplier. We create custom football jerseys that are designed around a brand, an audience and a moment. Every shirt is built to feel like a proper product, not just merchandise with a logo added to it.",
  "Football jerseys are now used across music, fashion, festivals, events, streetwear, creator merch and brand campaigns. A custom football shirt can work as festival merchandise, artist merchandise, event merchandise, tour merchandise, fanwear, streetwear, sponsor merchandise or a limited edition brand drop. For the right audience, a football jersey can become something people wear, collect and remember long after the event is over.",
  // Trimmed and linked so this block no longer competes with the dedicated
  // festival landing page for the same search intent.
  "FESTIVAL_PARAGRAPH",
  "For artists and music brands, we create artist merch football jerseys, tour football shirts, album launch jerseys, DJ merch jerseys, label merchandise and limited edition fan shirts. These can include lyrics, dates, symbols, artwork, city references, sponsor-style graphics and design details that make the jersey feel connected to the artist and the audience.",
  "For creators and culture-led brands, we create custom football jerseys for merch drops, community launches, collaborations, campaigns and limited edition product releases. Whether you are building a creator merch range, a streetwear football shirt, a brand collab jersey or a one-off cultural drop, OBRA can manage the full process from first idea to finished product.",
  "For agencies and event teams, we offer white label football jersey design and production. This means agencies, creative studios, event companies and brand teams can deliver custom football jersey projects for their clients without needing their own sportswear production infrastructure. OBRA can support behind the scenes with design, mockups, tech packs, sampling and production.",
];

export function Overview() {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] font-extrabold uppercase leading-[1.1] text-white">
              Custom football jersey production and design services
            </h2>
            <p className="mt-5 text-base font-medium uppercase tracking-[0.06em] text-ash sm:text-lg">
              Limited edition football jerseys, custom football shirts and white
              label jersey production
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 space-y-5">
              {paragraphs.map((paragraph) =>
                paragraph === "FESTIVAL_PARAGRAPH" ? (
                  <p key={paragraph} className="text-body text-ash">
                    For festivals, we create custom festival football jerseys,
                    limited edition festival shirts, crew jerseys, sponsor
                    jerseys and merchandise drops that reflect the identity of
                    the event. Read how we approach{" "}
                    <Link
                      href={festivalHref}
                      className="text-white underline decoration-yellow underline-offset-4 transition-colors hover:text-yellow"
                    >
                      festival football shirt production
                    </Link>
                    .
                  </p>
                ) : (
                  <p key={paragraph.slice(0, 24)} className="text-body text-ash">
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
