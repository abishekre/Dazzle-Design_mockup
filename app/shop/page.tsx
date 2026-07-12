import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CandleArt } from "@/components/CandleArt";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/icons";
import { candles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop",
  description: "Hand-poured candles from Dazzle Designs — starting prices, final quote confirmed for your date.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Candles, made by hand"
        intro="Our first product line — more to come. Prices below are our starting point; the final price depends on any customization, and every order is confirmed once we've checked availability for your date."
      />

      <section className="container-content mt-10">
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {candles.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 0.06}>
              <article>
                <div className="tile-hover aspect-[4/5] overflow-hidden rounded-xl">
                  <CandleArt variant={c.variant} tone={c.tone} className="h-full" />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-xl">{c.name}</h2>
                  <span className="shrink-0 text-sm font-medium text-muted">{c.priceLabel}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted">{c.blurb}</p>
                <Link
                  href={`/quote?item=${encodeURIComponent(c.name)}&price=${encodeURIComponent(c.priceLabel)}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong"
                >
                  Request this candle
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 rounded-lg bg-surface-2 px-5 py-4 text-sm text-ink/80">
            Ordering multiple, or want a custom scent, colour, or size for your event? Mention it in your
            request — pricing for custom work is confirmed with your quote.
          </p>
        </Reveal>
      </section>
    </>
  );
}
