import { Resend } from "resend";
import { site } from "./site";
import { floral } from "./floral";

export type Channel = "event" | "shop";

export type QuoteData = {
  channel?: Channel;
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  guests?: string;
  budget?: string;
  area?: string;
  item?: string;
  quantity?: string;
  checklist?: string[];
  message?: string;
};

/**
 * Notify the right person about a new quote request, via WhatsApp + Resend
 * email + an optional Discord/Slack webhook. All best-effort: failures are
 * logged but never block the customer's submission.
 *
 * Two independent recipient channels, because Floral Launch (bouquets, candle
 * decor, boutonnieres, balloon clusters, graduation leis) is run by Celin on her
 * own — her enquiries should never land in the shared event-decor
 * inbox/WhatsApp, and vice versa:
 *   channel "event" → WHATSAPP_NOTIFY_RECIPIENTS, QUOTE_NOTIFY_TO  (the team)
 *   channel "shop"  → SHOP_WHATSAPP_RECIPIENTS,   SHOP_NOTIFY_TO   (Celin only)
 * See .env.example for the full list of env vars.
 */
export async function notifyTeam(data: QuoteData): Promise<void> {
  // Every order goes out on BOTH channels to whichever party owns it:
  // WhatsApp (what they actually watch) and email (the durable record they
  // can search and reply from). Fired in parallel so one slow or broken
  // channel never delays the other, and each failure is logged by name —
  // a silent WhatsApp outage would otherwise look identical to success.
  const channels: [string, Promise<void>][] = [
    ["whatsapp", sendWhatsApp(data)],
    ["email", sendEmail(data)],
    ["webhook", sendWebhook(data)],
  ];
  const results = await Promise.allSettled(channels.map(([, p]) => p));
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[notify:${data.channel || "event"}] ${channels[i][0]} failed:`, r.reason);
    }
  });
}

function summaryLines(data: QuoteData): string[] {
  return [
    data.channel === "shop" ? `New ${floral.name} order` : `New quote request`,
    `${data.name} · ${data.email}${data.phone ? ` · ${data.phone}` : ""}`,
    data.eventType || data.eventDate ? `${[data.eventType, data.eventDate].filter(Boolean).join(" · ")}` : "",
    data.item ? `Item: ${data.item}${data.quantity ? ` (x${data.quantity})` : ""}` : "",
    data.area ? `Area: ${data.area}` : "",
    data.checklist?.length ? `Wants: ${data.checklist.join(", ")}` : "",
    data.message ? `"${data.message}"` : "",
  ].filter(Boolean);
}

/**
 * WhatsApp notification via CallMeBot — a free, simple API for personal
 * notifications (not the official WhatsApp Business API, which needs Meta
 * business verification + approved templates). Each recipient must opt in
 * once: save +34 644 59 71 67, message it "I allow callmebot to send me
 * messages", and they'll reply with an apikey. See .env.example.
 *
 * Env format: "phone:apikey,phone2:apikey2"
 * (phone = full number with country code, no +, e.g. 15168080715)
 */
async function sendWhatsApp(data: QuoteData) {
  const envVar = data.channel === "shop" ? "SHOP_WHATSAPP_RECIPIENTS" : "WHATSAPP_NOTIFY_RECIPIENTS";
  const raw = process.env[envVar];
  if (!raw) return;

  const text = encodeURIComponent(summaryLines(data).join("\n"));
  const recipients = raw
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean)
    .map((r) => {
      const [phone, apikey] = r.split(":").map((s) => s.trim());
      return { phone, apikey };
    })
    .filter((r) => r.phone && r.apikey);

  const sent = await Promise.allSettled(
    recipients.map(async ({ phone, apikey }) => {
      const res = await fetch(
        `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${text}&apikey=${apikey}`,
      );
      // fetch() resolves on 4xx/5xx too, so a wrong or expired apikey would
      // look like success. Surface it instead.
      if (!res.ok) throw new Error(`CallMeBot ${res.status} for ${phone}`);
    }),
  );
  sent.forEach((r) => {
    if (r.status === "rejected") console.error("[notify] WhatsApp send failed:", r.reason);
  });
}

async function sendEmail(data: QuoteData) {
  const key = process.env.RESEND_API_KEY;
  const isShop = data.channel === "shop";
  const to = isShop ? process.env.SHOP_NOTIFY_TO : process.env.QUOTE_NOTIFY_TO;
  const from = (isShop ? process.env.SHOP_NOTIFY_FROM : process.env.QUOTE_NOTIFY_FROM) || process.env.QUOTE_NOTIFY_FROM;
  if (!key || !to || !from) return;

  const resend = new Resend(key);
  const rows = ([
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Event", data.eventType],
    ["Date", data.eventDate],
    ["Guests", data.guests],
    ["Budget", data.budget],
    ["Area", data.area],
    ["Item", data.quantity ? `${data.item} (x${data.quantity})` : data.item],
    ["Wants included", data.checklist?.join(", ")],
    ["Message", data.message],
  ] as const)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#6b615a">${k}</td><td style="padding:4px 0">${v}</td></tr>`)
    .join("");

  const heading = isShop ? `New ${floral.name} order` : "New quote request";

  await resend.emails.send({
    from,
    to: to.split(",").map((s) => s.trim()),
    replyTo: data.email,
    subject: `${heading} — ${data.name}${data.eventDate ? ` · ${data.eventDate}` : ""}`,
    html: `<h2 style="font-family:Georgia,serif;color:#2a2422">${heading}</h2><table style="font-family:system-ui;font-size:14px">${rows}</table><p style="color:#6b615a;font-size:12px">— ${site.name} website</p>`,
  });
}

async function sendWebhook(data: QuoteData) {
  const url = data.channel === "shop" ? process.env.SHOP_WEBHOOK_URL : process.env.TEAM_WEBHOOK_URL;
  if (!url) return;
  const lines = summaryLines(data);
  // Discord expects { content }; Slack expects { text }. Send both keys.
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: lines.join("\n"), text: lines.join("\n") }),
  });
}
