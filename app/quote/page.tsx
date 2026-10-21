import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import Icon from "@/components/Icon";
import { PageHero } from "@/components/Sections";
import { company, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Request a quotation for Denatured Anhydrous Ethanol, Special Denatured Spirit, Extra Neutral Alcohol or Molasses. B2B bulk supply across India.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Request a Quote" }]}
        image="/media/sugarcane-transport.jpg"
        title="Request a quotation"
        lead="Tell us what you need. Your enquiry is emailed straight to our sales team — or send it on WhatsApp in one tap."
      />

      <section className="section">
        <div className="container quote-layout">
          <div className="form-card reveal">
            <EnquiryForm kind="quote" />
          </div>

          <div className="aside-stack">
            <div className="aside-card reveal reveal-d1">
              <h3>Prefer to talk?</h3>
              {company.phones.map((p, i) => (
                <div className="contact-line" key={p.tel}>
                  <span className="c-ico"><Icon name="phone" /></span>
                  <div><small>{i === 0 ? "Sales" : "Alternate"}</small><a href={`tel:${p.tel}`}>{p.display}</a></div>
                </div>
              ))}
              <div className="contact-line">
                <span className="c-ico"><Icon name="whatsapp" /></span>
                <div><small>WhatsApp</small><a href={waLink()} target="_blank" rel="noopener">{company.whatsapp.display}</a></div>
              </div>
              <div className="contact-line">
                <span className="c-ico"><Icon name="mail" /></span>
                <div><small>Email</small><a href={`mailto:${company.email}`}>{company.email}</a></div>
              </div>
            </div>
            <div className="aside-card light reveal reveal-d2">
              <h3>What happens next</h3>
              <ol className="mini-steps">
                <li>We review your product, quantity and location.</li>
                <li>We confirm availability and specification.</li>
                <li>You receive a quotation with delivery terms.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
