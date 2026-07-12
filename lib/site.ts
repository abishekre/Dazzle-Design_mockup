// Central place for brand + config constants. Swap these for real values when
// the team provides them (WhatsApp number, service area, socials).

// Real business details sourced from the team's Facebook/Instagram pages.
export const site = {
  name: "Dazzle Designs",
  tagline: "Elevate your party with elegance",
  subtitle: "Event decor, handmade by a team of five for your celebration.",
  phone: "+1 516-808-0715",
  // wa.me format (digits only, incl. country code). Confirm this line is on WhatsApp.
  whatsappNumber: "15168080715",
  serviceArea: "Event decor across Greater Houston — Stafford, Sugar Land & nearby, TX",
  email: "dazzledesigns77459@gmail.com",
  socials: {
    instagram: "https://www.instagram.com/dazz_ledesigns",
    facebook: "https://www.facebook.com/people/Dazzle-Designs/61559394457334/",
  },
};

export const nav = [
  { href: "/services", label: "What we do" },
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

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
