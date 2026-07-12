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
  message?: string;
};

/**
 * Notify the team of a new quote request via Resend email + an optional
 * Discord/Slack webhook (instant ping). Both are best-effort: failures are
 * logged but never block the customer's submission.
 *
 * Env (see .env.example):
 *   RESEND_API_KEY, QUOTE_NOTIFY_TO, QUOTE_NOTIFY_FROM   (email)
 *   TEAM_WEBHOOK_URL                                      (Discord/Slack)
 */
export async function notifyTeam(data: QuoteData): Promise<void> {
  await Promise.allSettled([sendEmail(data), sendWebhook(data)]);
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
    ["Item", data.item],
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
  const lines = [
    `**New quote request**`,
    `👤 ${data.name} · ${data.email}${data.phone ? ` · ${data.phone}` : ""}`,
    data.eventType || data.eventDate ? `📅 ${[data.eventType, data.eventDate].filter(Boolean).join(" · ")}` : "",
    data.item ? `🕯️ ${data.item}` : "",
    data.message ? `📝 ${data.message}` : "",
  ].filter(Boolean);
  // Discord expects { content }; Slack expects { text }. Send both keys.
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: lines.join("\n"), text: lines.join("\n") }),
  });
}
