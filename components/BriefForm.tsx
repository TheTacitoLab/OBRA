"use client";

import { useState, type FormEvent } from "react";
import { Arrow, Asterisk } from "./brand/Marks";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
};

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  placeholder,
}: FieldProps) {
  const control =
    "mt-2 w-full rounded-sm border border-line bg-slate px-4 py-3 text-body text-white placeholder:text-mute focus-visible:border-yellow";
  return (
    <div>
      <label htmlFor={name} className="text-tag text-ash">
        {label}
        {required && <span className="text-yellow"> *</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          placeholder={placeholder}
          className={control}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={control}
        />
      )}
    </div>
  );
}

/**
 * Lead-capture / brief form. `compact` trims it to the essentials for the
 * homepage CTA; the full set is used on /brief.
 *
 * TODO: wire submission to your endpoint. Either set a form `action` (e.g. a
 * Formspree URL) and drop the onSubmit, or POST the fields via fetch inside
 * handleSubmit. Right now it just confirms client-side.
 */
export function BriefForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[18rem] flex-col items-start justify-center">
        <Asterisk className="h-8 w-8 text-yellow" />
        <p className="text-headline mt-4 text-white">Brief received.</p>
        <p className="text-body mt-2 text-ash">We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Name" name="name" required placeholder="First and last" />
      <Field
        label="Email"
        name="email"
        type="email"
        required
        placeholder="you@studio.com"
      />
      {!compact && (
        <Field
          label="Brand or project"
          name="brand"
          placeholder="Festival, label, artist, brand…"
        />
      )}
      <Field
        label="Tell us about your drop"
        name="message"
        textarea
        required
        placeholder="The concept, your audience, rough numbers…"
      />
      {!compact && (
        <Field label="Timeline" name="timeline" placeholder="When's the drop?" />
      )}
      <button
        type="submit"
        className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-yellow px-7 py-3.5 text-label text-void transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-14px_rgba(252,222,22,0.55)]"
      >
        Start a brief
        <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}
