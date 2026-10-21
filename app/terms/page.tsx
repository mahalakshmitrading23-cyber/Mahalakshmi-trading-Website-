import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Sections";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service & Supply",
  description: `Commercial terms of supply and service for ${company.name}, Baramati. B2B bulk supply rules, GST and excise compliance, quotations, and governing law.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Terms of Service" }]}
        title="Terms of Service &amp; Supply"
        lead={`Commercial terms governing B2B quotations, purchase orders, and bulk deliveries by ${company.name}.`}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="reveal" style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: "36px 32px" }}>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              <strong>Effective Date:</strong> October 2026 · Commercial Terms for Registered Indian Businesses.
            </p>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>1. Scope &amp; B2B Applicability</h2>
            <p>
              These terms govern all quotations, trade enquiries, orders, and contracts entered into with <strong>{company.name}</strong> (Baramati, Maharashtra; GSTIN: {company.gstin}). All products supplied by us—including Denatured Anhydrous Ethanol (DAE), Special Denatured Spirit (SDS), Extra Neutral Alcohol (ENA), and Molasses—are intended <strong>strictly for registered commercial, manufacturing, or licensed industrial buyers</strong>. We do not sell to retail consumers.
            </p>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>2. Regulatory &amp; Excise Compliance</h2>
            <p>
              Buyers must hold and provide valid statutory licenses, permits, and tax registrations required for possessing and utilizing industrial alcohol or spirit:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: 24, margin: "12px 0 20px" }}>
              <li><strong>Extra Neutral Alcohol (ENA):</strong> Supplied exclusively against valid state excise permits, transport passes, and valid distillery allocations as prescribed by the respective State Excise Department.</li>
              <li><strong>Denatured Spirit / DAE:</strong> Handled in accordance with applicable industrial and state chemical storage guidelines.</li>
              <li><strong>Tax Registration:</strong> Buyers must possess a valid, active GSTIN. Orders are billed with standard GST tax invoices and mandatory e-way bills.</li>
            </ul>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>3. Quotations &amp; Commercial Pricing</h2>
            <p>
              Quotations issued via website enquiry, email, or official WhatsApp correspondence are based on prevailing factory mill rates, freight fuel indices, and bulk order quantities:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: 24, margin: "12px 0 20px" }}>
              <li>Quotations remain valid for the period explicitly stated on the quotation sheet (typically 24 to 72 hours due to commodity price movements).</li>
              <li>Taxes (GST, TCS if applicable) and tanker freight charges are invoiced as confirmed in the formal sales contract.</li>
            </ul>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>4. Dispatch, Logistics &amp; Title</h2>
            <p>
              Deliveries are arranged via dedicated stainless steel / mild steel road tankers or buyer-arranged logistics:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: 24, margin: "12px 0 20px" }}>
              <li><strong>Weighbridge &amp; Dip Measurements:</strong> Certified weighbridge slips and loading dip measurements issued at the loading point serve as prima facie evidence of quantity dispatched.</li>
              <li><strong>Transit Risk:</strong> Unless agreed otherwise under specific Incoterms (e.g. Ex-Factory vs FOR destination), transit insurance and risk terms are defined on the purchase confirmation.</li>
              <li><strong>Unloading Turnaround:</strong> Demurrage may apply if tankers are detained beyond the standard free unloading time at the buyer&apos;s plant.</li>
            </ul>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>5. Quality &amp; Inspection</h2>
            <p>
              Every consignment of ethanol or spirit is accompanied by a manufacturer&apos;s Certificate of Analysis (COA). Buyers must draw samples and inspect the consignment before breaking the tanker seal or commencing offloading into storage tanks.
            </p>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>6. Force Majeure</h2>
            <p>
              Neither party shall be held liable for delayed delivery resulting from natural calamities, seasonal crushing delays at sugar mills, transport blockades, state excise quota revisions, or governmental regulatory embargoes beyond reasonable control.
            </p>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>7. Governing Law &amp; Jurisdiction</h2>
            <p>
              All transactions and disputes arising out of contracts with {company.name} are governed by the laws of the Republic of India and are subject to the exclusive jurisdiction of the competent courts in <strong>Baramati / Pune District, Maharashtra</strong>.
            </p>

            <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--line)", display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-outline" href="/privacy">Privacy Policy</Link>
              <Link className="btn btn-outline" href="/refund-policy">Cancellation &amp; Refund Policy</Link>
              <Link className="btn btn-primary" href="/quote">Request a Quotation</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
