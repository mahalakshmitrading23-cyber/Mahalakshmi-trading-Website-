import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHero } from "@/components/Sections";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy of ${company.name}. Learn how we collect, process, and safeguard commercial enquiry information in compliance with the DPDP Act and Indian IT regulations.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Privacy Policy" }]}
        title="Privacy Policy"
        lead={`How ${company.name} protects and handles business information and personal data.`}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="reveal" style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: "36px 32px" }}>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              <strong>Last Updated:</strong> October 2026 · Compliant with the Digital Personal Data Protection (DPDP) Act 2023 and Information Technology Act 2000.
            </p>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>1. Introduction &amp; Identity</h2>
            <p>
              {company.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is an industrial B2B trading firm founded in {company.founded}, based in {company.address.city}, {company.address.state}, India (GSTIN: {company.gstin}). We are committed to safeguarding the commercial data and personal details entrusted to us by buyers, suppliers, and website visitors.
            </p>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>2. Information We Collect</h2>
            <p>We adhere strictly to the principle of <strong>data minimization</strong>. We collect only the information necessary to evaluate and fulfill your commercial supply requirements:</p>
            <ul style={{ listStyle: "disc", paddingLeft: 24, margin: "12px 0 20px" }}>
              <li><strong>Contact Details:</strong> Your name, official designation, business email address, and mobile/WhatsApp number.</li>
              <li><strong>Commercial Information:</strong> Company name, GSTIN (Goods and Services Tax Identification Number), product interest, volume requirements, delivery destination, and purchase timelines.</li>
              <li><strong>Technical Metadata:</strong> Best-effort client IP addresses collected momentarily solely for abuse prevention and anti-spam rate limiting.</li>
            </ul>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>3. Purpose &amp; Legal Basis of Processing</h2>
            <p>We process your information exclusively for legitimate B2B business purposes:</p>
            <ul style={{ listStyle: "disc", paddingLeft: 24, margin: "12px 0 20px" }}>
              <li>To prepare and issue commercial quotations for industrial ethanol, spirits, and molasses.</li>
              <li>To verify the buyer&apos;s legal eligibility and excise permit compliance (especially for regulated goods like Extra Neutral Alcohol).</li>
              <li>To arrange logistical tankers and issue statutory GST e-way bills and tax invoices.</li>
              <li>To communicate order status, dispatch schedules, and delivery documents.</li>
            </ul>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>4. Cookies &amp; Tracking Technologies</h2>
            <p>
              Our website uses <strong>zero third-party tracking pixels, advertising cookies, or behavioral trackers</strong>. We do not track your browsing across third-party websites. Any local browser storage is strictly limited to technical functionality (e.g. mobile navigation state).
            </p>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>5. Information Sharing &amp; Third Parties</h2>
            <p>
              We <strong>do not sell, rent, or trade</strong> your business or personal details to any marketing networks or third parties. We disclose data solely to:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: 24, margin: "12px 0 20px" }}>
              <li>Authorized transport and freight carriers for delivery coordination to your plant.</li>
              <li>Government excise, tax, and regulatory authorities when legally mandated under applicable laws of India.</li>
            </ul>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>6. Data Security &amp; Retention</h2>
            <p>
              All data transmitted through our website is encrypted using industry-standard TLS (Transport Layer Security). We maintain administrative and technical safeguards to prevent unauthorized access. Commercial records are retained as mandated by Indian taxation and company auditing laws.
            </p>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>7. Your Rights (Correction &amp; Erasure)</h2>
            <p>
              Under the Digital Personal Data Protection Act, you have the right to request access to, correction of, or erasure of your personal data when no longer required for statutory compliance. To exercise these rights, please email us at <a href={`mailto:${company.email}`} style={{ color: "var(--orange-600)", textDecoration: "underline" }}>{company.email}</a>.
            </p>

            <h2 style={{ fontSize: 22, marginTop: 28 }}>8. Grievance Redressal</h2>
            <p>For any privacy inquiries or grievances, you may contact our designated representative:</p>
            <p style={{ background: "var(--bg-soft)", padding: 16, borderRadius: "var(--radius)" }}>
              <strong>Grievance Officer:</strong> {company.runBy}<br />
              <strong>Company:</strong> {company.name}<br />
              <strong>Address:</strong> {company.address.line1}, {company.address.city}, {company.address.state}, India<br />
              <strong>Email:</strong> <a href={`mailto:${company.email}`}>{company.email}</a><br />
              <strong>Phone:</strong> <a href={`tel:${company.phones[0].tel}`}>{company.phones[0].display}</a>
            </p>

            <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--line)", display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-outline" href="/terms">View Terms of Service</Link>
              <Link className="btn btn-outline" href="/refund-policy">View Supply &amp; Refund Policy</Link>
              <Link className="btn btn-primary" href="/contact">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
