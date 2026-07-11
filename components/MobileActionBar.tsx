"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappLink, site } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/**
 * Thumb-zone action bar for phones (md:hidden). Persistent, app-like: primary
 * "Request a Quote" plus a one-tap WhatsApp. Hidden on the quote page itself.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname === "/quote") return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/90 px-4 pt-2.5 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <Link href="/quote" className="btn-primary flex-1">
          Request a Quote
        </Link>
        <a
          href={whatsappLink(`Hi ${site.name}! I have a question about your decor.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message us on WhatsApp"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-surface shadow-soft transition-transform active:scale-95"
          style={{ backgroundColor: "#25d366" }}
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}
