import Link from "next/link";
import { services } from "@/content/site";

/** The 3 x 3 editorial grid; each cell links to its entry on /services/. */
export function ServicesGrid() {
  return (
    <ul className="services">
      {services.map((service) => (
        <li key={service.slug} className="contents">
          <Link href={`/services/#${service.slug}`} className="service">
            <h3 className="type-title">{service.title}</h3>
            <p className="type-body mt-3 max-w-[34ch] text-muted">
              {service.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
