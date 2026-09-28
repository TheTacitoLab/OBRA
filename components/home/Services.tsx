import Link from "next/link";
import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { ArrowLink } from "../site/Button";
import { services } from "@/content/site";

export function Services() {
  return (
    <Section id="services" tone="bone">
      <Editorial
        heading={<h2 className="type-display">Our services.</h2>}
        aside={
          <div className="flex flex-col gap-5">
            <p className="type-lede text-muted">
              Everything between the first idea and finished stock at your
              door, handled in one place.
            </p>
            <ArrowLink href="/services/">All services</ArrowLink>
          </div>
        }
      />
      <ul className="services mt-body">
        {services.map((service) => (
          <li key={service.slug} className="contents">
            <Link href={`/services/#${service.slug}`} className="service">
              <h3 className="type-title">{service.title}</h3>
              <p className="type-body mt-2 max-w-[32ch] text-muted">
                {service.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
