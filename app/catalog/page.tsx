import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { CatalogGrid } from "@/components/CatalogGrid";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Hand-poured candles, seasonal bouquets and custom stage decor for your celebration.",
};

export default function CatalogPage() {
  return (
    <>
      <PageHeader
        eyebrow="The shop"
        title="Handmade pieces for your table & venue"
        intro="Ready-made candles and bouquets to order, plus custom stage decor by quote. Everything is made by hand for your event date."
      />
      <Suspense fallback={null}>
        <CatalogGrid />
      </Suspense>
    </>
  );
}
