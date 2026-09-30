/**
 * The three quantity bands: what each order size lets a project change.
 * An ordered list, smallest to largest; three open columns with the sweet
 * spot marked by a lime rule and its lime label, and named in words too, so
 * its emphasis never rests on colour alone.
 */
const bands = [
  {
    qty: "Under 250",
    tag: "Intelligent customisation",
    lead: "Proven product blocks with intelligent customisation.",
    text: "Colour, artwork, branding, labels, trims and packaging can still create something highly distinctive, but there are limits to fully custom fabrics, components and construction.",
  },
  {
    qty: "250–1,000",
    tag: "The sweet spot",
    lead: "This is the sweet spot for many original merchandise collections.",
    text: "There is enough volume to move well beyond decorated blanks, introduce more considered fabrics, finishes and trims, and build several products around one visual idea while keeping the project commercially sensible. Enough volume to make the product genuinely distinctive without forcing the project into huge-volume manufacturing.",
    sweet: true,
  },
  {
    qty: "1,000+",
    tag: "Full bespoke development",
    lead: "Completely bespoke product development becomes far more viable.",
    text: "This can include purpose-developed fits, construction, specialist fabrics, custom components and products engineered specifically around the project.",
  },
];

export function QuantityBands() {
  return (
    <ol
      className="bands guide-wide"
      aria-label="Planning bands by order quantity"
    >
      {bands.map((band) => (
        <li key={band.qty} className={`band ${band.sweet ? "band--sweet" : ""}`}>
          <p className="band__qty">
            {band.qty}
            <small>units</small>
          </p>
          <p className="band__tag">{band.tag}</p>
          <p className="band__lead">{band.lead}</p>
          <p className="band__text">{band.text}</p>
        </li>
      ))}
    </ol>
  );
}
