import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell us your event date and vision — we'll design custom party decor made just for you.",
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Custom work"
        title="Request a quote"
        intro="Share a few details and we'll come back with ideas and pricing. The more you tell us, the better we can tailor it to your day."
      />
      <Suspense fallback={null}>
        <QuoteForm />
      </Suspense>
    </>
  );
}
