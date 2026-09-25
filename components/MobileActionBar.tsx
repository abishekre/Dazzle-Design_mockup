"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "./icons";

/**
 * Thumb-zone action bar for phones (md:hidden). Persistent, app-like: a primary
 * call to action plus a one-tap WhatsApp. Hidden on the page it points at.
 *
 * Brand-agnostic — see WhatsAppWidget.
 */
export function MobileActionBar({
  href,
  label,
  whatsappHref,
  whatsappLabel = "Message us on WhatsApp",
}: {
  href: string;
  label: string;
  whatsappHref: string;
  whatsappLabel?: string;
}) {
  const pathname = usePathname();
  if (pathname === href) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/90 px-4 pt-2.5 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <Link href={href} className="btn-primary flex-1">
          {label}
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={whatsappLabel}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-surface shadow-soft transition-transform active:scale-95"
          style={{ backgroundColor: "#25d366" }}
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}
