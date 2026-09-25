# Floral Launch — how to move it out

Floral Launch by Celin is built as a separate business that currently shares
this deployment. It is structured so it can leave without untangling anything.

## The boundary

Floral owns these, and nothing else in the repo imports them:

```
app/(floral)/            her routes  (/floral, /floral/enquire)
components/floral/       her header, footer, mark, page header
components/ShopArt.tsx   her product illustrations
lib/floral.ts            her brand, products, prices, delivery, links
.theme-floral            her palette (in app/globals.css)
```

**The rule that keeps this true:** `lib/floral.ts` must never import from
`lib/site.ts`. Dazzle may link to Floral; Floral must not depend on Dazzle.
The one exception is a courtesy link in `FloralFooter.tsx` — a plain `<a>` to
`/`, safe to delete.

## Shared, and what happens to it

| Shared | On extraction |
|---|---|
| `app/layout.tsx` | Document shell only — no branding. Copy as-is. |
| `components/` — `Reveal`, `Photo`, `icons`, `WhatsAppWidget`, `MobileActionBar` | Brand-agnostic (each layout passes its own copy). Copy as-is. |
| `app/globals.css` | Copy; make `.theme-floral` the `:root` values. |
| `app/api/quote/route.ts` + `lib/notify.ts` | Copy; drop the `"event"` branch and keep `"shop"`. |
| `lib/content.ts` | Only the `Tone` type is used. Copy that type across. |

## Steps

1. New repo, `create-next-app` with the same Next/Tailwind versions.
2. Copy the files listed under **The boundary**, plus the shared files above.
3. Move `app/(floral)/floral/*` up to `app/*` so `/floral` becomes `/`.
4. Drop `/floral` from `floralNav` hrefs (they become `/` and `/enquire`).
5. Env: `RESEND_API_KEY`, `SHOP_NOTIFY_TO`, `SHOP_NOTIFY_FROM`,
   `SHOP_WHATSAPP_RECIPIENTS`. Rename the `SHOP_` prefix if you like — one file.
6. New Vercel project, point it at her domain.
7. In this repo, delete `app/(floral)`, `components/floral`, `lib/floral.ts`,
   `components/ShopArt.tsx`, and change the `nav` entry in `lib/site.ts` to an
   external link to her new URL.

Nothing on the Dazzle side breaks: the nav entry is the only reference.
