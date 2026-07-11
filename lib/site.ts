// Central place for brand + config constants. Swap these for real values when
// the team provides them (WhatsApp number, service area, socials).

export const site = {
  name: "Dazzle Design",
  tagline: "Elevate your party with elegance",
  subtitle: "Simple, unique party decor — handmade for your celebration.",
  // Placeholder — replace with the real business WhatsApp number (intl format, no +).
  whatsappNumber: "10000000000",
  serviceArea: "Weekend events across the city & nearby suburbs",
  email: "hello@dazzledesign.example",
  socials: {
    instagram: "https://instagram.com/",
  },
};

export const categories = [
  { slug: "all", label: "All" },
  { slug: "candles", label: "Candles" },
  { slug: "bouquets", label: "Bouquets" },
  { slug: "stage-decor", label: "Stage Decor" },
] as const;

export const nav = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/catalog", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "How it works" },
] as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
