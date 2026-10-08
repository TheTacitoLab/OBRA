import type { ReactNode } from "react";
import { Sheet } from "./Sheet";
import { Container } from "../site/Container";
import type { Tone } from "../site/Section";

/**
 * A breathing space between chapters: one line of brand voice, very large
 * and centred on a full brand colour, with nothing else unless a quiet
 * link is passed as `children`. Each statement opens a stack, so it laps
 * the chapter before with a rounded edge, holds while it is read, and the
 * next chapter slides over it (Sheets.tsx).
 *
 * `lines` are forced line breaks; within a line the browser balances the
 * wrap. `textClassName` sets the type colour where the surface's own
 * foreground is not the one wanted (ink on clay, lime on soft black).
 */
export function Statement({
  id,
  tone,
  lines,
  textClassName = "",
  children,
}: {
  id: string;
  tone: Tone;
  lines: string[];
  textClassName?: string;
  children?: ReactNode;
}) {
  return (
    <Sheet id={id} tone={tone} sectionClassName="sheet--round sheet--statement">
      <Container className="statement">
        <h2 className={`type-statement-xl ${textClassName}`} data-reveal="up">
          {lines.map((line) => (
            // The trailing space keeps the lines apart in the text itself
            // (search, copy and paste); visually the block break hides it.
            <span key={line} className="line">
              {line}{" "}
            </span>
          ))}
        </h2>
        {children && (
          <div data-reveal="up" data-reveal-delay="2">
            {children}
          </div>
        )}
      </Container>
    </Sheet>
  );
}
