"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How far in advance should I book?",
    a: "We recommend reaching out 3–4 weeks ahead so we can design and build your setup properly for your date. Ask anyway if it's sooner — we'll always be honest about what's possible.",
  },
  {
    q: "What areas do you cover?",
    a: "We style events across Greater Houston — Stafford, Sugar Land and nearby areas in Texas. Let us know your venue when you enquire and we'll confirm.",
  },
  {
    q: "What kinds of events do you decorate?",
    a: "Communions, baptisms, birthdays, baby showers, gender reveals, weddings and haldi, graduations, housewarmings, Onam and more — plus custom balloon work for any celebration.",
  },
  {
    q: "How does pricing work?",
    a: "Every event is quoted individually, based on the occasion, scale, materials and install. You'll always get a clear quote before committing — no surprises.",
  },
  {
    q: "Can everything be customized?",
    a: "Absolutely. Colours, florals, backdrops and balloons are all tailored to your palette and theme. Share your vision in the quote form and we'll take it from there.",
  },
];

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="container-content mt-10">
      <ul className="mx-auto max-w-2xl divide-y divide-border border-y border-border">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-display text-lg text-ink">{f.q}</span>
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-primary-strong transition-transform duration-300 ease-out-soft ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              {/* grid-rows 0fr→1fr animates height on the GPU — no JS measurement */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out-soft ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-prose pb-5 text-muted">{f.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
