import { Resend } from "resend";
import { site } from "./site";

export type QuoteData = {
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
 * Notify the team of a new quote request via WhatsApp + Resend email + an
 * optional Discord/Slack webhook. All best-effort: failures are logged but
 * never block the customer's submission.
 *
 * Env (see .env.example):
 *   WHATSAPP_NOTIFY_RECIPIENTS                          (WhatsApp, via CallMeBot)
 *   RESEND_API_KEY, QUOTE_NOTIFY_TO, QUOTE_NOTIFY_FROM   (email)
 *   TEAM_WEBHOOK_URL                                     (Discord/Slack)
 */
export async function notifyTeam(data: QuoteData): Promise<void> {
  await Promise.allSettled([sendWhatsApp(data), sendEmail(data), sendWebhook(data)]);
}

function summaryLines(data: QuoteData): string[] {
  return [
    `New quote request`,
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
 * WHATSAPP_NOTIFY_RECIPIENTS format: "phone:apikey,phone2:apikey2"
 * (phone = full number with country code, no +, e.g. 15168080715)
 */
async function sendWhatsApp(data: QuoteData) {
  const raw = process.env.WHATSAPP_NOTIFY_RECIPIENTS;
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

  await Promise.allSettled(
    recipients.map(({ phone, apikey }) =>
      fetch(`https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${text}&apikey=${apikey}`),
    ),
  );
}

async function sendEmail(data: QuoteData) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_NOTIFY_TO;
  const from = process.env.QUOTE_NOTIFY_FROM;
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

  await resend.emails.send({
    from,
    to: to.split(",").map((s) => s.trim()),
    replyTo: data.email,
    subject: `New quote request — ${data.name}${data.eventDate ? ` · ${data.eventDate}` : ""}`,
    html: `<h2 style="font-family:Georgia,serif;color:#2a2422">New quote request</h2><table style="font-family:system-ui;font-size:14px">${rows}</table><p style="color:#6b615a;font-size:12px">— ${site.name} website</p>`,
  });
}

async function sendWebhook(data: QuoteData) {
  const url = process.env.TEAM_WEBHOOK_URL;
  if (!url) return;
  const lines = summaryLines(data);
  // Discord expects { content }; Slack expects { text }. Send both keys.
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: lines.join("\n"), text: lines.join("\n") }),
  });
}
