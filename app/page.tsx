import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { Counter } from "@/components/Effects";
import { LazyVideo } from "@/components/Motion";
import {
  ClientMarquee, CtaBand, HeroRing, HorizontalGallery, IndustryGrid, ProductBento, ScrollTextStrip, SectionHead, VideoBand, type GalleryPanel,
} from "@/components/Sections";
import { allClients, company, products, waLink } from "@/lib/site";

const years = new Date().getFullYear() - company.founded;

const JOURNEY: GalleryPanel[] = [
  { image: "/media/sugarcane-field.jpg", alt: "Sugarcane growing on a farm in Maharashtra", title: "Sugarcane fields", text: "Grown across Maharashtra's sugar belt, around Baramati." },
  { image: "/media/sugarcane-transport.jpg", alt: "Tractor carrying harvested sugarcane to the factory", title: "Harvest & crushing", text: "Cane is harvested and crushed at the sugar mills." },
  { image: "/media/product-molasses.jpg", alt: "Thick dark molasses", title: "Molasses", text: "The sugar-rich syrup left after sugar is extracted.", ours: true },
  { image: "/media/product-ena.jpg", alt: "Multi-column distillation towers", title: "Distillation", text: "Molasses is fermented and distilled into alcohol." },
  { image: "/media/product-dae.jpg", alt: "Ethanol plant with storage tanks", title: "Ethanol · ENA · SDS", text: "Refined, dehydrated or denatured to the required grade.", ours: true },
  { image: "/media/logistics-truck.jpg", alt: "Freight truck at a warehouse", title: "Delivered to your plant", text: "Dispatched in bulk to manufacturers across India." },
];

const WHY: { icon: IconName; title: string; text: string }[] = [
  { icon: "award", title: `${Math.floor(years / 5) * 5}+ years of experience`, text: `Trading ethanol, alcohol and molasses since ${company.founded} — we know the products and the market.` },
  { icon: "layers", title: "Four products, one source", text: "Buy ethanol, spirit, ENA and molasses from a single, accountable supplier." },
  { icon: "leaf", title: "Rooted in the sugar belt", text: "Based in Baramati, close to the sugar mills and distilleries where our products originate." },
  { icon: "truck", title: "Pan-India supply", text: "Bulk deliveries to manufacturing plants across India, coordinated end-to-end." },
  { icon: "receipt", title: "GST-registered & transparent", text: `Proper invoicing and documentation on every order. GSTIN ${company.gstin}.` },
  { icon: "clock", title: "Quick quotations", text: "Share your requirement by form, phone or WhatsApp and hear back promptly." },
];

const STEPS: { icon: IconName; title: string; text: string }[] = [
  { icon: "send", title: "Share your requirement", text: "Tell us the product, quantity, specification and delivery location." },
  { icon: "file", title: "Receive a quotation", text: "We confirm availability, specification and pricing for your order." },
  { icon: "shield", title: "Confirm & documents", text: "Order confirmation, GST invoicing and any required permits are arranged." },
  { icon: "truck", title: "Dispatch & delivery", text: "Material is dispatched in bulk to your plant, anywhere in India." },
];

export default function Home() {
  const [dae, sds, ena, molasses] = products;
  return (
    <>
      <section className="hero">
        <div className="hero-media" data-parallax="0.35">
          <LazyVideo eager src="/media/hero-refinery.mp4" mobileSrc="/media/hero-refinery-mobile.mp4" poster="/media/hero-refinery.jpg" />
        </div>
        <HeroRing />
        <div className="container" data-fade-out>
          <div className="hero-copy">
            <div className="eyebrow reveal"><span className="dot" />B2B Industrial Trader <span aria-hidden="true">·</span> Since {company.founded} <span aria-hidden="true">·</span> Pan-India</div>
            <h1 className="reveal reveal-d1">Bulk <span className="hl">Ethanol, Alcohol &amp; Molasses</span> for Indian industry.</h1>
            <p className="hero-lead reveal reveal-d2">
              {company.name} supplies <strong>Denatured Anhydrous Ethanol (99.9%)</strong>, Special Denatured Spirit, Extra Neutral Alcohol and Molasses
              to chemical, pharmaceutical, petroleum, beverage and cattle-feed manufacturers — from Baramati, in the heart of Maharashtra&apos;s sugar belt.
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

          <div className="hero-products">
            <Link href={`/products/${dae.slug}`} className="hp-card wide featured reveal">
              <span className="hp-badge">Flagship product</span>
              <span className="hp-ico"><Icon name={dae.icon} /></span>
              <div><h3>{dae.name}</h3><p>Water-free industrial ethanol · HSN 22072000</p></div>
              <span className="purity"><strong>99.9%</strong><span>Purity</span></span>
            </Link>
            <Link href={`/products/${sds.slug}`} className="hp-card reveal reveal-d1">
              <span className="hp-ico"><Icon name={sds.icon} /></span>
              <h3>{sds.name}</h3>
              <p>Versatile industrial solvent for chemicals, coatings &amp; inks.</p>
            </Link>
            <Link href={`/products/${ena.slug}`} className="hp-card reveal reveal-d2">
              <span className="hp-ico"><Icon name={ena.icon} /></span>
              <h3>{ena.name}</h3>
              <p>High-purity neutral spirit for beverages &amp; pharma.</p>
            </Link>
            <Link href={`/products/${molasses.slug}`} className="hp-card wide reveal reveal-d3">
              <span className="hp-ico"><Icon name={molasses.icon} /></span>
              <div><h3>{molasses.name}</h3><p>Sugarcane molasses for distilleries &amp; cattle feed.</p></div>
              <span className="purity"><strong className="sm">Bulk</strong><span>Pan-India</span></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Company at a glance">
        <div className="container">
          <div className="stats-grid reveal">
            <div className="stat"><span className="s-ico"><Icon name="award" /></span><div><Counter to={Math.floor(years / 5) * 5} suffix="+" /><span>Years in trading<br />(since {company.founded})</span></div></div>
            <div className="stat"><span className="s-ico"><Icon name="layers" /></span><div><Counter to={products.length} /><span>Core products,<br />one supplier</span></div></div>
            <div className="stat"><span className="s-ico"><Icon name="factory" /></span><div><Counter to={allClients.length} suffix="+" /><span>Industrial buyers<br />served</span></div></div>
            <div className="stat"><span className="s-ico"><Icon name="truck" /></span><div><strong>Pan-India</strong><span>Supply to plants<br />across states</span></div></div>
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <div className="container">
          <SectionHead
            kicker="What we supply"
            title="Four industrial raw materials. One reliable trading partner."
            lead="Every product we trade comes from the ethanol and sugar value chain. Here's what each one is — and who uses it."
          />
          <ProductBento />
        </div>
      </section>

      <ScrollTextStrip items={[...products.map((p) => p.name), company.tagline]} />

      <HorizontalGallery
        kicker="How it fits together"
        title="From sugarcane to your plant"
        lead="All four products come from the same green-energy value chain. We connect producers in Maharashtra's sugar belt with manufacturers across India."
        panels={JOURNEY}
      >
        <h3>Need any of these for your plant?</h3>
        <Link className="btn btn-primary" href="/quote">Request a Quote <Icon name="arrow-right" /></Link>
      </HorizontalGallery>

      <section className="section section-soft" id="industries">
        <div className="container">
          <SectionHead kicker="Industries we serve" title="Built for procurement teams in five industries" lead="Our buyers are manufacturers who need consistent raw material, delivered on schedule." />
          <IndustryGrid />
        </div>
      </section>

      <section className="section belt">
        <div className="container belt-grid">
          <div className="belt-copy reveal">
            <span className="kicker">Rooted in Baramati</span>
            <h2>At the heart of Maharashtra&apos;s sugar belt</h2>
            <p>
              Baramati is surrounded by sugarcane farms, sugar mills and distilleries — the very source of molasses and alcohol.
              Being here since {company.founded} keeps us close to supply and lets us move material to plants anywhere in India.
            </p>
            <ul className="check-list">
              <li><Icon name="check" /><span>Close to the sugar mills and distilleries where our products originate</span></li>
              <li><Icon name="check" /><span>Long-standing relationships on both sides of the supply chain</span></li>
              <li><Icon name="check" /><span>Bulk supply coordinated to your plant, anywhere in India</span></li>
            </ul>
            <Link className="btn btn-dark" href="/about">Our story <Icon name="arrow-right" /></Link>
          </div>
          <div className="belt-collage">
            <figure className="bc bc-main reveal reveal-clip">
              <span className="bc-inner" data-parallax="0.1">
                <Image src="/media/sugarcane-transport.jpg" alt="Tractor carrying freshly harvested sugarcane from the field to the factory" fill sizes="(max-width: 980px) 90vw, 520px" />
              </span>
            </figure>
            <div className="bc-float bc-top" data-parallax="-0.18">
              <figure className="bc reveal reveal-d2"><Image src="/media/sugarcane-closeup.jpg" alt="Close-up of sugarcane growing in the field" fill sizes="260px" /></figure>
            </div>
            <div className="bc-float bc-bottom" data-parallax="0.16">
              <figure className="bc reveal reveal-d3"><Image src="/media/product-molasses.jpg" alt="Thick dark molasses" fill sizes="240px" /></figure>
            </div>
            <div className="bc-float bc-badge-wrap" data-parallax="-0.32">
              <div className="bc-badge reveal reveal-d4"><Icon name="pin" /><span><strong>Baramati, Maharashtra</strong><small>Trading since {company.founded}</small></span></div>
            </div>
          </div>
        </div>
      </section>

      <VideoBand
        video="/media/logistics-truck.mp4"
        poster="/media/logistics-truck.jpg"
        kicker="Pan-India supply"
        title="From the sugar belt to plants across India"
        text="Once your order is confirmed, we coordinate dispatch, documentation and delivery — so the material reaches your plant when production needs it."
        points={[
          { icon: "truck", title: "Bulk supply", text: "Material dispatched in bulk to your plant location." },
          { icon: "file", title: "Proper documentation", text: "GST invoicing and required permits arranged with every order." },
          { icon: "globe", title: "Pan-India reach", text: "Serving buyers across states from Baramati, Maharashtra." },
        ]}
      >
        <Link className="btn btn-primary" href="/quote">Request a Quote <Icon name="arrow-right" /></Link>
      </VideoBand>

      <section className="section" id="clients">
        <div className="container">
          <SectionHead center kicker="Trusted by industry" title="Supplying some of India's leading manufacturers" lead={`Chemical majors, breweries and cattle-feed brands rely on ${company.name} for their raw material.`} />
        </div>
        <ClientMarquee />
        <div className="container" style={{ textAlign: "center", marginTop: 36 }}>
          <Link className="link-arrow" href="/clients">See all clients by product <Icon name="arrow-right" /></Link>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container why-wrap">
          <div className="why-intro reveal">
            <span className="kicker">Why Mahalakshmi Tradings</span>
            <h2 style={{ fontSize: "clamp(30px,3.6vw,44px)" }}>A trading partner procurement teams can count on.</h2>
            <p style={{ color: "var(--muted)", fontSize: 17 }}>
              Since {company.founded} we have built long-standing relationships on both sides of the supply chain — so you get the right material,
              with the right paperwork, when your plant needs it.
            </p>
            <Link className="btn btn-dark" href="/about">About our company <Icon name="arrow-right" /></Link>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div className={`why-card reveal${i % 2 ? " reveal-d1" : ""}`} key={w.title}>
                <div className="w-ico"><Icon name={w.icon} /></div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead center kicker="How to order" title="From enquiry to delivery in four simple steps" />
          <div className="process">
            {STEPS.map((s, i) => (
              <div className={`proc reveal${i ? ` reveal-d${i}` : ""}`} key={s.title}>
                <div className="p-ico"><Icon name={s.icon} /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
