import { NextResponse } from "next/server";
import { normalizeEnquiry, validateEnquiry } from "@/lib/enquiry";
import { mailConfigured, sendEnquiryEmails } from "@/lib/mailer";

export const runtime = "nodejs";

// Best-effort per-IP limit. Resets when the server instance restarts, which is fine for spam damping.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const enquiry = normalizeEnquiry(body);

  // Bots fill the hidden field; pretend success so they don't retry.
  if (enquiry.website) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries from this connection. Please call or WhatsApp us instead." },
      { status: 429 },
    );
  }

  if (!mailConfigured()) {
    console.error("[enquiry] SMTP is not configured; enquiry not emailed:", JSON.stringify(enquiry));
    return NextResponse.json(
      { ok: false, error: "Our email service is temporarily unavailable. Please WhatsApp or call us." },
      { status: 503 },
    );
  }

  try {
    await sendEnquiryEmails(enquiry);
  } catch (err) {
    console.error("[enquiry] sending failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your enquiry right now. Please WhatsApp or call us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
