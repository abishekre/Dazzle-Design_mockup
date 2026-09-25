import type { Metadata } from "next";
import { site, whatsappLink } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { MobileActionBar } from "@/components/MobileActionBar";

// Everything Dazzle Designs: branding, navigation and metadata. Route groups
// don't affect URLs, so these pages stay at /, /about, /services, etc.
export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.subtitle,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.subtitle,
    type: "website",
  },
};

export default function DazzleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppWidget
        href={whatsappLink(`Hi ${site.name}! I'd love to know more about your party decor.`)}
        bubbleTitle="Questions about your event?"
        bubbleBody="We usually reply within a few hours."
      />
      <MobileActionBar
        href="/quote"
        label="Request a Quote"
        whatsappHref={whatsappLink(`Hi ${site.name}! I have a question about your decor.`)}
      />
    </>
  );
}
