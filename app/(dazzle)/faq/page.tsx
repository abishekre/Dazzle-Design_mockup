import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FaqList } from "@/components/FaqList";

export const metadata: Metadata = {
  title: "How it works",
  description: "Ordering, delivery, customization and lead times — answered.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="Everything you might be wondering"
        intro="A few common questions about ordering, delivery and custom work. Still unsure? Message us on WhatsApp."
      />
      <FaqList />
    </>
  );
}
