import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import Icon from "@/components/Icon";
import { PageHero, SectionHead } from "@/components/Sections";
import { company, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Baramati, Maharashtra",
  description: `Contact ${company.name}, ${company.address.line1}, ${company.address.city}. Call ${company.phones[0].display}, WhatsApp or email ${company.email}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        image="/media/sugarcane-field.jpg"
        title="Contact our sales team"
        lead="Call, WhatsApp or email us with your requirement. For the fastest response, send the product, quantity and delivery location."
      />

      <section className="section contact-top">
        <div className="container">
          <SectionHead kicker="Reach us" title="Four ways to get in touch" lead="Pick whichever suits you. Phone and WhatsApp get the fastest answer." />
          <div className="contact-cards">
            <a className="contact-card reveal" href={`tel:${company.phones[0].tel}`}>
              <span className="c-ico"><Icon name="phone" /></span>
              <h3>Call us</h3>
              <p>Speak directly with our team.</p>
              <span className="val">{company.phones.map((p, i) => <span key={p.tel}>{i > 0 && <br />}{p.display}</span>)}</span>
            </a>
            <a className="contact-card reveal reveal-d1" href={waLink()} target="_blank" rel="noopener">
              <span className="c-ico" style={{ background: "#e7f9ee", color: "#1a9c4b" }}><Icon name="whatsapp" /></span>
              <h3>WhatsApp</h3>
              <p>Quick enquiries and documents.</p>
              <span className="val">{company.whatsapp.display}</span>
            </a>
            <a className="contact-card reveal reveal-d2" href={`mailto:${company.email}`}>
              <span className="c-ico"><Icon name="mail" /></span>
              <h3>Email</h3>
              <p>For RFQs and specifications.</p>
              <span className="val">{company.email.split("@")[0]}@<wbr />{company.email.split("@")[1]}</span>
            </a>
            <Link className="contact-card reveal reveal-d3" href="/quote">
              <span className="c-ico" style={{ background: "var(--orange)", color: "#fff" }}><Icon name="file" /></span>
              <h3>Request a quote</h3>
              <p>Send a structured enquiry in 1 minute.</p>
              <span className="val link-arrow">Open quote form <Icon name="arrow-right" /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container quote-layout">
          <div className="form-card reveal">
            <EnquiryForm kind="contact" />
          </div>
          <div className="aside-stack">
            <div className="aside-card reveal">
              <span className="kicker">Quickest reply</span>
              <h3>Message us on WhatsApp</h3>
              <p>Send the product, quantity and delivery location. You can attach specifications or documents too.</p>
              <a className="btn btn-whatsapp btn-block" href={waLink(`Hello ${company.name}, I would like a quotation.`)} target="_blank" rel="noopener"><Icon name="whatsapp" />{company.whatsapp.display}</a>
            </div>
            <div className="aside-card light reveal reveal-d1">
              <span className="kicker">Our office</span>
              <h3 style={{ fontSize: 24 }}>{company.name}</h3>
              <div className="info-rows">
                <div className="info-row"><Icon name="pin" /><div><small>Address</small><strong>{company.address.line1}, {company.address.city},<br />{company.address.state}, {company.address.country}</strong></div></div>
                <div className="info-row"><Icon name="users" /><div><small>Founder</small><strong>{company.founder}</strong></div></div>
                <div className="info-row"><Icon name="building" /><div><small>Business type</small><strong>B2B Trader · Established {company.founded}</strong></div></div>
              </div>
              <div className="gst-badge"><b>GSTIN</b>{company.gstin}</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
                <a className="btn btn-dark btn-sm" href={company.googleLinks.location} target="_blank" rel="noopener"><Icon name="pin" />Find us on Google</a>
                <a className="btn btn-outline btn-sm" href={company.googleLinks.profile} target="_blank" rel="noopener"><Icon name="external" />Google profile</a>
              </div>
            </div>
            <div className="notice reveal">
              <Icon name="info" />
              <span><strong>B2B supply only.</strong> We supply registered businesses and manufacturers in bulk. Extra Neutral Alcohol is supplied only to licensed buyers, subject to applicable state excise permits.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-map">
        <div className="map-frame reveal" style={{ minHeight: 380 }}>
          <iframe
            title={`Map showing ${company.address.city}, ${company.address.state}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`}
            style={{ minHeight: 380 }}
          />
        </div>
      </section>

    </>
  );
}
