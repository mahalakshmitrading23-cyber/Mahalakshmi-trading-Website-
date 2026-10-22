import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { LazyVideo } from "@/components/Motion";
import { allClients, company, industries, products, waLink, type Product } from "@/lib/site";

export function PageHero({
  title, lead, crumbs, image,
}: { title: string; lead: string; crumbs: { href?: string; label: string }[]; image?: string }) {
  return (
    <section className={`page-hero${image ? " has-media" : ""}`}>
      {image && (
        <div className="page-hero-media" data-parallax="0.3">
          <Image src={image} alt="" fill priority sizes="100vw" />
        </div>
      )}
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} style={{ display: "contents" }}>
              <span aria-hidden="true">/</span>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </section>
  );
}

export function SectionHead({ kicker, title, lead, center }: { kicker: string; title: string; lead?: string; center?: boolean }) {
  return (
    <div className={`section-head reveal${center ? " center" : ""}`}>
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="cta-band reveal">
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2>Need ethanol, alcohol or molasses for your plant?</h2>
            <p>Send us the product, quantity and delivery location. Phone or WhatsApp is usually the quickest way to reach us.</p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-dark" href="/quote">Request a Quote <Icon name="arrow-right" /></Link>
            <a className="btn btn-white" href={`tel:${company.phones[0].tel}`}><Icon name="phone" />{company.phones[0].display}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Home page: each product as a labelled sample tag, photo on top and a paper label below. */
export function ProductTags() {
  return (
    <div className="tags">
      {products.map((p, i) => (
        <article key={p.id} className={`tag-card reveal${i ? ` reveal-d${Math.min(i, 3)}` : ""}${p.highlight ? " is-main" : ""}`}>
          <Link href={`/products/${p.slug}`} className="tag-photo" tabIndex={-1} aria-hidden="true">
            <Image src={p.image} alt="" fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 290px" />
            {p.highlight && <span className="tag-flag">Main product</span>}
          </Link>
          <div className="tag-label">
            <span className="tag-hole" aria-hidden="true" />
            <div className="tag-top"><span>No. {String(i + 1).padStart(2, "0")}</span><span>{p.short}</span></div>
            <h3><Link href={`/products/${p.slug}`}>{p.name}</Link></h3>
            <dl className="tag-specs">
              {p.cardSpecs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
            <div className="tag-actions">
              <Link className="link-arrow" href={`/quote?product=${p.id}`}>Get quote <Icon name="arrow-right" /></Link>
              <Link className="tag-more" href={`/products/${p.slug}`}>Details</Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/** Products page: alternating editorial rows with large photos and overlapping detail cards. */
export function ProductShowcase() {
  return (
    <div className="showcase">
      {products.map((p, i) => (
        <article key={p.id} className={`show-row${i % 2 ? " flip" : ""}`}>
          <div className="show-media">
            <figure className="show-figure reveal reveal-clip">
              <span className="show-img" data-parallax="0.1">
                <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 980px) 100vw, 680px" />
              </span>
            </figure>
            <div className="show-chip-wrap" data-parallax="-0.2">
              <div className="show-chip reveal reveal-d2">
                <span className="pc-ico"><Icon name={p.icon} /></span>
                <span><small>{p.cardSpecs[0][0]}</small><strong>{p.cardSpecs[0][1]}</strong></span>
              </div>
            </div>
          </div>
          <div className="show-card reveal reveal-d1">
            <span className="show-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="pc-code">{p.code}</span>
            <h2>{p.name}</h2>
            <p>{p.cardText}</p>
            <div className="chips">{p.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
            <div className="pc-actions">
              <Link className="link-arrow" href={`/products/${p.slug}`}>Full product details <Icon name="arrow-right" /></Link>
              <Link className="btn btn-primary btn-sm" href={`/quote?product=${p.id}`}>Get Quote</Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function IndustryGrid({ brief = false }: { brief?: boolean }) {
  return (
    <div className="ind-tiles">
      {industries.map((ind, i) => (
        <div className={`ind-tile reveal reveal-clip${i ? ` reveal-d${Math.min(i, 4)}` : ""}`} key={ind.title} tabIndex={0}>
          <Image src={ind.image} alt="" fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 33vw, 260px" />
          <div className="ind-body">
            <span className="ind-ico"><Icon name={ind.icon} /></span>
            <h3>{ind.title}</h3>
            <div className="ind-more">
              <p>{brief ? ind.short : ind.text}</p>
              <span className="ind-products">{ind.products}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export type GalleryPanel = { image: string; alt: string; title: string; text: string; ours?: boolean };

/**
 * Pinned horizontal gallery: on desktop the section sticks while vertical scrolling slides the
 * panels sideways (driven by MotionController via data-hscroll). Elsewhere it is a swipe carousel.
 */
export function HorizontalGallery({
  kicker, title, lead, panels, children,
}: { kicker: string; title: string; lead: string; panels: GalleryPanel[]; children?: React.ReactNode }) {
  return (
    <section className="hscroll" data-hscroll>
      <div className="hscroll-sticky">
        <div className="hscroll-track">
          <div className="hscroll-intro">
            <span className="kicker">{kicker}</span>
            <h2>{title}</h2>
            <p>{lead}</p>
            <span className="hscroll-hint"><Icon name="arrow-right" />Scroll to follow the journey</span>
          </div>
          {panels.map((p, i) => (
            <figure className="hpanel" key={p.title}>
              <span className="hpanel-img">
                <Image src={p.image} alt={p.alt} fill sizes="(max-width: 980px) 85vw, 46vw" />
              </span>
              <span className="hpanel-num">{String(i + 1).padStart(2, "0")}</span>
              <figcaption>
                {p.ours && <span className="tag">We supply</span>}
                <strong>{p.title}</strong>
                <span>{p.text}</span>
              </figcaption>
            </figure>
          ))}
          {children && <div className="hscroll-end">{children}</div>}
        </div>
        <div className="hscroll-bar" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}

const TONES = ["o", "", "d"];

export function Monogram({ initials, i }: { initials: string; i: number }) {
  return <span className={`monogram ${TONES[i % 3]}`}>{initials}</span>;
}

export function ClientMarquee() {
  // Rendered twice so the CSS translateX(-50%) loop is seamless.
  const loop = [...allClients, ...allClients];
  return (
    <div className="marquee reveal" aria-label="Our clients">
      <div className="marquee-track">
        {loop.map((c, i) => (
          <div className="client-chip" key={i} aria-hidden={i >= allClients.length || undefined}>
            <strong>{c.name}</strong><small>{c.product}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductDetail({ p }: { p: Product }) {
  return (
    <section className="prod-detail">
      <div className="container prod-layout">
        <div className="prod-body reveal">
          <div className="prod-head">
            <span className="pc-ico"><Icon name={p.icon} /></span>
            <div><span className="pc-code">{p.tagline}</span><h2>{p.name}</h2></div>
          </div>
          <p className="prod-lead">{p.lead}</p>
          <p><strong>In simple terms:</strong> {p.simple}</p>
          <p>{p.detail}</p>

          <figure className="prod-figure reveal reveal-clip">
            <span className="prod-figure-inner" data-parallax="0.12">
              <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 980px) 100vw, 640px" />
            </span>
          </figure>

          <h3 className="prod-sub">Applications</h3>
          <div className="app-grid">
            {p.applications.map((a) => (
              <div className="app-item" key={a.title}>
                <Icon name={a.icon} />
                <div><strong>{a.title}</strong><span>{a.text}</span></div>
              </div>
            ))}
          </div>

          <h3 className="prod-sub">Typical buyers</h3>
          <div className="chips">{p.buyers.map((b) => <span className="chip chip-grey" key={b}>{b}</span>)}</div>
        </div>
        <aside className="spec-card reveal reveal-d1" aria-label={`${p.name} key details`}>
          <div className="spec-card-head"><small>Key details</small><strong>{p.short}</strong></div>
          <table className="spec-table">
            <tbody>
              {p.specs.map(([k, v], i) => <tr key={k}><th>{k}</th><td className={i === 0 && p.highlight ? "hl" : undefined}>{v}</td></tr>)}
            </tbody>
          </table>
          <div className="spec-card-foot">
            <Link className="btn btn-primary btn-block" href={`/quote?product=${p.id}`}>Request a Quote</Link>
            <a className="btn btn-ghost-light btn-block" href={waLink(`Hello, I need a quotation for ${p.name}.`)} target="_blank" rel="noopener">
              <Icon name="whatsapp" />Ask on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

/** Stylised supply routes fanning out from Baramati. Deliberately not a map outline. */
const ROUTES = [
  "M150 182 Q 140 90 176 26", "M150 182 Q 230 110 330 64", "M150 182 Q 280 160 372 150",
  "M150 182 Q 250 240 318 268", "M150 182 Q 180 250 196 292", "M150 182 Q 90 120 54 86", "M150 182 Q 80 196 30 214",
];

export function RouteMap() {
  return (
    <figure className="route-map" aria-label={`Bulk supply routes from ${company.address.city} to plants across India`}>
      <svg viewBox="0 0 400 310" role="img" aria-hidden="true">
        <defs>
          <pattern id="route-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" /></pattern>
        </defs>
        <rect className="route-grid" width="400" height="310" fill="url(#route-dots)" />
        {ROUTES.map((d) => {
          const end = d.split(" ").slice(-2);
          return (
            <g key={d}>
              <path className="route-line" d={d} />
              <circle className="route-end" cx={end[0]} cy={end[1]} r="4.5" />
            </g>
          );
        })}
        <circle className="route-pulse" cx="150" cy="182" r="10" />
        <circle className="route-pin" cx="150" cy="182" r="7" />
        <text className="route-label" x="164" y="200">Baramati</text>
      </svg>
      <figcaption>Supplied pan-India from Baramati</figcaption>
    </figure>
  );
}

/** A short letter from the people who run the business, beside a photo of where it all comes from. */
export function DeskNote() {
  const facts = [
    { k: `Since ${company.founded}`, v: "Trading from Baramati, next to the mills and distilleries" },
    { k: "GST invoiced", v: `Every order, with permits where needed. GSTIN ${company.gstin}` },
    { k: "Pan-India", v: "Bulk dispatch to your plant, wherever it is" },
  ];
  return (
    <section className="section desk">
      <div className="container">
        <div className="desk-grid">
          <figure className="desk-photo reveal reveal-clip">
            <span className="desk-photo-inner" data-parallax="0.08">
              <Image src="/media/sugarcane-transport.jpg" alt="Tractor carrying freshly harvested sugarcane to the factory near Baramati" fill sizes="(max-width: 980px) 100vw, 460px" />
            </span>
            <figcaption><span lang="mr">बारामती</span> Baramati, Maharashtra</figcaption>
          </figure>
          <div className="desk-body reveal reveal-d1">
            <span className="kicker">From the desk</span>
            <article className="desk-letter">
              <p className="desk-hello">Namaskar,</p>
              <p>
                {company.founder.split(" ")[0]} {company.founder.split(" ").at(-1)} started this business in {company.founded}, here in Baramati,
                with cane fields on every side and sugar mills down the road. I run it day to day now.
              </p>
              <p>
                We deal in four products and nothing else. Keeping the list short means we know each one properly, from the grade
                and the paperwork to how it travels. Call or WhatsApp us with what you need and you&apos;ll get a straight answer.
              </p>
              <p className="desk-sign">{company.runBy}</p>
              <p className="desk-role">{company.name}</p>
              <span className="desk-stamp" aria-hidden="true">
                <b>GST Regd.</b>
                <span>{company.gstin}</span>
              </span>
            </article>
          </div>
        </div>
        <div className="desk-reach reveal">
          <RouteMap />
          <dl className="desk-facts">
            {facts.map((f) => (
              <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/** Full-width section with a parallax background video, dark overlay and content on top. */
export function VideoBand({
  video, poster, kicker, title, text, points, children,
}: {
  video: string; poster: string; kicker: string; title: string; text: string;
  points?: { icon: IconName; title: string; text: string }[]; children?: React.ReactNode;
}) {
  return (
    <section className="video-band">
      <div className="video-band-media" data-parallax="0.25">
        <LazyVideo src={video} poster={poster} />
      </div>
      <div className="container video-band-body">
        <div className="reveal">
          <span className="kicker">{kicker}</span>
          <h2>{title}</h2>
          <p>{text}</p>
          {children}
        </div>
        {points && (
          <div className="video-band-points">
            {points.map((pt, i) => (
              <div className={`vb-point reveal${i ? ` reveal-d${i}` : ""}`} key={pt.title}>
                <span className="vb-ico"><Icon name={pt.icon} /></span>
                <div><strong>{pt.title}</strong><span>{pt.text}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
