/**
 * The three quantity bands: what each order size lets a project change.
 * An ordered list, smallest to largest, each band's quantity its h3. The
 * sweet spot sits on the lime and stands proud, and says so in words too,
 * so its emphasis never rests on colour alone.
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
    text: "There is enough volume to move well beyond decorated blanks, introduce more considered fabrics, finishes and trims, and build several products around one visual idea while keeping the project commercially sensible.",
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
          <h3 className="band__qty">
            {band.qty}
            <small>units</small>
          </h3>
          <p className="band__tag">{band.tag}</p>
          <p className="band__lead">{band.lead}</p>
          <p className="band__text">{band.text}</p>
        </li>
      ))}
    </ol>
  );
}
