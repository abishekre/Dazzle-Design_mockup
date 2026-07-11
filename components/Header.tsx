"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { nav, site } from "@/lib/site";
import { SparkIcon } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Home has a full-bleed photo hero → header floats over it (light) until
  // scrolled. Other pages get the solid treatment immediately.
  const isHome = pathname === "/";
  const overHero = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const tone = overHero ? "text-surface" : "text-ink";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        overHero
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-bg/85 backdrop-blur-md"
      }`}
    >
      <div className="container-content flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className={`flex items-center gap-2 font-display text-xl font-medium tracking-tight ${tone}`}
          onClick={() => setOpen(false)}
        >
          <SparkIcon className="h-4 w-4 text-accent" />
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                overHero
                  ? "text-surface/85 hover:text-surface"
                  : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/quote" className="btn-primary !px-5 !py-2.5">
            Request a Quote
          </Link>
        </nav>

        <button
          type="button"
          className={`flex h-11 w-11 items-center justify-center md:hidden ${tone}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-6 bg-current transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden border-border bg-bg transition-all duration-300 ease-out-soft md:hidden ${
          open ? "grid-rows-[1fr] border-b" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav className="container-content flex flex-col gap-1 py-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-3 text-lg font-medium text-ink transition-colors hover:bg-ink/[0.03]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/quote" className="btn-primary mt-2" onClick={() => setOpen(false)}>
              Request a Quote
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
