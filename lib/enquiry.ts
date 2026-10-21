import { company, productById, quantityUnits, requirementTypes } from "@/lib/site";

/* Shared by the browser forms and /api/enquiry so validation and formatting never drift apart. */

export type EnquiryKind = "quote" | "contact";

export type Enquiry = {
  kind: EnquiryKind;
  products: string[];
  quantity: string;
  unit: string;
  frequency: string;
  location: string;
  needBy: string;
  name: string;
  designation: string;
  company: string;
  gstin: string;
  phone: string;
  email: string;
  message: string;
  channel: "email" | "whatsapp";
  website?: string; // honeypot: real visitors never see or fill this
};

export type FieldErrors = Partial<Record<keyof Enquiry, string>>;

const LIMITS: Partial<Record<keyof Enquiry, number>> = {
  quantity: 20, unit: 20, frequency: 60, location: 120, needBy: 20, name: 100, designation: 100,
  company: 150, gstin: 15, phone: 20, email: 150, message: 2000,
};

export const emptyEnquiry = (kind: EnquiryKind): Enquiry => ({
  kind, products: [], quantity: "", unit: quantityUnits[0], frequency: "", location: "", needBy: "",
  name: "", designation: "", company: "", gstin: "", phone: "", email: "", message: "", channel: "email", website: "",
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GSTIN_RE = /^[0-9]{2}[A-Z0-9]{13}$/;

/** Coerces untrusted input into an Enquiry (unknown keys dropped, strings trimmed and capped). */
export function normalizeEnquiry(raw: unknown): Enquiry {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const kind: EnquiryKind = r.kind === "contact" ? "contact" : "quote";
  const out = emptyEnquiry(kind);
  (Object.keys(LIMITS) as (keyof Enquiry)[]).forEach((k) => {
    const v = r[k];
    (out as Record<string, unknown>)[k] = typeof v === "string" ? v.trim().slice(0, LIMITS[k]) : "";
  });
  out.unit = (quantityUnits as readonly string[]).includes(out.unit) ? out.unit : quantityUnits[0];
  out.frequency = (requirementTypes as readonly string[]).includes(out.frequency) ? out.frequency : "";
  out.gstin = out.gstin.toUpperCase();
  out.products = Array.isArray(r.products)
    ? Array.from(new Set(r.products.filter((p): p is string => typeof p === "string" && !!productById(p))))
    : [];
  out.channel = r.channel === "whatsapp" ? "whatsapp" : "email";
  out.website = typeof r.website === "string" ? r.website : "";
  return out;
}

export function validateEnquiry(e: Enquiry): FieldErrors {
  const err: FieldErrors = {};
  if (!e.name) err.name = "Please enter your name.";
  if (!e.company) err.company = "Please enter your company name.";
  if (e.phone.replace(/\D/g, "").length < 10) err.phone = "Please enter a valid mobile number.";
  if (e.email && !EMAIL_RE.test(e.email)) err.email = "Please enter a valid email address.";
  if (e.gstin && !GSTIN_RE.test(e.gstin)) err.gstin = "GSTIN should be 15 characters, e.g. 27ABCDE1234F1Z5.";
  if (e.kind === "quote") {
    if (!e.products.length) err.products = "Please select at least one product.";
    if (!e.location) err.location = "Please enter the delivery location.";
    if (e.quantity && !(Number(e.quantity) > 0)) err.quantity = "Please enter a valid quantity.";
  } else if (!e.message) {
    err.message = "Please tell us what you need.";
  }
  return err;
}

const productNames = (e: Enquiry) => e.products.map((id) => productById(id)?.name ?? id);

/** Ordered label/value rows; blank optional fields are left out. */
export function enquiryRows(e: Enquiry): [string, string][] {
  const rows: [string, string | false][] = [
    ["Product(s)", e.kind === "quote" && productNames(e).join(", ")],
    ["Quantity", !!e.quantity && `${e.quantity} ${e.unit}`],
    ["Requirement", e.frequency],
    ["Delivery location", e.location],
    ["Required by", e.needBy],
    ["Name", e.name + (e.designation ? ` (${e.designation})` : "")],
    ["Company", e.company],
    ["Mobile", e.phone],
    ["Email", e.email],
    ["GSTIN", e.gstin],
    [e.kind === "quote" ? "Details" : "Message", e.message],
  ];
  return rows.filter((r): r is [string, string] => !!r[1]);
}

export function whatsappText(e: Enquiry) {
  const title = e.kind === "quote" ? "New quotation request" : "New enquiry";
  return [`*${title} — ${company.name} website*`, "", ...enquiryRows(e).map(([k, v]) => `*${k}:* ${v}`)].join("\n");
}

export function enquirySubject(e: Enquiry) {
  const what = e.kind === "quote" ? `Quote request: ${productNames(e).join(", ")}` : "Website enquiry";
  return `${what} — ${e.company}`;
}
