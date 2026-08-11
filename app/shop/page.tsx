import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ShopArt } from "@/components/ShopArt";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, SparkIcon } from "@/components/icons";
import { shopItems, shopCategoryLabels, type ShopCategory } from "@/lib/content";
import { shop, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop",
  description: "My Floral by Celin — candles, bouquets, boutonnieres, balloon clusters and graduation leis. Starting prices, final quote confirmed for your date.",
};

const categoryOrder: ShopCategory[] = ["bouquets", "candles", "boutonnieres", "balloons", "leis"];

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title={`${shop.name}, by ${shop.by}`}
        intro="Our shop line — candles, bouquets and everyday florals, made and handled directly by Celin. Prices below are our starting point; the final price depends on any customization, and every order is confirmed once we've checked availability for your date."
      />

      {/* Direct contact — this line is Celin's own, separate from the main team */}
      <section className="container-content mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={whatsappLink(`Hi! I'd love to ask about ${shop.name}.`, shop.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Message {shop.by} on WhatsApp
          </a>
          {shop.instagram && (
            <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Follow on Instagram
            </a>
          )}
        </div>
      </section>

      {categoryOrder.map((cat) => {
        const items = shopItems.filter((i) => i.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat} className="container-content mt-14">
            <h2 className="border-t border-ink/15 pt-4 font-display text-2xl sm:text-3xl">
              {shopCategoryLabels[cat]}
            </h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c, i) => (
                <Reveal key={c.id} delay={(i % 3) * 0.06}>
                  <article>
                    <div className="tile-hover aspect-[4/5] overflow-hidden rounded-xl">
                      <ShopArt variant={c.variant} tone={c.tone} className="h-full" />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-xl">{c.name}</h3>
                      <span className="shrink-0 text-sm font-medium text-muted">{c.priceLabel}</span>
                    </div>
                    <p className="mt-1.5 text-sm text-muted">{c.blurb}</p>
                    <Link
                      href={`/quote?item=${encodeURIComponent(c.name)}&price=${encodeURIComponent(c.priceLabel)}`}
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
        );
      })}

      <section className="container-content mt-14">
        <Reveal>
          <p className="flex items-start gap-2.5 rounded-lg bg-surface-2 px-5 py-4 text-sm text-ink/80">
            <SparkIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            Ordering multiple, or want a custom colour, scent, or size for your event? Mention it in
            your request — pricing for custom work is confirmed with your quote.
          </p>
        </Reveal>
      </section>
    </>
  );
}
