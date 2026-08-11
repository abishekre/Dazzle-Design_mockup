"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { nav, site } from "@/lib/site";
import { LogoMark } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The header floats transparently at the very top, then turns solid on
  // scroll. Text stays dark throughout (the hero is light/ivory now).
  const atTop = !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const raf = requestAnimationFrame(onScroll); // defer initial check off the render phase
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        atTop
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-bg/85 backdrop-blur-md"
      }`}
    >
      <div className="container-content flex h-16 items-center justify-between sm:h-[72px]">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg font-medium tracking-tight text-ink sm:text-xl"
          onClick={() => setOpen(false)}
        >
          <LogoMark className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
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
          className="flex h-11 w-11 items-center justify-center text-ink md:hidden"
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
