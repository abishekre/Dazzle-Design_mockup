import Link from "next/link";
import { ShopArt } from "@/components/ShopArt";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, SparkIcon } from "@/components/icons";
import { FloralPageHeader } from "@/components/floral/FloralPageHeader";
import { shopItems, floral, floralWhatsappLink } from "@/lib/floral";

export default function FloralShopPage() {
  return (
    <>
      <FloralPageHeader
        eyebrow="Made to order"
        title="Bouquets, candles & celebration pieces"
        intro="Everything here is made by hand by Celin. Prices are a starting point — the final price depends on any customization, and every order is confirmed once availability is checked for your date."
      />

      <section className="container-content mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={floralWhatsappLink(`Hi ${floral.by}! I'd love to ask about ${floral.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Message {floral.by} on WhatsApp
          </a>
          <a href={floral.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Follow on Instagram
          </a>
        </div>
      </section>

      {/* Five items across five categories — one grid reads better than five
          headings with a single card under each. */}
      <section className="container-content mt-14">
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {shopItems.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 0.06}>
              <article>
                <div className="tile-hover aspect-[4/5] overflow-hidden rounded-xl">
                  <ShopArt variant={c.variant} tone={c.tone} className="h-full" />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-xl">{c.name}</h2>
                  <span className="shrink-0 text-sm font-medium text-muted">{c.priceLabel}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted">{c.blurb}</p>
                <Link
                  href={`/floral/enquire?item=${encodeURIComponent(c.name)}&price=${encodeURIComponent(c.priceLabel)}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong"
                >
                  Request this
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-content mt-14">
        <Reveal>
          <p className="flex items-start gap-2.5 rounded-lg bg-surface-2 px-5 py-4 text-sm text-ink/80">
            <SparkIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            Delivery only, within {floral.deliveryRadiusMiles} miles —{" "}
            {floral.deliveryAreas.join(", ")} and nearby. Ordering multiple, or want a custom colour
            or size? Mention it in your request; pricing for custom work is confirmed with your quote.
          </p>
        </Reveal>
      </section>
    </>
  );
}
