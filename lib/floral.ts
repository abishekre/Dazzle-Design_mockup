import type { Tone } from "./content";

/**
 * Floral Launch by Celin — an independent business that happens to be hosted
 * inside this repo for now.
 *
 * Celin runs it on her own and it is meant to outlive Dazzle Designs, so this
 * file is the single source of truth for her brand. Nothing here may import
 * from lib/site.ts: keeping the dependency one-directional (Dazzle may link to
 * Floral, never the reverse) is what lets app/(floral), components/floral,
 * components/ShopArt.tsx and this file be lifted into their own repo without
 * untangling anything.
 */
export const floral = {
  name: "Floral Launch",
  by: "Celin",
  tagline: "Handmade florals, candles and little celebration pieces",
  subtitle:
    "Bouquets, candle decor, boutonnieres, balloon clusters and graduation leis — made to order by Celin.",
  // wa.me format: digits only, including country code.
  whatsappNumber: "12819228650",
  instagram: "https://www.instagram.com/florallaunchbycelin/",
  // Delivery only, no pickup.
  deliveryRadiusMiles: 30,
  deliveryAreas: ["Sugar Land", "Missouri City", "Stafford", "Sienna"],
  // Celin's order inbox lives in SHOP_NOTIFY_TO (server-side only) — a personal
  // address in this file would ship to the browser and get scraped.
};

export const floralNav = [
  { href: "/floral", label: "Shop" },
  { href: "/floral/enquire", label: "Enquire" },
] as const;

export function floralWhatsappLink(message?: string) {
  const base = `https://wa.me/${floral.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// No real product photography yet, so each item uses a hand-drawn illustration
// (components/ShopArt.tsx) rather than a stock or AI photo. Prices are the
// starting points Celin confirmed; the final price depends on customization
// and is settled once availability is checked for the date.
export type ShopCategory = "candles" | "bouquets" | "boutonnieres" | "balloons" | "leis";

export type ShopItem = {
  id: string;
  name: string;
  category: ShopCategory;
  blurb: string;
  priceLabel: string;
  variant: import("@/components/ShopArt").ArtVariant;
  tone: Tone;
  customizable?: boolean;
};

export const shopItems: ShopItem[] = [
  {
    id: "seasonal-bouquet",
    name: "Fresh or Artificial Seasonal Bouquet",
    category: "bouquets",
    blurb: "Hand-tied in fresh or artificial blooms — whichever suits the day. Tell us your colours.",
    priceLabel: "From $45",
    variant: "bouquet",
    tone: "blush",
    customizable: true,
  },
  {
    id: "candle-decor",
    name: "Candle Decor",
    category: "candles",
    blurb: "Candle styling for tables, altars and mantels, finished to match your palette.",
    priceLabel: "From $20",
    variant: "pillar",
    tone: "ivory",
    customizable: true,
  },
  {
    id: "boutonniere",
    name: "Boutonniere",
    category: "boutonnieres",
    blurb: "A single pinned bloom for the groom, groomsmen, or a proud parent.",
    priceLabel: "From $8",
    variant: "boutonniere",
    tone: "sage",
    customizable: true,
  },
  {
    id: "balloon-cluster",
    name: "Balloon Cluster",
    category: "balloons",
    blurb: "A cheerful cluster for a doorway, chair, or gift table. Any colour combination.",
    priceLabel: "From $35",
    variant: "balloon-cluster",
    tone: "sky",
    customizable: true,
  },
  {
    id: "graduation-lei",
    name: "Graduation Lei",
    category: "leis",
    blurb: "A floral lei to celebrate the big day — made in your school colours.",
    priceLabel: "From $20",
    variant: "lei",
    tone: "gold",
    customizable: true,
  },
];
