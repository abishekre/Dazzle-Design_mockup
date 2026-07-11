import { Fraunces, Hanken_Grotesk } from "next/font/google";

// Display — Fraunces: warm old-style serif with optical sizing. Deliberately
// NOT Playfair, to avoid the AI-default look.
export const fontDisplay = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

// Body/UI — Hanken Grotesk: warm humanist grotesque. Avoids Inter.
export const fontBody = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
