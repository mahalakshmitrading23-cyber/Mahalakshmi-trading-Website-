import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Sections";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: `Commercial cancellation, quality inspection, and refund terms for bulk industrial ethanol, spirit, and molasses orders with ${company.name}, Baramati.`,
};

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Cancellation & Refund Policy" }]}
        title="Cancellation &amp; Refund Policy"
        lead={`Commercial inspection, cancellation, and refund procedures for bulk industrial deliveries by ${company.name}.`}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="reveal" style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: "36px 32px" }}>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              <strong>Effective Date:</strong> October 2026 · Commercial B2B Supply &amp; Tanker Deliveries.
            </p>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>1. Nature of Goods &amp; B2B Applicability</h2>
            <p>
              {company.name} trades in bulk industrial chemicals, agricultural by-products, and spirits (Denatured Anhydrous Ethanol, SDS, ENA, and Molasses) transported in dedicated road tankers. Because these are perishable or specialized bulk commodities, standard retail return policies do not apply. All sales are governed by commercial B2B contracts.
            </p>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>2. Order Cancellation Prior to Dispatch</h2>
            <p>
              Buyers may cancel an order subject to the following conditions:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: 24, margin: "12px 0 20px" }}>
              <li><strong>Prior to Tanker Allocation &amp; Loading:</strong> Cancellations received in writing before tanker placement and loading at the distillery or depot will be processed in full, with any advance payment refunded after deducting any non-recoverable regulatory or administrative fees.</li>
              <li><strong>After Tanker Loading or Dispatch:</strong> Once a road tanker has been filled, sealed, and dispatched with statutory e-way bills and transit permits, the order cannot be canceled mid-transit due to regulatory and excise restrictions.</li>
            </ul>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>3. Tanker Inspection &amp; Quality Discrepancies</h2>
            <p>
              To maintain transparency and protect both parties, the following inspection protocol applies at the delivery point:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: 24, margin: "12px 0 20px" }}>
              <li><strong>Pre-Decanting Inspection:</strong> Before offloading into receiver storage tanks, the buyer&apos;s authorized quality team must verify the tanker seals and draw representative top, middle, and bottom samples for testing against the accompanying Certificate of Analysis (COA).</li>
              <li><strong>Discrepancy Reporting:</strong> If parameters (e.g. purity, density, water content) deviate materially from contractual specifications, the buyer must immediately notify our sales desk before decanting. Tanker offloading must be halted.</li>
              <li><strong>Resolution:</strong> In the event of a verified specification mismatch, we will arrange either:
                <ol style={{ listStyle: "decimal", paddingLeft: 20, marginTop: 8 }}>
                  <li>Immediate replacement supply from our nearest available distillery terminal, or</li>
                  <li>Tanker recall and a full commercial refund or credit note for the consignment.</li>
                </ol>
              </li>
            </ul>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>4. Quantity &amp; Weighbridge Discrepancies</h2>
            <p>
              Quantity claims must be backed by certified gross and tare weighbridge slips from an authorized weighbridge. Minor handling transit tolerances (within industry-standard evaporation/dip allowances) apply as specified in your purchase agreement.
            </p>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>5. Refund Mode &amp; Processing Timelines</h2>
            <p>
              When a refund or credit note is approved:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: 24, margin: "12px 0 20px" }}>
              <li>Refunds are processed via <strong>RTGS / NEFT bank transfer</strong> directly to the verified corporate bank account of the registered buyer.</li>
              <li>Approved refund payments are released within <strong>3 to 5 business days</strong> following completion of the necessary GST credit documentation.</li>
            </ul>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>6. Contact for Claims</h2>
            <p>
              For commercial claims, tanker documentation verification, or refund inquiries, please contact:
            </p>
            <p style={{ background: "var(--bg-soft)", padding: 16, borderRadius: "var(--radius)" }}>
              <strong>Commercial Operations:</strong> {company.runBy}<br />
              <strong>Direct Phone:</strong> <a href={`tel:${company.phones[0].tel}`}>{company.phones[0].display}</a><br />
              <strong>Official Email:</strong> <a href={`mailto:${company.email}`}>{company.email}</a><br />
              <strong>Registered Office:</strong> {company.name}, {company.address.line1}, {company.address.city}, {company.address.state}, India
            </p>

            <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--line)", display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-outline" href="/terms">Terms of Service</Link>
              <Link className="btn btn-outline" href="/privacy">Privacy Policy</Link>
              <Link className="btn btn-primary" href="/contact">Contact Support</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
