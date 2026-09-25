"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon, CloseIcon } from "./icons";

/**
 * Floating WhatsApp widget — gentle delayed entrance, never an aggressive
 * auto-popup. A small prompt bubble appears once, then can be dismissed.
 *
 * Brand-agnostic: each layout passes its own link and copy, so Dazzle Designs
 * and Floral Launch share the behaviour without sharing an identity.
 */
export function WhatsAppWidget({
  href,
  bubbleTitle,
  bubbleBody,
  ariaLabel = "Chat with us on WhatsApp",
}: {
  href: string;
  bubbleTitle: string;
  bubbleBody: string;
  ariaLabel?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 900);
    const t2 = setTimeout(() => setShowBubble(true), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 hidden flex-col items-end gap-3 transition-all duration-500 ease-out-soft md:flex ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {showBubble && (
        <div className="relative max-w-[230px] rounded-lg rounded-br-none border border-border bg-surface px-4 py-3 text-sm shadow-soft">
          <button
            type="button"
            onClick={() => setShowBubble(false)}
            aria-label="Dismiss message"
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-soft transition-colors hover:text-ink"
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
          <p className="font-medium text-ink">{bubbleTitle}</p>
          <p className="mt-0.5 text-muted">{bubbleBody}</p>
        </div>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="group flex h-14 w-14 items-center justify-center rounded-full text-surface shadow-lift transition-transform duration-200 ease-out-soft hover:scale-105 active:scale-95"
        style={{ backgroundColor: "#25d366" }}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  );
}
