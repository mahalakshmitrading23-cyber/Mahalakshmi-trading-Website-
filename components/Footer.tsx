import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { company, products, waLink } from "@/lib/site";

const WA_HELLO = `Hello ${company.name}, I would like a quotation.`;

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-talk">
          <span className="kicker">Talk to us directly</span>
          <h2>Let&apos;s talk.</h2>
          <a className="footer-phone" href={`tel:${company.phones[0].tel}`}>{company.phones[0].display}</a>
          <div className="footer-talk-links">
            <a href={waLink(WA_HELLO)} target="_blank" rel="noopener"><Icon name="whatsapp" />WhatsApp <Icon name="arrow-right" /></a>
            <a href={`mailto:${company.email}`}><Icon name="mail" />Email <Icon name="arrow-right" /></a>
            <Link href="/quote"><Icon name="file" />Request a quote <Icon name="arrow-right" /></Link>
          </div>
        </div>
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/">
              <Image src="/img/logo-light-256.png" alt={`${company.name} logo`} width={50} height={50} />
              <span className="brand-text">
                <span className="brand-name">Mahalakshmi <span>Tradings</span></span>
                <span className="brand-tag" style={{ color: "#8d9299" }}>{company.tagline}</span>
              </span>
            </Link>
            <p>B2B trader of Denatured Anhydrous Ethanol, Special Denatured Spirit, Extra Neutral Alcohol and Molasses. Serving Indian industry since {company.founded}.</p>
            <span className="footer-gst">GSTIN: <b>{company.gstin}</b></span>
          </div>
          <div>
            <h4>Products</h4>
            <ul className="footer-links">
              {products.map((p) => <li key={p.id}><Link href={`/products/${p.slug}`}>{p.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/clients">Clients</Link></li>
              <li><Link href="/quote">Request a Quote</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul className="footer-contact">
              <li><Icon name="pin" /><span>{company.address.line1}, {company.address.city},<br />{company.address.state}, {company.address.country}</span></li>
              <li><Icon name="phone" /><span>{company.phones.map((p, i) => <span key={p.tel}>{i > 0 && <br />}<a href={`tel:${p.tel}`}>{p.display}</a></span>)}</span></li>
              <li><Icon name="mail" /><a href={`mailto:${company.email}`}>{company.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true" lang="mr">महालक्ष्मी</div>
        <div className="footer-bottom">
          <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
            <span>© {new Date().getFullYear()} {company.name}. All rights reserved. GSTIN: {company.gstin}</span>
            <span className="footer-legal-links" style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/refund-policy">Cancellation &amp; Refund</Link>
              <Link href="/credits">Image Credits</Link>
            </span>
          </div>
        </div>
      </footer>

      <a className="float-wa" href={waLink(WA_HELLO)} target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><Icon name="whatsapp" /></a>
      <nav className="mobile-cta-bar" aria-label="Quick contact">
        <a href={`tel:${company.phones[0].tel}`}><Icon name="phone" />Call</a>
        <a className="wa" href={waLink(WA_HELLO)} target="_blank" rel="noopener"><Icon name="whatsapp" />WhatsApp</a>
        <Link className="q" href="/quote"><Icon name="file" />Get Quote</Link>
      </nav>
    </>
  );
}
