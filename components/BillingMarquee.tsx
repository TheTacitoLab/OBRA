import { Marquee } from "./Marquee";
import { Asterisk } from "./brand/Marks";

const words = [
  "LIMITED EDITION",
  "CONCEPT TO CREATION",
  "FOOTBALL JERSEYS",
  "ONE PROCESS",
];

/** Festival-billing marquee. Used once, as the first scroll below the hero. */
export function BillingMarquee() {
  return (
    <div className="border-y border-line bg-void py-6">
      <Marquee duration={36}>
        {words.map((word) => (
          <span key={word} className="flex items-center">
            <span className="px-8 font-display text-[1.75rem] font-extrabold uppercase leading-none tracking-tight text-white sm:text-[2.5rem]">
              {word}
            </span>
            <Asterisk className="h-5 w-5 text-yellow sm:h-7 sm:w-7" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
