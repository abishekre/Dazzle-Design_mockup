import Link from "next/link";
import { nav, site } from "@/lib/site";
import { SparkIcon } from "./icons";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-content grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 font-display text-xl font-medium">
            <SparkIcon className="h-4 w-4 text-accent" />
            {site.name}
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">{site.subtitle}</p>
          <p className="mt-4 text-sm text-muted">{site.serviceArea}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Explore
          </h2>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline text-sm text-ink/80 transition-colors hover:text-primary-strong"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Get in touch
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-ink/80 transition-colors hover:text-primary-strong"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.socials.instagram}
                className="link-underline text-ink/80 transition-colors hover:text-primary-strong"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <Link
                href="/quote"
                className="text-primary-strong underline-offset-4 hover:underline"
              >
                Request a custom quote
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pb-20 md:pb-0">
        <div className="container-content flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Handmade with care.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/studio" className="link-underline transition-colors hover:text-ink">
              Team photo studio
            </Link>
            <span aria-hidden>Candles · Bouquets · Stage Decor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
