// Placeholder content that mirrors the eventual Supabase shape (products,
// portfolio_items). `img` points at curated stock placeholders in /public/images
// — swap for real Supabase Storage URLs + the team's own photos later.
// `tone` is kept for gradient accents (team monograms, decorative fills).

export type Tone = "terracotta" | "sage" | "gold" | "rose" | "clay";

export type Product = {
  id: string;
  name: string;
  category: "candles" | "bouquets" | "stage-decor";
  categoryLabel: string;
  priceLabel: string;
  blurb: string;
  img: string;
  tone: Tone;
  custom?: boolean; // stage decor → quote instead of price
};

export type PortfolioItem = {
  id: string;
  title: string;
  event: string;
  img: string;
  tone: Tone;
  span?: "tall" | "wide";
};

export const img = {
  hero: "/images/hero-bouquet.jpg",
  bouquetLush: "/images/bouquet-lush.jpg",
  rosesJar: "/images/roses-jar.jpg",
  chairs: "/images/chairs-decor.jpg",
  flowerShop: "/images/flower-shop.jpg",
  tableFlorals: "/images/table-florals.jpg",
  ceremony: "/images/ceremony-petals.jpg",
  candle: "/images/candle-glow.jpg",
  botanical: "/images/botanical-flatlay.jpg",
};

export const products: Product[] = [
  {
    id: "soy-candle",
    name: "Hand-poured Soy Candle",
    category: "candles",
    categoryLabel: "Candles",
    priceLabel: "From $24",
    blurb: "Warm, clean-burning soy in reusable glass. Choose your scent and colour.",
    img: img.candle,
    tone: "gold",
  },
  {
    id: "garden-bouquet",
    name: "Garden Gathering Bouquet",
    category: "bouquets",
    categoryLabel: "Bouquets",
    priceLabel: "From $45",
    blurb: "Seasonal blooms arranged loose and wild, wrapped in kraft paper.",
    img: img.bouquetLush,
    tone: "sage",
  },
  {
    id: "rose-posy",
    name: "Everlasting Rose Posy",
    category: "bouquets",
    categoryLabel: "Bouquets",
    priceLabel: "From $38",
    blurb: "Terracotta roses & snapdragons, tied with twine in a keepsake jar.",
    img: img.rosesJar,
    tone: "terracotta",
  },
  {
    id: "chair-styling",
    name: "Ceremony Chair Styling",
    category: "stage-decor",
    categoryLabel: "Stage Decor",
    priceLabel: "By quote",
    blurb: "Florals, signage and drapery styled to your palette — built on-site.",
    img: img.chairs,
    tone: "rose",
    custom: true,
  },
  {
    id: "petal-aisle",
    name: "Petal Aisle & Arch",
    category: "stage-decor",
    categoryLabel: "Stage Decor",
    priceLabel: "By quote",
    blurb: "A full-height arch and petal aisle for an unforgettable entrance.",
    img: img.ceremony,
    tone: "terracotta",
    custom: true,
  },
  {
    id: "tablescape",
    name: "Reception Tablescape",
    category: "stage-decor",
    categoryLabel: "Stage Decor",
    priceLabel: "By quote",
    blurb: "Runners, centrepieces and place settings, layered end to end.",
    img: img.tableFlorals,
    tone: "clay",
    custom: true,
  },
];

export const portfolio: PortfolioItem[] = [
  { id: "p1", title: "Golden Hour Ceremony", event: "Wedding · 120 guests", img: img.hero, tone: "gold", span: "tall" },
  { id: "p2", title: "Rustic Reception Table", event: "Wedding · 60 guests", img: img.tableFlorals, tone: "sage" },
  { id: "p3", title: "Petal-Toss Send-off", event: "Ceremony", img: img.ceremony, tone: "rose" },
  { id: "p4", title: "Sweetheart Chairs", event: "Engagement", img: img.chairs, tone: "clay", span: "wide" },
  { id: "p5", title: "Autumn Bridal Bouquet", event: "Bridal party", img: img.bouquetLush, tone: "terracotta" },
  { id: "p6", title: "Amber Rose Centrepieces", event: "Anniversary", img: img.rosesJar, tone: "gold" },
];

export const toneGradient: Record<Tone, string> = {
  terracotta:
    "radial-gradient(120% 90% at 15% 10%, rgba(217,164,65,0.30), transparent 55%), linear-gradient(135deg,#d99a7c,#c56b4a)",
  sage:
    "radial-gradient(120% 90% at 20% 15%, rgba(255,255,255,0.25), transparent 55%), linear-gradient(135deg,#a8b394,#7c8b6e)",
  gold:
    "radial-gradient(120% 90% at 80% 10%, rgba(255,255,255,0.35), transparent 55%), linear-gradient(135deg,#e7c877,#d9a441)",
  rose:
    "radial-gradient(120% 90% at 15% 85%, rgba(217,164,65,0.25), transparent 55%), linear-gradient(135deg,#e0b3ab,#c98b8b)",
  clay:
    "radial-gradient(120% 90% at 85% 85%, rgba(124,139,110,0.30), transparent 55%), linear-gradient(135deg,#d8c4ad,#b89a7d)",
};
