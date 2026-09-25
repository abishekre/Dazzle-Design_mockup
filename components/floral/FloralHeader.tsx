import Link from "next/link";
import { floral, floralNav } from "@/lib/floral";
import { FloralMark } from "./FloralMark";

/**
 * Floral Launch's own header — deliberately not Dazzle's.
 *
 * Only two destinations, so there's no hamburger: both fit on a phone, which
 * keeps this a server component (no JS shipped for navigation).
 */
export function FloralHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link href="/floral" className="group flex items-center gap-2.5">
          <FloralMark className="h-7 w-7 shrink-0 text-primary-strong sm:h-8 sm:w-8" />
          <span className="leading-none">
            <span className="block font-display text-lg font-medium tracking-tight text-ink sm:text-xl">
              {floral.name}
            </span>
            <span className="mt-0.5 block text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              by {floral.by}
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-5 sm:gap-8" aria-label="Primary">
          {floralNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
