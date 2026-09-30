"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { budgetOptions, quantityOptions } from "@/content/site";
import { ENQUIRY_LABELS, UTM_PARAMS } from "@/lib/attribution";
import { siteConfig } from "@/lib/siteConfig";
import { Arrow } from "@/components/site/Button";

type Status = "idle" | "submitting" | "success" | "error";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

/** Field names that are validated, with the message shown when empty. */
const REQUIRED: Record<string, string> = {
  name: "Add your name so we know who to reply to.",
  email: "Add an email address so we can reply.",
  product: "Tell us what you are looking to make.",
  quantity: "Choose a rough quantity.",
  budget: "Choose a budget range, or 'Not sure yet'.",
  message: "Tell us a little about the project.",
};

function messageFor(
  control: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
) {
  if (control.validity.valid) return null;
  if (control.validity.valueMissing)
    return REQUIRED[control.name] ?? "This field is required.";
  if (control.validity.typeMismatch && control.name === "email")
    return "That email address does not look right.";
  return "Please check this field.";
}

function Field({
  label,
  hint,
  error,
  optional = false,
  children,
}: {
  label: string;
  hint?: string;
  error?: string | null;
  /** Marks the few fields that are not required. */
  optional?: boolean;
  children: (props: {
    id: string;
    describedBy: string | undefined;
    invalid: boolean;
  }) => ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;
  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
        {optional && <span className="type-meta text-muted"> (optional)</span>}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && !error && (
        <p id={hintId} className="type-meta text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}

function formatBytes(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/**
 * Project brief form. Posts to Web3Forms from the client as multipart form
 * data (works with the static export). Validation runs on submit and again
 * as a field changes, with the message beneath the field; file attachments
 * are forwarded as-is, and whether they arrive depends on the Web3Forms plan
 * attached to the key.
 */
export function ProjectForm({
  accessKey,
  subject = "New project brief",
}: {
  accessKey: string;
  subject?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [files, setFiles] = useState<{ name: string; size: number }[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);
  const uploadId = useId();

  // The form unmounts on success, so move focus to the confirmation; the
  // live region below is always in the DOM, so the change is announced.
  useEffect(() => {
    if (status === "success") confirmRef.current?.focus();
  }, [status]);
  const announce = (
    <p className="sr-only" role="status" aria-live="polite">
      {status === "success"
        ? "Brief received. Thank you. We’ll read it properly and reply with a plan."
        : ""}
    </p>
  );

  function validateControl(
    control: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  ) {
    if (!(control.name in REQUIRED)) return null;
    return messageFor(control);
  }

  function onFieldChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const control = event.currentTarget;
    if (!(control.name in errors) || errors[control.name] === null) return;
    setErrors((prev) => ({
      ...prev,
      [control.name]: validateControl(control),
    }));
  }

  function onFiles(event: ChangeEvent<HTMLInputElement>) {
    const list = Array.from(event.target.files ?? []);
    const total = list.reduce((sum, file) => sum + file.size, 0);
    if (total > MAX_UPLOAD_BYTES) {
      setFileError("Please keep attachments under 10MB in total.");
      event.target.value = "";
      setFiles([]);
      return;
    }
    setFileError(null);
    setFiles(list.map((file) => ({ name: file.name, size: file.size })));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // Validate every required control and show the messages together.
    const next: Record<string, string | null> = {};
    let firstInvalid: HTMLElement | null = null;
    for (const name of Object.keys(REQUIRED)) {
      const control = form.elements.namedItem(name) as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
        | null;
      if (!control) continue;
      const message = validateControl(control);
      next[name] = message;
      if (message && !firstInvalid) firstInvalid = control;
    }
    setErrors(next);
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Where the brief came from: the tracked button that led here (the
    // `enquiry` parameter, allow-listed) and the campaign parameters the
    // visitor arrived with, both carried in the URL by Attribution.tsx.
    const params = new URLSearchParams(window.location.search);
    const enquiry = ENQUIRY_LABELS[params.get("enquiry") ?? ""];

    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("subject", enquiry ? `${subject} (${enquiry})` : subject);
    formData.append("from_name", "madebyobra website");
    if (enquiry) formData.append("enquiry", enquiry);
    for (const key of UTM_PARAMS) {
      const value = params.get(key);
      if (value) formData.append(key, value.slice(0, 100));
    }

    setStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
        form.reset();
        setFiles([]);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <>
        {announce}
        <div
          ref={confirmRef}
          tabIndex={-1}
          className="flex min-h-[20rem] flex-col justify-center outline-none"
        >
          <p className="type-headline">Brief received.</p>
          <p className="type-body mt-3 max-w-[40ch] text-muted">
            Thank you. We&rsquo;ll read it properly and reply with a plan.
          </p>
        </div>
      </>
    );
  }

  const control = "field__control";

  return (
    <>
      {announce}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="grid gap-x-10 gap-y-7 sm:grid-cols-2 sm:gap-y-9"
      >
        {/* Honeypot: Web3Forms rejects the submission if this is filled. */}
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <Field label="Name" error={errors.name}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="name"
              type="text"
              required
              autoComplete="name"
              aria-describedby={describedBy}
              aria-invalid={invalid || undefined}
              onChange={onFieldChange}
              className={control}
            />
          )}
        </Field>

        <Field label="Email" error={errors.email}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              aria-describedby={describedBy}
              aria-invalid={invalid || undefined}
              onChange={onFieldChange}
              className={control}
            />
          )}
        </Field>

        <Field label="Company / Organisation" optional>
          {({ id }) => (
            <input
              id={id}
              name="organisation"
              type="text"
              autoComplete="organization"
              className={control}
            />
          )}
        </Field>

        <Field label="What are you looking to make?" error={errors.product}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="product"
              type="text"
              required
              placeholder="Caps, tees, a full range..."
              autoComplete="off"
              aria-describedby={describedBy}
              aria-invalid={invalid || undefined}
              onChange={onFieldChange}
              className={control}
            />
          )}
        </Field>

        <Field label="Estimated quantity" error={errors.quantity}>
          {({ id, describedBy, invalid }) => (
            <select
              id={id}
              name="quantity"
              required
              defaultValue=""
              aria-describedby={describedBy}
              aria-invalid={invalid || undefined}
              onChange={onFieldChange}
              className={control}
            >
              <option value="" disabled>
                Select a range
              </option>
              {quantityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field label="Project budget" error={errors.budget}>
          {({ id, describedBy, invalid }) => (
            <select
              id={id}
              name="budget"
              required
              defaultValue=""
              aria-describedby={describedBy}
              aria-invalid={invalid || undefined}
              onChange={onFieldChange}
              className={control}
            >
              <option value="" disabled>
                Select a range
              </option>
              {budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </Field>

        <div className="sm:col-span-2">
          <Field label="Target launch / event date" optional>
            {({ id }) => (
              <input
                id={id}
                name="date"
                type="text"
                placeholder="A date, a month or a season"
                autoComplete="off"
                className={control}
              />
            )}
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Tell us about the project" error={errors.message}>
            {({ id, describedBy, invalid }) => (
              <textarea
                id={id}
                name="message"
                required
                rows={4}
                placeholder="The idea, audience, where it will be sold or given..."
                aria-describedby={describedBy}
                aria-invalid={invalid || undefined}
                onChange={onFieldChange}
                className={control}
              />
            )}
          </Field>
        </div>

        <div className="field sm:col-span-2">
          <label htmlFor={uploadId} className="field__label">
            Upload brief / artwork / references{" "}
            <span className="type-meta text-muted">(optional)</span>
          </label>
          {/* The native control is visually hidden but stays focusable and is
            named by the label above; the outlined area is its visible face
            and forwards a click to it. */}
          <div
            className="upload"
            onClick={(event) => {
              if (event.target !== fileRef.current) fileRef.current?.click();
            }}
          >
            <input
              ref={fileRef}
              id={uploadId}
              name="attachment"
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.webp,.ai,.eps,.svg,.zip,.ppt,.pptx,.key"
              className="sr-only"
              aria-describedby={`${uploadId}-hint`}
              onChange={onFiles}
            />
            <span className="upload__cta">
              {files.length === 0 ? "Add files" : "Replace files"}
            </span>
            <span id={`${uploadId}-hint`} className="type-small text-muted">
              PDF, images or a deck. Up to 10MB total.
            </span>
            {files.length > 0 && (
              <ul className="upload__files" aria-label="Selected files">
                {files.map((file) => (
                  <li key={`${file.name}-${file.size}`}>
                    {file.name}{" "}
                    <span className="type-meta">
                      ({formatBytes(file.size)})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {fileError && (
            <p className="field__error" role="alert">
              {fileError}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-6 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn btn-primary self-start"
          >
            <span>
              {status === "submitting" ? "Sending…" : "Send project brief"}
            </span>
            <Arrow />
          </button>
          <p className="type-small text-muted sm:max-w-[36ch]">
            We only use your details to reply about this project.
          </p>
        </div>

        {status === "error" && (
          <p className="type-small text-clay-deep sm:col-span-2" role="alert">
            Something went wrong sending the brief. Please email us at{" "}
            <a className="u-wipe u-static" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            .
          </p>
        )}
      </form>
    </>
  );
}
