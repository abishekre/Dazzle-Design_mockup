import { fontDisplay, fontBody } from "./fonts";
import "./globals.css";

/**
 * True root layout: document shell only — fonts, global CSS, skip link.
 *
 * Deliberately carries NO branding, navigation or metadata. Two independent
 * brands live under this shell, each owning its own chrome and identity:
 *   app/(dazzle)  → Dazzle Designs   (event decor)
 *   app/(floral)  → Floral Launch    (Celin's own shop)
 *
 * Floral Launch is meant to outlive Dazzle Designs, so nothing Dazzle-specific
 * may be added here — it would silently leak into her pages. See
 * app/(floral)/layout.tsx.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
