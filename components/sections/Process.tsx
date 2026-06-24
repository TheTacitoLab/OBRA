import { Container } from "../Container";
import { SectionLabel } from "../SectionLabel";
import { Reveal } from "../Reveal";
import { Asterisk } from "../brand/Marks";

const steps = ["Brief", "Design", "Mockup", "Sample", "Production", "Delivery"];

// Accent cycling per the brief: coral / electric / magenta / coral / electric / violet.
const accents = [
  "text-coral",
  "text-electric",
  "text-magenta",
  "text-coral",
  "text-electric",
  "text-violet",
];

export function Process() {
  return (
    <section id="process" className="border-t border-line py-24 sm:py-32 md:py-40">
      <Container>
        <Reveal>
          <SectionLabel>03 / THE PROCESS</SectionLabel>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <h2 className="text-display text-white">
              Brief. Design. Mockup. Sample. Production. Delivery.
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-4">
            <p className="text-lede text-ash">
              A clear process from first idea to finished product.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => (
              <li
                key={step}
                className="group flex min-h-[12.5rem] flex-col justify-between bg-void p-7 transition-colors duration-500 hover:bg-obsidian"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`font-display text-[3.25rem] font-extrabold leading-none ${accents[i]}`}
                  >
                    0{i + 1}
                  </span>
                  <Asterisk className="h-4 w-4 text-yellow" />
                </div>
                <h3 className="text-headline text-white">{step}</h3>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
