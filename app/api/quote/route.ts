import { NextResponse } from "next/server";

// Stub endpoint for the Request-a-Quote form.
//
// TODO (Phase 1 backend): replace the console.log with:
//   1. insert into Supabase `quote_requests`
//   2. Resend email (customer confirmation + team alert)
//   3. Discord/Slack webhook ping for instant team notification
// See plan Part 3. Keep the same request/response shape so the form is untouched.

const MIN_LEAD_DAYS = 7;

type QuotePayload = {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  guests?: string;
  budget?: string;
  area?: string;
  item?: string;
  message?: string;
};

export async function POST(req: Request) {
  let body: QuotePayload;
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

  // Placeholder for real persistence + notifications.
  console.log("[quote_request]", JSON.stringify(body));

  return NextResponse.json({ ok: true });
}
