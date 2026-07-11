"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Photo } from "./Photo";
import { ArrowIcon } from "./icons";
import { categories } from "@/lib/site";
import { products } from "@/lib/content";

export function CatalogGrid() {
  const params = useSearchParams();
  const initial = params.get("c") ?? "all";
  const valid = categories.some((c) => c.slug === initial) ? initial : "all";
  const [active, setActive] = useState<string>(valid);
  const reduce = useReducedMotion();

  const shown =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div className="container-content mt-10">
      {/* Filter chips */}
      <div
        className="flex flex-wrap gap-2.5"
        role="group"
        aria-label="Filter products by category"
      >
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            className="chip"
            data-active={active === c.slug}
            aria-pressed={active === c.slug}
            onClick={() => setActive(c.slug)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Product grid with animated layout on filter change */}
      <motion.ul
        layout={!reduce}
        className="mt-8 grid list-none grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.li
              key={p.id}
              layout={!reduce}
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <article className="group h-full overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition-all duration-200 ease-out-soft hover:-translate-y-1 hover:shadow-lift">
                <div className="aspect-[4/3]">
                  <Photo src={p.img} alt={p.name} sizes="(max-width:640px) 90vw, 33vw" className="h-full" rounded="rounded-none">
                    <span className="absolute left-3 top-3 rounded-full bg-ink/30 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-surface backdrop-blur-sm">
                      {p.categoryLabel}
                    </span>
                  </Photo>
                </div>
                <div className="flex flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display text-xl">{p.name}</h2>
                    <span className="shrink-0 rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-primary-strong">
                      {p.priceLabel}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{p.blurb}</p>
                  <div className="mt-4">
                    {p.custom ? (
                      <Link
                        href={`/quote?item=${encodeURIComponent(p.name)}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-strong"
                      >
                        Request a quote
                        <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70">
                        Enquire to order
                        <ArrowIcon className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
