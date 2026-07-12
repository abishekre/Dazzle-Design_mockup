// Real content for Dazzle Designs — event decor by occasion (booking model,
// no product shop). Photos are the team's own (from Facebook), imported
// statically for blur placeholders. Occasion tiles without a photo yet use an
// elegant gradient placeholder until the team adds more images.
import type { StaticImageData } from "next/image";
import communionArch from "../public/images/communion-arch.jpg";
import communionTable from "../public/images/communion-table.jpg";
import communionCake from "../public/images/communion-cake.jpg";
import occCommunion from "../public/images/occ-communion.jpg";
import occGoldcross from "../public/images/occ-goldcross.jpg";
import occBirthday from "../public/images/occ-birthday.jpg";
import occBabyshower from "../public/images/occ-babyshower.jpg";
import occGenderreveal from "../public/images/occ-genderreveal.jpg";
import occWedding from "../public/images/occ-wedding.jpg";
import occGraduation from "../public/images/occ-graduation.jpg";
import occHousewarming from "../public/images/occ-housewarming.jpg";
import occOnam from "../public/images/occ-onam.jpg";
import occBalloon from "../public/images/occ-balloon.jpg";
import galSweet16 from "../public/images/gal-sweet16.jpg";

export type Tone = "ivory" | "gold" | "blush" | "sage" | "sky";

export const img = {
  communionArch,
  communionTable,
  communionCake,
};

// A curated few of the best portrait shots for the editorial hero cluster.
export const heroShots = {
  primary: occCommunion, // secret-garden communion — lush white/gold
  secondary: occGoldcross, // God-bless gold cross backdrop
  tertiary: occHousewarming, // sage-green arch
};

export type Occasion = {
  id: string;
  name: string;
  blurb: string;
  tone: Tone;
  img?: StaticImageData;
  included: string[];
};

// The occasions Dazzle Designs styles (from their real service list).
export const occasions: Occasion[] = [
  {
    id: "holy-communion",
    name: "Holy Communion",
    blurb: "White-and-gold backdrops, cake tables and sacrament details for a graceful First Communion.",
    tone: "gold",
    img: occCommunion,
    included: ["Floral arch & backdrop", "Cake & dessert table styling", "Chalice, cross & sacrament details", "Pedestals, candles & signage"],
  },
  {
    id: "baptism",
    name: "Baptism & Christening",
    blurb: "Soft, reverent decor to welcome the newest member of the family.",
    tone: "ivory",
    img: occGoldcross,
    included: ["Christening backdrop", "Cake & dessert table", "Soft florals & drapery", "Welcome signage"],
  },
  {
    id: "birthdays",
    name: "Birthdays",
    blurb: "Themed setups for every age — from first birthdays to milestone celebrations.",
    tone: "blush",
    img: occBirthday,
    included: ["Themed backdrop", "Balloon garland or arch", "Cake table & props", "Name & number signage"],
  },
  {
    id: "baby-shower",
    name: "Baby Shower",
    blurb: "Gentle pastels, balloon arches and a dessert table to celebrate what's coming.",
    tone: "sky",
    img: occBabyshower,
    included: ["Themed backdrop", "Balloon installation", "Dessert table styling", "Welcome sign & props"],
  },
  {
    id: "gender-reveal",
    name: "Gender Reveal",
    blurb: "A playful, photo-ready setup for the big moment.",
    tone: "blush",
    img: occGenderreveal,
    included: ["Reveal backdrop", "Balloon installation", "Photo props", "Table styling"],
  },
  {
    id: "wedding-haldi",
    name: "Wedding & Haldi",
    blurb: "Stage, mandap and haldi styling with florals and drapery, tailored to your traditions.",
    tone: "gold",
    img: occWedding,
    included: ["Stage & mandap styling", "Floral & drapery work", "Seating & entrance decor", "Haldi setup"],
  },
  {
    id: "graduation",
    name: "Graduation",
    blurb: "Celebrate the milestone with a photo backdrop and a styled table.",
    tone: "sage",
    img: occGraduation,
    included: ["Photo backdrop", "Balloon numbers", "Table styling", "Congrats signage"],
  },
  {
    id: "housewarming",
    name: "Housewarming",
    blurb: "Warm, welcoming decor to bless a new home.",
    tone: "ivory",
    img: occHousewarming,
    included: ["Entrance styling", "Florals & drapery", "Welcome decor", "Table accents"],
  },
  {
    id: "onam",
    name: "Onam",
    blurb: "Traditional Kerala styling — pookalam-inspired florals and a festive backdrop.",
    tone: "sage",
    img: occOnam,
    included: ["Pookalam-inspired florals", "Traditional backdrop", "Marigold garlands", "Festive props"],
  },
  {
    id: "balloon-work",
    name: "Balloon Work",
    blurb: "Custom garlands, arches, columns and numbers for any celebration.",
    tone: "blush",
    img: occBalloon,
    included: ["Organic garlands", "Arches & columns", "Numbers & letters", "Colour-matched to your theme"],
  },
];

export function getOccasion(id: string): Occasion | undefined {
  return occasions.find((o) => o.id === id);
}

export function relatedOccasions(id: string, count = 3): Occasion[] {
  return occasions.filter((o) => o.id !== id).slice(0, count);
}

// Real recent work (labelled honestly). More to come as the team adds photos.
export type GalleryItem = { id: string; title: string; event: string; img: StaticImageData; tone: Tone; span?: "tall" | "wide" };

export const gallery: GalleryItem[] = [
  { id: "g1", title: "Evelyn's First Holy Communion", event: "Stafford Banquet Hall, TX", img: communionArch, tone: "gold", span: "wide" },
  { id: "g2", title: "Secret Garden Communion", event: "First Holy Communion", img: occCommunion, tone: "sage", span: "tall" },
  { id: "g3", title: "A Little Cowboy", event: "Baby Shower", img: occBabyshower, tone: "ivory" },
  { id: "g4", title: "Haldi Ceremony", event: "Wedding", img: occWedding, tone: "gold" },
  { id: "g5", title: "Onam Pookalam", event: "Onam Celebration", img: occOnam, tone: "sage", span: "wide" },
  { id: "g6", title: "Sweet Sixteen", event: "Birthday", img: galSweet16, tone: "blush", span: "tall" },
  { id: "g7", title: "Baby Bee Reveal", event: "Gender Reveal", img: occGenderreveal, tone: "gold" },
  { id: "g8", title: "Congrats Grad", event: "Graduation", img: occGraduation, tone: "blush" },
  { id: "g9", title: "Welcome Home", event: "Housewarming", img: occHousewarming, tone: "sage" },
  { id: "g10", title: "First Birthday", event: "Birthday", img: occBirthday, tone: "blush" },
];

// Photos from real First Communion events — shown on the communion occasion page.
export const communionShots: GalleryItem[] = [
  { id: "c1", title: "Evelyn's First Holy Communion", event: "Stafford Banquet Hall, TX", img: communionArch, tone: "gold", span: "wide" },
  { id: "c2", title: "Secret Garden Communion", event: "First Holy Communion", img: occCommunion, tone: "sage", span: "tall" },
  { id: "c3", title: "White & Gold Cake Table", event: "First Holy Communion", img: communionTable, tone: "ivory" },
  { id: "c4", title: "Chalice & Cross Details", event: "First Holy Communion", img: communionCake, tone: "gold" },
];

// Elegant light gradients for placeholder tiles (occasions without a photo yet)
// and decorative fills. White/gold/pastel to match the brand.
export const toneGradient: Record<Tone, string> = {
  ivory: "radial-gradient(120% 90% at 20% 15%, rgba(255,255,255,0.9), transparent 55%), linear-gradient(135deg,#f6efe2,#e9dcc6)",
  gold: "radial-gradient(120% 90% at 80% 10%, rgba(255,255,255,0.7), transparent 55%), linear-gradient(135deg,#e7cf9c,#cbab63)",
  blush: "radial-gradient(120% 90% at 15% 85%, rgba(255,255,255,0.7), transparent 55%), linear-gradient(135deg,#f3ddd8,#e3bdb4)",
  sage: "radial-gradient(120% 90% at 85% 85%, rgba(255,255,255,0.7), transparent 55%), linear-gradient(135deg,#dfe4d6,#bcc6ac)",
  sky: "radial-gradient(120% 90% at 20% 20%, rgba(255,255,255,0.8), transparent 55%), linear-gradient(135deg,#e2e8ec,#c3d0d8)",
};
