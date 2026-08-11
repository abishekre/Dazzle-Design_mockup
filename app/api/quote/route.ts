import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { notifyTeam, type QuoteData } from "@/lib/notify";

// Request-a-Quote endpoint — shared by event decor and the My Floral shop.
//
// `body.channel` ("event" | "shop") tells notifyTeam which recipient set to
// use — My Floral is run independently by Celin and must never reach the
// shared event-decor inbox/WhatsApp, and vice versa.
//
// When configured (see .env.example) it: (1) inserts into Supabase
// `quote_requests`, and (2) notifies the right person via Resend email +
// WhatsApp + optional webhook. Without env it still validates and logs, so
// the form works in dev and never hard-fails on the customer.

const MIN_LEAD_DAYS = 7;

export async function POST(req: Request) {
  let body: QuoteData;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  if (!body.name?.trim()) errors.name = "Please tell us your name.";
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    errors.email = "A valid email helps us reply.";
  if (!body.eventDate) {
    errors.eventDate = "An event date lets us check availability.";
  } else {
    const earliest = new Date();
    earliest.setHours(0, 0, 0, 0);
    earliest.setDate(earliest.getDate() + MIN_LEAD_DAYS);
    if (new Date(body.eventDate) < earliest) {
      errors.eventDate = `We need at least ${MIN_LEAD_DAYS} days' notice.`;
    }
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // 1. Persist (best-effort — don't fail the customer if the DB hiccups)
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("quote_requests").insert({
      channel: body.channel || "event",
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      event_type: body.eventType || null,
      event_date: body.eventDate || null,
      guests: body.guests || null,
      budget: body.budget || null,
      area: body.area || null,
      item: body.item || null,
      quantity: body.quantity || null,
      checklist: body.checklist?.length ? body.checklist : null,
      message: body.message || null,
      status: "new",
    });
    if (error) console.error("[quote_request] insert failed:", error.message);
  } else {
    console.log("[quote_request] (no DB configured)", JSON.stringify(body));
  }

  // 2. Notify the team (email + webhook, best-effort)
  try {
    await notifyTeam(body);
  } catch (e) {
    console.error("[quote_request] notify failed:", e);
  }

  return NextResponse.json({ ok: true });
}
