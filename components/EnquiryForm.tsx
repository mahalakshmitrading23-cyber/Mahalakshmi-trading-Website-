"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { emptyEnquiry, validateEnquiry, whatsappText, type Enquiry, type EnquiryKind, type FieldErrors } from "@/lib/enquiry";
import { company, productById, products, quantityUnits, requirementTypes, waLink } from "@/lib/site";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; via: "email" | "whatsapp" }
  | { state: "error"; message: string };

export default function EnquiryForm({ kind }: { kind: EnquiryKind }) {
  const [data, setData] = useState<Enquiry>(() => emptyEnquiry(kind));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [consent, setConsent] = useState(true);
  const [consentError, setConsentError] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Pre-select a product from /quote?product=dae (read on the client so the page stays static)
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("product");
    if (id && productById(id)) setData((d) => (d.products.includes(id) ? d : { ...d, products: [...d.products, id] }));
  }, []);

  useEffect(() => {
    if (status.state === "sent" || status.state === "error") resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status]);

  const set = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleProduct = (id: string) =>
    set("products", data.products.includes(id) ? data.products.filter((p) => p !== id) : [...data.products, id]);

  async function post(payload: Enquiry) {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: FieldErrors };
    return { ok: res.ok && !!json.ok, ...json };
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel = submitter?.dataset.via === "whatsapp" ? "whatsapp" : "email";
    const payload = { ...data, gstin: data.gstin.toUpperCase(), channel } as Enquiry;

    const found = validateEnquiry(payload);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"] input, [data-field="${first}"] textarea`)?.focus();
      return;
    }

    if (!consent) {
      setConsentError("Please accept the privacy consent to proceed.");
      return;
    }
    setConsentError("");

    if (channel === "whatsapp") {
      // Open synchronously (inside the click) so pop-up blockers allow it, then email a copy in the background.
      window.open(waLink(whatsappText(payload)), "_blank", "noopener");
      setStatus({ state: "sent", via: "whatsapp" });
      post(payload).catch(() => {});
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await post(payload);
      if (res.ok) return setStatus({ state: "sent", via: "email" });
      if (res.errors) setErrors(res.errors);
      setStatus({ state: "error", message: res.error || "Something went wrong." });
    } catch {
      setStatus({ state: "error", message: "We couldn't reach the server. Please check your connection or WhatsApp us." });
    }
  }

  const reset = () => {
    setData(emptyEnquiry(kind));
    setErrors({});
    setStatus({ state: "idle" });
  };

  if (status.state === "sent") {
    return (
      <div className="form-success show" role="status" aria-live="polite" ref={resultRef}>
        <div className="ok"><Icon name="check" /></div>
        {status.via === "email" ? (
          <>
            <h2>Thank you — your enquiry has been sent</h2>
            <p style={{ color: "var(--muted)", maxWidth: 480, margin: "0 auto" }}>
              Our team has received your requirement and will get back to you shortly
              {data.email ? <> — we've also emailed a copy to <strong>{data.email}</strong></> : null}.
            </p>
          </>
        ) : (
          <>
            <h2>WhatsApp is ready — just press send</h2>
            <p style={{ color: "var(--muted)", maxWidth: 480, margin: "0 auto" }}>
              We've opened WhatsApp with your requirement typed in. If it didn't open, use the button below.
            </p>
          </>
        )}
        <div className="btn-row">
          <a className="btn btn-whatsapp" href={waLink(whatsappText(data))} target="_blank" rel="noopener"><Icon name="whatsapp" />{status.via === "email" ? "Also chat on WhatsApp" : "Open WhatsApp"}</a>
          <button className="btn btn-outline" type="button" onClick={reset}>New enquiry</button>
        </div>
      </div>
    );
  }

  const sending = status.state === "sending";
  const isQuote = kind === "quote";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      <h2>{isQuote ? "Your requirement" : "Send us a message"}</h2>
      <p>Fields marked <span style={{ color: "var(--orange-600)" }}>*</span> are required. For B2B / bulk supply only.</p>

      {/* honeypot */}
      <div className="hp-field" aria-hidden="true">
        <label>Website <input tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} /></label>
      </div>

      {isQuote && (
        <>
          <div className="form-section">
            <div className="form-section-title"><span>1</span>Product(s)</div>
            <div className={`field full products-field${errors.products ? " invalid" : ""}`} data-field="products">
              <div className="product-picks" role="group" aria-label="Products (select one or more)">
                {products.map((p) => (
                  <div className="pick" key={p.id}>
                    <input type="checkbox" id={`p-${p.id}`} checked={data.products.includes(p.id)} onChange={() => toggleProduct(p.id)} />
                    <label htmlFor={`p-${p.id}`}>
                      <span className="pk-ico"><Icon name={p.icon} /></span>{p.name}
                      <span className="pk-check"><Icon name="check" /></span>
                    </label>
                  </div>
                ))}
              </div>
              <span className="err">{errors.products}</span>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title"><span>2</span>Quantity &amp; delivery</div>
            <div className="form-grid">
              <Field name="quantity" label="Required quantity" errors={errors}>
                <div className="input-group">
                  <input className="input" id="quantity" type="number" min="0" step="any" inputMode="decimal" placeholder="e.g. 50" value={data.quantity} onChange={(e) => set("quantity", e.target.value)} />
                  <select className="select" aria-label="Unit" value={data.unit} onChange={(e) => set("unit", e.target.value)}>
                    {quantityUnits.map((u) => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </Field>
              <Field name="frequency" label="Requirement type" errors={errors}>
                <select className="select" id="frequency" value={data.frequency} onChange={(e) => set("frequency", e.target.value)}>
                  <option value="">Select…</option>
                  {requirementTypes.map((r) => <option key={r}>{r}</option>)}
                </select>
              </Field>
              <Field name="location" label="Delivery location" required errors={errors}>
                <input className="input" id="location" type="text" autoComplete="address-level2" placeholder="City, State" value={data.location} onChange={(e) => set("location", e.target.value)} />
              </Field>
              <Field name="needBy" label="Required by" errors={errors}>
                <input className="input" id="needBy" type="date" value={data.needBy} onChange={(e) => set("needBy", e.target.value)} />
              </Field>
            </div>
          </div>
        </>
      )}

      <div className="form-section">
        {isQuote && <div className="form-section-title"><span>3</span>Company &amp; contact</div>}
        <div className="form-grid">
          <Field name="name" label="Your name" required errors={errors}>
            <input className="input" id="name" type="text" autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          {isQuote && (
            <Field name="designation" label="Designation" errors={errors}>
              <input className="input" id="designation" type="text" autoComplete="organization-title" placeholder="e.g. Purchase Manager" value={data.designation} onChange={(e) => set("designation", e.target.value)} />
            </Field>
          )}
          <Field name="company" label="Company name" required errors={errors}>
            <input className="input" id="company" type="text" autoComplete="organization" value={data.company} onChange={(e) => set("company", e.target.value)} />
          </Field>
          {isQuote && (
            <Field name="gstin" label="GSTIN" errors={errors}>
              <input className="input" id="gstin" type="text" maxLength={15} style={{ textTransform: "uppercase" }} placeholder="15-character GSTIN" value={data.gstin} onChange={(e) => set("gstin", e.target.value)} />
            </Field>
          )}
          <Field name="phone" label="Mobile / WhatsApp" required errors={errors}>
            <input className="input" id="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
          </Field>
          <Field name="email" label="Business email" errors={errors}>
            <input className="input" id="email" type="email" autoComplete="email" placeholder="We'll send you a copy" value={data.email} onChange={(e) => set("email", e.target.value)} />
          </Field>
          <Field name="message" label={isQuote ? "Specification / additional details" : "Your message"} required={!isQuote} full errors={errors}>
            <textarea
              className="textarea" id="message" value={data.message} onChange={(e) => set("message", e.target.value)}
              placeholder={isQuote ? "Grade or specification, packaging preference, documents you need, etc." : "Which product, approximate quantity, and anything else we should know."}
            />
          </Field>
        </div>
      </div>

      {status.state === "error" && (
        <div className="form-error" role="alert" ref={resultRef}>
          <Icon name="info" />
          <span>
            {status.message}{" "}
            <a href={waLink(whatsappText(data))} target="_blank" rel="noopener">Send on WhatsApp</a> or call{" "}
            <a href={`tel:${company.phones[0].tel}`}>{company.phones[0].display}</a>.
          </span>
        </div>
      )}

      <div className={`field full${consentError ? " invalid" : ""}`} style={{ margin: "16px 0 8px" }}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: "var(--muted)", fontWeight: "normal" }}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setConsentError("");
            }}
            style={{ width: 17, height: 17, marginTop: 2, accentColor: "var(--orange)", flexShrink: 0 }}
          />
          <span>
            I agree to {company.name} processing my details to respond to this commercial enquiry as set out in the{" "}
            <Link href="/privacy" target="_blank" style={{ color: "var(--orange-600)", textDecoration: "underline" }}>
              Privacy Policy
            </Link>.
          </span>
        </label>
        {consentError && <span className="err">{consentError}</span>}
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" data-via="email" disabled={sending}>
          {sending ? <><span className="spinner" aria-hidden="true" />Sending…</> : <><Icon name="send" />{isQuote ? "Send Enquiry" : "Send Message"}</>}
        </button>
        <button className="btn btn-whatsapp" type="submit" data-via="whatsapp" disabled={sending}>
          <Icon name="whatsapp" />Send on WhatsApp
        </button>
      </div>
      <p className="form-note"><Icon name="shield" />Your details are used only to respond to your enquiry.</p>
    </form>
  );
}

function Field({
  name, label, required, full, errors, children,
}: {
  name: keyof Enquiry; label: string; required?: boolean; full?: boolean; errors: FieldErrors; children: React.ReactNode;
}) {
  return (
    <div className={`field${full ? " full" : ""}${errors[name] ? " invalid" : ""}`} data-field={name}>
      <label htmlFor={name}>
        {label} {required ? <span className="req">*</span> : <span className="opt">(optional)</span>}
      </label>
      {children}
      <span className="err">{errors[name]}</span>
    </div>
  );
}
