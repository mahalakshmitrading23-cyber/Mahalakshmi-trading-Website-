import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Circle, Underline } from "@/components/Scribble";
import { Counter } from "@/components/Effects";
import { LazyVideo } from "@/components/Motion";
import {
  ClientMarquee, DeskNote, HorizontalGallery, ProductTags, SectionHead, type GalleryPanel,
} from "@/components/Sections";
import { allClients, clientGroups, company, products, waLink } from "@/lib/site";

const years = new Date().getFullYear() - company.founded;

const JOURNEY: GalleryPanel[] = [
  { image: "/media/sugarcane-field.jpg", alt: "Sugarcane growing on a farm in Maharashtra", title: "Sugarcane fields", text: "Grown across Maharashtra's sugar belt, around Baramati." },
  { image: "/media/sugarcane-transport.jpg", alt: "Tractor carrying harvested sugarcane to the factory", title: "Harvest & crushing", text: "Cane is harvested and crushed at the sugar mills." },
  { image: "/media/product-molasses.jpg", alt: "Thick dark molasses", title: "Molasses", text: "The sugar-rich syrup left after sugar is extracted.", ours: true },
  { image: "/media/product-ena.jpg", alt: "Multi-column distillation towers", title: "Distillation", text: "Molasses is fermented and distilled into alcohol." },
  { image: "/media/product-dae.jpg", alt: "Ethanol plant with storage tanks", title: "Ethanol · ENA · SDS", text: "Refined, dehydrated or denatured to the required grade.", ours: true },
  { image: "/media/logistics-truck.jpg", alt: "Freight truck at a warehouse", title: "Delivered to your plant", text: "Dispatched in bulk to manufacturers across India." },
];

const STEPS: { title: string; text: string }[] = [
  { title: "Tell us what you need", text: "Product, quantity, specification and where it has to be delivered." },
  { title: "Get a quotation", text: "We confirm availability, grade and price for your order." },
  { title: "Confirm the order", text: "GST invoicing and any permits the product needs are sorted out." },
  { title: "Dispatch", text: "Material leaves in bulk for your plant, anywhere in India." },
];

export default function Home() {
  const [dae, sds, ena, molasses] = products;
  return (
    <>
      <section className="hero">
        <div className="hero-media" data-parallax="0.35">
          <LazyVideo eager src="/media/hero-refinery.mp4" mobileSrc="/media/hero-refinery-mobile.mp4" poster="/media/hero-refinery.jpg" />
        </div>
        <div className="container" data-fade-out>
          <div className="hero-copy">
            <div className="eyebrow reveal">Est. {company.founded} <span aria-hidden="true">/</span> Baramati, Maharashtra <span aria-hidden="true">/</span> <span lang="mr">बारामती</span></div>
            <h1 className="reveal reveal-d1">Bulk ethanol, alcohol <em className="marked">&amp; molasses<Underline /></em> for Indian industry.</h1>
            <p className="hero-lead reveal reveal-d2">
              We trade <strong>Denatured Anhydrous Ethanol <span className="nowrap">(<span className="marked">99.9%<Circle /></span>)</span></strong>, Special Denatured Spirit, Extra Neutral Alcohol and Molasses
              out of Baramati, in Maharashtra&apos;s sugar belt. Our buyers make chemicals, medicines, fuel, drinks and cattle feed.
            </p>
            <div className="hero-actions reveal reveal-d3">
              <Link className="btn btn-primary" href="/quote">Request a Quote <Icon name="arrow-right" /></Link>
              <a className="btn btn-ghost-light" href={waLink(`Hello ${company.name}, I would like a quotation.`)} target="_blank" rel="noopener"><Icon name="whatsapp" />WhatsApp Enquiry</a>
            </div>
            <div className="hero-proof reveal reveal-d4">
              <span className="hero-proof-label">Trusted by</span>
              <div className="hero-proof-names">{["Jubilant Ingrevia", "Alkyl Amines", "Balaji Amines", "Laxmi Organics"].map((n) => <span key={n}>{n}</span>)}</div>
            </div>
          </div>

          <div className="docket reveal reveal-d2" aria-label="Products we supply">
            <div className="docket-head">
              <span>Products we trade</span>
            </div>
            <ol>
              {[dae, sds, ena, molasses].map((p, i) => (
                <li key={p.id}>
                  <Link href={`/products/${p.slug}`}>
                    <span className="docket-thumb" aria-hidden="true"><Image src={p.image} alt="" fill sizes="180px" /></span>
                    <span className="docket-no">{String(i + 1).padStart(2, "0")}</span>
                    <span className="docket-name">
                      <strong>{p.name}</strong>
                      <small>{p.menuNote}</small>
                    </span>
                    <span className="docket-code">{p.short}</span>
                    <Icon name="arrow-right" />
                  </Link>
                  {i === 0 && <span className="docket-note" aria-hidden="true">our main one</span>}
                </li>
              ))}
            </ol>
            <div className="docket-foot">B2B &amp; bulk only <span aria-hidden="true">·</span> Supplied pan-India <span aria-hidden="true">·</span> Specs on enquiry</div>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Company at a glance">
        <div className="container">
          <div className="stats-grid reveal">
            <div className="stat"><div><Counter to={Math.floor(years / 5) * 5} suffix="+" /><span>years in the trade, since {company.founded}</span></div></div>
            <div className="stat"><div><Counter to={products.length} /><span>products, all from the cane-to-ethanol chain</span></div></div>
            <div className="stat"><div><Counter to={allClients.length} suffix="+" /><span>manufacturers buying from us</span></div></div>
            <div className="stat"><div><strong>Pan-India</strong><span>bulk delivery to your plant</span></div></div>
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <div className="container">
          <SectionHead
            kicker="What we supply"
            title="Four raw materials, all from sugarcane."
            lead="Every product we trade starts in the same cane fields. Here is what each one is and who buys it."
          />
          <ProductTags />
        </div>
      </section>

      <HorizontalGallery
        kicker="How it fits together"
        title="From sugarcane to your plant"
        lead="All four products come out of the same cane. We sit between the mills in Maharashtra's sugar belt and the plants that need their output."
        panels={JOURNEY}
      >
        <h3>Need any of these for your plant?</h3>
        <Link className="btn btn-primary" href="/quote">Request a Quote <Icon name="arrow-right" /></Link>
      </HorizontalGallery>

      <section className="section" id="clients">
        <div className="container clients-head">
          <SectionHead kicker="Who we supply" title="Some of the names on our order book" lead="Chemical companies, breweries and cattle-feed brands buy their raw material from us." />
          <div className="clients-tally reveal reveal-d1">
            {clientGroups.map((g) => (
              <div key={g.title}><strong>{g.clients.length}</strong><span>{g.title}</span></div>
            ))}
            <Link className="link-arrow" href="/clients">See all clients <Icon name="arrow-right" /></Link>
          </div>
        </div>
        <ClientMarquee />
      </section>

      <DeskNote />

      <section className="section order">
        <div className="container">
          <div className="order-band reveal">
            <div className="order-copy">
              <span className="kicker">How to order</span>
              <h2>Need ethanol, alcohol or molasses for your plant?</h2>
              <p>Send the product, quantity and delivery location. Phone or WhatsApp is usually the quickest way to reach us.</p>
              <div className="order-actions">
                <Link className="btn btn-primary" href="/quote">Request a Quote <Icon name="arrow-right" /></Link>
                <a className="btn btn-ghost-light" href={waLink(`Hello ${company.name}, I would like a quotation.`)} target="_blank" rel="noopener"><Icon name="whatsapp" />WhatsApp</a>
              </div>
            </div>
            <ol className="order-steps">
              {STEPS.map((st) => (
                <li key={st.title}><strong>{st.title}</strong><span>{st.text}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
