import Link from "next/link";
import { nav, site } from "@/lib/site";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink sm:mt-32">
      <div className="container-content grid gap-10 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:py-20">
        <div>
          <div className="flex items-center gap-2.5 font-display text-xl font-medium text-white">
            <LogoMark className="h-9 w-9 shrink-0 text-accent" />
            {site.name}
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/60">{site.subtitle}</p>
          <p className="mt-3 text-sm text-white/60">{site.serviceArea}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent/80">
            Explore
          </h2>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline text-sm text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent/80">
            Get in touch
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-white/75 transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.socials.instagram}
                className="link-underline text-white/75 transition-colors hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.socials.facebook}
                className="link-underline text-white/75 transition-colors hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-underline text-white/75 transition-colors hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="pt-1">
              <Link
                href="/quote"
                className="text-accent underline-offset-4 hover:underline"
              >
                Request a custom quote
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pb-20 md:pb-0">
        <div className="container-content flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Handmade with care.
          </p>
          <p>Event Decor · Candles &amp; More</p>
        </div>
      </div>
    </footer>
  );
}
