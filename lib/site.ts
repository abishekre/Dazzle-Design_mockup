// Central place for brand + config constants.
// Details confirmed by the team; socials/email sourced from their Facebook page.
export const site = {
  name: "Dazzle Designs",
  tagline: "Elevate your party with elegance",
  subtitle: "Event decor, handmade by a team of five for your celebration.",
  // Primary line, confirmed on WhatsApp. 516-808-0715 is the alternative.
  phone: "+1 281-922-8650",
  altPhone: "+1 516-808-0715",
  // wa.me format (digits only, incl. country code).
  whatsappNumber: "12819228650",
  serviceArea: "Event decor across Greater Houston — Stafford, Sugar Land & nearby, TX",
  // Setup is free in these areas; elsewhere in Greater Houston a setup
  // charge may apply. Small items can also be picked up.
  freeSetupAreas: ["Sugar Land", "Missouri City", "Stafford", "Sienna"],
  email: "dazzledesigns77459@gmail.com",
  socials: {
    instagram: "https://www.instagram.com/dazz_ledesigns",
    facebook: "https://www.facebook.com/people/Dazzle-Designs/61559394457334/",
  },
};

// Floral Launch — the shop line, run independently by Celin. Same site/theme,
// separate contact so her orders reach her directly (see lib/notify.ts).
export const shop = {
  name: "Floral Launch",
  by: "Celin",
  whatsappNumber: "12819228650",
  // Celin's order inbox lives in SHOP_NOTIFY_TO (server-side only) — keeping
  // a personal address out of the client bundle, where it would be scraped.
  // Delivery only, within a 30-mile radius.
  deliveryRadiusMiles: 30,
  deliveryAreas: ["Sugar Land", "Missouri City", "Stafford", "Sienna"],
  instagram: "https://www.instagram.com/florallaunchbycelin/",
};

export const nav = [
  { href: "/services", label: "What we do" },
  { href: "/shop", label: "Shop" },
  { href: "/portfolio", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "How it works" },
] as const;

// Event types offered in the quote form (matches the occasions we style).
export const eventTypes = [
  "Holy Communion",
  "Baptism / Christening",
  "Birthday",
  "Baby Shower",
  "Gender Reveal",
  "Wedding / Haldi",
  "Graduation",
  "Housewarming",
  "Onam",
  "Other",
] as const;

// Common decor add-ons, shown as a checklist on the quote form (checked by
// default — the customer unchecks anything their venue already covers, e.g.
// a hall with its own nice chair covers). Cuts down on back-and-forth.
export const checklistItems = [
  "Backdrop or arch",
  "Balloon garland / installation",
  "Chair covers & sashes",
  "Table cloth & runners",
  "Table centerpieces",
  "Cake / dessert table styling",
  "Gift table",
  "Return gifts / favors table",
  "Welcome board",
  "Card box",
  "Entrance decor",
  "Fairy lights",
  "Welcome sign",
] as const;

// Budget brackets shown on the quote form — confirmed by the team.
export const budgetRanges = [
  "$400 – $500",
  "$500 – $900",
  "$900 – $1,500",
  "$1,500+",
  "Not sure yet",
] as const;

export function whatsappLink(message?: string, number: string = site.whatsappNumber) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
