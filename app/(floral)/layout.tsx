import type { Metadata } from "next";
import { floral, floralWhatsappLink } from "@/lib/floral";
import { FloralHeader } from "@/components/floral/FloralHeader";
import { FloralFooter } from "@/components/floral/FloralFooter";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { MobileActionBar } from "@/components/MobileActionBar";

/**
 * Floral Launch by Celin — a separate business sharing this deployment.
 *
 * Its own metadata (no "· Dazzle Designs" title template), its own header and
 * footer, and its own accent palette via .theme-floral. Nothing from
 * lib/site.ts is imported here on purpose: moving app/(floral)/,
 * components/floral/, components/ShopArt.tsx and lib/floral.ts into their own
 * repo should need no rewiring.
 */
export const metadata: Metadata = {
  title: {
    default: `${floral.name} by ${floral.by} — ${floral.tagline}`,
    template: `%s · ${floral.name}`,
  },
  description: floral.subtitle,
  openGraph: {
    title: `${floral.name} by ${floral.by}`,
    description: floral.subtitle,
    type: "website",
  },
};

export default function FloralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-floral">
      <FloralHeader />
      <main id="main">{children}</main>
      <FloralFooter />
      <WhatsAppWidget
        href={floralWhatsappLink(`Hi ${floral.by}! I'd love to ask about ${floral.name}.`)}
        bubbleTitle={`Questions for ${floral.by}?`}
        bubbleBody="Orders come straight to her — she usually replies the same day."
        ariaLabel={`Message ${floral.by} on WhatsApp`}
      />
      <MobileActionBar
        href="/floral/enquire"
        label="Enquire"
        whatsappHref={floralWhatsappLink(`Hi ${floral.by}! I have a question about an order.`)}
        whatsappLabel={`Message ${floral.by} on WhatsApp`}
      />
    </div>
  );
}
