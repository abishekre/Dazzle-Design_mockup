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
              animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.97, transition: { duration: 0.2, ease: "easeIn" } }}
            >
              <article className="group h-full">
                <Link
                  href={p.custom ? `/quote?item=${encodeURIComponent(p.name)}` : "/catalog"}
                  className="block"
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-xl">
                    <Photo src={p.img} alt={p.name} sizes="(max-width:640px) 90vw, 33vw" className="h-full" rounded="rounded-xl">
                      <span className="absolute left-3 top-3 text-[11px] font-medium uppercase tracking-wide text-surface text-shadow-soft">
                        {p.categoryLabel}
                      </span>
                    </Photo>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h2 className="font-display text-xl">
                      <span className="link-underline">{p.name}</span>
                    </h2>
                    <span className="shrink-0 text-sm font-medium text-muted">{p.priceLabel}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted">{p.blurb}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong">
                    {p.custom ? "Request a quote" : "Enquire to order"}
                    <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </p>
                </Link>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
