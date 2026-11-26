import { Sheet } from "./Sheet";
import { Container } from "../site/Container";
import { pitch } from "@/content/home";

/**
 * The elevator pitch: one sentence, centred, navy on off-white, on its own
 * band between the hero and Who for. It rises over the hero with a rounded
 * edge and holds while Who for slides over it, like every sheet in a stack
 * (Sheets.tsx). The lines break as written from 768px and wrap as they
 * fall on phones.
 */
export function Pitch() {
  return (
    <Sheet id="intro" tone="paper" sectionClassName="sheet--round sheet--auto">
      <Container className="pitch">
        <p className="type-pitch" data-reveal="up">
          {pitch.map((line) => (
            // The trailing space keeps the lines apart in the text itself
            // (search, copy and paste) and is the word space on phones.
            <span key={line} className="line">
              {line}{" "}
            </span>
          ))}
        </p>
      </Container>
    </Sheet>
  );
}
