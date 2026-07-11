import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PhotoStudio } from "@/components/PhotoStudio";

export const metadata: Metadata = {
  title: "Photo Studio",
  description: "A quick way for the team to check a photo looks warm and on-brand before adding it.",
  robots: { index: false }, // internal team helper — keep out of search
};

export default function StudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="For our team"
        title="Photo studio"
        intro="Snapped a photo on your phone? Drop it in to see how it'll look on the site — we add the warm styling automatically, so you don't need fancy gear."
      />
      <PhotoStudio />
    </>
  );
}
