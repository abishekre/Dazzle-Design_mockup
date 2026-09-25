import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import { FloralPageHeader } from "@/components/floral/FloralPageHeader";
import { floral } from "@/lib/floral";

export const metadata: Metadata = {
  title: "Enquire",
  description: `Order or customise a piece from ${floral.name} by ${floral.by} — bouquets, candle decor, boutonnieres, balloon clusters and graduation leis.`,
};

export default function FloralEnquirePage() {
  return (
    <>
      <FloralPageHeader
        eyebrow="Orders"
        title="Tell Celin what you need"
        intro="Share the piece, the date and your colours. Your order goes straight to Celin — she'll confirm availability and the final price."
      />
      <Suspense fallback={null}>
        {/* channel="shop" is explicit: without it, an enquiry submitted here
            without a preselected item would be routed to the Dazzle inbox. */}
        <QuoteForm channel="shop" />
      </Suspense>
    </>
  );
}
