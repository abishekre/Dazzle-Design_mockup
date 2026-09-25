import Link from "next/link";
import { floral, floralNav, floralWhatsappLink } from "@/lib/floral";
import { FloralMark } from "./FloralMark";

export function FloralFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-surface-2/60">
      <div className="container-content py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <FloralMark className="h-7 w-7 text-primary-strong" />
              <span className="font-display text-xl text-ink">{floral.name}</span>
            </div>
            <p className="mt-3 text-sm text-muted">{floral.subtitle}</p>
            <p className="mt-4 text-sm text-muted">
              Delivery only, within {floral.deliveryRadiusMiles} miles —{" "}
              {floral.deliveryAreas.join(", ")} and nearby.
            </p>
          </div>

          <div className="flex gap-12 sm:gap-16">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">Shop</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {floralNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-muted transition-colors hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">Contact</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href={floralWhatsappLink(`Hi ${floral.by}! I'd love to ask about ${floral.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-ink"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={floral.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-ink"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {floral.name} by {floral.by}
          </p>
          {/* A courtesy link, not a dependency — Floral Launch is its own
              business. Safe to delete if she'd rather stand entirely alone. */}
          <p>
            Looking for full event decor?{" "}
            <Link href="/" className="link-underline text-muted transition-colors hover:text-ink">
              Dazzle Designs
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
