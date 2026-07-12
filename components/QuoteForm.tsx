"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { SparkIcon } from "./icons";
import { eventTypes } from "@/lib/site";

const MIN_LEAD_DAYS = 7;

const field =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink placeholder:text-muted/70 " +
  "transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";
const label = "block text-sm font-semibold text-ink";

export function QuoteForm() {
  const params = useSearchParams();
  const prefillItem = params.get("item") ?? "";
  const reduce = useReducedMotion();

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Minimum selectable date = today + lead time
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + MIN_LEAD_DAYS);
    return d.toISOString().split("T")[0];
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors ?? { form: data.error ?? "Something went wrong." });
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setErrors({ form: "Couldn't reach the server. Please try again." });
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="container-content mt-10">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-xl overflow-hidden rounded-xl border border-border bg-surface p-10 text-center shadow-soft"
        >
          {!reduce && <PetalDrop />}
          <div className="relative">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary/15 text-secondary">
              <SparkIcon className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-display text-3xl">Thank you!</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Your request is in. One of the three of us will get back to you soon —
              usually within a day — to talk through your event.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-content mt-10">
      <form
        onSubmit={onSubmit}
        noValidate
        className="mx-auto grid max-w-2xl gap-5 rounded-xl border border-border bg-surface p-6 shadow-soft sm:p-8"
      >
        {errors.form && (
          <p role="alert" className="rounded-lg bg-lead-red/10 px-4 py-3 text-sm text-lead-red">
            {errors.form}
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Your name" error={errors.name} required>
            <input id="name" name="name" className={field} placeholder="First & last" autoComplete="name" />
          </Field>
          <Field id="email" label="Email" error={errors.email} required>
            <input id="email" name="email" type="email" className={field} placeholder="you@email.com" autoComplete="email" />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="phone" label="Phone / WhatsApp" hint="Optional">
            <input id="phone" name="phone" className={field} placeholder="For quicker replies" autoComplete="tel" />
          </Field>
          <Field id="eventType" label="Event type">
            <select id="eventType" name="eventType" className={field} defaultValue="">
              <option value="" disabled>Choose one…</option>
              {eventTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="eventDate"
            label="Event date"
            error={errors.eventDate}
            hint={`We need at least ${MIN_LEAD_DAYS} days' notice`}
            required
          >
            <input id="eventDate" name="eventDate" type="date" min={minDate} className={field} />
          </Field>
          <Field id="guests" label="Approx. guests" hint="Optional">
            <input id="guests" name="guests" inputMode="numeric" className={field} placeholder="e.g. 40" />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="budget" label="Budget range" hint="Optional">
            <select id="budget" name="budget" className={field} defaultValue="">
              <option value="" disabled>Choose a range…</option>
              <option>Under $150</option>
              <option>$150 – $400</option>
              <option>$400 – $900</option>
              <option>$900+</option>
              <option>Not sure yet</option>
            </select>
          </Field>
          <Field id="area" label="Event location / area" hint="Optional">
            <input id="area" name="area" className={field} placeholder="Suburb or venue" />
          </Field>
        </div>

        <Field id="message" label="Tell us about your vision" hint="Colours, theme, must-haves">
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`${field} resize-y`}
            placeholder="What are you dreaming up?"
            defaultValue={prefillItem ? `I'm interested in: ${prefillItem}. ` : ""}
          />
        </Field>

        <p className="text-xs text-muted">
          Prefer to attach inspiration photos? You&apos;ll be able to add them once
          we reply — or send them to us on WhatsApp.
        </p>

        <button type="submit" className="btn-primary w-full sm:w-auto sm:justify-self-start" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send request"}
        </button>
      </form>
    </div>
  );
}

function Field({
  id,
  label: labelText,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={id} className={label}>
          {labelText}
          {required && <span className="text-primary-strong"> *</span>}
        </label>
        {hint && !error && <span className="text-xs text-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-lead-red">
          {error}
        </p>
      )}
    </div>
  );
}

/** A few soft petals drifting down — subtle, on-brand success flourish. */
function PetalDrop() {
  const petals = Array.from({ length: 10 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((_, i) => {
        const left = (i * 97) % 100;
        const delay = (i % 5) * 0.15;
        const tones = ["#d9a441", "#c56b4a", "#7c8b6e", "#c98b8b"];
        return (
          <motion.span
            key={i}
            className="absolute top-0 h-2.5 w-2.5 rounded-full"
            style={{ left: `${left}%`, backgroundColor: tones[i % tones.length] }}
            initial={{ y: -20, opacity: 0, rotate: 0 }}
            animate={{ y: 260, opacity: [0, 1, 1, 0], rotate: 180 }}
            transition={{ duration: 2.4, delay, ease: "easeIn" }}
          />
        );
      })}
    </div>
  );
}
