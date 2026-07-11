"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const faqs = [
  {
    q: "How far in advance should I book?",
    a: "For candles and bouquets, a week or two is usually plenty. For custom stage decor, we recommend reaching out 3–4 weeks ahead so we can design and build it properly for your date.",
  },
  {
    q: "Do you deliver?",
    a: "Yes — we deliver and, for stage decor, install across the city and nearby suburbs. Pickup can also be arranged for smaller items. We'll confirm details when we quote.",
  },
  {
    q: "Can everything be customized?",
    a: "Absolutely. Colours, scents, flowers and styling can all be tailored to your palette and theme. Share your vision in the quote form and we'll take it from there.",
  },
  {
    q: "How does pricing work?",
    a: "Candles and bouquets have set starting prices in the shop. Stage decor is quoted per event, based on scale, materials and install. You'll always get a clear quote before committing.",
  },
  {
    q: "What if my date is very soon?",
    a: "Because we're a small team taking limited events each weekend, very short notice isn't always possible — but ask anyway. If we can't, we'll tell you honestly rather than rush the work.",
  },
];

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

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
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-primary-strong transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-prose pb-5 text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
