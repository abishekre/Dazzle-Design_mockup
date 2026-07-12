import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PhotoStudio } from "@/components/PhotoStudio";

export const metadata: Metadata = {
  title: "Photo Studio",
  description: "Internal tool — check a photo looks warm and on-brand before adding it.",
  robots: { index: false, follow: false },
};

// NOTE: This lives under /admin, which will be protected by Supabase auth
// (profiles.role = 'admin') once the backend lands. For now it's simply
// unlinked from the public site and excluded from search.
export default function AdminStudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Team tool"
        title="Photo studio"
        intro="Snapped a photo on your phone? Drop it in to see how it'll look on the site — we add the warm styling automatically, so you don't need fancy gear."
      />
      <PhotoStudio />
    </>
  );
}
